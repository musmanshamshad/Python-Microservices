from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Database connection
db_config = {
    "host": "localhost",
    "user": "myUsers",
    "password": "#Obviously94",
    "database": "microservice"
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

# Route to fetch all products
@app.route('/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM products ORDER BY created_at DESC")
    products = cursor.fetchall()
    conn.close()
    return jsonify(products)

# Route to add a new product
@app.route('/addproduct', methods=['POST'])
def add_product():
    data = request.json
    product_name = data.get("product_name")
    quantity = data.get("quantity")

    if not product_name or not quantity:
        return jsonify({"error": "Missing product_name or quantity"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "INSERT INTO products (product_name, quantity, created_at) VALUES (%s, %s, %s)"
        cursor.execute(query, (product_name, quantity, datetime.now()))
        conn.commit()
        conn.close()
        return jsonify({"message": "Product added successfully!"}), 201
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)

