import React from "react";

export default function API({startDate,endDate}) {
    const [apodData, setApodData] = React.useState(null);
    console.log(startDate)

    React.useEffect(() => {
        if (startDate && endDate) {
            fetch(`https://api.nasa.gov/planetary/apod?api_key=Nf3BTHKGGaLaPaAa2ohIVnH40YLXyfNZcqPhK1so&start_date=${startDate}&end_date=${endDate}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setApodData(data);
                console.log(data);
            })
            .catch((error) => {
                console.log('Error fetching data:', error);
            })
        }
    }, [startDate,endDate]);

    return (
        <div className="api">            
            {apodData && (
                apodData.map((item) => (
                    <div className="api-card">                    
                        <img src={item.url} alt={item.title}/>
                        <h2>{item.title}</h2>
                        <p>{item.explanation}</p>                    
                        <p>{item.date}</p>
                    </div>
                ))                
            )}
        </div>
    )
};
