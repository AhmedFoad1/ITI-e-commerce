// src/components/Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';

function Login() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const validUser = true; // Replace with real authentication logic
            if (validUser) {
                dispatch(authActions.login({ email: formData.email }));
                navigate('/');
            } else {
                setErrors({ form: 'Invalid email or password' });
            }
        }
    };

    if (isLoggedIn) {
        navigate('/');
    }

    return (
        <div className="bg-gray-500 min-h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg w-full px-3 py-2 mt-1"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg w-full px-3 py-2 mt-1"
                        // The password field should be a password input type
                        // and should have the same styling as the email field
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg w-full py-2"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;

