   # Backend (FastAPI)

   ## Быстрый старт

   1. Перейдите в папку backend:
      cd backend
   2. Установите зависимости:
      pip install -r requirements.txt
   3. Запустите сервер:
      uvicorn app.main:app --reload

   ## Описание
   - Эндпоинт `/api/nis-data` возвращает данные из файла nis_data.csv.
   - CORS разрешён для всех источников (можно обращаться с фронта).