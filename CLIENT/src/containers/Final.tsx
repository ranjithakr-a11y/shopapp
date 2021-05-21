import React, { Component } from 'react'
import Column from '../components/Column'
import Row from '../components/Row'
export default class Final extends Component {
    render() {
        return (
            <Row>
            <Column size={12}>
                <div className="card">
                    <div className="card-title">
                        <h1 className="text-center text-success"><b>Your Order is Confirmed</b></h1>
                        <h5 className="text-center text-dark">Thank you for Shopping with Us</h5>
                    </div>
                </div>
            </Column>
        </Row>
    )
}
}