# Python Microservice with React Frontend

This project is a Python-based microservice that interacts with a MySQL database and is designed to be tested with a React frontend. The backend is built using Flask and exposes APIs to handle user and product data.

🧰 Technologies Used

- **Python 3**
- **Flask**
- **Flask-CORS**
- **MySQL**
- **Werkzeug (v2.1.2)**
- **React (Frontend)**

⚙️ Setup Instructions

1. Install MySQL Server

sudo apt install mysql-server
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

2. Configure MySQL
Edit the MySQL configuration file:

sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
(Make any necessary changes — e.g., bind-address if required)


sudo mysql

CREATE DATABASE IF NOT EXISTS microservice;

CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON microservice.* TO 'username'@'localhost';

FLUSH PRIVILEGES;

EXIT;


🧪 Backend Setup
1. Create and Activate a Virtual Environment
sudo apt install python3-venv
python3 -m venv venv
source venv/bin/activate
2. Navigate to Service Directory
cd path/to/service1
3. Install Dependencies
pip install -r requirements.txt
If there's a version conflict with werkzeug, fix it:
pip uninstall werkzeug
pip install werkzeug==2.1.2
Install CORS support:
pip install flask-cors
4. Run the Flask Application
python3 app.py

🗃️ Database Schema
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



project-root/
├── venv/                     # Python virtual environment
├── web/                      # Microservices + requirements
│   ├── addusers_service/
│   │   └── app.py
│   ├── order_service/
│   │   └── app.py
│   ├── product_service/
│   │   └── app.py
│   └── requirements.txt
├── frontend/                 # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
