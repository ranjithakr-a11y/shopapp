import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ProductType,CurrencyRateType } from "../types";
import formatter from "../utils/formatter";
import ImageWithFallback from "./ImageWithFallback";
import ProductPrice from "./ProductPrice";



type ProductProps = {
  pdata: ProductType;
  wishlist?: boolean;
  currencyCode: CurrencyRateType;
  btnClick: () => void;
};
class Product extends React.Component<ProductProps> {
  renderStock(stock: number) {
    if (stock <= 0) {
      return (
        <button disabled className="btn btn-sm w-100 btn-danger text-uppercase">
          <i className="far fa-frown"></i>Out of stock
        </button>
      );
    }
    return (
      <button
        onClick={() => this.props.btnClick()}
        className="btn btn-sm w-100 btn-primary text-uppercase"
      >
        <i className="fab fa-opencart"></i> Add to Cart
      </button>
      
    );
  }
  render() {
    const { pdata, wishlist, currencyCode } = this.props;
    let finalPrice: any = pdata.productPrice;
    let finalSalePrice: any = pdata.productSalePrice;
    return (
      <div className="p-4 shadow-sm text-center">
        <Link to={`/productdetail/${pdata.productId}`}>
          <ImageWithFallback classes={""} source={pdata.productImage} />
        </Link>
        <h5 className={"mt-4"}>{formatter.titlecase(pdata.productName)}</h5>
        <ProductPrice
          {...(currencyCode.currencyCode === "EUR"
            ? ((finalPrice = JSON.parse(pdata.productPrice) / 90),
              (finalSalePrice = JSON.parse(pdata.productSalePrice) / 90))
            : currencyCode.currencyCode === "USD"
            ? ((finalPrice = JSON.parse(pdata.productPrice) / 73),
              (finalSalePrice = JSON.parse(pdata.productSalePrice) / 73))
            : currencyCode.currencyCode === "CAD"
            ? ((finalPrice = JSON.parse(pdata.productPrice) / 60),
              (finalSalePrice = JSON.parse(pdata.productSalePrice) / 60))
            : currencyCode.currencyCode === "GBP"
            ? ((finalPrice = JSON.parse(pdata.productPrice) / 103),
              (finalSalePrice = JSON.parse(pdata.productSalePrice) / 103))
            : null)}
          price={finalPrice}
          salePrice={finalSalePrice}
          code={currencyCode.currencyCode}
        />
        {/* {<button>Add to {wishlist ? "Wishlist" : "Cart"}</button> } */}
        {this.renderStock(pdata.productStock)}
      </div>
    );
  }
}
export default Product;
