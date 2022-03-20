let yaml = require('js-yaml'),
    fs = require('fs-extra'),
    settings = null

if (fs.existsSync('./config.yml')){
    try {
        let settingsYML = fs.readFileSync('./config.yml', 'utf8')
        settings = yaml.load(settingsYML)
    } catch (e) {
        console.log('Error reading settings.yml', e)
        throw e
    }
} else {
    // warn no config
}

settings = Object.assign({
    port: 3000,
    watch : [ ]
}, settings)

module.exports = settings