import React from "react";
import Search from "./Search";
import Modal from './Modal';

export default function API({startDate,endDate}) {
    const [apodData, setApodData] = React.useState(null);
    const [imgHover, setImgHover] = React.useState(null);
    const [selectedImg, setSelectedImg] = React.useState(null);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [filteredData, setFilteredData] = React.useState(null);
    const [resetFilters, setResetFilters] = React.useState(false);
    const backendURL = process.env.BACKEND_URL;

    React.useEffect(() => {
        if (startDate && endDate) {
            setResetFilters(true);
            
            fetch(`${backendURL}/apod?start_date=${startDate}&end_date=${endDate}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setApodData(data);
                setFilteredData(data);
                setResetFilters(false);
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

    const handleClick = (item) => {
        setSelectedImg(item);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedImg(null);
        setModalOpen(false);
    };

    const handlePreviousImg = () => {
        const currentIndex = filteredData.findIndex(image => image.title === selectedImg.title);
        if (currentIndex !== -1) {
            const previousIndex = (currentIndex - 1 + filteredData.length) % filteredData.length;
            setSelectedImg(filteredData[previousIndex]);
        }
    };

    const handleNextImg = () => {
        const currentIndex = filteredData.findIndex(image => image.title === selectedImg.title);
        if (currentIndex !== -1) {
            const nextIndex = (currentIndex + 1) % filteredData.length;
            setSelectedImg(filteredData[nextIndex]);
        }
    };

    const updateFilteredData = (newFilteredData) => {
        setFilteredData(newFilteredData);
    };

    return (
        <div>
            {filteredData && (
                <Search 
                    data={apodData} 
                    onFilter={updateFilteredData} 
                    onReset={resetFilters}
                />
            )} 
            <div className="api-container">                     
                {filteredData && (
                    filteredData.map((item, index) => (
                        <div 
                            key={index} 
                            className="api-card">  
                            <img 
                                src={item.url} 
                                alt={item.title}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(item)} />
                            {imgHover === index && (
                                <p className="tooltip">{item.title}</p>
                            )}                        
                        </div>
                    ))                
                )}
                {modalOpen && selectedImg !== null && (
                    <Modal 
                    show={modalOpen}
                    imageData={selectedImg}
                    onClose={handleCloseModal}
                    onPrevious={handlePreviousImg}
                    onNext={handleNextImg} 
                    filteredData={filteredData}/>
                )}
            </div>
        </div>
    )
};
