import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
function Home() {
    return (
        <div id="home" className="mt-2 ml-2 row">
            <Card style={{ width: '18rem' }} className="text-center">
                <Card.Img variant="top" src="https://admin.nipponsecura.in/images/print.png" style={{ width: "50%" }} />
                <Card.Body>
                    <Card.Title >Certificate</Card.Title>
                    <Link to="/install_certificate"><Button variant="primary">Installation Certificate</Button></Link>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Home;