import createHandler from "../middleware"
import User from "../models/user"

const app = createHandler();

app.get((req, res) => {
  User.find({}).exec((err, users) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, data: users });
  });
});

app.post((req, res) => {
  var users = new User(req.body);
  users.save((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: false, result });
  });

  // app.post(async (req, res) => {
  // var users = new User(req.body);
  // await users.save((err, result) => {
  //   if (err) return res.status(400).json({ success: false, err });
  //   return res.status(200).json({ success: false, result });
  // });
 
});

export default app;
