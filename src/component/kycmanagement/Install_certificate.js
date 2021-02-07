import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Install_Certificate(params) {
    return (
        <div id="install_certi" className="mt-2 ml-2 row">
            <div className="col-md-4">
                <Card style={{ width: '18rem' }} className="text-center">
                    <Card.Img variant="top" src="https://admin.nipponsecura.in/images/certificate.png" style={{ width: "50%" }} />
                    <Card.Body>
                        <Card.Title >Certificate</Card.Title>
                        <Button variant="primary">Generate Certificate</Button>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-md-4">
                <Card style={{ width: '18rem' }} className="text-center">
                    <Card.Img variant="top" src="https://admin.nipponsecura.in/images/guidilines_icon.png" style={{ width: "50%" }} />
                    <Card.Body>
                        <Card.Title >Certificate</Card.Title>
                        <Button variant="primary">Guidelines</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Install_Certificate;