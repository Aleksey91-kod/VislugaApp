import csv

nis_data = {
    2005: 37000,
    2006: 40600,
    2007: 82800,
    2008: 89900,
    2009: 168000,
    2010: 175600,
    2011: 189800,
    2012: 205200,
    2013: 222000,
    2014: 233100,
    2015: 245880,
    2016: 245880,
    2017: 260141,
    2018: 268465.6,
    2019: 228009.7,
    2020: 288410,
    2021: 299081.2,
    2022: 311044.5,
    2023: 349614,
    2024: 367444.3,
    2025: 383979.3,
}

with open('nis_data.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['year', 'amount'])
    for year in sorted(nis_data):
        writer.writerow([year, nis_data[year]])

print("nis_data.csv успешно создан!")