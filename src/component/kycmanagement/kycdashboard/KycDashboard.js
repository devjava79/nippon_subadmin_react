import React from "react";
import $ from "jquery"
import DataTable from "datatables.net"
import  "./kycDashboard.css";

class Kycdashboard extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        $("#footer").addClass("d-none");
        let t = $('#kyc_management').DataTable({
            ajax:{
                url:"http://localhost:8080/getAllKycData",
                dataSrc:''
            },
            columns: [
                {data:"serialNo"},
                {data:"state"},
                {data:"vehicleOem"},
                {data:"device_imei_no"},
                {data:"iccid"},
                {data:"chassis_no"},
                {data:"name"},
                {data:"primaryContact"},
                {data:"planName"}
            ]
        });
        t.on( 'order.dt search.dt', function () {
            t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();
    }
    componentWillUnmount() {
        this._isMounted = false;
        $("#footer").removeClass("d-none");
        $('#kyc_management').DataTable().destroy(true);
    }
    render() {
        return (
                <div id = "kyc" className = "row mt-2">
                <div className="col-md-10 offset-md-1">
                    <h3>Kyc Dashboard</h3><br></br>
                    
                    <table className = "display table-responsive compact cell-border" id="kyc_management">
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>State</th>
                                <th>OEM</th>
                                <th>IMEI</th>
                                <th>ICCID</th>
                                <th>Vehicle Chassis Number</th>
                                <th>Client Name</th>
                                <th>Contact Number</th>
                                <th>SIM Project Name</th>
                                <th>Expiry Date Time</th>
                                <th>Days remaining for renewal</th>
                                <th>Last Notification Date</th>
                                <th>Renewal Certificate</th>
                                <th>Installation Certificate</th>
                            </tr>
                        </thead>
                    </table>
                    <br></br>
                </div>
                </div>
        );
    }
}

export default Kycdashboard;