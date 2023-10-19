import csv
import json

from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

#left1
@app.route('/sale_month')
def sale_month():
    data = []
    with open("./static/data/month_summary.csv", "r", encoding="utf-8") as csvfile:
        csvreader = csv.DictReader(csvfile)
        for row in csvreader:
            data.append({
                "region": row["region"],
                "total_sales_amount": float(row["total_sales_amount"]),
                "total_profit": float(row["total_profit"])
            })
    return jsonify(data=data)


#left2
@app.route('/sales_product')
def sales_product():
    # 读取sales_product.json文件
    with open('./static/data/sales_product.json', 'r',encoding='utf-8') as json_file:
        data = json.load(json_file)

    return jsonify(data)

#center
@app.route('/provice')
def provice():
    data = []
    with open("./static/data/city_summary.csv", "r", encoding="utf-8") as csvfile:
        csvreader = csv.DictReader(csvfile)
        for row in csvreader:
            data.append({
                "city": row["city"],
                "total_sales_amount": float(row["total_sales_amount"]),
                "total_profit": float(row["total_profit"])
            })
    return jsonify(data=data)


#right1
@app.route('/region')
def region():
    data = []
    with open("./static/data/region_summary.csv", "r", encoding="utf-8") as csvfile:
        csvreader = csv.DictReader(csvfile)
        for row in csvreader:
            data.append({
                "region": row["region"],
                "total_sales_amount": float(row["total_sales_amount"]),
                "total_profit": float(row["total_profit"])
            })
    return jsonify(data=data)

#right2
@app.route('/sellers')
def sellers():
    data = []
    with open("./static/data/sellers_summary.csv", "r", encoding="utf-8") as csvfile:
        csvreader = csv.DictReader(csvfile)
        for row in csvreader:
            data.append({
                "seller": row["seller"],
                "total_sales_amount": float(row["total_sales_amount"]),
                "total_profit": float(row["total_profit"])
            })
    return jsonify(data=data)


if __name__ == "__main__":
    app.run(host='127.0.0.1', debug=True)
