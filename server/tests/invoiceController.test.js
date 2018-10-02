const expect = require('expect');
const request = require('supertest');

const app = require('./../server');
const Invoice = require('./../db/models/invoice');
const mongoose = require('./../db/mongoose');

const invoices = [
  {
    _id: new mongoose.Types.ObjectId(),
    invoiceNumber: 'TT1',
    invoiceDate: new Date('07-08-2017'),
    supplyDate: new Date('07-08-2018'),
    comment: 'good',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    invoiceNumber: 'WW2',
    invoiceDate: new Date('07-09-2017'),
    supplyDate: new Date('07-09-2018'),
    comment: 'bad',
  },
];

beforeEach((done) => {
  Invoice.deleteMany({}).then(() => {
    Invoice.insertMany(invoices);
  }).then(() => done());
});

describe('GET /api/invoice', () => {
  it('should get all posts', (done) => {
    request(app)
      .get('/api/invoice')
      .expect(200)
      .expect((res) => {
        expect(res.body.invoices.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /api/invoice/:id', () => {
  it('should get invoice by id', (done) => {
    request(app)
      .get(`/api/invoice/${invoices[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.invoice._id).toBe(invoices[0]._id.toHexString());
      })
      .end(done);
  });
  it('should return 400 for invalid id', (done) => {
    request(app)
      .get('/api/invoice/abrakadabra')
      .expect(400)
      .end(done);
  });
  it('should return 400 for bad id', (done) => {
    request(app)
      .get(`/api/invoice/${new mongoose.Types.ObjectId().toHexString()}`)
      .expect(400)
      .end(done);
  });
});

describe('PUT /api/invoice', () => {
  it('should create new invoice', (done) => {
    const invoice = {
      invoiceNumber: 'KK2',
      invoiceDate: new Date('07-09-2017'),
      supplyDate: new Date('07-09-2018'),
      comment: 'somethingNew',
    };
    request(app)
      .put('/api/invoice')
      .send(invoice)
      .expect(201)
      .expect((res) => {
        expect(res.body.invoiceNumber).toBe(invoice.invoiceNumber);
        expect(res.body.comment).toBe(invoice.comment);
        expect(new Date(res.body.invoiceDate).toTimeString()).toBe(invoice.invoiceDate.toTimeString());
        expect(new Date(res.body.supplyDate).toTimeString()).toBe(invoice.supplyDate.toTimeString());
      })
      .end(done);
  });
});

describe('DELETE /api/invoice/:id', () => {
  it('should delete invoice by id', (done) => {
    request(app)
      .delete(`/api/invoice/${invoices[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.invoice._id).toBe(invoices[0]._id.toHexString());
      })
      .end(done);
  });
  it('should return 400 for invalid id', (done) => {
    request(app)
      .delete('/api/invoice/abrakadabra')
      .expect(400)
      .end(done);
  });
  it('should return 400 for bad id', (done) => {
    request(app)
      .delete(`/api/invoice/${new mongoose.Types.ObjectId().toHexString()}`)
      .expect(400)
      .end(done);
  });
});

describe('POST /api/invoice/:id', () => {
  it('should update invoice by id', (done) => {
    const invoice = {
      invoiceNumber: 'BB1',
      invoiceDate: new Date('07-08-2020'),
    };
    const id = invoices[0]._id.toHexString();
    request(app)
      .post(`/api/invoice/${id}`)
      .send(invoice)
      .expect(200)
      .expect((res) => {
        console.log('res.body ', res.body);
        expect(res.body.invoice._id).toBe(id);
        expect(res.body.invoice.invoiceNumber).toBe(invoice.invoiceNumber);
        expect(new Date(res.body.invoice.invoiceDate).toTimeString()).toBe(invoice.invoiceDate.toTimeString());
        expect(new Date(res.body.invoice.supplyDate).toTimeString()).toBe(invoices[0].supplyDate.toTimeString());
        expect(res.body.invoice.comment).toBe(invoices[0].comment);
      })
      .end(done);
  });
});
