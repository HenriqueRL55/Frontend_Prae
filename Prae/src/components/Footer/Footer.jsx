import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content flex flex-sb">
        <div className="footer-left">
          Desenvolvido por{" "}
          <a
            href="https://www.linkedin.com/in/henrique-lengruber-4649a41b0/"
            target="_blank"
            rel="noreferrer"
          >
            Henrique Lengruber
          </a>{" "}
          e{" "}
          <a
            href="https://www.linkedin.com/in/vinicius-dutra-22b0a1220/"
            target="_blank"
            rel="noreferrer"
          >
            Vinicius Dutra
          </a>
        </div>
        <div className="footer-right">Universidade Federal de Santa Maria</div>
      </div>
    </footer>
  );
};

export default Footer;
