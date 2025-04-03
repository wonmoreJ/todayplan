package com.example.todayPlan.vo;

import java.util.Date;

public class PlanVO {
	private String planId;
	private String boardId;
	private String title;
	private String commitChk;
	private String content;
	private String backColor;
	private String strtDt;
	private String endDt;
	public String getPlanId() {
		return planId;
	}
	public void setPlanId(String planId) {
		this.planId = planId;
	}
	public String getBoardId() {
		return boardId;
	}
	public void setBoardId(String boardId) {
		this.boardId = boardId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getCommitChk() {
		return commitChk;
	}
	public void setCommitChk(String commitChk) {
		this.commitChk = commitChk;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getBackColor() {
		return backColor;
	}
	public void setBackColor(String backColor) {
		this.backColor = backColor;
	}
	public String getStrtDt() {
		return strtDt;
	}
	public void setStrtDt(String strtDt) {
		this.strtDt = strtDt;
	}
	public String getEndDt() {
		return endDt;
	}
	public void setEndDt(String endDt) {
		this.endDt = endDt;
	}
}
