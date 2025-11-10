import {useState, useEffect} from 'react'
import ContactsForm from './components/ContactsForm'
import FilterSearch from './components/FilterSearch'
import Contacts from './components/Contacts'
import Notification from './components/Notification'
import personaServer from './services/persona'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName , setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [update, setUpdate] = useState({message:null, type:null})

  useEffect(() =>{
      personaServer
        .getAll()
        .then(initialPersons =>{
          setPersons(initialPersons)
        })
  }, [])
  
  const handleSearchChange = (event) =>{
    setNewSearch(event.target.value)
  }
  const addContact = (event) =>{
    event.preventDefault()
    const existingContact = persons.find(person => person.name === newName) 
    const contactObject = {
        name: newName,
        number: newNumber,
      }
    if (!newName || !newNumber){
      alert(`both fields are required`)
      return
    } 
    if (existingContact){
      // alert('contact is already added to phonebook')
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)){
          personaServer
            .update(existingContact.id, contactObject)
            .then(returnedContact =>{
              setPersons(persons.map(person => 
                person.id === existingContact.id ? returnedContact : person
              ))
            setUpdate({message : `Updated ${newName}`, type:'success'})
            setTimeout(()=> setUpdate({message: null, type:null}), 5000)
            setNewName('')
            setNewNumber('')
            })
            .catch(error => {
              console.error('Update failed:', error)
              setUpdate({message:`Information of ${newName} has already been deleted from server`, type:'error'})
              setTimeout(()=> setUpdate({message: null, type:null}), 5000)
              setPersons(persons.filter(person =>
                person.id !== existingContact.id
              ))
            })
          }
      }else {  
      personaServer
        .create(contactObject)
        .then(returnedContact =>{
          setPersons(prev => prev.concat(returnedContact))
          setUpdate({message:`Added ${newName}`, type:'success'}) 
          setTimeout(()=> setUpdate({message: null, type:null}), 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => console.error('create failed', error))
    }
  }  

  const handleNameChange = (event) => {
  setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)

  }
  const handleContactDelete = (id) => {
    personaServer
      .remove(id)
      .then(() =>{
        setPersons(prev => prev.filter(p => p.id !== id))
      })
      .catch(error => {
        console.error('Delete failed', error)
      })
  }
  const filteredPersons = newSearch ?
    persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()) || person.number.includes(newSearch))
    :persons
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={update}/>
      <div>
        debug: {newName}
      </div>
      <ContactsForm onSubmit={addContact} newName={newName} onNameChange={handleNameChange} newNumber={newNumber} onNumberChange={handleNumberChange}/>
      <h2>Contacts</h2>
      <FilterSearch filteredSearch = {newSearch} onSearchChange = {handleSearchChange}/>
      <Contacts persons = {filteredPersons} onDelete={handleContactDelete}/>
    </div>
  )
}

export default App
  