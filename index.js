function json2url(json){
	json.t=Math.random();
	var arr=[];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}
function ajax(json){
	json=json || {};
	if(!json.url)return;
	json.data=json.data || {};
	json.type=json.type || 'get';

	if(global.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}

	switch(json.type.toLowerCase()){
		case 'get':
		oAjax.open('GET',json.url+'?'+json2url(json.data),true);
		oAjax.send();
		break;
		case 'post':
		oAjax.open('POST',json.url,true);
		oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		oAjax.send(json2url(json.data));
		break;
	}

	json.fnLoading && json.fnLoading();

	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){

			json.complete && json.complete();

			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
				if(json.dataType=='xml'){
					json.success && json.success(oAjax.responseXML);
				}else{
					json.success && json.success(oAjax.responseText);
				}
			}else{
				json.error && json.error(oAjax.status);
			}
		}
	};

	//jsonp
	if(json.dataType==='jsonp'){
		json.jsonp = json.jsonp || 'callback';

		var fnName='jsonp'+Math.random();
		fnName=fnName.replace('.','');

		json.data[json.jsonp]=fnName;

		var oS=document.createElement('script');
		oS.src=json.url+'?'+json2url(json.data);
		var oHead=document.getElementsByTagName('head')[0];
		oHead.appendChild(oS);

		global[fnName]=function(data){
			json.success && json.success(data);

			oHead.removeChild(oS);
		};
	}
}

export default{
	install(Vue){
		Vue.prototype.$ajax = ajax;
	}
}