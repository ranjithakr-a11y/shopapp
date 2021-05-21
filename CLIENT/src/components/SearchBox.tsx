import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { StoreType } from "../types";
import SerachAction from "../store/actions/SearchAction";
type SearchProps = {
  searchChange: (code: string) => void;
};

class SearchBox extends React.Component<SearchProps> {
  render() {
    return (
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e:any) => this.props.searchChange(e.target.value)}
        />
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    searchChange: (data: string) =>
            dispatch(SerachAction.updateSearch(data)),
    };
};
export default connect(null, mapDispatchToProps)(SearchBox);