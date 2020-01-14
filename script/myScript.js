$.ajax({
	type: "POST",
	url: "http://lovegood.zicp.vip/good/SelectCategory",
	data: param={
		tabId: "0",
		isTab: "1",
		j:"0"
	},
	dataType:'json',    
	success: function (entity) {
		if(entity.code == 200){
			var tab = document.getElementById("tab");
			var tabHtml = "";
			entity.data.forEach(function(value,index,array){
				tabHtml += '<div id="tabType'+value.id+'"></div>';
				getTab(value.id,value.type);
			})
			tab.innerHTML = tabHtml;
		}
	}
}); 
function getTab(id,mType){
	$.ajax({
		type: "POST",
		url: "http://lovegood.zicp.vip/good/SelectCategory",
		data: param={
			tabId: id,
			isTab: "0",
			j:"0"
		},
		dataType:'json',    
		success: function (entity) {
			if(entity.code == 200){
				var tab = document.getElementById("tabType"+id);
				var tabHtml = "";
				entity.data.forEach(function(value,index,array){
					tabHtml += '<div><a href="#" onclick="getTabType('+value.id+','+mType+')">' + value.name + '</a></div>';
					tabHtml += '<div id="tabTypeItem'+value.id+'"></div>';
				})
				tab.innerHTML = tabHtml;
			}
		}
	});
}
function getTabType(id,mType){
	$.ajax({
		type: "POST",
		url: "http://lovegood.zicp.vip/good/SelectType",
		data: param={
			id: id,
			j:"0"
		},
		dataType:'json',    
		success: function (entity) {
			if(entity.code == 200){
				var tab = document.getElementById("tabTypeItem"+id);
				var tabHtml = "";
				entity.data.forEach(function(value,index,array){
					tabHtml += '<div>&nbsp;&nbsp;&nbsp;<a href="#" onclick="getTabTypeItem('+value.id+','+mType+')">' + value.name + '</a></div>';
				})
				tab.innerHTML = tabHtml;
			}
		}
	});
}
function getTabTypeItem(id,mType){
	var api = "";
	if(13 == mType||9 == mType) api = "SelectVideoList";
	if(14 == mType||10 == mType) api = "SelectPictureList";
	if(15 == mType||11 == mType) api = "SelectNovelList";
	if(12 == mType) api = "SelectVoiceList";
	$.ajax({
		type: "POST",
		url: "http://lovegood.zicp.vip/good/"+api,
		data: param={
			id: id,
			isfolder: "1",
			page: "1",
			j:"0"
		},
		dataType:'json',    
		success: function (entity) {
			if(entity.code == 200){
				var table = document.getElementById("content");
				table.innerHTML = "";
				var h = 6;
				var i = 0;
				var j = 1;
				var row = table.insertRow(i);
				entity.data.forEach(function(value,index,array){
					if(j%h == 0){
						i++;
						j = 1;
						row = table.insertRow(i);
					}
					var cell = row.insertCell(j-1);
					var content = '<div><img class="image" src="'+value.thumbnail+'"></div>';
					content += '<div>'+value.name+'</div>';
					cell.innerHTML = content;
					j++;
				})
			}
		}
	});
}