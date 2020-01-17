function init(){
	var account = cookie.get("account");
	var pwd = cookie.get("pwd");
	alert(account);
	$("account").text = account;
	$("pwd").text = pwd;
}

function login(){
	var account = $("account").value;
    var pwd = $("pwd").value;
	if(account == ""){
		alert("请输入账号");
	}else if(pwd == ""){
		alert("请输入密码"); 
	}else{
		jq.ajax({
			type: "POST",
			url: "http://lovegood.zicp.vip/good/Login",
			data: param={
				account: account,
				pwd: pwd
			},
			dataType:'json',    
			success: function (entity) {
				if(entity.code == 200){
					cookie.set("account",account);
					cookie.set("pwd",pwd);
					cookie.set("integral",entity.data.integral);
					document.location = "index.html";
				}else{
					alert(entity.msg);
				}
			}
		});
	}
}


function $(id) {
    return document.getElementById(id);
}