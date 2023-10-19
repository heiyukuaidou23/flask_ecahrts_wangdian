d3.json('/region', function (error, response) {
    if (!response || !response.data) {
        console.error('无法获取数据或数据格式不正确');
        return;
    }

    data = response.data;
    var categories = data.map(function (d) {
        return d.region;
    });
    var salesAmounts = data.map(function (d) {
        return d.total_sales_amount;
    });
    var profits = data.map(function (d) {
        return d.total_profit;
    });

    // 初始化 ECharts 实例
    var myChart = echarts.init(document.getElementById('right1'));

    // 自定义主题，设置不同颜色
    var theme = {
        color: ['#f56c42', '#0000FF'], // 使用橙色和蓝色
        tooltip: {
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: categories,
            axisLabel: {
                rotate: 45,
            },
        },
        yAxis: {
            type: 'value',
            // name: '金额',
            lineStyle: {
                color: '#FFE4E1' // 设置y轴轴线的颜色
            }
        },
        series: [
            {
                name: '销售额',
                type: 'bar',
                data: salesAmounts,
                itemStyle: {
                    color: '#f56c42' // 设置柱子颜色为橙色
                }
            },
            {
                name: '利润',
                type: 'bar',
                data: profits,
                itemStyle: {
                    color: '#0000FF' // 设置柱子颜色为蓝色
                }
            }
        ]
    };

    // 使用自定义主题

    // 设置图表配置
    var option = {
        color: ['#f56c42', '#CD6090'], // 使用橙色和蓝色
        title: {
            textStyle: {
                color: '#0000FF', // 设置标题颜色
                fontSize: 18 // 设置标题字体大小
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['销售额', '利润'],
            textStyle: {
                color: '#FFE4E1' // 设置图例文字颜色
            }
        },
        toolbox: {
            show: true,
        },
        xAxis: {
            type: 'category',
            data: categories,
            axisLabel: {
                rotate: 45,
                color: '#FFE4E1' // 设置X轴标签颜色
            },
        },
        yAxis: {
            type: 'value',
            name: '金额',
            axisLabel: {
                color: '#FFE4E1' // 设置Y轴标签颜色
            }
        },
        series: [
            {
                name: '销售额',
                type: 'bar',
                data: salesAmounts,
                barCategoryGap: '50%'
            },
            {
                name: '利润',
                type: 'bar',
                data: profits,
                barCategoryGap: '50%'
            }
        ]
    };

    // 设置图表主题
    myChart.setOption(option);
});
