function promiseAjax(obj){
		var pr = new Promise(function(success,failed){
			var xhr = getXHR();
			obj.url += "?rand=" + new Date().getTime();
			if(obj.method.toLowerCase() == "get") {
				if(obj.data) {
					xhr.open(obj.method, obj.url + "&" + parameterSerialize(obj.data));
				} else {
					xhr.open(obj.method, obj.url);
				}
				xhr.send(null);
			} else if(obj.method.toLowerCase() == "post") {
				xhr.open(obj.method, obj.url);
				//设置请求头(只有数据传递，必须设置这个请求头)
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				if(obj.data) {
					xhr.send(parameterSerialize(obj.data));
				} else {
					xhr.send(null);
				}
			}
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4) {
					if(xhr.status == 200) {
						//obj.success(xhr.responseText);
						success(xhr.responseText);
					} else {
						/*if(obj.error) {
							obj.error("响应出错了，错误提示：" + xhr.status + ",错误原因：" + xhr.statusText);
						}*/
						failed("响应出错了，错误提示：" + xhr.status + ",错误原因：" + xhr.statusText);
					}
	
				}
			}
		});
		
		return pr;
	}
	
	

	
	//参数序列化
	function parameterSerialize(obj) {
		var arr = [];
		for(var key in obj) {
			arr.push(key + "=" + encodeURI(obj[key]));
		}
		return arr.join("&");
	}

	function getXHR() {
		var xhr = null;
		if(window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return xhr;
	}