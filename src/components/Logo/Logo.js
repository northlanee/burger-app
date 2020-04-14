import React from "react";

import s from './Logo.module.css';

import LogoImg from './../../assets/images/burger-logo.png';

const Logo = (props) => {
    return (
        <div className={s.Logo} style={{height: props.height}}>
            <img src={LogoImg} alt="Logo"/>
        </div>
    );
};

export default Logo;