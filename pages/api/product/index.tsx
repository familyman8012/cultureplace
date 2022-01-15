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
        Product.find({}, { body: false })
          // .populate("joinMembr")
          .sort({ firstmeet: 1 })
          .limit(Numberlimit)
          .skip((Number(page) - 1) * Numberlimit),
        Product.find({}).countDocuments()
      ]);
      return res.send({ products, productsCount });
    } else {
      console.log(Numberlimit, page);
      const [products, productsCount] = await Promise.all([
        Product.find(searchOption, { body: false })
          .sort({ firstmeet: 1 })
          .limit(Numberlimit)
          .skip((Number(page) - 1) * Numberlimit),
        Product.find(searchOption).countDocuments()
      ]);
      return res.send({ products, productsCount });
    }
  } catch {
    console.log(err);
    res.status(500).send(err);
  }
});

productRouter.post(async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
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
