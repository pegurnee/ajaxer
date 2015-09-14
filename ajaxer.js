var AjaxHandler = (function() {

  function AjaxHandler(url = "", callBackFunction = "") {
    this.request = new XMLHttpRequest();
    this.destination = url;
    this.callBackFunction = callBackFunction;
  }

  AjaxHandler.prototype.url = function(theUrl) {
    if (theUrl === undefined) {
      return this.destination;
    } else {
      this.destination = theUrl;
    }
  }

  AjaxHandler.prototype.callback = function(fn) {
    this.request.onreadystatechange = function() {
      if (this.request.readyState === 4 && this.request.status === 200) {
        fn(this.request.responseText);
      }
    }
  }

  AjaxHandler.prototype.post = function(data) {
    this.connect("POST", data, this.destination);
  }

  AjaxHandler.prototype.get = function(data) {
    this.connect("GET", data, this.destination);
  }

  AjaxHandler.prototype.connect = function(style, data, destination) {
    var sendData = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join("&");
    if (destination === undefined) {
      destination = this.destination;
    }
    if (style === "GET") {
      var urlParams = "?" + sendData;
      destination += urlParams;
      sendData = "";
    } else {
      this.request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      this.request.setRequestHeader("Content-length", sendData.length);
      this.request.setRequestHeader("Connection", "close");
    }
    this.request.open(style, destination, true);
    this.send(sendData);
  }

  return AjaxHandler;
})();
