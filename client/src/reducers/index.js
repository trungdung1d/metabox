const { combineReducers } = require("redux");
const { userReducer } = require("./userReducer");

const rootReducer = combineReducers({
    user: userReducer,
})

export default rootReducer