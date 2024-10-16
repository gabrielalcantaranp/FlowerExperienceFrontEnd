import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import light_logo_red from '../assets/logo-redonda-light.png';
import dark_logo_red from '../assets/logo-redonda-dark.png';
import Modal from '../components/Modal/Modal'; 

const Login = ({ theme, setTheme, handleLogin }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = () => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuario = usuarios.find(user => user.email === email);

        if (usuario && usuario.senha === senha) {
            setModalTitle("Sucesso");
            setModalMessage("Login realizado com sucesso!");
            setModalVisible(true);
            handleLogin(false);
            localStorage.setItem('emailLogado', email);
            navigate('/usuario');
        } else if (email === 'adm@gmail.com' && senha === '123') {
            setModalTitle("Sucesso");
            setModalMessage("Login como administrador realizado com sucesso!");
            setModalVisible(true);
            handleLogin(true);
            navigate('/');
        } else {
            setModalTitle("Erro");
            setModalMessage("E-mail ou senha incorretos.");
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div className='login'>
            <div className='container-login'>
                <div className='login-logo'>
                    <img src={theme === 'dark' ? light_logo_red : dark_logo_red} alt='Logo' className='logo-red-css' />
                </div>
                <div className='login-text'>
                    <p>ENTRE E ACOMPANHE A SUA ASSINATURA EM UM SÓ LUGAR!</p>
                </div>
                <div className='login-container-inputs'>
                    <div className='login-inputs'>
                        <p>E-MAIL</p>
                        <input 
                            type='text' 
                            className='input-login' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <p>SENHA</p>
                        <input 
                            type='password' 
                            className='input-login' 
                            value={senha} 
                            onChange={(e) => setSenha(e.target.value)} 
                        />
                    </div>
                </div>
                <div className='login-button'>
                    <button className='btn-login' onClick={handleSubmit}>ENTRAR</button>
                    <p>Não possui uma conta?</p>
                    <Link to='/cadastro' className='cad-btn'>Cadastre-se</Link>
                </div>
            </div>
            <Modal 
                isOpen={modalVisible} 
                onClose={closeModal} 
                title={modalTitle} 
                message={modalMessage} 
            />
        </div>
    );
};

export default Login;
