import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'

import { Button } from '../Components/Button';
import '../styles/home.scss';

export function Home () {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [ roomCode, setRoomCode ] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
  
    history.push('/rooms/new');
  }
  
  async function handleJoinRoom (event: FormEvent) {
    event.preventDefault();  
    
    if (roomCode.trim() === '') return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    if(roomRef.val().closedAt) {
      alert('Room already closed')
      return;
    }

    if (roomRef.val().authorId === user?.id) {
      history.replace('/admin/');
    }

    history.push(`rooms/${roomCode}`);
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

          <form id="roomForm" onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />

            <Button>
              Entrar na sala
            </Button>
          </form>

        </div>
      </main>
    </div>
  )
}