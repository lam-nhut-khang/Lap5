const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Nếu chưa có model User, ta cần tạo tạm User model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// Kết nối MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/project_db") // đổi tên DB nếu khác
    .then(async() => {
        console.log("✅ MongoDB connected");

        // Tạo password hash
        const hashedPassword = await bcrypt.hash("123456", 10);

        // Tạo user mới
        const user = new User({
            username: "admin",
            password: hashedPassword,
        });

        await user.save();
        console.log("✅ User 'admin' created with password '123456'");

        mongoose.connection.close();
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err));