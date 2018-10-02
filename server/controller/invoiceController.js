const express = require('express');

const Invoice = require('./../db/models/invoice');
const mongoose = require('./../db/mongoose');

const router = express.Router();

router
  .get('/invoice', (req, res) => {
    Invoice.find().then((invoices) => {
      res.send({ invoices });
    }, (error) => {
      res.status(400).send(error);
    });
  })
  .get('/invoice/:id', (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send();
    }

    Invoice.findById(id).then((invoice) => {
      if (!invoice) {
        return res.status(400).send();
      }
      res.send({ invoice });
    }, (error) => {
      res.status(400).send(error);
    });
  })
  .put('/invoice', (req, res) => {
    const invoice = new Invoice({
      invoiceNumber: req.body.invoiceNumber,
      invoiceDate: req.body.invoiceDate,
      supplyDate: req.body.supplyDate,
      comment: req.body.comment,
    });
    invoice.save().then((doc) => {
      res.status(201).send(doc);
    }, (error) => {
      res.status(400).send(error);
    });
  })
  .delete('/invoice/:id', (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send();
    }

    Invoice.findByIdAndDelete(id).then((invoice) => {
      if (!invoice) {
        return res.status(400).send();
      }
      res.send({ invoice });
    }, (error) => {
      res.status(400).send(error);
    });
  })
  .post('/invoice/:id', (req, res) => {
    const { id } = req.params;
    const {
      invoiceNumber, invoiceDate, supplyDate, comment,
    } = req.body;
    const body = {};
    if (invoiceNumber) body.invoiceNumber = invoiceNumber;
    if (invoiceDate) body.invoiceDate = invoiceDate;
    if (supplyDate) body.supplyDate = supplyDate;
    if (comment) body.comment = comment;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send();
    }

    Invoice.findByIdAndUpdate(id, { $set: body }, { new: true }).then((invoice) => {
      if (!invoice) {
        return res.status(400).send();
      }
      res.send({ invoice });
    }, (error) => {
      res.status(400).send(error);
    });
  });

module.exports = router;
