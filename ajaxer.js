;
(function(root, factory) {
  if (typeof define === 'function') {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.ajaxer = factory(root);
  }
}(this, function() {
  var
    prepareData = function(data) {
      if (typeof data !== "object") {
        return;
      }
      return Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join("&");
    },
    setCallback = function(fn, request) {
      if (typeof fn !== "function") {
        return;
      }
      request.onreadystatechange = (function() {
        if (request.readyState === 4 && request.status === 200) {
          fn(request.responseText);
        }
      }).bind(request);
    };

  return {
    post: function(url, data, callback) {
      ajax.connect("POST", url, callback, data);
    },

    get: function(url, data, callback) {
      ajax.connect("GET", url, callback, data);
    },

    connect: function(style, url, data, callback) {
      if (style !== 'POST' || style !== 'GET') {
        return;
      }
      if (typeof data === "function" && typeof callback === "undefined") {
        callback = data;
        data = null;
      }

      var request = new XMLHttpRequest(),
        sendData = prepareData(data);

      if (style === "GET") {
        var urlParams = "?" + sendData;
        url += urlParams;
        sendData = "";
      }

      setCallback(callback, request);

      request.open(style, url, true);

      if (style === "POST") {
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.setRequestHeader("Content-length", sendData.length);
        request.setRequestHeader("Connection", "close");
      }
      request.send(sendData);
    }
  };
}));
