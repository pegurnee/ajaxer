var AjaxHandler = (function () {

  function AjaxHandler() {
    this.request = new XMLHttpRequest();
    this.outgoingData = {};
  }

  AjaxHandler.prototype.setURL(theUrl) {
    this.destination = theUrl;
  }

  AjaxHandler.prototype.addParam(newParam) {

  }

  AjaxHandler.prototype.setCallback(fn) {
    this.request.onreadystatechange = fn;
  }

  AjaxHandler.prototype.post() {
    connect("POST", this);
  }

  AjaxHandler.prototype.get() {
    connect("GET", this);
  }

  function connect(style, ajaxHandler) {
    if (style === "GET") {
      
    }
    ajaxHandler.request.open(style, ajaxHandler.destination, true);

  }

  return AjaxHandler;
})();
