
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt aspernatur a obcaecati minus, ad magnam saepe quos voluptatibus id neque magni blanditiis nostrum pariatur consequatur aperiam. 
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