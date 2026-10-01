import {INote} from "@/types/app/types";

type INotesStore = {
    notes: INote[];
    addNote: (note: INote) => void;
    deleteNote: (id: string) => void;
    //updateNote: (updatedNote: INote) => void;
    markCompleted: (id: string) => void;


}
export  {INotesStore}