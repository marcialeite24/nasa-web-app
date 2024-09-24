import React from "react";

export default function Header({onFetch}) {
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [dateError, setDateError] = React.useState(false);
    const [dateError2, setDateError2] = React.useState(false);

    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    };
    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    };
    const handleFetch = () => {
        if(new Date(startDate) > new Date(endDate)) {
            setDateError(true);
            return;
        }
        if(new Date(endDate) > new Date()) {
            setDateError2(true);
            return;
        }
        onFetch(startDate, endDate);
        setDateError(false);
        setDateError2(false);
    };

    return (
        <div className="header">
            <h1>Astronomy Picture of the Day Gallery</h1>
            <div className="date-range">
                <input className="start-date" type="date" value={startDate} onChange={handleStartDate}/>
                <input className="end-date" type="date" value={endDate} onChange={handleEndDate}/>
                <button className="btn-fetch-data" onClick={handleFetch}>Fetch Data</button>
            </div>
            {dateError && (<p className="date-error">Start date must be before end date</p>)}
            {dateError2 && (<p className="date-error">End Date must be today or earlier</p>)}            
        </div>
    )
}