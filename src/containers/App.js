import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchInvoices,
  saveInvoice
} from '../actions/actions';
import _ from 'lodash';
import CreateModal from '../components/CreateModal';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddModalFlag: false,
    };

    this.showAddModal = this.showAddModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.saveInvoice = this.saveInvoice.bind(this);
  }

  componentDidMount() {
    this.props.fetchInvoices();
  }

  closeAddModal() {
    this.setState({ showAddModalFlag: false });
  }

  showAddModal() {
    this.setState({ showAddModalFlag: true });
  }

  saveInvoice(invoice) {
    this.props.saveInvoice(invoice, () => {
      this.setState({ showAddModalFlag: false })
    });
  }

  renderInvoices(invoices) {
    return _.map(invoices, (invoice) => {
      return (
        <tr key={invoice._id}>
          <td>{this.formateDate(new Date(invoice.invoiceDate))}</td>
          <td className="blue">{invoice.invoiceNumber}</td>
          <td>{this.formateDate(new Date(invoice.supplyDate))}</td>
          <td>{invoice.comment}</td>
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
    const { showAddModalFlag } = this.state;
    const { invoices } = this.props;
    return (
      <div>
        {showAddModalFlag &&
          <CreateModal closeAddModal={this.closeAddModal} saveInvoice={this.saveInvoice}/>
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
  }),
)(App));
