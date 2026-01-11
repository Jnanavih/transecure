import math
from datetime import datetime

def haversine(lat1, lon1, lat2, lon2):
    """
    Calculate distance between two lat/lon points in km
    """
    R = 6371  # Earth radius in km
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)

    a = (
        math.sin(dphi / 2) ** 2
        + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2
    )

    return 2 * R * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def hours_between(t1, t2):
    """
    Calculate time difference in hours
    """
    fmt = "%Y-%m-%d %H:%M:%S"
    dt1 = datetime.strptime(t1, fmt)
    dt2 = datetime.strptime(t2, fmt)
    return abs((dt2 - dt1).total_seconds()) / 3600
