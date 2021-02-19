import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"

function Header() {
    return (
            <Navbar bg="dark" variant="dark" id="navbar">
                <Navbar.Brand href="#">Nippon</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
            </Navbar>
    );
}

export default Header;