var json2url = function (json) {
  json.t = Math.random();
  var arr = [];
  for (var name in json) {
    arr.push(name + '=' + json[name]);
  }
  return arr.join('&');
};

var install = function (Vue, options) {

  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = {};

  // 2. 添加全局资源
  Vue.directive('my-directive', {});

  // 3. 添加实例方法
  Vue.prototype.$ajax = function (json) {
    json = json || {};
    if (!json.url) {
      console.log('url Not Null');
      return;
    }

    json.data = json.data || {};
    json.type = json.type || 'get';

    // jsonp
    if (json.dataType === 'jsonp') {
      json.jsonp = json.jsonp || 'callback';

      var fnName = 'jsonp' + Math.random();
      fnName = fnName.replace('.', '');

      json.data[json.jsonp] = fnName;

      var oS = document.createElement('script');
      oS.src = json.url + '?' + json2url(json.data);
      var oHead = document.getElementsByTagName('head')[0];
      oHead.appendChild(oS);

      global[fnName] = function (data) {
        json.success && json.success(data);
        oHead.removeChild(oS);
      };
      return;
    }

    // Ajax
    var oAjax;
    if (global.XMLHttpRequest) {
      oAjax = new XMLHttpRequest();
    } else {
      oAjax = new ActiveXObject('Microsoft.XMLHTTP');
    }

    switch (json.type.toLowerCase()) {
      case 'get':
        oAjax.open('GET', json.url + '?' + json2url(json.data), true);
        oAjax.send();
        break;
      case 'post':
        oAjax.open('POST', json.url, true);
        oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        oAjax.send(json2url(json.data));
        break;
    }

    // fnLoading()
    json.fnLoading && json.fnLoading();

    oAjax.onreadystatechange = function () {
      if (oAjax.readyState === 4) {
        json.complete && json.complete();
        if (oAjax.status >= 200 && oAjax.status < 300 || oAjax.status === 304) {
          if (json.dataType === 'xml') {
            json.success && json.success(oAjax.responseXML);
          } else {
            json.success && json.success(oAjax.responseText);
          }
        } else {
          json.error && json.error(oAjax.status);
        }
      }
    };
  }
};

if (typeof exports == "object") {
  module.exports = install
} else if (typeof define == "function" && define.amd) {
  define([], function () {
    return install
  })
} else if (window.Vue) {
  Vue.use(install)
}
