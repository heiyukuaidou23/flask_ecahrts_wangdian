d3.json('/sellers',function(error,response){
    if (!response || !response.data) {
        console.error('无法获取数据或数据格式不正确');
        return;
    }

    data = response.data;
    var sellers = data.map(function (d) {
        return d.seller;
    });
    var salesAmounts = data.map(function (d) {
        return d.total_sales_amount;
    });
    var profits = data.map(function (d) {
        return d.total_profit;
    });
	
// 更改图例为饼图
var myChart = echarts.init(document.getElementById('right2'));
var option = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
        {
            name: '销售额',
            type: 'pie',
            radius: ['20%', '50%'], // 设置销售额饼图半径，可以根据需求调整
            label: {
                position: 'inner' // 标签位于内圈
            },
            data: (function () {
                // 构建销售额饼图数据
                var salesData = [];
                for (var i = 0; i < sellers.length; i++) {
                    salesData.push({
                        name: sellers[i],
                        value: salesAmounts[i]
                    });
                }
                return salesData;
            })(),
        },
        {
            name: '利润',
            type: 'pie',
            radius: ['55%', '80%'], // 设置利润饼图半径，可以根据需求调整
            label: {
                formatter: '{b}: {c} ({d}%)' // 标签显示销售员名称和比例
            },
            data: (function () {
                // 构建利润饼图数据
                var profitData = [];
                for (var i = 0; i < sellers.length; i++) {
                    profitData.push({
                        name: sellers[i],
                        value: profits[i]
                    });
                }
                return profitData;
            })(),
        }
    ]
};
myChart.setOption(option);
	
	
})


