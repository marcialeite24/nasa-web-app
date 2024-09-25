import React from "react";
import Modal from './Modal';

export default function API({startDate,endDate}) {
    const [apodData, setApodData] = React.useState(null);
    const [imgHover, setImgHover] = React.useState(null);
    const [selectedImg, setSelectedImg] = React.useState(null);
    const [modalOpen, setModalOpen] = React.useState(false);

    React.useEffect(() => {
        if (startDate && endDate) {
            fetch(`http://localhost:5000/apod?start_date=${startDate}&end_date=${endDate}`)
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

    const handleClick = (index) => {
        setSelectedImg(index);
        setModalOpen(true);
    };

    const handleCloseModal = (item) => {
        setSelectedImg(null);
        setModalOpen(false);
    };

    const handlePreviousImg = () => {
        setSelectedImg((prevIndex) => (prevIndex - 1 + apodData.length) % apodData.length);
    };

    const handleNextImg = () => {
        setSelectedImg((prevIndex) => (prevIndex + 1) % apodData.length);
    };

    return (
        <div className="api-container">            
            {apodData && (
                apodData.map((item, index) => (
                    <div 
                        key={index} 
                        className="api-card">  
                        <img 
                            src={item.url} 
                            alt={item.title}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick(index)} />
                        {imgHover === index && (
                            <p className="tooltip">{item.title}</p>
                            // <p className="tooltip">{item.date}</p>
                        )}                        
                    </div>
                ))                
            )}
            {modalOpen && selectedImg !== null && (
                <Modal 
                show={modalOpen}
                imageData={apodData[selectedImg]}
                onClose={handleCloseModal}
                onPrevious={handlePreviousImg}
                onNext={handleNextImg} />
            )}
        </div>
    )
};
