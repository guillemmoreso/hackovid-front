import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { withAuth } from '../../Context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const { username, password } = this.state;
      this.props.handleLogin({
        username,
        password,
      });
      toast.success(`Benvingut, ${username}!`);
    } catch (error) {
      console.error('Error while logging in');
    }
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="log-sign-container">
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <h1> Hackovid </h1>
        </Link>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="username" value={username} onChange={this.handleChange} placeholder="Nom d'usuari" />
          <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="Mot de pas" />
          <input type="submit" value="Entrar" className="btn" />
        </form>
        <p className="alternative">
          No tens compte encara?
          <Link to="/registre" style={{ textDecoration: 'none' }}>
            <span> Crear</span>
          </Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Login);
