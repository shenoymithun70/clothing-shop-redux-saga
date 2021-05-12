import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import CartItem from '../cart-item/cart-item.component';
import {selectCartItems} from '../../redux/cart/cart.selector'
import {createStructuredSelector} from 'reselect'

// import CustomButton from '../custom-button/custom-button.componet';
import {toggleCartHidden} from '../../redux/cart/cart.actions.js'
import {CartDropdownContainer , CartItemContainer , EmptyMessageContainer , CartDropdownButton } from './cart-dropdown.styles'

const CartDropdown = ({cartItems , history , dispatch}) => (
    <CartDropdownContainer>
        <CartItemContainer>
        {
            cartItems.length ?
            cartItems.map(cartItem => (<CartItem key={cartItem.id} item={cartItem} />)) :
            <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
        }
        </CartItemContainer>
         <CartDropdownButton onClick={() => {
             history.push("/checkout");
             dispatch(toggleCartHidden());
             }}>GO TO CHECKOUT</CartDropdownButton>
    </CartDropdownContainer>
)
 
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));