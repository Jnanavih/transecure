TransSecure – Credit Card Fraud Detection System

TransSecure is a full-stack Credit Card Fraud Intelligence System that detects fraudulent transactions using geolocation, time-gap analysis, and behavioral rules.
It visualizes transaction timelines, risk scores, and maps suspicious activity in real time.
Features
	•	🔐 Credit card–based fraud analysis
	•	📍 Geolocation-based transaction tracking
	•	⏱️ Time-gap & impossible travel detection
	•	📊 Risk score classification:
	•	SAFE
	•	LIKELY FRAUD
	•	FRAUD
	•	🗺️ Interactive transaction map with travel paths
	•	📈 Transaction timeline view
	•	⚡ Real-time frontend–backend integration
  Tech Stack

Frontend
	•	React (Vite)
	•	Leaflet (Maps)
	•	JavaScript
	•	CSS

Backend
	•	FastAPI
	•	Python
	•	Uvicorn

Tools & Deployment
	•	Git & GitHub
transecure/
│
├── backend/
│   ├── main.py
│   ├── fraud_engine.py
│   ├── data.py
│   ├── utils.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── RiskGauge.jsx
│   │   │   └── TransactionMap.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── README.md

How It Works
	1.	User enters a credit card number
	2.	Backend simulates last 7 days of transactions
	3.	Fraud rules check:
	•	Distance vs time gap
	•	Unusual locations
	•	High-value transactions
	4.	System assigns:
	•	Risk score (0–100)
	•	Status (SAFE / LIKELY FRAUD / FRAUD)
	5.	Results shown with:
	•	Timeline
	•	Risk gauge
	•	Transaction map
Running Locally
Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

Backend runs at:
http://127.0.0.1:8000

API Docs:
http://127.0.0.1:8000/docs

Frontend
cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173

Deployment
	•	Frontend deployed using Vercel
	•	Backend can be deployed using Render

(Backend URL can be updated in frontend/src/services/api.js)
