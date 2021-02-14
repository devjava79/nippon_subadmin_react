import QueryString from "qs";
import React from "react";
import Table from 'react-bootstrap/Table'
import $ from "jquery"

class ShowQrdetails extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        $("#navbar").addClass("d-none");
        $("#footer").addClass("d-none");
        let token = QueryString.parse(this.props.location.search, { ignoreQueryPrefix: true }).token
        console.log(token);
    }
    componentWillUnmount() {
        $("#navbar").removeClass("d-none");
        $("#footer").removeClass("d-none");
    }
   
    render() {
        return (
            <div className="row mt-4">
                <div className = "col-md-4 offset-md-4">
            <Table bordered  size="sm" >
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mark</td>
                        <td>Otto</td>
                    </tr>
                    <tr>
                        <td>Jacob</td>
                        <td>Thornton</td>
                    </tr>
                </tbody>
            </Table >
            </div>
            </div>
        );
    }
}

export default ShowQrdetails;