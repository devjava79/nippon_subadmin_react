import React from "react";
import "./certificate.css";
import $ from "jquery"
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'

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
        this._isMounted = true;
        this.state.imei_details = this.props.location.state.imeiNo
        this.state.selected_copy = this.props.location.state.selected_copy
        $("#navbar").addClass("d-none");
        $("#footer").addClass("d-none");
        this.getCertificateData()

    }
    generateQrCode() {
        var qrcode = new window.QRCode(document.getElementById("qrcode"), {
            width: 150,
            height: 100
        });

        function makeCode() {
            var elText = document.getElementById("text");

            if (!elText.value) {
                alert("Input a text");
                elText.focus();
                return;
            }

            qrcode.makeCode(elText.value);
        }

        makeCode();

        $("#text").
            on("blur", function () {
                makeCode();
            }).
            on("keydown", function (e) {
                if (e.keyCode == 13) {
                    makeCode();
                }
            });
    }

    getCertificateData() {
        fetch("http://localhost:8080/generateRenewalCertificate", {
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
                    this.generateQrCode()
                }
            })
            .catch((error) => {
                this.props.history.push('/print_details')
                console.log(error)
            });
    }
    print_certifcateCmd(event) {
        event.preventDefault();
        $("#printBt").addClass("d-none");
        window.print()
    }

    componentWillUnmount() {
        this._isMounted = false;
        $("#navbar").removeClass("d-none");
        $("#footer").removeClass("d-none");
    }
    render() {
        return (
            <div className="ml-2 mr-2 " style={{ border: "2px solid" }}>
                <a id="printBt" onClick={this.print_certifcateCmd} href="#" >Print as Pdf</a>
                <div className="jumbotron" >
                    <div className="row text-center" style={{ width: "100%", padding: "0px" }}>
                        <div className="col-sm-10 text-left">
                            <img src="./images/nippon_logo_sample.jpg" className="imgstyle" style={{ height: "60px" }} />
                            <p style={{ fontSize: "13px" }}>
                                <b>NIPPON AUDIOTRONIX PVT LTD</b><br />
                                D-7,Sector-10,Noida-201301 U.P(INDIA) <br />
                                CINNO.:U74899DL1987PTC027312<br />
                                <b>GST NO</b>: _________________________<br />
                                <b>Help Line no</b>:1800 120 6532<br />
                                <b>Email</b>:customercare@nipponaudio.com
			                 </p>
                        </div>


                        <div className="col-sm-2 text-right">
                            <div>
                                <img alt="Not found" src="./images/NAPLSECURAHORIZONTAL.png"
                                    style={{ marginTop: "10px", width: "100%" }}></img>
                                <br ></br>
                                <center style={{ marginTop: "4px" }}>
                                    <div id="qrcode"></div>
                                </center>
                                <input id="text" type="hidden" onChange={this.handleChange} value={"http://localhost:3000/showQrdetails?token=" + this.state.responseData.token} style={{ width: "80%" }} /><br></br>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid bg-3">
                    <h3 className="text-center">{this.state.selected_copy}</h3>
                    <br />


                    <table cellSpacing="0" cellPadding="0" style={{ border: "0", width: "100%" }}>

                        <tbody>
                            <tr>
                                <th>Tac Reg.No/COP No</th><td><span>{this.state.responseData.validityDetails.tacRegNo}</span> <span>/ CC0GO 8020</span></td><th></th><th>SIM Renewed On</th><td>11-02-2020</td>
                            </tr>
                            <tr>
                                <th>Device Fitment Date:</th><td>{this.state.responseData.vehicleDetails.fitment_date}</td><th></th><th>SIM Renewal Date</th><td>{this.state.responseData.validityDetails.renewalDate}</td>
                            </tr>
                        </tbody>
                    </table>

                    <br />

                    <div className="row">
                        <div className="container text-center">
                            <h3>AIS-140 COMPLIANT VLT e-SIM/SERVICE RENEWAL CERTIFICATE</h3>
                        </div>
                    </div>
                    <br />
                    <div className="row ml-1" >
                        <table cellSpacing="0" cellPadding="0" style={{ border: "0", width: "100%" }}>

                            <tbody>
                                <tr>
                                    <th>Certificate NO:</th><td>{this.state.responseData.cert_serial_no}</td><th></th><th>Device Model No</th><td>{this.state.responseData.deviceDetails.device_model}</td>
                                </tr>
                                <tr>
                                    <th>Chassis No</th><td>{this.state.responseData.vehicleDetails.chassis_no}</td><th></th><th> GNSS Module</th><td>{this.state.responseData.deviceDetails.gps_make}</td>
                                </tr>
                                <tr>
                                    <th>Engine No</th><td>{this.state.responseData.vehicleDetails.engine_no}</td><th></th><th>VAHAN ID</th><td>{this.state.responseData.vehicleDetails.vahaan_id}</td>
                                </tr>
                                <tr>
                                    <th>Vehicle OEM</th><td>{this.state.responseData.vehicleDetails.vehicleOem}</td><th></th><th>Device IMEI</th><td>{this.state.imei_details}</td>
                                </tr>
                                <tr>
                                    <th>Vehicle Model</th><td>{this.state.responseData.vehicleDetails.vehicleType}</td><th></th><th>GSM Module </th><td>{this.state.responseData.deviceDetails.gsm_make}</td>
                                </tr>
                                <tr>
                                    <th>Vehicle Reg/Temp No:</th><td>{this.state.responseData.vehicleDetails.regNo}</td><th></th><th>ICCID</th><td>{this.state.responseData.deviceDetails.iccid}</td>
                                </tr>
                                <tr>
                                    <th>Voltage</th><td>{this.state.responseData.deviceDetails.ops_voltage}</td><th></th><th>Primary SIM </th><td>{this.state.responseData.validityDetails.primarySim}</td>
                                </tr>
                                <tr>
                                    <th>Panic Button Model</th><td>{this.state.responseData.deviceDetails.panic_button_make}</td><th></th><th>Secondary SIM </th><td>{this.state.responseData.validityDetails.secondarySim}</td>
                                </tr>
                                <tr>
                                    <th>Panic Button fitted</th><td>{this.state.responseData.vehicleDetails.switches}</td>
                                </tr>
                                <tr>
                                    <th>Device Inspected By</th><td>Nippon Audiotronix Pvt. Ltd</td>
                                </tr>
                            </tbody>

                        </table >
                    </div>
                </div><br />

                <div className="container-fluid bg-3 text-center">
                    <div className="row">

                        <div className="col-sm-3  offset-sm-1 border border-dark">
                            <img src="./images/Capture.png" alt="" style={{ width: "100%", height: "180px " }} />
                        </div>

                        <div className="col-sm-3 ml-3 border border-dark">
                            <img src="./images/Capture.png" alt="" style={{ width: "100%", height: "180px ", marginLeft: "10px" }} />
                        </div>


                        <div className="col-sm-3 ml-3 border border-dark">
                            <img src="./images/Capture.png" alt="" style={{ width: "100%", height: "180px ", marginLeft: "10px" }} />
                        </div>

                    </div>
                </div><br /><br />

                <footer className="container-fluid text-left">
                    <h6>This is certify that,AIS 140 compliant vehicle Location Tracking device
                    Services (SIM) has been renewed and Fitted device is
                        working fine in all manner .</h6>
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
                        <h6>I confirm that the device &amp; Panic Button (SOS) installation has been carried out to my
                        statisfaction and explained about the functionality of Device. I undertake that i will not tamper
			   the device &amp; Panic Button (SOS.)</h6>
                    </div>
                    <br />
                    <br />
                    <div className="row" style={{ fontSize: "18px" }}>
                        <div className="col-md-4" style={{ display: "inline-block" }}>
                            <b style={{ float: "left" }}>Customer Name:</b><p style={{ float: "right" }}>{this.state.responseData.name}</p>
                        </div>
                        <div className="col-md-4 offset-md-4" style={{ display: "inline-block" }}>
                            <b style={{ float: "left" }}>Contact/ Login ID:</b><p style={{ float: "right" }}>{this.state.responseData.primaryContact}</p>
                        </div>
                    </div>
                    <div className="row" style={{ fontSize: "18px" }}>
                        <div className="col-md-4" style={{ display: "inline-block" }}>
                            <b style={{ float: "left" }}>Customer Address:</b><p style={{ float: "right" }}>{this.state.responseData.address}</p>
                        </div>
                        <div className="col-md-4 offset-md-4" style={{ display: "inline-block" }}>
                            <b style={{ float: "left" }}>Customer Signature:</b><p style={{ float: "right" }}></p>
                        </div>
                    </div></footer>
            </div>
        );
    }
}
export default Certificate;