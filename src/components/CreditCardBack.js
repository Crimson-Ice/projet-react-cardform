import React from 'react';
import {useSelector} from "react-redux";

const CreditCardBack = () => {
    const input = useSelector(state => state.input)

    const formating = (cvc) => {
        while (cvc.length < 3) cvc += "0";
        return cvc;
    }

    return (
        <div className="creditCardBackContainer">
            <div className="cvc">
                <span>{formating(input[4].value)}</span>
            </div>
        </div>
    );
};

export default CreditCardBack;
