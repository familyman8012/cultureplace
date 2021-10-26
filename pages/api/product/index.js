import createHandler from "../middleware";
import Product from "../models/product";

const productRouter = createHandler();

productRouter.get(async (req, res) => {
  console.log(req.query.page === undefined);
  const { page, meetingcycle, limit, genre } = req.query;
  
  const Numberlimit = Number(limit);

  console.log(page, meetingcycle, limit, "장르르르르르르르", genre);

  const condition = () => {
    if (genre === undefined) {
      return {meetingcycle};
    } else {
      return {genre, meetingcycle}
    }
  }

  try {
    if (req.query.page === undefined) {
      const products = await Product.find({});
      return res.send(products);
    } 
    else 
    {
    const [products, productsCount] = await Promise.all([
      
      Product.find(condition())
        .skip((page - 1) * Numberlimit)
        .limit(Numberlimit),
      Product.find(condition()).count(),
    ]);
    const totalPages = Math.ceil(productsCount / Numberlimit);
    return res.send({ products, totalPages });
    }       
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
