(function($) {
	var jQuery = $;
	
	function bindEvent(el){
		var _this = $(el);
	}
	
	function fileUpLoad(el,options,callback){
		$(el).uploadify({
	    	'auto'	   : true,
	    	'method'   : "post",
	        'swf'      : '../static/common/images/uploadify.swf?times='+(new Date()).getTime(),
	        'uploader' : options.url,
	        'buttonCursor' : 'pointer',
	        'queueID'  : options.queueID,
	        'fileObjName':'uploadFile',
	        'buttonText' : '<font style=\"color:#ff6600;cursor: pointer;\">Excel</font>',
	        'width':'80',
	        'height':'23',
	        'fileSizeLimit' : '3MB',  
	        'fileTypeDesc' : 'xls、xlsx',  
	        'fileTypeExts' : '*.xls; *.xlsx',  
	        'formData'     : options.data || {},  
	        //显示进度  
	        'progressData' : 'percentage',  
	        //一次可以往队列添加多少文件  
	        'queueSizeLimit' : 10,  
	        //上传完成的文件是否自定隐藏显示  
	        'removeCompleted' : true,  
	        //同时上传文件个数的限定  
	        'uploadLimit' : 5,
	        'onSelect' : function(file){
	        	if(callback.select){
	        		callback.select.call(el,file);
	        	}
	        },
	        'onUploadStart' : function(file) {
            	if(callback.uploadStart){
	        		callback.uploadStart.call(el,file);
	        	}
        	},
	        'onUploadSuccess' : function(file, data, response){
	        	if(callback.uploadSuccess){
	        		callback.uploadSuccess.call(el,file, data, response);
	        	}
	        }  
	    });
	}
	
	$.fn.userEvent = function(opt, param,callback) {
		if(typeof(opt) == "string"){
			return $.fn.userEvent.methods[opt](this, param,callback);
		}
		opt = opt || {};
		return this.each(function(){
			var _box = $(this).data("options");
			if(_box){
				jQuery.extend(_box.options, opt);
			}else{
				$(this).data("options", {options: jQuery.extend({}, $.fn.checkbox.defaults, $.fn.checkbox.parseOptions(this), opt)});
			}
			bindEvent(this);
		});
	};
	//定义默认的方法实现
	$.fn.userEvent.methods = {
		ajaxEvent:function(handler,param,callback){
			return "sa";
		},
		addEvent:function(handler,param,callback){
			alert("addEvent");
		},
		fileUpLoad:function(handler,param,callback){
			return fileUpLoad(handler,param,callback);
		}
	};
	//对jquery对象进行处理，获取指定的属性值
	$.fn.userEvent.parseOptions = function(el) {
		
	};
	//定义默认的变量值
	$.fn.userEvent.defaults = {
		
	};
})(jQuery);

String.prototype.trim = function() {
	return this.replace(/^\s+/, '').replace(/\s+$/, '');
}

/**
 * 获取表单中有name属性,且没有disable属性的表单控件的值(空值被忽略)
 * @param obj 表单的id值
 * @returns eg:name=xxx&age=yyy 
 */
function getFormParams(obj){
	var data = "";
	var items = $("#" + obj + " [name][disabled != 'disabled']");
	items.each(function(){
		if($(this).val() != ""){
			data = data + $(this).attr("name") + "="; 
			data = data + $.trim($(this).val()) + "&";
		}
	});
	return encodeURI(data.substring(0,data.length - 1));
}
/**
 * jsonobj json类型的数据元
 * destForm 目标地址
 */
function setFormParams(jsonobj,destForm){
	for(var item in jsonobj){
	    if(jsonobj[item] != ""){
    		$(destForm).find("input[name='"+item+"']").val(jsonobj[item]);
    		$(destForm).find("select[name='"+ item +"']").find("option[selected]").removeAttr('selected');
    		$(destForm).find("select[name='"+ item +"']").find("option[value='"+jsonobj[item]+"']").attr("selected","selected");
	    }
	}
}

/**
 * 自定义Ajax请求
 * @param type
 * @param url
 * @param data
 * @param dataType
 * @param callback 请求成功时的回调函数
 */
function useAjax(url,data,dataType,isAsync,callback){
	$.ajax({
		type: "POST",
		url: url,
		data: data,
		dataType: dataType || "text",
		async:isAsync || true,
		success: function(result){
			if(typeof(callback) == "function"){
				callback(result);
			}
		}
	});
}

function initmask(imgpath){
	var path = imgpath;
	if(!imgpath){
		path = "../static/common/images/progress.jpg"
	}
	var mask = $("<div id=\"mask\"><img id=\"pbar\" src=\""+path+"\" /><div class=\"text\">正在处理中。。。。。。</div></div>").appendTo("body"); 
	var angle = 0;
	setInterval(function(){
	      angle+=3;
	     $("#pbar").rotate(angle);
	},50);
}

function destroymask(){
	$("#mask").remove();
}

//设置AJAX的全局默认选项
$(document).ajaxError(function(event,jqxhr,settings,thrownError){
	if(jqxhr.status == 408){
		alert("登录超时,请重新登录！");
		var logoutUrl=jqxhr.getResponseHeader("logoutUrl");
		//如果超时就处理 ，指定要跳转的页面
		window.open(logoutUrl,'_top');
	}else{
		//var resp = $.parseJSON(jqxhr.responseText);
		var resp = eval("("+jqxhr.responseText+")");
		var codeType = resp.codeType;
		if(codeType=="failure"){
			showTip(resp.message);
		}else{
			alert('发送AJAX请求到"'+settings.url+'"时出错[' +jqxhr.status + ']');
		}
		
	}

});

/**
 * 
 * @param 提示信息
 * @param title
 * @param timeout
 */
function showTip(msg,title,timeout){
	var _msg = msg || '' ;
	var _title = title || '提示';
	var _timeout = timeout || 2000;
	var _style = {
			right:'',
			top:document.body.scrollTop+document.documentElement.scrollTop,
			bottom:''
	};
	$.messager.show({
		title:_title,
		msg:_msg,
		position : "topCenter",
		timeout:_timeout,
		showType: 'slide',
		style:_style
		
	});
}