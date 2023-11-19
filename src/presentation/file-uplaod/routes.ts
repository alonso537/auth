import {Router} from 'express'
import { AuthMiddleware } from '../middlewares'
import { FileUploadController } from './controller'
import { FileUpladService } from '../services/file-upload.service'
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware'
import { TypeMiddleware } from '../middlewares/type.middleware'

export class FileUploadRoutes {
    static get routes(): Router {
        const router = Router()

        const fileUploadService = new FileUpladService()

        const controller = new FileUploadController(fileUploadService)

        router.use([FileUploadMiddleware.containFiles, 
            TypeMiddleware.validType(['users', 'products', 'categories']),
        ])

        // router.get('/', )
        router.post('/single/:type',  controller.uploadFile)
        router.post('/multiple/:type',  controller.uploadMultipleFile)

        
        return router
    }
}