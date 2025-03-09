import { toast } from "react-hot-toast";
import { useReducer } from "react";
import Result from "../components/Result";

const initialState = {
  answeredQuestions: 1,
  correctAnswerCount: 0,
  questionIndex: 0,
  selectedAnswer: null,
  answerStatus: null,
  statusDisabled: false,
  showNextButton: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SELECT_ANSWER":
      return { ...state, selectedAnswer: action.payload };
    case "SUBMIT_ANSWER":
      const isCorrect = state.selectedAnswer === action.correctAnswer;
      return {
        ...state,
        answerStatus: isCorrect ? "correct" : "incorrect",
        correctAnswerCount: isCorrect
          ? state.correctAnswerCount + 1
          : state.correctAnswerCount,
        showNextButton: true,
        statusDisabled: true,
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        answeredQuestions: state.answeredQuestions + 1,
        selectedAnswer: null,
        showNextButton: false,
        answerStatus: null,
        statusDisabled: false,
      };
    default:
      return state;
  }
}

function Test({ questions: { questions, title, color, icon } }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.selectedAnswer === null) {
      return toast.error("Please select an answer");
    }
    dispatch({
      type: "SUBMIT_ANSWER",
      correctAnswer: questions[state.questionIndex].answer,
    });
  };

  if (state.questionIndex === questions.length) {
    toast.success("Congratulations", { icon: "🎉" });
    return (
      <Result
        title={title}
        color={color}
        icon={icon}
        correctAnswerCount={state.correctAnswerCount}
        questionsLenght={questions.length}
      />
    );
  }

  return (
    <div className="test-container">
      <div className="test-content">
        <p className="test-description">
          Question {state.answeredQuestions} of {questions.length}
        </p>
        <h2 className="test-title">
          {questions[state.questionIndex].question}
        </h2>

        <div className="test-proccess-container">
          <div
            className="test-proccess"
            style={{
              width: (state.answeredQuestions / questions.length) * 100 + "%",
            }}
          ></div>
        </div>
      </div>
      <div className="test-questions">
        <form onSubmit={handleSubmit}>
          <ul className="test-list">
            {questions[state.questionIndex].options.map((option, index) => {
              const alphabet = String.fromCharCode(index + 65);
              let className = "";
              if (
                state.answerStatus === "correct" &&
                option === state.selectedAnswer
              ) {
                className = "correct";
              } else if (state.answerStatus === "incorrect") {
                if (option === state.selectedAnswer) {
                  className = "incorrect";
                }
                if (option === questions[state.questionIndex].answer) {
                  className = "correct";
                }
              }

              return (
                <li key={option}>
                  <label className={`test-label ${className}`}>
                    <span className="test-letter">{alphabet}</span>
                    <input
                      onChange={() =>
                        dispatch({ type: "SELECT_ANSWER", payload: option })
                      }
                      type="radio"
                      name="option"
                      disabled={state.statusDisabled}
                    />
                    <span className="test-text">{option}</span>

                    {/* icon */}
                    <img
                      className="test-icon-correct"
                      src="../assets/icon-correct.svg"
                      alt="icon"
                      width={40}
                      height={40}
                    />
                    <img
                      className="test-icon-incorrect"
                      src="../assets/icon-incorrect.svg"
                      alt="icon"
                      width={40}
                      height={40}
                    />
                  </label>
                </li>
              );
            })}
          </ul>
          {!state.showNextButton && (
            <button className="btn test-btn">Submit Question</button>
          )}
          {state.showNextButton && (
            <button
              onClick={() => dispatch({ type: "NEXT_QUESTION" })}
              className="btn test-btn"
            >
              {questions.length === state.questionIndex + 1
                ? "Finish"
                : "Next Question"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Test;
