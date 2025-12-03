import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Card from "./card.jsx";

export default function Carousel({ items = [] }) {
    
    const chunkSize = 3;
    const slides = [];
    for (let i = 0; i < items.length; i += chunkSize) {
        slides.push(items.slice(i, i + chunkSize));
    }

    
    const reactId = React.useId();
    const carouselId = `carousel-${reactId}`;

    return (
        <div id={carouselId} className="carousel slide" data-bs-interval="false">
            <div className="carousel-inner">
                {slides.map((chunk, slideIndex) => (
                    <div key={slideIndex} className={"carousel-item" + (slideIndex === 0 ? " active" : "")}>
                        <div className="row">
                            {chunk.map((item, idx) => (
                                <div key={`${slideIndex}-${idx}`} className="col-12 col-md-4 d-flex justify-content-center">
                                    <Card name={item.name} image={item.image} url={item.url} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

           
            {slides.length > 1 && (
                <>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev" style={{width: "50px" }}>
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next" style={{width: "50px" }}>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </>
            )}
        </div>
    );
}