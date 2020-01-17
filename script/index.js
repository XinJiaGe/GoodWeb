var mAccount="";
var mJ="0";

jq.ajax({
	type: "POST",
	url: "http://lovegood.zicp.vip/good/SelectCategory",
	data: param={
		tabId: "0",
		isTab: "1",
		j:mJ,
		account:mAccount
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
function init() {
	var msg = document.getElementById("msg");
    mAccount = cookie.get("account");
    if(mAccount && mAccount.length>0) {
        msg.innerHTML = "<h1>" + mAccount + "</h1>";
    } else {
        msg.innerHTML = "<a href='login.html'>请登录</a>";
    }
}
function getTab(id,mType){
	jq.ajax({
		type: "POST",
		url: "http://lovegood.zicp.vip/good/SelectCategory",
		data: param={
			tabId: id,
			isTab: "0",
			j:mJ,
			account:mAccount
		},
		dataType:'json',    
		success: function (entity) {
			if(entity.code == 200){
				var tab = document.getElementById("tabType"+id);
				var tabHtml = "";
				entity.data.forEach(function(value,index,array){
					tabHtml += '<div><a href="#">' + value.name + '</a></div>';
					tabHtml += '<div class="tabTypeItem" id="tabTypeItem'+value.id+'"></div>';
					getTabType(value.id,mType);
				})
				tab.innerHTML = tabHtml;
			}
		}
	});
}
function getTabType(id,mType){
	jq.ajax({
		type: "POST",
		url: "http://lovegood.zicp.vip/good/SelectType",
		data: param={
			id: id,
			j:mJ,
			account:mAccount
		},
		dataType:'json',    
		success: function (entity) {
			if(entity.code == 200){
				var tab = document.getElementById("tabTypeItem"+id);
				var tabHtml = "";
				entity.data.forEach(function(value,index,array){
					tabHtml += '<a href="#" onclick="selectListF('+value.id+','+mType+',1)">' + value.name + '</a>&nbsp;&nbsp;&nbsp';
				})
				tab.innerHTML = tabHtml;
			}
		}
	});
}
var mId;
var mType;
var mPage;
function selectListF(id,type,page){
	mId = id;
	mType = type;
	mPage = page;
	selectList();
}
function selectList(){
	var api = "";
	if(13 == mType||9 == mType) api = "SelectVideoList";
	if(14 == mType||10 == mType) api = "SelectPictureList";
	if(15 == mType||11 == mType) api = "SelectNovelList";
	if(12 == mType) api = "SelectVoiceList";
	jq.ajax({
		type: "POST",
		url: "http://lovegood.zicp.vip/good/"+api,
		data: param={
			id: mId,
			isfolder: "1",
			page: mPage,
			j:mJ,
			account:mAccount
		},
		dataType:'json',    
		success: function (entity) {
			if(entity.code == 200){
				var table = document.getElementById("content");
				var pageDiv = document.getElementById("pageDiv");
				table.innerHTML = "";
				pageDiv.style.visibility ="visible";
				var content = "";
				entity.data.forEach(function(value,index,array){
					content += '<div class="contentCenter" onclick="selectDetails()"><div><img class="image" src="'+value.thumbnail+'"></div><span class="text">'+value.name+'</span></div>';
				})
				table.innerHTML = content;
			}
		}
	});
}
function nextPage(){
	mPage = mPage+1;
	selectList();
}
function topPage(){
	if(mPage>1){
		mPage = mPage-1;
		selectList();
	}
}
function selectDetails(){
	
}


function $(id) {
    return document.getElementById(id);
}
