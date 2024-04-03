import Message from "../../components/Message";
import "./Notification.css"
import { getmessage } from "../../redux/apiRequest"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

function Notification() { 
    const [mes, setMes] = useState([]);
    const user = {
        data: {
            id: 1,
            firstname: "Nguyễn",
            lastname: "Văn A",
            phonenumber: "0123456789",
            username: "nguyenvana",
        }
    }
    // useEffect(() => {
    //     const getmess = async () => {
    //         const message = await getmessage(user.data.id)
    //         setMes(message.message)
    //     }
    //     getmess()
    // }, [])

    console.log("Result",mes)
    mes.reverse()
    return (
        <div className='notification__wrapper'>
            <h1 className="notification__heading">|</h1>
            <div className='notification__block'>
                {mes && mes.map(message => 
                    <Message message={message.content} time={message.date} type={message.type}></Message>
                )}
            </div>
                
        </div>
    );

}

export default Notification;