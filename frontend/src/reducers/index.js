import {combineReducers} from 'redux';
import auth from './auth';
import profile from './profile';
import student from './student';
import secretary from "./secretary";
import faculty from "./faculty";
import certificate from "./certificate";

const rootReducer = combineReducers({
    auth,
    profile,
    student,
    secretary,
    faculty,
    certificate
});

export default rootReducer;