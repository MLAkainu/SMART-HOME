import { React, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TemperatureChart from "../../components/chart/TemperatureChart";
import "./TemperHumi.css"
import { useSelector, useDispatch } from "react-redux"
import { updatetemperhumid, gettemper, gethumid, putmessage } from '../../redux/apiRequest';
import { FaFilter } from "react-icons/fa";
// Import react-circular-progressbar module and styles
import {
    CircularProgressbar,
    buildStyles

} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const showToastTemper = () => {
    toast.error('Nhiệt độ vượt quá ngưỡng cho phép!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

const showToastHumi = () => {
    toast.error(' Độ ẩm vượt quá ngưỡng cho phép!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

function TemperHumi({token}) {
    //lay du lieu user tu api
    // const user = useSelector((state) => state.auth_.login?.currentUser)
    

    const dispatch = useDispatch();

    // Kiểm tra ngưỡng
    

    // let gettempers = useSelector((state) => state.IoT.temperature)
    // let gethumids = useSelector((state) => state.IoT.humidity)
    // const [tempers, setTempers] = useState(gettempers);
    // const [humis, setHumis] = useState(gethumids);
    const [tempers, setTempers] = useState([]);
    const [humis, setHumis] = useState([]);
    const [temper, setTemper] = useState(0);
    const [humid, setHumid] = useState(0);
    const [filter, setFilter] = useState(0);
    const [selectdate, setSelectdate] = useState(new Date());

    

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let temp = `${year}${month}${day}`;
                let latest = await updatetemperhumid(token, dispatch, temp);
               
                setTemper(latest.temp);
                setHumid(latest.humid);
                
                // await errorTemper(latest.temp);
                // await errorHumi(latest.humid);

                // axios 
                // .get(`${process.env.REACT_APP_API_AI}`)
                // .then(res => {
                //     setFace(res.data[0].value)
                // })
                // .catch(err => console.error(err))

                console.log("RUN")
            }
            catch (err) {
                console.error("Fail", err)
            }
             }, 10000);
            return () => clearInterval(intervalId);

    }, []);

    
        useEffect(() => {
          const interval = setInterval(() => {
            errorTemper(tempers);
            errorHumi(humid);
          }, 10000);
          return () => clearInterval(interval);
        }, [tempers, humid]);



    // useEffect(() => {
    //     const intervalId = setInterval(async () => {
    //         try {
    //             let date = new Date()
    //             let year = date.getFullYear()
    //             let month = date.getMonth() + 1
    //             let day = date.getDate()
    //             let temp = `${year}${month}${day}`
    //             let latest = await updatetemperhumid(dispatch, temp)
    //             setTemper(latest.temp)
    //             setHumid(latest.humid)
    //             if (filter == 0) {
    //                 setTempers(gettempers)
    //                 setHumis(gethumids)
    //                 console.log("Run + Filter", filter)
    //             }
    //             console.log("Run1", filter)
    //             await errorTemper(latest.temp)
    //             await errorHumi(latest.humid)
    //         }
    //         catch (e) {
    //             console.log("Fail", e)
    //         }
    //     }, 5000);
    //     return () => clearInterval(intervalId);
    // }, [tempers, humis]);


    // var clockTemper = temper == 0 ? 0 : temper
    // var clockHumi = humid == 0 ? 0 : humid
    var clockTemper = temper;
    var clockHumi = humid;
    var colorTemper = '#ff6384';
    var colorHumi = '#3ecdef';
    // var colorTemper = clockTemper < 15 || clockTemper > 50 ? "#ff6384" : '#3ecdef';
    // var colorHumi = clockHumi < 20 || clockHumi > 80 ? "#ff6384" : '#3ecdef';

    // var data1 = ['37', '38', '39', '36', '35', '38', '32', '0']
    // var data2 = ['50', '51', '52', '53', '54', '55', '56', '0']

    const [test, setTest] = useState([])



    let data;
    const fdata = async () => {
        data = await gethumid(token, "2024-05-01")
        console.log(data[0])
        let temp = []
        for (var i = 0; i <= 23; i++) {
            if (data[i] == null) {
                temp.push('0')
            }
            else {
                temp.push(data[i].toString() )
            }
            

        }


        setTest(temp)

    }
    useEffect(() => {
        fdata()
    },[])



    console.log("T", test)

    var data1 = test

    // add value vao data
    // if (tempers.length > 0) {
    //     for (var i = 0; i <= 23; i++) {
    //         data1.push(tempers[i].value);
    //     }
    // }
    // if (humis.length > 0) {
    //     for (var i = 0; i <= 23; i++) {
    //         data2.push(humis[i].value);
    //     }
    // }

    console.log("Select Date", selectdate)

    let hu
    let te
    const handlefilter = async () => {
        // let date = new Date(selectdate)
        // let year = date.getFullYear()
        //  let month = date.getMonth() + 1
        // let day = date.getDate()
        //  let temp = `${year}${month}${day}`

        hu = await gethumid(token, selectdate)
        te = await gettemper(token, selectdate)
        console.log(hu[0])
        console.log(te[0])
        let temp = []
        let temp_ = []
        for (var i = 0; i <= 23; i++) {
            if (hu[i] == null) {
                temp.push('0')
            }
            else {
                temp.push(hu[i].toString() )
            }
            if (te[i] == null) {
                temp_.push('0')
            }
            else {
                temp_.push(te[i].toString() )
            }
        }
        setHumis(temp)
        setTempers(temp_)

        console.log("Result1", selectdate)
        console.log("Result2", temp)
    }

    console.log("ResultH", humis)
    console.log("ResultT", tempers)

    async function errorTemper (temper) {
        if (temper == 0) {
            return;
        }
        else if (temper < 15 || temper > 50 ) {
            showToastTemper()
            let message = {
                message: "Nhiệt độ quá ngưỡng",
                type: "3"
            }
            await putmessage(message, token)
            console.log("Check Temp", temper)
        }
    }
    
    async function errorHumi (humi) {
        if (humi == 0) {
            return;
        }
        else if (humi < 20 || humi > 80) {
            showToastHumi()
            let message = {
                message: "Độ ẩm quá ngưỡng",
                type: "3"
            }
            await putmessage(message, token)
            console.log("Check Humi", humi)
        }
    }




    // const handlefilter = async () => {
    //     let date = new Date(selectdate)
    //     let year = date.getFullYear()
    //     let month = date.getMonth() + 1
    //     let day = date.getDate()
    //     let temp = `${year}${month}${day}`
    //     let newtemper = await gettemper(temp)
    //     let newhumid = await gethumid(temp)
    //     let currentday = new Date().getDate()
    //     if (currentday == day) setFilter(0)
    //     else setFilter(1)
    //     setHumis(newhumid)
    //     setTempers(newtemper)
    //     console.log("Result1", temp)
    //     console.log("Result2", newtemper, newhumid)
    //     console.log("Filter", filter)
    // }

    return (
        <div className="temperHumi">
            <div className="temperHumi__left">
                <div className='temperHumi__left-heading'>
                    |
                </div>
                <div className='temperHumi__left-chart'>
                    <TemperatureChart data1={humis} data2={tempers} />
                </div>

            </div>
            <div className="temperHumi__right">
                <h2 className='temperHumi__right-heading'>Clock</h2>
                <div className='temperHumi__right-clock'>
                    <div className='clock-temperature'>
                        <CircularProgressbar
                            value={clockTemper}
                            text={`${clockTemper}°C`}
                            strokeWidth={8}
                            styles={buildStyles({

                                pathColor: colorTemper,
                                textColor: '#f4f3f5',
                                textSize: '25px',
                                trailColor: '#19203b',
                                backgroundColor: 'red',

                            })}
                        />

                    </div>
                    <div className='clock-humidity' >
                        <CircularProgressbar

                            value={clockHumi}
                            text={`${clockHumi}%`}
                            strokeWidth={8}
                            styles={buildStyles({

                                pathColor: colorHumi, //`rgba(137, 233, 233, ${percentage / 100})`,
                                textColor: '#f4f3f5',
                                textSize: '25px',
                                trailColor: '#19203b',
                                backgroundColor: 'red',

                            })}
                        />
                    </div>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                {/* Same as */}

                <div className='filter'>
                    
                    {/* <input className='filter__input' type="date" onChange={(e) => { setSelectdate(e.target.value) }} /> */}
                    <input className='filter__input' type="date" onChange={(e) => { setSelectdate(e.target.value) }} />
                    <button className='filter__btn' onClick={handlefilter}>
                        <i className="filter__icon fa-solid fa-filter"><FaFilter /></i> 
                    </button>
                    

                </div>
            </div>
        </div>
    )

}

export default TemperHumi;



