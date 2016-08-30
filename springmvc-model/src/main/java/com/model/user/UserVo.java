
package com.model.user;

import java.util.Date;

/**
 * ClassName: User 
 * @Description: 用户实体类
 * @author ljy
 * @date 2016年8月24日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

public class UserVo extends User {

	/**
	 * @Fields serialVersionUID : 序列化
	 */
	private static final long serialVersionUID = 533292238087696747L;

	/**
	 * @Fields startTime :  开始时间
	 */
	private Date startTime;

	/**
	 * @Fields endTime : 结束时间
	 */
	private Date endTime;

	/**
	 * @Fields rows : 分页条数
	 */
	private Integer rows;

	/**
	 * @Fields page : 分页页码
	 */
	private Integer page;

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public Integer getRows() {
		return rows;
	}

	public void setRows(Integer rows) {
		this.rows = rows;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	@Override
	public String toString() {
		return "UserQo [startTime=" + startTime + ", endTime=" + endTime
				+ ", rows=" + rows + ", page=" + page + ", getUserName()="
				+ getUserName() + ", getPassword()=" + getPassword()
				+ ", getNickName()=" + getNickName() + ", getAddress()="
				+ getAddress() + ", getTelephone()=" + getTelephone()
				+ ", getMobile()=" + getMobile() + ", getEmail()=" + getEmail()
				+ ", getRoleId()=" + getRoleId() + ", getStatus()="
				+ getStatus() + ", toString()=" + super.toString()
				+ ", getId()=" + getId() + ", getCreateTime()="
				+ getCreateTime() + ", getUpdateTime()=" + getUpdateTime()
				+ ", getDisabled()=" + getDisabled() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + "]";
	}
	
}