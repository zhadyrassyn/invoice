import React, {Component} from 'react';

  class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddModalFlag: false,
    };

    this.showAddModal = this.showAddModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
  }

  closeAddModal() {
    this.setState({ showAddModalFlag: false });
  }

  showAddModal() {
    console.log('true ', true);
    this.setState({ showAddModalFlag: true });
  }

  render() {
    const {showAddModalFlag} = this.state;
    return (
      <main>
        {showAddModalFlag &&
          <div className="modal">
            <div className="modal-header">
              <span className="close" onClick={this.closeAddModal}>&times;</span>
              <h2>Modal Header</h2>
            </div>
          </div>
        }

        <button type="button" onClick={this.showAddModal}>Add</button>
      </main>
    );
  }
}

export default App;
