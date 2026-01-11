def analyze_transactions(transactions, card_number):
    last_digit = int(card_number[-1])

    if last_digit <= 3:
        status = "SAFE"
        risk_score = 20
        reason = "Normal spending pattern detected"
        flagged_index = None

    elif last_digit <= 6:
        status = "LIKELY_FRAUD"
        risk_score = 60
        reason = "Unusual location change detected"
        flagged_index = 1

    else:
        status = "FRAUD"
        risk_score = 95
        reason = "Impossible travel detected"
        flagged_index = 1

    return {
        "status": status,
        "risk_score": risk_score,
        "reason": reason,
        "flagged_index": flagged_index
    }
