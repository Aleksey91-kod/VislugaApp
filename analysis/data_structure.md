# Структура данных для мини-приложения

## Пользователь
- id (уникальный идентификатор, Telegram ID)
- фамилия
- периоды_службы: список объектов Period
- дата_расчёта
- ипотека: объект Mortgage (опционально)

## Period (Период службы)
- start_date (дата начала)
- end_date (дата окончания)
- coefficient (коэффициент: 1, 1.5, 2, 3)

## Mortgage (Ипотека)
- nis_start_date (дата вступления в НИС)
- nis_sum (накопленная сумма, рассчитывается автоматически)
- mortgage_taken (bool, взята ли ипотека)
- mortgage_date (дата взятия ипотеки)
- mortgage_sum (сумма ипотеки)
- bank_approved_sum (одобренная банком сумма)
- mortgage_paid (bool, выплачена ли ипотека)
- mortgage_paid_date (дата полного погашения)
- history (список выплат/накоплений)

## Пример структуры (JSON):
```json
{
  "id": 123456789,
  "surname": "Иванов",
  "periods": [
    {"start_date": "2010-01-01", "end_date": "2015-01-01", "coefficient": 1},
    {"start_date": "2015-01-02", "end_date": "2020-01-01", "coefficient": 1.5}
  ],
  "calc_date": "2024-05-12",
  "mortgage": {
    "nis_start_date": "2016-03-01",
    "nis_sum": 2500000,
    "mortgage_taken": true,
    "mortgage_date": "2020-04-01",
    "mortgage_sum": 3200000,
    "bank_approved_sum": 3500000,
    "mortgage_paid": false,
    "mortgage_paid_date": null,
    "history": [
      {"date": "2021-01-01", "sum": 100000},
      {"date": "2022-01-01", "sum": 200000}
    ]
  }
}
```

---

**Следующий шаг:**
- Описываю логику расчёта для мини-приложения и сохраняю её в отдельный файл. 