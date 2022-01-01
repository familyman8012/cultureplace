import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import Product from "../models/product";
import { omitBy, isUndefined, isEmpty } from "lodash";

const productRouter = createHandler();

productRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { meetingcycle, genre, page, limit } = req.query;
  const Numberlimit = Number(limit);
  const searchOption = omitBy({ meetingcycle, genre }, isUndefined);

  console.log("searchOption", searchOption);

  try {
    if (isEmpty(searchOption)) {
      const [products, productsCount] = await Promise.all([
        Product.find({})
          .sort({ createdAt: -1 })
          .limit(Numberlimit)
          .skip((Number(page) - 1) * Numberlimit),
        Product.find({}).count()
      ]);
      return res.send({ products, productsCount });
    } else {
      const [products, productsCount] = await Promise.all([
        Product.find(searchOption)
          .sort({ createdAt: -1 })
          .limit(Numberlimit)
          .skip((Number(page) - 1) * Numberlimit),
        Product.find(searchOption).count()
      ]);
      return res.send({ products, productsCount });
    }
  } catch {
    console.log(err);
    res.status(500).send(err);
  }
});

productRouter.post(async (req: NextApiRequest, res: NextApiResponse) => {
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
function err(err: any) {
  throw new Error("Function not implemented.");
}
