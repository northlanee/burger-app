import React from "react";

import Backdrop from "../Backdrop/Backdrop";

import s from './Modal.module.css';

const Modal = (props) => {
    return (
        <>
            <Backdrop show={props.show} clicked={props.modalClose}/>
            <div className={s.Modal} style={{
                transform: props.show ? 'translate(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                {props.children}
            </div>
        </>
    );
};

export default React.memo(Modal);