import React from "react";
import "./certificate.css";
import $ from "jquery"
import Spinner from 'react-bootstrap/Spinner'

class Certificate extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            imei_details: '',
            selected_copy: '',
            responseData: {
                vehicleDetails: {},
                validityDetails: {},
                deviceDetails: {}
            },

        };
        //this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        console.log(this.props.location.state)
        this._isMounted = true;
        this.state.imei_details = this.props.location.state.imeiNo
        this.state.selected_copy = this.props.location.state.selected_copy
        $("#navbar").addClass("d-none");
        $("#footer").addClass("d-none");
        this.getCertificateData()
    }
    getCertificateData() {
        fetch("http://192.168.10.94:8080/generateCertificate", {
            method: "POST",
            body: JSON.stringify({
                imeiNo: this.state.imei_details,
                copyType: this.state.selected_copy
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Cannot Reprint Installation Certificate since the Device is not Registered/Approved");
                    this.props.history.push('/print_details')
                }
            })
            .then((responseJson) => {
                console.log(responseJson)
                if (this._isMounted) {
                    this.setState({
                        responseData: responseJson,
                        validityDetails: responseJson.validityDetails,
                        vehicleDetails: responseJson.vehicleDetails,
                        deviceDetails: responseJson.deviceDetails
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                this.props.history.push('/print_details')
            });
    }
    componentWillUnmount() {
        this._isMounted = false;
        $("#navbar").removeClass("d-none");
        $("#footer").removeClass("d-none");
    }
    render() {
        return (
            <div>
                <div className="jumbotron" >
                    <div className="row text-center" style={{ width: "100%", padding: "0px" }}>
                        <div className="col-sm-10 text-left">
                            <img src="./images/nippon_logo_sample.jpg" className="imgstyle" style={{ height: "60px" }} />
                            <p style={{ fontSize: "9px" }}>
                                NIPPON AUDIOTRONIX PVT LTD<br />
                                D-7,Sector-10,Noida-201301 U.P(INDIA),&nsp; <br />
                                Tel:+91-120-2555555,4266100,&nsp; Fax:+91-120-2527967<br />
                                Email:info@nipponaudio.com,&nsp; sales@nipponaudio.com,&nsp; sevice@@nipponaudio.com<br />
                                CINNO.:U74899DL1987PTC027312
			                 </p>
                        </div>


                        <div className="col-sm-2 text-right">
                            <div>


                                <img alt="Not found" src="./images/NAPLSECURAHORIZONTAL.png"
                                    style={{ marginTop: "10px", height: "60px" }}></img>
                                <br /><br />
                                <center>
                                    <img src="./images/qr.png" alt="Scan me"></img>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid bg-3">
                    <div className="row">
                        <div className="col-sm-4"><h6>Certificate Sl.No:&nbsp;{this.state.responseData.cert_serial_no}<br /></h6></div>
                        <div className="col-sm-4 text-center"><h5><u>{this.state.selected_copy}</u></h5></div>
                        <div className="col-sm-4 text-right"><h6>ISSUE DATE:&nbsp;&nbsp;{this.state.responseData.validityDetails.renewalDate}</h6></div>

                    </div>
                    <br />
                    <div className="row">
                        <div className="text-center">
                            <h5>AIS 140 COMPLIANT VLT INSTALLATION CERTIFICATE</h5>
                        </div>
                    </div>
                    <br />
                    <div className="row" >
                        <table style={{ border: "0", align: "center", width: "100%" }}>

                            <tbody>
                                <tr>
                                    <th colSpan="1">Vehicle Details</th><td></td><th>Device Details</th><td>&nbsp;</td><th>Validity Details</th><td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>Vahaan ID:</th><td>{this.state.responseData.vehicleDetails.vahaan_id}</td><th>Device Model</th><td>{this.state.responseData.deviceDetails.device_model}</td><th> TAC Validity</th><td>{this.state.responseData.validityDetails.tacValidity}</td>
                                </tr>
                                <tr>
                                    <th>Chassis No</th><td>{this.state.responseData.vehicleDetails.chassis_no}</td><th> Device IMEI No</th><td>{this.state.responseData.deviceDetails.device_imei_no}</td><th>COP Validity</th><td>{this.state.responseData.validityDetails.copValidity}</td>
                                </tr>
                                <tr>
                                    <th>Engine No</th><td>{this.state.responseData.vehicleDetails.engine_no}</td><th>ICCID</th><td>{this.state.responseData.deviceDetails.iccid}</td><th>Fitment Validity</th><td>{this.state.responseData.validityDetails.fitmentValidity}</td>
                                </tr>
                                <tr>
                                    <th>Fitment Date</th><td>{this.state.responseData.vehicleDetails.fitment_date}</td><th>GSM Make</th><td>{this.state.responseData.deviceDetails.gsm_make}</td><th> Primary SIM & Validity</th><td>{this.state.responseData.validityDetails.primarySimValidity}</td>
                                </tr>
                                <tr>
                                    <th>Dealer Name</th><td>{this.state.responseData.vehicleDetails.dealer_name}</td><th>GPS Make </th><td>{this.state.responseData.deviceDetails.gps_make}</td><th> Secondary SIM & Validity</th><td>{this.state.responseData.validityDetails.secondarySimValidity}</td>
                                </tr>
                                <tr>
                                    <th>Reg No:</th><td>{this.state.responseData.vehicleDetails.regNo}</td><th>Panic Button Make & Model</th><td>{this.state.responseData.deviceDetails.panic_button_make}</td><th> Service Validity</th><td>{this.state.responseData.validityDetails.serviceValidity} Year from date of Installation</td>
                                </tr>
                                <tr>
                                    <th>Switches</th><td>{this.state.responseData.vehicleDetails.switches}</td><th>Ops Voltage </th><td>{this.state.responseData.deviceDetails.ops_voltage}</td><th> Renewal Date</th><td> {this.state.responseData.validityDetails.renewalDate}</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div><br />

                <div className="container-fluid bg-3 text-center">
                    <div className="row">

                        <div className="col-sm-4">
                            <img src={this.state.responseData.fitment_image1} alt="No image found" />
                        </div>

                        <div className="col-sm-4">
                            <img src={this.state.responseData.fitment_image2} alt="No image found" />
                        </div>

                        <div className="col-sm-4">
                            <img src={this.state.responseData.fitment_image3} alt="No image found" />
                        </div>

                    </div>
                </div><br /><br />

                <footer className="container-fluid text-left">
                    <h6>This is certify that,AIS 140 compliant vehicle Location Tracking device with Panic button
                    (SOS) has been installed properly and found to be working fine in all manners at the time of
	   installation.</h6>
                    <h6>As per AIS 140 guideline device has been configured with State approved server.</h6>
                    <div className="row">
                        <br />
                        <div className="col-sm-10" align="left">
                            &nbsp;&nbsp; <img src="./images/NIPPONSTAMP.png" width="10%" /><br />
                            <b style={{ fontSize: "12px" }}>
                                Authorized Signatory
	   		</b>
                        </div>
                    </div>

                    <div align="center">
                        <h5><u>Undertaking</u></h5>
                    </div>
                    <br />
                    <div align="left">
                        <h6>&nbsp;&nbsp;&nbsp;&nbsp;I confirm that the device &amp; Panic Button (SOS) installation has been carried out to my
                        statisfaction and explained about the functionality of Device. I undertake that i will not tamper
			   the device &amp; Panic Button (SOS.)</h6>
                    </div>
                    <br />
                    <br />
                    <div className="row">
                        <div className="col-sm-8"> <h5>Signature of Owner/Representative</h5></div>
                        <div className="col-sm-4 text-right"> <h6>NAME:&nbsp;&nbsp;{this.state.responseData.name}</h6>
                            <h6>CONTACT/LOGIN ID:&nbsp;&nbsp;{this.state.responseData.contact}</h6>

                            <br />
                        </div>
                    </div></footer>
            </div>
        );
    }
}
export default Certificate;