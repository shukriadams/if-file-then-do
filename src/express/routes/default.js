const handlebarsLoader = require('madscience-handlebarsLoader')

module.exports = express =>{

    /**
     *
    */
    express.get('/', async (req, res) => {
        try {
            // display : 
            // watched paths
            // failed settings
            // warn if any errors
            // cpu use
            // log of last 10 detected changes
            // path to logs
            const view = await handlebarsLoader.getPage('default')
            res.send(view())
        } catch(ex){
            console.log(ex)
            res.status(500)
            res.json({ error : ex.toString() })
        }
    })
}