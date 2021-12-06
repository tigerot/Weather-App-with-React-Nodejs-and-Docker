import React from 'react';

import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <header className="header-style"> 
        <div>Weather App By Suat Kuran</div>
      </header>
    );
  } 
}

export default Header;