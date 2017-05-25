var pare=window.opener;


//检测原生XHR对象是否存在，如果存在刚返回它的新实例； 
//如果不存在，则检测ActiveX对象; 
//如果两个都不存在，就抛出一个错误。 
function  createXHR(){ 
    if(typeof XMLHttpRequest != "undefined"){ 
        return new XMLHttpRequest(); 
    }else if(typeof ActiveXObject != "undefined"){ 
        //适合IE7之前的版本 
        if(typeof arguments.callee.activeXString != "string"){ 
            var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML.XMLHttp"]; 
            for(var i=0,len=versions.length; i<len; i++){ 
                try{ 
                    var xhr = new ActiveXObject(versions[i]); 
                    arguments.callee.activeXString = versions[i]; 
                    return xhr; 
                }catch (ex){ 
                    //跳过 
                } 
            } 
        } 
        
        return new ActiveXObject(arguments.callee.activeXString); 
    }else{ 
        throw new Error("No XHR object available."); 
    }; 
}

//请求服务器
var xhr=createXHR();
var url='http://47.92.28.251:1024/article/0/-1/list';
xhr.onreadystatechange=function () {
	if (xhr.readyState==4) {
		if (xhr.status==200) {
			var ret=JSON.parse(xhr.responseText);
			var page=document.getElementById('page');      //填充内容
			var html = '';
			for (var i = 0; i < ret.length; i++) {
				var tmp = '<a href="page.html?id='+ret[i].id+'" target="_blank"><div class="page-box"><h2>' + ret[i].title + '<span class="type">'+ret[i].type+'</span></h2>'+'<div class="page-img"><img src="'+ret[i].imageUrl+'"></div><div class="page-main"><p class="university">'+ret[i].university+'</p><p class="content">'+ret[i].summary+'</p></div></div></a>';
				html += tmp;
			}
			page.innerHTML=html;
		} else {
			alert('获取数据错误!错误代号：'+xhr.status+'错误信息：'+xhr.statusText);
		}
	}
};
xhr.open('get',url,true);
xhr.send(null);

// 切换type
function loading(obj) {
	var type=obj.innerHTML;
	var category;
	if (type=='微党课') {
		category=1;
	} else if (type=='工作案例') {
		category=0;
	} else if (type=='教师支部推荐展示') {
		category=2;
	} else if (type=='学生支部推荐展示') {
		category=3;
	};
	url='http://47.92.28.251:1024/article/0/'+category+'/list';
	xhr.onreadystatechange=function () {
		if (xhr.readyState==4) {
			if (xhr.status==200) {
				var ret=JSON.parse(xhr.responseText);
				var page=document.getElementById('page');      //填充内容
				var html = '';
				for (var i = 0; i < ret.length; i++) {
					var tmp = '<a href="page.html?id='+ret[i].id+'" target="_blank"><div class="page-box"><h2>' + ret[i].title + '<span class="type">'+ret[i].type+'</span></h2>'+'<div class="page-img"><img src="'+ret[i].imageUrl+'"></div><div class="page-main"><p class="university">'+ret[i].university+'</p><p class="content">'+ret[i].summary+'</p></div></div></a>';
					html += tmp;
				}
				page.innerHTML=html;
			} else {
				alert('获取数据错误!错误代号：'+xhr.status+'错误信息：'+xhr.statusText);
			}
		}
	};
	xhr.open('get',url,true);
	xhr.send(null);
}


function more() {
	var type=document.getElementsByClassName('type')[0].innerHTML;
	var category;
	if (type=='微党课') {
		category=1;
	} else if (type=='工作案例') {
		category=0;
	} else if (type=='教师党支部推荐展示') {
		category=2;
	} else if (type=='学生党支部推荐展示') {
		category=3;
	};
	alert(category);
	var pageLength=document.getElementById('page').children.length;
	var num=pageLength+12;
	url='http://47.92.28.251:1024/article/'+num+'/'+category+'/list';
	xhr.onreadystatechange=function () {
		if (xhr.readyState==4) {
			if (xhr.status==200) {
				var ret=JSON.parse(xhr.responseText);
				var page=document.getElementById('page');      //填充内容
				var html = '';
				for (var i = 0; i < ret.length; i++) {
					var tmp = '<a href="page.html?id="'+ret[i].id+'" target="_blank"><div class="page-box"><h2>' + ret[i].title +  '<span class="type">'+ret[i].type+'</span></h2>'+'<div class="page-img"><img src="'+ret[i].imageUrl+'"></div><div class="page-main"><p class="university">'+ret[i].university+'</p><p class="content">'+ret[i].summary+'</p></div></div></a>';
					html += tmp;
				}
				page.innerHTML+=html;
			} else {
				alert('获取数据错误!错误代号：'+xhr.status+'错误信息：'+xhr.statusText);
			}
		}
	};
	xhr.open('get',url,true);
	xhr.send(null);
}


