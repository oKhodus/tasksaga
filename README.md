# TaskSaga

**A habit tracker that turns your goals into an RPG adventure!** 🎮✨

TaskSaga gamifies your daily habits and goals, letting you level up, earn rewards, and conquer your personal quests like a true hero.

## Features

- ✅ Track habits, daily tasks, and long-term goals  
- 🏆 Gain XP and level up as you complete tasks  
- 🎯 Set challenges and quests for yourself  
- 💎 Earn rewards and unlock achievements  
- 📊 Visual stats to monitor your progress  

## Tech Stack

- **Backend:** FastAPI, SQLAlchemy, SQLite/PostgreSQL  
- **Authentication:** JWT, bcrypt  
- **Frontend:** TypeScript + React (or your preferred framework)  
- **Dev Tools:** Docker, Uvicorn  

## Installation

1. Clone the repo  
    ```bash
    git clone https://github.com/yourusername/tasksaga.git
    cd tasksaga
    ```

2. Create virtual environment and install dependencies
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # Linux/Mac
    .venv\Scripts\activate     # Windows
    pip install -r requirements.txt
    ```

3. Run the app
    ```bash
    uvicorn main:app --reload
    ```
4. Open http://127.0.0.1:8000/docs
 to explore the API

## How it Works

Every habit you complete gives you XP, levels, and progress. Missed a day? Your hero might stumble, but the quest continues! Level up your life while having fun.

## Contributing

Pull requests are welcome! Feel free to add new quests, rewards, or even your own RPG mechanics.

# Level up your habits. Play your life. ⚔️✨