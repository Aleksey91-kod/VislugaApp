from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import csv
import os

app = FastAPI()

# Разрешаем запросы с фронта
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/nis-data")
def get_nis_data():
    data = {}
    csv_path = os.path.join(os.path.dirname(__file__), '../../nis_data.csv')
    with open(csv_path, encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            year = str(row['Год'])
            amount = float(row['Сумма'])
            data[year] = amount
    return data 