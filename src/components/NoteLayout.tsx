import { Note } from "../App"
import { useParams, Navigate, Outlet } from "react-router-dom"


type NoteLayoutProps = {
  notes: Note[]
}

const NoteLayout = ({notes}: NoteLayoutProps) => {
  const {id} = useParams();
  const note = notes.find(note => note.id === id);

  if(note == null){
    return <Navigate to="/" replace />
    return <Outlet context={note} />
  }
  return (
    <div>
      
    </div>
  )
}

export default NoteLayout
