import React from "react";

export default function Header({onFetch}) {
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    };
    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    };
    const handleFetch = () => {
        if(new Date(startDate) > new Date(endDate)) {
            console.log('Start date must be before end date');
            return;
        }
        if(new Date(endDate) > new Date()) {
            console.log('End Date must be today or earlier');
            return;
        }
        onFetch(startDate, endDate);
    };

    return (
        <div className="header">
            <h1>Astronomy Picture of the Day Gallery</h1>
            <div>
                <input type="date" value={startDate} onChange={handleStartDate}/>
                <input type="date" value={endDate} onChange={handleEndDate}/>
                <button onClick={handleFetch}>Fetch Data</button>
            </div>
        </div>
    )
}