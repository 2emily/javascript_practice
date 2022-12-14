import { orderItemModel } from "../db";

class OrderItemService {
  constructor(orderItemModel) {
    this.orderItemModel = orderItemModel;
  }

  async addItem(orderItemInfo) {
    // db에 저장
    const createdNewOrderItem = await this.orderItemModel.create(orderItemInfo);

    return createdNewOrderItem;
  }

  async getItems() {
    const orderItems = await this.orderItemModel.findAll();

    return orderItems;
  }

  async getItemsByOrderId(orderId) {
    const orderItems = await this.orderItemModel.findAllByOrderId(orderId);

    return orderItems;
  }

  async getItemsByProductId(productId) {
    const orderItems = await this.orderItemModel.findAllByProductId(productId);

    return orderItems;
  }

  async setItem(orderItemId, toUpdate) {
    const updatedOrderItem = await this.orderItemModel.update({
      orderItemId,
      update: toUpdate,
    });

    return updatedOrderItem;
  }

  async getItemData(orderItemId) {
    const orderItem = await this.orderItemModel.findById(orderItemId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!orderItem) {
      throw new Error(
        "해당 id의 주문아이템은 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    return orderItem;
  }

  async deleteItemData(orderItemId) {
    const { deletedCount } = await this.orderItemModel.deleteById(orderItemId);

    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${orderItemId} 주문의 삭제에 실패하였습니다`);
    }

    return { result: "success" };
  }
}

const orderItemService = new OrderItemService(orderItemModel);

export { orderItemService };
