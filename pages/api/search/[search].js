import createHandler from "../middleware";
import Product from "../models/product";

const productRouter = createHandler();

productRouter.get(async (req, res) => {
  try {
    const { search } = req.query;
    console.log("req.query", req.query, "search", search);
    const products = await Product.find();
    return res.send(products);
  } catch {
    res.status(500).send(err);
  }
});

export default productRouter;
