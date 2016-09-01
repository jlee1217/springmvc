
package com.controller.login;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.ExpiredCredentialsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.BaseController;
import com.service.user.UserService;

@Controller
public class LoginController extends BaseController<LoginController> {

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
	/*
	 * @RequestMapping("/toLogin") public String login(UserVo vo,Model model,
	 * HttpServletRequest request, HttpServletResponse response){ //验证用户存不住
	 * List<User> list=userService.getUserList(vo); if(null == list ||
	 * list.size() !=1){ model.addAttribute("message",
	 * UserConstant.USER_IS_EXIT); return "/login/login"; } HttpSession session
	 * = request.getSession(); //将数据存储到session中 session.setAttribute("user",
	 * list.get(0)); return "/common/index"; }
	 */

	/** 
	 * 实际的登录代码 
	 * 如果登录成功，跳转至首页；登录失败，则将失败信息反馈对用户 
	 *  
	 * @param request 
	 * @param model 
	 * @return 
	 */
	@RequestMapping(value = "/login",method =RequestMethod.POST)
	public String toLogin(HttpServletRequest request, Model model) {
		String msg = "";
		String userName = request.getParameter("userName");
		String password = request.getParameter("password");
		logger.info("username:" + userName + "password:" + password);
		UsernamePasswordToken token = new UsernamePasswordToken(userName,
				password);
		token.setRememberMe(true);
		Subject subject = SecurityUtils.getSubject();
		try {
			subject.login(token);
			if (subject.isAuthenticated()) {
				return "redirect:/common/index";
			} else {
				return "/login/login";
			}
		} catch (IncorrectCredentialsException e) {
			msg = "登录密码错误. Password for account " + token.getPrincipal()
					+ " was incorrect.";
			model.addAttribute("message", msg);

		} catch (ExcessiveAttemptsException e) {
			msg = "登录失败次数过多";
			model.addAttribute("message", msg);

		} catch (LockedAccountException e) {
			msg = "帐号已被锁定. The account for username " + token.getPrincipal()
					+ " was locked.";
			model.addAttribute("message", msg);

		} catch (DisabledAccountException e) {
			msg = "帐号已被禁用. The account for username " + token.getPrincipal()
					+ " was disabled.";
			model.addAttribute("message", msg);

		} catch (ExpiredCredentialsException e) {
			msg = "帐号已过期. the account for username " + token.getPrincipal()
					+ "  was expired.";
			model.addAttribute("message", msg);

		} catch (UnknownAccountException e) {
			msg = "帐号不存在. There is no user with username of "
					+ token.getPrincipal();
			model.addAttribute("message", msg);

		} catch (UnauthorizedException e) {
			msg = "您没有得到相应的授权！" + e.getMessage();
			model.addAttribute("message", msg);

		}
		return "/common/index";
	}
	@RequestMapping(value="/logout",method=RequestMethod.GET)
	public String doLogOut(Model model, HttpServletRequest request){
		Subject user = SecurityUtils.getSubject();
		//boolean result = user.hasRole("admin");
		System.out.println("logout");
		if(null != user) user.logout();
		
		HttpSession session = request.getSession(false);
    	if(null != session) session.invalidate();
    	
		return "login";
	}
}
