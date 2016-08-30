
package com.service.user;

import java.util.List;

import com.model.user.User;
import com.model.user.UserVo;

/**
 * ClassName: UserService 
 * @Description: 用户接口
 * @author ljy
 * @date 2016年8月21日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

public interface UserService {

	/**
	 * @Description: 根据id获得用户信息
	 * @param id
	 * @return
	 * @author ljy
	 * @date 2016年8月24日
	 */
	User getUser(String id);
	
	/**
	 * @Description: 得到用户集合
	 * @param qo
	 * @return
	 * @author ljy
	 * @date 2016年8月28日
	 */
	List<User> getUserList(UserVo vo);
	
	
}
