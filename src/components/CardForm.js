import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeInput, reset, toggleValidate} from "../redux";

const CardForm = () => {
    const input = useSelector(state => state.input);
    const [formValidate, setFormValidate] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const name = event.target.name;
        let id;

        switch (name){
            case "name":
                event.target.value = event.target.value.replace(/[^a-zA-Z- ]/g, '');
                id = 0;
                if(event.target.value !== "") dispatch(toggleValidate({id: id, state: true}));
            break;
            case "card number":
                event.target.value = event.target.value.replace(/[^\d0-9]/g, '').replace(/(.{4})/g, '$1 ').trim();
                id = 1;
                if(event.target.value !== "" && event.target.value.length === 19) dispatch(toggleValidate({id: id, state: true}));
            break;
            case "exp date month":
                event.target.value = event.target.value
                    .replace(/^([1-9]\/|[2-9])$/g, '0$1')
                    .replace(/^(0[1-9]|1[0-2])$/g, '$1')
                    .replace(/00/, '0')
                    .replace(/1[3-9]/, '1');
                id = 2;
                if(event.target.value !== "") dispatch(toggleValidate({id: id, state: true}));
            break;
            case "exp date years":
                event.target.value = event.target.value.replace(/[^\d0-9]/g, '');
                id = 3;
                if(event.target.value !== "") dispatch(toggleValidate({id: id, state: true}));
            break;
            case "cvc":
                event.target.value = event.target.value.replace(/[^\d0-9]/g, '');
                id = 4;
                if(event.target.value !== "" && event.target.value.length === 3) dispatch(toggleValidate({id: id, state: true}));
            break;
            default: console.log("bug switch name");
        }

        dispatch(changeInput({id: id, value: event.target.value}));
    }

    const handleValidForm = (event) => {
        event.preventDefault();

        let inputTemp = input.map((obj, index) => {
            let action = {id: index, state: false};
            if(obj.value === "") {
                dispatch(toggleValidate(action));
                return action;
            } else if(obj.name === "cvc" && obj.value.length !== 3){
                dispatch(toggleValidate(action));
                return action;
            } else if(obj.name === "card number" && obj.value.length !== 19){
                dispatch(toggleValidate(action));
                return action;
            }
            return {id: index, state: true};
        })
        console.log(formValidate)

        setFormValidate(inputTemp.every(obj => obj.state === true));
    }

    const handleContinue = () => {
        dispatch(reset());
        setFormValidate(false);
    }

    return (
        <div>
            {!formValidate &&
                <form className="formContainer" onSubmit={handleValidForm}>
                    <div className="wrapper-column big-input">
                        <label htmlFor="Card-holder-name">CARDHOLRDER NAME</label>
                        <input name="name" type="text" placeholder="e.g. Jane Apple" maxLength="25"
                               onChange={handleChange} className={input[0].stateValidate ? "" : "invalidInput"}
                        />
                    </div>
                    <div className="wrapper-column big-input">
                        <label htmlFor="card-number">CARD NUMBER</label>
                        <input
                            name="card number"
                            type="text"
                            maxLength="19"
                            placeholder="e.g. 1234 5678 9123 0000"
                            className={input[1].stateValidate ? "" : "invalidInput"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="wrapper-row">
                        <div className="little-input">
                            <label htmlFor="exp-date">EXP. DATE(MM/YY)</label>
                            <div>
                                <input name="exp date month" type="text" maxLength="2" placeholder="MM"
                                       onChange={handleChange}
                                       className={input[2].stateValidate ? "" : "invalidInput"}
                                />
                                <input name="exp date years" type="text" maxLength="2" placeholder="YY"
                                       onChange={handleChange}
                                       className={input[3].stateValidate ? "" : "invalidInput"}
                                />
                            </div>
                        </div>
                        <div className="wrapper-column mid-input">
                            <label htmlFor="cvc">CVC</label>
                            <input name="cvc" type="tel" inputMode="numeric" maxLength="3"
                                   placeholder="e.g. 123" onChange={handleChange}
                                   className={input[4].stateValidate ? "" : "invalidInput"}
                            />
                        </div>
                    </div>
                    <input id="submit" type="submit" value="Confirm"/>
                </form>
            }
            {formValidate &&
                <div className="validation-container">
                    <div className="circle-valid">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    <h1>THANK YOU!</h1>
                    <span>We've added your card details</span>
                    <button onClick={() => handleContinue()}>Continue</button>
                </div>
            }

        </div>
    );
};

export default CardForm;
