const handlebarsLoader = require('madscience-handlebarsLoader')


module.exports = express =>{
    async function routeHandler(req, res){
        const settings = require('./../../lib/settings')

        try {
            // display : 
            // watched paths
            // failed settings
            // warn if any errors
            // cpu use
            // log of last 10 detected changes
            // path to logs
            const view = await handlebarsLoader.getPage('default')
            res.send(view({
                layout : {
                    protocol : settings.protocol,
                    port: settings.port,
                    host: settings.host
                }
            }))
        } catch(ex){
            console.log(ex)
            res.status(500)
            res.json({ error : ex.toString() })
        }        
    }

    /**
     *
    */
    express.get('/', async (req, res) => {
        await routeHandler(req, res)
    })

    /**
     * This is a catch-all route that forces all react routes to load on default express route. This route must be bound last, 
     * or it will overwrite all other routes. 
     */    
     express.get(/^[^.]+$/, async function (req, res) {
        await routeHandler(req, res)
    })
}