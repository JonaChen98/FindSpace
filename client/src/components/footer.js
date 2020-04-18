import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return(
    <div className="footer">
      <div className="footer-content">
        <div className="copyright" style={{ marginTop: 7 }}>
          Copyright @ 2020 FindSpace Inc. All rights reserved
        </div>
        <div className="social-icons">
          <i class="fa fa-facebook-square fa-2x"></i>
          <i class="fa fa-instagram fa-2x"></i>
          <i class="fa fa-twitter fa-2x"></i>
        </div>
      </div>
    </div>
  );
}

export default Footer; 