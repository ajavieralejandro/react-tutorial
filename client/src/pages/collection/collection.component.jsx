import React from "react";
import "./collection.styles.scss";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.component";
const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {collection.items.map(newItem => (
          <CollectionItem item={newItem} key={newItem.id} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  console.log("Ahora se pone picante...");
  console.log(props);
  console.log(state);
  
  return{
  collection: selectCollection(props.match.params.collectionId)(state)
}};

export default connect(mapStateToProps)(CollectionPage);
