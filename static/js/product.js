d3.json('/sales_product', function (data) {
    var categories = ["办公用品", "技术", "家具"];
    var chartData = [];
    data.forEach(function (item) {
        var children = [];
        item.children.forEach(function (child) {
            children.push({
                name: child.name,
                value: child.value
            });
        });
        chartData.push({
            name: item.name,
            value: item.value,
            children: children
        });
    });
    var myChart = echarts.init(document.getElementById('left2'));

    // 配置项
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c}",
            backgroundColor: 'rgba(255,255,255,0.5)',
            textStyle: {
                color: 'yellow' // 设置tooltip的字体颜色为黑色
            }
        },
        series: [{
            name: '分类',
            type: 'treemap',
            width: '100%',
            height: '85%',
            avoidLabelOverlap: true,
            data: chartData,
        }]
    };

    // 使用配置项设置图表
    myChart.setOption(option);
});