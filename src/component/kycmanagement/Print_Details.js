import Button from "react-bootstrap/Button";
import React from "react"
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";


class Print_Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imei_details: '',
            selected_copy: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitKycDetails = this.submitKycDetails.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value =  target.value
        this.setState({
            [name] : value
        });
    }
    submitKycDetails(e) {
        e.preventDefault();
          this.props.history.push({
              pathname: '/certificate',
              state: {"imeiNo":this.state.imei_details,"selected_copy":this.state.selected_copy}
            })
    }

    render() {
        return (

            <div className="col-md-4 pt-3 offset-md-4 mt-2 border border-dark" style={{ backgroundColor: "aliceblue" }}>
                <Form onSubmit={this.submitKycDetails} method="post">
                    <Form.Group controlId="exampleInputEmail1" >
                        <Form.Label>IMEI of Device</Form.Label>
                        <Form.Control type="text" placeholder="" autoComplete="autoComplete" value = {this.state.imei_details} onChange = {this.handleChange} name="imei_details" pattern="[0-9]{15}" maxLength="15" required="required" autoFocus="autofocus" />
                    </Form.Group>
                    <Form.Group controlId="exampleFormControlSelect1">
                        <Form.Label>Select Copy Type</Form.Label>
                        <Form.Control as="select" name="selected_copy" onChange = {this.handleChange} value = {this.state.selected_copy} required="required">
                            <option value="">None</option>
                            <option value="RTO COPY">RTO COPY</option>
                            <option value="MFG COPY">MANUFACTURER COPY</option>
                            <option value="DEALER COPY">DEALER COPY</option>
                            <option value="CUST COPY">CUSTOMER COPY</option>
                        </Form.Control>
                    </Form.Group>
                    <div className="container text-center pb-3">
                        <Button variant="primary" type="submit">
                            Submit
                    </Button>
                    </div>
                </Form>
            </div>

        );
    }

}



export default Print_Details;