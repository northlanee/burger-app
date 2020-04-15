import React from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent) => {
    return ((props) => {
        return (<>
            <Modal show>Error</Modal>
            <WrappedComponent {...props}/>
        </>)
    });
};

export default withErrorHandler;