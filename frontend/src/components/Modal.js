import React from "react";

export default function API({show,onClose,imageData,onPrevious,onNext}) {
    if(!show) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>&times;</span>
                <button onClick={onPrevious} className="previous-img">&lt;</button>
                <img 
                    src={imageData.url} 
                    alt={imageData.title} />
                <div className="modal-info">
                    <h2 className="title">{imageData.title}</h2>
                    <p className="explanation">{imageData.explanation}</p>                    
                    <p className="date">{imageData.date}</p>
                </div>
                <button onClick={onNext} className="next-img">&gt;</button>
            </div>
        </div>
    )
};