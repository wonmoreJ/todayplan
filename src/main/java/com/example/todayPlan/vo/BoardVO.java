package com.example.todayPlan.vo;

import java.util.Date;

public class BoardVO {
	private String boardId;
	private String dt;
	private Date dateDt;
	private String boardFullDt;
	private String year;
	private String month;
	private String day;
	private String title;
	private String content;
	private String backColor;
	private String commitChk;
	private int strtDt;
	private int endDt;
	private String userId;
	public String getBoardId() {
		return boardId;
	}
	public void setBoardId(String boardId) {
		this.boardId = boardId;
	}
	public String getDt() {
		return dt;
	}
	public void setDt(String dt) {
		this.dt = dt;
	}
	public Date getDateDt() {
		return dateDt;
	}
	public void setDateDt(Date dateDt) {
		this.dateDt = dateDt;
	}
	public String getBoardFullDt() {
		return boardFullDt;
	}
	public void setBoardFullDt(String boardFullDt) {
		this.boardFullDt = boardFullDt;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getDay() {
		return day;
	}
	public void setDay(String day) {
		this.day = day;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
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
	public String getCommitChk() {
		return commitChk;
	}
	public void setCommitChk(String commitChk) {
		this.commitChk = commitChk;
	}
	public int getStrtDt() {
		return strtDt;
	}
	public void setStrtDt(int strtDt) {
		this.strtDt = strtDt;
	}
	public int getEndDt() {
		return endDt;
	}
	public void setEndDt(int endDt) {
		this.endDt = endDt;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	
}
