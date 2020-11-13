import express from 'express'
// Development settings *
import devBundle from './devBundle'

import bodyParser from 'body-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import Template from '../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

// Serving static files **
import path from 'path'
const CURRENT_WORKING_DIR = process.cwd()

const app = express()
// *
devBundle.compile(app)

    /* configure express */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
//** 
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))


app.get('/', (req,res) => {
    res.status(200).send(Template())
})

app.use('/', userRoutes)

app.use('/', authRoutes)

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError'){
        res.status(401).json({
            "error": `${err.name}: ${err.message}`
        })
    } else if (err){
        res.status(400).json({
            "error": `${err.name}: ${err.message}`})
            console.log(err)
        }
})

export default app