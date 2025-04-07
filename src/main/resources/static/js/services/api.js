import * as planEvents from "../events/planEvents.js";
//플랜체크박스체크
export async function planChk(planData){
	let reqParam = {
		link : "/toplan/planChk",
		method : "POST",
		type : "application/json",
		reqData :  JSON.stringify(planData)
	}
	
	let callBack = () => {
		document.getElementById(planData.boardId).classList.toggle("chkOk");
		planEvents.todayRate();			
	}
	
	await doService(reqParam,callBack);
}

//플랜추가
export async function insertPlan(boardData){
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
		planEvents.addPlan(planInfo);
		return result.boardId;
	}
	
	await doService(reqParam,callBack);
}

//플랜조회
export async function getPlanInfo(boardId){
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
export async function deletePlan(boardId){
	
	let reqParam = {
		link : "/toplan/deleteplan/"+boardId,
		method : "POST",
	}
	
	let callBack = () => {
		[boardId,"chk"+boardId].forEach(id => document.getElementById(id).remove());
		document.querySelector('.modal_').classList.remove('show');
		planEvents.todayRate();
	}
	
	await doService(reqParam,callBack);
};
