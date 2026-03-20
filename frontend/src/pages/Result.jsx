import { useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("result"));

  if (!data) return <h2>No Result</h2>;

  let best = "";
  let max = 0;

  for (let key in data) {
    if (data[key] > max) {
      max = data[key];
      best = key;
    }
  }

  const total = data.developer + data.designer + data.manager + data.analyst;

  // ✅ percentage calculate
  const percentage = Math.round((max / total) * 100);

  // ✅ detailed career info (IMPORTANT)
  const careerInfo = {
    developer: {
      title: "Full Stack Developer",
      desc: "You enjoy coding and building applications.",
      skills: ["JavaScript", "React", "Node.js"],
      course: "BCA / MCA / B.Tech CS",
      roadmap: "Learn MERN → Build Projects → Apply Jobs",
    },
    designer: {
      title: "UI/UX Designer",
      desc: "You are creative and love designing.",
      skills: ["Figma", "UI Design", "UX Research"],
      course: "Design / B.Des",
      roadmap: "Learn Figma → Build Portfolio → Freelance/Job",
    },
    manager: {
      title: "Business Manager",
      desc: "You are good with people and leadership.",
      skills: ["Communication", "Leadership", "Planning"],
      course: "BBA / MBA",
      roadmap: "Learn Business → Internship → Manager Role",
    },
    analyst: {
      title: "Data Analyst",
      desc: "You enjoy working with data.",
      skills: ["Python", "SQL", "Excel"],
      course: "BCA / Data Science",
      roadmap: "Learn Python → Projects → Data Job",
    },
  };

  const result = careerInfo[best];

  return (
    <div className="container">
      <div className="card">

        <h2>🎯 Your Career Result</h2>

        {/* ✅ Title */}
        <h1 className="result-title">🚀 {result.title}</h1>

        {/* ✅ Match % */}
        <p><strong>Match: {percentage}%</strong></p>

        {/* ✅ Description */}
        <p className="result-desc">{result.desc}</p>

        {/* ✅ Skills */}
        <div className="score-box">
          <p>🧠 Skills to Learn:</p>
          {result.skills.map((skill, i) => (
            <p key={i}>✔ {skill}</p>
          ))}
        </div>

        {/* ✅ Course */}
        <div className="score-box">
          <p>🎓 Recommended Course:</p>
          <p>{result.course}</p>
        </div>

        {/* ✅ Roadmap */}
        <div className="score-box">
          <p>🗺 5-Year Plan:</p>
          <p>{result.roadmap}</p>
        </div>

        {/* ✅ Score breakdown */}
        <div className="score-box">
          <p>📊 Your Scores:</p>
          <p>Developer: {data.developer}</p>
          <p>Designer: {data.designer}</p>
          <p>Manager: {data.manager}</p>
          <p>Analyst: {data.analyst}</p>
        </div>

        {/* ✅ Buttons */}
        <div className="nav-btns">
          <button onClick={() => navigate("/quiz")}>
            Retake Quiz
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Result;