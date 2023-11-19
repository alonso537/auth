import { Request, Response } from "express";
import { CustomError, PaginationDto } from "../../domain";

export class ProductController {
  constructor() // private readonly productService: ProductService,
  {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);

    return res.status(500).json({ error: "Internal server error" });
  };

  createProduct = async (req: Request, res: Response) => {};

  getProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) {
      return res.status(400).json({ error });
    }
  };
}
