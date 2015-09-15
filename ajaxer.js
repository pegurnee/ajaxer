;
(function() {
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

  var ajax = {
    post: function(url, data, callback) {
      ajax.connect("POST", url, callback, data);
    },

    get: function(url, data, callback) {
      ajax.connect("GET", url, callback, data);
    },

    connect: function(style, url, data, callback) {
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
  }

  if (!window.post) {
    window.post = ajax.post;
  }
  if (!window.get) {
    window.get = ajax.get;
  }
  if (!window.connect) {
    window.connect = ajax.connect;
  }
  window.ajax = ajax;
})();
