import createHandler from "../middleware";
import Mainvisimg from "../models/mainvisimg";

const mainvisimgRouter = createHandler();

mainvisimgRouter.delete(async (req, res) => {
  try {
    const { _id } = req.query;
    console.log(_id);
    const mainvisimgs = await Mainvisimg.findByIdAndDelete(_id, { new: true });
    return res.send(mainvisimgs);
  } catch {
    console.log(err);
    res.status(500).send(err);
  }
});

export default mainvisimgRouter;
