import { useHistory } from "react-router-dom"
import { Button } from "../Components/Button";

import '../styles/notfound.scss'

export function NotFoundPage () {
  const history = useHistory();

  function backToHome () {
    history.replace('/');
  }

  return (
    <div className="page-container">
      <div>
        <span> Sala não encontrada :/ </span>
        <Button onClick={backToHome}>Back to Home</Button>
      </div>
    </div>
  )
}