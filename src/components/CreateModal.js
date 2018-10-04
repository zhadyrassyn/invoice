import React, { Component } from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

class CreateModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      invoiceDate: undefined,
      supplyDate: undefined,
      invoiceNumber: '',
      comment: '',
    };

    this.closeModal = this.closeModal.bind(this);
    this.saveInvoice = this.saveInvoice.bind(this);
    this.handleInvoiceDateChange = this.handleInvoiceDateChange.bind(this);
    this.handleSupplyDateChange = this.handleSupplyDateChange.bind(this);
    this.handleInvoiceNumberChange = this.handleInvoiceNumberChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  componentDidMount() {
    const { modalMode, selectedInvoice } = this.props;
    console.log('modal model ', modalMode);
    if (modalMode === 'edit') {
      this.setState({
        invoiceDate: new Date(selectedInvoice.invoiceDate).toLocaleDateString(),
        supplyDate: new Date(selectedInvoice.supplyDate).toLocaleDateString(),
        invoiceNumber: selectedInvoice.invoiceNumber,
        comment: selectedInvoice.comment,
      });
    } else {
      this.setState({
        invoiceDate: undefined,
        supplyDate: undefined,
        invoiceNumber: '',
        comment: '',
      });
    }
  }

  closeModal() {
    this.props.closeAddModal();
  }

  saveInvoice() {
    const invoice = {
      invoiceNumber: this.state.invoiceNumber,
      invoiceDate: this.state.invoiceDate,
      supplyDate: this.state.supplyDate,
      comment: this.state.comment,
    };

    if (this.props.modalMode === 'edit') {
      this.props.updateInvoice(invoice, this.props.selectedInvoice._id);
    } else {
      this.props.saveInvoice(invoice);
    }
  }

  handleInvoiceDateChange(day) {
    this.setState({ invoiceDate: day });
  }

  handleSupplyDateChange(day) {
    this.setState({ supplyDate: day });
  }

  handleInvoiceNumberChange(event) {
    this.setState({ invoiceNumber: event.target.value });
  }

  handleCommentChange(event) {
    this.setState({ comment: event.target.value });
  }

  render() {

    return (
      <div className="modal">
        <div className="wrapper">
          <header>
            <div className="header-title">
              Create Invoice
            </div>
            <div className="header-line"/>
          </header>


          <section className="section-create">
            <form>
              <div className="form-container">
                <div className="form-group col-6">
                  <label htmlFor="invoiceNumber">Number</label>
                  <input type="text" placeholder="Number" id="invoiceNumber" value={this.state.invoiceNumber}
                         onChange={this.handleInvoiceNumberChange} />
                </div>

                <div className="form-group col-6">
                  <label htmlFor="invoiceDate">Invoice Date</label>
                  <DayPickerInput id="invoiceDate" onDayChange={this.handleInvoiceDateChange}
                                  dayPickerProps={{
                                    locale: 'ru',
                                    // localeUtils: MomentLocaleUtils,
                                  }}
                                  format="L"
                                  formatDate={formatDate}
                                  parseDate={parseDate}
                                  placeholder="Invoice date"
                                  value={this.state.invoiceDate}

                                  />
                </div>
              </div>

              <div className="form-container">
                <div className="form-group">
                  <label htmlFor="supplyDate">Supply Date</label>
                  <DayPickerInput id="supplyDate" onDayChange={this.handleSupplyDateChange}
                                  format="L"
                                  dayPickerProps={{
                                    locale: 'ru',
                                    // localeUtils: MomentLocaleUtils,
                                  }}
                                  formatDate={formatDate}
                                  parseDate={parseDate}
                                  placeholder="Supply date"
                                  value={this.state.supplyDate}
                                 />
                </div>
              </div>

              <div className="form-container">
                <div className="form-group col-12">
                  <label htmlFor="comment">Comment</label>
                  <textarea id="comment" placeholder="Comment" value={this.state.comment}
                            onChange={this.handleCommentChange} ></textarea>
                </div>
              </div>
            </form>

            <footer className="footer-save">
              <button className="btn-primary" type="button" onClick={this.closeModal}>Отмена</button>
              <button className="btn-primary" type="button" onClick={this.saveInvoice}>Сохранить</button>
            </footer>
          </section>
        </div>
      </div>
    );
  }
}

export default CreateModal;
