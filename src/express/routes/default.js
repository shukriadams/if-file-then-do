module.exports = (express)=>{

    /**
     *
    */
    express.get('/', async function(req, res){
        try {
            // display : 
            // watched paths
            // failed settings
            // warn if any errors
            // cpu use
            // log of last 10 detected changes
            // path to logs

            res.send('it works')
        } catch(ex){
            console.log(ex)
            res.status(500)
            res.json({ error : ex.toString() })
        }
    })
}