import React from 'react';
import './signin.css'
class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }


    onEmailChange = (e) => {
        this.setState({ signInEmail: e.target.value })
    }


    onPasswordChange = (e) => {
        this.setState({ signInPassword: e.target.value })
    }

    onSubmit = () => {
        console.log(this.state)
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })

            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })

    }





    render() {
        const { onRouteChange } = this.props
        const { onEmailChange, onPasswordChange, onSubmit } = this
        return (
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 center fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent w-100" type="email" name="email-address" onChange={onEmailChange} id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent w-100" type="password" name="password" onChange={onPasswordChange} id="password" />
                            </div>
                        </fieldset>
                        <div className="center">
                            <input onClick={onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" type="button" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3 center">
                            <a onClick={() => onRouteChange('signup')} href="#0" className="f4 link dim black db">Register</a>
                        </div>
                    </form>
                </main>
            </article>

        )
    }
}

export default SignIn;


