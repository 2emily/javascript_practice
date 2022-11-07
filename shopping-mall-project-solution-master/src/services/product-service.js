import { productModel, categoryModel } from "../db";

class ProductService {
  constructor(productModel, categoryModel) {
    this.productModel = productModel;
    this.categoryModel = categoryModel;
  }

  async addProduct(productInfo) {
    // 객체 destructuring
    const { title } = productInfo;

    // 이름 중복 확인
    const product = await this.productModel.findByTitle(title);
    if (product) {
      throw new Error(
        "이 이름은 현재 사용중입니다. 다른 이름을 입력해 주세요."
      );
    }

    // db에 저장
    const createdNewProduct = await this.productModel.create(productInfo);

    return createdNewProduct;
  }

  async getProducts() {
    const products = await this.productModel.findAll();

    return products;
  }

  async getProductsByCategoryTitle(categoryTitle) {
    const category = await this.categoryModel.findByTitle(categoryTitle);
    const products = await this.productModel.findAllByCategoryId(category._id);

    return products;
  }

  async setProduct(productId, toUpdate) {
    const updatedProduct = await this.productModel.update({
      productId,
      update: toUpdate,
    });

    return updatedProduct;
  }

  async getProductData(productId) {
    const product = await this.productModel.findById(productId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error("해당 id의 제품은 없습니다. 다시 한 번 확인해 주세요.");
    }

    return product;
  }

  async deleteProductData(productId) {
    const { deletedCount } = await this.productModel.deleteById(productId);

    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${productId} 제품의 삭제에 실패하였습니다`);
    }

    return { result: "success" };
  }
}

const productService = new ProductService(productModel, categoryModel);

export { productService };
