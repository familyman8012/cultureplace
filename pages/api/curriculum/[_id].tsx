import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import Product from "../models/product";

const productRouter = createHandler();

// get
productRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;
    console.log("_id", _id);

    const products = await Product.find({ _id });
    console.log(products);
    return res.send(products);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

// 추가.
productRouter.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;
    const { title } = req.body.curriculum;

    console.log(title);
    const products = await Product.updateOne(
      { _id },
      { $push: { curriculum: { title } } },
      { upsert: true }
    );
    return res.send(products);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

// 추가. put --> 2022.02.20 작업중
productRouter.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const { _id } = req.query;
    // const products = await Product.findByIdAndUpdate(_id, req.body, {
    //   new: true
    // });
    const { _id, curriculumId } = req.query;
    const { title } = req.body.curriculum;
    console.log("_id, curriculumId, title", _id, curriculumId, title);
    const products = await Product.updateOne(
      {
        _id,
        curriculum: { $elemMatch: { _id: curriculumId } }
      },
      { $set: { "curriculum.$.title": title } }
    );

    // const products = await Product.findByIdAndUpdate(_id, {
    //   $pull: { curriculum: { _id: curriculumId } }
    // }).exec();
    return res.send(products);

    // console.log(title, content, mediaId);
    // const products = await Product.updateOne(
    //   { _id },
    //   { $push: { lessons: { title, content, mediaId, filename } } },
    //   { upsert: true }
    // );
    // return res.send(products);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

productRouter.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id, curriculumId } = req.query;
    console.log("_id, curriculumId", _id, curriculumId);
    const products = await Product.findByIdAndUpdate(_id, {
      $pull: { curriculum: { _id: curriculumId } }
    }).exec();
    return res.send(products);

    // console.log(title, content, mediaId);
    // const products = await Product.updateOne(
    //   { _id },
    //   { $push: { lessons: { title, content, mediaId, filename } } },
    //   { upsert: true }
    // );
    // return res.send(products);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

export default productRouter;
function err(err: any) {
  throw new Error("Function not implemented.");
}
