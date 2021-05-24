import axios from "axios";
import React from "react";
import Column from "../components/Column";
import { RouteComponentProps } from "react-router";
import StorageService from "../services/StorageService";
import { Redirect } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { CartType, StoreType, CurrencyRateType } from "../types";
import CartActions from "../store/actions/CartActions";

type Props = {
    cartData: CartType[];
    currency: CurrencyRateType;
    removeItem: any;
} & RouteComponentProps;
type State = {
};

class Cart extends React.Component<Props, State> {
    state = { change: false, reRender: false };


    render() {
        const allId: any = [];
        let allData: any = [];
        const datas = this.props.cartData;
        datas.map((data: any) => {
            if (allId.includes(data.productId) === false) {
                allData.push(data);
                allId.push(data.productId);
            }
        });

        const decQut = (e: any) => {
            allData.map((data: any) => {
                if (JSON.parse(e.target.value) === JSON.parse(data.productId)) {
                    if (data.productQty >= 2) {
                        data.productQty = JSON.parse(data.productQty) - 1;
                    }
                }
            });
            this.setState({ change: true });
        };

        const incQut = (e: any) => {
            allData.map((data: any) => {
                if (JSON.parse(e.target.value) === JSON.parse(data.productId)) {
                    data.productQty = JSON.parse(data.productQty) + 1;
                }
            });
            this.setState({ change: true });
        };

        const processSubmit = (e: any) => {
            e.preventDefault();

            const orderData = allData.filter(
                (data: any) => data.productQty >= 1
            );

            const dataPass = {
                products: JSON.stringify(orderData),
                totalAmount: allTotalAmount,
            };

            return StorageService.getData("token").then((token) =>
                axios
                    .post("http://localhost:5000/order", dataPass, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((res) =>
                        res.status === 201
                            ? this.setState({ reRender: true })
                            : this.setState({ reRender: false })
                    )
            );
        };
        const redirecting = () => {
            if (this.state.reRender === true) {
                return <Redirect to="/checkout" />;
            }
        };

        const removeItem = (e: any) => {
            console.log(e.target.value);
            let itemId = parseInt(e.target.value);
            console.log(itemId);
            this.props.removeItem(itemId);
        };

        let allTotalAmount: number = 0;
        return (
            <Column size={12}>
                <div className="container">
                    {redirecting()}
                    <h1 className="text-primary">Cart Details</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">product Image</th>
                                <th scope="col" className="col-3">
                                    Product Name
                          </th>
                                <th scope="col" className="col-2">
                                    Product Price
                          </th>
                                <th scope="col" className="col-2">
                                    Product Quantity
                          </th>
                                <th scope="col" className="col-2">
                                    Total Price
                          </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allData.map((data: any, index: number) => (
                                <tr key={data.productId}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <div className="imageDivThum">
                                            <img
                                                className="img-thumbnail"
                                                src={data.productImage}
                                                alt={data.productName}
                                            />
                                        </div>
                                    </td>
                                    <td>{data.productName}</td>
                                    <td>{this.props.currency.currencyCode} {data.productSalePrice}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger m-2"
                                            onClick={decQut}
                                            value={data.productId}
                                        >
                                            -
                                  </button>
                                        {data.productQty}
                                        <button
                                            className="btn btn-primary m-2"
                                            onClick={incQut}
                                            value={data.productId}
                                        >
                                            +
                                  </button>
                                    </td>
                                    <td>
                                        {this.props.currency.currencyCode}{" "}
                                        {data.productSalePrice *
                                            data.productQty}
                                        <p style={{ display: "none" }}>
                                            {
                                                (allTotalAmount =
                                                    allTotalAmount +
                                                    data.productSalePrice *
                                                    data.productQty)
                                            }
                                        </p>
                                    </td>
                                    <td>
                                        <button
                                            value={data.productId}
                                            className="btn-outline-danger btn"
                                            onClick={removeItem}
                                        >
                                            Remove Item
                                  </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className={"totalProductPrice"}>
                        Total Product Price <b> {this.props.currency.currencyCode} {allTotalAmount}</b>
                    </p>
                </div>
                <div className="container">
                    <button
                        className="btn btn-primary p-3"
                        onClick={processSubmit}
                    >
                        Proceed to Checkout
              </button>
                </div>
            </Column>
        );
    }
}

const mapStoreToProps = (store: StoreType) => {
    return {
        cartData: store.cart,
        currency: store.currency,

    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        removeItem: (itemId: number) =>
            dispatch(CartActions.removeItem(itemId)),
    };
};

export default connect(mapStoreToProps, mapDispatchToProps)(Cart);