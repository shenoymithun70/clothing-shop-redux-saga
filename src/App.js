import React from 'react';
import './App.css';
import {Switch , Route} from 'react-router-dom';

import Homepage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/signin-and-signup/signin-and-signup.component.jsx'
import Header from './components/header/header.component.jsx';
import {auth , createUserProfileDocument } from './firebase/firebase.utils.js';



class App extends React.Component {
  constructor() {
    super()
  
    this.state = {
      currentUser: null,
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
  this.unsubscribeFromAuth =  auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
          console.log(this.state);
        })
        
      }
      else {
        this.setState({ currentUser: userAuth})
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
        <Header currentUser= {this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route exact path="/shop" component={ShopPage}/>
          <Route exact path="/signin" component={SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
  
}

export default App;  
