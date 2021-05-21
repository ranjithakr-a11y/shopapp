// // import axios from "axios";
// // import React from "react";
// // import { connect } from "react-redux";
// // import { RouteComponentProps } from "react-router";
// // import Column from "../components/Column";
// // import StorageService from "../services/StorageService";
// // import { CartType } from "../types";
// // import { BrowserRouter, NavLink, Redirect, useHistory } from "react-router-dom";

// type Props = {
//     cartData: any,
// } & RouteComponentProps;
// type State = {};

// class Cart extends React.Component < Props, State > {
//     state = { change: false, reRender: false };

//     render() {
//         const allId: any = [];
//         let allData: any = [];
//         const datas = this.props.cartData.cart;
//         let finaldata = datas.map((data: any, index: number, arr: any) => {
//             if (allId.includes(data.productId) === false) {
//                 allData.push(data);
//                 allId.push(data.productId);
//             }
//         });

//         const decQut = (e: any) => {
//             let dataForFilter = allData.map((data: any, index: number, arr: any) => {
//                 if (JSON.parse(e.target.value) === JSON.parse(data.productId)) {
//                     data.productQty = JSON.parse(data.productQty) - 1;
//                 }
//             });
//             this.setState({ change: true });
//         };

//         const incQut = (e: any) => {
//             allData.map((data: any, index: number, arr: any) => {
//                 if (JSON.parse(e.target.value) === JSON.parse(data.productId)) {
//                     data.productQty = JSON.parse(data.productQty) + 1;
//                 }
//             });
//             this.setState({ change: true });
//         };

//         const processSubmit = (e: any) => {
//             e.preventDefault();

//             const orderData = allData.filter((data: any) => data.productQty >= 1);

//             const dataPass = {
//                 products: JSON.stringify(orderData),
//                 totalAmount: allTotalAmount,
//             };

//             return StorageService.getData("token").then((token) =>
//                 axios
//                 .post("http://localhost:5000/order", dataPass, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 })
//                 .then((res) =>
//                     res.status === 201 ?
//                     this.setState({ reRender: true }) :
//                     this.setState({ reRender: false })
//                 )
//             );
//         };
//         const redirecting = () => {
//             if (this.state.reRender === true) {
//                 return <Redirect to = "/checkout" / > ;
//             }
//         };

//         let allTotalAmount: number = 0;
//         return ( <
//             Column size = { 12 } >
//             <
//             div className = "container" > { " " } { redirecting() } < h1 className = "text-primary" > Cart Details < /h1>{" "} <
//             table className = "table" >
//             <
//             thead >
//             <
//             tr >
//             <
//             th scope = "col" > # < /th> <th scope="col"> product Id </th > { " " } <
//             th scope = "col" > Product Name < /th>{" "} <
//             th scope = "col" > Product Price < /th>{" "} <
//             th scope = "col" > Product Quantity < /th>{" "} <
//             th scope = "col" > Total Price < /th>{" "} < /
//             tr > { " " } <
//             /thead>{" "} <
//             tbody > { " " } {
//                 allData.map((data: any, index: number) =>
//                     data.productQty > 0 ? ( <
//                         tr key = { data.productId } >
//                         <
//                         th scope = "row" > { index + 1 } < /th>{" "} <
//                         td > { data.productId } < /td> <td> {data.productName} </td > { " " } <
//                         td > INR { data.productSalePrice } < /td>{" "} <
//                         td >
//                         <
//                         button className = "btn btn-danger m-2"
//                         onClick = { decQut }
//                         value = { data.productId } >
//                         -
//                         <
//                         /button>{" "} { data.productQty } { " " } <
//                         button className = "btn btn-primary m-2"
//                         onClick = { incQut }
//                         value = { data.productId } >
//                         +
//                         <
//                         /button>{" "} < /
//                         td > { " " } <
//                         td >
//                         INR { data.productSalePrice * data.productQty } { " " } <
//                         p style = {
//                             { display: "none" }
//                         } > { " " } {
//                             (allTotalAmount =
//                                 allTotalAmount +
//                                 data.productSalePrice * data.productQty)
//                         } { " " } <
//                         /p>{" "} < /
//                         td > { " " } <
//                         /tr>
//                     ) : null
//                 )
//             } { " " } <
//             /tbody>{" "} < /
//             table > { " " } <
//             p className = { "totalProductPrice" } >
//             Total Product Price < b > INR { allTotalAmount } < /b>{" "} < /
//             p > { " " } <
//             /div>{" "} <
//             div className = "container" >
//             <
//             button className = "btn btn-primary p-3"
//             onClick = { processSubmit } >
//             Proceed to Checkout { " " } <
//             /button>{" "} < /
//             div > { " " } <
//             /Column>
//         );
//     }
// }

// const mapStoreToProps = (store: CartType) => {
//     return {
//         cartData: store,
//     };
// };

// export default connect(mapStoreToProps, null)(Cart);













import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps, NavLink } from "react-router-dom";
//import Column from "../components/Column";
//import ImageWithFallback from "../components/ImageWithFallback";
//import Row from "../components/Row";

//import { CartType, StoreType } from "../types";
//import formatter from "../utils/formatter";
//import Container from "../components/Container";
import { type } from "os";
import { count } from "console";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
type Props = {
    cartItem: CartType[];
} & RouteComponentProps;

type State = {
    count: number,
    deleteCartData: any,
    qty: any
}
class Cart extends Component<Props, State> {
    state: State = {
        count: 0,
        deleteCartData: this.props.cartItem,
        qty: 0
    }

    // mapQuantity = () => {
    //     this.props.cartItem.map((val) => {
    //         const pQty = val.productQty;
    //         this.setState({
    //             qty: (pQty)
    //         })
    //     })
    // }
    incrementQty = () => {
        this.setState({
            count: (this.state.count + 1)
        });
    }
    decrementQty = () => {
        this.setState({
            count: (this.state.count - 1)
        })
    }

    deleteItem = () => {
        console.log(this.props.cartItem);
        const delteData = this.props.cartItem;
        delteData.pop();
        this.setState({
            deleteCartData: (delteData)
        })
    }

    render() {
        console.log("initial", this.state.count)
        return (
            <Container>
                <Row>
                    <Column size={8}>
                        <div className="jumbotron text-center">
                            <h1 className="display-5 fw-bold text-primary">CART LIST</h1>
                        </div>
                    </Column>
                </Row>
                <Row>
                    <div className="col-md-8">
                        {this.props.cartItem.map((data) => (
                            <Column
                                size={4}
                                classes={
                                    "d-flex justify-content-between align-items-center mt-1 shadow-lg ms-1  w-100 "
                                }
                            >
                                <Link to={`/productdetail/${data.productId}`}>
                                    <div className="col-md-8">
                                        <ImageWithFallback
                                            source={data.productImage}
                                            classList={" img-thumbnail rounded float-start"}
                                        />
                                    </div>
                                </Link>
                                <div className="d-flex  align-items-center flex-column col-md-">
                                    <h5 className="my-5 mb-5 display-6 text-center text-secondary fw-bold " >
                                        {formatter.titlecase(data.productName)}
                                    </h5>

                                    <p className=" text-success  display-7 fw-bold">Sale Price:   <i className="fas fa-rupee-sign text-danger "></i> {data.productSalePrice}</p>
                                    <div className="d-flex">
                                        <div >

                                            <button className="btn btn-primary  fw-bold" onClick={this.incrementQty}>+</button>
                                        </div>
                                        <div className="m-2">
                                            <p className="mb-5 display-7 fw-bold"> {this.state.count}</p>
                                            {/* <p className="mb-5 display-7 fw-bold">intial {data.productQty}</p> */}
                                        </div>
                                        <div>

                                            <button className="btn btn-info fw-bold" onClick={this.decrementQty}>-</button>
                                        </div>
                                    </div>
                                    <p className="mb-5 text-danger  display-6 ">Total Prize:   <i className="fas fa-rupee-sign text-success "></i> {data.productPrice}</p>
                                </div>

                                <div className="mt-5  pb-0 mb-1 bg-dark text-warning rounded ">
                                    <button className="btn btn-info fw-bold" onClick={this.deleteItem}><i className="fas fa-trash display-7"></i></button>
                                </div>

                                <div className="btn d-flex align-items-start flex-column"></div>
                                {/* <NavLink to={"/payment"}>

                                <button className="btn btn-success p-3">Proced To Check Out</button>

                            </NavLink> */}

                            </Column>
                        ))}
                    </div>
                </Row>
                <NavLink to={"/payment"}>
                    <div className='align-items-center'>
                        <button className="btn btn-success p-3">Proced To Check Out</button>
                    </div>
                </NavLink>
            </Container>
        );
    }
}

const mapStoreDataToProps = (state: StoreType) => {
    return {
        cartItem: state.cart,
    };
};

export default connect(mapStoreDataToProps)(Cart);