/** 
 * easyui扩展/常用的方法 
 *  
 * @author lk1312 
 */  
// 定义全局对象  
var yxui = $.extend({}, yxui);  
$.parser.auto = false;  
$(function() {  
            $.messager.progress({  
                        text : '数据加载中....',  
                        interval : 100  
                    });  
            $.parser.parse(window.document);  
            window.setTimeout(function() {  
                        $.messager.progress('close');  
                        if (self != parent) {  
                            window.setTimeout(function() {  
                                        try {  
                                            parent.$.messager.progress('close');  
                                        } catch (e) {  
                                        }  
                                    }, 500);  
                        }  
                    }, 1);  
            $.parser.auto = true;  
        });  
$.fn.panel.defaults.loadingMessage = '数据加载中....';  
$.fn.datagrid.defaults.loadMsg = '数据加载中....';  
// 获得根路径 rootBasePath rootPath  
yxui.rootBasePath = function() {  
    var curWwwPath = window.document.location.href;  
    var pathName = window.document.location.pathname;  
    var pos = curWwwPath.indexOf(pathName);  
    var localhostPaht = curWwwPath.substring(0, pos);  
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);  
    return (localhostPaht + projectName);  
};  
yxui.rootPath = function() {  
    var pathName = window.document.location.pathname;  
    return pathName.substring(0, pathName.substr(1).indexOf('/') + 1);  
};  
// 格式化字符串 formatString  
yxui.formatString = function(str) {  
    for (var i = 0; i < arguments.length - 1; i++) {  
        str = str.replace("{" + i + "}", arguments[i + 1]);  
    }  
    return str;  
};  
// 更换主题 changeTheme  
yxui.changeTheme = function(themeName) {  
    var $yxuiTheme = $('#yxuiTheme');  
    var url = $yxuiTheme.attr('href');  
    var href = url.substring(0, url.indexOf('themes')) + 'themes/' + themeName + '/easyui.css';  
    $yxuiTheme.attr('href', href);  
    var $iframe = $('iframe');  
    if ($iframe.length > 0) {  
        for (var i = 0; i < $iframe.length; i++) {  
            var ifr = $iframe[i];  
            $(ifr).contents().find('#easyuiTheme').attr('href', href);  
        }  
    }  
    $.cookie('yxuiTheme', themeName, {  
                expires : 7  
            });  
};  
// 将form表单元素的值序列化成对象  
yxui.serializeObject = function(form) {  
    var o = {};  
    $.each(form.serializeArray(), function(index) {  
                if (o[this['name']]) {  
                    o[this['name']] = o[this['name']] + "," + this['value'];  
                } else {  
                    o[this['name']] = this['value'];  
                }  
            });  
    return o;  
};  
// 操作权限控制 operId  
yxui.operId = function(_this) {  
    $("#_operId").val($(_this).attr("_operId"));  
    $("#_resOperId").val($(_this).attr("_resOperId"));  
    $("#_resOperKey").val($(_this).attr("_resOperKey"));  
    // console.info("set->" + $("#_operId").val());  
};  
// form提交 formSubmit  
yxui.formSubmit = function(_datagrid, _dialog, _form, _url, _callbak) {  
    var _arg = '_menuId=' + $("#_menuId").val() + '&_operId=' + $("#_operId").val() + '&_resOperId=' + $("#_resOperId").val() + '&_resOperKey=' + $("#_resOperKey").val();  
    _url = yxui.refreshUrlLink(_url, _arg);  
    if (_form.form('validate')) {  
        _form.form('submit', {  
                    url : _url,  
                    success : function(data) {  
                        _callbak(data, _datagrid, _dialog, _form, _url);  
                    }  
                })  
    }  
    $("#_operId").val('');  
};  
// ajax提交 ajaxSubmit  
yxui.ajaxSubmit = function(_datagrid, _dialog, _form, _url, _data, _callbak) {  
    // console.info("ajax get->" + $("#_operId").val());  
    _data._operId = $("#_operId").val();  
    _data._resOperId = $("#_resOperId").val();  
    _data._resOperKey = $("#_resOperKey").val();  
    $.ajax({  
                url : _url,  
                type : 'post',  
                data : _data,  
                dataType : 'json',  
                cache : false,  
                success : function(response) {  
                    _callbak(response, _datagrid, _dialog, _form, _url, _data);  
                }  
            });  
};  
// refreshUrlLink  
yxui.refreshUrlLink = function(_url, _arg) {  
    var index = _url.indexOf('?');  
    var length = _url.length;  
    if (index < 0) {  
        _url = _url + '?' + _arg;  
    } else if (index == length - 1) {  
        _url = _url + _arg;  
    } else {  
        _url = _url.substring(0, index + 1) + _arg + '&' + _url.substring(index + 1, length);  
    }  
    return _url;  
};  
// dotoHtml  
yxui.dotoHtml = function(tos) {  
    var returnHtml = $('#rowOperation').html();  
    if (null != returnHtml) {  
        var maxArgsNumb = $('#_maxArgsNumb').val();  
        if (maxArgsNumb == 0) {  
            return returnHtml;  
        } else {  
            for (var i = 0; i < maxArgsNumb; i++) {  
                returnHtml = returnHtml.replace(new RegExp("'#arg" + i + "'", "g"), typeof(tos[i]) == 'undefined' ? 'this' : tos[i]);  
            }  
            return returnHtml;  
        }  
    } else {  
        return "";  
    }  
}  
// dotoHtmlById  
yxui.dotoHtmlById = function(id, tos) {  
    var returnHtml = $('#' + id).html();  
    if (null != returnHtml) {  
        var maxArgsNumb = tos.length;  
        for (var i = 0; i < maxArgsNumb; i++) {  
            returnHtml = returnHtml.replace(new RegExp("'#arg" + i + "'", "g"), typeof(tos[i]) == 'undefined' ? 'this' : tos[i]);  
        }  
        return returnHtml;  
    } else {  
        return "";  
    }  
}  
// dotoDiyHtml  
yxui.dotoDiyHtml = function(returnHtml, tos, maxArgsNumb) {  
    if (null != returnHtml) {  
        if (null == maxArgsNumb || maxArgsNumb == 0) {  
            return returnHtml;  
        } else {  
            for (var i = 0; i < maxArgsNumb; i++) {  
                returnHtml = returnHtml.replace(new RegExp("'#arg" + i + "'", "g"), typeof(tos[i]) == 'undefined' ? 'this' : tos[i]);  
            }  
            return returnHtml;  
        }  
    } else {  
        return "";  
    }  
}  
// replaceAll  
yxui.replaceAll = function(_str, _from, _to) {  
    if (null != _str) {  
        return _str.replace(new RegExp(_from, "g"), _to);  
    } else {  
        return "";  
    }  
}  
// getRequestArg  
yxui.getRequestArg = function() {  
    var _url = location.search;  
    var returnObject = {};  
    var index = _url.indexOf("?");  
    if (index != -1) {  
        var str = _url.substr(index + 1);  
        strs = str.split("&");  
        for (var i = 0; i < strs.length; i++) {  
            returnObject[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);  
        }  
    }  
    return returnObject;  
}  
// xui.getUrlArg  
yxui.getUrlArg = function(_url) {  
    var index = _url.indexOf("?");  
    if (index != -1) {  
        var returnObject = {};  
        var str = _url.substr(index + 1);  
        strs = str.split("&");  
        for (var i = 0; i < strs.length; i++) {  
            returnObject[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);  
        }  
        return returnObject;  
    }  
    return null;  
}  
function getrequest() {  
    var url = location.search; // 获取url中"?"符后的字串  
    // alert(url.indexOf("?"))  
    var therequest = {};  
    if (url.indexOf("?") != -1) {  
        var str = url.substr(1);  
        // alert(str)  
        strs = str.split("&");  
        for (var i = 0; i < strs.length; i++) {  
            therequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);  
        }  
    }  
    return therequest;  
}  
/** 
 * 扩展treegrid diyload treegrid查询功能 
 */  
$.extend($.fn.treegrid.methods, {  
            diyload : function(jq, param) {  
                return jq.each(function() {  
                            var opts = $(this).treegrid("options");  
                            diyRequest(this, param);  
                        });  
            }  
        });  
function diyRequest(jq, param) {  
    var opts = $.data(jq, "treegrid").options;  
    if (param) {  
        opts.queryParams = param;  
    }  
    if (!opts.url) {  
        return;  
    }  
    var param = $.extend({}, opts.queryParams);  
    if (opts.onBeforeLoad.call(jq, param) == false) {  
        return;  
    }  
    setTimeout(function() {  
                doRequest();  
            }, 0);  
    function doRequest() {  
        $.ajax({  
                    type : opts.method,  
                    url : opts.url,  
                    data : param,  
                    dataType : "json",  
                    success : function(data) {  
                        $(jq).treegrid('loadData', data)  
                    },  
                    error : function() {  
                        if (opts.onLoadError) {  
                            opts.onLoadError.apply(jq, arguments);  
                        }  
                    }  
                });  
    }  
}  
/** 
 * 扩展tree getCheckedExt 获得选中节点+实心节点 getSolidExt 获取实心节点 
 */  
$.extend($.fn.tree.methods, {  
            getCheckedExt : function(jq) {  
                var checked = [];  
                var checkbox2 = $(jq).find("span.tree-checkbox1,span.tree-checkbox2").parent();  
                $.each(checkbox2, function() {  
                            var thisData = {  
                                target : this,  
                                "checked" : true  
                            };  
                            var node = $.extend({}, $.data(this, "tree-node"), thisData);  
                            checked.push(node);  
                        });  
                return checked;  
            },  
            getSolidExt : function(jq) {  
                var checked = [];  
                var checkbox2 = $(jq).find("span.tree-checkbox2").parent();  
                $.each(checkbox2, function() {  
                            var node = $.extend({}, $.data(this, "tree-node"), {  
                                        target : this  
                                    });  
                            checked.push(node);  
                        });  
                return checked;  
            }  
        });  
/** 
 * 扩展datagrid，添加动态增加或删除Editor的方法 
 */  
$.extend($.fn.datagrid.methods, {  
            addEditor : function(jq, param) {  
                if (param instanceof Array) {  
                    $.each(param, function(index, item) {  
                                var e = $(jq).datagrid('getColumnOption', item.field);  
                                e.editor = item.editor;  
                            });  
                } else {  
                    var e = $(jq).datagrid('getColumnOption', param.field);  
                    e.editor = param.editor;  
                }  
            },  
            removeEditor : function(jq, param) {  
                if (param instanceof Array) {  
                    $.each(param, function(index, item) {  
                                var e = $(jq).datagrid('getColumnOption', item);  
                                e.editor = {};  
                            });  
                } else {  
                    var e = $(jq).datagrid('getColumnOption', param);  
                    e.editor = {};  
                }  
            }  
        });  
/** 
 * 扩展datagrid editor 增加带复选框的下拉树/增加日期时间组件/增加多选combobox组件 
 */  
$.extend($.fn.datagrid.defaults.editors, {  
            combocheckboxtree : {  
                init : function(container, options) {  
                    var editor = $('<input />').appendTo(container);  
                    options.multiple = true;  
                    editor.combotree(options);  
                    return editor;  
                },  
                destroy : function(target) {  
                    $(target).combotree('destroy');  
                },  
                getValue : function(target) {  
                    return $(target).combotree('getValues').join(',');  
                },  
                setValue : function(target, value) {  
                    $(target).combotree('setValues', sy.getList(value));  
                },  
                resize : function(target, width) {  
                    $(target).combotree('resize', width);  
                }  
            },  
            datetimebox : {  
                init : function(container, options) {  
                    var editor = $('<input />').appendTo(container);  
                    editor.datetimebox(options);  
                    return editor;  
                },  
                destroy : function(target) {  
                    $(target).datetimebox('destroy');  
                },  
                getValue : function(target) {  
                    return $(target).datetimebox('getValue');  
                },  
                setValue : function(target, value) {  
                    $(target).datetimebox('setValue', value);  
                },  
                resize : function(target, width) {  
                    $(target).datetimebox('resize', width);  
                }  
            },  
            multiplecombobox : {  
                init : function(container, options) {  
                    var editor = $('<input />').appendTo(container);  
                    options.multiple = true;  
                    editor.combobox(options);  
                    return editor;  
                },  
                destroy : function(target) {  
                    $(target).combobox('destroy');  
                },  
                getValue : function(target) {  
                    return $(target).combobox('getValues').join(',');  
                },  
                setValue : function(target, value) {  
                    $(target).combobox('setValues', sy.getList(value));  
                },  
                resize : function(target, width) {  
                    $(target).combobox('resize', width);  
                }  
            }  
        });  
/** 
 * 扩展 datagrid/treegrid 增加表头菜单，用于显示或隐藏列，注意：冻结列不在此菜单中 
 *  
 * @param e 
 * @param field 
 */  
var createGridHeaderContextMenu = function(e, field) {  
    e.preventDefault();  
    var grid = $(this);/* grid本身 */  
    var headerContextMenu = this.headerContextMenu;/* grid上的列头菜单对象 */  
    if (!headerContextMenu) {  
        var tmenu = $('<div style="width:150px;"></div>').appendTo('body');  
        var fields = grid.datagrid('getColumnFields');  
        for (var i = 0; i < fields.length; i++) {  
            var fildOption = grid.datagrid('getColumnOption', fields[i]);  
            if (!fildOption.hidden) {  
                $('<div iconCls="icon-ok" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);  
            } else {  
                $('<div iconCls="icon-empty" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);  
            }  
        }  
        headerContextMenu = this.headerContextMenu = tmenu.menu({  
                    onClick : function(item) {  
                        var field = $(item.target).attr('field');  
                        if (item.iconCls == 'icon-ok') {  
                            grid.datagrid('hideColumn', field);  
                            $(this).menu('setIcon', {  
                                        target : item.target,  
                                        iconCls : 'icon-empty'  
                                    });  
                        } else {  
                            grid.datagrid('showColumn', field);  
                            $(this).menu('setIcon', {  
                                        target : item.target,  
                                        iconCls : 'icon-ok'  
                                    });  
                        }  
                    }  
                });  
    }  
    headerContextMenu.menu('show', {  
                left : e.pageX,  
                top : e.pageY  
            });  
};  
$.fn.datagrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;  
$.fn.treegrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;  
/** 
 * 扩展 用于datagrid/treegrid/tree/combogrid/combobox/form加载数据出错时的操作 
 *  
 * @param XMLHttpRequest 
 */  
var easyuiErrorFunction = function(XMLHttpRequest) {  
    $.messager.progress('close');  
    $.messager.alert('错误', XMLHttpRequest.responseText);  
};  
$.fn.datagrid.defaults.onLoadError = easyuiErrorFunction;  
$.fn.treegrid.defaults.onLoadError = easyuiErrorFunction;  
$.fn.tree.defaults.onLoadError = easyuiErrorFunction;  
$.fn.combogrid.defaults.onLoadError = easyuiErrorFunction;  
$.fn.combobox.defaults.onLoadError = easyuiErrorFunction;  
$.fn.form.defaults.onLoadError = easyuiErrorFunction;  
/** 
 * 防止panel/window/dialog组件超出浏览器边界 
 *  
 * @param left 
 * @param top 
 */  
var easyuiPanelOnMove = function(left, top) {  
    var l = left;  
    var t = top;  
    if (l < 1) {  
        l = 1;  
    }  
    if (t < 1) {  
        t = 1;  
    }  
    var width = parseInt($(this).parent().css('width')) + 14;  
    var height = parseInt($(this).parent().css('height')) + 14;  
    var right = l + width;  
    var buttom = t + height;  
    var browserWidth = $(window).width();  
    var browserHeight = $(window).height();  
    if (right > browserWidth) {  
        l = browserWidth - width;  
    }  
    if (buttom > browserHeight) {  
        t = browserHeight - height;  
    }  
    $(this).parent().css({/* 修正面板位置 */  
        left : l,  
        top : t  
    });  
};  
$.fn.dialog.defaults.onMove = easyuiPanelOnMove;  
$.fn.window.defaults.onMove = easyuiPanelOnMove;  
$.fn.panel.defaults.onMove = easyuiPanelOnMove;  
/** 
 * 扩展easyui的validator插件rules，支持更多类型验证 
 */  
$.extend($.fn.validatebox.defaults.rules, {  
            minLength : { // 判断最小长度  
                validator : function(value, param) {  
                    return value.length >= param[0];  
                },  
                message : '最少输入 {0} 个字符'  
            },  
            length : { // 长度  
                validator : function(value, param) {  
                    var len = $.trim(value).length;  
                    return len >= param[0] && len <= param[1];  
                },  
                message : "输入内容长度必须介于{0}和{1}之间"  
            },  
            phone : {// 验证电话号码  
                validator : function(value) {  
                    return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);  
                },  
                message : '格式不正确,请使用下面格式:020-88888888'  
            },  
            mobile : {// 验证手机号码  
                validator : function(value) {  
                    return /^1(3[0-9]|5[0-35-9]|8[0-9]|4[57]|7[0678])[0-9]{8}$/i.test(value);
                },  
                message : '手机号码格式不正确'  
            },  
            phoneAndMobile : {// 电话号码或手机号码  
                validator : function(value) {  
                    return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value) || /^(13|15|18)\d{9}$/i.test(value);  
                },  
                message : '电话号码或手机号码格式不正确'  
            },
            oneOrManyForPhoneAndMobile : {// 一个或者多个电话号码或手机号码  
                validator : function(value) {  
                	if(value==null||value==''){
                		return false;
                	}
                	
            		var split= value.split(",");
            		if(split.length>=2){
            			for(var i = 0;i < split.length; i++) 
              		  {
              		 	if(!((/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(split[i]) || /^(13|15|18)\d{9}$/i.test(split[i])))){
              		 		return false;
              		 	}
              		  }
            		}else{
              		 	if(!(/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(split[0]) || /^(13|15|18)\d{9}$/i.test(split[0]))){
              		 		return false;
              		 	}
            		}

            		return true;
                	
                },  
                message : '电话号码或手机号码格式不正确'  
            },
          //验证密码  字段相等
            passwordEqualsTo: {
            	validator: function (value, param) {
            		return $(param[0]).val() == value;
            	}, 
            	message: '两次输入密码不匹配' 
            },
            dateASmallerThanDateB: {//检测开始日期必须小于等于结束日期
            	validator: function (value, param) {
            		var beginDate=new Date($(param[0]).datetimebox('getValue'));
            		 var endDate=new Date((value));
            		 
            		return endDate!=null&&endDate>=beginDate;
            	}, 
            	message: '开始日期必须小于等于结束日期' 
            },
           /* sameYear: {//检测开始日期和结束日期必须同年
            	validator: function (value, param) {
            		var beginDate=new Date($(param[0]).datetimebox('getValue'));
            		 var endDate=new Date((value));
            		return beginDate.getFullYear()==endDate.getFullYear();
            	}, 
            	message: '不允许跨年份查询' 
            },*/
            idcard : {// 验证身份证  
                validator : function(value) {  
                    return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value) || /^\d{18}(\d{2}[A-Za-z0-9])?$/i.test(value);  
                },  
                message : '身份证号码格式不正确'  
            },  
            intOrFloat : {// 验证整数或小数  
                validator : function(value) {  
                    return /^\d+(\.\d+)?$/i.test(value);  
                },  
                message : '请输入数字，并确保格式正确'  
            },  
            currency : {// 验证货币  
                validator : function(value) {  
                    return /^\d+(\.\d+)?$/i.test(value);  
                },  
                message : '货币格式不正确'  
            },  
            acreage : {// 验证面积  
                validator : function(value) {  
                    return /^\d+(\.\d+)?$/i.test(value);  
                },  
                message : '面积格式不正确'  
            }, 
            qq : {// 验证QQ,从10000开始  
                validator : function(value) {  
                    return /^[1-9]\d{4,9}$/i.test(value);  
                },  
                message : 'QQ号码格式不正确'  
            },  
            integer : {// 验证整数  
                validator : function(value) {  
                    return /^[+]?[1-9]+\d*$/i.test(value);  
                },  
                message : '请输入整数'  
            },  
            chinese : {// 验证中文  
                validator : function(value) {  
                    return /^[\u0391-\uFFE5]+$/i.test(value);  
                },  
                message : '请输入中文'  
            },  
            chineseAndLength : {// 验证中文及长度  
                validator : function(value) {  
                    var len = $.trim(value).length;  
                    if (len >= param[0] && len <= param[1]) {  
                        return /^[\u0391-\uFFE5]+$/i.test(value);  
                    }  
                },  
                message : '请输入中文'  
            },  
            english : {// 验证英语  
                validator : function(value) {  
                    return /^[A-Za-z]+$/i.test(value);  
                },  
                message : '请输入英文'  
            },  
            englishAndLength : {// 验证英语及长度  
                validator : function(value, param) {  
                    var len = $.trim(value).length;  
                    if (len >= param[0] && len <= param[1]) {  
                        return /^[A-Za-z]+$/i.test(value);  
                    }  
                },  
                message : '请输入英文'  
            },  
            englishUpperCase : {// 验证英语大写  
                validator : function(value) {  
                    return /^[A-Z]+$/.test(value);  
                },  
                message : '请输入大写英文'  
            },  
            unnormal : {// 验证是否包含空格和非法字符  
                validator : function(value) {  
                    return /.+/i.test(value);  
                },  
                message : '输入值不能为空和包含其他非法字符'  
            },  
            username : {// 验证用户名  
                validator : function(value) {  
                    return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);  
                },  
                message : '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'  
            },
            code : {// 不能有中文 
            	validator : function(value) {  
                    return /^\w+$/i.test(value);
                },  
                message : '输入不合法（允许字母数字下划线）' 
            },
            faxno : {// 验证传真  
                validator : function(value) {  
                    return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);  
                },  
                message : '传真号码不正确'  
            },  
            zip : {// 验证邮政编码  
                validator : function(value) {  
                    return /^[1-9]\d{5}$/i.test(value);  
                },  
                message : '邮政编码格式不正确'  
            },  
            ip : {// 验证IP地址  
                validator : function(value) {  
                    return /d+.d+.d+.d+/i.test(value);  
                },  
                message : 'IP地址格式不正确'  
            },  
            name : {// 验证姓名，可以是中文或英文  
                validator : function(value) {  
                    return /^[\u0391-\uFFE5]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);  
                },  
                message : '请输入姓名'  
            },  
            engOrChinese : {// 可以是中文或英文  
                validator : function(value) {  
                    return /^[\u0391-\uFFE5]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);  
                },  
                message : '请输入中文'  
            },  
            engOrChineseAndLength : {// 可以是中文或英文  
                validator : function(value) {  
                    var len = $.trim(value).length;  
                    if (len >= param[0] && len <= param[1]) {  
                        return /^[\u0391-\uFFE5]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);  
                    }  
                },  
                message : '请输入中文或英文'  
            },  
            carNo : {  
                validator : function(value) {  
                    return /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/.test(value);  
                },  
                message : '车牌号码无效（例：粤B12350）'  
            },  
            carenergin : {  
                validator : function(value) {  
                    return /^[a-zA-Z0-9]{16}$/.test(value);  
                },  
                message : '发动机型号无效(例：FG6H012345654584)'  
            },  
            same : {  
                validator : function(value, param) {  
                    if ($("#" + param[0]).val() != "" && value != "") {  
                        return $("#" + param[0]).val() == value;  
                    } else {  
                        return true;  
                    }  
                },  
                message : '两次输入的密码不一致!'  
            }  
        });  
/** 
 * 扩展easyui validatebox的两个方法.移除验证和还原验证 
 */  
$.extend($.fn.validatebox.methods, {  
            remove : function(jq, newposition) {  
                return jq.each(function() {  
                    $(this).removeClass("validatebox-text validatebox-invalid").unbind('focus.validatebox').unbind('blur.validatebox');  
                        // remove tip  
                        // $(this).validatebox('hideTip', this);  
                    });  
            },  
            reduce : function(jq, newposition) {  
                return jq.each(function() {  
                    var opt = $(this).data().validatebox.options;  
                    $(this).addClass("validatebox-text").validatebox(opt);  
                        // $(this).validatebox('validateTip', this);  
                    });  
            },  
            validateTip : function(jq) {  
                jq = jq[0];  
                var opts = $.data(jq, "validatebox").options;  
                var tip = $.data(jq, "validatebox").tip;  
                var box = $(jq);  
                var value = box.val();  
                function setTipMessage(msg) {  
                    $.data(jq, "validatebox").message = msg;  
                };  
                var disabled = box.attr("disabled");  
                if (disabled == true || disabled == "true") {  
                    return true;  
                }  
                if (opts.required) {  
                    if (value == "") {  
                        box.addClass("validatebox-invalid");  
                        setTipMessage(opts.missingMessage);  
                        $(jq).validatebox('showTip', jq);  
                        return false;  
                    }  
                }  
                if (opts.validType) {  
                    var result = /([a-zA-Z_]+)(.*)/.exec(opts.validType);  
                    var rule = opts.rules[result[1]];  
                    if (value && rule) {  
                        var param = eval(result[2]);  
                        if (!rule["validator"](value, param)) {  
                            box.addClass("validatebox-invalid");  
                            var message = rule["message"];  
                            if (param) {  
                                for (var i = 0; i < param.length; i++) {  
                                    message = message.replace(new RegExp("\\{" + i + "\\}", "g"), param[i]);  
                                }  
                            }  
                            setTipMessage(opts.invalidMessage || message);  
                            $(jq).validatebox('showTip', jq);  
                            return false;  
                        }  
                    }  
                }  
                box.removeClass("validatebox-invalid");  
                $(jq).validatebox('hideTip', jq);  
                return true;  
            },  
            showTip : function(jq) {  
                jq = jq[0];  
                var box = $(jq);  
                var msg = $.data(jq, "validatebox").message  
                var tip = $.data(jq, "validatebox").tip;  
                if (!tip) {  
                    tip = $("<div class=\"validatebox-tip\">" + "<span class=\"validatebox-tip-content\">" + "</span>" + "<span class=\"validatebox-tip-pointer\">" + "</span>" + "</div>").appendTo("body");  
                    $.data(jq, "validatebox").tip = tip;  
                }  
                tip.find(".validatebox-tip-content").html(msg);  
                tip.css({  
                            display : "block",  
                            left : box.offset().left + box.outerWidth(),  
                            top : box.offset().top  
                        });  
            },  
            hideTip : function(jq) {  
                jq = jq[0];  
                var tip = $.data(jq, "validatebox").tip;  
                if (tip) {  
                    tip.remove;  
                    $.data(jq, "validatebox").tip = null;  
                }  
            }  
        });  
/** 
 * 对easyui dialog 封装 
 */  
yxui.dialog = function(options) {  
    var opts = $.extend({  
                modal : true,  
                onClose : function() {  
                    $(this).dialog('destroy');  
                }  
            }, options);  
    return $('<div/>').dialog(opts);  
};  
  
/** 
 * 相同连续列合并扩展 
 */  
$.extend($.fn.datagrid.methods, {  
            autoMergeCells : function(jq, fields) {  
                return jq.each(function() {  
                            var target = $(this);  
                            if (!fields) {  
                                fields = target.datagrid("getColumnFields");  
                            }  
                            var rows = target.datagrid("getRows");  
                            var i = 0, j = 0, temp = {};  
                            for (i; i < rows.length; i++) {  
                                var row = rows[i];  
                                j = 0;  
                                for (j; j < fields.length; j++) {  
                                    var field = fields[j];  
                                    var tf = temp[field];  
                                    if (!tf) {  
                                        tf = temp[field] = {};  
                                        tf[row[field]] = [i];  
                                    } else {  
                                        var tfv = tf[row[field]];  
                                        if (tfv) {  
                                            tfv.push(i);  
                                        } else {  
                                            tfv = tf[row[field]] = [i];  
                                        }  
                                    }  
                                }  
                            }  
                            $.each(temp, function(field, colunm) {  
                                        $.each(colunm, function() {  
                                                    var group = this;  
                                                    if (group.length > 1) {  
                                                        var before, after, megerIndex = group[0];  
                                                        for (var i = 0; i < group.length; i++) {  
                                                            before = group[i];  
                                                            after = group[i + 1];  
                                                            if (after && (after - before) == 1) {  
                                                                continue;  
                                                            }  
                                                            var rowspan = before - megerIndex + 1;  
                                                            if (rowspan > 1) {  
                                                                target.datagrid('mergeCells', {  
                                                                            index : megerIndex,  
                                                                            field : field,  
                                                                            rowspan : rowspan  
                                                                        });  
                                                            }  
                                                            if (after && (after - before) != 1) {  
                                                                megerIndex = after;  
                                                            }  
                                                        }  
                                                    }  
                                                });  
                                    });  
                        });  
            }  
        });  
/** 
 * 左到右 
 */  
yxui.left2right = function(but) {  
    var $layout = $($(but).parents('.easyui-layout')[0]);  
    var left = $layout.find('select')[0];  
    var rigth = $layout.find('select')[1];  
    if ($.browser.msie) {// IE 单独处理  
        for (var i = 0; i < left.options.length; i++) {  
            var option = left.options[i];  
            if (option.selected) {  
                var opt = new Option(option.text, option.value);  
                rigth.options.add(opt);  
                left.remove(i);  
            }  
        }  
    } else {  
        $(left.options).each(function(i, n) {  
                    if (n.selected) {  
                        n.selected = false;  
                        rigth.options.add(n);  
                    }  
                });  
    }  
};  
/** 
 * 右到左 
 */  
yxui.right2left = function(but) {  
    var $layout = $($(but).parents('.easyui-layout')[0]);  
    var left = $layout.find('select')[0];  
    var rigth = $layout.find('select')[1];  
    if ($.browser.msie) {// IE 单独处理  
        for (var i = 0; i < rigth.options.length; i++) {  
            var option = rigth.options[i];  
            if (option.selected) {  
                var opt = new Option(option.text, option.value);  
                left.options.add(opt);  
                rigth.remove(i);  
            }  
        }  
    } else {  
        $(rigth.options).each(function(i, n) {  
                    if (n.selected) {  
                        n.selected = false;  
                        left.options.add(n);  
                    }  
                });  
    }  
}  
/** 
 * 左全到右 
 */  
yxui.leftall2right = function(but) {  
    var $layout = $($(but).parents('.easyui-layout')[0]);  
    var left = $layout.find('select')[0];  
    var rigth = $layout.find('select')[1];  
    if ($.browser.msie) {// IE 单独处理  
        for (var i = 0; i < left.options.length; i++) {  
            var option = left.options[i];  
            var opt = new Option(option.text, option.value);  
            rigth.options.add(opt);  
        }  
        $(left).empty();  
    } else {  
        $(left.options).each(function(i, n) {  
                    rigth.options.add(n);  
                });  
    }  
};  
/** 
 * 右全到左 
 */  
yxui.rightall2left = function(but) {  
    var $layout = $($(but).parents('.easyui-layout')[0]);  
    var left = $layout.find('select')[0];  
    var rigth = $layout.find('select')[1];  
    if ($.browser.msie) {// IE 单独处理  
        for (var i = 0; i < rigth.options.length; i++) {  
            var option = rigth.options[i];  
            var opt = new Option(option.text, option.value);  
            left.options.add(opt);  
        }  
        $(rigth).empty();  
    } else {  
        $(rigth.options).each(function(i, n) {  
                    left.options.add(n);  
                });  
    }  
};  
/** 
 * select 选择框数据采集 
 *  
 * @param options 
 * @return 数组 
 */  
yxui.findSelectMultipleValue = function(options) {  
    var returnArr = [], ids = [], texts = [];  
    if ($.browser.msie) {// IE 单独处理  
        for (var i = 0; i < options.length; i++) {  
            ids.push(options[i].value);  
            texts.push(options[i].text);  
        }  
    } else {  
        $(options).each(function(i, n) {  
                    ids.push($(n).val());  
                    texts.push($(n).html());  
                });  
    }  
    returnArr.push(ids);  
    returnArr.push(texts);  
    return returnArr;  
}  