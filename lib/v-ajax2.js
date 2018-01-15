/**
 * v-ajax v1.0.4
 * (c) 2018 saturn
 * @license MIT
 */

(function (global, factory) {

  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) : (global.VueAjax = factory());

}(this, (function () {
  'use strict';

  // VueAjax
  var VueAjax = {};

  var json2url = function (json) {
    json.t = Math.random();
    var arr = [];
    for (var name in json) {
      arr.push(name + '=' + json[name]);
    }
    return arr.join('&');
  };

  // Install
  function install(Vue) {

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
  }

  VueAjax.install = install;
  VueAjax.version = '1.0.3';

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueAjax);
  }

  return VueAjax;

})));
