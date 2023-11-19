import path from "path";
import fs from "fs";
import { UploadedFile } from "express-fileupload";
import { Uuid } from "../../config/uuid.adapter";
import { CustomError } from "../../domain";

export class FileUpladService {
  constructor(
    private readonly uuid = Uuid.v4,
  ) {}

  private checkFolder(folderPath: string) {
    if(!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath)
    }
  }

   uploadFile = async (
    file: UploadedFile,
    folder: string = "uploads",
    validExtension: string[] = ["jpg", "png", "jpeg", "gif"]
  ) => {
    try {
        const fileExtension = file.mimetype.split("/").at(1) ?? "";

        if(!validExtension.includes(fileExtension)) {
            throw CustomError.badRequest('Invalid file extension' + fileExtension)
        }

        const destination = path.resolve(__dirname, '../../../', folder)
        this.checkFolder(destination)

        const fileName = `${this.uuid()}.${fileExtension}`

        file.mv(`${destination}/${fileName}`);


        return {fileName}
    } catch (error) {
        console.log({error});
        throw error
        
    }
  };

  uploadMultipleFile = async (
    files: UploadedFile[],
    folder: string = "uploads",
    validExtension: string[] = ["jpg", "png", "jpeg", "gif"]
  ) => {
    const filesNames = await Promise.all(
        files.map(async (file) => {
            this.uploadFile(file, folder, validExtension)
        })
    )

    return filesNames
  };
}
