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
        <img src={image} alt="Medusa" className='mb-5 h-32' /> {/* Aumenta el tamaño de la imagen si es necesario */}
        <form onSubmit={handleSubmit} className='flex items-center space-x-2'>
            <input
                type='text'
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`flex-grow rounded text-xl py-2 px-2 border-[1px] border-white bg-black text-white disabled:text-gray-700 ${flash ? 'red-flash' : ''} font-mono`}
                placeholder=''
            />
            <button
                type='submit'
                className='rounded-lg px-2 py-2 border-[1px] border-white bg-black hover:bg-gray-200 hover:text-black active:bg-gray-300 cursor-pointer text-xl text-white disabled:cursor-default disabled:bg-gray-800 transition-all duration-150 font-mono'
            >
                SUBMIT
            </button>
        </form>
    </div>
</div>


    );
}

export default Login;
