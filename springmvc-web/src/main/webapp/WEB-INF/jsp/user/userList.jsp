<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>用户列表</title>
<%@ include file="/WEB-INF/jsp/include/easyui.jsp"%>
</head>
<body style="font-family: '微软雅黑'" >
<div id="tb" style="padding:5px;height:auto">
        <div>
        	<form id="searchFrom" action="" method="post"  >
        		<span class="pad-span">
				    	<input type="text" name="startTime" id="beginTime" readonly="readonly"  
				    		placeholder="开始日期" class="easyui-my97" datefmt="yyyy-MM-dd"
				    		data-options="width:150, required:true, maxDate:'#F{$dp.$D(\'endTime\')||\'%y-%M-{%d-1}\'}', onpicked:function(dp){ $(this).validatebox('validate'); }" />
				    </span>
				    <span class="pad-span">
				    	<input type="text" name="endTime" id="endTime" readonly="readonly" 
				    		 placeholder="结束日期" class="easyui-my97" datefmt="yyyy-MM-dd" 
				    		 data-options="width:150, required:true, minDate:'#F{$dp.$D(\'beginTime\')}', maxDate:'%y-%M-{%d-1}', onpicked:function(dp){ $(this).validatebox('validate'); }"/>
				    </span>
		        <span class="toolbar-item dialog-tool-separator"></span>
		        <a href="javascript:void(0)" class="easyui-linkbutton"  iconCls="icon-search" data-options="width:80,height:30" plain="true" onclick="userQuery()">查询</a>
		         <span class="toolbar-item dialog-tool-separator"></span>
		         <a href="javascript:resetFrom()" class="easyui-linkbutton" iconCls="icon-remove" data-options="width:80,height:30" plain="true" >重置</a>
		         <span class="toolbar-item dialog-tool-separator"></span>
				<a href="javascript:void(0)" class="easyui-linkbutton"  iconCls="icon-save" onclick="exportExcelCheck();" data-options="width:80,height:30" plain="true" >导出</a>
			</form>
        </div>
</div>
<table id="dg"></table> 
<div id="dlg"></div>  
<script type="text/javascript">
var dg;
dg=$('#dg').datagrid({
	method: 'post',
    url:'${ctx}/user/getUserlist',
    fit : true,
	fitColumns : false,
	border : false,
	idField : 'id',
	striped:true,
	pagination:true,
	rownumbers:true,
	pageNumber:1,
	pageSize : 20,
	pageList : [10, 20, 30,40,50],
	singleSelect:true,
	remotesort: false,
    columns:[[
		{field:'userName',title:'用户名',width:200,align:"center"},
		{field:'nickName',title:'昵称',width:80,align:"center"},
		{field:'address',title:'通讯地址',width:80,align:"center"},
		{field:'telephone',title:'电话',width:80,align:"center"},
		{field:'mobile',title:'手机',width:80,align:"center"},
		{field:'status',title:'状态',width:80,align:"center",
			formatter : function(value, row, index){
    			if(value==0){
        			return "开启";
    			}else{
    			return "关闭";
    			}
    		}	
		},
		{field:'createTime',title:'创建时间',width:80,align:"center"}
    ]],
    onLoadSuccess : function(data) {
		console.info(data)
    },
    toolbar:'#tb',
    showFooter:true,
    enableHeaderClickMenu: false,
    enableHeaderContextMenu: false,
    enableRowContextMenu: false,
});
//清空查询条件
var resetFrom = function(){
	$("#searchFrom").form('clear');
} 
//创建查询对象并查询
function userQuery(){
	var isValid = $('#searchFrom').form('validate');
	if (!isValid) {
		return isValid;
	} 
	var fromObjStr= $("#searchFrom").serializeObject();
	dg.datagrid('options').method = "post";
	dg.datagrid('options').url = '';
	dg.datagrid('load',fromObjStr); 
}
</script>
</body>
</html>