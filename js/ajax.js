	function ajax(obj){
		var xhr = getXHR();
		obj.url += "?rand="+new Date().getTime();
		if(obj.method.toLowerCase() == "get"){
			if(obj.data){
				xhr.open(obj.method,obj.url + "&" +parameterSerialize(obj.data));
			}else{
				xhr.open(obj.method,obj.url);
			}
			xhr.send(null);
		}else if(obj.method.toLowerCase() == "post"){
			xhr.open(obj.method,obj.url);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			if(obj.data){
				xhr.send(parameterSerialize(obj.data));
			}else{
				xhr.send(null);
			}
		}
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					obj.success(xhr.responseText);
				}else{
					if(obj.erro){
						obj.erro("响应出错，状态为："+xhr.status + "出错原因："+xhr.statusText);
					}
				}
			}
		}
	}



     function getXHR(){
     	var xhr = null;
     	if(window.XMLHttpRequest){
     		xhr = new XMLHttpRequest();
     	}else{
     		xhr = new ActiveXObject("Microsoft.XMLHttp");
     	}
     	return xhr;
     }
     
     function parameterSerialize(obj){
     	var arr = [];
     	for(var key in obj){
     		arr.push(key + "=" +encodeURI(obj[key]));
     	}
     	return arr.join("&")
     }
