const User = require("../models/User");

// Kiểm tra client muốn JSON hay HTML
const wantsJSON = (req) => req.get("Accept").includes("application/json");

// Form đăng ký
exports.registerForm = (req, res) =>
  res.render("auth/register", { error: null });

// Xử lý đăng ký
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existing = await User.findOne({ username });
    if (existing) {
      if (wantsJSON(req))
        return res.status(400).json({ error: "Username already exists" });
      return res.render("auth/register", { error: "Username already exists" });
    }

    const user = new User({ username, password });
    await user.save();

    if (wantsJSON(req))
      return res.json({
        message: "User registered successfully",
        username: user.username,
      });
    res.redirect("/auth/login");
  } catch (err) {
    if (wantsJSON(req)) return res.status(500).json({ error: err.message });
    res.render("auth/register", { error: "Error: " + err.message });
  }
};

// Form login
exports.loginForm = (req, res) => res.render("auth/login", { error: null });

// Xử lý login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      if (wantsJSON(req))
        return res.status(400).json({ error: "User not found" });
      return res.render("auth/login", { error: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      if (wantsJSON(req))
        return res.status(400).json({ error: "Invalid password" });
      return res.render("auth/login", { error: "Invalid password" });
    }

    // Lưu session
    req.session.userId = user._id;
    req.session.username = user.username;

    if (wantsJSON(req))
      return res.json({
        message: "Login successful",
        userId: user._id,
        username: user.username,
      });
    res.redirect("/");
  } catch (err) {
    if (wantsJSON(req)) return res.status(500).json({ error: err.message });
    res.render("auth/login", { error: "Error: " + err.message });
  }
};

// Logout cả GET & POST
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      if (wantsJSON(req)) return res.status(500).json({ error: err.message });
      return res.redirect("/");
    }
    res.clearCookie("connect.sid"); // xóa cookie session
    if (wantsJSON(req)) return res.json({ message: "Logout successful" });
    res.redirect("/auth/login");
  });
};

// Profile
exports.profile = async (req, res) => {
  if (!req.session.userId) {
    if (wantsJSON(req)) return res.status(401).json({ error: "Unauthorized" });
    return res.redirect("/auth/login");
  }

  try {
    const user = await User.findById(req.session.userId).select("username");
    if (!user) {
      if (wantsJSON(req))
        return res.status(404).json({ error: "User not found" });
      return res.redirect("/auth/login");
    }

    if (wantsJSON(req))
      return res.json({
        message: "This is your profile",
        userId: user._id,
        username: user.username,
      });
    res.render("auth/profile", { user });
  } catch (err) {
    if (wantsJSON(req)) return res.status(500).json({ error: err.message });
    res.render("auth/profile", { error: "Error: " + err.message });
  }
};
