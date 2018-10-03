import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchInvoices,
} from '../actions/actions';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddModalFlag: false,
    };

    this.showAddModal = this.showAddModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
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
          <div className="modal">
            <div className="modal-header">
              <span className="close" onClick={this.closeAddModal}>&times;</span>
              <h2>Modal Header</h2>
            </div>
          </div>
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
  }),
)(App));