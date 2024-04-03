import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  function TemperatureChart(props) 
{
    const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Temperature - Humidity Chart',
        color: 'white',
        font: {
          size: 23,
        },
      
      },
    },
  };
  
  const labels = ['0', '1', '2', '3', '4', '5', '6','7','8','9','10', '11', '12', '13', '14', '15',
                  '16', '17','18','19','20','21','22','23'];
  
  //const data1 = labels.map(() => faker.datatype.number({ min: 0, max: 100 }));
  //const data2 = labels.map(() => faker.datatype.number({ min: 0, max: 100 }));
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature',
        data: props.data1,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Humidity',
        data: props.data2 ,//labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
    return (
        <Line options={options} data={data} color="red" />
    )
}

export default TemperatureChart;