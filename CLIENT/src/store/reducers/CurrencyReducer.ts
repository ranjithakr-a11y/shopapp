import { Action } from "redux";
import CurrencyActions from "../actions/CurrencyActions";
import { CurrencyRateType } from "../../types";

// reducer(store_data,action)
// state : initialise
interface IAction extends Action {
  code: CurrencyRateType;
}

const initial: CurrencyRateType = { currencyCode: "EUR", value: 1 };
function currencyReducer(
  store: CurrencyRateType = initial,
  action: IAction
): any {
  switch (action.type) {
    case CurrencyActions.ActionTypes.UPDATE_CURRENCY:
      return { ...store, ...action.code }; //{ code:action.code, value:action.value}
    default:
      //return current_store_data;
      return store;
  }
}
export default currencyReducer;