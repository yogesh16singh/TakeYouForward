"use client";
import React, { useState, useCallback } from "react";
import "./page.css";
import Navbar from "./component/Navbar";
import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";

export default function Home() {
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  const onSubmit = async () => {
    try {
      const response = await fetch(
        "https://takeyouforward-task.onrender.com/api/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            preferredLanguage: language,
            sourceCode: value,
            stdin: input
          })
        }
      );

      const data = await response.json();
      console.log(data);
      window.alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = useCallback((val: any) => {
    setValue(val);
  }, []);

  const handleLanguageChange = (event: any) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
  };

  const mode = {
    javascript: javascript({ jsx: true }),
    cpp: cpp(),
    java: java(),
    python: python()
  }[language];

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="fields-container">
          <div className="username">
            <input
              className="username"
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <select onChange={handleLanguageChange}>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
          </div>
          <button onClick={onSubmit}>Submit</button>
          <button disabled>Run Code</button>
        </div>
        <div className="text-container">
          <div className="source-code">
            <label>Source Code</label>
            <CodeMirror
              value={value}
              height="62vh"
              width="60vh"
              extensions={[mode as Extension]}
              onChange={onChange}
              theme={"dark"}
            />
          </div>
          <div className="input-output">
            <div>
              <label>Input</label>
              <textarea
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                cols={35}
                rows={12}
              ></textarea>
            </div>
            <div>
              <label>Output</label>
              <textarea
                value="This Feature not available :("
                cols={35}
                rows={12}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
