
package com.dao.user;

import java.util.List;

import com.dao.BaseMapper;
import com.model.user.User;
import com.model.user.UserVo;

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
public interface UserMapper extends BaseMapper<UserMapper> {

	/**
	 * @Description: 得到用户集合
	 * @param qo
	 * @return
	 * @author ljy
	 * @date 2016年8月28日
	 */
	List<User> getUserList(UserVo vo);
	
}