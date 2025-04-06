//플랜제목클릭
document.addEventListener("click", async function(e) {
	if (e.target.classList.contains("boardTdTitle")) {
		const boardId = e.target.id;
		await getPlanInfo(boardId);
		document.querySelector('.modal_').classList.add('show');
	}
});

//체크박스클릭
document.addEventListener("click", async function(e){
	if(e.target.classList.contains("tdChk")){
		e.stopPropagation();
		const id = e.target.id.replace("chkBox","");
		const planData = {
			"boardId": id,
			"commitChk" : document.getElementById(e.target.id).checked ? "Y" : "N",
		}
		await planChk(planData);
	}
});

//체크박스TD클릭
document.addEventListener("click", async function(e){
	if(e.target.classList.contains("boardTdChk")){
		if(e.target.tagName !== "INPUT"){
			const id = e.target.id.replace("chk","");
			const chkId = "chkBox"+e.target.id.replace("chk",""); 
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
		}
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
		await deletePlan(boardId);
	});
	
	//모달창 추가버튼
	document.getElementById("modalAddPlan").addEventListener("click", async function(){
		let num = document.getElementById("mdNum").value;
		let title = document.getElementById("mdTitle").value;
		let content = document.getElementById("mdContent").value;
		
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
		
		await insertPlan(boardData);
	});
});

//플랜체크박스체크
async function planChk(planData){
	let reqParam = {
		link : "/toplan/planChk",
		method : "POST",
		type : "application/json",
		reqData :  JSON.stringify(planData)
	}
	
	let callBack = () => {
		document.getElementById(planData.boardId).classList.toggle("chkOk");
		todayRate();			
	}
	
	await doService(reqParam,callBack);
}

//플랜추가
async function insertPlan(boardData){
	let reqParam = {
		link : "/toplan/addboard",
		method : "POST",
		type : "application/json",
		reqData :  JSON.stringify(boardData)
	}
	
	let callBack = (result) => {
		const planInfo = {	title : boardData.title,
						 			dt : boardData.num,
						 			param : "add",
						 			boardId : result.boardId  };
		addPlan(planInfo);
		return result.boardId;
	}
	
	await doService(reqParam,callBack);
}

//플랜조회
async function getPlanInfo(boardId){
	let reqParam = {
		link : "/toplan/planinfo",
		method : "POST",
		type : "text/plain",
		reqData :  boardId
	}
	
	let callBack = (result) => {
		["modal_boardId", "modal_year", "modal_month", "modal_day"      
		, "modal_backColor", "modal_commitChk", "modal_strtDt", "modal_endDt", "modal_userId"].forEach(id => {
			const key = id.replace("modal_", "");
			document.getElementById(id).value = result[key] ?? "";
		});

		const paramDt 	= result["boardFullDt"];
		const nowDt 	  	= new Date();
		document.getElementById("modal_boardFullDt_view").textContent = getDateFormat('yyyy년MM월dd일',result["boardFullDt"]);
		document.getElementById("modal_title_view").textContent = result["title"];
		document.getElementById("modal_content_view").textContent = result["content"];
		if(nowDt > new Date(paramDt.substring(0,4)+"-"+paramDt.substring(4,6)+"-"+paramDt.substring(6,8))){
			document.getElementById("modal_delete_btn").style.display = "none";
		}else{
			document.getElementById("modal_delete_btn").style.display = "block";
		}
	}
	await doService(reqParam,callBack);
};

//플랜삭제
async function deletePlan(boardId){
	
	let reqParam = {
		link : "/toplan/deleteplan/"+boardId,
		method : "POST",
	}
	
	let callBack = () => {
		[boardId,"chk"+boardId].forEach(id => document.getElementById(id).remove());
		document.querySelector('.modal_').classList.remove('show');
		todayRate();
	}
	
	await doService(reqParam,callBack);
};

//plan추가함수
function addPlan(planInfo){
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