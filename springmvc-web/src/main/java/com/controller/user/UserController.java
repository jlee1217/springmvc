
package com.controller.user;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.BaseController;
import com.common.utils.PageUtils;
import com.github.pagehelper.PageHelper;
import com.model.user.User;
import com.model.user.UserQo;
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

	@RequestMapping("/userList")
	public String index() {
		return "/user/userList";
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
	
	/**
	 * @Description: 得到用户列表
	 * @param qo查询条件
	 * @return 用户集合
	 * @author ljy
	 * @date 2016年8月28日
	 */
	@RequestMapping(value="getUserlist",method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<User> getUserList(UserQo qo){
		logger.info("UserInfo:"+qo);
		PageHelper.startPage(qo.getPage(),qo.getRows(), true);
		List<User> list = userService.getUserList(qo);
		PageUtils<User> result=new PageUtils<User>(list);
		return result;
	}
}
