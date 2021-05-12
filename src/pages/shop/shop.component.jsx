import React from 'react';
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import CollectionsOvervieContainer from '../../components/collections-overview/collections-overview.container'
import CollectionPageContainer from '../collection/collection.container'
import { fetchCollectionsStart} from '../../redux/shop/shop.actions.js'

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
// const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class  ShopPage extends React.Component {


    componentDidMount() {
           const {fetchCollectionsStart} = this.props;
           fetchCollectionsStart();
    }

    render() {
        const {match  } = this.props
        return(
    
                <div className="shop-page">
                    <Route exact path={`${match.path}`} component={CollectionsOvervieContainer} 
                    /> 
                    <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}
                     />
                </div>
    
    
        )
            
    }
} 



const mapDispathchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})



export default connect(null , mapDispathchToProps)(ShopPage);