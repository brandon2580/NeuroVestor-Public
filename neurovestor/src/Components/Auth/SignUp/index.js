import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import '../Auth.css'
import { PasswordForgetLink } from '../PasswordForget';
import { SignInLink} from '../SignIn'
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../../constants/routes';
import * as ROLES from '../../../constants/roles';

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
        });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.OVERVIEW);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div>
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h2 className="header auth">Sign Up</h2>
              <form className="form-signin" onSubmit={this.onSubmit}>
                <div class="form-label-group">
                  <input name="username" type="text" id="inputUsername" value={username} onChange={this.onChange} class="form-control" placeholder="Full Name" required />
                  <label for="inputUsername">Full Name</label>
                </div>
                <div class="form-label-group">
                  <input name="email" id="inputEmail" value={email} onChange={this.onChange} type="text" class="form-control" placeholder="Email Address" required />
                  <label for="inputEmail">Email Address</label>
                </div>
                <div class="form-label-group">
                  <input name="passwordOne" id="inputPassword" value={passwordOne} onChange={this.onChange} class="form-control" type="password" placeholder="Password" required />
                  <label for="inputPassword">Password</label>
                </div>
                <div class="form-label-group">
                  <input name="passwordTwo" id="inputPasswordTwo" value={passwordTwo} onChange={this.onChange} class="form-control" type="password" placeholder="Confirm Password" required />
                  <label for="inputPasswordTwo">Confirm Password</label>
                </div>
                <button class="btn btn-lg btn-primary btn-block text-uppercase" disabled={isInvalid} type="submit">Sign Up</button>
                <hr class="my-4" />
                {error && <p>{error.message}</p>}
                <SignInLink />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p className="center">
    Don't have an account? <br /><Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink, };
