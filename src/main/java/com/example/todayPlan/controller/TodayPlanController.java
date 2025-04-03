package com.example.todayPlan.controller;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.todayPlan.service.TodayPlanService;
import com.example.todayPlan.vo.BoardVO;
import com.example.todayPlan.vo.CalendarVO;

@Controller
@RequestMapping("/toplan")
public class TodayPlanController {
	private TodayPlanService svc;
	
	@Autowired
	public TodayPlanController(TodayPlanService svc) {
		this.svc = svc;
	}
	
	@GetMapping("/main")
	public String main(Model m) {
		
		try {
			
			//userid 파라미터는 로그인시 session 추가해서 가져오기. 아직 로그인화면 미구현으로 추후 개발예정
			String userId = "원몽";
			List<CalendarVO> calList = svc.getCalendarList(); //달력조회
			List<BoardVO> planList = svc.getBoardInfo(userId); //plan조회
			
			m.addAttribute("calList"  , calList);
			m.addAttribute("planList", planList);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return "main";
	}
	
	@PostMapping("/addboard")
	@ResponseBody
	public Map<String,String> addboard(@RequestBody Map<String, Object> boardData) {
		
		Map<String,String> boardId = null;
		try {
			boardId = svc.addboard(boardData);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return boardId;
	}

	@PostMapping("/planinfo")
	@ResponseBody
	public BoardVO getPlanInfo(@RequestBody String boardId){
		
		BoardVO boardInfo = null;
		
		try {
			boardInfo = svc.getplanInfo(boardId);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return boardInfo;
	}
	
	@PostMapping("/planChk")
	@ResponseBody
	public ResponseEntity<Void> planChk(@RequestBody BoardVO vo){
		
		try {
			svc.planChk(vo);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/deleteplan/{boardId}")
	public ResponseEntity<Void> deletdePlan(@PathVariable String boardId){
		try {
			svc.deletePlan(boardId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.noContent().build();
	}
	
	
	
}
