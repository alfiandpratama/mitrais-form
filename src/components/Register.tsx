import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import './Register.css';

type Register = {
  firstName: string;
  lastName: string;
  gender: string;
  mobile: string;
  email: string;
};

function Register() {
  const [day, setDay] = useState<number>(0);
  const [month, setMonth] = useState<number>(-1);
  const [year, setYear] = useState<number>(0);
  const [loginPage, setLoginPage] = useState<boolean>(false);

  const { handleSubmit, register, reset, errors } = useForm<Register>({
    defaultValues: {
      gender: '1',
    },
  });

  const isValidPhone = (mobile: string) => {
    const regex_mobile = /^(^\+62\s?|^0\s?|^62)(\d{3,4}-?){2}\d{3,4}$/g;
    return regex_mobile.test(mobile);
  };

  const onSubmit = async (data: Register) => {
    let dob: string | null;
    if (year && month && day) {
      dob = `${year}/${+month + 1}/${day}`;
    } else {
      dob = null;
    }

    await axios
      .post('http://localhost:8888/register', {
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        email: data.email,
        mobile: data.mobile,
        dob: dob,
      })
      .then((resp) => {
        console.log(resp);
        reset();
        setDay(0);
        setMonth(0);
        setYear(0);
        setLoginPage(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.message === 'Network Error') {
          alert('Network Error: Server not running!');
        } else {
          alert('Mobile number or Email should be unique');
        }
      });
  };

  return (
    <div className='register-form'>
      <div className={loginPage ? 'login-wrapper' : 'hidden-page'}>
        <button className='btn btn-login'>Login</button>
      </div>
      <h1>Registration</h1>
      {/* Form */}
      <form className='app-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <input
            type='text'
            name='mobile'
            id='mobile'
            className='form-control'
            placeholder='Mobile number'
            ref={register({ required: true, validate: isValidPhone })}
          />
          {errors.mobile && (
            <span className='error-warning'>Mobile number is required</span>
          )}
          {errors.mobile && errors.mobile.type === 'validate' && (
            <span className='error-warning'>
              Please enter valid Indonesian phone number
            </span>
          )}
        </div>

        <div className='form-group'>
          <input
            type='text'
            name='firstName'
            id='firstName'
            className='form-control'
            placeholder='First name'
            ref={register({ required: true })}
          />
          {errors.firstName && (
            <span className='error-warning'>First name is required</span>
          )}
        </div>

        <div className='form-group'>
          <input
            type='text'
            name='lastName'
            id='lastName'
            className='form-control'
            placeholder='Last name'
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <span className='error-warning'>Last name is required</span>
          )}
        </div>

        <div className='form-group'>
          <p>Date of Birth</p>
          <div className='date-group'>
            <MonthPicker
              defaultValue={'Month'}
              endYearGiven
              year={year}
              value={month}
              onChange={(month: number) => {
                setMonth(month);
              }}
              id={'month'}
              name={'month'}
              classes={'form-control date-month'}
              ref={register}
            />
            <DayPicker
              defaultValue={'Day'}
              year={year}
              month={month}
              endYearGiven
              value={day}
              onChange={(day: number) => {
                setDay(day);
              }}
              id={'day'}
              name={'day'}
              classes={'form-control date-day'}
            />
            <YearPicker
              defaultValue={'Year'}
              value={year}
              onChange={(year: number) => {
                setYear(year);
              }}
              id={'year'}
              name={'year'}
              classes={'form-control date-year'}
            />
          </div>
        </div>

        <div className='form-group'>
          <div className='gender-group'>
            <label>
              <input
                name='gender'
                value='1'
                type='radio'
                className='input-radio'
                ref={register}
              />
              Male
            </label>

            <label>
              <input
                name='gender'
                value='2'
                type='radio'
                className='input-radio'
                ref={register}
              />
              Female
            </label>
          </div>
        </div>

        <div className='form-group'>
          <input
            type='email'
            name='email'
            id='email'
            className='form-control'
            placeholder='Email'
            ref={register({
              required: 'Email is required',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Entered value does not match email format',
              },
            })}
          />
          {errors.email && (
            <span className='error-warning'>{errors.email.message}</span>
          )}
        </div>

        <div className='form-group'>
          <button type='submit' id='submit' className='btn btn-submit'>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
