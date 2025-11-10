const Notification = ({message})=>{
    if (!message || message.message == null){
        return null    
    }
    const notificationStyle = {
        color: message.type === 'error' ? 'red' : 'green',
        background: 'grey',
        border: `2px solid ${message.type === 'error' ? 'red' : 'green'}`,
        borderRadius: '5px',
        padding: '10px',
        fontSize: '25px',
        marginBottom: '10px'
    }
        

    return (
        <div style={notificationStyle} >
        {message.message}
        </div>
    )
}

export default Notification