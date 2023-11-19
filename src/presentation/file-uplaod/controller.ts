import { Request, Response } from "express";
import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";
import { CategoryService } from "../services/category.service";
import { FileUpladService } from "../services/file-upload.service";
import { UploadedFile } from "express-fileupload";

export class FileUploadController {
  constructor(
    private readonly fileUploadService: FileUpladService,
    ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);

    return res.status(500).json({ error: "Internal server error" });
  };

  uploadFile = async (req: Request, res: Response) => {

    const files = req.files;

    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({error: 'No files were uploaded'})
    }

    const file = req.files.file as UploadedFile;

    this.fileUploadService.uploadFile(file)
      .then((result) => {
        res.json({ result });
      }
      )
      .catch((error) => {
        this.handleError(error, res);
      });

    // res.json({ message: "File uploaded successfully" });
  }

  uploadMultipleFile = async (req: Request, res: Response) => {

    res.json({ message: "File uploaded successfully" });
  }
}
