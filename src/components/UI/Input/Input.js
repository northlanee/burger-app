import React from "react";

import s from './Input.module.css';

const Input = ({data, changed}) => {

    return (
        <div className={s.Input}>
            <label className={s.Label} htmlFor="">{data.name}</label>
            <input onChange={changed} type={data.type||'text'} name={data.name} placeholder={data.placeholder} value={data.value}/>
        </div>
    );
};

export default Input;