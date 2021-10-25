import createHandler from "../middleware";
import Product from "../models/product";

const productRouter = createHandler();

productRouter.get(async (req, res) => {
  try {
    const products = await Product.find({});
    return res.send(products);
  } catch {
    console.log(err);
    res.status(500).send(err);
  }
});

productRouter.post(async (req, res) => {
  try {    
    const products = new Product(req.body);
    await products.save();
    return res.send(products);
  }
  catch {
    console.log(err);
     res.status(500).send(err);
  }
});


export default productRouter;
