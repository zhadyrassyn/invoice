import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddModalFlag: false,
    };

    this.showAddModal = this.showAddModal.bind(this);
  }

  showAddModal() {
    console.log('true ', true);
    this.setState({ showAddModalFlag: true });
  }

  render() {
    const {showAddModalFlag} = this.state;
    console.log('showAddModalFlag ', showAddModalFlag);
    return (
      <main>
        {showAddModalFlag &&
        <div id="myModal" className="modal">

          <div className="modal-content">
            <div className="modal-header">
              <span className="close">&times;</span>
              <h2>Modal Header</h2>
            </div>
            <div className="modal-body">
              <p>Some text in the Modal Body</p>
              <p>Some other text...</p>
            </div>
            <div className="modal-footer">
              <h3>Modal Footer</h3>
            </div>
          </div>

        </div>
        }
        <button type="button" onClick={this.showAddModal}>Add</button>
      </main>
    );
  }
}

export default App;
