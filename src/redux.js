import {configureStore, createSlice} from "@reduxjs/toolkit";

const inputSlice = createSlice({
    name: "input",
    initialState: [
        {name: "name", value: "", stateValidate: true},
        {name: "card number", value: "", stateValidate: true},
        {name: "exp date month", value: "", stateValidate: true},
        {name: "exp date years", value: "", stateValidate: true},
        {name: "cvc", value: "", stateValidate: true}
    ],
    reducers: {
        changeInput: (state, action) => {
            //{ type "change_input, payload: { id, value }}
            state[action.payload.id].value = action.payload.value;
        },
        toggleValidate: (state, action) => {
            //{ type "change_validation, payload: {id,state} }
            state[action.payload.id].stateValidate = action.payload.state;
        },
        reset: (state, action) => {
            state.map(obj => {
                obj.value = "";
                obj.state = true;
                return obj;
            })
        }
    }
})

export const {changeInput, reset, toggleValidate} = inputSlice.actions;

export const store = configureStore({
    reducer: {
        input: inputSlice.reducer,
    }
})

