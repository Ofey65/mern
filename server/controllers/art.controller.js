import Article from '../models/article.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'

const create = async (req,res) => {
    const article = new Article(req.body)

    try {
        await article.save()
        return res.status(200).json({
            message: "Article successfully added!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req, res) => {
    try {
        let articles = await Article.find()
        res.json(articles)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const artByID = async (req, res, next, id) => {
    try {
        let article  = await Article.findById(id)
        if(!article){
            return res.status(400).json({
                error: "Article not found"
            })
        }
        req.profile = article.author[0]
        req.data = article
        next()
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve article"
        })
    }
}

const read = (req, res) => {
    return res.json(req.data)
}

const update = async(req,res) => {
    try {
        let article = req.data
        article = extend(article, req.body)
        user.updated = Date.now()
        await article.save()
        res.json(article)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async(req, res) => {
    try {
        let article = req.data
        let deletedArticle = await article.remove()
        res.json(`Article deleted: ${deletedArticle}`)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default {
    create,
    list,
    artByID,
    read,
    update,
    remove
}