var AjaxHandler = (function () {

  function AjaxHandler() {
    this.request = new XMLHttpRequest();
    this.outgoingData = [];
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
    connect("POST", this.request);
  }

  AjaxHandler.prototype.get() {
    connect("GET", this.request);
  }

  function connect(theRequest) {

  }

  return AjaxHandler;
})();
