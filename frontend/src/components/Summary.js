import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Summary({ expenses }) {
  const categoryColors = {
    Food: "#FF6384",
    Transport: "#36A2EB",
    Shopping: "#FFCE56",
    Bills: "#4BC0C0",
    Entertainment: "#9966FF",
    Health: "#FF9F40",
    Other: "#888888",
  };

  const map = {};
  expenses.forEach(e => map[e.category] = (map[e.category] || 0) + e.amount);

  const labels = Object.keys(map);

  const colors = labels.map((cat) => categoryColors[cat] || "#999");
  const data = {
    labels: Object.keys(map),
    datasets: [
      {
        data: Object.values(map),
        backgroundColor: colors,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="card">
      <h2>Summary</h2>
      <hr />
      {Object.keys(map).length === 0 ? <p className="small">No data</p> : <Pie data={data} />}
    </div>
  );
}
