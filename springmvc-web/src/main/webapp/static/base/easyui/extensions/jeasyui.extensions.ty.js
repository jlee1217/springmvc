/**
 * 扩展tree，使其支持平滑数据格式，即支持parentField 父节点ID属性
 */
$.fn.tree.defaults.loadFilter = function (data, parent) {
    var opt = $(this).data().tree.options;
    var idFiled, textFiled, parentField, iconCls;
    if (opt.parentField) {
        idFiled = opt.idFiled || 'id';
        textFiled = opt.textFiled || 'text';
        parentField = opt.parentField;
        iconCls = opt.iconCls || 'iconCls';
        var i, l, treeData = [], tmpMap = [];
        for (i = 0, l = data.length; i < l; i++) {
            tmpMap[data[i][idFiled]] = data[i];
        }
        for (i = 0, l = data.length; i < l; i++) {
            if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
                if (!tmpMap[data[i][parentField]]['children'])
                    tmpMap[data[i][parentField]]['children'] = [];
                data[i]['text'] = data[i][textFiled];
                data[i]['iconCls'] = data[i][iconCls];
                tmpMap[data[i][parentField]]['children'].push(data[i]);
            } else {
                data[i]['text'] = data[i][textFiled];
                data[i]['iconCls'] = data[i][iconCls];
                treeData.push(data[i]);
            }
        }
        return treeData;
    }
    return data;
};

/**
 *
 * @requires jQuery,EasyUI
 *
 * 扩展treegrid，使其支持平滑数据格式，即支持parentField 父节点ID属性
 */
$.fn.treegrid.defaults.loadFilter = function (data, parentId) {
    var opt = $(this).data().treegrid.options;
    var idFiled, textFiled, parentField;
    if (opt.parentField) {
        idFiled = opt.idFiled || 'id';
        textFiled = opt.textFiled || 'text';
        parentField = opt.parentField;
        iconCls = opt.iconCls || 'iconCls';
        var i, l, treeData = [], tmpMap = [];
        for (i = 0, l = data.length; i < l; i++) {
            tmpMap[data[i][idFiled]] = data[i];
        }
        for (i = 0, l = data.length; i < l; i++) {
            if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
                if (!tmpMap[data[i][parentField]]['children'])
                    tmpMap[data[i][parentField]]['children'] = [];
                data[i]['text'] = data[i][textFiled];
                data[i]['iconCls'] = data[i][iconCls];
                tmpMap[data[i][parentField]]['children'].push(data[i]);
            } else {
                data[i]['text'] = data[i][textFiled];
                data[i]['iconCls'] = data[i][iconCls];
                treeData.push(data[i]);
            }
        }
        return treeData;
    }
    return data;
};

/**
 *
 * @requires jQuery,EasyUI
 *
 * 扩展combotree，使其支持平滑数据格式，即支持parentField 父节点ID属性
 */
$.fn.combotree.defaults.loadFilter = $.fn.tree.defaults.loadFilter;


/**
 * @author 吴受蒲
 *
 * @requires jQuery,EasyUI
 *
 * 扩展电话号码验证，eg：0755-5607788,18503083103,0755-5608877
 */
$.extend($.fn.validatebox.defaults.rules, {
    phoneRex: {
        validator: function (value) {
            var reg = /((\\d{3,4})?-?[1-9][0-9]{6,7})|([1-9][34578]\\d{9})|(\\d{3}-?\\d{3}-?\\d{4})/;
            return reg.test(value);
        },
        message: '输入电话号码格式不准确.'
    }
});