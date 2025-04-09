from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database connection
conn = mysql.connector.connect(
    host="localhost",
    user="myUsers",
    password="#Obviously94",
    database="microservice"
)
cursor = conn.cursor()

@app.route('/adduser', methods=['POST'])
def add_user():
    try:
        data = request.json
        username = data.get("username")
        phone = data.get("phone")
        password = data.get("password")

        if not (username and phone and password):
            return jsonify({"error": "All fields are required"}), 400

        cursor.execute("INSERT INTO users (username, phone, password) VALUES (%s, %s, %s)", 
                       (username, phone, password))
        conn.commit()
        return jsonify({"message": "User added successfully"}), 201

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)

