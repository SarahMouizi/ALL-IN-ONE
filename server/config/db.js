const mongoose = require("mongoose");
try {
  mongoose.connect("mongodb+srv://ecommerce:lXbmmiqh6ylD6kZG@cluster0.dvbn52j.mongodb.net/ecommerce?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Good Job Baby ! Database connected");
} catch (err) {
  console.log("Database Not Connected");
}
