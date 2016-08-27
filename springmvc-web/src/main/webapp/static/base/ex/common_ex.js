// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 

//时间格式化
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth() + 3) / 3), //quarter
		"S" : this.getMilliseconds()
	//millisecond
	}
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

//两种调用方式
//var template1="我是{0}，今年{1}了";
//var template2="我是{name}，今年{age}了";
//var result1=template1.format("loogn",22);
//var result2=template2.format({name:"loogn",age:22});
//两个结果都是"我是loogn，今年22了"
//字符串格式化
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {    
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

/**
 * 是否选择行数据
 */
function rowIsNull(row) {
	if (row) {
		return false;
	} else {
		$.messager.show({
			title : "提示",
			msg : "请选择行数据！",
			position : "topCenter",
			timeout : 1500,
			showType : 'slide',
            style:{
        		right:'',
        		top:document.body.scrollTop+document.documentElement.scrollTop+50,
        		bottom:''
        	}
		});
		return true;
	}
}


/**
 * ajax返回提示
 * @param data    返回的数据
 * @param dg datagrid
 * @param d    弹窗
 * @returns {Boolean} ajax是否成功
 */
function successTip(data, dg, d) {
    if (data == 'success') {
        $.messager.show({
            title: "提示",
            msg: "操作成功！",
            position: "topCenter",
            timeout: 1500,
            showType: 'show',
            style:{
        		right:'',
        		top:document.body.scrollTop+document.documentElement.scrollTop+50,
        		bottom:''
        	}
        });
        if (dg != null) {
            dg.datagrid('reload');
        }
        if (d != null) {
            d.panel('close');
        }
        return true;
    } else {
        $.messager.show({
            title: "提示",
            msg: data,
            position: "topCenter",
            timeout: 1500,
            showType: 'slide',
            style:{
        		right:'',
        		top:document.body.scrollTop+document.documentElement.scrollTop+50,
        		bottom:''
        	}
        });
        return false;
    }
}

/**
 * ajax返回提示
 * @param data    返回的数据
 * @param dg datagrid
 * @param d    弹窗
 * @returns {Boolean} ajax是否成功
 */
function successTipExt(data, dg, d) {
    if (data.status == '0') {
        $.messager.show({
            title: "提示",
            msg: "操作成功！",
            position: "topCenter",
            timeout: 1500,
            showType: 'slide'
        });
        if (dg != null) {
            dg.datagrid('reload');
        }
        if (d != null) {
            d.panel('close');
        }
        return true;
    } else {
        $.messager.alert("提示", data.message);
        return false;
    }
}


/**
 * ajax返回提示
 * @param data    返回的数据
 * @param dg datagrid
 * @param d    弹窗
 * @returns {Boolean} ajax是否成功
 */
function showMsgExt(data, dg, d) {
    if (data.status == 0) {
        $.messager.show({
            title: "提示",
            msg: data.msg,
            position: "topCenter",
            timeout: 1500,
            showType: 'slide',
            style:{
        		right:'',
        		top:document.body.scrollTop+document.documentElement.scrollTop+50,
        		bottom:''
        	}
        });
        if (dg != null) {
            dg.datagrid('reload');
        }
        if (d != null) {
            d.panel('close');
        }
        return true;
    } else {
        $.messager.alert("提示", data.msg,"error");
        return false;
    }
}

/**
 * ajax返回提示
 * @param data    返回的数据
 * @param  datagrid id
 * @param d 弹窗id
 * @returns {Boolean} ajax是否成功
 */
function successTipTwo(data, dg, d) {
    if (data == 'success') {
        if (dg != null)
            $(dg).datagrid('reload');
        if (d != null)
            $(d).panel('close');
        $.messager.show({
            title: "提示",
            msg: "操作成功！",
            position: "topCenter",
            timeout: 1500,
            showType: 'slide'
        });
        return true;
    } else {
        $.messager.show({
            title: "提示",
            msg: data,
            position: "topCenter",
            timeout: 1500,
            showType: 'slide'
        });
        return false;
    }
}

/**
 * 提写公共的show方法
 *
 * @param title 标题
 * @param icon 图标 info error 默认info
 * @param msg 消息
 * @param position 显示位置 默认topCenter
 * @author wangfan 2015.07.28
 */
function psmaMessageShowFour(title, icon, msg, position) {
    $.messager.show({
        title: title,
        icon: icon,
        msg: msg,
        position: position,
        timeout: 1500,
        showType: 'slide'
    });
}
/**
 * 提写公共的show方法
 *
 * @param msg 消息
 * @author wangfan 2015.07.28
 */
function psmaMessageShowOne(msg) {
    $.messager.show({
        title: "提示",
        msg: msg,
        position: "topCenter",
        timeout: 1500,
        showType: 'slide'
    });
}
/**
 * 提写公共的show方法
 *
 * @param title 标题
 * @param msg 消息
 * @author wangfan 2015.07.28
 */
function psmaMessageShowTwo(title, msg) {
    $.messager.show({
        title: title,
        msg: msg,
        position: "topCenter",
        timeout: 1500,
        showType: 'slide'
    });
}
/**
 * 提写公共的show方法
 *
 * @param title 标题
 * @param msg 消息
 * @param position 显示位置
 * @author wangfan 2015.07.28
 */
function psmaMessageShowThree(title, msg, position) {
    $.messager.show({
        title: title,
        msg: msg,
        position: position,
        timeout: 1500,
        showType: 'slide'
    });
}

$.fn.serializeObject=function(){  
    var serializeObj={};  
    var array=this.serializeArray();  
    var str=this.serialize();  
    $(array).each(function(){  
        if(serializeObj[this.name]){  
            if($.isArray(serializeObj[this.name])){  
                serializeObj[this.name].push(this.value);  
            }else{  
                serializeObj[this.name]=[serializeObj[this.name],this.value];  
            }  
        }else{  
            serializeObj[this.name]=this.value;   
        }  
    });  
    return serializeObj;  
};

//frame元素新增tab页
function addTabForTop(subtitle, url){
	window.top.addTab(subtitle, url, null);
}

//frame元素新增tab页
function addTabForTop(subtitle, url, icon){
	window.top.addTab(subtitle, url, icon);
}

//根据标题选择tab页
function selectTab(subtitle){
	window.top.selectTab(subtitle);
}

//frame元素刷新tab页
function refreshTabForTop(subtitle){
	window.top.refluseTabByTitle(subtitle);
}

//刷新当前tab
function refreshCurrTab(){
	$('#mm-tabupdate').click();
}

//关闭tab页
function closeCurrTab(){
	window.top.closeTab();
}

//获取tab页
function getTab(subtitle){
	return window.top.getTabByTitle(subtitle);
}

//子页面处理刷新父页面列表,关闭子页面
function refreshParentTab(parentTitle, currTitle){
	var parentTab = getTab(parentTitle);
	selectTab(parentTitle);
	var parentFrame = parentTab.find('iframe')[0].contentWindow
	parentFrame.refreshDataGrid();
	if(currTitle){
		window.top.closeTab(currTitle);
	}
};