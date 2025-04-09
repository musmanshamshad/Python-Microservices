from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Reusable function to connect to MySQL
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="myUsers",
        password="#Obviously94",
        database="microservice"
    )

@app.route("/products", methods=["GET"])
def get_products():
    """Fetch all products from the database."""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(products)

@app.route("/order", methods=["POST", "OPTIONS"])
def place_order():
    """Handles placing an order."""
    if request.method == "OPTIONS":
        return '', 204  # Preflight response

    data = request.json
    username = data.get("username")
    product_ids = data.get("product_ids")

    if not username or not product_ids:
        return jsonify({"error": "Missing username or products"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        for product_id in product_ids:
            # Insert order record
            cursor.execute(
                "INSERT INTO orders (username, product_id, quantity) VALUES (%s, %s, %s)",
                (username, product_id, 1)
            )

            # Update product quantity (optional logic to reduce stock)
            cursor.execute(
                "UPDATE products SET quantity = quantity - 1 WHERE id = %s AND quantity > 0",
                (product_id,)
            )

        conn.commit()
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

    return jsonify({"message": "Order placed successfully!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5003)
