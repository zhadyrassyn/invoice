import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchInvoices,
  saveInvoice,
  deleteInvoice,
  updateInvoice,
} from '../actions/actions';
import _ from 'lodash';
import CreateModal from '../components/CreateModal';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddModalFlag: false,
      modalMode: 'add',
      selectedInvoice: null,
    };

    this.showAddModal = this.showAddModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.saveInvoice = this.saveInvoice.bind(this);
    this.updateInvoice = this.updateInvoice.bind(this);
  }

  componentDidMount() {
    console.log('true');
    this.props.fetchInvoices();
  }

  closeAddModal() {
    this.setState({ showAddModalFlag: false });
  }

  showAddModal() {
    this.setState({ showAddModalFlag: true, modalMode: 'add' });
  }

  saveInvoice(invoice) {
    this.props.saveInvoice(invoice, () => {
      this.setState({ showAddModalFlag: false })
    });
  }

  deleteInvoice(id) {
    this.props.deleteInvoice(id);
  }

  showUpdateModal(invoice) {
    this.setState({
      showAddModalFlag: true,
      modalMode: 'edit',
      selectedInvoice: invoice,
    });
  }

  updateInvoice(invoice, id) {
    this.props.updateInvoice(id, invoice, () => {
      this.setState({ showAddModalFlag: false });
    });
  }

  renderInvoices(invoices) {
    return _.map(invoices, (invoice) => {
      return (
        <tr key={invoice._id}>
          <td className="width20">{this.formateDate(new Date(invoice.invoiceDate))}</td>
          <td className="blue width20">{invoice.invoiceNumber}</td>
          <td className="width20">{this.formateDate(new Date(invoice.supplyDate))}</td>
          <td className="width20">{invoice.comment}</td>
          <td className="width20">
            <button type="button" onClick={this.showUpdateModal.bind(this, invoice)}>Edit</button>
            <button type="button" onClick={this.deleteInvoice.bind(this, invoice._id)}>Delete</button>
          </td>
        </tr>
      );
    });
  }

  formateDate(date) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    return `${d < 10 ? '0' : ''}${d}-${m < 10 ? '0' : ''}${m}-${y}`;
  }

  render() {
    const { showAddModalFlag, modalMode, selectedInvoice } = this.state;

    const { invoices } = this.props;
    return (
      <div>
        {showAddModalFlag && modalMode !== 'edit' &&
          <CreateModal closeAddModal={this.closeAddModal} saveInvoice={this.saveInvoice} modalMode="add"
                       selectedInvoice={{}}/>
        }

        {showAddModalFlag && modalMode === 'edit' &&
          <CreateModal closeAddModal={this.closeAddModal} updateInvoice={this.updateInvoice} modalMode="edit"
                       selectedInvoice={selectedInvoice}/>
        }
        <div className="wrapper">
          <header>
            <div className="header-title">
              Invoices
            </div>
            <div className="header-line"></div>
          </header>

          <section className="section-actions">
            <h3>Actions</h3>
            <button type="button" className="btn-primary" onClick={this.showAddModal}>Add new</button>
          </section>

          <section className="section-invoices">
            <h3>Invoices</h3>
            <table>
              <thead>
                <tr>
                  <td>Create</td>
                  <td>No</td>
                  <td>Supply</td>
                  <td>Comment</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {this.renderInvoices(invoices)}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    );
  }
}

export default (connect(
  state => ({
    invoices: state.invoices.invoices,
    error: state.invoices.error,
  }),
  dispatch => ({
    fetchInvoices: bindActionCreators(fetchInvoices, dispatch),
    saveInvoice: bindActionCreators(saveInvoice, dispatch),
    deleteInvoice: bindActionCreators(deleteInvoice, dispatch),
    updateInvoice: bindActionCreators(updateInvoice, dispatch),
  }),
)(App));
