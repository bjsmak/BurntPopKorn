import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { MovieService } from "../../authentication/MovieService";

const BarGraph = () => {
    const [barGraphData, setBarGraphData] = useState(null)



    useEffect(() => {
        // Get the user's saved movies
        MovieService.getMovies()
        .then(res => {

            // If no user is logged in, return so page doesn't crash
            if(res.message?.msgError) {
                return;
            }
            // If user has no movies, return so page doesn't crash
            if(res.movies.length < 1) {
                return;
            }

            const labels = [];
            const data = [];
            // Pull out the relevent data
            res.movies.forEach(movie => {
                labels.push(movie.title);
                data.push(movie.userRating);
            });

            let colorBars = 0;
            const backgroundColors = [];
            const labelsP = labels
            const barGraphSort = () => {
                console.log(colorBars)
                for(let i=0; i<labelsP.length; i++){
                    console.log(i)
                    if(colorBars === 0){
                        backgroundColors.push('#EE1D24');
                        console.log(colorBars)
                        console.log(backgroundColors)
                        colorBars++
                    } else if (colorBars === 1){
                        backgroundColors.push('#00ACEB');
                        console.log(colorBars)
                        colorBars++
                    } else if (colorBars === 2){
                        backgroundColors.push('#FDCF05');
                        console.log(colorBars)
                        colorBars++
                    } else {colorBars = 1;
                    backgroundColors.push('#EE1D24');}
        
            }
            return backgroundColors
            }
   
            // Format it for Chart.js
            const graphObj = {
                labels,
                datasets: [
                    {
                    label: 'Ratings',
                    backgroundColor: barGraphSort(backgroundColors),
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data
                }
                ]
            }
            setBarGraphData(graphObj);
        })
    },[])

    return (
        <div>
            <Bar
            data={barGraphData}
            options={{
                scales: {
                    yAxes: [{
                        ticks: {
                            stepSize: 1,
                            min: 0,
                            max: 5
                        }
                      }],
                },
                title:{
                display:true,
                text:'Your Ratings',
                fontSize:20,
                },
                legend:{
                display:false
                }
            }}
            />
        </div>

    )
}
export default BarGraph;




