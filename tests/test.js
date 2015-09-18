var require = require || null;

if (require) {
  XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

  var chai = require("chai");
  var sinon = require("sinon");
  var ajaxer = require("../lib/ajaxer.js");
}

chai.should();

describe('ajaxer', function() {
  var
    xhr,
    requests;

  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();

    this.requests = [];
    this.xhr.onCreate = function(xhr) {
      this.requests.push(xhr);
    }.bind(this);
  });

  afterEach(function() {
    this.xhr.restore();
  });

  it('will probably be alright', function() {
    'everything'.should.be.ok;
  });

  it('should not send anything without connect method declared', function(done) {
    var data = "hello";

    ajaxer.connect('www.ajaxisabummer.com', function(response) {
      fail();
    });

    done();

    this.requests.should.be.empty;
  });

  it('shoud make GET destination pro', function(done) {
    var data = {
      foo: 'bar'
    };

    ajaxer.get('www.fp.com', data, function(err, result) {
      done();
    });

    this.requests[0].url.should.be.equal('www.fp.com?foo=bar');
    done();
  });

});
