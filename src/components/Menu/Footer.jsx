
const Footer = () => {
    return (
      <footer>
        <div className="footer">
          <div className="footer__menu">
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/">About</a>
                    </li>
                    <li>
                      <a href="/">Contact</a>
                    </li>
                  </ul>
          </div>
          <div className="footer_about">
            <p>
            “Be yourself; everyone else is already taken.”
― Oscar Wilde
            </p>
          </div>
        </div>
        <div className="footer__copy">
                <p>
                  &copy; 2023 <a href="/">Egzaminas</a>. All rights reserved.
                </p>
              </div>
      </footer>
    );
  };
  
  export default Footer;