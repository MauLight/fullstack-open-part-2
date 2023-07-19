import { create } from "../services/notes"

export const Form = ({ newNote, setNewNote, notes, setNotes }) => {

    const addNote = (e) => {

        e.preventDefault()

        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5
        }

        create(noteObject)
            .then(response => {
                console.log(response)
                setNotes(notes.concat(response))
            })

        setNewNote('')
    }

    return (
        <form className="mt-5" onSubmit={addNote}>
            <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
            <button type="submit">save</button>
        </form>
    )
}