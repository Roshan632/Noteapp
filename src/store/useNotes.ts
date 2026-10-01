import { create } from "zustand"
import {INotesStore} from "./noted"

export const useNotesStore= create<INotesStore>((set,get)=>({
    notes:[],

    addNote:(note)=>{
        set((state)=>({
            notes:[...state.notes,note],
        }))
    },
    deleteNote:(id:string)=>{
        set((state)=>({
            notes:state.notes.filter((note)=>note.id !== id)
        }))
    },
    markCompleted:(id:string)=>{
        set((state)=>({
            notes:state.notes.map((note)=>
                note.id === id ? {...note,isCompleted:true}:note
        ),
        }))
    },
}));

export default useNotesStore;