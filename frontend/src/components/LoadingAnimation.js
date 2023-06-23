import React from "react";

const LoadingAnimation = () => {
    return (
        <div className={"animation-container"}>
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default LoadingAnimation;
