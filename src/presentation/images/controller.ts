import { Request, Response } from "express";
import fs from "fs";
import path from "path";


export class ImageController {
    constructor(){}

    getImage = async (req: Request, res:Response) => {
        const {type = '', img = ''} = req.params;

        const pathImg = path.resolve(__dirname, `../../../uploads/${type}/${img}`);

        if(!fs.existsSync(pathImg)) {
            return res.status(404).send('Image not found')
        }

        res.sendFile(pathImg)
            
    }
}