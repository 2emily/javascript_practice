import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares";
import { productService } from "../services";

const productRouter = Router();

productRouter.post("/product", loginRequired, async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const title = req.body.title;
    const categoryId = req.body.categoryId;
    const sellerId = req.currentUserId;
    const manufacturer = req.body.manufacturer;
    const shortDescription = req.body.shortDescription;
    const detailDescription = req.body.detailDescription;
    const imageKey = req.body.imageKey;
    const inventory = req.body.inventory;
    const price = req.body.price;
    const searchKeywords = req.body.searchKeywords;

    // 위 데이터를 제품 db에 추가하기
    const newProduct = await productService.addProduct({
      title,
      categoryId,
      sellerId,
      manufacturer,
      shortDescription,
      detailDescription,
      imageKey,
      inventory,
      price,
      searchKeywords,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

productRouter.get(
  "/productlist",
  loginRequired,
  async function (req, res, next) {
    try {
      // 전체 제품 목록을 얻음
      const products = await productService.getProducts();

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

productRouter.get(
  "/productlist/category/:categoryTitle",
  async function (req, res, next) {
    let categoryTitle = req.params.categoryTitle;

    try {
      // 전체 제품 목록을 얻음
      const products = await productService.getProductsByCategoryTitle(
        categoryTitle
      );

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

productRouter.get("/products/:productId", async function (req, res, next) {
  try {
    const productId = req.params.productId;
    const productData = await productService.getProductData(productId);

    res.status(200).json(productData);
  } catch (error) {
    next(error);
  }
});

productRouter.patch(
  "/products/:productId",
  loginRequired,
  async function (req, res, next) {
    try {
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // req (request) 에서 데이터 가져오기
      const productId = req.params.productId;
      const title = req.body.title;
      const shortDescription = req.body.shortDescription;
      const detailDescription = req.body.detailDescription;
      const imageKey = req.body.imageKey;
      const inventory = req.body.inventory;
      const price = req.body.price;
      const searchKeywords = req.body.searchKeywords;
      const isRecommended = req.body.isRecommended;
      const discountPercent = req.body.discountPercent;

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        ...(title && { title }),
        ...(shortDescription && { shortDescription }),
        ...(detailDescription && { detailDescription }),
        ...(imageKey && { imageKey }),
        ...(inventory && { inventory }),
        ...(price && { price }),
        ...(searchKeywords && { searchKeywords }),
        ...(isRecommended && { isRecommended }),
        ...(discountPercent && { discountPercent }),
      };

      // 제품 정보를 업데이트함.
      const updatedProduct = await productService.setProduct(
        productId,
        toUpdate
      );

      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

productRouter.delete(
  "/products/:productId",
  loginRequired,
  async function (req, res, next) {
    try {
      const productId = req.params.productId;
      const deleteResult = await productService.deleteProductData(productId);

      res.status(200).json(deleteResult);
    } catch (error) {
      next(error);
    }
  }
);

export { productRouter };
