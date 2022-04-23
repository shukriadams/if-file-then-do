
module.exports = express =>{

    /**
     * Gets a list of x latest events across all job
     */
    express.get('/events', async (req, res) => {
        
        try {
            const settings = require(_$+'lib/settings'),
            fsUtils = require('madscience-fsUtils'),
            path = require('path'),
            data = {}

            for (const watch of settings.watch){
                try {
                    let watchPath = path.join(settings.dataDirectory, watch.__safename),
                        files = fsUtils.readFilesUnderDirSync(watchPath)

                    files = files
                        .sort()
                        .slice(0, 10)

                    data[watch.__safename] = {
                        name : watch.name,
                        files
                    }

                } catch (ex) {
                    console.log(ex)
                }
            }

            res.json(data)

        } catch(ex){
            console.log(ex)
            res.status(500)
            res.json({ error : ex.toString() })
        }
    })
}