var jq=jQuery.noConflict();

var cookie = {
    set:function(key,val){
        var date=new Date();
        var expiresHours=9;
        date.setTime(date.getTime()+expiresHours*3600);
        console.log(date.toGMTString());
        document.cookie=key + "=" + val +";expires="+date.toGMTString()+";path=/";
    },
    get:function(key){
        var getCookie = document.cookie.replace(/[ ]/g,"");
        var arrCookie = getCookie.split(";")
        var tips;
        for(var i=0;i<arrCookie.length;i++){
            var arr=arrCookie[i].split("=");
            if(key==arr[0]){
                tips=arr[1];
                break;
            }
        }
        return tips;
    }
}