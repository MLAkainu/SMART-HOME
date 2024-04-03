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
  import { faker } from '@faker-js/faker';
  

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


  function LightChart(props) 
  {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Light Chart',
                color: 'white',
                font: {
                    size: 23,
                },
            },
        },
    };

    const labels = ['0', '1', '2', '3', '4', '5', '6','7','8','9','10', '11', '12', '13', '14', '15',
    '16', '17','18','19','20','21','22','23'];

    const data = {
        labels,
        datasets: [
            {
                label: 'light',
                data: props.data,
                borderColor: 'rgb(236, 241, 50)',
                backgroundColor: 'rgba(236, 241, 50, 0.5)',
            }
        ],
    };
    return (
        <Line options={options} data={data} color="rgb(236, 241, 50)"/>
    )
  }

    export default LightChart;