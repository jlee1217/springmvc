<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>登录</title>
<!-- Css -->
	<link rel="stylesheet" type="text/css" href="${ctx}/static/base/css/login/Login.css">
	<!-- JQuery文件导入 -->
	<script src="${ctx}/static/base/js/jquery-1.11.1.min.js"></script>
	<style>
    .utag{
      position: fixed;
      z-index: 99;
    }
    .uhide{
      display: none;
    }
    .tooltips{
      position:relative;
      width:300px;
      height:130px;
      background:#fafafa;
      border:1px solid #A5C4EC;
      border-radius:4px;
    }
    .tooltips-cont{
      font-size: 12px;
      color: #666666;
      padding: 10px 15px;
      line-height: 18px;
    }
    .arrow{
      position:absolute;
      width: 0px;
      height:0px;
      line-height: 0px;
      border-width: 0 8px 12px;
      border-style: solid dashed dashed dashed;
      border-left-color: transparent;
      border-right-color: transparent;
    }
    .arrow-border{
      color: #A5C4EC;
      top: -12px;
      left: 20px;
    }
    .arrow-bg{
      color: #fafafa;
      top: -10px;
      left: 20px;
    }
  </style>
</head>
<body>
<div class="all"  >
		<div class="" style="position: absolute; top: 175px; left: 560px;" >
			
		</div>
		<form id="fm1" action="${ctx}/login" method="post" >
		<div class="Logins_div" >
			<div id="d">
				<div id="div1" name="dv" >
					<div class="login_main_errortip">${message}</div>
		        	<p class="Login_User">
		        		用户名：<input type="text" id="username" name="userName" value=""/>
		        	</p>  
		        	<p class="Login_User">
		        		密　码：<input type="password" id="password" name="password" value=""/>
		        	</p>
		        	<!-- <p class="Login_Yan">
		        		<span>验证码：</span><input type="text" id="authcode" name="authcode" style="width:140px;"/>
						<img alt="验证码" src="" title="点击更换" id="kaptcha" style="height:28px;height:30px\0;width:75px;float:right;padding-right:25px\0;padding-right:25px;"/>
		        	</p> -->
		        	<p style="text-align: right; padding-right: 28px; padding-right: 26px\0;">
		        		<input class="Login_btn" id="login_btn" value="登　　录" type="button" onclick="loginSubmit();"/>
						<input class="Login_btn" value="重　　置" type="reset" />
		        	</p>
				</div>
				 <%--用于输入后台返回的验证错误信息 --%>  
    <P><c:out value="${message }" /></P>  
				</div>
		
		</div>
		</form>
		</div>		
		<script>
			window.parent.postMessage("refresh",'*');
		</script>
</body>
<script type="text/javascript">

function loginSubmit(){
	var username = $("#username").val();
	var password = $("#password").val();
	var authcode = $("#authcode").val();
	if(username ==''){
		$(".login_main_errortip").html("请填写用户名");
		$("#username").focus();
		return ;
	}
	if(password == ''){
		$(".login_main_errortip").html("请填写密码");
		$("#password").focus();
		return ;
	}
	/* if(authcode == ''){
		$(".login_main_errortip").html("必须输入验证码");
		$("#authcode").focus();
		return;
	} */
	$("#login_btn").attr("disabled","true");
	$("#fm1").submit();
}  	

$("#kaptcha").click(function(){
	$(this).attr("src",'/verifyCode?'+Math.random());
});

//回车登录
document.onkeydown = function(e){
  var e = e || window.event;
  var keyCode = e.keyCode || e.which;
  var tg = e.srcElement || e.target;
  if(keyCode == 13){
	  loginSubmit();
  }
}
</script>
</html>