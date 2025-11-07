const Contact = ({name, number, onDelete}) =>{
  return <p>
      <span>{name} </span>{''}
      <span>{number ?? <em>No number</em>}</span>
      <button style={{marginLeft: 8}} onClick={onDelete}>delete</button>
    </p>
}

export default Contact