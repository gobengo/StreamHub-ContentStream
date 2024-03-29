// Generated by CoffeeScript 1.6.2
(function() {
  require(['streamhub-sdk', 'streamhub-contentstream'], function(sdk, SHContentStream) {
    var $widget, opts, renderContent;
    opts = {
      network: 'labs-t402.fyre.co',
      siteId: '303827',
      articleId: 'sxsw_photos_0',
      environment: 't402.livefyre.com'
    };
    sdk.createLivefyreStreams(opts, function(err, stream) {
      var contentStream;
      contentStream = new SHContentStream(stream.main);
      contentStream.on('readable', function() {
        return renderContent(contentStream.read());
      });
      return contentStream.start();
    });
    $widget = $('#example');
    return renderContent = function(content) {
      var $newEl, dataHtml;
      dataHtml = "<div>" + content.html() + "</div>";
      $newEl = $(dataHtml);
      return $newEl.prependTo($widget);
    };
  });

}).call(this);
