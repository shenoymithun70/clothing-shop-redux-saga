import React from "react";

import SignIn from '../../components/signin/singin.component.jsx';
import SignUp from '../../components/signup/signup.component.jsx';
// import './signin-and-signup.styles.scss'

import { SignInAndSignUpContainer } from './signin-and-signup.styles';

const SignInAndSignUpPage = () => (
    <SignInAndSignUpContainer>
    <SignIn />
    <SignUp />
  </SignInAndSignUpContainer>
)

export default SignInAndSignUpPage;