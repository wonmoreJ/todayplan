<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="/js/main.js"></script>
<link rel="stylesheet" href="/css/main.css">
  </style>
</head>
<body>
	<%@ include file="header.jsp" %>
	<div class="divContainer">
		<table class="mainTable">
			<thead>
				<tr>
					<th>날짜</th>
					<th>일정</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach var="item" items="${calList}" varStatus="status">
					<tr id="calTr${item.year}${item.month}${item.day}" tabindex="${status.count}">
						<td rowspan="2" class="tc calTableTd holiday${item.holidayYn}">${item.fullDate}</td>
						<td rowspan="2" class="addBtn" data-num="${item.year}${item.month}${item.day}">
							<c:if test="${item.dtResult == 'Y'}">
								<button type="button" class="addBtnStyle addBtnHover" data-bs-toggle="modal" data-bs-target="#myModal">
									+
							    </button>
							</c:if>
							<c:if test="${item.dtResult == 'N'}">
								<button type="button" class="addBtnEndStyle" data-bs-toggle="modal" data-bs-target="#myModal" disabled="disabled">
									+
							    </button>
							</c:if>
						</td>
					</tr>
					<tr id="calChk${item.year}${item.month}${item.day}"></tr>
				</c:forEach>
			</tbody>
		</table>
	
	
	
	</div>
	
	<div class="divContainer">
		<div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
    		<div class="modal-dialog modal-dialog-centered">
      			<div class="modal-content">
      
			        <!-- 모달 헤더 -->
			        <div class="modal-header">
			            <h5 class="modal-title" id="myModalLabel">Add Plan</h5>
			            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="닫기"></button>
			        </div>
			
			        <!-- 모달 바디 -->
			        <div class="modal-body">
						<input type="text" id="mdNum" readonly class="hide">
					  	<label for="mdTitle">제목</label>
					  	<input type="text" id="mdTitle">
					  	<label for="mdContent">내용</label>
					  	<input type="text" id="mdContent">
					  	<input type="text" id="mdStrtDt" class="hide">
					  	<input type="text" id="mdEndDt" class="hide">
					</div>
			
			        <!-- 모달 푸터 -->
			        <div class="modal-footer">
			        	<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
			            <button type="button" class="btn btn-primary" id="modalAddPlan">추가</button>
			        </div>

      			</div>
    		</div>
  		</div>
	</div>
	<%@ include file="footer.jsp" %> 
	<!--모달 팝업-->
	
	<div class="modal_">
  		<div class="modal_popup_">
    		<div class="modal_header_">
      			<h2>플랜</h2>
      			<button type="button" class="modal_close_icon_" id="modal_close_icon">×</button>
    		</div>

    		<div class="modal_body_">
		    	<div class="modal_section_">
        			<div class="modal_label_group_">
			        	<span class="modal_icon_">📅</span>
			        	<span class="modal_label_text_">날짜</span>
        			</div>
        			<div class="modal_value_" id="modal_boardFullDt_view"></div>
      			</div>

      			<div class="modal_section_">
			    	<div class="modal_label_group_">
			        	<span class="modal_icon_">📝</span>
			          	<span class="modal_label_text_">제목</span>
			        </div>
			        <div class="modal_value_" id="modal_title_view"></div>
			    </div>

		      	<div class="modal_section_">
		        	<div class="modal_label_group_">
		          		<span class="modal_icon_">💬</span>
		          		<span class="modal_label_text_">내용</span>
		        	</div>
		        	<div class="modal_value_" id="modal_content_view"></div>
		      	</div>

		      	<!-- 숨겨진 input들 -->
		      	<input type="text" id="modal_boardId" hidden>
		      	<input type="text" id="modal_year" hidden>
		      	<input type="text" id="modal_month" hidden>
		      	<input type="text" id="modal_day" hidden>
		      	<input type="text" id="modal_backColor" hidden>
		      	<input type="text" id="modal_commitChk" hidden>
		      	<input type="text" id="modal_strtDt" hidden>
		      	<input type="text" id="modal_endDt" hidden>
		      	<input type="text" id="modal_userId" hidden>
    		</div>
    		<div class="modal_footer_">
		    	<button type="button" id="modal_delete_btn" class="delete_btn">삭제</button>
		      	<button type="button" id="modal_close_btn" class="close_btn">닫기</button>
    		</div>
  		</div>
	</div>
<script type="text/javascript">
	const nowDt = new Date();
	const nowYear = nowDt.getFullYear();
	const nowMonth = (nowDt.getMonth()+1).toString().padStart(2,'0');
	const nowDay = (nowDt.getDate()).toString().padStart(2,'0');
	
	const now = String(nowYear +""+ nowMonth +""+ nowDay);
	
	document.getElementById("calTr"+now).style.outline = "none";
	document.getElementById("calTr"+now).focus();

	document.getElementById("calTr"+now).firstElementChild.style.backgroundColor = 'yellow';
	//document.getElementById("calTr"+now).firstElementChild.style.border = '2px solid black';
	
	//plan추가
	const planList = [
		<c:forEach var="plan" items="${planList}" varStatus="loop">
		{
			boardId : "${plan.boardId}",
			year : "${plan.year}",
			month : "${plan.month}",
			day : "${plan.day}",
			boardFullDt : "${plan.boardFullDt}",
			title : "${plan.title}",
			content : "${plan.content}",
			backColor : "${plan.backColor}",
			commitChk : "${plan.commitChk}",
			strtDt : "${plan.strtDt}",
			endDt : "${plan.endDt}",
			userId : "${plan.userId}"
		}<c:if test="${!loop.last}">,</c:if>
		</c:forEach>
	];
	
	planList.forEach(plan => {
		addPlan({
			title : plan.title,
			dt    : plan.year + plan.month + plan.day, 
			boardId : plan.boardId,
			commitChk : plan.commitChk
		})
	});
</script>
</body>
</html>
 