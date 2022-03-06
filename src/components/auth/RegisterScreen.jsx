import React from 'react';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterEmail } from '../../actions/auth';

export const RegisterScreen = () => {
	const dispatch = useDispatch();
	const { msgError, loading } = useSelector(state => state.ui);

	const [formValues, handleInputChange] = useForm({
		name: 'pedro',
		email: 'pedro@outlook.com',
		password: '123456',
		password2: '123456'
	});

	const { name, email, password, password2 } = formValues;

	const handleRegistration = e => {
		e.preventDefault();
		if (isFormValid()) {
			dispatch(startRegisterEmail(email, password, name));
		}
	};

	const isFormValid = () => {
		if (name.trim().length === 0) {
			dispatch(setError('Name is required'));
			return false;
		} else if (!validator.isEmail(email)) {
			dispatch(setError('Email is not valid'));
			return false;
		} else if (password !== password2 || password.length < 3) {
			dispatch(setError('Password is not valid'));
			return false;
		}
		dispatch(removeError());
		return true;
	};

	return (
		<>
			<h3 className="auth__title">Register</h3>
			<form onSubmit={handleRegistration}>
				{msgError && <div className="auth__alert__error">{msgError}</div>}
				<input className="auth__input" onChange={handleInputChange} value={name} type="text" name="name" placeholder="Name..." autoComplete="off" />
				<input className="auth__input" onChange={handleInputChange} value={email} type="text" name="email" placeholder="Email..." autoComplete="off" />
				<input className="auth__input" onChange={handleInputChange} value={password} type="password" name="password" placeholder="Password..." autoComplete="off" />
				<input className="auth__input" onChange={handleInputChange} value={password2} type="password" name="password2" placeholder="Confirm password" autoComplete="off" />
				<button className="btn btn-primary btn-block" type="submit" disabled={loading}>
					Register
				</button>
				<hr />
				<div className="auth__social">
					<p>Create account with social media</p>
					<div className="google-btn">
						<div className="google-icon-wrapper">
							<img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
						</div>
						<p className="btn-text">
							<b>Create account</b>
						</p>
					</div>
				</div>
				<Link className="link" to="/auth/login">
					Already registered?
				</Link>
			</form>
		</>
	);
};
