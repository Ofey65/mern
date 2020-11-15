import express from 'express'
import artCtrl from '../controllers/art.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/articles')
    .get(artCtrl.list)
    .post(authCtrl.requireSignin,artCtrl.create)

router.route('/api/articles/:artId')
    .get(
        artCtrl.read
    )
    .put(
        authCtrl.requireSignin,authCtrl.hasAuthorization,artCtrl.update
    )
    .delete(
        authCtrl.requireSignin,authCtrl.hasAuthorization,artCtrl.remove
    )

router.param('artId', artCtrl.artByID)

export default router