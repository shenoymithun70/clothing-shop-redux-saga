import React from 'react'

import FormInput from '../form-input/form-input.component';
import './singin.styles.scss';
import SignInAndSignUpPage from '../../pages/signin-and-signup/signin-and-signup.component'
import CustomButton from '../custom-button/custom-button.componet';

import {signInWithGoogle} from  "../../firebase/firebase.utils.js"

class SignIn extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = (e) => {
        e.prventDefault();
        this.setState({email: '', password: ''})

    }

    handleChange = (e) => {
        const {value , name } = e.target;

        this.setState({ [name]: value})
    }
    render() {
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput handleChange={this.handleChange} name="email" type="email" value={this.state.email} required label='email'/>
                    
                    <FormInput handleChange={this.handleChange} name="password" type="password" value={this.state.password} required label='password'/>
                    <div className="buttons">
                    <CustomButton type="submit">Submit Form</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn >
                    Sign in with Google
                    </CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }

    
}
export default SignIn;