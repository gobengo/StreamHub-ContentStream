require [
    'streamhub-sdk'
    'streamhub-contentstream'
], (sdk, SHContentStream) ->

    opts =
        network: 'labs-t402.fyre.co'
        siteId: '303827'
        articleId: 'sxsw_photos_0'
        environment: 't402.livefyre.com'


    sdk.createLivefyreStreams opts, (err, stream) ->

        contentStream = new SHContentStream(stream.main)
        
        contentStream.on 'readable', () ->
            renderContent contentStream.read()

        contentStream.start()


    $widget = $('#example')

    renderContent = (content) ->
        dataHtml = "<div>" + content.html() + "</div>"
        $newEl = $(dataHtml)
        $newEl.prependTo $widget