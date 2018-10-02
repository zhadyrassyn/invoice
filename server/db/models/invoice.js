const mongoose = require('./../mongoose');

const Invoice = mongoose.model('Invoice', {
  invoiceNumber: {
    type: String,
    required: true,
  },
  invoiceDate: {
    type: Date,
    required: true,
  },
  supplyDate: {
    type: Date,
    required: true,
  },
  comment: String,
});

module.exports = Invoice;
