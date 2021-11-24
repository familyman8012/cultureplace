import createHandler from "../middleware";
import Review from "../models/review";

const reviewRouter = createHandler();

reviewRouter.get(async (req, res) => {
  try {
    const { _id, page } = req.query;

    console.log("page느느느는", page);

    const [reviews, count] = await Promise.all([
      Review.find({ product: _id })
        .sort({ updatedAt: -1 })
        .skip((page - 1) * 5)
        .limit(5),
      Review.find().count()
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

// reviewRouter.delete(async (req, res) => {
//   try {
//     const { _id, reviewid } = req.query;
//     console.log(reviewid);
//     const products = await Product.updateOne(
//       { _id },
//       { $pull: { review: { _id: reviewid } } }
//     );
//     return res.send(products);
//   } catch {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

// productRouter.get(async (req, res) => {
//   try {
//     const { _id } = req.query;
//     const products = await Product.find({ _id });
//     return res.send(products);
//   } catch {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

// productRouter.put(async (req, res) => {
//   try {
//     const { _id } = req.query;
//     const products = await Product.findByIdAndUpdate(_id, req.body, {
//       new: true
//     });
//     return res.send(products);
//   } catch {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

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
