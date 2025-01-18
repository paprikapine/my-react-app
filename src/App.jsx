import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [start1, setStart1] = useState("");
  const [start2, setStart2] = useState("");
  const [result, setResult] = useState("");
  const [resultMinus5, setResultMinus5] = useState("");

  const calculateTimes = () => {
    const currentTime = new Date();
    const currentSeconds =
      currentTime.getHours() * 3600 +
      currentTime.getMinutes() * 60 +
      currentTime.getSeconds();

    const [hours1, minutes1] = start1.split(":").map(Number);
    const start1Seconds = hours1 * 3600 + minutes1 * 60;

    const [hours2, minutes2] = start2.split(":").map(Number);
    const start2Seconds = hours2 * 3600 + minutes2 * 60;

    const difference = currentSeconds - start1Seconds;
    const calculatedTime = (start2Seconds + difference + 86400) % 86400;

    const resultTime = formatTime(calculatedTime);
    const minus5Time = formatTime(calculatedTime - 5 * 60);

    setResult(resultTime);
    setResultMinus5(minus5Time);

    const copyText = `2回目QA開始時刻: ${resultTime}\n先生声かけ時刻: ${minus5Time}`;
    navigator.clipboard.writeText(copyText).then(() => {
      alert("コピーしました");
    });
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor((totalSeconds / 3600) % 24);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 text-center">
        <h1 className="mb-4">時間設定アプリ</h1>
        <div className="mb-3">
          <label className="form-label">1回目開始時刻</label>
          <input
            type="time"
            className="form-control"
            value={start1}
            onChange={(e) => setStart1(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">2回目開始時刻 </label>
          <input
            type="time"
            className="form-control"
            value={start2}
            onChange={(e) => setStart2(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100" onClick={calculateTimes}>
          計算してコピー
        </button>
        <div className="result mt-4">
          <p>2回目QA開始時刻: {result}</p>
          <p>先生声かけ時刻: {resultMinus5}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
