import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faMoon as solidMoon } from '@fortawesome/free-solid-svg-icons';
import { faMoon as thinMoon } from '@fortawesome/free-regular-svg-icons';
import logo from '../assets/photos/logo.png';
import './NavbarStyles.css';

class Navbar extends Component {
  state = { 
    clicked: false, 
    showLoginForm: false, 
    email: '', 
    password: '', 
    isCreatingAccount: false, 
    showDropdown: false 
  };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  handleNavigation = (route) => {
    const { quizStarted, setShowExitQuizAlert, setPendingRoute } = this.props;

    if (quizStarted) {
      setPendingRoute(route);
      setShowExitQuizAlert(true);
    } else {
      window.location.href = route; 
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLogin = (event) => {
    event.preventDefault();
    const { email, password, isCreatingAccount } = this.state;
    
    if (isCreatingAccount) {
      axios.post('http://localhost:5000/auth/register', { email, password })
        .then(response => {
          console.log(response.data.message);
          this.props.onLogin({ email });
          this.setState({ showLoginForm: false, isCreatingAccount: false });
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    } else {
      axios.post('http://localhost:5000/auth/login', { email, password })
        .then(response => {
          console.log(response.data.message);
          this.props.onLogin({ email });
          this.setState({ showLoginForm: false });
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    }
  };

  toggleLoginForm = () => {
    this.setState({ showLoginForm: !this.state.showLoginForm });
  };

  toggleDropdown = () => {
    this.setState({ showDropdown: !this.state.showDropdown });
  };

  handleCheckboxChange = () => {
    this.setState({ isCreatingAccount: !this.state.isCreatingAccount });
  };

  render() {
    const { isAuthenticated, user, onLogout, isDarkMode, toggleDarkMode } = this.props;
    const { email, password, showLoginForm, showDropdown, isCreatingAccount } = this.state;

    const userInitial = user && user.email ? user.email.charAt(0).toUpperCase() : '';

    return (
      <>
        <nav className={`navbar ${isDarkMode ? 'dark-mode' : ''}`}>
          <Link to="/" onClick={() => this.handleNavigation("/")}>
            <img src={logo} alt="Logo" style={{ width: '50px', height: 'auto' }} />
          </Link>

          <div>
            <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
              <li><Link to="/" onClick={() => this.handleNavigation("/")}>Home</Link></li>
              <li><Link to="/learn-more" onClick={() => this.handleNavigation("/learn-more")}>Learn more</Link></li>
              <li>
                {isAuthenticated ? (
                  <div className="user-icon" onClick={this.toggleDropdown}>
                    {userInitial}
                    {showDropdown && (
                      <div className="dropdown">
                        <Link to="/profile" className="dropdown-item">Your profile</Link>
                        <button onClick={onLogout} className="dropdown-item">Logout</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button onClick={this.toggleLoginForm} className="custom-login-button">Login</button>
                )}
              </li>
              <li>
                <FontAwesomeIcon
                  icon={isDarkMode ? solidMoon : thinMoon}
                  onClick={toggleDarkMode}
                  style={{ cursor: 'pointer', fontSize: '24px' }}
                />
              </li>
            </ul>
          </div>

          <div id="mobile" onClick={this.handleClick}>
            <FontAwesomeIcon icon={this.state.clicked ? faTimes : faBars} id="bar" />
          </div>
        </nav>

        {showLoginForm && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-button" onClick={this.toggleLoginForm}>&times;</span>
              <form onSubmit={this.handleLogin} className="login-form">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                  placeholder="Email"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleInputChange}
                  placeholder="Password"
                  required
                />
                <label>
                  <input 
                    type="checkbox" 
                    checked={isCreatingAccount} 
                    onChange={this.handleCheckboxChange}
                  />
                  Create a new account
                </label>
                <button type="submit" className="custom-login-button">
                  {isCreatingAccount ? 'Sign Up' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Navbar;
