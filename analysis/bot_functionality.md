# Описание функционала Telegram-бота (анализ исходного кода)

## Основные функции:
1. **Регистрация пользователя**
   - Ввод фамилии (стартовый шаг)
2. **Выбор режима расчёта**
   - Текущая дата
   - Льготный период
   - Расчёт на будущую дату
3. **Ввод периодов службы**
   - Вводится список периодов (дата начала и окончания)
   - Каждый период можно добавить с коэффициентом (1.5, 2, 3)
   - Можно добавлять несколько льготных периодов
4. **Расчёт выслуги**
   - С учётом коэффициентов
   - Итог: годы, месяцы, дни
   - Отдельно считается льготная выслуга
5. **Сохранение и отправка Excel-файла с результатами**
   - Формируется файл с основными данными и периодами
6. **Работа с будущими периодами**
   - Можно добавить период в будущем для прогноза выслуги
7. **Меню после расчёта**
   - Добавить льготный период
   - Получить Excel-файл
   - Завершить расчёт
8. **Отмена расчёта**
   - Команда /cancel

## Структура данных:
- Пользователь:
  - Фамилия
  - Режим расчёта
  - Периоды службы (дата начала, дата окончания, коэффициент)
  - Льготные периоды (отдельно)
  - Дата расчёта
- Для Excel:
  - Основные параметры (выслуга, разница, периоды)

## Логика расчёта выслуги:
- Для каждого периода вычисляется разница в днях
- Применяется коэффициент (если есть)
- Переводится в годы, месяцы, дни
- Итоговая выслуга = сумма всех периодов
- Льготная выслуга = разница между общей и обычной выслугой

## Важно для мини-приложения:
- Поддержка нескольких периодов и коэффициентов
- Удобный ввод дат (календарь/ручной)
- Возможность добавлять и удалять периоды
- Автоматический пересчёт при изменении данных
- Сохранение истории расчётов (по желанию)

---

**Следующий шаг:**
- Проектирую структуру данных для мини-приложения и сохраняю её в отдельный файл. 