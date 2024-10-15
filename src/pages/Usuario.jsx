import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Usuario.css';
import Modal from '../components/Modal/Modal';
import lixo from '../assets/lixo.png'
import img_pedido from '../assets/img-pedido.png'


const Usuario = ({ theme, removePedido, clearPedidos, handleLogout }) => {
    const [usuario, setUsuario] = useState(null);
    const [erro, setErro] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const emailLogado = localStorage.getItem('emailLogado');

        if (emailLogado) {
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const dadosUsuario = usuarios.find(user => user.email === emailLogado);

            if (dadosUsuario) {
                setUsuario(dadosUsuario);
                setNome(dadosUsuario.nome);
                setEmail(dadosUsuario.email);
                setSenha(dadosUsuario.senha);
                setPedidos(dadosUsuario.pedidos || []);
            } else {
                setErro('Usuário não encontrado.');
            }
        } else {
            setErro('Nenhum usuário logado.');
        }
    }, []);

    const handleEditUser = () => {
        if (usuario) {
            const updatedUser = { ...usuario, nome, email, senha, pedidos };
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const index = usuarios.findIndex(user => user.email === usuario.email);


            if (usuario.email !== email) {
                localStorage.setItem('emailLogado', email);
            }

            usuarios[index] = updatedUser;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            setUsuario(updatedUser);
            setModalTitle('Sucesso');
            setModalMessage('Usuário editado com sucesso!');
            setModalOpen(true);
        }
    };

    const handleDeleteUser = () => {
        if (usuario) {
            const confirmDelete = window.confirm('Tem certeza que deseja excluir sua conta?');
            if (confirmDelete) {
                const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                const updatedUsers = usuarios.filter(user => user.email !== usuario.email);
                localStorage.setItem('usuarios', JSON.stringify(updatedUsers));
                localStorage.removeItem('emailLogado');
                handleLogout();
                setModalTitle('Sucesso');
                setModalMessage('Usuário excluído com sucesso!');
                setModalOpen(true);
                navigate('/');
            }
        }
    };

    const handleRemovePedido = (index) => {
        const updatedPedidos = [...pedidos];
        updatedPedidos.splice(index, 1);
        setPedidos(updatedPedidos);

        if (usuario) {
            const updatedUser = { ...usuario, pedidos: updatedPedidos };
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const userIndex = usuarios.findIndex(user => user.email === usuario.email);
            usuarios[userIndex] = updatedUser;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
    };

    const finalizarPedido = () => {
        if (pedidos.length === 0) {
            setModalTitle('Aviso');
            setModalMessage('Não há pedidos adicionados para finalizar.');
            setModalOpen(true);
            return;
        }

        clearPedidos();
        if (usuario) {
            const updatedUser = { ...usuario, pedidos: [] };
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const userIndex = usuarios.findIndex(user => user.email === usuario.email);
            usuarios[userIndex] = updatedUser;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            setPedidos([]);
        }
        setModalTitle('Sucesso');
        setModalMessage('Pedido finalizado com sucesso!');
        setModalOpen(true);
    };

    return (
        <div className='div-user'>
            <div className='principal-user-div'>
                <div className='p-esquerda'>
                    <div className="foto-usuario">
                        <div className="foto"></div>
                    </div>
                    <div className="nome-usuario">
                        <p>Olá {usuario ? usuario.nome : 'usuário'}</p>
                    </div>
                    <div className="input-usuario">
                        <p>NOME</p>
                        <input
                            className='input-css'
                            type='text'
                            value={nome}
                            placeholder='Nome do Usuário'
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <p>E-MAIL</p>
                        <input
                            className='input-css'
                            type='text'
                            value={email}
                            placeholder='E-mail do Usuário'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p>SENHA</p>
                        <input
                            className='input-css'
                            type='password'
                            value={senha}
                            placeholder='Senha do Usuário'
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <div className="button-usuario">
                        <button className='button-edituser-css' onClick={handleEditUser}>EDITAR USER</button>
                        <button className='button-excluiruser-css' onClick={handleDeleteUser}>EXCLUIR USER</button>
                    </div>
                </div>

                <div className='p-direita'>
                    <p className='titulo-pedidos'>MEUS PEDIDOS</p>
                    <div className='pedidos-usuario'>
                        {pedidos.length > 0 ? (
                            pedidos.map((pedido, index) => (
                                <div key={index} className='pedido-card'>

                                    <div className="pedido-imagem">
                                        <img src={img_pedido} className='pedido-icon' />
                                    </div>



                                    <div className='pedido-nome'> 
                                    <p>{pedido.quantidade} {pedido.nome}(s)</p>
                                    </div>

                                   <div className='pedido-gap'>  

                                   </div>

                                    <div className='pedido-btn'> 
                                    <button onClick={() => handleRemovePedido(index)}><img src={lixo} className='lixo-icon' /></button>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <p className='zero-pedidos'>{erro ? erro : 'Adicione ítens ao seu pedido.'}</p>
                        )}
                    </div>
                    <button onClick={finalizarPedido} className='button-edituser-css-dois'>FINALIZAR PEDIDO</button>
                </div>
            </div>

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalTitle}
                message={modalMessage}
            />
        </div>
    );
}

export default Usuario;

