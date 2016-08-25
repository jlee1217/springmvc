
package com.service.user;

import com.model.user.User;

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
}
