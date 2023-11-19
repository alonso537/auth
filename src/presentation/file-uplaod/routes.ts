import {Router} from 'express'
import { AuthMiddleware } from '../middlewares'
import { FileUploadController } from './controller'

export class FileUploadRoutes {
    static get routes(): Router {
        const router = Router()

        const controller = new FileUploadController()


        // router.get('/', )
        router.post('/single/:type',  controller.uploadFile)
        router.post('/multiple/:type',  controller.uploadMultipleFile)

        
        return router
    }
}