import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command

API_TOKEN = '7531901366:AAFuW5XlPmeJVfnIvbuYe-11zVKpfo1ov5g'
WEBAPP_URL = 'https://your-app-url.com'  # Замените на реальный адрес

bot = Bot(token=API_TOKEN)
dp = Dispatcher()

@dp.message(Command("start"))
async def send_welcome(message: types.Message):
    kb = types.ReplyKeyboardMarkup(
        keyboard=[
            [types.KeyboardButton(
                text='Открыть приложение',
                web_app=types.WebAppInfo(url=WEBAPP_URL)
            )]
        ],
        resize_keyboard=True
    )
    await message.answer(
        "Привет военный ! Нажмите кнопку ниже, а то не заработает!!!",
        reply_markup=kb
    )

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())