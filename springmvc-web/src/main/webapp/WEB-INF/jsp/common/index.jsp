<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/easyui.jsp"%>
<!DOCTYPE html> 
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>springmvc-V2.0.0</title>
    <style>
    .easyhelp{position:absolute; left:15px;  bottom:5px ;}
	.l-btn:hover { background: transparent; border: none; color:#fff; }
    .l-btn{background: transparent;border: none;color:#fff;}
    .l-btn-text{ font-size:14px;}
    </style>
</head>
<body>
<div class="basic-header">
	<div class="logo">
		<a href="#"><img src="${ctx}/static/base/frame/images/logo.png"> <span style="font-size: 20px;">springmvc</span></a>
	</div><!--end logo -->
    
    <div class="header-load">
    	<a class="header-load-link"><span class="name">${user.nickName},您好</span> <i class="iconfont">&#xe606;</i></a>
        <div class="linkdiv">
        	<a href="${ctx}/logout">退出</a>
        </div><!--end linkdiv -->
    </div><!--end header-load -->
</div><!--end header -->

<div class="basic-body">
	<div class="left-big-menu">
    	<div class="scroll-y-box" id="leftMenuContent">

    	</div><!--end scroll-y-box -->
    
    </div><!--end left-big-menu-->
    
    <div class="basic-right">
        <div class="basic-main">
            <div class="scroll-y-box basic-main-content">
				<!--start内容区 -->
            	<div id="component-content" class="easyui-tabs" fit="true" border="false">
                    <%--<div title="首页" data-options="closable:false" >--%>
						<%--<iframe scrolling="auto" frameborder="0"  src="${ctx}/purchase/paymentOrder/index" style="width:100%;height:100%;"></iframe>--%>
                    <%--</div>--%>
                </div>  
				<!--end 内容区 -->
                
            </div><!--end scroll-y-box -->
        </div><!--end basic-main -->
	</div><!--end basic-right -->    
</div><!--end basic-body -->

<div id="mm" class="easyui-menu" style="width:120px;">
	<div id="mm-tabupdate">刷新</div>
	<!-- <div id="mm-tabrepeat">复制</div> -->
	<div class="menu-sep"></div>
	<div id="mm-tabclose">关闭</div>
	<div id="mm-tabcloseall">全部关闭</div>
	<div id="mm-tabcloseother">关闭其它</div>
	<div class="menu-sep"></div>
	<div id="mm-tabcloseright">关闭右侧</div>
	<div id="mm-tabcloseleft">关闭左侧</div>
	<div class="menu-sep"></div>
	<div id="mm-exit">退出</div>
</div>
	
</body>
</html>
<script type="text/javascript">
$(function(){
	//加载一、二级菜单
	loadLeftMenu();
	
	//添加测试数据
	var menuHtml = testData();    	
	
	$("#leftMenuContent").html(menuHtml);
	
	//顶部右侧登录
	$(".header-load-link").on("click",function(){
		addActive("header-load");
	});
	
	//左侧大菜单关闭打开
	collapseLeftMenu();
	
	$("#component-content").tabs("resize");
	//绑定tab页关闭
	tabClose();
	
	//绑定tab页右键菜单
	tabMenuEven();

	//加载首页
	//openNewTab('首页','${ctx}/user/index','null');
	
	//一级子菜单收缩功能
	clickMenuItem();
	
});

function testData(){
	var testHtml = "";
	
	testHtml += "<div class=\"menu-box\">";
	testHtml +=		"<div class=\"menu-title\"><i class=\"iconfont\">&#xe606;</i><span>内容1</span></div>";
		
	testHtml +=		"<ul class=\"menu-trans\" abc=\"4\">";
	testHtml +=			"<li><a href=\"javascript:openNewTab('二级内容1','salesReport/toReport','icon-hamburg-left');\"><i class=\"iconfont\"></i><span>二级内容1</span></a></li>";
	testHtml +=		"</ul>";
	testHtml +=	"</div>";
	testHtml +=	"<div class=\"menu-box\">";
	testHtml +=		"<div class=\"menu-title\"><i class=\"iconfont\">&#xe606;</i><span>系统管理</span></div>";
	testHtml +=		"<ul class=\"menu-trans\" abc=\"5\">";
	testHtml +=			"<li><a href=\"javascript:openNewTab('用户管理','${ctx}/user/userList','icon-hamburg-left');\"><i class=\"iconfont\"></i><span>用户管理</span></a></li>";
	testHtml +=			"<li><a href=\"javascript:openNewTab('修改密码','${ctx}/user/updateUserPwd','icon-hamburg-left');\"><i class=\"iconfont\"></i><span>修改密码</span></a></li>";	
	testHtml +=		"</ul>";
	testHtml +=	"</div>";
	
	return testHtml;
}

//一二级菜单面板收缩功能
function collapseLeftMenu(){
	$(".big-menu-switch").on("click",function(){
		addActive("basic-body");
		$("#component-content").tabs("resize");//内容区最外层的组件尺寸刷新
	});
}

//一级子菜单收缩功能
function clickMenuItem(){
	//二级菜单选中样式
	$(".menu-trans li").on("click",function(){
		$(".menu-trans li").removeClass("active");
		$(this).addClass("active");
	});
	
	//二级菜单收缩功能
	$(".menu-title").on("click",function(){
		parentState(this,"menu-box-active");
	});
}

//显示 折叠按钮
function showCollapseIcon(){
	$("#collapseIcon").removeClass("none");
}

//隐藏 折叠按钮
function hideCollapseIcon(){
	$("#collapseIcon").addClass("none");
}

function currentState(id,name){
	if(!id.hasClass(name)){
		id.addClass(name);
	}else{
		id.removeClass(name);
	}
}

function addActive(name){
	var objName = "." + name;
	var activeName = name +"-active";
	if($(objName).hasClass(activeName)){
		$(objName).removeClass(activeName);
	}else{
		$(objName).addClass(activeName);
	}
}

function parentState(obj,name){
	var parent = $(obj).parent();
	if(parent.hasClass(name)){
		parent.removeClass(name);
	}else{
		parent.addClass(name);
	}	
}
var menuData;
function loadLeftMenu(){
	$.ajax({
	    async:false,
	    type:'get',
	    url:"",
	    success: function(data){
	    	
	    	if(data == null || data.length == 0){
	    		alert("您没有该系统的访问权限！");
	    		window.location='${ctx}/logout';
	    		return ;
	    	}
	    	//data = initData; 
	    	menuData = data;
	    	var menuHtml = "";
	    	
	    	//一、二级菜单折叠 
	   		menuHtml += 	"<div class=\"big-menu-switch\"><i class=\"iconfont\">&#xe611;</i></div>";
	   		
	   		//循环一级菜单 begin
	    	$(data).each(function(i){
	    		var o = this;
	    			//一级菜单父节点ID为null
   		   			menuHtml += "<div class=\"menu-box\">";
   		   			
   		   			//一级菜单
   		   			menuHtml += 	"<div class=\"menu-title\">";
   		   			menuHtml +=			"<i class=\"iconfont\">&#xe606;</i>"; 
   		   			menuHtml +=			"<span>"+o.name+"</span>";
   		   			menuHtml +=		"</div>";
   		   			
   		   			//二级菜单
   		   			menuHtml +=	"<ul class=\"menu-trans\" abc=\""+i+"\">";
		   			
		   			//循环二级菜单 begin
		   			$(o.children).each(function(j){
		   				var p = this;
				   			
		   					//二级菜单01，有子菜单，有三级菜单，即无URL的 
		   					if(!p.isleaf){
		   						menuHtml += "<li>";
		   						menuHtml += 	"<a href=\"javascript:openChildMenu('"+p.id+"');\">";
		   						menuHtml += 		"<i class=\"iconfont\">&#xe613;</i>";
		   						menuHtml +=			"<span>"+p.name+"</span>";
		   						menuHtml +=		"</a>";
		   						menuHtml +=	"</li>";
		   						
		   					} else {	//二级菜单02，无子菜单，仅有二级，即有URL的
		   						menuHtml += "<li>";
		   						menuHtml += 	"<a href=\"javascript:openNewTab(\'"+p.name+"\',\'"+p.url+"\',\'"+p.icon+"\');\">";
		   						menuHtml += 		"<i class=\"iconfont\">&#xe613;</i>";	//TODO 需要动态构建icon样式，目前默认iconfont
		   						menuHtml +=			"<span>"+p.name+"</span>";
		   						menuHtml +=		"</a>";
		   						menuHtml +=	"</li>";
		   						
		   					}
		   					
		   			});
		   			//循环二级菜单 end
		   			
		   			menuHtml +=	"</ul>";
		   			
		   			menuHtml +=	"</div>";
   		 	});
	    	//循环一级菜单 end
	    	
	    	$("#leftMenuContent").html(menuHtml);
	    	//一级子菜单收缩功能
	    	clickMenuItem();
	    }
	});
}


function openNewTab(subtitle, url, icon){
	//新增tab页
	addTab(subtitle, url, icon);
	$("#component-content").tabs("resize");//内容区最外层的组件尺寸刷新
}

function addTab(subtitle, url, icon) {
	if (!$('#component-content').tabs('exists', subtitle)) {
		$('#component-content').tabs('add', {
			title : subtitle,
			content : createFrame(url),
			closable : true
			//icon : icon	tab图标暂时不用
		});
	} else {
		//刷新tab页
		$('#component-content').tabs('select', subtitle);
		var currTab = $('#component-content').tabs('getSelected');
		$('#component-content').tabs('update', {
			tab : currTab,
			options : {
				content : createFrame(url)
			}
		});
	}
	tabClose();
}

function selectTab(subtitle){
	$('#component-content').tabs('select', subtitle);
}

function createFrame(url) {
	var s = '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:99%;"></iframe>';
	return s;
}

function tabClose() {
	/* 双击关闭TAB选项卡 */
	$(".tabs-inner").dblclick(function() {
		var subtitle = $(this).children(".tabs-closable").text();
		$('#component-content').tabs('close', subtitle);
	});
	/* 为选项卡绑定右键 */
	$(".tabs-inner").bind('contextmenu', function(e) {
		$('#mm').menu('show', {
			left : e.pageX,
			top : e.pageY
		});

		var subtitle = $(this).children(".tabs-closable").text();

		$('#mm').data("currtab", subtitle);
		$('#component-content').tabs('select', subtitle);
		return false;
	});
}

function refluseTabByTitle(subtitle){
	var selectTab = $('#component-content').tabs('getTab', subtitle);
	var url = $(selectTab.panel('options').content).attr('src');
	
	//刷新页面
	addTab(subtitle, url, null);
}

function getTabByTitle(subtitle){
	var tab = $('#component-content').tabs('getTab', subtitle);
	return tab;
}

function closeTab(subtitle){
	if(!subtitle){
		var currTab = $('#component-content').tabs('getSelected');
		subtitle = currTab.panel("options").title;
	}
	$('#component-content').tabs('close', subtitle);
}

// 绑定右键菜单事件
function tabMenuEven() {
	// 刷新
	$('#mm-tabupdate').click(function() {
		var currTab = $('#component-content').tabs('getSelected');
		var url = $(currTab.panel('options').content).attr('src');
		$('#component-content').tabs('update', {
			tab : currTab,
			options : {
				content : createFrame(url)
			}
		});
	});
	
	//复制subtitle, url, icon
	/* $('#mm-tabrepeat').click(function() {
		var currTab = $('#component-content').tabs('getSelected');
		var currTabPanel = currTab.panel('options');
		var url = $(currTab.panel('options').content).attr('src');
		var subtitle = currTabPanel.title;
		var icon = currTabPanel.iconCls;
		
		addTab(subtitle, url, icon);
	}); */
	
	// 关闭当前
	$('#mm-tabclose').click(function() {
		closeTab();
	});
	// 全部关闭
	$('#mm-tabcloseall').click(function() {
		$('.tabs-inner span').each(function(i, n) {
			var t = $(n).text();
			$('#component-content').tabs('close', t);
		});
	});
	// 关闭除当前之外的TAB
	$('#mm-tabcloseother').click(function() {
		$('#mm-tabcloseright').click();
		$('#mm-tabcloseleft').click();
	});
	// 关闭当前右侧的TAB
	$('#mm-tabcloseright').click(function() {
		var nextall = $('.tabs-selected').nextAll();
		if (nextall.length == 0) {
			// msgShow('系统提示','后边没有啦~~','error');
			alert('后边没有啦~~');
			return false;
		}
		nextall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			$('#component-content').tabs('close', t);
		});
		return false;
	});
	// 关闭当前左侧的TAB
	$('#mm-tabcloseleft').click(function() {
		var prevall = $('.tabs-selected').prevAll();
		if (prevall.length == 0) {
			alert('到头了，前边没有啦~~');
			return false;
		}
		prevall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			$('#component-content').tabs('close', t);
		});
		return false;
	});

	// 退出
	$("#mm-exit").click(function() {
		$('#mm').menu('hide');
	});
}
</script>
