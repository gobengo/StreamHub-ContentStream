// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require, exports, module) {
    var $, SHContent, SHContentStream, Stream;
    SHContent = require('content/streamhub.content');
    $ = require('jquery');
    Stream = require('streamhub-sdk/stream');
    SHContentStream = (function(_super) {
      __extends(SHContentStream, _super);

      function SHContentStream(livefyreStream) {
        if (!livefyreStream) {
          throw "SHContentStream must be constructed with a livefyreStream";
        }
        Stream.call(this);
        this.livefyreStream = livefyreStream;
        return this;
      }

      SHContentStream.prototype._read = function() {
        var _this = this;
        this.livefyreStream.on('error', function(err) {
          _this.emit('error', err);
          return _this._endRead();
        });
        this.livefyreStream.on('readable', function() {
          var data, error;
          data = _this.livefyreStream.read();
          try {
            return _this._push(new SHContent(data));
          } catch (_error) {
            error = _error;
          }
        });
        return this.livefyreStream.start();
      };

      return SHContentStream;

    })(Stream);
    return exports = SHContentStream;
  });

}).call(this);
