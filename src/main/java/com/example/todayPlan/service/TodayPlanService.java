package com.example.todayPlan.service;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.todayPlan.dao.TodayPlanDAO;
import com.example.todayPlan.vo.BoardVO;
import com.example.todayPlan.vo.CalendarVO;
import com.example.todayPlan.vo.PlanVO;

@Service
public class TodayPlanService {
	
	private TodayPlanDAO dao;
	
	@Autowired //클래스에 생성자가 하나만 있을경우 autowired 생략 가능함
	public  TodayPlanService(TodayPlanDAO dao) {
		this.dao = dao;
	}
	
	//달력조회
	public List<CalendarVO> getCalendarList() throws SQLException{
		int year = LocalDate.now().getYear();
		List<CalendarVO> list = dao.getCalendarList(year);
		return list;
	}
	
	public List<BoardVO> getBoardInfo(String userId) throws SQLException {
		List<BoardVO> list = dao.getBoard(userId);
		return list;
	}
	
	public BoardVO getplanInfo(String boardId) throws SQLException {
		BoardVO vo = dao.getBoardInfo(boardId);
		return vo;
	}
	
	public void planChk(BoardVO vo) throws SQLException {
		dao.planChk(vo);
	}
	
	public void deletePlan(String boardId) throws SQLException {
		dao.deletePlan(boardId);
	}
	
	public Map<String,String> addboard(Map<String, Object> boardData) throws SQLException {
		BoardVO bvo = new BoardVO();
		bvo.setUserId((String) boardData.get("userId"));
		bvo.setDt((String)boardData.get("dt"));
		String boardId = dao.addboard(bvo);
		String planId = "";
		if(!boardId.isEmpty()) {
			PlanVO pvo = new PlanVO();
			pvo.setBoardId(boardId);
			pvo.setTitle((String) boardData.get("title"));
			pvo.setCommitChk("N");
			pvo.setContent((String) boardData.get("content"));
			pvo.setStrtDt((String) boardData.get("strtDt"));
			pvo.setEndDt((String) boardData.get("endDt"));
			planId = dao.addPlan(pvo);
		}
		
		Map<String,String> id = new HashMap<String, String>();
		id.put("boardId", boardId);
		id.put("planId", planId);
		
		return id;
	}
}









