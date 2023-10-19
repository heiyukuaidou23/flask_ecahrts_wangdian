d3.json('/provice', function (response) {
    // 检查response是否为空或不包含data属性
    if (!response || !response.data) {
        console.error('无法获取数据或数据格式不正确');
        return; // 防止继续处理数据
    }

    data = response.data;

    // 继续处理数据

    var salesAmounts = data.map(function (d) {
        return {name: d.city, value: d.total_sales_amount};
    });
    var profits = data.map(function (d) {
        return {name: d.city, value: d.total_profit};
    });

    // 使用echarts.getMap()函数来获取中国地图的json文件
    var map = echarts.getMap('china');

    var myChart = echarts.init(document.getElementById('center'));
    var option = {
        visualMap: {
            type: 'continuous', // 使用连续型视觉映射
            min: 12000000, // 视觉映射的最小值
            max: 18000000, // 视觉映射的最大值
            calculable: true,
            inRange: {
                color: ['#FFFFFF', '#8470FF'], // 视觉映射的颜色范围
                symbolSize: [10, 50] // 视觉映射的散点大小范围
            },
            outOfRange: {
                color: '#eee' // 超出范围的数据的颜色
            },
            textStyle: {
                color: '#396f75', // 文本的颜色
                fontSize: 14 // 文本的字体大小
            },
            calculable: true // 是否显示拖拽用的手柄
        },
        tooltip: {
            trigger: 'item', // 触发类型，item表示触发在数据项上
            formatter: function (params) { // 格式化提示框的内容
                console.log(params)
                return params.name + '<br/>' + '销售额: ' + params.value + '<br/>' + '利润: ' + params.data
                    .value;
            }
        },
        series: [{
            name: '销售额',
            type: 'map',
            map: 'china',
            data: salesAmounts,
            label: {
                show: true,
                emphasis: {
                    show: true
                }
            },
        },
            {
                name: '利润',
                type: 'scatter',
                coordinateSystem: 'geo', // 使用地理坐标系
                data: profits, // 使用list2作为散点图的数据
                symbolSize: function (value) { // 根据profit值设置散点大小
                    return Math.sqrt(value) / 5;
                }
            }
        ],
    };

    // 为 ECharts 实例加载配置和数据
    myChart.setOption(option);

})