;
(function() {
  var
    prepareData = function(data) {
      if (!data) {
        return;
      }
      return Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join("&");
    },
    setCallback = function(fn, request) {
      request.onreadystatechange = (function() {
        if (request.readyState === 4 && request.status === 200) {
          fn(request.responseText);
        }
      }).bind(request);
    };

  post = function(url, callback, data) {
    this.connect("POST", url, callback, data);
  }
  
  get = function(url, callback, data) {
    this.connect("GET", url, callback, data);
  }

  connect = function(style, url, callback, data) {
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
})();
