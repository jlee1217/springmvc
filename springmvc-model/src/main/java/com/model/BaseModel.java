package com.model;

import java.util.Date;

/**
 * ClassName: BaseModel 
 * @Description: 基础实体类属性
 * @author ljy
 * @date 2016年8月24日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *	
 */
 
public class BaseModel {
    
	/**
	 * @Fields id : 主键id
	 */
	private String id;

    /**
     * @Fields createTime : 创建时间
     */
    private Date createTime;

    /**
     * @Fields updateTime : 修改时间
     */
    private Date updateTime;

    /**
     * @Fields disabled : 删除标识
     */
    private Integer disabled;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }


    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Integer getDisabled() {
        return disabled;
    }

    public void setDisabled(Integer disabled) {
        this.disabled = disabled;
    }
}