import createHandler from "../middleware";
import Review from "../models/review";

const reviewRouter = createHandler();

reviewRouter.get(async (req, res) => {
  try {
    const { _id, page } = req.query;

    const [reviews, count] = await Promise.all([
      Review.find({ product: _id })
        .skip((page - 1) * 5)
        .limit(5)
        .populate({ path: "product" })
        .sort({ updatedAt: -1 }),
      Review.find({ product: _id }).count()
    ]);

    return res.send({ reviews, count });
  } catch {
    console.log(err);
    res.status(500).send(err);
  }
});

reviewRouter.post(async (req, res) => {
  try {
    const reviews = new Review(req.body);
    await reviews.save();
    return res.send(reviews);
  } catch {
    console.log(err);
    res.status(500).send(err);
  }
});

reviewRouter.delete(async (req, res) => {
  try {
    const { _id } = req.query;
    const reviews = await Review.findByIdAndDelete(_id);
    return res.send(reviews);
  } catch {
    console.log(err);
    res.status(500).send(err);
  }
});

reviewRouter.put(async (req, res) => {
  try {
    const { _id } = req.query;

    console.log("req.query", req.query, "req.body", req.body);
    const reviews = await Review.findByIdAndUpdate(_id, req.body, {
      new: true
    });
    return res.send(reviews);
  } catch {
    console.log(err);
    res.status(500).send(err);
  }
});

// productRouter.delete(async (req, res) => {
//   try {
//     const { _id } = req.query;
//     console.log(_id);
//     const products = await Product.findByIdAndDelete(_id);
//     return res.send(products);
//   } catch {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

export default reviewRouter;
