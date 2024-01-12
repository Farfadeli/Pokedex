import React, { useState } from 'react'
import Chart from 'react-apexcharts'

const RadarChart = (atk, def, hp, vit, spe_atk, spe_def) => {
    const [chartData, setChartData] = useState({
        option : {
            chart: {
                id: 'radar-chart',
            },
            xaxis: {
                categories: ['HP','ATK','DEF','VIT','Spe ATK', 'Spe DEF'],
            },
        },
        series: [
            {
                name: 'Stats',
                data: [hp,atk,def,vit,spe_atk,spe_def],
            },
        ],
    });
  return (
    <div>
        <Chart
        options={chartData.option}
        series={chartData.series}
        type='radar'
        />
    </div>
  )
}

export default RadarChart