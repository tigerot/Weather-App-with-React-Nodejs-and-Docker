import React from 'react';
import './Footer.css';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <footer className="footer_style"><div>Created by Suat Kuran</div></footer>
    );
  }
}

export default Footer;