import {Router} from 'express'
import { AuthMiddleware } from '../middlewares'
import { FileUploadController } from './controller'
import { FileUpladService } from '../services/file-upload.service'

export class FileUploadRoutes {
    static get routes(): Router {
        const router = Router()

        const fileUploadService = new FileUpladService()

        const controller = new FileUploadController(fileUploadService)


        // router.get('/', )
        router.post('/single/:type',  controller.uploadFile)
        router.post('/multiple/:type',  controller.uploadMultipleFile)

        
        return router
    }
}