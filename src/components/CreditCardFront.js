import React from 'react';
import {useSelector} from "react-redux";

const CreditCardFront = () => {
    const input = useSelector(state => state.input);

    const formatingDate = (cvc, size) => {
        while (cvc.length < size) cvc += "0";
        return cvc;
    }

    const formatingCardNumber = (cvc) => {
        let i = 0
        while (cvc.length < 20) {
            if((cvc.length + 1)% 5 === 0){
                cvc += " ";
            }else{
                cvc += "0";
            }
            i++;
        }
        return cvc;
    }

    return (
        <div className="creditCardFrontContainer">
            <div className="topCard">
                <div className="bigCircle"></div>
                <div className="littleCircle"></div>
            </div>
            <div className="wrapper">
                <div className="midCard">
                    <span>{formatingCardNumber(input[1].value)}</span>
                </div>
                <div className="botCard">
                    <span>{input[0].value === "" ? "card name" : input[0].value}</span>
                    <span>{formatingDate(input[2].value, 2)}/{formatingDate(input[3].value, 2)}</span>
                </div>
            </div>
        </div>
    );
};

export default CreditCardFront;
