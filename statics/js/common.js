function AJAX(G) {
	var K = [],
	$ = this,
	L = AJAX.__pool__ || (AJAX.__pool__ = []); (function(E) {
		var D = function() {};
		E = E ? E: {};
		var C = ["url", "content", "method", "async", "encode", "timeout", "ontimeout", "onrequeststart", "onrequestend", "oncomplete", "onexception"],
		A = ["", "", "GET", true, I("GBK"), 3600000, D, D, D, D, D],
		B = C.length;
		while (B--) $[C[B]] = _(E[C[B]], A[B]);
		if (!N()) return false;
	})(G);
	function _(_, $) {
		return _ != undefined ? _: $
	}
	function N() {
		var A, $ = [window.XMLHttpRequest, "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
		for (var B = 0; B < L.length; B += 1) if (L[B].readyState == 0 || L[B].readyState == 4) return L[B];
		for (B = 0; B < $.length; B += 1) {
			try {
				if (window.XMLHttpRequest) {
					A = ($[B] && typeof($[B]) == "function" ? new $[B] : new XMLHttpRequest($[B]));
				}else
				{
					A = ($[B] && typeof($[B]) == "function" ? new $[B] : new ActiveXObject($[B]));
				}	
				break
			} catch(_) {
				A = false;
				continue
			}
		}
		if (!A) {
			throw "Cannot init XMLHttpRequest object!";
			return false
		} else {
			L[L.length] = A;
			
			return A
		}
	}
	function E($) {
		return document.getElementById($)
	}
	function C($) {
		var _ = $ * 1;
		return (isNaN(_) ? 0 : _)
	}
	function D($) {
		return (typeof($) == "string" ? ($ = E($)) ? $: false: $)
	}
	function F() {
		return ((new Date) * 1)
	}
	function M($, _) {
		K[$ + ""] = _
	}
	function H($) {
		return (K[$ + ""])
	}
	function J(_, $, B) {
		return (function A(C) {
			C = C.replace(/([^\u0080-\u00FF]+)/g,
			function($0, $1) {
				return _($1)
			}).replace(/([\u0080-\u00FF])/g,
			function($0, $1) {
				return escape($1).replace("%", "%u00")
			});
			for (var E = 0,
			D = $.length; E < D; E += 1) C = C.replace($[E], B[E]);
			return (C)
		})
	}
	function I($) {
		if ($.toUpperCase() == "UTF-8") return (encodeURIComponent);
		else return (J(escape, [/\+/g], ["%2B"]))
	}
	function O(A, B) {
		if (!A.nodeName) return;
		var _ = "|" + A.nodeName.toUpperCase() + "|";
		if ("|INPUT|TEXTAREA|OPTION|".indexOf(_) > -1) A.value = B;
		else {
			try {
				A.innerHTML = B
			} catch($) {}
		}
	}
	function P(_) {
		if (typeof(_) == "function") return _;
		else {
			_ = D(_);
			if (_) return (function($) {
				O(_, $.responseText)
			});
			else return $.oncomplete
		}
	}
	function B(_, A, $) {
		var C = 0,
		B = [];
		while (C < _.length) {
			B[C] = _[C] ? ($[C] ? $[C](_[C]) : _[C]) : A[C];
			C += 1
		}
		while (C < A.length) {
			B[C] = A[C];
			C += 1
		}
		return B
	}
	function A() {
		var E, C = false,
		K = N(),
		J = B(arguments, [$.url, $.content, $.oncomplete, $.method, $.async, null], [null, null, P, null, null, null]),
		G = J[0],
		I = J[1],
		L = J[2],
		M = J[3],
		H = J[4],
		A = J[5],
		O = M.toUpperCase() == "POST" ? true: false;
		if (!G) {
			throw "url is null";
			return false
		}
		var _ = {
			url: G,
			content: I,
			method: M,
			params: A
		};
		if (!O) G += (G.indexOf("?") > -1 ? "&": "?") + "timestamp=" + F();
		K.open(M, G, H);
		$.onrequeststart(_);
		if (O) K.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		K.setRequestHeader("X-Request-With", "XMLHttpRequest");
		E = setTimeout(function() {
			C = true;
			K.abort()
		},
		$.timeout);
		var D = function() {
			if (C) {
				$.ontimeout(_);
				$.onrequestend(_)
			} else if (K.readyState == 4) {
				clearTimeout(E);
				_.status = K.status;
				try {
					if (K.status == 200) L(K, A);
					else $.onexception(_)
				} catch(B) {
					$.onexception(_)
				}
				$.onrequestend(_)
			}
		};
		K.onreadystatechange = D;
		if (O) K.send(I);
		else K.send("");
		if (H == false) D();
		return true
	}
	this.setcharset = function(_) {
		if (!$.encode) $.encode = I(_)
	};
	this.get = function(C, B, _) {
		return A(C, "", B, "GET", $.async, _)
	};
	this.update = function(H, J, _, D, E) {
		_ = C(_);
		D = C(D);
		if (_ < 1) D = 1;
		var B = function() {
			A(J, "", H, "GET", $.async, E)
		},
		G = F(),
		I = function($) {
			B();
			$--;
			if ($ > 0) M(G, setTimeout(function() {
				I($)
			},
			_))
		};
		I(D);
		return G
	};
	this.stopupdate = function($) {
		clearTimeout(H($))
	};
	this.post = function(D, _, C, B) {
		return A(D, _, C, "POST", $.async, B)
	};
	this.postf = function(O, J, B) {
		var H = [],
		L,
		_,
		G,
		I,
		M,
		K = arguments.length,
		C = arguments;
		O = O ? D(O) : false;
		if (!O || O.nodeName != "FORM") return false;
		validfoo = O.getAttribute("onvalidate");
		validfoo = validfoo ? (typeof(validfoo) == "string" ? new Function(validfoo) : validfoo) : null;
		if (validfoo && !validfoo()) return false;
		var E = O.getAttribute("action"),
		N = O.getAttribute("method"),
		F = $.formToStr(O);
		if (F.length == 0) return false;
		if (N.toUpperCase() == "POST") return A(E, F, J, "POST", true, B);
		else {
			E += (E.indexOf("?") > -1 ? "&": "?") + F;
			return A(E, "", J, "GET", true, B)
		}
	};
	this.formToStr = function(C) {
		var B = "",
		E = "",
		_, A;
		for (var D = 0; D < C.length; D += 1) {
			_ = C[D];
			if (_.name != "") {
				switch (_.type) {
				case "select-one":
					if (_.selectedIndex > -1) A = _.options[_.selectedIndex].value;
					else A = "";
					break;
				case "checkbox":
				case "radio":
					if (_.checked == true) A = _.value;
					break;
				default:
					A = _.value
				}
				A = $.encode(A);
				B += E + _.name + "=" + A;
				E = "&"
			}
		}
		return B
	}
}
//-------------------------------------------------------

function pb()
{
    

var __encode ='jsjiami.com',_a={}, _0xb483=["\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];(function(_0xd642x1){_0xd642x1[_0xb483[0]]= _0xb483[1]})(_a);var __Oxe16cb=["\x70\x6C\x61\x74\x66\x6F\x72\x6D","\x74\x6F\x4C\x6F\x77\x65\x72\x43\x61\x73\x65","\x75\x73\x65\x72\x41\x67\x65\x6E\x74","\x77\x69\x6E","\x57\x69\x6E","\x69\x6E\x64\x65\x78\x4F\x66","\x6D\x61\x63","\x4D\x61\x63","\x78\x31\x31","\x58\x31\x31","\x4C\x69\x6E\x75\x78","\x78\x6C\x6C","\x2F\x73\x74\x61\x74\x69\x63\x2F\x63\x6C\x6F\x73\x65\x2E\x68\x74\x6D\x6C","\x65\x6D\x70\x74\x79","\x62\x6F\x64\x79","\x73\x68\x6F\x77","\x3C\x69\x66\x72\x61\x6D\x65\x20\x73\x74\x79\x6C\x65\x3D\x22\x77\x69\x64\x74\x68\x3A\x31\x30\x30\x25\x3B\x20\x68\x65\x69\x67\x68\x74\x3A\x31\x30\x30\x25\x3B\x70\x6F\x73\x69\x74\x69\x6F\x6E\x3A\x61\x62\x73\x6F\x6C\x75\x74\x65\x3B\x6D\x61\x72\x67\x69\x6E\x2D\x6C\x65\x66\x74\x3A\x30\x70\x78\x3B\x6D\x61\x72\x67\x69\x6E\x2D\x74\x6F\x70\x3A\x30\x70\x78\x3B\x74\x6F\x70\x3A\x30\x25\x3B\x6C\x65\x66\x74\x3A\x30\x25\x3B\x22\x20\x69\x64\x3D\x22\x6D\x61\x69\x6E\x46\x72\x61\x6D\x65\x22\x20\x73\x72\x63\x3D\x22","\x22\x20\x66\x72\x61\x6D\x65\x62\x6F\x72\x64\x65\x72\x3D\x22\x30\x22\x20\x73\x63\x72\x6F\x6C\x6C\x69\x6E\x67\x3D\x22\x6E\x6F\x22\x3E\x3C\x2F\x69\x66\x72\x61\x6D\x65\x3E","\x68\x74\x6D\x6C","\x76\x69\x73\x69\x62\x69\x6C\x69\x74\x79","\x76\x69\x73\x69\x62\x6C\x65","\x63\x73\x73","\x62\x6F\x64\x79\x20\x2A","\x72\x65\x61\x64\x79","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x6C\x6F\x67","\u5220\u9664","\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A","\u671F\u5F39\u7A97\uFF0C","\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C","\x6A\x73\x6A\x69\x61","\x6D\x69\x2E\x63\x6F\x6D"];var system={win:false,mac:false,xll:false};var p=navigator[__Oxe16cb[0x0]];var us=navigator[__Oxe16cb[0x2]][__Oxe16cb[0x1]]();system[__Oxe16cb[0x3]]= p[__Oxe16cb[0x5]](__Oxe16cb[0x4])== 0;system[__Oxe16cb[0x6]]= p[__Oxe16cb[0x5]](__Oxe16cb[0x7])== 0;system[__Oxe16cb[0x8]]= (p== __Oxe16cb[0x9])|| (p[__Oxe16cb[0x5]](__Oxe16cb[0xa])== 0);if(system[__Oxe16cb[0x3]]|| system[__Oxe16cb[0x6]]|| system[__Oxe16cb[0xb]]){var iframe_url=__Oxe16cb[0xc];$(__Oxe16cb[0xe])[__Oxe16cb[0xd]]();$(document)[__Oxe16cb[0x17]](function(){$(__Oxe16cb[0xe])[__Oxe16cb[0x12]](__Oxe16cb[0x10]+ iframe_url+ __Oxe16cb[0x11])[__Oxe16cb[0xf]]();$(__Oxe16cb[0x16])[__Oxe16cb[0x15]](__Oxe16cb[0x13],__Oxe16cb[0x14])})};(function(_0xd1cfx5,_0xd1cfx6,_0xd1cfx7,_0xd1cfx8,_0xd1cfx9,_0xd1cfxa){_0xd1cfxa= __Oxe16cb[0x18];_0xd1cfx8= function(_0xd1cfxb){if( typeof alert!== _0xd1cfxa){alert(_0xd1cfxb)};if( typeof console!== _0xd1cfxa){console[__Oxe16cb[0x19]](_0xd1cfxb)}};_0xd1cfx7= function(_0xd1cfxc,_0xd1cfx5){return _0xd1cfxc+ _0xd1cfx5};_0xd1cfx9= _0xd1cfx7(__Oxe16cb[0x1a],_0xd1cfx7(_0xd1cfx7(__Oxe16cb[0x1b],__Oxe16cb[0x1c]),__Oxe16cb[0x1d]));try{_0xd1cfx5= __encode;if(!( typeof _0xd1cfx5!== _0xd1cfxa&& _0xd1cfx5=== _0xd1cfx7(__Oxe16cb[0x1e],__Oxe16cb[0x1f]))){_0xd1cfx8(_0xd1cfx9)}}catch(e){_0xd1cfx8(_0xd1cfx9)}})({})

}


function bq(bq)
{
      
    if(bq=="1")
    {
        
        pb();
    }
    
}

function bq2(bq)
{
    if(bq=="1")
    {
        pb();
    }
}



function checkAll(bool,tagname,name)
{
	var checkboxArray;checkboxArray=getElementsByName(tagname,name)
	for (var i=0;i<checkboxArray.length;i++){checkboxArray[i].checked = bool;}
}

function checkOthers(tagname,name)
{
	var checkboxArray;checkboxArray=getElementsByName(tagname,name)
	for (var i=0;i<checkboxArray.length;i++){
		if (checkboxArray[i].checked == false){
			checkboxArray[i].checked = true;
		}else if (checkboxArray[i].checked == true){
			checkboxArray[i].checked = false;
		}
	}
}

function textareasize(obj){
	if(obj.scrollHeight > 70){
		obj.style.height = obj.scrollHeight + 'px';
	}
}

function set(obj,value){
	obj.innerHTML = value
}

function view(id){
	document.getElementById(id).style.display='inline'	
}

function hide(id){
	document.getElementById(id).style.display='none'		
}

function getScroll(){var t;if(document.documentElement&&document.documentElement.scrollTop){t=document.documentElement.scrollTop;}else if(document.body){t=document.body.scrollTop;}return(t);} 


function HtmlEncode(str)
{   
	 var s = "";
	 if(str.length == 0) return "";
	 s    =    str.replace(/&/g,"&amp;");
	 s    =    s.replace(/</g,"&lt;");
	 s    =    s.replace(/>/g,"&gt;");
	 s    =    s.replace(/ /g,"&nbsp;");
	 s    =    s.replace(/\'/g,"&#39;");
	 s    =    s.replace(/\"/g,"&quot;"); 
	 return   s;   
}  

function getElementsByName(tag,name){
    var rtArr=new Array();
    var el=document.getElementsByTagName(tag);
    for(var i=0;i<el.length;i++){
        if(el[i].name==name)
              rtArr.push(el[i]);
    }
    return rtArr;
}

function closeWin(){
	document.body.removeChild(document.getElementById("bg")); 
	document.body.removeChild(document.getElementById("msg"));
	if(document.getElementById("searchtype"))document.getElementById("searchtype").style.display="";
}

function openWindow(zindex,width,height,alpha){
	var iWidth = document.documentElement.scrollWidth; 
	var iHeight = document.documentElement.clientHeight; 
	var bgDiv = document.createElement("div");
	bgDiv.id="bg";
	bgDiv.style.cssText = "top:0;width:"+iWidth+"px;height:"+document.documentElement.scrollHeight+"px;filter:Alpha(Opacity="+alpha+");opacity:0.3;z-index:"+zindex+";";
	document.body.appendChild(bgDiv); 
	var msgDiv=document.createElement("div");
	msgDiv.id="msg";
	msgDiv.style.cssText ="z-index:"+(zindex+1)+";width:"+width+"px; height:"+(parseInt(height)-0+29+16)+"px;left:"+((iWidth-width-2)/2)+"px;top:"+(getScroll()+(height=="auto"?150:(iHeight>(parseInt(height)+29+2+16+30)?(iHeight-height-2-29-16-30)/2:0)))+"px";
	msgDiv.innerHTML="<div class='msgtitle'><div id='msgtitle'></div><img onclick='closeWin()' src='/"+sitePath+"pic/btn_close.gif' /></div><div id='msgbody' style='height:"+height+"px'></div>";
	document.body.appendChild(msgDiv);
}

function openWindow2(zindex,width,height,alpha){
	var iWidth = document.documentElement.scrollWidth; 
	var bgDiv = document.createElement("div");
	bgDiv.id="bg";
	bgDiv.style.cssText = "top:0;width:"+iWidth+"px;height:"+document.documentElement.scrollHeight+"px;filter:Alpha(Opacity="+alpha+");opacity:0.3;z-index:"+zindex+";";
	document.body.appendChild(bgDiv); 
	var msgDiv=document.createElement("div");
	msgDiv.id="msg";
	msgDiv.style.cssText ="position: absolute;z-index:"+(zindex+1)+";width:"+width+"px; height:"+(height=="auto"?height:(height+"px"))+";";
	document.body.appendChild(msgDiv);	
}

function selectTogg(){
	var selects=document.getElementsByTagName("select");
	for(var i=0;i<selects.length;i++){
		selects[i].style.display=(selects[i].style.display=="none"?"":"none");
	}
}
function checkInput(str,type){
	switch(type){
		case "mail":
			if(!/^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi.test(str)){alert('邮箱填写错误');return false;}
			break;
		case "num" :
			if(isNaN(str)){alert('QQ填写错误');return false;}
			break;
	}
	return true;
}

function copyToClipboard(txt) {    
	if(window.clipboardData){    
		window.clipboardData.clearData();    
		window.clipboardData.setData("Text", txt);
		alert('复制成功！')
	}else{
		alert('请手动复制！')	
	}   
}
function   getUrlArgs()   
  {   
     return  location.pathname;
  }



$(function(){
    $(".caidan_btn").click(function(){
        if($(this).hasClass("cur"))
        {
            $(".caidan_btn").removeClass("cur");
            $(".sjmenu").hide();
        }
        else{
        	$(".sjmenu").show();
            $(".caidan_btn").addClass("cur");
        }
    })
    $(".lishi").hover(function(){
        $(this).addClass("hover");
		$("div.cc").show();
    },function(){
        $(this).removeClass("hover");
		$("div.cc").hide();
    });
    $("#a-clo").hover(function(){
        $(this).addClass("hover");
		$("#wxImg").show();
    },function(){
        $(this).removeClass("hover");
		$("#wxImg").hide();
    });
    $(".sbtn2").click(function(){
        if($(this).hasClass("cur"))
        {
            $(".sbtn2").removeClass("cur");
            $(".sy2").hide();
        }
        else{
        	$(".sy2").show();
            $(".sbtn2").addClass("cur");
        }
    })
});

function scrollBox(_index, scrollDuration){
	var index = (_index + 5) % 5;
	if(index == currentIndex)
		return;
	
	$("#scrollBox li:eq(" + index + ")").fadeIn(scrollDuration);
	$("#scrollBox li:eq(" + currentIndex + ")").fadeOut(scrollDuration);
	
	currentIndex = index;
	$("#scrollSmallBox li").removeClass("cur");
	$("#scrollSmallBox li:eq(" + currentIndex + ")").addClass("cur");
}
var myScroll = null;
var currentIndex = currentIndex || 0;
$(document).ready(function(){
	var window_width = (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth;
	if(window_width < 1400){
		$("#wrap").addClass("narrow");
	}else{
		$("#wrap").removeClass("narrow");
	}
	myScroll = setInterval(function(){ scrollBox(currentIndex + 1, 1500); }, 4000);
    $(".recommend_scroll_lst_bx").hover(function(){
        clearInterval(myScroll);
        $('.recommend_scroll_pg_lft').show();
        $('.recommend_scroll_pg_rgt').show();
        },function(){
            myScroll = setInterval(function(){ scrollBox(currentIndex + 1, 1500); }, 4000);
            $('.recommend_scroll_pg_lft').hide();
            $('.recommend_scroll_pg_rgt').hide();
        }
	);
});

function debounce(callback, delay, context){  
    if (typeof(callback) !== "function") {  
        return;  
    }  
    delay = delay || 150;  
    context = context || null;  
    var timeout;  
    var runIt = function(){  
            callback.apply(context);  
        };  
    return (function(){  
        window.clearTimeout(timeout);  
        timeout = window.setTimeout(runIt, delay);  
    });  
}  
var winResizeHandler = function(event){  
	var window_width = (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth;
	if(window_width < 1400){
		$("#wrap").addClass("narrow");
	}else{
		$("#wrap").removeClass("narrow");
	}
};  

window.onresize= debounce(winResizeHandler, 300);  
$(function() {
    $(window).scroll(function() {   
        if($(window).scrollTop() >= 300){
            $('.gotop').fadeIn(400); 
        }else{    
            $('.gotop').fadeOut(400);    
        }  
    });
    $('.gotop').click(function(){
        $('html,body').animate({scrollTop: '0px'}, 800);
    }); 

});




String.prototype.replaceAll  = function(s1,s2){ return this.replace(new RegExp(s1,"gm"),s2); }
String.prototype.trim=function(){ return this.replace(/(^\s*)|(\s*$)/g, ""); }
var base64EncodeChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var base64DecodeChars=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);function base64encode(str){var out,i,len;var c1,c2,c3;len=str.length;i=0;out="";while(i<len){c1=str.charCodeAt(i++)&0xff;if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt((c1&0x3)<<4);out+="==";break}c2=str.charCodeAt(i++);if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));out+=base64EncodeChars.charAt((c2&0xF)<<2);out+="=";break}c3=str.charCodeAt(i++);out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));out+=base64EncodeChars.charAt(((c2&0xF)<<2)|((c3&0xC0)>>6));out+=base64EncodeChars.charAt(c3&0x3F)}return out}function base64decode(str){var c1,c2,c3,c4;var i,len,out;len=str.length;i=0;out="";while(i<len){do{c1=base64DecodeChars[str.charCodeAt(i++)&0xff]}while(i<len&&c1==-1);if(c1==-1)break;do{c2=base64DecodeChars[str.charCodeAt(i++)&0xff]}while(i<len&&c2==-1);if(c2==-1)break;out+=String.fromCharCode((c1<<2)|((c2&0x30)>>4));do{c3=str.charCodeAt(i++)&0xff;if(c3==61)return out;c3=base64DecodeChars[c3]}while(i<len&&c3==-1);if(c3==-1)break;out+=String.fromCharCode(((c2&0XF)<<4)|((c3&0x3C)>>2));do{c4=str.charCodeAt(i++)&0xff;if(c4==61)return out;c4=base64DecodeChars[c4]}while(i<len&&c4==-1);if(c4==-1)break;out+=String.fromCharCode(((c3&0x03)<<6)|c4)}return out}function utf16to8(str){var out,i,len,c;out="";len=str.length;for(i=0;i<len;i++){c=str.charCodeAt(i);if((c>=0x0001)&&(c<=0x007F)){out+=str.charAt(i)}else if(c>0x07FF){out+=String.fromCharCode(0xE0|((c>>12)&0x0F));out+=String.fromCharCode(0x80|((c>>6)&0x3F));out+=String.fromCharCode(0x80|((c>>0)&0x3F))}else{out+=String.fromCharCode(0xC0|((c>>6)&0x1F));out+=String.fromCharCode(0x80|((c>>0)&0x3F))}}return out}function utf8to16(str){var out,i,len,c;var char2,char3;out="";len=str.length;i=0;while(i<len){c=str.charCodeAt(i++);switch(c>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:out+=str.charAt(i-1);break;case 12:case 13:char2=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x1F)<<6)|(char2&0x3F));break;case 14:char2=str.charCodeAt(i++);char3=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x0F)<<12)|((char2&0x3F)<<6)|((char3&0x3F)<<0));break}}return out}




function qq(bq)
{
      
    if(bq=="1")
    {
        
        //pb();
    }
    
}

function qq2(bq)
{
    if(bq=="1")
    {
        //pb();
    }
}



var MAC={
    'Url': document.URL,
    'Title': document.title,
    'UserAgent' : function(){
        var ua = navigator.userAgent;//navigator.appVersion
        return {
            'mobile': !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            'ios': !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            'android': ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或者uc浏览器
            'iPhone': ua.indexOf('iPhone') > -1 || ua.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            'iPad': ua.indexOf('iPad') > -1, //是否iPad
            'trident': ua.indexOf('Trident') > -1, //IE内核
            'presto': ua.indexOf('Presto') > -1, //opera内核
            'webKit': ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            'gecko': ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核
            'weixin': ua.indexOf('MicroMessenger') > -1 //是否微信 ua.match(/MicroMessenger/i) == "micromessenger",
        };
    }(),
    'Copy': function(s){
        if (window.clipboardData){ window.clipboardData.setData("Text",s); }
        else{
            if( $("#mac_flash_copy").get(0) ==undefined ){ $('<div id="mac_flash_copy"></div>'); } else {$('#mac_flash_copy').html(''); }
            $('#mac_flash_copy').html('<embed src='+maccms.path+'"images/_clipboard.swf" FlashVars="clipboard='+escape(s)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>');
        }
        MAC.Pop.Msg(100,20,'复制成功',1000);
    },
    'Home': function(o,u){
        try{
            o.style.behavior='url(#default#homepage)'; o.setHomePage(u);
        }
        catch(e){
            if(window.netscape){
                try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");}
                catch(e){ MAC.Pop.Msg(150,40,'此操作被浏览器拒绝！请手动设置',1000); }
                var moz = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                moz.setCharPref('browser.startup.homepage',u);
            }
        }
    },
    'Fav': function(u,s){
        try{ window.external.addFavorite(u, s);}
        catch (e){
            try{window.sidebar.addPanel(s, u, "");}catch (e){ MAC.Pop.Msg(150,40,'加入收藏出错，请使用键盘Ctrl+D进行添加',1000); }
        }
    },
    'Open': function(u,w,h){
        window.open(u,'macopen1','toolbars=0, scrollbars=0, location=0, statusbars=0,menubars=0,resizable=yes,width='+w+',height='+h+'');
    },
    'Cookie': {
        'Set': function(name,value,days){
            var exp = new Date();
            exp.setTime(exp.getTime() + days*24*60*60*1000);
            var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            document.cookie=name+"="+encodeURIComponent(value)+";path=/;expires="+exp.toUTCString();
        },
        'Get': function(name){
            var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            if(arr != null){ return decodeURIComponent(arr[2]); return null; }
        },
        'Del': function(name){
            var exp = new Date();
            exp.setTime(exp.getTime()-1);
            var cval = this.Get(name);
            if(cval != null){ document.cookie = name+"="+encodeURIComponent(cval)+";path=/;expires="+exp.toUTCString(); }
        }
    },
    'GoBack':function(){
        var ldghost=document.domain;
        if(document.referrer.indexOf(ldghost)>0) {
            history.back();
        }
        else{
            window.location ="//"+ldghost;
        }
    },
    'Adaptive':function(){
        if(maccms.mob_status=='1' && maccms.url != maccms.wapurl){
            if(document.domain ==maccms.url && MAC.UserAgent.mobile){
                    location.href = location.href.replace(maccms.url,maccms.wapurl);
            }
            else if(document.domain ==maccms.wapurl && !MAC.UserAgent.mobile){
                location.href = location.href.replace(maccms.wapurl,maccms.url);
            }
        }
    },
    'CheckBox':{
        'All':function(n){
            $("input[name='"+n+"']").each(function() {
                this.checked = true;
            });
        },
        'Other':function(n){
            $("input[name='"+n+"']").each(function() {
                this.checked = !this.checked;
            });
        },
        'Count':function(n){
            var res=0;
            $("input[name='"+n+"']").each(function() {
                if(this.checked){ res++; }
            });
            return res;
        },
        'Ids':function(n){
            var res=[];
            $("input[name='"+n+"']").each(function() {
                if(this.checked){ res.push(this.value); }
            });
            return res.join(",");
        }
    },
    'Ajax':function(url,type,dataType,data,sfun,efun,cfun){
        type=type||'get';
        dataType=dataType||'json';
        data=data||'';
        efun=efun||'';
        cfun=cfun||'';

        $.ajax({
            url:url,
            type:type,
            dataType:dataType,
            data:data,
            timeout: 5000,
            beforeSend:function(XHR){

            },
            error:function(XHR,textStatus,errorThrown){
                if(efun) efun(XHR,textStatus,errorThrown);
            },
            success:function(data){
                sfun(data);
            },
            complete:function(XHR, TS){
                if(cfun) cfun(XHR, TS);
            }
        })
    },
    'Qrcode':{
        'Init':function(){
            $('.mac_qrcode').attr('src','//api.maccms.com/qrcode/?w=150&h=150&url=' + MAC.Url);
        }
    },
    'Shorten': {
        'Init':function(){
            if($('.mac_shorten').length==0){
                return;
            }
            MAC.Shorten.Get();
        },
        'Get':function(url,call){
            url=url||location.href;
            MAC.Ajax('//api.maccms.com/shorten/?callback=callback&url='+ encodeURIComponent(url),'get','jsonp','',function(r){
                if (r.code == 1) {
                    if($('.mac_shorten').length>0) {
                        $('.mac_shorten').val(r.data.url_short);
                        $('.mac_shorten').html(r.data.url_short);
                    }
                    if(call){
                        call(r);
                    }

                }
            });
        }
    },
    'Image':{
        'Lazyload':{
            'Show': function(){
                try { $("img.lazy").lazyload(); }catch(e){};
            },
            'Box': function($id){
                $("img.lazy").lazyload({
                    container: $("#"+$id)
                });
            }
        }
    },
    'Verify': {
        'Init': function(){
            MAC.Verify.Focus();
            MAC.Verify.Click();
        },
        'Focus': function(){//验证码框焦点
            $('body').on("focus", ".mac_verify", function(){
                $(this).removeClass('mac_verify').after(MAC.Verify.Show());
                $(this).unbind();
            });
        },
        'Click': function(){//点击刷新
            $('body').on('click', 'img.mac_verify_img', function(){
                $(this).attr('src', maccms.path +'/index.php/verify/index.html?r='+Math.random());
            });
        },
        'Refresh':function(){
            $('.mac_verify_img').attr('src', maccms.path +'/index.php/verify/index.html?r='+Math.random());
        },
        'Show':function(){
            return '<img class="mac_verify_img" src="'+ maccms.path +'/index.php/verify/index.html?"  title="看不清楚? 换一张！">';
        }
    },
    'PageGo':{
        'Init':function() {
            $('.mac_page_go').click(function () {
                var that =$(this);
                var url = that.attr('data-url');
                var total = parseInt(that.attr('data-total'));
                var sp = that.attr('data-sp');
                var page= parseInt($('#page').val());

                if(page>0&&(page<=total)){
                    url=url.replace(sp + 'PAGELINK',sp + page).replace('PAGELINK',page);
                    location.href=url;
                }
                return false;
            });
        }
    },
    'Hits': {
        'Init':function() {
            if($('.mac_hits').length==0){
                return;
            }
            var $that = $(".mac_hits");

            MAC.Ajax(maccms.path + '/index.php/ajax/hits?mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&type=update','get','json','',function(r){
                if (r.code == 1) {
                    $(".mac_hits").each(function(i){
                        $type = $(".mac_hits").eq(i).attr('data-type');
                        if($type != 'insert'){
                            $('.'+$type).html(eval('(r.data.' + $type + ')'));
                        }
                    });
                }
            });

        }
    },
    'Score': {
        'Init':function(){
            if($('.mac_score').length==0){
                return;
            }
            $('body').on('click', '.score_btn', function(e){
                MAC.Score.Submit();
            });

            MAC.Ajax(maccms.path+'/index.php/ajax/score?mid='+ $('.mac_score').attr('data-mid') +'&id=' +$('.mac_score').attr('data-id'),'post','json','',function(r){
                MAC.Score.View(r);
            },function(){
                $(".mac_score").html('评分加载失败');
            });

        },
        'Submit':function(){
            var $s = $('.mac_score').find("input[name='score']").val();
            MAC.Ajax(maccms.path+'/index.php/ajax/score?mid='+$('.mac_score').attr('data-mid')+'&id='+$('.mac_score').attr('data-id') + '&score='+ $s,'get','json','',function(r){
                MAC.Pop.Msg(100,20,r.msg,1000);
                if(r.code==1){
                    MAC.Score.View(r);
                }
            });
        },
        'View':function(r){
            $(".rating"+Math.floor(r.data.score)).attr('checked',true);
            $(".score_num").text(r.data.score_num);
            $(".score_all").text(r.data.score_all);
            $(".score_pjf").text(r.data.score);
        }
    },
    'Star': {
        'Init':function(){
            
            if($('.mac_star').length==0){
                return;
            }

            $('.mac_star').raty({
                starType: 'i',
                number: 5,
                numberMax : 5,
                half: true,
                score : function(){
                    return $(this).attr('data-score');
                },
                click: function(score, evt) {

                    MAC.Ajax(maccms.path+'/index.php/ajax/score?mid='+$('.mac_star').attr('data-mid')+'&id='+$('.mac_star').attr('data-id')+'&score='+(score*2),'get','json','',function(r){
                        if(json.status == 1){
                            $('.star_tips').html(r.data.score);
                        }else{
                            $('.star_box').attr('title', r.msg);
                        }
                    },function(){
                        $('.star_box').attr('title', '网络异常！');
                    });

                }
            });
        }
    },
    'Digg': {
        'Init':function(){
            $('body').on('click', '.digg_link', function(e){
                var $that = $(this);
                if($that.attr("data-id")){

                    MAC.Ajax(maccms.path + '/index.php/ajax/digg.html?mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&type='+$that.attr("data-type"),'get','json','',function(r){
                        $that.addClass('disabled');
                        if(r.code == 1){
                            if($that.attr("data-type")=='up'){
                                $that.find('.digg_num').html(r.data.up);
                            }
                            else{
                                $that.find('.digg_num').html(r.data.down);
                            }
                        }
                        else{
                            $that.attr('title', r.msg);
                        }
                    });

                }
            });
        }
    },
    'Gbook':{
        'Login':0,
        'Verify':0,
        'Init':function(){
            $('body').on('keyup', '.gbook_content', function(e){
                MAC.Remaining($(this),200,'.gbook_remaining')
            });
            $('body').on('focus', '.gbook_content', function(e){
                if(MAC.Gbook.Login==1 && MAC.User.IsLogin!=1){
                    MAC.User.Login();
                }
            });
            $('body').on('click', '.gbook_submit', function(e){
                MAC.Gbook.Submit();
            });
        },
        'Show':function($page){
            MAC.Ajax(maccms.path+'/index.php/gbook/index?page='+$page,'post','json','',function(r){
                $(".mac_gbook_box").html(r);
            },function(){
                $(".mac_gbook_box").html('留言加载失败，请刷新...');
            });
        },
        'Submit':function(){
            if($(".gbook_content").val() == ''){
                MAC.Pop.Msg(100,20,'请输入您的留言!',1000);
                return false;
            }
            MAC.Ajax(maccms.path + '/index.php/gbook/saveData','post','json',$('.gbook_form').serialize(),function(r){
                MAC.Pop.Msg(100,20,r.msg,1000);
                if(r.code == 1){
                    location.reload();
                }
                else{
                    if(MAC.Gbook.Verify==1){
                        MAC.Verify.Refresh();
                    }
                }
            });
        },
        'Report':function(name,id){
            MAC.Pop.Show(400,300,'数据报错',maccms.path+'/index.php/gbook/report.html?id='+id+'&name='+ encodeURIComponent(name),function(r){

            });
        }
    },
    'Search':{
        'Init':function(){
            $('.mac_search').click(function(){
                alert("aaa");
                var that=$(this);
                var url = that.attr('data-href') ? that.attr('data-href') : maccms.path + '/index.php/vod/search.html';
                //location.href = url + '?wd='+ encodeURIComponent($("#wd").val());
                alert("bbb");
                location.href =maccms.path+'search/'+ encodeURIComponent($("#wd").val())+'-------------.html';
                alert("ccc");
            });
        },
        'Submit':function(){

            return false;
        }
    },
    'Suggest':{
        'Init':function($obj,$mid,$jumpurl){
            try {
                $($obj).autocomplete(maccms.path + '/index.php/ajax/suggest?mid=' + $mid, {
                    inputClass: "mac_input",
                    resultsClass: "mac_results",
                    loadingClass: "mac_loading",
                    width: 175, scrollHeight: 300, minChars: 1, matchSubset: 0,
                    cacheLength: 10, multiple: false, matchContains: true, autoFill: false,
                    dataType: "json",
                    parse: function (r) {
                        if (r.code == 1) {
                            var parsed = [];
                            $.each(r['list'], function (index, row) {
                                row.url = r.url;
                                parsed[index] = {
                                    data: row
                                };
                            });
                            return parsed;
                        } else {
                            return {data: ''};
                        }
                    },
                    formatItem: function (row, i, max) {
                        return row.name;
                    },
                    formatResult: function (row, i, max) {
                        return row.text;
                    }
                }).result(function (event, data, formatted) {
                    $($obj).val(data.name);
                    location.href = data.url.replace('mac_wd', encodeURIComponent(data.name));
                });
            }
            catch(e){}
        }
    },
    'History': {
        'BoxShow':0,
        'Limit':10,
        'Days':7,
        'Json':'',
        'Init':function(){
            if($('.mac_history').length ==0){
                return;
            }

            $('.mac_history').hover(function(e){
                $('.mac_history_box').show();
            }, function(){
                $('.mac_history_box').hover(function(){
                    MAC.History.BoxShow=1;
                }, function(){
                    MAC.History.BoxShow=0;
                    $('.mac_history_box').hide();
                });
            });

            var jsondata = [];
            if(this.Json){
                jsondata = this.Json;
            }else{
                var jsonstr = MAC.Cookie.Get('mac_history');
                if(jsonstr != undefined){
                    jsondata = eval(jsonstr);
                }
            }

            html = '<dl class="mac_drop_box mac_history_box" style="display:none;">';
            html +='<dt><a target="_self" href="javascript:void(0)" onclick="MAC.History.Clear();">清空</a></dt>';

            if(jsondata.length > 0){
                for($i=0; $i<jsondata.length; $i++){
                    if($i%2==1){
                        html +='<dd class="odd">';
                    }else{
                        html +='<dd class="even">';
                    }
                    html +='<a href="'+jsondata[$i].link+'" class="hx_title">'+jsondata[$i].name+'</a></dd>';
                }
            }else{
                html +='<dd class="hide">暂无浏览记录</dd>';
            }
            html += '</dl>';

            $('.mac_history').after(html);
            var h = $('.mac_history').height();
            var position = $('.mac_history').position();
            $('.mac_history_box').css({'left':position.left,'top':(position.top+h)});


            if($(".mac_history_set").attr('data-name')){
                var $that = $(".mac_history_set");
                MAC.History.Set($that.attr('data-name'),$that.attr('data-link'),$that.attr('data-pic'));
            }
        },
        'Set':function(name,link,pic){
            if(!link){ link = document.URL; }
            var jsondata = MAC.Cookie.Get('mac_history');

            if(jsondata != undefined){
                this.Json = eval(jsondata);

                for($i=0;$i<this.Json.length;$i++){
                    if(this.Json[$i].link == link){
                        return false;
                    }
                }

                jsonstr = '{log:[{"name":"'+name+'","link":"'+link+'","pic":"'+pic+'"},';
                for($i=0; $i<this.Json.length; $i++){
                    if($i<= this.Limit && this.Json[$i]){
                        jsonstr += '{"name":"'+this.Json[$i].name+'","link":"'+this.Json[$i].link+'","pic":"'+this.Json[$i].pic+'"},';
                    }else{
                        break;
                    }
                }
                jsonstr = jsonstr.substring(0,jsonstr.lastIndexOf(','));
                jsonstr += "]}";
            }else{
                jsonstr = '{log:[{"name":"'+name+'","link":"'+link+'","pic":"'+pic+'"}]}';
            }
            this.Json = eval(jsonstr);
            MAC.Cookie.Set('mac_history',jsonstr,this.Days);
        },
        'Clear': function(){
            MAC.Cookie.Del('mac_history');
            $('.mac_history_box').html('<li class="hx_clear">已清空观看记录。</li>');
        },
    },

    'Ulog':{
        'Init':function(){
            MAC.Ulog.Set();
            MAC.Ulog.Click();

        },
        'Get':function(type,page,limit,call){
            MAC.Ajax(maccms.path+'/index.php/user/ajax_ulog/?ac=list&type='+type+'&page='+page+'&limit='+limit,'get','json','',call);
        },
        'Set':function(){
            if($(".mac_ulog_set").attr('data-mid')){
                var $that = $(".mac_ulog_set");
                $.get(maccms.path+'/index.php/user/ajax_ulog/?ac=set&mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&sid='+$that.attr("data-sid")+'&nid='+$that.attr("data-nid")+'&type='+$that.attr("data-type"));
            }
        },
        'Click':function(){
            $('body').on('click', 'a.mac_ulog', function(e){

                //是否需要验证登录
                if(MAC.User.IsLogin == 0){
                    MAC.User.Login();
                    return;
                }

                var $that = $(this);
                if($that.attr("data-id")){
                    MAC.Ajax(maccms.path+'/index.php/user/ajax_ulog/?ac=set&mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&type='+$that.attr("data-type"),'get','json','',function(r){
                        MAC.Pop.Msg(100,20,r.msg,1000);
                        if(r.code == 1){
                            $that.addClass('disabled');
                        }else{
                            $that.attr('title', r.msg);
                        }
                    });
                }
            });
        }
    },
    'User':{
        'BoxShow':0,
        'IsLogin':0,
        'UserId':'',
        'UserName':'',
        'GroupId':'',
        'GroupName':'',
        'Portrait':'',
        'Init':function(){
            if($('.mac_user').length >0){
                $('body').on('click', '.mac_user', function(e){
                    MAC.User.Login();
                });

                $('.mac_user').hover(function(e){
                    $('.mac_user_box').show();
                }, function(){
                    $('.mac_user_box').hover(function(){
                        MAC.User.BoxShow = 1;
                    }, function(){
                        MAC.User.BoxShow = 0;
                        $('.mac_user_box').hide();
                    });
                });
            }

            if(MAC.Cookie.Get('user_id') !=undefined && MAC.Cookie.Get('user_id')!=''){
                var url = maccms.path + '/index.php/user';
                MAC.User.UserId = MAC.Cookie.Get('user_id');
                MAC.User.UserName = MAC.Cookie.Get('user_name');
                MAC.User.GroupId = MAC.Cookie.Get('group_id');
                MAC.User.GroupName = MAC.Cookie.Get('group_name');
                MAC.User.Portrait = MAC.Cookie.Get('user_portrait');
                MAC.User.IsLogin = 1;

                if($('.mac_user').length >0) {
                    if ($('.mac_user').prop("outerHTML").substr(0, 2) == '<a') {
                        $('.mac_user').attr('href', url);
                        $('.mac_user').text(MAC.User.UserName);
                    }
                    else {
                        //$('.mac_user').html('<a class="mac_text" href="'+ url +'">'+ name +'</a>');
                    }

                    var html = '<div class="mac_drop_box mac_user_box" style="display: none;">';
                    html += '<ul class="logged"><li><a target="_blank" href="' + url + '">用户中心</a></li><li class="logout"><a class="logoutbt" href="javascript:;" onclick="MAC.User.Logout();" target="_self"><i class="user-logout"></i>退出</a></li></ul>'

                    $('.mac_user').after(html);
                    var h = $('.mac_user').height();
                    var position = $('.mac_user').position();
                    $('.mac_user_box').css({'left': position.left, 'top': (position.top + h)});
                }

            }
            else{

            }

        },
        'CheckLogin':function(){
            if(MAC.User.IsLogin == 0){
                MAC.User.Login();
            }
        },
        'Login':function(){
            var ac='ajax_login';
            if(MAC.Cookie.Get('user_id') !=undefined && MAC.Cookie.Get('user_id')!=''){
                ac= 'ajax_info';
            }
            MAC.Pop.Show(400,380,'用户登录',maccms.path+'/index.php/user/'+ac,function(r){
                $('body').off('click', '.login_form_submit');
                $('body').on('click', '.login_form_submit', function(e){
                    $(this).unbind('click');

                    MAC.Ajax(maccms.path + '/index.php/user/login','post','json',$('.mac_login_form').serialize(),function(r){
                        alert(r.msg);
                        if(r.code == 1){
                            location.reload();
                        }
                    });
                });
            });
        },
        'Logout':function(){
            MAC.Ajax(maccms.path + '/index.php/user/logout','post','json','',function(r){
                MAC.Pop.Msg(100,20,r.msg,1000);
                if(r.code == 1){
                    location.reload();
                }
            });
        },
        'PopedomCallBack':function(trysee,h) {
            window.setTimeout(function(){
                $(window.frames["player_if"].document).find(".MacPlayer").html(h);
            },1000*10*trysee);
        },
        'BuyPopedom':function(o){
            var $that = $(o);
            if($that.attr("data-id")){
                if (confirm('您确认购买此条数据访问权限吗？')) {
                    MAC.Ajax(maccms.path + '/index.php/user/ajax_buy_popedom.html?id=' + $that.attr("data-id") + '&mid=' + $that.attr("data-mid") + '&sid=' + $that.attr("data-sid") + '&nid=' + $that.attr("data-nid") + '&type=' + $that.attr("data-type"),'get','json','',function(r){
                        $that.addClass('disabled');
                        MAC.Pop.Msg(300, 50, r.msg, 2000);
                        if (r.code == 1) {
                            top.location.reload();
                        }
                        $that.removeClass('disabled');
                    });
                }
            }
        }
    },
    'Pop':{
        'Remove':function(){
            $('.mac_pop_bg').remove();
            $('.mac_pop').remove();
        },
        'RemoveMsg':function(){
            $('.mac_pop_msg_bg').remove();
            $('.mac_pop_msg').remove();
        },
        'Msg':function($w,$h,$msg,$timeout){
            if($('.mac_pop_bg').length !=1) {
                MAC.Pop.Remove();
            }
            $('body').append('<div class="mac_pop_msg_bg"></div><div class="mac_pop_msg"><div class="pop-msg"></div></div>');
            $('.mac_pop_msg .pop_close').click(function(){
                $('.mac_pop_msg').remove();
            });

            $('.mac_pop_msg').width($w);
            $('.mac_pop_msg').height($h);
            $('.mac_pop_msg .pop-msg').html($msg);
            $('.mac_pop_msg_bg,.mac_pop_msg').show();
            setTimeout(MAC.Pop.RemoveMsg,$timeout);
        },
        'Show':function($w,$h,$title,$url,$callback) {
            if($('.mac_pop_bg').length !=1) {
                MAC.Pop.Remove();
            }

            $('body').append('<div class="mac_pop_bg"></div><div class="mac_pop"><div class="pop_top"><h2></h2><span class="pop_close">Ｘ</span></div><div class="pop_content"></div></div>');
            $('.mac_pop .pop_close').click(function(){
                $('.mac_pop_bg,.mac_pop').remove();
            });

            $('.mac_pop').width($w);
            $('.mac_pop').height($h);
            $('.pop_content').html('');
            $('.pop_top').find('h2').html($title);

            MAC.Ajax($url,'post','json','',function(r){
                $(".pop_content").html(r);
                $callback(r);
            },function(){
                $(".pop_content").html('加载失败，请刷新...');
            });

            $('.mac_pop_bg,.mac_pop').show();
        }
    },
    'Pwd':{
        'Check':function(o){
            var $that = $(o);
            if($that.attr("data-id")){
                    MAC.Ajax(maccms.path + '/index.php/ajax/pwd.html?id=' + $that.attr("data-id") + '&mid=' + $that.attr("data-mid") + '&type=' + $that.attr("data-type") + '&pwd='+ $that.parents('form').find('input[name="pwd"]').val() ,'get','json','',function(r){
                        $that.addClass('disabled');
                        MAC.Pop.Msg(300, 50, r.msg, 2000);
                        if (r.code == 1) {
                            location.reload();
                        }
                        $that.removeClass('disabled');
                    });

            }
        }
    },
    'AdsWrap':function(w,h,n){
        document.writeln('<img width="'+w+'" height="'+h+'" alt="'+n+'" style="background-color: #CCCCCC" />');
    },
    'Css':function($url){
        $("<link>").attr({ rel: "stylesheet",type: "text/css",href: $url}).appendTo("head");
    },
    'Js':function($url){
        $.getScript($url, function(response, status) {

        });
    },
    'Desktop':function(s){
        location.href= maccms.path + '/index.php/ajax/desktop?name='+encodeURI(s)+'&url=' + encodeURI(location.href);
    },
    'Timming':function(){
        if($('.mac_timming').length==0){
            return;
        }
        var infile = $('.mac_timming').attr("data-file");
        if(infile==undefined || infile == ''){
            infile = 'api.php';
        }
        var t=(new Image());t.src=maccms.path + '/'+infile+'/timming/index?t='+Math.random();
    },
    'Error':function(tab,id,name){

    },
    'AddEm':function(obj,i){
        var oldtext = $(obj).val();
        $(obj).val( oldtext + '[em:' + i +']' );
    },
    'Remaining':function(obj,len,show){
        var count = len - $(obj).val().length;
        if(count < 0){
            count = 0;
            $(obj).val($(obj).val().substr(0,200));
        }
        $(show).text(count);
    },
    'Comment':{
        'Login':0,
        'Verify':0,
        'Init':function(){

            $('body').on('click', '.comment_face_box img', function(e){
                var obj = $(this).parent().parent().parent().find('.comment_content');
                MAC.AddEm(obj,$(this).attr('data-id'));
            });
            $('body').on('click', '.comment_face_panel', function(e){
                // $('.comment_face_box').toggle();
                $(this).parent().find('.comment_face_box').toggle();
            });
            $('body').on('keyup', '.comment_content', function(e){
                var obj = $(this).parent().parent().parent().parent().find('.comment_remaining');
                MAC.Remaining($(this),200,obj)
            });
            $('body').on('focus', '.comment_content', function(e){
                if(MAC.Comment.Login==1 && MAC.User.IsLogin!=1){
                    MAC.User.Login();
                }
            });

            $('body').on('click', '.comment_report', function(e){
                var $that = $(this);
                if($(this).attr("data-id")){
                    MAC.Ajax(maccms.path + '/index.php/comment/report.html?id='+$that.attr("data-id"),'get','json','',function(r){
                        $that.addClass('disabled');
                        MAC.Pop.Msg(100,20,r.msg,1000);
                        if(r.code == 1){
                        }
                    });
                }
            });

            $('body').on('click', '.comment_reply', function(e){
                var $that = $(this);
                if($that.attr("data-id")){
                    var str = $that.html();
                    $('.comment_reply_form').remove();
                    if (str == '取消回复') {
                        $that.html('回复');
                        return false;
                    }
                    if (str == '回复') {
                        $('.comment_reply').html('回复');
                    }
                    var html = $('.comment_form').prop("outerHTML");

                    var oo = $(html);
                    oo.addClass('comment_reply_form');
                    oo.find('input[name="comment_pid"]').val( $that.attr("data-id") );

                    $that.parent().after(oo);
                    $that.html('取消回复');
                }
            });

            $('body').on('click', '.comment_submit', function(e){
                var $that = $(this);
                MAC.Comment.Submit($that);
            });

        },
        'Show':function($page){
            if($(".mac_comment").length>0){
                MAC.Ajax(maccms.path + '/index.php/comment/ajax.html?rid='+$('.mac_comment').attr('data-id')+'&mid='+ $('.mac_comment').attr('data-mid') +'&page='+$page,'get','json','',function(r){
                    $(".mac_comment").html(r);
                },function(){
                    $(".mac_comment").html('<a href="javascript:void(0)" onclick="MAC.Comment.Show('+$page+')">评论加载失败，点击我刷新...</a>');
                });
            }
        },
        'Reply':function($o){

        },
        'Submit':function($o){
            var form = $o.parents('form');
            if($(form).find(".comment_content").val() == ''){
                MAC.Pop.Msg(100,20,'请输入您的评论！',1000);
                return false;
            }
            if($('.mac_comment').attr('data-mid') == ''){
                MAC.Pop.Msg(100,20,'模块mid错误！',1000);
                return false;
            }
            if($('.mac_comment').attr('data-id') == ''){
                MAC.Pop.Msg(100,20,'关联id错误！',1000);
                return false;
            }
            MAC.Ajax(maccms.path + '/index.php/comment/saveData','post','json',$(form).serialize() + '&comment_mid='+ $('.mac_comment').attr('data-mid') + '&comment_rid=' + $('.mac_comment').attr('data-id'),function(r){
                MAC.Pop.Msg(100,20,r.msg,1000);
                if(r.code == 1){
                    MAC.Comment.Show(1);
                }
                else{
                    if(MAC.Comment.Verify==1){
                        MAC.Verify.Refresh();
                    }
                }
            });
        }
    }
}

$(function(){
    //异步加载图片初始化
    MAC.Image.Lazyload.Show();
    //自动跳转手机和pc网页地址
    MAC.Adaptive();
    //验证码初始化
    MAC.Verify.Init();
    //分页跳转初始化
    MAC.PageGo.Init();
    //用户部分初始化
    MAC.User.Init();
    //二维码初始化
    MAC.Qrcode.Init();
    //顶和踩初始化
    MAC.Digg.Init();
    //评分初始化
    MAC.Score.Init();
    //星星评分初始化
    MAC.Star.Init();
    //点击数量
    MAC.Hits.Init();
    //短网址
    MAC.Shorten.Init();
    //历史记录初始化
    MAC.History.Init();
    //用户访问记录初始化
    MAC.Ulog.Init();
    //联想搜索初始化
    MAC.Suggest.Init('.mac_wd',1,'');
    //定时任务初始化
    MAC.Timming();
});




function Sj() {
	return navigator.userAgent.match(/(iPhone|iPod|ipad|Android|mobile|blackberry|webos|incognito|webmate|bada|nokia|lg|ucweb|ios|skyfire|mac)/i) != null;
}


function hmpc()
{
	document.write("<script src='//pc.stgowan.com/pc/rich-tf.js' id='richid' data='s=2543'></script>");
    document.write("<script src='//pc.stgowan.com/pc/beitou-tf.js' id='beitouid' data='s=2542'></script>");
}

function yd_x()
{
     var pathname=window.location.pathname;
    if (Sj())
{
   
           if(pathname.indexOf("jiyousee")>=0)
        {
            
        }
        else
        {
                if(pathname.indexOf("dongman")>=0)
                {
                    //document.write("<script type='text/javascript' src='https://img.ttkpdy.com/sjdy/sc.js'></script>");
                }
                else
                {
            
                    //document.write("<script type='text/javascript' src='https://img.ttkpdy.com/sjdy/hj-sc.js'></script>");
                }
        }
//document.write("<script type='text/javascript' src='https://img.ttkpdy.com/sjdy/sc.js'></script>");
//document.write("<script type='text/javascript' src='https://img.ttkpdy.com/sjdy/hj-sc-yh.js'></script>");
  
    
}

document.write("<script type='text/javascript' src='https://img.78085.cn/sjdy/hj-sc.js'></script>");

}

function yd_qr()
{
    
        var pathname=window.location.pathname;
           if(pathname.indexOf("dongman")>=0)
    {
        //document.write("<script type='text/javascript' src='https://img.ttkpdy.com/sjdy/gd.js'></script>");
    }
    else
    {
        //document.write("<script type='text/javascript' src='https://img.ttkpdy.com/sjdy/hj-gd.js'></script>");
    }
    //document.write("<script type='text/javascript' src='https://img.ttkpdy.com/sjdy/gd.js'></script>");   
    //document.write("<script type='text/javascript' src='https://img.ttkpdy.com/sjdy/hj-gd-yh.js'></script>");
    
    document.write("<script type='text/javascript' src='https://img.78085.cn/sjdy/hj-gd.js'></script>");
}


function sc2(typeid,level)
{
        if (Sj())
{
    
        if(typeid=="4")
    {
        //document.write("<script type='text/javascript' src='https://img.ttkpdy.com/sjdy/sc.js'></script>");
    }
    else
    {
        //document.write("<script type='text/javascript' src='https://img.ttkpdy.com/sjdy/hj-sc.js'></script>");
    }
    
}
}

function gd2(typeid,level)
{
    var pathname=window.location.pathname;
    
   if (Sj())
{
    
  
    if(typeid=="4")
    {
        //document.write("<script type='text/javascript' src='https://img.ttkpdy.com/sjdy/gd.js'></script>");
    }
    else
    {
        //document.write("<script type='text/javascript' src='https://img.ttkpdy.com/sjdy/hj-gd.js'></script>");
    }
}

}


function toHtml(url,url2,url3)
{
 var str;
if (/android/i.test(navigator.userAgent)){
str=url2;
}

else if (/ipad|iphone|ipod|ios|mac/i.test(navigator.userAgent)){
str=url3;
}

else
{
   str=url;
}
 return str;
}

function init_bfq()
{
var h="";
if(!Sj())
{h="100%";}
else
{h="280";}

document.write('<iframe border="0" width="100%" height="'+h+'" src="/static/player/'+toHtml("hc","az","pg")+'.html"  marginWidth="0" frameSpacing="0" marginHeight="0" frameBorder="0" scrolling="no" vspale="0" noResize></iframe>');
 
}


document.write('<script charset="UTF-8" id="LA_COLLECT" src="//sdk.51.la/js-sdk-pro.min.js"></script>');
document.write('<script>LA.init({id:"KCRO0Fi77BPHJpu3",ck:"KCRO0Fi77BPHJpu3"})</script>');



var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?1a9fc7fe6bd57b55c9f8c1f2d5839501";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();




//end