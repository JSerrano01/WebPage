import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import image from '../static/medusa.png';

function Login() {
    const [code, setCode] = useState('');
    const [flash, setFlash] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        setFadeIn(true);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (code === 'prueba') {
            login();
            navigate('/home');
        } else {
            setFlash(true);
            setTimeout(() => setFlash(false), 1000);
        }
    };

    return (
        <div className={`flex justify-center items-center min-h-screen bg-black ${fadeIn ? 'fade-in' : ''}`}>
            <div className='flex flex-col items-center'>
                <img src={image} alt="Medusa" className='mb-7 h-28' />
                <form onSubmit={handleSubmit} className='flex items-center space-x-4'>
                    <input
                        type='text'
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className={`flex-grow rounded text-lg py-1 px-2 border border-white bg-black text-white disabled:text-gray-700 ${flash ? 'red-flash' : ''}`}
                        placeholder=''
                    />
                    <button
                        type='submit'
                        className='rounded-lg px-2 py-[0.35rem] border-2 border-white bg-black hover:bg-gray-200 hover:text-black active:bg-gray-300 cursor-pointer text-white disabled:cursor-default disabled:bg-gray-800 transition-all duration-150'
                    >
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
