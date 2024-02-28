## FSM Quiz App

Welcome to the FSM Quiz App, a React-based quiz application! This repository comprises three major components:

1. **Client**: Contains the front-end components of the quiz application.
2. **FSM Class**: Manages the Finite State Machine (FSM) logic for handling quiz states.
3. **Mock Server**: Provides a mock server for simulating data interactions.

To run the mock server locally, navigate to the `src` folder and execute the command:

```bash
json-server --watch db.json --port 5000
```

General Explanation
The quiz operates through three primary states:

1.Start Quiz: The initial state, where the user begins the quiz.
2.Questions: The state where users interact with and answer quiz questions.
3.Result Score: The final state displaying the user's score.

Upon clicking the start button, the quiz transitions to the question state. Each question includes a correct answer, and users must select an answer to proceed to the next question. Once all questions are answered, the final state, showing the result score, is displayed.

Feel free to check out the application [here](https://adihillel.github.io/fsm-project/)!