import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchInvoices,
  saveInvoice,
  deleteInvoice,
  updateInvoice,
  login,
  logout
} from '../actions/actions';
import _ from 'lodash';
import CreateModal from '../components/CreateModal';
import LoginModal from '../components/LoginModal';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddModalFlag: false,
      modalMode: 'add',
      selectedInvoice: null,
      showLoginModalFlag: false,
      loginError: '',
    };

    this.showAddModal = this.showAddModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.saveInvoice = this.saveInvoice.bind(this);
    this.updateInvoice = this.updateInvoice.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.login = this.login.bind(this);
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

  showLoginModal() {
    this.setState({ showLoginModalFlag: true });
  }

  closeLoginModal() {
    this.setState({ showLoginModalFlag: false });
  }

  login(username, password) {
    this.props.login(username, password,
      () => {
        this.setState({ showLoginModalFlag: false });
      }, (msg) => {
        this.setState({ loginError: msg });
      });
  }

  logout() {
    this.props.logout();
  }

  renderInvoices(invoices, role) {
    const className = this.hasPriviliges(role) ? 'width20' : 'width25';
    return _.map(invoices, (invoice) => {
      return (
        <tr key={invoice._id}>
          <td className={className}>{this.formateDate(new Date(invoice.invoiceDate))}</td>
          <td className={className + " blue"}>{invoice.invoiceNumber}</td>
          <td className={className}>{this.formateDate(new Date(invoice.supplyDate))}</td>
          <td className={className}>{invoice.comment}</td>
          {this.hasPriviliges(role) &&
          <td className={className}>
            <button type="button" onClick={this.showUpdateModal.bind(this, invoice)} className="btn-primary">Edit</button>
            {role === 'admin' && <button type="button" onClick={this.deleteInvoice.bind(this, invoice._id)} className="btn-primary">Delete</button>}
          </td>
          }
        </tr>
      );
    });
  }

  hasPriviliges(role) {
    return role === 'admin' || role === 'moderator';
  }

  formateDate(date) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    return `${d < 10 ? '0' : ''}${d}-${m < 10 ? '0' : ''}${m}-${y}`;
  }

  render() {
    const { showAddModalFlag, modalMode, selectedInvoice, showLoginModalFlag, loginError } = this.state;

    const { invoices, role } = this.props;

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

        {showLoginModalFlag &&

          <LoginModal closeLoginModal={this.closeLoginModal} login={this.login} loginError={loginError}/>

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
            { !this.hasPriviliges(role) && <button type="button" className="btn-primary" onClick={this.showLoginModal.bind(this)}>Login</button> }
            { this.hasPriviliges(role) && <button type="button" className="btn-primary" onClick={this.logout.bind(this)}>Logout</button>}
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
                  {this.hasPriviliges(role) && <td>Actions</td>}
                </tr>
              </thead>
              <tbody>
                {this.renderInvoices(invoices, role)}
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
    role: state.role.role,
  }),
  dispatch => ({
    fetchInvoices: bindActionCreators(fetchInvoices, dispatch),
    saveInvoice: bindActionCreators(saveInvoice, dispatch),
    deleteInvoice: bindActionCreators(deleteInvoice, dispatch),
    updateInvoice: bindActionCreators(updateInvoice, dispatch),
    login: bindActionCreators(login, dispatch),
    logout: bindActionCreators(logout, dispatch),
  }),
)(App));
