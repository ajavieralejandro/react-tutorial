import React from "react";
import { Route } from "react-router-dom";
import {createStructuredSelector} from "reselect";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import {connect} from "react-redux";
import {fetchCollectionsStartAsync} from "../../redux/shop/shop.actions";
import withSpinner from "../../components/with-spinner/with-spinner.component";
import {selectIsCollectionFetching,selectIsCollectionsLoaded} from "../../redux/shop/shop.selectors";
import {CollectionPageContainer} from "../collection/collection.container";
import {CollectionsOverviewContainer} from "../../components/collections-overview/collections-overview.container";

class ShopPage extends React.Component{
 
 

  componentDidMount() {
    const {fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync();
    
  }


  render(){
    
      const {match,isCollectionLoaded,isCollectionFetching,collections} = this.props;
      console.log("El momento de la verdad  : ");
      console.log(isCollectionLoaded);
      
      const CollectionPageSpinner = withSpinner(CollectionPage);

    return (
      <div>
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} render={props=>{
         
          return <CollectionPageContainer otherProps={props} />;}} />
      </div>
    );    
  };
  
  }

  const mapStateToProps = createStructuredSelector({
    isCollectionLoaded : selectIsCollectionsLoaded,
  })

  const mapDispatchToProps = dispatch =>({
    fetchCollectionsStartAsync : () => dispatch(fetchCollectionsStartAsync())
  })
 
 
export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);
