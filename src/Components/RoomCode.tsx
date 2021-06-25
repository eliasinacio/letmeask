import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss'

type RoomCodeProps = {
  code: string;
}

export function RoomCode (props: RoomCodeProps) {
  function copyRoomCodeToClipBoard () {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className="roomCode" onClick={copyRoomCodeToClipBoard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>{props.code}</span>
    </button>
  )
}