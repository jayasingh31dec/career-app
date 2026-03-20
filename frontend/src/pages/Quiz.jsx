import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const questions = [
    {
      question: "What do you enjoy most?",
      options: ["Coding", "Designing", "Talking to people", "Solving problems"],
    },
    {
      question: "Which tool do you prefer?",
      options: ["Laptop", "Figma", "Meetings", "Excel"],
    },
    {
      question: "How do you solve problems?",
      options: ["Logic", "Creativity", "Discussion", "Data"],
    },
    {
      question: "What type of work do you like?",
      options: ["Building apps", "Creating UI", "Managing team", "Analyzing data"],
    },
    {
      question: "What motivates you?",
      options: ["Technology", "Creativity", "Leadership", "Insights"],
    },
    {
      question: "What is your strength?",
      options: ["Programming", "Design thinking", "Communication", "Data analysis"],
    },
    {
      question: "Which activity do you prefer?",
      options: ["Debugging code", "Designing screens", "Team meetings", "Working with data"],
    },
    {
      question: "What do you enjoy learning?",
      options: ["New tech", "Design tools", "Business skills", "Statistics"],
    },
    {
      question: "How do you make decisions?",
      options: ["Logic", "Creativity", "Discussion", "Data"],
    },
    {
      question: "What role fits you?",
      options: ["Developer", "Designer", "Manager", "Analyst"],
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [current, setCurrent] = useState(0);

  // ✅ select answer
  const handleSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[current] = option;
    setAnswers(newAnswers);
  };

  // ✅ next + auto scroll
  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    let score = {
      developer: 0,
      designer: 0,
      manager: 0,
      analyst: 0,
    };

    answers.forEach((ans) => {
      if (
        ["Coding","Laptop","Logic","Building apps","Technology","Programming","Debugging code","New tech","Developer"].includes(ans)
      ) score.developer++;

      if (
        ["Designing","Figma","Creativity","Creating UI","Design thinking","Designing screens","Design tools","Designer"].includes(ans)
      ) score.designer++;

      if (
        ["Talking to people","Meetings","Discussion","Managing team","Leadership","Communication","Team meetings","Business skills","Manager"].includes(ans)
      ) score.manager++;

      if (
        ["Solving problems","Excel","Data","Analyzing data","Insights","Data analysis","Working with data","Statistics","Analyst"].includes(ans)
      ) score.analyst++;
    });

    localStorage.setItem("result", JSON.stringify(score));
    navigate("/result");
  };

  return (
    <div className="container">
      <div className="card quiz-card">

        {/* Welcome */}
        <h3>👋 Welcome, {localStorage.getItem("name")}</h3>

        <h2>Career Quiz</h2>

        {/* Progress */}
        <div className="progress">
          <div
            className="progress-bar"
            style={{
              width: `${((current + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>

        <p>
          Question {current + 1} / {questions.length}
        </p>

        <h3>{questions[current].question}</h3>

        {/* Options */}
        {questions[current].options.map((opt, i) => (
          <button
            key={i}
            className={`option-btn ${
              answers[current] === opt ? "selected" : ""
            }`}
            onClick={() => handleSelect(opt)}
          >
            {answers[current] === opt ? "✅ " : ""}{opt}
          </button>
        ))}

        {/* Navigation */}
        <div className="nav-btns">
          <button onClick={handlePrev} disabled={current === 0}>
            ⬅ Previous
          </button>

          {current < questions.length - 1 ? (
            <button onClick={handleNext} disabled={!answers[current]}>
              Next ➡
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={answers.includes("")}>
              🚀 Submit
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default Quiz;