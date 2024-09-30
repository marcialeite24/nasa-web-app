import React from "react";

export default function API({show,onClose,imageData,onPrevious,onNext,filteredData,swipe}) {
    if(!show) return null;

    return (
        <div className="modal" {...swipe}>
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>&times;</span>
                {filteredData.length > 1 && (<button onClick={onPrevious} className="previous-img">&lt;</button>)}
                <img 
                    src={imageData.url} 
                    alt={imageData.title} />
                <div className="modal-info">
                    <h2 className="title">{imageData.title}</h2>
                    <p className="explanation">{imageData.explanation}</p>                    
                    <p className="date">{imageData.date}</p>
                </div>
                {filteredData.length > 1 && (<button onClick={onNext} className="next-img">&gt;</button>)}
            </div>
        </div>
    )
};