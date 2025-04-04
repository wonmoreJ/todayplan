package com.example.todayPlan.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.todayPlan.vo.BoardVO;
import com.example.todayPlan.vo.CalendarVO;
import com.example.todayPlan.vo.PlanVO;

@Repository
public class TodayPlanDAO {
	
	private DataSource dataSource;
	
	
	public TodayPlanDAO(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	@PostConstruct
    public void init() {
        try (Connection conn = dataSource.getConnection()) {
            System.out.println("✅ H2 메모리 DB 연결됨!");
            System.out.println("✅ 현재 연결된 DB URL: " + conn.getMetaData().getURL());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
	
	public Connection open() {
		try {
			return dataSource.getConnection();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public List<CalendarVO> getCalendarList(int year) throws SQLException {
		
		Connection conn = open();
		List<CalendarVO> list = new ArrayList<CalendarVO>();
		String sql = 	   "SELECT 	CALENDAR_ID "
							+ ",CONCAT(YEAR,'년',MONTH,'월',DAY,'일','(',WEEK,')') AS FULL_DATE "
							+ ",SUBSTRING(DT, 1, 4) AS YEAR "
							+ ",SUBSTRING(DT, 6, 2) AS MONTH "
							+ ",SUBSTRING(DT, 9, 2) AS DAY "
							+ ",WEEK "
							+ ",HOLIDAY_YN "
							+ ",HOLIDAY_NAME "
							+ ",DATE_FORMAT(DT, '%Y%m%d') AS DT "
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
				+ "	   SUBSTRING(A1.DT, 1, 4) AS YEAR, "
				+ "	   SUBSTRING(A1.DT, 6, 2) AS MONTH, "
				+ "	   SUBSTRING(A1.DT, 9, 2) AS DAY, "
				+ "       DATE_FORMAT(DT, '%Y%m%d') AS BOARD_FULL_DT, "
				+ "       A2.TITLE, "
				+ "       A2.CONTENT, "
				+ "       A2.BACK_COLOR, "
				+ "       A2.COMMIT_CHK, "
				+ "       DATE_FORMAT(A2.STRT_DT, '%Y%m%d') AS STRT_DT, "
				+ "       DATE_FORMAT(A2.END_DT, '%Y%m%d') AS END_DT, "
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
				+ "SUBSTRING(A1.DT,1,4) AS YEAR, "
				+ "SUBSTRING(A1.DT,6,2) AS MONTH, "
				+ "SUBSTRING(A1.DT,9,2) AS DAY, "
				+ "DATE_FORMAT(A1.DT, 'yyyyMMdd') AS BOARD_FULL_DT, "
	            + "A2.TITLE, "
	            + "A2.CONTENT, "
	            + "A2.BACK_COLOR, "
	            + "A2.COMMIT_CHK, "
	            + "DATE_FORMAT(A2.STRT_DT, '%Y%m%d') AS STRT_DT, "
	            + "DATE_FORMAT(A2.END_DT, '%Y%m%d') AS END_DT, "
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
		
		String insertSql = "INSERT INTO BOARD (USER_ID,DT) VALUES (?,?)";
		try(Connection conn = open();
				PreparedStatement pstmt = conn.prepareStatement(insertSql, Statement.RETURN_GENERATED_KEYS);){
				
				pstmt.setString(1, vo.getUserId());
				pstmt.setString(2, vo.getDt());
				pstmt.executeUpdate();
				
				try(ResultSet generatedKeys = pstmt.getGeneratedKeys();){
					if(generatedKeys.next()) {
						int id = generatedKeys.getInt(1);
						String  boardId = "board_" + id;
						vo.setBoardId(boardId);
						
						String updateSql = "UPDATE BOARD SET BOARD_ID = ? WHERE ID = ?";
						try(PreparedStatement updatePstmt = conn.prepareStatement(updateSql);){
							updatePstmt.setString(1, boardId);
							updatePstmt.setInt(2, id);
							updatePstmt.executeUpdate();
						}
						return boardId;
						
					}else {
						throw new SQLException("ID 생성 실패");
					}
				}
			
		}catch (Exception e) {
			throw new SQLException("TodayPlanDAO.addboard 실패", e);
		}
	}
	
	public String addPlan(PlanVO vo) throws SQLException {
		String insertSql = "INSERT INTO PLAN(BOARD_ID, TITLE, COMMIT_CHK, CONTENT, BACK_COLOR, STRT_DT, END_DT)VALUES(?, ?, ?, ?, ?, ?, ?)";
		try(Connection conn = open();
				PreparedStatement pstmt = conn.prepareStatement(insertSql, Statement.RETURN_GENERATED_KEYS)){
			
			pstmt.setString(1, vo.getBoardId());
			pstmt.setString(2, vo.getTitle());
			pstmt.setString(3, vo.getCommitChk());
			pstmt.setString(4, vo.getContent());
			pstmt.setString(5, "white");
			pstmt.setString(6, vo.getStrtDt());
			pstmt.setString(7, vo.getEndDt());
			pstmt.executeUpdate();
			
			try(ResultSet generatedKeys = pstmt.getGeneratedKeys();){
				if(generatedKeys.next()) {
					int id = generatedKeys.getInt(1);
					String palnId = "plan_" + id;
					vo.setPlanId(palnId);
					
					String updateSql = "UPDATE PLAN SET PLAN_ID = ? WHERE ID = ?";
					try(PreparedStatement updatePstmt = conn.prepareStatement(updateSql);){
						updatePstmt.setString(1, palnId);
						updatePstmt.setInt(2, id);
						updatePstmt.executeUpdate();
					}
					return palnId;
				}else {
					throw new SQLException("ID 생성 실패");
				}
			}
		}catch (Exception e) {
			throw new SQLException("TodayPlanDAO.addPlan 실패", e);
		}
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
