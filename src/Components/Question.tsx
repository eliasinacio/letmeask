import { ReactNode } from 'react';
import '../styles/question.scss'

type QuestionProps = {
  content: string;
  author: {
    name: string
    avatar: string;
  }
  isLiked?: boolean;
  children?: ReactNode;
  isHighlighted: boolean;
  isAnswered: boolean; 
}

export function Question(props: QuestionProps) {
  const { 
    content, 
    author, 
    children, 
    isHighlighted = false, 
    isAnswered = false 
  } = props;

  return (
    <div className={`question ${ isAnswered ? 'answered' : '' } ${ (isHighlighted && !isAnswered) ? 'highlighted' : '' }`}>
      <p>{content}</p>

      <footer>
        <div className="auth-info">
          <img src={author.avatar} alt={author.name}/>
          <span>{author.name}</span>
        </div>

        <div className="buttons">
          {children}
        </div>
      </footer>
    </div>
  )
}