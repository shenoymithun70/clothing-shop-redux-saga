import React from 'react'

import FormInput from '../form-input/form-input.component';
// import './singin.styles.scss';
// import SignInAndSignUpPage from '../../pages/signin-and-signup/signin-and-signup.component'
import CustomButton from '../custom-button/custom-button.componet';

import {auth ,signInWithGoogle} from  "../../firebase/firebase.utils.js"

import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
  } from './signin.styles.jsx';


class SignIn extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const {email , password} = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''})

        }  catch(error) {
            console.log("Sign in failed", error)
        }      


    }

    handleChange = (e) => {
        const {value , name } = e.target;

        this.setState({ [name]: value})
    }
    render() {
        return(
            <SignInContainer>
        <SignInTitle>I already have an account</SignInTitle>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          <ButtonsBarContainer>
            <CustomButton type='submit'> Sign in </CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign in with Google
            </CustomButton>
          </ButtonsBarContainer>
        </form>
      </SignInContainer>
        )
    }

    
}
export default SignIn;