# Meal Calorie Counter

A simple web application to track your daily meals and calorie intake. Built with Next.js and TypeScript.

![Meal Calorie Counter Screenshot](/public/images/meal-calorie-login.png)
![Meal Calorie Counter Screenshot](/public/images/meal-calorie-register.png)
![Meal Calorie Counter Screenshot](/public/images/meal-calorie-dashboard.png)
![Meal Calorie Counter Screenshot](/public/images/meal-calorie-count.png)

## Features

- User authentication
- Calorie tracking for meals
- Meal history
- Dark/Light mode
- Responsive design

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Zustand for state management
- shadcn/ui components

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Project Structure

```
├── app/                 # Next.js app router
├── components/         # React components
├── lib/               # Utilities and hooks
└── public/           # Static assets
```

## State Management

The app uses Zustand for state management with two main stores:

1. **Auth Store**: Handles user authentication
2. **Meal Store**: Manages meal tracking and history

## Future Improvements

- Meal categories and filtering
- Calorie goals and tracking
- Data visualization
- Meal photos support
- Export functionality

---

