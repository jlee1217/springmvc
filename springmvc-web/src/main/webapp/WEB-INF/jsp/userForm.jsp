<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>${ctx}
	<form action="/springmvc-web/user/add" method="post">
	    id:<input name="id" /></br>
	    name:<input name="name" /></br>
	    birth:<input name="birth" /></br>
   		<input type="submit" value="submit">
	</form:form>
</body>
</html>