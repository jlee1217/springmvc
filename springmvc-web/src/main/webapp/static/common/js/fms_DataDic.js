/**
 * 提款状态显示名称
 */
var withdrawalStatusStr = function (status){
	var str = "";
	if(status == 0){
		str = "未审核";
	}else if(status == 1){
		str = "初审通过";
	}else if(status == 2){
		str = "复审通过";
	}else if(status == 3){
		str = "打款成功";
	}else if(status == 4){
		str = "初审不通过";
	}else if(status == 5){
		str = "复审不通过";
	}else if(status == 6){
		str = "打款失败";
	}
	return str;
};

/**
 * 支付账号显示名称
 */
var payAccountTypeStr = function (type){
	var str = "";
	
	//0买家，1卖家，2代理商，3运营商，4小区管理员
	if(type == 'BUYER'){
		str = "买家";
	}else if(type == 'SELLER'){
		str = "卖家";
	}else if(type == 'AGENT'){
		str = "代理商";
	}else if(type == 'OPERATOR'){
		str = "运营商";
	}else if(type == 'SMALL_COMMUNITY_ADMIN'){
		str = "小区管理员";
	}
	return str;
};