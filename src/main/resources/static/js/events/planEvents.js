import * as api from "../services/api.js";

export function planEvents (){
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
	
	//paln삭제
	document.getElementById("modal_delete_btn").addEventListener("click", async function(){
		const boardId = document.getElementById("modal_boardId").value;
		await api.deletePlan(boardId);
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
		
		await api.insertPlan(boardData);
	});
}

//DOMContentLoaded 필요없는것
//플랜제목클릭
document.addEventListener("click", async function(e) {
	if (e.target.classList.contains("boardTdTitle")) {
		const boardId = e.target.id;
		await api.getPlanInfo(boardId);
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
		await api.planChk(planData);
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
			await api.planChk(planData);
		}
	}
});

//plan추가함수
export function addPlan(planInfo){ 
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
	
	if(parseInt(getDateFormat('yyyyMMdd', nowDt)) > parseInt(paramDt)){
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
export function mdReset(){
	["mdNum","mdTitle","mdContent","mdStrtDt","mdEndDt"].forEach(id => document.getElementById(id).value = "");
}
//오늘달성률
export function todayRate(){
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