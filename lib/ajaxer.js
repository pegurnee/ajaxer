/*jshint -W032 */
;
/*jshint +W032 */
/* istanbul ignore next */
(function(root, factory) {
  if (typeof define === 'function') {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.ajaxer = factory();
  }
}(this, function() {
  var
    prepareData = function(data) {
      if (!data || typeof data !== "object") {
        return;
      }
      return Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join("&");
    },
    setCallback = function(fn, request) {
      if (!isFunctionArray(fn)) {
        return;
      }
      var onYes,
          onBad;
      if (typeof fn == "function") {
        onYes = fn;
        onBad = null;
      } else {
        onYes = fn.onSuccess;
        onBad = fn.onFail;
      }
      request.onreadystatechange = (function() {
        if (request.readyState === 4) {
          if (request.status === 200) {
            onYes(request.responseText);
          } else {
            onBad(request.responseText);
          }
        }
      }).bind(request);
    },
    isFunctionArray = function(fnArray) {
      if (typeof fnArray == "function") {
        return true;
      } else if (typeof nArray != "object") {
        return false;
      } else {
        for (var x of fnArray) {
          if (typeof x != "function") {
            return false;
          }
        }
        return true;
      }
    };

  return {
    post: function(url, data, callback) {
      this.connect("POST", url, data, callback);
    },

    get: function(url, data, callback) {
      this.connect("GET", url, data, callback);
    },

    connect: function(style, url, data, callback) {
      if (style !== 'POST' && style !== 'GET') {
        return;
      }
      if (isFunctionArray(data) && typeof callback === "undefined") {
        callback = data;
        data = null;
      }

      var request = new XMLHttpRequest(),
        sendData = prepareData(data);

      if (style === "GET" && sendData) {
        var urlParams = "?" + sendData;
        url += urlParams;
        sendData = "";
      }

      setCallback(callback, request);

      request.open(style, url, true);

      if (style === "POST") {
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      }
      request.send(sendData);
    }
  };
}));
