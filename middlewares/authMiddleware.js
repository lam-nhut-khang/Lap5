// middlewares/authMiddleware.js
module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.session && req.session.user) {
      return next();
    }
    res.redirect("/auth/login");
  },
  ensureGuest: (req, res, next) => {
    if (req.session && req.session.user) {
      return res.redirect("/"); // nếu đã đăng nhập thì về trang chủ
    }
    next();
  },
};
