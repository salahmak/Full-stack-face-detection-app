import React from 'react';

import Submit from '../submit/submit.jsx'
class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signInEmail: '',
            signInPassword: '',
            state: 'button'
        }
    }



    onEmailChange = (e) => {
        this.setState({ signInEmail: e.target.value })
    }


    onPasswordChange = (e) => {
        this.setState({ signInPassword: e.target.value })
    }

    onSubmit = () => {
        this.setState({ state: "loading" })
        document.getElementById('error-alert').innerHTML = ""
        fetch('https://nameless-shelf-05479.herokuapp.com/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');
                } else {
                    this.setState({ state: "button" })
                    document.getElementById('error-alert').innerHTML = `
          <div className="alert alert-danger center" role="alert">Please check your email / password and try again</div>`
                }
            })
    }






    render() {
        const { onRouteChange } = this.props
        return (
            <article className="form-style bg-white b--black-10  w-100 w-50-m w-25-l mw6 shadow-5 center">
                <div className="pa2 pb0">
                    <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
                    <div id="error-alert" className="center"></div>
                </div>

                <main className="pa4 pt0 black-80">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">

                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                className="pa2 input-reset ba bg-transparent  w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>

                            <input
                                className="b pa2 input-reset ba bg-transparent  w-100"
                                type="password"
                                name="password"
                                id="password"
                                onChange={this.onPasswordChange}
                            />


                        </div>
                    </fieldset>
                    <div className="">
                        <Submit
                            content="Sign in"
                            onClick={this.onSubmit}
                            state={this.state.state}
                        />
                    </div>
                    <div className="lh-copy mt3 f5">
                        <span>{"First time here ? Why not "}
                            <span onClick={() => onRouteChange('register')} className="link dim black pointer">Register</span> {" ?"} </span>
                    </div>
                </main>
            </article>

        )
    }
}

export default SignIn;


