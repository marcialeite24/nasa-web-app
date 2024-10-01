import React from "react";
import Search from "./Search";
import Modal from './Modal';
import { useSwipeable } from 'react-swipeable';
import { JellyfishSpinner } from "react-spinners-kit";
const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export default function API({startDate,endDate}) {
    const [loading, setLoading] = React.useState(false);
    const [apodData, setApodData] = React.useState(null);
    const [imgHover, setImgHover] = React.useState(null);
    const [selectedImg, setSelectedImg] = React.useState(null);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [filteredData, setFilteredData] = React.useState(null);
    const [resetFilters, setResetFilters] = React.useState(false);

    React.useEffect(() => {
        const storedData = sessionStorage.getItem('apodData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setApodData(parsedData);
            setFilteredData(parsedData);
        }
    }, []);

    const fetchApodData = async (startDate, endDate) => {
        const oneMonth = 30 * 24 * 60 * 60 * 1000;
        const start = new Date(startDate);
        const end = new Date(endDate);
        let currentStart = start;
        let allData = [];

        while (currentStart <= end) {
            var currentEnd = new Date(currentStart.getTime() + oneMonth - 1);
            if (currentEnd > end) {
                currentEnd = end;
            }
            const response = await fetch(`${backendURL}/apod?start_date=${currentStart.toISOString().split('T')[0]}&end_date=${currentEnd.toISOString().split('T')[0]}`);
            const data = await response.json();
            allData = allData.concat(data);
            currentStart = new Date(currentEnd.getTime() + 1); 
        }
        return allData;
    };

    React.useEffect(() => {
        if (startDate && endDate) {
            setResetFilters(true);
            setLoading(true);
            
            fetchApodData(startDate,endDate)
                .then((data) => {
                    setApodData(data);
                    setLoading(false);
                    setFilteredData(data);
                    setResetFilters(false);
                    sessionStorage.setItem('apodData', JSON.stringify(data));
                })
                .catch((error) => {
                    console.log('Error fetching data:', error);
                    setLoading(false);
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

    const swipe = useSwipeable({
        onSwipedLeft: handleNextImg,
        onSwipedRight: handlePreviousImg,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    React.useEffect(() => {
        if (modalOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [modalOpen]);

    return (
        <div> 
            {loading && 
                <div className="spinner">
                    <JellyfishSpinner size={120} />
                </div>
            }       
            {!loading && filteredData && (
                <>
                    <Search 
                        data={apodData} 
                        onFilter={updateFilteredData} 
                        onReset={resetFilters}
                    />                            
                    <div className="api-container">                     
                        {filteredData && (
                            filteredData.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="api-card"
                                    onClick={() => handleClick(item)}>  
                                    {item.media_type === 'video' ? (
                                        <div onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}>
                                            <iframe
                                                width="100%"
                                                height="auto"
                                                src={item.url}
                                                title={item.title}
                                                allowFullScreen  
                                                style={{ pointerEvents: 'none' }}
                                            ></iframe>
                                        </div>
                                    ):(
                                        <img 
                                            src={item.url} 
                                            alt={item.title}
                                            onMouseEnter={() => handleMouseEnter(index)}
                                            onMouseLeave={handleMouseLeave}             
                                        />
                                    )}                                    
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
                            filteredData={filteredData}
                            swipe={swipe}/>
                        )}
                    </div>
                
                </>
            )}
        </div>
    )
};
