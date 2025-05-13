# Структура проекта мини-приложения

## Корень проекта
- frontend/ — клиентская часть (React + Vite)
- backend/ — серверная часть (Python, venv, app/)
- telegram_bot/analysis/ — документация и аналитика

## frontend/
- src/
  - components/ — переиспользуемые компоненты интерфейса
  - pages/ — страницы (экраны) приложения
  - utils/ — утилиты, функции, API-запросы
- public/ — статика
- index.html, main.jsx, App.jsx — точки входа

## backend/
- venv/ — виртуальное окружение Python
- app/
  - __init__.py — инициализация приложения
  - (далее будут: main.py, models.py, routes.py и т.д.)

## telegram_bot/analysis/
- bot_functionality.md — описание функций бота
- data_structure.md — структура данных
- calculation_logic.md — логика расчётов
- ui_structure.md — структура интерфейса
- project_structure.md — структура проекта (этот файл)

---

**Следующий шаг:**
- Начинаю базовую настройку frontend: создаю шаблоны страниц и компонентов, настраиваю роутинг и нижнее меню. 