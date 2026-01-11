from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import math

app = FastAPI(title="TransSecure API")

# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= UTILS =================
def haversine(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon / 2) ** 2
    )
    return 2 * R * math.asin(math.sqrt(a))


# ================= TRANSACTIONS =================
def get_transactions(card_number: str):
    last_digit = int(card_number[-1])
    base_time = datetime(2026, 1, 5, 10, 0, 0)

    # -------- SAFE --------
    if last_digit in [0, 1, 2]:
        return [
            {
                "time": base_time.strftime("%Y-%m-%d %H:%M:%S"),
                "city": "Delhi",
                "lat": 28.6139,
                "lon": 77.2090,
                "amount": 1200,
            },
            {
                "time": (base_time + timedelta(hours=2)).strftime("%Y-%m-%d %H:%M:%S"),
                "city": "Noida",
                "lat": 28.5355,
                "lon": 77.3910,
                "amount": 1800,
            },
        ]

    # -------- LIKELY FRAUD --------
    if last_digit in [3, 4, 5]:
        return [
            {
                "time": base_time.strftime("%Y-%m-%d %H:%M:%S"),
                "city": "Delhi",
                "lat": 28.6139,
                "lon": 77.2090,
                "amount": 3000,
            },
            {
                "time": (base_time + timedelta(hours=3)).strftime("%Y-%m-%d %H:%M:%S"),
                "city": "Mumbai",
                "lat": 19.0760,
                "lon": 72.8777,
                "amount": 95000,
            },
        ]

    # -------- FRAUD --------
    return [
        {
            "time": base_time.strftime("%Y-%m-%d %H:%M:%S"),
            "city": "Delhi",
            "lat": 28.6139,
            "lon": 77.2090,
            "amount": 2500,
        },
        {
            "time": (base_time + timedelta(minutes=30)).strftime("%Y-%m-%d %H:%M:%S"),
            "city": "London",
            "lat": 51.5074,
            "lon": -0.1278,
            "amount": 180000,
        },
    ]


# ================= ANALYSIS =================
def analyze(transactions):
    max_speed = 0
    flagged_index = None

    for i in range(len(transactions) - 1):
        t1, t2 = transactions[i], transactions[i + 1]

        time1 = datetime.strptime(t1["time"], "%Y-%m-%d %H:%M:%S")
        time2 = datetime.strptime(t2["time"], "%Y-%m-%d %H:%M:%S")
        hours = abs((time2 - time1).total_seconds()) / 3600

        distance = haversine(t1["lat"], t1["lon"], t2["lat"], t2["lon"])
        speed = distance / hours
        max_speed = max(max_speed, speed)

        if speed > 900:
            flagged_index = i + 1

    if max_speed > 1200:
        return {
            "status": "FRAUD",
            "overall_risk_score": 95,
            "reason": "Impossible travel detected",
            "flagged_index": flagged_index,
        }

    if max_speed > 500:
        return {
            "status": "LIKELY FRAUD",
            "overall_risk_score": 65,
            "reason": "Unusually fast travel detected",
            "flagged_index": flagged_index,
        }

    return {
        "status": "SAFE",
        "overall_risk_score": 20,
        "reason": "Normal transaction behavior",
        "flagged_index": None,
    }


# ================= API =================
@app.get("/analyze-card/{card_number}")
def analyze_card(card_number: str):
    transactions = get_transactions(card_number)
    analysis = analyze(transactions)

    return {
        "card_last4": card_number[-4:],
        "transactions": transactions,
        "analysis": analysis,
    }
