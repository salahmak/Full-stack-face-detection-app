import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap'
import Submit from '../submit/submit.jsx'
import './signup.css'


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      buttonState: 'button'
    }

  }



  onNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  onSubmit = () => {
    this.setState({ buttonState: 'loading' })
    document.getElementById('error-alert').innerHTML = "";
    fetch('https://nameless-shelf-05479.herokuapp.com/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {

          localStorage.setItem('user', JSON.stringify(user));


          this.props.loadUser(user)
          this.props.onRouteChange('home');
        } else {
          this.setState({ buttonState: "button" })
          document.getElementById('error-alert').innerHTML = `
          <div className="alert alert-danger center" role="alert">Failed to register  please try again</div>`
        }
      })
  }

  render() {
    const {onNameChange, onEmailChange, onPasswordChange, onSubmit} = this;
    const {buttonState} = this.state;
    const {onRouteChange} = this.props;
    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Password requirements</Popover.Title>
        <Popover.Content>
          <ul>
            <li>Longer than 6 characters</li>
          </ul>
        </Popover.Content>
      </Popover>
    );
    return (
      <article className="form-style bg-white b--black-10  w-100 w-50-m w-25-l mw6 shadow-5 center">
        <div className="pa2 pb0">
          <legend className="f1 fw6 ph0 mh0 center">Register</legend>
          <div id="error-alert" className="center"></div>
        </div>

        <main className="pa4 pt0 black-80">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input
                className="pa2 input-reset ba bg-transparent w-100"
                type="text"
                name="name"
                id="name"
                onChange={onNameChange}
              />


            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent  w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <OverlayTrigger trigger="focus" placement="right" overlay={popover}>
                <input
                  className="b pa2 input-reset ba bg-transparent  w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={onPasswordChange}
                />
              </OverlayTrigger>

            </div>
          </fieldset>
          <div id="sumbit-btn">
            <Submit
              content="Register"
              onClick={onSubmit}
              state={buttonState}
            />
          </div>
          <div className="lh-copy mt3 f5">
            <span>{"Already registered ? "}
              <span onClick={() => onRouteChange('signin')} className="link dim black pointer">Login</span> {" instead"} </span>
          </div>
        </main>
      </article>

    );
  }
}

export default SignUp;



