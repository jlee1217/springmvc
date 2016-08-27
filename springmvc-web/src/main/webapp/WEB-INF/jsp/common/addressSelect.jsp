<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<span class="pad-span select-parent"> 
	<select class="easyui-validatebox" name="proviceId" id="proviceId" style="width: 120px;">
		<option value="-1">所在省份</option>
	</select>
</span>
<span class="pad-span select-parent"> 
	<select class="easyui-validatebox" name="cityId" id="cityId" style="width: 120px;">
		<option value="-1">所在城市</option>
	</select>
</span>

<script>
$(function(){  
	//初始化省市下拉框数据
	initAddressSelect();
	
});


//初始化省市下拉框数据
var initAddressSelect = function (){
	$.ajax({
		url : "${ctx}/address/findAddress",
		type : "GET",
		datatype : "json",
		success : function(data) {
			for ( var i in data) {
				var rec = data[i];
				$("#proviceId").append("<option value='"+rec.id+"'>" + rec.name + "</option>");
			}

		}
	});
	
	bindProvinceSelect();
};

//省份下拉框事件
var bindProvinceSelect = function(){
	
	$("#proviceId").change(function() {
		
		var proviceId = $("#proviceId").val();
		var provinceName = $("#proviceId").find("option:selected").text();
		
		initCity(proviceId, provinceName);
	});
};

var initCity = function(parentId, provinceName){
	
	if(parentId==-1){
		 $("#cityId option").remove();
		 $("#cityId").append("<option value=''>请选择城市</option>"); 
		 
		//如果是直辖市，则不需要加载市区的数据
	} else if(parentId!=null&&(provinceName=='北京'||provinceName=='天津'||provinceName=='上海'||provinceName=='重庆'||provinceName=='香港特别行政区'||provinceName=='澳门特别行政区')){
		 $('#cityId').attr('disabled','true');
		 $('#cityId').empty();
	 }else{
		 $('#cityId').removeAttr("disabled");
		 $.ajax({
		        url:"${ctx}/address/findAddress?parentId="+parentId,
		        type:"GET", 
		        datatype: "json",
		        success: function(data){
		   			$("#cityId option").remove();
		   			$("#cityId").append("<option value=''>请选择城市</option>"); 
		            for(var i in data){
		            	var rec = data[i];
		            	$("#cityId").append("<option value='"+rec.id+"'>"+rec.name+"</option>"); 
		            }
		            
		        }
		 });
	 }
};

</script>