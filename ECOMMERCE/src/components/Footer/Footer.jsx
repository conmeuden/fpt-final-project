import "./style.css";

function Footer() {
  return (
    <footer id="footer" className="p-3">
      <div className="container footer-content">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-xl-4">
            <h3>Row header</h3>
            <ul>
              <li>link</li>
              <li>link</li>
              <li>link</li>
              <li>link</li>
            </ul>
          </div>
          <div className="col-sm-12 col-md-6 col-xl-4">
            {" "}
            <h3>Row header</h3>
            <ul>
              <li>link</li>
              <li>link</li>
              <li>link</li>
              <li>link</li>
            </ul>
          </div>
          <div className="col-sm-12 col-md-6 col-xl-4">
            {" "}
            <h3>Row header</h3>
            <ul>
              <li>link</li>
              <li>link</li>
              <li>link</li>
              <li>link</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
