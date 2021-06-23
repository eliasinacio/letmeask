import { Link } from 'react-router-dom';
// import { useContext } from 'react';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/home.scss';
import { Button } from '../Components/Button';
// import { AuthContext } from '../contexts/AuthContext';

export function NewRoom () {
  // const { user, signInWithGoogle } = useContext(AuthContext);

  return (
    <div id="homeContainer">
    <aside id="illustration">
      <img src={illustrationImg} alt="Imagem simbolizando questões e respostas" />
      <h1>Nenhuma pergunta é boba demais.</h1>
      <p>Compartilhe perguntas e receba conhecimento.</p>
    </aside>

    <main id="mainContainer">
      <div id="mainContent">
        <img src={logoImg} alt="Logo Letmeask" />
        
        <h2>Crie uma nova sala</h2>

        <form id="roomForm">
          <input type="text" placeholder="Número da sala"/>

          <Button>
            Criar sala
          </Button>
        </form>

        <p>Quer entrar em uma sala já criada? <Link to="/">Clique aqui</Link></p>
      </div>
    </main>
  </div>
  )
}