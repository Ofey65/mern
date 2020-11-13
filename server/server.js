import config from './../config/config'
import app from './express'
import moongose from 'mongoose'

moongose.Promise = global.Promise

moongose.connect(config.mongoUri,
     {useCreateIndex:true, useUnifiedTopology:true, useNewUrlParser:true})

moongose.connection.on('error', ()=> {
    throw new Error(`unable to connect to database: ${config.mongoUri}`)
}) 

app.listen(config.port, (err) => {
    if (err){
        console.log(err);
    }
    console.log(`Server started on port: ${config.port}`);
})