import React from 'react';
import CreditCardBack from "../components/CreditCardBack";
import CreditCardFront from "../components/CreditCardFront";
import CardForm from "../components/CardForm";

const Home = () => {
    return (
        <div className="homePageContainer">
            <div className="leftPage">
                <CreditCardFront/>
                <CreditCardBack/>
            </div>
            <div className="rightPage">
                <CardForm/>
            </div>
        </div>
    );
};

export default Home;
