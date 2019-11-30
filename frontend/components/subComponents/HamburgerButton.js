import React, { Component } from 'react';

const HamburgerButton = (props) => (
    <button className={`hamburger-btn ${props.animateMenu}`} id="nav-icon1" onClick={props.click}>
        <span></span>
        <span></span>
        <span></span>
    </button>
)

export default HamburgerButton;