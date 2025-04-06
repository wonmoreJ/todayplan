/*
	날짜포맷공통함수
	입력 : getDateFormat('yyyyMMdd')
	리턴 : 20250401 
*/
function getDateFormat(formatStr, date) {
  let year = "";
  let month = "";
  let day = "";

  if (typeof date === "string") {
    year = date.slice(0, 4);
    month = date.slice(4, 6);
    day = date.slice(6, 8);
  } else {
    year = date.getFullYear().toString();
    month = (date.getMonth() + 1).toString().padStart(2, "0");
    day = date.getDate().toString().padStart(2, "0");
  }

  const formatMap = {
    "yyyyMMdd": year + month + day,
    "yyyy-MM-dd": `${year}-${month}-${day}`,
    "yyyy": year,
    "MM": month,
    "dd": day,
    "yyyy년MM월dd일": `${year}년${month}월${day}일`,
  };

  return formatMap[formatStr] || "";
}

/**
 	비동기통신공통함수
	ajaxData : {
		link : "URL주소",
		method : "GET", "POST"방식,
		type : 콘텐츠타입,
		reqData : 전송할데이터(파라미터)
	}, 
	callBack : 콜백함수
 */
async function doService(ajaxData, callBack){
	//링크,통신방식,타입, 파라미터
	try{
		const options = {
			method: ajaxData.method
		}
		if(ajaxData.type !== undefined){
			options.headers = {"Content-Type": ajaxData.type}
		}
		if(ajaxData.method !== "GET"){
			options.body = ajaxData.reqData;	
		}
		const res = await fetch(ajaxData.link,options);
		
		if(res.ok){
			let result = null;
			try{
				result = await res.json();
			}catch (e){}
			
			callBack(result);
		}	
	}catch (e){
		console.log(e);
	}
	
}


















