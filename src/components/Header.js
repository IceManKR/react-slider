// src/components/Header.js
import React from 'react';
import '../styles/Header.css'; // Correct path to Header.css

const Header = () => {
  return (
    <header className="head">
      <a href="https://codepen.io/ReGGae/live/povjKxV" target="_blank" data-txt="fullscreen is best">
        <div>fullscreen is best</div>
      </a>
      <div>
        <a href="https://twitter.com/Jesper_Landberg" target="_blank" data-txt="about">
          <div>about</div>
        </a>
        <a href="https://twitter.com/Jesper_Landberg" target="_blank" data-txt="contact">
          <div>contact</div>
        </a>
      </div>
    </header>
  );
};

export default Header;
