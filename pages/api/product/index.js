import createHandler from "../middleware";
import Product from "../models/product";
import _ from "lodash";

const productRouter = createHandler();

productRouter.get(async (req, res) => {
  console.log("req.query", req.query);
  const { page, meetingcycle, limit, genre, location } = req.query;

  let searchOption = { meetingcycle, genre, location };
  searchOption = _.pickBy(searchOption, (value, key) => {
    return !_.isEmpty(value);
  });

  console.log(searchOption);

  const Numberlimit = Number(limit);

  try {
    if (req.query.page === undefined) {
      const products = await Product.find({});
      return res.send(products);
    } else {
      const [products, productsCount] = await Promise.all([
        Product.find(searchOption)
          .skip((page - 1) * Numberlimit)
          .limit(Numberlimit),
        Product.find(searchOption).count()
      ]);

      const hasNextPage = page < Math.ceil(productsCount / Numberlimit);

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
