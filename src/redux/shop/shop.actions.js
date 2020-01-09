import { ShopActionTypes } from './shop.types';

export const UpdateCollections = collections => {
    return {
        type : ShopActionTypes.UPDATE_COLLECTIONS,
        payload : collections
    }
}