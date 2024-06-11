import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { update_profile } from '../../actions/profile'; 
import { delete_account } from '../../actions/auth';

const AdminProfile = ({
    update_profile,
    first_name_global,
    last_name_global,
    phone_global,
    city_global
}) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        city: ''
    });

    const { first_name, last_name, phone, city } = formData;

    useEffect(() => {
        setFormData({
            first_name: first_name_global,
            last_name: last_name_global,
            phone: phone_global,
            city: city_global
        });
    }, [first_name_global, last_name_global, phone_global, city_global]);    

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        update_profile(first_name, last_name, phone, city);
    };

    return (
        <div className='container'>
            <h1 className='mt-3'>Bine ați venit la panoul dvs. de utilizator</h1>
            <p className='mt-3 mb-3'>Actualizați-vă profilul de utilizator mai jos:</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <label className='form-label' htmlFor='first_name'>Nume</label>
                    <input
                        className='form-control'
                        type='text'
                        name='first_name'
                        placeholder={`${first_name_global}`}
                        onChange={e => onChange(e)}
                        value={first_name}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='last_name'>Prenume</label>
                    <input
                        className='form-control'
                        type='text'
                        name='last_name'
                        placeholder={`${last_name_global}`}
                        onChange={e => onChange(e)}
                        value={last_name}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='phone'>Număr de telefon</label>
                    <input
                        className='form-control'
                        type='text'
                        name='phone'
                        placeholder={`${phone_global}`}
                        onChange={e => onChange(e)}
                        value={phone}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='city'>Oraș</label>
                    <input
                        className='form-control'
                        type='text'
                        name='city'
                        placeholder={`${city_global}`}
                        onChange={e => onChange(e)}
                        value={city}
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Updatează profilul</button>
            </form>
        </div>
    )
};

const mapStateToProps = state => ({
    first_name_global: state.profile.first_name,
    last_name_global: state.profile.last_name,
    phone_global: state.profile.phone,
    city_global: state.profile.city,
});


export default connect(mapStateToProps, { 
    delete_account,
    update_profile
 })(AdminProfile);
