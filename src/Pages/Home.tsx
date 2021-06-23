import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'

import { Button } from '../Components/Button';

import '../styles/home.scss';

export function Home () {
  const history = useHistory();
  const { user, signInWithGoogle } = useContext(AuthContext);


  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
  
    history.push('/rooms/new');
  }

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
          
          <button id="createRoomBtn" onClick={handleCreateRoom}>
            <img src={googleIcon} alt="Logo 'G' do Google" />
            Crie uma sala com o Google
          </button>

          <div id="separator">
            ou entre em uma sala
          </div>

          <form id="roomForm">
            <input type="text" placeholder="Digite o código da sala"/>

            <Button>
              Entrar na sala
            </Button>
          </form>

        </div>
      </main>
    </div>
  )
}