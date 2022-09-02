import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddItemService";

class AddItemController {
  async handle(req: Request, res: Response) {
    try {
      const { amount, order_id, product_id } = req.body;

      if (!amount) {
        throw new Error("Invalid amount");
      }

      if (!order_id) {
        throw new Error("Invalid order_id");
      }

      if (!product_id) {
        throw new Error("Invalid product_id");
      }

      const addItemService = new AddItemService();

      const item = await addItemService.execute({
        amount,
        order_id,
        product_id,
      });

      return res.json(item);
    } catch (error) {
      throw new Error("Invalid Params");
    }
  }
}

export { AddItemController };
