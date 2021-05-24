  
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CurrencyActions from "../store/actions/CurrencyActions";
import CurrencyExachangeService from "../services/CurrencyExchangeService";
import { CurrencyRateType } from "../types";

type CurrencyProps = {
  currencyChange: (code: CurrencyRateType) => void;
  theme?: "light" | "dark";
};

type State = {
  curCodeMap: Map<string, number>;
  currencyValue: number;
  value: number;
};

class Currency extends React.Component<CurrencyProps> {
  state: State = {
    curCodeMap: new Map<string, number>(),
    currencyValue: 1,
    value: 1,
  };

  async componentDidMount() {
    try {
      const { data } = await CurrencyExachangeService.getExchangeRate(); //should be data only the response is only data object
      const curCodeMap = data.rates;
      let convertedMap = new Map(Object.entries(curCodeMap)); //returns an array [key, value]
      this.setState({ curCodeMap: convertedMap });
    } catch (e) {
      console.log("error", e);
    }
  }

  render() {
    const codes = ["EUR", "USD", "CAD", "GBP", "INR", "AED", "AFN"];
    const bgcolor = this.props.theme === "dark" ? "text-light" : "text-dark";
    return (
      <div>
        <select
          onChange={(e) => {
            // console.log("inside the onchange func", this.state.curCodeMap);
            const value = this.state.curCodeMap.get(e.target.value);
            //setState takes a callback function, use it if you want to do any task after state is set
            //since setState is asynchronous it takes time, the lines next to it will get executed by the time it completes setting variables in state
            this.setState({ currencyValue: value }, () => {
              // console.log("cur value-- ", this.state.currencyValue);
              this.props.currencyChange({
                currencyCode: e.target.value,
                value: this.state.currencyValue,
              });
            });
          }}
          className={`form-control-sm ${bgcolor} bg-${this.props.theme}`}
        >
          {codes.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
    );
  }
}
// connect(what data to fetch from the store, what data to update inside the store)(component)
//define all data types correctly, see where it is defined string. Then change it to user defined datatype
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    currencyChange: (code: CurrencyRateType) =>
      dispatch(CurrencyActions.updateCurrency(code)),
  };
};
export default connect(null, mapDispatchToProps)(Currency);