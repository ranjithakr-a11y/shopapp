import axios from "axios";
import constants from "../constants";
import { ExchangeCurrencyType } from "../types";

const getExchangeRate = () => {
  const url = `${constants.EXCHANGE_RATES_URL}`;
  return axios.get<ExchangeCurrencyType>(url);
};

export default { getExchangeRate };