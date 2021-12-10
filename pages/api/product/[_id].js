import createHandler from "../middleware";
import Product from "../models/product";

const productRouter = createHandler();

productRouter.get(async (req, res) => {
  try {
    const { _id } = req.query;
    const products = await Product.find({ _id });
    return res.send(products);
  } catch {
    res.status(500).send(err);
  }
});

productRouter.put(async (req, res) => {
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

productRouter.delete(async (req, res) => {
  try {
    const { _id } = req.query;
    const products = await Product.findByIdAndDelete(_id);
    return res.send(products);
  } catch {
    res.status(500).send(err);
  }
});

export default productRouter;
