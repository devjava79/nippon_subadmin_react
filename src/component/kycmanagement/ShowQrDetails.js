import QueryString from "qs";
import React from "react";
import Table from 'react-bootstrap/Table'
import $ from "jquery"
import { Link } from "react-router-dom";

class ShowQrdetails extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            responseData: {
                deviceDetailsInfo: {},
                qrcodeCustomerDetails: {}
            },
            formattedDateOfReg: ''
        };
    }
    componentDidMount() {
        this._isMounted = true;
        $("#navbar").addClass("d-none");
        $("#footer").addClass("d-none");
        let token = QueryString.parse(this.props.location.search, { ignoreQueryPrefix: true }).token
        this.getQrDetails(token)
    }
    componentWillUnmount() {
        this._isMounted = false;
        $("#navbar").removeClass("d-none");
        $("#footer").removeClass("d-none");
    }
   
    getQrDetails(token) {
        fetch("http://localhost:8080/getQrCodeDetails", {
            method: "POST",
            body: JSON.stringify({
                token: token,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("No device found")
                }
            })
            .then((responseJson) => {
                if (this._isMounted) {
                    this.setState({
                        responseData: responseJson,
                        deviceDetailsInfo: responseJson.deviceDetailsInfo,
                        qrcodeCustomerDetails: responseJson.qrcodeCustomerDetails,
                        formattedDateOfReg: responseJson.qrcodeCustomerDetails.dateOfReg.substring(0,10)
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
        return (
            <div className="row mt-4">
                <div className = "col-md-4 offset-md-4">
                    <h3>CUSTOMER DETAILS</h3>
            <Table bordered responsive="sm" size="sm" >
                    <tr>
                        <th>NAME</th>
                        <th>{this.state.responseData.qrcodeCustomerDetails.name}</th>
                    </tr>
                <tbody>
                    <tr>
                        <td>PRIMARY CONTACT</td>
                        <td>{this.state.responseData.qrcodeCustomerDetails.pcontact}</td>
                    </tr>
                    <tr>
                        <td>SECONDARY CONTACT</td>
                        <td>{this.state.responseData.qrcodeCustomerDetails.scontact}</td>
                    </tr>
                    <tr>
                        <td>ADDRESS</td>
                        <td>{this.state.responseData.qrcodeCustomerDetails.address}</td>
                    </tr>
                    <tr>
                        <td>CITY</td>
                        <td>{this.state.responseData.qrcodeCustomerDetails.city}</td>
                    </tr>
                    <tr>
                        <td>STATE</td>
                        <td>{this.state.responseData.qrcodeCustomerDetails.state}</td>
                    </tr>
                    <tr>
                        <td>PIN</td>
                        <td>{this.state.responseData.qrcodeCustomerDetails.pin}</td>
                    </tr>
                    <tr>
                        <td>EMAIL</td>
                        <td>{this.state.responseData.qrcodeCustomerDetails.email}</td>
                    </tr>
                    <tr>
                        <td>IMEI</td>
                        <td>{this.state.responseData.qrcodeCustomerDetails.deviceID}</td>
                    </tr>
                    <tr>
                        <td>VEHICLE REGISTRATION NUMBER</td>
                        <td>{this.state.responseData.qrcodeCustomerDetails.vehicleNum}</td>
                    </tr>
                    <tr>
                        <td>AADHAR NUMBER</td>
                        <td>{this.state.responseData.qrcodeCustomerDetails.aadhaarNo}</td>
                    </tr>
                    <tr>
                        <td>VEHICLE OEM</td>
                        <td>{this.state.responseData.qrcodeCustomerDetails.vehicleOEM}</td>
                    </tr>
                    <tr>
                        <td>VEHICLE TYPE</td>
                        <td>{this.state.responseData.qrcodeCustomerDetails.vehicleType}</td>
                    </tr>
                    <tr>
                        <td>VIN</td>
                        <td>{this.state.responseData.qrcodeCustomerDetails.vin}</td>
                    </tr>
                    <tr>
                        <td>DATE OF DEVICE REGISTRATION</td>
                        <td>{this.state.formattedDateOfReg}</td>
                    </tr>
                    <tr>
                        <td>ICCID</td>
                        <td>{this.state.responseData.qrcodeCustomerDetails.iccid}</td>
                    </tr>
                    <tr>
                        <td>ENGINE NO</td>
                        <td>{this.state.responseData.qrcodeCustomerDetails.engineNo}</td>
                    </tr>
                    <tr>
                        <td>DEVICE MODEL NUMBER</td>
                        <td>{this.state.responseData.deviceDetailsInfo.device_model}</td>
                    </tr>
                    <tr>
                        <td>TYPE APPROVAL CERT.NO</td>
                        <td>AK9012</td>
                    </tr>
                    <tr>
                        <td>LAST UPDATED ON</td>
                        <td>{this.state.responseData.last_update_time}</td>
                    </tr>
                </tbody>
            </Table >
            <a href = {"https://maps.mapmyindia.com/@"+this.state.responseData.latitude+","+this.state.responseData.longitude}><p>TO VIEW CURRENT LOCATION OF VEHICLE CLICK HERE</p></a>
            </div>
            </div>
        );
    }
}

export default ShowQrdetails;