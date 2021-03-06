import { combineReducers } from "redux";
import { StoreType } from "../../types";
import cartReducer from "./CartReducer";
import searchReducer from "./SearchReducer";
import currencyReducer from "./CurrencyReducer";
import loadingReducer from "./LoadingReducer";
import userReducer from "./UserReducer";

const rootReducer = combineReducers<StoreType>({
    // data: reducer
    currency: currencyReducer,
    cart: cartReducer,
    userSession: userReducer,
    loading: loadingReducer,
    search: searchReducer,
});

export default rootReducer;