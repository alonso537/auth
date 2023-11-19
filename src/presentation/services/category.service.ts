import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, UserEntity } from "../../domain";
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';

export class CategoryService {
  //DI - Dependency Injection
  constructor() {}

  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const categoryExists = await CategoryModel.findOne({
      name: createCategoryDto.name,
    });

    if (categoryExists) throw CustomError.badRequest("Category already exists");

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      });

      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available,
      };

    } catch (error) {
      throw CustomError.internal(`Internal server error`);
    }
  }


  async getCategories(paginationDto:PaginationDto) {
    const { page, limit } = paginationDto;


    try {
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
        .skip((page - 1) * limit)
        .limit(limit)
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
          categories: categories.map((category) => ({
            id: category.id,
            name: category.name,
            available: category.available,
            
          }))
        }
    } catch (error) {
        throw CustomError.internal(`Internal server error`);
    }
  }
}
