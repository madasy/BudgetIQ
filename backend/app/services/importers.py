import csv
from datetime import datetime
from decimal import Decimal
from io import StringIO


def parse_decimal(value: str) -> Decimal:
  if value is None:
    return Decimal("0")
  cleaned = value.strip().replace(" ", "").replace(",", ".")
  if not cleaned:
    return Decimal("0")
  return Decimal(cleaned)


def parse_date(value: str, fmt: str) -> datetime.date:
  return datetime.strptime(value.strip(), fmt).date()


def parse_migros_csv(contents: str):
  lines = [line.strip() for line in contents.splitlines() if line.strip()]
  header_index = next((idx for idx, line in enumerate(lines) if line.startswith("Datum;")), None)
  if header_index is None:
    return []
  reader = csv.DictReader(StringIO("\n".join(lines[header_index:])), delimiter=";")
  rows = []
  for row in reader:
    amount = parse_decimal(row.get("Betrag"))
    rows.append(
      {
        "date": parse_date(row.get("Datum"), "%d.%m.%y"),
        "description": row.get("Buchungstext", "").strip(),
        "amount": abs(amount),
        "type": "expense" if amount < 0 else "income",
        "currency": "CHF",
      }
    )
  return rows


def parse_yuh_csv(contents: str):
  lines = [line.strip() for line in contents.replace("\ufeff", "").splitlines() if line.strip()]
  header_index = next((idx for idx, line in enumerate(lines) if line.startswith("DATE;ACTIVITY TYPE;")), None)
  if header_index is None:
    return {"rows": [], "lots": []}
  reader = csv.reader(StringIO("\n".join(lines[header_index:])), delimiter=";")
  rows = []
  lots = []
  for row in reader:
    if not row or row[0] == "DATE":
      continue
    date_str = row[0].strip()
    activity_type = row[1].strip()
    activity_name = row[2].strip().strip("\"")
    debit = parse_decimal(row[3])
    debit_currency = row[4].strip() if len(row) > 4 else ""
    credit = parse_decimal(row[5]) if len(row) > 5 else Decimal("0")
    credit_currency = row[6].strip() if len(row) > 6 else ""
    fee_amount = parse_decimal(row[11]) if len(row) > 11 else Decimal("0")
    side = row[12].strip() if len(row) > 12 else ""
    quantity = parse_decimal(row[13]) if len(row) > 13 else Decimal("0")
    asset = row[14].strip() if len(row) > 14 else ""
    price_per_unit = parse_decimal(row[15]) if len(row) > 15 else Decimal("0")

    if "declined" in activity_name.lower():
      continue
    if activity_type == "REWARD_RECEIVED":
      continue
    if activity_type == "INVEST_RECURRING_ORDER_REJECTED":
      continue

    amount = abs(debit) if debit else abs(credit)
    if activity_type in ("INVEST_ORDER_EXECUTED", "INVEST_RECURRING_ORDER_EXECUTED") and not amount:
      amount = abs(quantity * price_per_unit + fee_amount)

    if not amount:
      continue

    currency = debit_currency or credit_currency or "CHF"
    note = activity_name or activity_type

    rows.append(
      {
        "date": parse_date(date_str, "%d/%m/%Y"),
        "description": note,
        "amount": amount,
        "type": "expense" if debit or activity_type.startswith("INVEST") else "income",
        "currency": currency,
        "activity_type": activity_type,
        "asset": asset,
        "quantity": quantity,
        "price_per_unit": price_per_unit,
        "fee_amount": fee_amount,
        "side": side or "BUY",
      }
    )

    if activity_type in ("INVEST_ORDER_EXECUTED", "INVEST_RECURRING_ORDER_EXECUTED") and asset and quantity and price_per_unit:
      lots.append(
        {
          "date": parse_date(date_str, "%d/%m/%Y"),
          "activity_type": activity_type,
          "name": activity_name,
          "asset": asset,
          "side": side or "BUY",
          "quantity": quantity,
          "price_per_unit": price_per_unit,
          "fee_amount": fee_amount,
          "currency": currency,
          "total_amount": amount,
        }
      )
  return {"rows": rows, "lots": lots}
