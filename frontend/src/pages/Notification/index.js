import Message from "../../components/Message";
import "./Notification.css"
import { getmessage } from "../../redux/apiRequest"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

function Notification({token}) { 
    // const [mes, setMes] = useState([]);
    
    // useEffect(() => {
    //     const getmess = async () => {
    //         const message = await getmessage(user.data.id)
    //         setMes(message.message)
    //     }
    //     getmess()
    // }, [])

    const [mes, setMes] = useState([]);
    useEffect(() => {
        const getmess = async () => {
            // let date = new Date()
            var date = new Date()
            var year = date.getFullYear()
            var month = date.getMonth() + 1
            var dt = date.getDate()

            var date = year + '-' + (month < 10 ? '0' : '') + month + '-' + (dt < 10 ? '0' : '') + dt

            console.log("Date", date)


            


            const message = await getmessage(token, "2024-05-05")
            for (let i = 0; i < message.length; i++) {
                message[i].timeStamp = new Date(message[i].timeStamp).toLocaleString()
            }

            setMes(message)

        }
        getmess()
    }, [])


    console.log("Result",mes)
    mes.reverse()
    return (
        <div className='notification__wrapper'>
            <h1 className="notification__heading">|</h1>
            <div className='notification__block'>
                {mes && mes.map(message => 
                    <Message message={message.message} time={message.timeStamp
                    } type={message.type}></Message>
                )}
            </div>
                
        </div>
    );

}

export default Notification;