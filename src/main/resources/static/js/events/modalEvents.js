export default function modalEvents (){
	//상세조회에서 esc
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape" && document.querySelector(".modal_").classList.contains("show")) {
			document.querySelector(".modal_").classList.remove("show");
		}
	});
	
	//상세조회닫기버튼
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
}
