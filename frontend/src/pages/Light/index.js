import { React, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updatelight, getlight, putmessage, updatelux } from "../../redux/apiRequest"
import LightChart from "../../components/chart/LightChart"
import "./Light.css"
import { useSelector, useDispatch } from "react-redux"
import { FaFilter } from "react-icons/fa";
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";



function Light({token}) {
    const dispatch = useDispatch();
    //lay data tu api light
    // let getLights = useSelector(state => state.IoT.light);
    // const [lights, setLights] = useState(getlights);

    

    const [lights, setLights] = useState([]);
    const [light, setLight] = useState(0);
    const [filter, setFilter] = useState(0);
    const [selecdate, setSelectdate] = useState(new Date());
    const showToastLight = () => {
        toast.error(' Ánh sáng vượt quá ngưỡng cho phép!', {
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

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let temp = `${year}${month}${day}`;
                
                let light = await updatelux(token, dispatch, temp);
                
                setLight(light);
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
             }, 5000);
            return () => clearInterval(intervalId);

    }, [light]);

   

    

    useEffect(() => {
        errorLight(light)
    },[light])

    // useEffect(() => {
    //     const intervalId = setInterval(async () => {
    //         try {
    //             let date = new Date();
    //             let year = date.getFullYear();
    //             let month = date.getMonth() + 1;
    //             let day = date.getDate();
    //             let temp = `${year}${month}${day}`;
    //             let latest = await updatelight(dispatch, temp);
    //             setLight(latest);
    //             if (filter == 0) {
    //                 setLights(getlights);
    //             }
    //             errorLight(latest);
    //         }
    //         catch (err) {
                
    //         }
    //     }, 5000);
    //     return () => clearInterval(intervalId);
    // }, [lights]);


    

    // if (light == underfined) setLight(0);

    // var clockLight = light;

    var clockLight = light;
    console.log("light", light);
    var colorLight = "rgb(236, 241, 50)";

    // var data = ['50','100','150','500','250','100','350','400', '0','0'];
    // lay value cho data
    // if (lights.length > 0) {
    //     for (var i = 0; i <= 23; i++) {
    //         data.push(lights[i].value);
    //     }
    // }

    let li

    const handlefilter = async () => {
        
        li = await getlight(token, selecdate);
        console.log("li", li);
        let temp = []

        for (var i = 0; i <= 23; i++) {
            if (li[i] == null) {
                temp.push('0')
            }
            else {
                temp.push(li[i].toString() )
            }
        }
        setLights(temp);


    }

    console.log("light", lights);

    async function errorLight (light) {
        if (light == 0) {
            return; 
        }

        else if (light< 20 || light > 400) {
            showToastLight()
            let message = {
                content: "Ánh sáng quá ngưỡng",
                type: "3"
            }
            await putmessage(message, token)
            console.log("Check Light", light)
        }
    }


        
    




    // const handlefilter = async () => {
    //     let date = new Date(selectdate)
    //     let year = date.getFullYear()
    //     let month = date.getMonth() + 1
    //     let day = date.getDate()
    //     let temp = `${year}${month}${day}`
    //     let currentday = new Date().getDate()
    //     if (currentday == day) setFilter(0)
    //     else setFilter(1)
    //     let newlights = await getlight(temp)
    //     setLights(newlights)
    // }
    return (
        <div className="Light">
            <div className="Light__left">
                <div className='Light__left-heading'>
                    |
                </div>
                <div className='Light__left-chart'>
                    <LightChart data={lights} />
                </div>

            </div>
            <div className="Light__right">
                <h2 className='Light__right-heading'>Clock</h2>
                <div className='Light__right-clock'>
                    <div className='clock-temperature'>
                        <CircularProgressbar
                            value={clockLight / 500 * 100}
                            text={`${clockLight}lux`}
                            strokeWidth={8}
                            styles={buildStyles({
                                pathColor: colorLight,
                                textColor: '#f4f3f5',
                                textSize: '25px',
                                trailColor: '#19203b',
                                backgroundColor: 'red',
                            })}
                        />
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


                </div>
                <div className='filter'>
                    {/* <input className='filter__input' type="date" onChange={(e) => {setSelectdate(e.target.value)}} /> */}
                    <input className='filter__input' type="date" onChange={(e) => {setSelectdate(e.target.value)}} />
                    {/* <button className='filter__btn' onClick={handlefilter}> */}
                    <button className='filter__btn' onClick={handlefilter} >
                        <i className="filter__icon fa-solid fa-filter"><FaFilter /></i>
                    </button>

                </div>
            </div>
        </div>
    )





}
export default Light;