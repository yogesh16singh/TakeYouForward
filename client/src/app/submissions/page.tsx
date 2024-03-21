"use client";

import React, { useEffect, useState } from "react";
import "./submissions.css";
import Navbar from "../component/Navbar";

const Submissions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://takeyouforward-task.onrender.com/api/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const data = await response.json();
      setData(data.allData);
    } catch (error) {
      console.log(error);
    }
  };

  function convertDateToDDMMYY(dateString: string) {
    // Parse the date string with UTC timezone awareness
    const dateObj = new Date(dateString);

    // Extract day, month, and year components
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = dateObj.getFullYear();

    // Format the date in dd/mm/yy
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="Submissions">
      <Navbar />
      <h1>Submissions</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Language</th>
            <th>Source Code</th>
            <th>Input</th>
            <th>Output</th>
            <th>Date of submission</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item: any) => {
              return (
                <tr key={item.id}>
                  <td>{item.username}</td>
                  <td>{item.preferredLanguage}</td>
                  <td>
                    {item.sourceCode.length > 100
                      ? item.sourceCode.substring(0, 100) + "..."
                      : item.sourceCode}
                  </td>
                  <td>{item.stdin}</td>
                  <td>NA</td>
                  <td>{convertDateToDDMMYY(item.createdAt)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Submissions;
