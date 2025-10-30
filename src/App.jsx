import {useState, useEffect} from 'react'
import ContactsForm from './components/ContactsForm'
import FilterSearch from './components/FilterSearch'
import Contacts from './components/Contacts'
import axios from 'axios'




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName , setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() =>{
    axios
      .get('http://localhost:3001/persons')
      .then(response =>{
        setPersons(response.data)
      })
  }, [])
  
  const handleSearchChange = (event) =>{
    setNewSearch(event.target.value)
  }
  const addContact = (event) =>{
    event.preventDefault()
    const existingContact = persons.some(person => person.name === newName ||  person.phone === newPhone) 

    if (existingContact){
      alert('contact is already added to phonebook')
    } else if (!newName || !newPhone){
      alert(`both fields are required`)
    } else {
        const contactObject = {
        name: newName,
        phone: newPhone,
        id: persons.length +1
        
      }
      setPersons(persons.concat(contactObject))
      
    }
    setNewName('')
    setNewPhone('')
  }  

  const handleNameChange = (event) => {
  setNewName(event.target.value)
  }
  const handlePhoneChange = (event) =>{
    setNewPhone(event.target.value)

  }
  const filteredPersons = newSearch ?
    persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()) || person.phone.includes(newSearch))
    :persons
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        debug: {newName}
      </div>
      <ContactsForm onSubmit={addContact} newName={newName} onNameChange={handleNameChange} newPhone={newPhone} onPhoneChange={handlePhoneChange}/>
      <h2>Contacts</h2>
      <FilterSearch FilteredSearch = {newSearch} onSearchChange = {handleSearchChange}/>
      <Contacts persons = {filteredPersons} />
    </div>
  )
}

export default App
  