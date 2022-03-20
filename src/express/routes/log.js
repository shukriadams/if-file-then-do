module.exports = (express)=>{

    /**
     *
    */
    express.get('/log/:watch', async function(req, res){
        try {

            res.send('log')
        } catch(ex){
            console.log(ex)
            res.status(500)
            res.json({ error : ex.toString() })
        }
    })
}