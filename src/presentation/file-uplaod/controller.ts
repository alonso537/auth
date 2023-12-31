import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { FileUpladService } from "../services/file-upload.service";
import { UploadedFile } from "express-fileupload";

export class FileUploadController {
  constructor(private readonly fileUploadService: FileUpladService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);

    return res.status(500).json({ error: "Internal server error" });
  };

  uploadFile = async (req: Request, res: Response) => {
    const type = req.params.type;

    // if(!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).json({error: 'No files were uploaded'})
    // }

    const file = req.body.files.at(0) as UploadedFile;

    this.fileUploadService
      .uploadFile(file, `uploads/${type}`)
      .then((result) => {
        res.json({ result });
      })
      .catch((error) => {
        this.handleError(error, res);
      });

    // res.json({ message: "File uploaded successfully" });
  };

  uploadMultipleFile = async (req: Request, res: Response) => {
    const type = req.params.type;

    // if(!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).json({error: 'No files were uploaded'})
    // }

    const file = req.body.files as UploadedFile[];

    this.fileUploadService
      .uploadMultipleFile(file, `uploads/${type}`)
      .then((result) => {
        res.json({ result });
      })
      .catch((error) => {
        this.handleError(error, res);
      });
  };
}
