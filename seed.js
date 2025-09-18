const mongoose = require("mongoose");
const User = require("./models/User");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const exists = await User.findOne({ username: "admin" });
    if (!exists) {
      await User.create({ username: "admin", password: "123456" });
      console.log("✅ User admin created");
    } else {
      console.log("ℹ️ User admin already exists");
    }
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
