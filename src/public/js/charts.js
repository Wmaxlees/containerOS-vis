var Charts = {
  updateCPU,
  updateMem,
  initCharts
}

/**
 * Inits chart objects: 2 spline charts, 1 tree chart
 */

function initCharts(){
	chart1 = new Highcharts.Chart({
      chart: {
        renderTo: 'chart-1',
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
          stops: [
            [0, 'rgb(255, 255, 255)'],
            [1, 'rgb(153, 255, 204)']
          ]
        },
        defaultSeriesType: 'spline',
        // events: {
        // 	load: requestData
        // }
      },
      title: {
        text: 'CPU Usage'
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150,
        maxZoom: 20 * 1000
      },
      yAxis: {
        minPadding: 0.2,
        maxPadding: 0.2,
        title: {
          text: 'Percentage',
          margin: 80
        }
      },
      series: [{
        name: 'Host',
        data: [],
        color: 'black'
      },{
        name: 'Container',
        data: [],
        color: 'blue'
      },{
        name: 'Container',
        data: [],
        color: 'orange'
      },{
        name: 'Container',
        data: [],
        color: 'red'
      },{
        name: 'Container',
        data: [],
        color: 'yellow'
      }]
  });
  chart2 = new Highcharts.Chart({
    chart: {
      renderTo: 'chart-2',
      defaultSeriesType: 'spline',
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
          [0, 'rgb(255, 255, 255)'],
          [1, 'rgb(178, 255, 102)']
        ]
      },
    },
    title: {
      text: 'CPU Usage Variance'
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150,
      maxZoom: 20 * 1000
    },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: {
        text: 'Percentage',
        margin: 80
      }
    },
    series: [{
      name: 'Variance',
      data: [],
      color: 'orange'
    }]
  });
}

function updateCPU (/*arr  the array [Date.now(),x1,x2,..,xn]*/) {
  // updates chart
  
}

function updateMem (arr /* whatever you need here too */) {
  console.log('updateMem called with ' + arr)
  // updates other thingie
}