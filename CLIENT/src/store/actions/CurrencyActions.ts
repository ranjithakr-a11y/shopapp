import { CurrencyRateType } from "../../types";

const ActionTypes = {
  UPDATE_CURRENCY: "[Currency] Update Currency",
};

const updateCurrency = (code: CurrencyRateType) => {
  //(code:string, value:number)
  return {
    type: ActionTypes.UPDATE_CURRENCY, // required, unique
    code, // payload (optional)  //code, value;
  };
};

export default { updateCurrency, ActionTypes };