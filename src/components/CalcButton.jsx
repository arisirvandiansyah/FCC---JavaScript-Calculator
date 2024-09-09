import React, { useContext } from "react";
import { StateContext } from "../App";

const CalcButton = () => {
  let { input, setInput, formula, setFormula, result, setResult } =
    useContext(StateContext);

  const num = [
    { value: "AC", id: "clear", type: "clear" },
    { value: "del", id: "delete", type: "delete" },
    { value: "%", id: "modulus", type: "operator" },
    { value: "/", id: "divide", type: "operator" },

    { value: 7, id: "seven", type: "number" },
    { value: 8, id: "eight", type: "number" },
    { value: 9, id: "nine", type: "number" },
    { value: "*", id: "multiply", type: "operator" },

    { value: 4, id: "four", type: "number" },
    { value: 5, id: "five", type: "number" },
    { value: 6, id: "six", type: "number" },
    { value: "-", id: "subtract", type: "operator" },

    { value: 1, id: "one", type: "number" },
    { value: 2, id: "two", type: "number" },
    { value: 3, id: "three", type: "number" },
    { value: "+", id: "add", type: "operator" },

    { value: 0, id: "zero", type: "number" },
    { value: ".", id: "decimal", type: "number" },
    { value: "=", id: "equals", type: "equals" },
  ];

  const handleButton = (data) => {
    switch (data.type) {
      // type number
      case "number":
        setResult(0);
        // check if first input is number
        if (typeof input[0] !== "number") input = [];
        // check if input is decimal
        if (data.value === ".") {
          // filter the decimal
          let isExist = input.filter((val, index) => {
            return input.indexOf(".") == index;
          });
          // return if the '.' exist
          if (isExist[0]) return;
        }
        // return if the number input values > 15
        if (input.length > 15) return;

        // set input and formula field
        setInput([...input, data.value]);
        setFormula([...formula, data.value]);
        break;
      // type Operator
      case "operator":
        // reset input
        input = [];
        // set formula if result is exist
        if (result) formula = [result];
        if (data.value === "-") {
          // preven triple "-" input
          if (
            formula[formula.length - 1] === data.value &&
            typeof formula[formula.length - 3] === "number"
          )
            return;
        } else {
          // check if 2 index before is operator and remove it
          if (typeof formula[formula.length - 1] === "string") {
            if (
              typeof formula[formula.length - 2] === "string" &&
              formula[formula.length - 2] !== "."
            ) {
              formula.splice(formula.length - 2, 2);
            } else {
              formula.pop();
            }
          }
        }
        setInput([...input, data.value]);
        setFormula([...formula, data.value]);
        break;
      // AC button
      case "clear":
        setInput([]);
        setFormula([]);
        setResult(0);
        break;
      // DEL button
      case "delete":
        input.pop();
        formula.pop();
        setInput([...input]);
        setFormula([...formula]);
        break;
      // = button
      case "equals":
        // prevent next if last index of formula is an operator
        if (typeof formula[formula.length - 1] === "string") {
          if (formula[formula.length - 1] !== ".") return;
        }
        let calc = eval(formula.join(""));
        setResult(parseFloat(calc));
        setInput([]);
        setFormula([]);
        break;
    }
  };

  return (
    <>
      {num.map((num, i) => {
        return (
          <button
            type={num.type}
            key={i}
            id={num.id}
            className={`${num.id === "zero" ? "col-span-2" : null} ${
              num.type === "equals" ? "bg-orange" : null
            }`}
            onClick={() => {
              handleButton(num);
            }}
          >
            {num.value}
          </button>
        );
      })}
    </>
  );
};

export default CalcButton;
