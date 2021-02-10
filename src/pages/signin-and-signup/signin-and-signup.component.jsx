import React from "react";

import SignIn from '../../components/signin/singin.component.jsx';
import SignUp from '../../components/signup/signup.component.jsx';
import './signin-and-signup.styles.scss'

const SignInAndSignUpPage = () => (
    <div className="sign-in-and-sign-up">
       <SignIn />
       <SignUp />
    </div>
)

export default SignInAndSignUpPage;