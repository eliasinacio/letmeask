import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import '../styles/room.scss'

import { RoomCode } from '../Components/RoomCode';
import { Button } from '../Components/Button';
import { Question } from '../Components/Question';

// import { database } from '../services/firebase';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParams = {
  id: string;
}

export function AdminRoom () {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom (roomID: string) {
    if (window.confirm('Deseja mesmo remover esta Sala?')) {
      await database.ref(`rooms/${roomId}`).update({
        closedAt: new Date(),
      });

      history.push('/');
    }
  }

  async function handleDeleteQuestion (questionId: string) {
    if (window.confirm('Deseja mesmo remover esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestion (questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function handleAnswerQuestion (questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }

  const handleBackToHome = () => {
    history.replace('/');
  }

  return (
    <div id="pageRoom">
      <header>
        <div className="header-content admin">
          <img src={logoImg} onClick={ handleBackToHome } alt="Logo escrito Letmeask"/>
          <div className="admin-header-buttons">
            <RoomCode code={roomId}/>
            <Button isOutlined onClick={() => handleEndRoom(roomId)}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div id="room-title">
          <h1 id="pageRoom-title">{title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="questionsContainer">
          { questions.map( question => {
            return (
              <Question 
                key={question.id}
                content={question.content} 
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <> {/* Fragment */}
                    <button
                      className={`check-button`}
                      type='button'
                      onClick={() => handleCheckQuestion(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida." />
                    </button>
                
                    <button
                      className={`answer-button`}
                      type='button'
                      onClick={() => handleAnswerQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Reposnder/destacar pergunta" />
                    </button>
                  </>  
                )}

                <button
                  className={`delete-button`}
                  type='button'
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>

              </Question>
            )
          })}
        </div>
      </main>
    </div>
  );
}