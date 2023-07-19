import { useEffect, useState } from 'react'
import { getAll, create, update, deletePerson } from './services/persons'
import Form from './components/Form'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  //Add a mirror state to preserve persons values.
  const [phoneBook, setPhoneBook] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [type, setType] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (newName === '' || newNumber === '') {
      alert('You need to add a name and a number to the fields before submitting.')
      return -1
    }

    const nameFilter = persons.filter((elem) => elem.name === newName)

    if (nameFilter.length > 0) {
      const person = nameFilter[0]
      const id = nameFilter[0].id
      const name = nameFilter[0].name
      if (window.confirm(`${nameFilter[0].name} was added previously, replace the old number with a new one?`)) {
        update(id, { ...person, number: newNumber })
          .then(() => {
            getAll()
              .then(response => {
                console.log('promise fulfilled!')
                setPersons(response)
                setPhoneBook(response)
                setNewName('')
                setNewNumber('')
                setType('add')
                setErrorMessage(`${newName} with number ${newNumber} updated!`)
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
              })
          })
          .catch(error => {
            console.log(error)
            setType('error')
            setErrorMessage(`${name} was already deleted from the server.`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(elem => elem.id !== id))
            setPhoneBook(persons.filter(elem => elem.id !== id))
          })
      }
      return -1
    }

    const newPhone = {
      name: newName,
      number: newNumber
    }

    create(newPhone)
      .then(response => {
        setPersons(persons.concat(response))
        setPhoneBook(persons.concat(response))
        console.log('data added!')
        setType('add')
        setErrorMessage(`${newName} with number ${newNumber} added!`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    setNewName('')
    setNewNumber('')

    return 1
  }

  const handleFilter = () => {
    //Filter persons array to search for matching results.
    const aux = persons
    const filterName = aux.filter((elem) => elem.name.toLowerCase().includes(filter))

    //If filterName length > 0, means the name was already added.
    if (filterName.length > 0) {
      setPhoneBook(filterName)
    }
    else {
      setPhoneBook(persons)
    }
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      deletePerson(id)
        .then(() => {
          setErrorMessage(`${name} was deleted!`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          console.log('Number deleted!')
          getAll()
            .then(response => {
              console.log('promise fulfilled!')
              setPersons(response)
              setPhoneBook(response)
            })
        })
        .catch(error => {
          console.log(error)
          setType('error')
          setErrorMessage(`'${name}' was already deleted from the server.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(elem => elem.id !== id))
          setPhoneBook(persons.filter(elem => elem.id !== id))
        })
    }

  }

  useEffect(() => {
    getAll()
      .then(response => {
        console.log('promise fulfilled!')
        setPersons(response)
        setPhoneBook(response)
      })
  }, [])

  useEffect(() => {
    handleFilter()
  }, [filter])

  return (
    <div className='ml-2'>
      <h2 className='text-5xl mb-2'>Phonebook</h2>
      <Form handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <Notification type={type} message={errorMessage} />
      <h2 className='text-2xl mt-2'>Numbers</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <Phonebook phoneBook={phoneBook} deletePerson={handleDelete} />
    </div>
  )
}

export default App