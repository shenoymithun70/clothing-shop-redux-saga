import React from 'react'
import { connect } from 'react-redux'

import {toggleCartHidden} from '../../redux/cart/cart.actions';
import {createStructuredSelector} from 'reselect'

// import './cart-icon.styles.scss';

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import {selectCartItemCount} from '../../redux/cart/cart.selector'
import {CartIconContainer , ShoppingIconContainer , ItemCountContainer} from './cart-icon.styles'


const CartIcon = ( {toggleCartHidden, itemCount}) => (
    <CartIconContainer onClick={toggleCartHidden}>
        <ShoppingIconContainer/>
        <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartIconContainer>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemCount
})

export default connect(mapStateToProps ,mapDispatchToProps)(CartIcon);