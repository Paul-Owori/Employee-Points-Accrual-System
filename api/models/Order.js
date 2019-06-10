const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creates a schema
const orderSchema = new Schema({
  order_id: mongoose.Schema.Types.ObjectId,
  order_for: {
    type: string,
    required: true
  },
  order_price: {
    type: Number,
    required: true
  },
  approval_status: {
    type: mongoose.Schema.Types.ObjectId
  },
  approved_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },
  order_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Order = mongoose.model("Order", orderSchema);
