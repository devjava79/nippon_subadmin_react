import  "./footer.css";
function Footer() {
    return (
            <footer className="fixed-footer" id="footer">
                <div>
                    <a href="#">Nippon Audiotronix </a>
                    <span>&copy; 2021.</span>
                </div>
                <div className="ml-auto">
                    <span>Powered by </span>
                    <a href="#">Nippon</a>
                </div>
            </footer>
    );
}



export default Footer;