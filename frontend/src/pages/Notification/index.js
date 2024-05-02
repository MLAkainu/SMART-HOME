import Message from "../../components/Message";
import "./Notification.css"
import { getmessage } from "../../redux/apiRequest"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

function Notification() { 
    // const [mes, setMes] = useState([]);
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

    var mes = []

    mes = [{
        content: "Cửa đã được mở",
        date: "2024-10-10",
        type: "1"
    }, {
        content: "Đèn đã được bật",
        date: "2024-10-10",
        type: "2"
    }, {
        content: "Quạt đã được bật",
        date: "2024-10-10",
        type: "3"
    } ,

    { content: "Cửa đã được mở",
    date: "2024-10-10",
    type: "4"
    }, 
    { content: "Cửa đã được mở",
    date: "2024-10-10",
    type: "5"
    },
    

]

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