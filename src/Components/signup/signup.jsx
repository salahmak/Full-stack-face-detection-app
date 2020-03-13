import React from 'react';
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signUpEmail: '',
            signUpPassword: '',
            signUpName: ''
        }

    }



    onEmailChange = (e) => {
        this.setState({ signUpEmail: e.target.value })
    }


    onPasswordChange = (e) => {
        this.setState({ signUpPassword: e.target.value })
    }

    onNameChange = (e) => {
        this.setState({ signUpName: e.target.value })
    }

    onSubmit = () => {
        fetch('https://abalone-darkened-celsius.glitch.me/register', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.state.signUpEmail,
                password: this.state.signUpPassword,
                name: this.state.signUpName
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }
            })
    }





    render() {
        const { onRouteChange } = this.props
        const { onEmailChange, onNameChange, onPasswordChange, onSubmit } = this
        return (
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 center fw6 ph0 mh0">Sign up</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f5" for="username">Username</label>
                                <input className="pa2 input-reset ba bg-transparent w-100" type="text" name="username" onChange={onNameChange} id="username" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f5" for="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent     w-100" type="email" name="email-address" onChange={onEmailChange} id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f5" for="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent     w-100" type="password" name="password" onChange={onPasswordChange} id="password" />
                            </div>
                        </fieldset>
                        <div className="center">
                            <input onClick={onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" type="button" value="Register Now" />
                        </div>
                        <div className="lh-copy mt3 center">
                            <a onClick={() => onRouteChange('signin')} href="#0" className="f4 link dim black db">Sign in</a>
                        </div>
                    </form>
                </main>
            </article>

        );
    }
}

export default SignUp;



