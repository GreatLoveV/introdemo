import Contact from "./Contact";
const Contacts = ({persons}) => {
    return(
        persons.map(person => <Contact key={person.phone} name={person.name} phone={person.phone}/>)
    )
}

export default Contacts 