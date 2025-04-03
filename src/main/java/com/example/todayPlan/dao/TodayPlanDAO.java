package com.example.todayPlan.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.todayPlan.vo.BoardVO;
import com.example.todayPlan.vo.CalendarVO;
import com.example.todayPlan.vo.PlanVO;

@Repository
public class TodayPlanDAO {
	final String JDBC_DRIVER = "org.h2.Driver";
	final String JDBC_URL = "jdbc:h2:tcp://localhost/~/todayplan";
	
	public Connection open() {
		Connection conn = null;
	
		try {
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(JDBC_URL,"jwm","0000");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return conn;
	}
	
	public List<CalendarVO> getCalendarList(int year) throws SQLException {
		
		Connection conn = open();
		List<CalendarVO> list = new ArrayList<CalendarVO>();
		String sql = 	   "SELECT 	CALENDAR_ID "
							+ ",YEAR ||'년'||MONTH ||'월'||DAY||'일'||'('||WEEK||')' AS FULL_DATE "
							+ ",SUBSTRING(DT,0,4) AS YEAR "
							+ ",SUBSTRING(DT,6,2) AS MONTH "
							+ ",SUBSTRING(DT,9,2) AS DAY "
							+ ",WEEK "
							+ ",HOLIDAY_YN "
							+ ",HOLIDAY_NAME "
							+ ",FORMATDATETIME(DT, 'yyyyMMdd') AS DT "
							+ "FROM 	CALENDAR "
							+ "WHERE  YEAR = ? ";
		
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setInt(1, year);
		ResultSet rs = pstmt.executeQuery();
		try(conn; pstmt; rs;){
			while(rs.next()) {
				CalendarVO vo = new CalendarVO();
				vo.setCalendarId(rs.getInt("CALENDAR_ID"));
				vo.setFullDate(rs.getString("FULL_DATE"));
				vo.setYear(rs.getString("YEAR"));
				vo.setMonth(rs.getString("MONTH"));
				vo.setDay(rs.getString("DAY"));
				vo.setWeek(rs.getString("WEEK"));
				vo.setHolidayYn(rs.getString("HOLIDAY_YN"));
				vo.setHolidayName(rs.getString("HOLIDAY_NAME"));
				
				list.add(vo);
			}
		}
		
		return list;
	}
	public BoardVO getBoardInfo(String boardId) throws SQLException {
		
		Connection conn = open();
		String sql = "SELECT A1.BOARD_ID, "
				+ "	   SUBSTRING(A1.DT,0,4) AS YEAR, "
				+ "	   SUBSTRING(A1.DT,6,2) AS MONTH, "
				+ "	   SUBSTRING(A1.DT,9,2) AS DAY, "
				+ "       FORMATDATETIME(A1.DT, 'yyyyMMdd') AS BOARD_FULL_DT, "
				+ "       A2.TITLE, "
				+ "       A2.CONTENT, "
				+ "       A2.BACK_COLOR, "
				+ "       A2.COMMIT_CHK, "
				+ "       FORMATDATETIME(A2.STRT_DT, 'yyyyMMdd') AS STRT_DT, "
				+ "       FORMATDATETIME(A2.END_DT, 'yyyyMMdd') AS END_DT, "
				+ "       A1.USER_ID, "
				+ "       A2.PLAN_ID "
				+ "FROM BOARD A1 "
	            + "INNER JOIN PLAN A2 ON A1.BOARD_ID = A2.BOARD_ID "
				+ "WHERE A1.BOARD_ID = ? ";
		
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, boardId);
		ResultSet rs = pstmt.executeQuery();
		
		BoardVO vo = null;
		
		try(conn; pstmt; rs){
			while(rs.next()) {
				vo = new BoardVO();
				vo.setBoardId(boardId);
				vo.setYear(rs.getString("YEAR"));
				vo.setMonth(rs.getString("MONTH"));
				vo.setDay(rs.getString("DAY"));
				vo.setBoardFullDt(rs.getString("BOARD_FULL_DT"));
				vo.setTitle(rs.getString("TITLE"));
				vo.setContent(rs.getString("CONTENT"));
				vo.setBackColor(rs.getString("BACK_COLOR"));
				vo.setCommitChk(rs.getString("COMMIT_CHK"));
				vo.setStrtDt(rs.getInt("STRT_DT"));
				vo.setEndDt(rs.getInt("END_DT"));
				vo.setUserId(rs.getString("USER_ID"));
			}
		}
		
		return vo; 
	}
	public List<BoardVO> getBoard(String userId) throws SQLException{
		
		Connection conn = open();
		List<BoardVO>board = new ArrayList<BoardVO>();
		String sql = "SELECT A1.BOARD_ID, "
				+ "SUBSTRING(A1.DT,0,4) AS YEAR, "
				+ "SUBSTRING(A1.DT,6,2) AS MONTH, "
				+ "SUBSTRING(A1.DT,9,2) AS DAY, "
				+ "FORMATDATETIME(A1.DT, 'yyyyMMdd') AS BOARD_FULL_DT, "
	            + "A2.TITLE, "
	            + "A2.CONTENT, "
	            + "A2.BACK_COLOR, "
	            + "A2.COMMIT_CHK, "
	            + "FORMATDATETIME(A2.STRT_DT, 'yyyyMMdd') AS STRT_DT, "
	            + "FORMATDATETIME(A2.END_DT, 'yyyyMMdd') AS END_DT, "
	            + "A1.USER_ID "
	            + "FROM BOARD A1 "
	            + "INNER JOIN PLAN A2 ON A1.BOARD_ID = A2.BOARD_ID "
	            + "WHERE A1.USER_ID = ? ";
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, userId);
		ResultSet rs = pstmt.executeQuery();
		
		try(conn; pstmt; rs){
			while(rs.next()) {
				BoardVO vo = new BoardVO();
				vo.setBoardId(rs.getString("BOARD_ID"));
				vo.setYear(rs.getString("YEAR"));
				vo.setMonth(rs.getString("MONTH"));
				vo.setDay(rs.getString("DAY"));
				vo.setBoardFullDt(rs.getString("BOARD_FULL_DT"));
				vo.setTitle(rs.getString("TITLE"));
				vo.setContent(rs.getString("CONTENT"));
				vo.setBackColor(rs.getString("BACK_COLOR"));
				vo.setCommitChk(rs.getString("COMMIT_CHK"));
				vo.setStrtDt(rs.getInt("STRT_DT"));
				vo.setEndDt(rs.getInt("END_DT"));
				vo.setUserId(rs.getString("USER_ID"));
				
				board.add(vo);
				
			}
		}
		
		return board;
	}
	
	public String addboard(BoardVO vo) throws SQLException {
		Connection conn = open();
		String getIdSql   = "SELECT NEXT VALUE FOR BOARD_SEQ";
		String insertSql   = "INSERT INTO BOARD (BOARD_ID,USER_ID,DT) VALUES (?,?,?)";
		
		PreparedStatement getIdstmt = conn.prepareStatement(getIdSql);
		ResultSet rs = getIdstmt.executeQuery();
		
		int seq;
		try(conn; getIdstmt; rs;){
			if(rs.next()) {
				seq = rs.getInt(1);
			}else {
				throw new SQLException("시퀀스생성실패");
			}
			vo.setBoardId("board_"+seq);

			PreparedStatement pstmt = conn.prepareStatement(insertSql);
			
			try(pstmt;){
				pstmt.setString(1, vo.getBoardId());
				pstmt.setString(2, vo.getUserId());
				pstmt.setString(3, vo.getDt());
				
				pstmt.executeUpdate();
			}
		}
		return "board_"+seq;
	}
	
	public String addPlan(PlanVO vo) throws SQLException {
		Connection conn = open();
		String getIdSql = "SELECT NEXT VALUE FOR PLAN_SEQ";
		String insertSql = "INSERT INTO PLAN(PLAN_ID, BOARD_ID, TITLE, COMMIT_CHK, CONTENT, BACK_COLOR, STRT_DT, END_DT)VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
		
		PreparedStatement getIdstmt = conn.prepareStatement(getIdSql);
		ResultSet rs = getIdstmt.executeQuery();
		
		int seq;
		
		try(conn; getIdstmt; rs;){
			if(rs.next()) {
				seq = rs.getInt(1);
			}else {
				throw new SQLException("시퀀스생성실패");
			}
			
			PreparedStatement pstmt = conn.prepareStatement(insertSql);
			try(pstmt;){
				pstmt.setString(1, "plan_"+seq);
				pstmt.setString(2, vo.getBoardId());
				pstmt.setString(3, vo.getTitle());
				pstmt.setString(4, vo.getCommitChk());
				pstmt.setString(5, vo.getContent());
				pstmt.setString(6, "white");
				pstmt.setString(7, vo.getStrtDt());
				pstmt.setString(8, vo.getEndDt());
				
				pstmt.executeUpdate();
			}
		}
		
		return "plan_"+seq;
	}
	
	public void planChk(BoardVO vo) throws SQLException {
		Connection conn = open();
		String sql = "UPDATE PLAN SET COMMIT_CHK = ? WHERE BOARD_ID = ?";
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, vo.getCommitChk());
		pstmt.setString(2, vo.getBoardId());
		
		try(conn; pstmt;){
			pstmt.executeUpdate();
		}
		
	}
	
	public void deletePlan(String boardId) throws SQLException{
		Connection conn = open();
		String sql = "DELETE FROM BOARD WHERE BOARD_ID = ?";
		PreparedStatement pstmt = conn.prepareStatement(sql);
		
		try(conn; pstmt;){
			pstmt.setString(1, boardId);
			if(pstmt.executeUpdate() == 0) {
				throw new SQLException("DB삭제에러");
			}
		}
	}
}
