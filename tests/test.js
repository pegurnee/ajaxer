chai.should();

describe('ajaxer', function() {
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

  it('should not send anything without connect method', function(done) {
    var data = "hello";

    ajaxer.connect('www.ajaxisabummer.com', function(response) {
      fail();
    });

    done();

    this.requests.should.be.empty;
  });

  it('GET destination should be pro', function(done) {
    var data = {
      foo: 'bar'
    };

    ajaxer.get('www.fp.com', data, function(err, result) {
      done();
    });

    this.requests[0].open.url.should.be('www.fp.com?foo=bar');
  });

});
