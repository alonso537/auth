export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string
  ) {}

  static create(object: { [ket: string]: any }): [string?, CreateProductDto?] {
    const { name, available, price, description, user, category } = object;

    let availableBoolean = available;

    if (!name) {
      return ["Name is required"];
    }
    if (!user) {
      return ["User is required"];
    }
    if (!category) {
      return ["Category is required"];
    }

    if (typeof available !== "boolean") {
      availableBoolean = available === "true";
    }

    return [
      undefined,
      new CreateProductDto(
        name,
        !!available,
        price,
        description,
        user,
        category
      ),
    ];
  }
}
