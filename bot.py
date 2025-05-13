import asyncio
import os
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from dotenv import load_dotenv

# Загружаем переменные из .env
load_dotenv()
API_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
ADMIN_CHAT_ID = int(os.getenv('ADMIN_CHAT_ID'))  # обязательно int!

WEBAPP_URL = 'https://vislugaapp.onrender.com'

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
        "Привет ВОЕННЫЙ! Нажмите кнопку ниже, а то не заработает!!!",
        reply_markup=kb
    )

@dp.message()
async def forward_to_admin(message: types.Message):
    # Пересылаем все сообщения админу
    text = f"Сообщение от @{message.from_user.username or 'Аноним'} (id: {message.from_user.id}):\n{message.text}"
    await bot.send_message(ADMIN_CHAT_ID, text)
    await message.reply("Ваше сообщение отправлено администратору!")

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())