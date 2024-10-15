import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cadastro.css';
import light_logo_red from '../assets/logo-redonda-light.png';
import dark_logo_red from '../assets/logo-redonda-dark.png';

const Cadastro = ({ theme }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleCadastro = (e) => {
        e.preventDefault();

        if (senha.length < 8) {
            setErro('A senha deve ter pelo menos 8 caracteres.');
            return;
        }

        if (senha !== confirmarSenha) {
            setErro('As senhas não coincidem.');
            return;
        }


        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const emailExistente = usuarios.some(user => user.email === email);

        if (emailExistente) {
            setErro('Este e-mail já está cadastrado.');
            return;
        }

        const usuario = {
            id: Date.now(),
            nome,
            email,
            senha,
            pedidos: [] 
        };

       
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios)); 

        setNome('');
        setEmail('');
        setSenha('');
        setConfirmarSenha('');
        setErro('');

        alert('Cadastro realizado com sucesso!');

        navigate('/login');
    };

    return (
        <div className='cadastro'>
            <div className='container-cadastro'>
                <div className='cadastro-logo'>
                    <img src={theme === 'dark' ? light_logo_red : dark_logo_red} alt='' className='logo-red-css-cad' />
                </div>

                <div className='cadastro-text'>
                    <p>ASSINE E ACOMPANHE SUA ASSINATURA EM UM SÓ LUGAR!</p>
                </div>

                <div className='cadastro-container-inputs'>
                    <form onSubmit={handleCadastro} className='cadastro-inputs'>
                        <p>NOME</p>
                        <input
                            type='text'
                            className='input-cadastro'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                        <p>E-MAIL</p>
                        <input
                            type='email'
                            className='input-cadastro'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <p>SENHA</p>
                        <input
                            type='password'
                            className='input-cadastro'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                        <p>CONFIRMAR SENHA</p>
                        <input
                            type='password'
                            className='input-cadastro'
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            required
                        />
                        {erro && <p className='erro'>{erro}</p>}
                    </form>
                </div>

                <div className='cadastro-button'>
                    <button type='submit' className='btn-cadastro' onClick={handleCadastro}>CADASTRAR</button>
                    <p>Já possui uma conta?</p>
                    <Link to='/login' className='cad-btn'>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;

