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
</head>
<body>
	<%@ include file="header.jsp" %>
	<div class="divContainer">
		<table style="border:1px solid black; border-collapse: collapse;">
			<thead>
				<tr>
					<th>날짜</th>
					<th>일정</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach var="item" items="${calList}" varStatus="status">
					<tr id="calTr${item.year}${item.month}${item.day}" tabindex="${status.count}">
						<td rowspan="2" class="holiday${item.holidayYn}">${item.fullDate}</td>
						<td rowspan="2" class="addBtn" data-num="${item.year}${item.month}${item.day}">
							<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
						      	+
						    </button>
						</td>
					</tr>
					<tr id="calChk${item.year}${item.month}${item.day}"></tr>
				</c:forEach>
			</tbody>
		</table>
	
	
	
	</div>
	
	<div class="divContainer">
		<div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
    		<div class="modal-dialog">
      			<div class="modal-content">
      
			        <!-- 모달 헤더 -->
			        <div class="modal-header">
			            <h5 class="modal-title" id="myModalLabel">Add Plan</h5>
			            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="닫기"></button>
			        </div>
			
			        <!-- 모달 바디 -->
			        <div class="modal-body">
			        	<span class="hide">번호</span><input type="text" id="mdNum" readonly="readonly" class="hide">
			            제목<input type="text" id="mdTitle">
			            <br>
			            내용<input type="text" id="mdContent">
			            <br>
			            <span class="hide">시작일</span><input type="text" id="mdStrtDt" class="hide">
			            <span class="hide">종료일</span><input type="text" id="mdEndDt" class="hide">
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
	        <input type="text" id="modal_boardId"><br>
	        <input type="text" id="modal_year"><br>
	        <input type="text" id="modal_month"><br>
	        <input type="text" id="modal_day"><br>
	        <input type="text" id="modal_boardFullDt"><br>
	        <input type="text" id="modal_title"><br>
	        <input type="text" id="modal_content"><br>
	        <input type="text" id="modal_backColor"><br>
	        <input type="text" id="modal_commitChk"><br>
	        <input type="text" id="modal_strtDt"><br>
	        <input type="text" id="modal_endDt"><br>
	        <input type="text" id="modal_userId"><br>
	        <button type="button" id="modal_delete_btn" class="delete_btn">삭제</button>
	        <button type="button" id="modal_close_btn"  class="close_btn">닫기</button>
	    </div>
	</div>
<script type="text/javascript">
	const nowDt = new Date();
	const nowYear = nowDt.getFullYear();
	const nowMonth = (nowDt.getMonth()+1).toString().padStart(2,'0');
	const nowDay = (nowDt.getDate()).toString().padStart(2,'0');
	
	const now = String(nowYear +""+ nowMonth +""+ nowDay);
	
	document.getElementById("calTr"+now).focus();
	document.getElementById("calTr"+now).style.backgroundColor = 'yellow';
	document.getElementById("calChk"+now).style.backgroundColor = 'yellow';
	
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
 