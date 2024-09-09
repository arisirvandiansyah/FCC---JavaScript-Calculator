import { createContext, useEffect, useState } from "react";
import CalcButton from "./components/CalcButton";

export const StateContext = createContext(null);

function App() {
  let [input, setInput] = useState([]);
  const [formula, setFormula] = useState([]);
  const [result, setResult] = useState(0);

  const maxLimit = "DIGIT LIMIT REACHED";

  const limit = () => {
    const display = document.getElementById("display");
    const btn = document.querySelectorAll("button");
    let span = document.createElement("span");
    span.innerHTML = maxLimit;
    display.appendChild(span);
    btn.forEach((btn) => {
      btn.disabled = true;
    });
    input.pop();
    formula.pop();
    setTimeout(() => {
      display.removeChild(span);
      btn.forEach((btn) => {
        btn.disabled = false;
      });
      setInput([...input]);
    }, 1000);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div id="calculator-container">
          <div className="output">
            <div className="formula">{formula}</div>
            <div id="display">
              {!input[0] ? result : input.length > 15 ? limit() : input}
            </div>
          </div>
          <div id="calculator">
            <StateContext.Provider
              value={{
                input,
                setInput,
                formula,
                setFormula,
                result,
                setResult,
              }}
            >
              <CalcButton />
            </StateContext.Provider>
          </div>
        </div>
        <div className="tag-name">
          <p>
            By{" "}
            <a href="https://github.com/arisirvandiansyah" target="_blank">
              Aris Irvandiansyah
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
