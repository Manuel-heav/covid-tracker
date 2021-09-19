import React, {useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import numeral from 'numeral'
const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
        radius: 0,
    },
    maintainAspectRatio: false,
    tootips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data){
                return numeral(tooltipItem.value).format("+0,0")
            }
        }
    }
}
}
const LineGraph = () => {
    const [data, setData] = useState({})

    // https://disease.sh/v3/covid-19/historical/all?lastdays=120
 // Idk what this is lol
 const buildChartData = (data, casesType='cases') => {
    const chartData = [];
    let lastDataPoint;
    data[casesType].forEach(date => {
        if(lastDataPoint){
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint)
        }
        lastDataPoint = data[casesType][date];
    })
    return chartData;
}
// Till here
    useEffect(() => {
            fetch("https://disease.sh/v3/covid/historical/all?lastdays=120")
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    const charData = buildChartData(data)
                    setData(charData)
                })
        },[])

       
    return (
        <div>
            <Line options={options}data={{
                datasets: [
                    {backgroundColor: "rgba(204, 16, 52, 0.2)", borderColor:"#cc1034", 
                   data: data}
                ],
            }}/>
        </div>
    )
}

export default LineGraph
