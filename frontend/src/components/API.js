import React from "react";

export default function API() {
    const [apodData, setApodData] = React.useState(null);

    React.useEffect(() => {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=Nf3BTHKGGaLaPaAa2ohIVnH40YLXyfNZcqPhK1so`)
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
    }, []);

    return (
        <div>
            { apodData && (
                <div>
                    <h1>{apodData.title}</h1>
                    <img src={apodData.url} alt={apodData.title}/>
                    <p>{apodData.date}</p>
                    <p>{apodData.explanation}</p>
                </div>
            )}
        </div>
    )
};
