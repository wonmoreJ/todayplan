document.addEventListener("click", async function(e) {
	if (e.target.classList.contains("boardTdTitle")) {
		const boardId = e.target.id;
		await getPlanInfo(boardId);
		document.querySelector('.modal_').classList.add('show');
	}
});

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && document.querySelector(".modal_").classList.contains("show")) {
		document.querySelector(".modal_").classList.remove("show");
	}
});
document.addEventListener("DOMContentLoaded", () => {
	//메인화면 추가(+)버튼
	document.querySelectorAll(".addBtn").forEach(btn => {
		btn.addEventListener("click", function(){
			const num	= this.dataset.num;
			/*
			document.getElementById("mdNum").value = num;
			document.getElementById("mdStrtDt").value = num;
			document.getElementById("mdEndDt").value = num;
			*/
			["mdNum", "mdStrtDt", "mdEndDt"].forEach(id => document.getElementById(id).value = num);
		})	
	});
	
	document.getElementById("modal_close_icon").addEventListener("click", () => {
	  document.querySelector(".modal_").classList.remove("show");
	});
	
	//plan상세닫기
	document.getElementById("modal_close_btn").addEventListener("click", function(){
		document.querySelector('.modal_').classList.remove('show');
	});
	
	// 배경 클릭 시 모달 닫기
	document.querySelector(".modal_").addEventListener("click", function (e) {
	  const popup = document.querySelector(".modal_popup_");

	  // 클릭한 대상이 팝업 내부가 아니면 (=배경 클릭)
	  if (!popup.contains(e.target)) {
		document.querySelector('.modal_').classList.remove('show');
	  }
	});
	
	//paln삭제
	document.getElementById("modal_delete_btn").addEventListener("click", async function(){
		const boardId = document.getElementById("modal_boardId").value;
		const result = await deletePlan(boardId);
		if(result == "ok"){
			[boardId,"chk"+boardId].forEach(id => document.getElementById(id).remove());
			const modal = document.querySelector(".modal_");
			document.querySelector('.modal_').classList.remove('show');
		}
		todayRate();
	});
	
	//체크박스td클릭
	document.querySelectorAll(".boardTdChk").forEach(btn => {
		btn.addEventListener("click", async function(){
			const id = this.id.replace("chk","");
			const chkId = "chkBox"+this.id.replace("chk",""); 
			var chkResult = "";
			
			if(document.getElementById(chkId).checked){
				chkResult = "N";
				document.getElementById(chkId).checked = false;
			}else{
				chkResult = "Y";
				document.getElementById(chkId).checked = true;
			}
			const planData = {
				"boardId": id,
				"commitChk" : chkResult	
			}
			await planChk(planData);
		})
	});
	
	//체크박스클릭
	document.querySelectorAll(".tdChk").forEach(chkBox => {
		chkBox.addEventListener("click", async function(e){
			e.stopPropagation();
			const id = this.id.replace("chkBox","");
			const planData = {
				"boardId": id,
				"commitChk" : document.getElementById(this.id).checked ? "Y" : "N"	
			}
			await planChk(planData);
			
		});
	});
	
	//모달창 추가버튼
	document.getElementById("modalAddPlan").addEventListener("click", async function(){
		let num = document.getElementById("mdNum").value;
		let title = document.getElementById("mdTitle").value;
		let content = document.getElementById("mdContent").value;
		let strtDt = document.getElementById("mdStrtDt").value;
		let endDt = document.getElementById("mdEndDt").value;
		
		//이부분에 비동기로 데이터추가
		const boardData = {
				userId : "원몽"
				,dt : num
				,title : title
				,content : content
				,backColor : "blue"
				,strtDt : num
				,endDt : num
				,title : title
				,num : num
		}
		
		const boardId = await insertPlan(boardData);
		
		document.getElementById(boardId).addEventListener("click", async function(){
			const modal = document.querySelector(".modal_");
			modal.style.display = 'block';
			await getPlanInfo(this.id);
		});
		
		document.getElementById("chk"+boardId).addEventListener("click", async function(){
			const planData = {
				"boardId": "chk"+boardId,
				"commitChk" : document.getElementById("chk"+boardId).checked ? "Y" : "N"	
			}
			await planChk(planData);
		});
	});
});

async function planChk(planData){
	try{
		const res = await fetch("/toplan/planChk",{
			method: "POST",
			headers : {
						"Content-Type": "application/json"
			},
			body : JSON.stringify(planData)
		});
		
		if(res.ok){
			console.log("체크완료");
			document.getElementById(planData.boardId).classList.toggle("chkOk");
			todayRate();
		}
		
	}catch (e){
		alert("체크오류");
		console.error(e);
	}
	
	
	//체크박스완료 후 로직추가
}

async function insertPlan(boardData){
	
	const res = await fetch("/toplan/addboard",{ 
		method: "POST",
		headers : {
			"Content-Type": "application/json"
		},
		body : JSON.stringify(boardData)
	})
	
	const result = await res.json();
	
	alert("추가완료");
	const planInfo = {	title : boardData.title,
					 			dt : boardData.num,
					 			param : "add",
					 			boardId : result.boardId  };
	addPlan(planInfo);
	
	return result.boardId;
}

async function getPlanInfo(boardId){
	
	try{
		const res = await fetch("/toplan/planinfo",{	method: "POST",
																		headers : {
																			"Content-Type": "text/plain"
																		},
																		body : boardId 	});
		const result = await res.json();

		["modal_boardId", "modal_year", "modal_month", "modal_day"      
		, "modal_backColor", "modal_commitChk", "modal_strtDt", "modal_endDt", "modal_userId"].forEach(id => {
			const key = id.replace("modal_", "");
			document.getElementById(id).value = result[key] ?? "";
		});

		const paramDt 	= result["boardFullDt"];
		const nowDt 	  	= new Date();
		document.getElementById("modal_boardFullDt_view").textContent = formatDate(result["boardFullDt"]);
		document.getElementById("modal_title_view").textContent = result["title"];
		document.getElementById("modal_content_view").textContent = result["content"];
		if(nowDt > new Date(paramDt.substring(0,4)+"-"+paramDt.substring(4,6)+"-"+paramDt.substring(6,8))){
			document.getElementById("modal_delete_btn").style.display = "none";
		}else{
			document.getElementById("modal_delete_btn").style.display = "block";
		}
		
		
	}catch (e) {
		alert("조회오류");
		console.error(e);
	}
};

async function deletePlan(boardId){
	
	try {
		const res = await fetch("/toplan/deleteplan/"+boardId, {
			method : "POST",
		});
		
		if(res.ok){
			return "ok";
		}
		
	} catch (e) {
		alert("삭제오류");
		console.error(e);
	}
};

//plan추가함수
function addPlan(planInfo){
	console.log(planInfo.dt);
	const tr1 	     = document.getElementById("calTr"+planInfo.dt);
    const cell1 	 = tr1.insertCell(tr1.childElementCount-1);
    cell1.setAttribute("id", planInfo.boardId);
    cell1.setAttribute("class", "boardTdTitle");
    cell1.innerText = planInfo.title;
	
    const tr2		 = document.getElementById("calChk"+planInfo.dt);
    const cell2 	 = tr2.insertCell(tr2.childElementCount);
    cell2.setAttribute("id", "chk"+planInfo.boardId);
	
	let chkHtml = "";
	const paramDt = planInfo.dt;
	const nowDt = new Date();

	if(nowDt > new Date(paramDt.substring(0,4)+"-"+paramDt.substring(4,6)+"-"+paramDt.substring(6,8))){
		chkHtml = "<input type='checkbox' disabled='disabled' class='tdChk' id='chkBox"+planInfo.boardId+"'>"; 
	    cell2.setAttribute("class", "boardTdChkStyle");
	}else{
		chkHtml = "<input type='checkbox' class='tdChk' id='chkBox"+planInfo.boardId+"'>"; 
		cell2.setAttribute("class", "boardTdChk");
	}
    
	cell2.innerHTML = chkHtml; 			
	
	const modalElement = document.getElementById('myModal');
	const modal = bootstrap.Modal.getInstance(modalElement);
	
	if(planInfo.commitChk == "Y"){
		document.getElementById("chkBox"+planInfo.boardId).checked = true;
		document.getElementById(planInfo.boardId).classList.toggle("chkOk");
	}
	
	if(planInfo.param == "add"){
		modal.hide();
		mdReset();
	};
	todayRate();
};

//모달창리셋
function mdReset(){
	["mdNum","mdTitle","mdContent","mdStrtDt","mdEndDt"].forEach(id => document.getElementById(id).value = "");
}

//오늘달성률
function todayRate(){
	const nowDt = new Date();
	const nowYear = nowDt.getFullYear();
	const nowMonth = (nowDt.getMonth()+1).toString().padStart(2,'0');
	const nowDay = (nowDt.getDate()).toString().padStart(2,'0');
	
	const id = "calChk"+nowYear+nowMonth+nowDay;
	const inputArr = document.getElementById(id).querySelectorAll("input[type='checkbox']");
	let cnt = 0;
	let total = inputArr.length;
	let result = 0;
	
	if(total > 0){
		inputArr.forEach(check => {
			const checkYN =check.checked;
			if(checkYN){
				cnt++;
			}
		});
		result = Math.trunc((cnt/total)*100);
	}
	
	let emozi = "";
	if(result == 0){
		emozi = "😑"; 
	}else if(result < 50){
		emozi = "😐";
	}else if(result < 75){
		emozi = "😊";
	}else if(result == 100){
		emozi = "😘";
	}
	
	document.getElementById("todayRate").innerText = result + "% " + emozi;
}

function formatDate(dateStr) {
  if (dateStr.length !== 8) return dateStr;
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  return `${year}년 ${month}월 ${day}일`;
}
