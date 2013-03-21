define (require, exports, module) ->

    SHContent = require('content/streamhub.content')
    $ = require('jquery')
    Stream = require('streamhub-sdk/stream')


    class SHContentStream extends Stream
        constructor: (livefyreStream) ->
            if not livefyreStream
                throw "SHContentStream must be constructed with a livefyreStream"
            Stream.call(this)
            @livefyreStream = livefyreStream
            return this

        _read: () ->
            @livefyreStream.on 'error', (err) =>
                @emit 'error', err
                @_endRead()

            @livefyreStream.on 'readable', () =>
                data = @livefyreStream.read()
                try
                    @_push new SHContent data
                catch error
                    return

            @livefyreStream.start()


    exports = SHContentStream