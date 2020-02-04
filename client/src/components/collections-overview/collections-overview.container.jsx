import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from "reselect";
import {selectIsCollectionFetching,selectIsCollectionLoaded} from "../../redux/shop/shop.selectors";
import CollectionsOverview from "../collections-overview/collections-overview.component";
import WithSpinner from '../with-spinner/with-spinner.component';

const mapStateToProps = createStructuredSelector({
    isLoading : selectIsCollectionFetching
})

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
