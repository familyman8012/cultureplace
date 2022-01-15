import createHandler from "../middleware";
import Product from "../models/product";

const joinRouter = createHandler();

joinRouter.get(async (req, res) => {
  const { userid } = req.query;
  console.log(userid);
  if (userid !== "undefined") {
    const result = await Product.find({ joinMembr: userid });
    console.log("result", result);
    return res.status(200).json(result);
  }
});

export default joinRouter;
