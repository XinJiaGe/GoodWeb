$.ajax({
	type: "GET",
	url: "http://lovegood.zicp.vip/good/AppUpdate",
	dataType:'jsonp',
	jsonp:"callbackparam",
	jsonpCallback:"entity",    
	success: function (data) {
		if(data.code == 200){
			var d = data.data;
			document.getElementById("h1").innerHTML= d.title;
			document.getElementById("h2").innerHTML= "版本号 "+d.version;
			document.getElementById("h3").innerHTML= d.content;
			document.getElementById("a").href = d.url;
		}
	}
});