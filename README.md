# 🧠 Interactive Quiz App

A fun and interactive quiz application built with React. Test your knowledge with dynamic questions, a sleek user interface, and real-time feedback.

## 📸 Preview
[Add your preview image here]

## ✨ Features
- 📱 **Responsive Design**: Works on all devices
- 🔄 **Dynamic Questions**: Uses OpenTDB API
- 🔀 **Shuffled Answers**: Random answer order
- ⏳ **Timer**: 60-second countdown per question
- 📊 **Progress Tracking**: Real-time progress bar
- 🔖 **Resume Feature**: Save and continue
- 🏆 **Score System**: Instant feedback

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- pnpm

### Installation
```bash
git clone https://github.com/MHasanBas/quizz.git
cd quiz-app
pnpm install
pnpm start
```
Visit `http://localhost:3000` to start the quiz!

## 🎨 UI Features
- Clean question cards
- Color-coded options
- Dynamic timer
- Animated progress bar
- Detailed results page

## 🌐 API Integration
Uses [Open Trivia Database](https://opentdb.com/api) for questions.

### Sample API Response
```json
{
  "response_code": 0,
  "results": [
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Entertainment: Music",
      "question": "Which band had hits in 1972 with 'Baby I'm A Want You', 'Everything I Own' and 'The Guitar Man'",
      "correct_answer": "Bread",
      "incorrect_answers": ["America", "Chicago", "Smokie"]
    },
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Entertainment: Television",
      "question": "Cesar Romero played which iconic Batman villain from the 1960's TV show?",
      "correct_answer": "The Joker",
      "incorrect_answers": ["The Penguin", "The Riddler", "Mr. Freeze"]
    }
  ]
}
```

## 🛠️ Customization
- Styles: Edit `src/styles.css`
- Questions: Modify `fetchQuestions` function

## 📝 License
MIT License
