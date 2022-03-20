import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import Product from "../models/product";
import User from "../models/user";
import { omitBy, isUndefined, isEmpty } from "lodash";

const productRouter = createHandler();

productRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { meetingcycle, genre, creator, page, limit } = req.query;
  const Numberlimit = Number(limit);
  const searchOption = omitBy({ meetingcycle, genre, creator }, isUndefined);

  try {
    if (isEmpty(searchOption)) {
      const [products, productsCount] = await Promise.all([
        Product.find({}, { body: false })
          .sort({ firstmeet: 1 })
          .limit(Numberlimit)
          .skip((Number(page) - 1) * Numberlimit),
        Product.find({}).countDocuments()
      ]);
      return res.send({ products, productsCount });
    } else if (creator === "61c9a8f21179d30608ba85d7") {
      const [userInfo, products, productsCount] = await Promise.all([
        User.find({ _id: "61c9a8f21179d30608ba85d7" }),
        Product.find({}, { body: false })
          .populate("creator", "name email phone")
          .sort({ firstmeet: 1 })
          .limit(Numberlimit)
          .skip((Number(page) - 1) * Numberlimit),
        Product.find({}).countDocuments()
      ]);
      return res.send({ products, productsCount });
    } else {
      const [products, productsCount] = await Promise.all([
        Product.find(searchOption, { body: false })
          .sort({ firstmeet: 1 })
          .limit(Numberlimit)
          .skip((Number(page) - 1) * Numberlimit),
        Product.find(searchOption).countDocuments()
      ]);
      return res.send({ products, productsCount });
    }
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

productRouter.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const products = new Product(req.body);
    await products.save();
    return res.send(products);
  } catch {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

export default productRouter;
function err(err: any) {
  throw new Error("Function not implemented.");
}
