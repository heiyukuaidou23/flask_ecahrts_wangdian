document.addEventListener("DOMContentLoaded", function () {
    d3.json('/sale_month', function (response) {
        if (!response || !response.data) {
            console.error('无法获取数据或数据格式不正确');
            return;
        }

        data = response.data;

        var regions = data.map(function (d) {
            return d.region;
        });
        var salesAmounts = data.map(function (d) {
            return d.total_sales_amount;
        });
        var profits = data.map(function (d) {
            return d.total_profit;
        });

        var myChart = echarts.init(document.getElementById('left1'));
        var option = {
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['销售额(万元)', '利润(万元)'],
                textStyle: {
                    color: 'white',
                },
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: regions,
                nameTextStyle: {
                    color: 'black',
                },
                axisLine: {
                    lineStyle: {
                        color: 'white'
                    },
                }
            },
            yAxis: [
                {
                    // name: '销售额(万元)',
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: 'white'
                        },
                    },
                    min: 0,
                    max: 350,
                    interval: 50,
                    splitLine: {
                        show: false
                    }
                },
                {
                    // name: '利润(万元)',
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: 'white'
                        },
                    },
                    min: 0,
                    max: 350,
                    interval: 50,
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: '利润(万元)',
                    type: 'line',
                    stack: 'Total',
                    data: profits,
                    lineStyle: {
                        color: 'yellow'
                    },
                    yAxisIndex: 0,
                    symbolSize: 8, // 设置点的大小
                },
                {
                    name: '销售额(万元)',
                    type: 'line',
                    stack: 'Total',
                    data: salesAmounts,
                    symbol: 'emptyCircle', // 设置点的形状为圆
                    lineStyle: {
                        color: 'black'
                    },
                    yAxisIndex: 1,
                    symbolSize: 8, // 设置点的大小
                }
            ]
        };

        myChart.setOption(option);
    });
});
