
package com.controller.login;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.BaseController;
import com.model.constant.UserConstant;
import com.model.user.User;
import com.model.user.UserVo;
import com.service.user.UserService;

@Controller
@RequestMapping("/login")
public class LoginController extends BaseController<LoginController>{
	@Resource
	private UserService userService;
	
	@RequestMapping("/index")
	public String index() {
		return "/login/login";
	}
	
	/**
	 * @Description: 登录
	 * @param userName
	 * @param password
	 * @return
	 * @author ljy
	 * @date 2016年8月30日
	 */
	@RequestMapping("/login")
	public String login(UserVo vo,Model model,
			HttpServletRequest request, HttpServletResponse response){
		//验证用户存不住
		List<User> list=userService.getUserList(vo);
		if(null == list || list.size() !=1){
			model.addAttribute("message", UserConstant.USER_IS_EXIT);
			return "/login/login";
		}
		 HttpSession session =  request.getSession();
		 //将数据存储到session中
		 session.setAttribute("user", list.get(0));
		return "/common/index";
	}
}
