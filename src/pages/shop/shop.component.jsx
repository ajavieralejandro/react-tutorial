import React from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import {connect} from "react-redux";
import {UpdateCollections} from "../../redux/shop/shop.actions";
import {firestore,convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils";
import withSpinner from "../../components/with-spinner/with-spinner.component";

class ShopPage extends React.Component{
  //unsubscribeFromSnapshot = null;
  state = {
    loading: true
  }
s
  componentDidMount() {
    const {UpdateCollections} = this.props;
    const collectionRef = firestore.collection('collections');
    collectionRef.onSnapshot(async snapshot=> {
      const toR = convertCollectionsSnapshotToMap(snapshot);
      UpdateCollections(toR);
      this.setState({loading : false});
      
    });
    
  }


  render(){
      const {match} = this.props;
      const {loading} = this.state;
      const CollectionsOverviewSpinner = withSpinner(CollectionsOverview);
      const CollectionPageSpinner = withSpinner(CollectionPage);

    return (
      <div>
        <Route exact path={`${match.path}`} render={props=>{
     
          return <CollectionsOverviewSpinner isLoading={loading} otherProps={props} />;}} />
        <Route path={`${match.path}/:collectionId`} render={props=>{
         
          return <CollectionPageSpinner isLoading={loading} otherProps={props} />;}} />
      </div>
    );
  };
  
  }

  export const mapDispatchToProps = dispatch =>({
    UpdateCollections : collectionsMap => dispatch(UpdateCollections(collectionsMap))  
  })
 
 
export default connect(null,mapDispatchToProps)(ShopPage);
