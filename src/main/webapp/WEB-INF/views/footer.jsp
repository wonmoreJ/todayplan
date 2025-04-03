<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
footer {
  position: fixed;
  bottom: 0; left: 0;
  height: 80px;
  width: 100%;
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 높이 조정 */
}

.footer_div {
  text-align: center;
  width: 250px;
  margin: 0 10px; /* div 간격 */
}

/* table 관련 스타일 추가 */
.footer_div table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
}

.footer_div th,
.footer_div td {
  padding: 0;         /* 여백 제거 */
  margin: 0;          /* 여백 제거 */
  text-align: center;
  vertical-align: middle;
}
</style>
</head>
<body>
	<footer>
		<div class="footer_container">
			<div class="footer_div">
				<table>
					<tr>
						<th>오늘달성률</th>
					</tr>
					<tr>
						<td><span id="todayRate">0%</span></td>
					</tr>
				</table>
			</div>
			<div class="footer_div">
				<table>
					<tr>
						<th>이번주달성률</th>
					</tr>
					<tr>
						<td>0%</td>
					</tr>
				</table>
			</div>
			<div class="footer_div">
				<table>
					<tr>
						<th>이번달달성률</th>
					</tr>
					<tr>
						<td>0%</td>
					</tr>
				</table>
			</div>
			<div class="footer_div">
				<table>
					<tr>
						<th>이번년달성률</th>
					</tr>
					<tr>
						<td>0%</td>
					</tr>
				</table>
			</div>
		</div>	
	</footer>
</body>
</html>