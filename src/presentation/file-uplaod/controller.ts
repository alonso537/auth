import { Request, Response } from "express";
import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";
import { CategoryService } from "../services/category.service";

export class FileUploadController {
  constructor(
    // private readonly categoryService: CategoryService
    ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);

    return res.status(500).json({ error: "Internal server error" });
  };

  uploadFile = async (req: Request, res: Response) => {

    res.json({ message: "File uploaded successfully" });
  }

  uploadMultipleFile = async (req: Request, res: Response) => {

    res.json({ message: "File uploaded successfully" });
  }
}
