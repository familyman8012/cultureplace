import createHandler from "../middleware";
import Product from "../models/product";

const productRouter = createHandler();

productRouter.get(async (req, res) => {
  console.log(req.query.page === undefined);
  const { page, meetingcycle, limit, genre } = req.query;

  const Numberlimit = Number(limit);

  const condition = () => {
    if (genre === undefined) {
      return { meetingcycle };
    } else {
      return { genre, meetingcycle };
    }
  };

  try {
    if (req.query.page === undefined) {
      const products = await Product.find({});
      return res.send(products);
    } else {
      const [products, productsCount] = await Promise.all([
        Product.find(condition())
          .skip((page - 1) * Numberlimit)
          .limit(Numberlimit),
        Product.find(condition()).count()
      ]);

      const hasNextPage = page < Math.ceil(productsCount / Numberlimit);
      console.log(
        "page",
        page,
        "lastpage",
        Math.ceil(productsCount / Numberlimit),
        "lastPage.hasNextPage",
        hasNextPage
      );
      return res.send({ products, hasNextPage });
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
  } catch {
    console.log(err);
    res.status(500).send(err);
  }
});

export default productRouter;
