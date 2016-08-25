package com.dao;

import com.model.user.User;

/**
 * ClassName: UserMapper 
 * @Description: 用户接口
 * @author ljy
 * @date 2016年8月24日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
 
public interface BaseMapper<T>{
    
	/**
	 * @Description: 根据主键id删除数据改变disabled为1
	 * @param id
	 * @return
	 * @author ljy
	 * @date 2016年8月24日
	 */
	int deleteById(String id);

    /**
     * @Description: 插入记录
     * @param record
     * @return
     * @author ljy
     * @date 2016年8月24日
     */
    int insertRecord(T record);

    /**
     * @Description: 根据id查询记录
     * @param id
     * @return
     * @author ljy
     * @date 2016年8月24日
     */
    User selectById(String id);

    /**
     * @Description: 修改数据信息
     * @param record
     * @return
     * @author ljy
     * @date 2016年8月24日
     */
    int updateByRecord(T record);

}