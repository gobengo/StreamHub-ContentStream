define (require, exports, module) ->

    SHContent = require('content/streamhub.content')
    $ = require('jquery')
    Stream = require('streamhub-sdk/stream')

    ###
    StreamHubContentStream
    Read raw data from a LivefyreStream and convert it
        into a Stream of Content
    ###
    class SHContentStream extends Stream
        constructor: (livefyreStream) ->
            if not livefyreStream
                throw "SHContentStream must be constructed with a livefyreStream"
            Stream.call(this)
            @livefyreStream = livefyreStream
            return this

        ###
        Required by Stream Base
        Start the LivefyreStream, read any data when it's
            readable, and @_push it to emit our own readable event
        ###
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