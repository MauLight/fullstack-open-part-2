import { useEffect, useState } from "react"
import { getAll, update, create } from "./services/notes"
import { Note } from "./components/Note"
import { Form } from "./components/Form"
import { Notification } from "./components/Notification"

function App() {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const notesToShow = showAll ? notes : notes.filter((elem) => elem.important)

  const handleImportant = (id) => {
    console.log(`importance of ${id} must be changed.`)
    const url = `http://localhost:3000/notes/${id}`
    const note = notes.find(note => note.id === id)
    const changeNote = { ...note, important: !note.important }

    update(id, changeNote)
      .then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response))
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(`The note '${note.content}' was already deleted from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  useEffect(() => {
    getAll()
      .then(response => {
        console.log('promise fulfilled!')
        setNotes(response)
      })
  }, [])

  return (
    <div className="App">
      <div className="flex gap-x-5">
        <h1>Notes</h1>
        <button onClick={() => setShowAll(!showAll)}>{showAll ? 'Show important' : 'Show all'}</button>
      </div>
      <Notification message={errorMessage} />
      <ul className="mt-2">
        {
          notesToShow.map((elem) =>
            <Note
              key={elem.id}
              content={elem.content}
              id={elem.id}
              important={elem.important}
              handleImportant={() => handleImportant(elem.id)}
            />
          )
        }
      </ul>
      <Form newNote={newNote} setNewNote={setNewNote} notes={notes} setNotes={setNotes} />
    </div>
  )
}

export default App
