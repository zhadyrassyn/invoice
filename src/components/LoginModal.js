import React, { Component } from 'react';

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };


  }

  closeLoginModal() {
    this.props.closeLoginModal();
  }

  login() {
    this.props.login(this.state.username, this.state.password);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <div className="login-modal">
        <div className="login-modal-content text-center">
          <div className="modal-header">
            <span className="close" onClick={this.closeLoginModal.bind(this)}>&times;</span>
            <h2>Login</h2>
          </div>
          <div className="modal-body">
            <input type="text" placeholder="username" onChange={this.handleChange.bind(this)} name="username"/>
            <input type="password" placeholder="password" onChange={this.handleChange.bind(this)} name="password"/>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={this.login.bind(this)}>Log me in!</button>
          </div>
        </div>

      </div>
    );
  }
}

export default LoginModal;