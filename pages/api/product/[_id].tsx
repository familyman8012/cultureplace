import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import Product from "../models/product";

const productRouter = createHandler();

productRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;
    const products = await Product.find({ _id });
    return res.send(products);
  } catch {
    res.status(500).send(err);
  }
});

productRouter.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;
    const products = await Product.findByIdAndUpdate(_id, req.body, {
      new: true
    });
    return res.send(products);
  } catch {
    res.status(500).send(err);
  }
});

productRouter.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;
    const products = await Product.findByIdAndDelete(_id);
    return res.send(products);
  } catch {
    res.status(500).send(err);
  }
});

export default productRouter;
function err(err: any) {
  throw new Error("Function not implemented.");
}
