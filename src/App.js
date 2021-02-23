import React from 'react';
import './App.css';
import {Switch , Route , Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'

import Homepage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/signin-and-signup/signin-and-signup.component.jsx'
import Header from './components/header/header.component.jsx';
import {auth , createUserProfileDocument , addCollectionAndDocuments} from './firebase/firebase.utils.js';
import {setCurrentUser } from './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selector'
import CheckoutPage from './pages/checkout/checkout.component.jsx'
import {selectCollectionsForPreview} from './redux/shop/shop.selector'



class App extends React.Component {
  // constructor() {
  //   super()
  
  //   this.state = {
  //     currentUser: null,
  //   }
  // }

  unsubscribeFromAuth = null;

  componentDidMount() {
  const {setCurrentUser } = this.props;
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
      setCurrentUser(userAuth);
      // addCollectionAndDocuments('collections' , collectionsArray.map(({title , items}) => ({title , items})))

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
          <Route  path="/shop" component={ShopPage}/>
          <Route  path="/checkout" component={CheckoutPage} />

          <Route  path="/signin" render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)}/>
        </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);  
