import createHandler from "../middleware";
import Notice from "../models/notice";

const noticeRouter = createHandler();

noticeRouter.get(async (req, res) => {
  try {
    const { _id } = req.query;
    console.log("_id제대로 들어오니?", _id);
    const notices = await Notice.find({ _id });
    console.log("notices", notices);
    return res.send(notices);
  } catch {
    console.log(err);
    res.status(500).send(err);
  }
});


noticeRouter.put(async (req, res) => {
  try {
    const { _id } = req.query;
    console.log("_id제대로 들어오니?", _id)
    const notices = await Notice.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    return res.send(notices);
  } catch {
    console.log(err);
    res.status(500).send(err);
  }
});


noticeRouter.delete(async (req, res) => {
  try {
    const { _id } = req.query;
    console.log("_id_id_id_id", _id);
    const notices = await Notice.findByIdAndDelete(_id, {new:true});
    console.log("notices", notices);
    return res.send(notices);
  } catch {
    console.log(err);
    res.status(500).send(err);
  }
});


export default noticeRouter;
