import React from 'react';
import './App.css';
import {Switch , Route , Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Homepage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/signin-and-signup/signin-and-signup.component.jsx'
import Header from './components/header/header.component.jsx';
import {auth , createUserProfileDocument } from './firebase/firebase.utils.js';
import {setCurrentUser } from './redux/user/user.actions'



class App extends React.Component {
  // constructor() {
  //   super()
  
  //   this.state = {
  //     currentUser: null,
  //   }
  // }

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
  this.unsubscribeFromAuth =  auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          // this.setState({
          //   currentUser: {
          //     id: snapshot.id,
          //     ...snapshot.data()
          //   }
          // })
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          }) 
          // console.log(this.state);
        })
        
      }
      else {
        setCurrentUser(userAuth);
      }
      // this.setState({currentUser : user});
      // console.log(user);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div >
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route exact path="/shop" component={ShopPage}/>
          <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)}/>
        </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);  
