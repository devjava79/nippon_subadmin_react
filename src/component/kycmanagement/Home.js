import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
function Home() {
    return (
        <div id="home" className="row mt-2 ml-2">
                <div className = "col-md-3">
            <Card style={{ width: '18rem' }} className="text-center">
                <Card.Img variant="top" src="./images/certificate.jpg" style={{ width: "50%",marginLeft:"25%" }} />
                <Card.Body>
                    <Card.Title >Certificate</Card.Title>
                    <Link to="/print_options"><Button variant="primary">Renewal Certificate</Button></Link>
                </Card.Body>
            </Card>
            </div>
            <div className = "col-md-3">
            <Card style={{ width: '18rem' }} className="text-center">
                <Card.Img variant="top" src="./images/kyc.png" style={{ width: "50%",marginLeft:"25%" }} />
                <Card.Body>
                    <Card.Title >KYC</Card.Title>
                    <Link to="/kycdashboard"><Button variant="primary">KYC Dashboard</Button></Link>
                </Card.Body>
            </Card>
            </div>
            
        </div>
    );
}

export default Home;