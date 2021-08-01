module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "jackson" && req.body.password === "123") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res
        .status(400)
        .json({ message: "用户信息错误！请确认用户名和账号密码" });
    }
  }
  next();
};
