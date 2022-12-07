let _global

module.exports = {

    instance(){
        const winstonWrapper = require('winston-wrapper'),
            settings = require('./settings')

        if (!_global)
            _global = winstonWrapper.new(settings.logDirectory, settings.logLevel).log

        return _global
    }

}