import axios from "axios";
import React from "react";
import { Redirect } from "react-router-dom";

import emailjs from "emailjs-com";

type RegisterState = {
    email: any;
    name: any;
    password: any;
    conformpassword: any;
    redirect: boolean;
};
class Register extends React.Component {
    state: RegisterState = {
        email: "",
        name: "",
        password: "",
        conformpassword: "",
        redirect: false,
    };

    submitting = (e: any) => {
        e.preventDefault();

        if (this.state.conformpassword === this.state.password) {
            const user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            };
            axios.post("http://localhost:5000/auth/register", user).then(
                (response) => (
                    console.log(response.status === 201),
                    // history.state("/login")
                    emailjs
                        .sendForm(
                            "service_n14vx2z",
                            "template_a3a3nmo",
                            e.target,
                            "user_c1nAXTW57ERMZF3uDl4g2"
                        )
                        .then(
                            (result) => {
                                console.log(result.text);
                            },
                            (error) => {
                                console.log(error.text);
                            }
                        )
                )
            );

            this.setState({ redirect: true });
        }
    };

    redirecting = () => {
        if (this.state.redirect) {
            return <Redirect to="/login" />;
        }
    };

    change = (event: any) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <div className="container register-form">
                {this.redirecting()}
                <div className="form">
                    <div className="note">
                        <p>Register</p>
                    </div>

                    <div className="form-content">
                        <form onSubmit={this.submitting}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Your Name *"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.change}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Email Id *"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.change}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Your Password *"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.change}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Confirm Password *"
                                            name="conformpassword"
                                            value={this.state.conformpassword}
                                            onChange={this.change}
                                        />

                                        {this.state.conformpassword ===
                                        this.state.password ? null : (
                                            <p>Password is not Matching</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button className="btnSubmit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
