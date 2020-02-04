import React,{useEffect,lazy,Suspense} from "react";
import { Route } from "react-router-dom";
import {connect} from "react-redux";
import {fetchCollectionsStart} from "../../redux/shop/shop.actions";




const ShopPage = ({fetchCollectionsStart,match}) => {

  const CollectionPageContainer = lazy(()=>import('../collection/collection.container'));
  const CollectionsOverviewContainer = lazy(()=> import('../../components/collections-overview/collections-overview.container'));

      useEffect(
        () => {
          fetchCollectionsStart()

        },[fetchCollectionsStart]
      )      

    return (
      <Suspense fallback={<div>...Loading</div>}>
      <div>
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} render={props=>{
         
          return <CollectionPageContainer otherProps={props} />;}} />
      </div>
      </Suspense>
    );    
  
  
  }


  const mapDispatchToProps = dispatch =>({
    fetchCollectionsStart : () => dispatch(fetchCollectionsStart())
  })
 
 
export default connect(null,mapDispatchToProps)(ShopPage);
