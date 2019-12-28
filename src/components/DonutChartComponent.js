import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {CORRECT_ANSWER_TEXT, INCORRECT_ANSWER_TEXT, NOT_ATTEMPTED_TEXT } from '../Constants/Constants';

function DonutChartComponent(props){
	
	const getFormateddata=()=>{
		let tempArray=[];
		let sum=0
		let itemdata=props.donutDat;
		if(itemdata.currectCount){
			tempArray[0]=itemdata.currectCount;
			sum=itemdata.currectCount;
		}
		if(itemdata.inCurrectCount){
			tempArray[1]=itemdata.inCurrectCount;
			sum=sum+itemdata.inCurrectCount
		}
		tempArray[2]=100 - parseInt(sum);
		return tempArray;
	}
	const data = {
		labels: [
			CORRECT_ANSWER_TEXT,
			INCORRECT_ANSWER_TEXT,
			NOT_ATTEMPTED_TEXT
		],
		datasets: [{
			data: getFormateddata(),
			backgroundColor: [
			'#067332',
			'#ff0000',
			'#b4b4b4'
			],
			hoverBackgroundColor: [
			'#067332',
			'#ff0000',
			'#b4b4b4'
			]
		}]
	};
	return (
		<Doughnut data={data}
			width={200} 
			 options={{
                title: {
                display: props.donutTitl,                
                 },                
                legend: {
                display: true,
                position: "bottom",
                  },
                  maintainAspectRatio: true,
              	responsive: true,
              	tooltips: {
			    callbacks: {
			      label: function(tooltipItem, data) {
			        var dataset = data.datasets[tooltipItem.datasetIndex];			        
			        var currentValue = dataset.data[tooltipItem.index];			        
			        return currentValue + ' (%)';
			      },
			      title: function(tooltipItem, data) {
			        return data.labels[tooltipItem[0].index];
			      }
			    }
			  }
            }}
		/>
		);
}

export default DonutChartComponent;
