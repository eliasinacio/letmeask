import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/home.scss';
import { Button } from '../Components/Button';
import { database } from '../services/firebase';

export function NewRoom () {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setnewRoom] = useState('');

  async function handleCreateRoom (event: FormEvent) {
    event.preventDefault();
    
    if (newRoom.trim() === '') return;

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.replace(`/admin/rooms/${firebaseRoom.key}`)
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
        
        <h2>Crie uma nova sala</h2>

        <form id="roomForm" onSubmit={handleCreateRoom}>
          <input 
            type="text" 
            placeholder="Nome da sala"
            onChange={ event => setnewRoom(event.target.value) }
            value={newRoom} />

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