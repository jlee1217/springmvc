
package com.controller.user;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.BaseController;
import com.model.user.User;
import com.service.user.UserService;

/**
 * ClassName: HelloWorld 
 * @Description: 用户控制层
 * @author ljy
 * @date 2016年8月21日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/user")
public class UserController extends BaseController<UserController>{

	@Resource
	private UserService userService;

	/**
	 * @Description: 页面
	 * @return
	 * @author ljy
	 * @date 2016年8月21日
	 */

	@RequestMapping("/index")
	public String index() {
		return "userForm";
	}
	
	/**
	 * @Description: 根据id获得用户信息
	 * @param id
	 * @return
	 * @author ljy
	 * @date 2016年8月24日
	 */
	@RequestMapping("/getUserById")
	@ResponseBody
	public User getUser(String id){
		return userService.getUser(id);
	}
}
