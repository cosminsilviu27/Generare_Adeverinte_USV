import Cookies from 'js-cookie';
import axios from 'axios';
import {
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL
} from './types';

export const load_user = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/profile/user`, config);

        if (res.data.error) {
            console.log("Load profile fail 1", res.data.error);
            dispatch({
                type: LOAD_USER_PROFILE_FAIL
            });
        } else {
            console.log("Load profile ok", res.data);
            dispatch({
                type: LOAD_USER_PROFILE_SUCCESS,
                payload: res.data
            });
        }
    } catch (err) {
        console.log("Load profile fail 2", err);
        dispatch({
            type: LOAD_USER_PROFILE_FAIL
        });
    }
};

export const update_profile = (first_name, last_name, phone, city) => async dispatch => {
    console.log(first_name, last_name, phone, city);

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': true,
        first_name,
        last_name,
        phone,
        city
    });

    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/profile/update`, body, config);

        if (res.data.profile && res.data.username) {
            console.log("Profile update success", res.data.profile, res.data.username);
            dispatch({
                type: UPDATE_USER_PROFILE_SUCCESS,
                payload: res.data
            });
        } else {
            console.log("Profile update fail", res.data);
            dispatch({
                type: UPDATE_USER_PROFILE_FAIL
            });
        }
    } catch (err) {
        console.log("Profile update error", err);
        dispatch({
            type: UPDATE_USER_PROFILE_FAIL
        });
    }
};
