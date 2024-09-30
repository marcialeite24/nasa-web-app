import React from "react";

export default function Header({onFetch}) {
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [dateError, setDateError] = React.useState('');

    React.useEffect(() => {
        const storedStartDate = JSON.parse(sessionStorage.getItem('startDate'));
        const storedEndDate = JSON.parse(sessionStorage.getItem('endDate'));
        if (storedStartDate && storedEndDate) {
            setStartDate(storedStartDate);
            setEndDate(storedEndDate);
        }
    }, []);

    React.useEffect(() => {
        sessionStorage.setItem('startDate', JSON.stringify(startDate));
        sessionStorage.setItem('endDate', JSON.stringify(endDate));
    }, [startDate,endDate]);

    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    };
    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    };
    const handleFetch = () => {
        setDateError('');

        if(new Date(startDate) > new Date(endDate)) {
            setDateError('Start date must be before end date');
            return;
        }
        if(new Date(endDate) > new Date()) {
            setDateError('End Date must be today or earlier');
            return;
        }
        if (!startDate || !endDate) {
            setDateError('Both dates must be selected');
            return;
        }
        onFetch(startDate, endDate);
    };

    return (
        <div className="header">
            <h1 className="title">Astronomy Picture of the Day Gallery</h1>
            <div className="date-range">
                <input className="start-date" type="date" value={startDate} onChange={handleStartDate} aria-label="start-date"/>
                <input className="end-date" type="date" value={endDate} onChange={handleEndDate} aria-label="end-date"/>
                <button className="btn-fetch-data" onClick={handleFetch}>Fetch Data</button> 
            </div>
            {dateError && (<p className="date-error">{dateError}</p>)}        
        </div>
    )
}