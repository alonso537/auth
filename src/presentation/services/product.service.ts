import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";

export class ProductService {
  constructor() {}

  async createProduct(createProductDto: CreateProductDto) {
    const productExists = await ProductModel.findOne({
      name: createProductDto.name,
    });

    if (productExists) throw new Error("Product already exists with this name");

    try {
      const product = new ProductModel(createProductDto);

      await product.save();

      return product;
    } catch (error) {
      console.log(error);

      throw CustomError.internal(`Internal server error`);
    }
  }

  async getProduct(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("user")
          .populate("category"),
      ]);

      // const total = await CategoryModel.countDocuments();
      //   const categories = await CategoryModel.find()
      //   .skip((page - 1) * limit)
      //   .limit(limit)

      return {
        page,
        limit,
        total,
        // next: page * limit >= total ? null : `http://localhost:3000/categories?page=${page + 1}&limit=${limit}`,
        // previous: page == 1 ? null : `http://localhost:3000/categories?page=${page - 1}&limit=${limit}`,
        products: products,
      };
    } catch (error) {
      throw CustomError.internal(`Internal server error`);
    }
  }
}
