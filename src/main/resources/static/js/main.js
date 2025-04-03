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
	
	//plan상세클릭
	document.querySelectorAll(".boardTdTitle").forEach(td => {
		td.addEventListener("click", async function(){
			const modal = document.querySelector(".modal_");
			//document.getElementById("modal_boardId").value = this.id;
			await getPlanInfo(this.id);
			modal.style.display = 'block';
		})	
	});
	
	//plan상세닫기
	document.getElementById("modal_close_btn").addEventListener("click", function(){
		const modal = document.querySelector(".modal_");
		modal.style.display = 'none';
	});
	
	//paln삭제
	document.getElementById("modal_delete_btn").addEventListener("click", async function(){
		const boardId = document.getElementById("modal_boardId").value;
		const result = await deletePlan(boardId);
		if(result == "ok"){
			[boardId,"chk"+boardId].forEach(id => document.getElementById(id).remove());
			const modal = document.querySelector(".modal_");
			modal.style.display = 'none';
		}
		todayRate();
	});
	
	//체크박스클릭
	document.querySelectorAll(".boardTdChk").forEach(btn => {
		btn.addEventListener("click", async function(){
			const id = this.id.replace("chk","");
			const chkId = "chkBox"+this.id.replace("chk",""); 
			const planData = {
				"boardId": id,
				"commitChk" : document.getElementById(chkId).checked ? "Y" : "N"	
			}
			await planChk(planData);
		})
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

		["modal_boardId", "modal_year", "modal_month", "modal_day", "modal_boardFullDt", "modal_title"      
		,"modal_content", "modal_backColor", "modal_commitChk", "modal_strtDt", "modal_endDt", "modal_userId"].forEach(id => {
			const key = id.replace("modal_", "");
			document.getElementById(id).value = result[key] ?? "";
		});
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
	const tr1 	     = document.getElementById("calTr"+planInfo.dt);
    const cell1 	 = tr1.insertCell(tr1.childElementCount-1);
    cell1.setAttribute("id", planInfo.boardId);
    cell1.setAttribute("class", "boardTdTitle");
    cell1.innerText = planInfo.title;
	
    const tr2		 = document.getElementById("calChk"+planInfo.dt);
    const cell2 	 = tr2.insertCell(tr2.childElementCount);
    cell2.setAttribute("id", "chk"+planInfo.boardId);
    cell2.setAttribute("class", "boardTdChk");
    cell2.innerHTML = "<input type='checkbox' id='chkBox"+planInfo.boardId+"'>"; 			
	
	
	const modalElement = document.getElementById('myModal');
	const modal = bootstrap.Modal.getInstance(modalElement);
	
	if(planInfo.commitChk == "Y"){
		document.getElementById("chkBox"+planInfo.boardId).checked = true;
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
	document.getElementById("todayRate").innerText = result + "%"
}





















