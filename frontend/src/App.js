import React from "react";
import './App.css';
import Header from "./components/Header";
import API from "./components/API";

export default function App() {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const fetchAPODs = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div>
      <Header onFetch={fetchAPODs}/>
      <API startDate={startDate} endDate={endDate}/>
    </div>
  );
}

