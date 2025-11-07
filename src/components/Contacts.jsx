import Contact from "./Contact";
const Contacts = ({persons, onDelete}) => {
    return(
        persons.map(person => 
            <Contact key={person.id}
            name={person.name}
            number={person.number}
            onDelete={()=>{
                if(window.confirm(`Delete ${person.name}?`)){
                    onDelete(person.id)
                }
            }}/>)
    )
}

export default Contacts