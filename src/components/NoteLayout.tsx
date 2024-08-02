/* eslint-disable react-refresh/only-export-components */
import { Note } from "../App";
import { useParams, Navigate, Outlet, useOutletContext } from "react-router-dom";

type NoteLayoutProps = {
  notes: Note[];
};

export default function NoteLayout({ notes }: NoteLayoutProps){
  const { id } = useParams();
  const note = notes.find(n => n.id === id);

  if (note == null) 
    return <Navigate to="/" replace />

    return <Outlet context={note} />;
  
}


export function useNote() {
  return useOutletContext<Note>();
}