import {useState} from 'react'
import ContactsForm from './components/ContactsForm'
import FilterSearch from './components/FilterSearch'
import Contacts from './components/Contacts'




const App = () => {
  const [persons, setPersons] = useState([
        { name: 'Arto Hellas', phone: '040-123456', id: 1 },
        { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
      ])
  const [newName , setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')
  
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
        phone: newPhone
        
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
  