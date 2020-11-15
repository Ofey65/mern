import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'Title is required'
    },
    area: {
        type: String,
        trim: true
    },
    author: [
        {
            name: {
                type: String,
                trim: true,
                required: 'Author is required'
            },
            _id: {
                type: String,
                required: 'Author ID must be valid'
            }
        }
    ],
    abstract: {
        type: String,
        default: 'Link to the abstract'
    },
    language: {
        type: String,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    publishDate: {
        recieved: {
            type: Date,
            default: Date.now
        },
        revised: {
            type: Date,
            default: Date.now
        },
        accepted: {
            type: Date,
            default: Date.now
        }
    }
})

export default mongoose.model('Article', ArticleSchema)
