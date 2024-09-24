import React from "react";

export default function API({startDate,endDate}) {
    const [apodData, setApodData] = React.useState(null);
    const [imgHover, setImgHover] = React.useState(null);

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

    const handleMouseEnter = (index) => {
        setImgHover(index);
    };

    const handleMouseLeave = () => {
        setImgHover(null);
    };

    return (
        <div className="api-container">            
            {apodData && (
                apodData.map((item, index) => (
                    <div key={index} className="api-card">                    
                        <img src={item.url} alt={item.title} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}/>
                        {imgHover === index && (
                            <p className="tooltip">{item.title}</p>
                            // <p className="tooltip">{item.date}</p>
                        )}
                        {/* <h2>{item.title}</h2>
                        <p>{item.explanation}</p>                    
                        <p>{item.date}</p> */}
                    </div>
                ))                
            )}
        </div>
    )
};
