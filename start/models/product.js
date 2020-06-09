const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    title: String,
    content: String
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000
    }
  }
);
module.exports = mongoose.model("product", productSchema);
