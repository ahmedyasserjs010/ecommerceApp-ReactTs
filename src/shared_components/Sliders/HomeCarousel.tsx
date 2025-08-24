import React, { useState, useEffect, useRef } from 'react';

import sliderImg4 from "../../assets/images/slider-image-4.jpeg";
import sliderImg5 from "../../assets/images/slider-image-5.jpeg";
import sliderImg6 from "../../assets/images/slider-image-6.jpeg";
import sliderImg7 from "../../assets/images/slider-image-7.jpeg";
import sliderImg8 from "../../assets/images/slider-image-8.jpeg";


export default function HomeCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    // صور العرض - يمكنك استبدالها بصورك الخاصة
    const slides = [
        {
            src: sliderImg6,
            alt: "image 6"
        },
        {
            src: sliderImg7,
            alt: "image 7"
        },
        {
            src: sliderImg5,
            alt: "image 5"
        },
        {
            src: sliderImg4,
            alt: "image 4"
        },
        {
            src: sliderImg8,
            alt: "image 8"
        }
    ];

    // التحرك التلقائي
    useEffect(() => {
        if (isAutoPlaying && !isDragging) {
            intervalRef.current = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % slides.length);
            }, 4000); // كل 4 ثواني
        }
        
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isAutoPlaying, isDragging, slides.length]);

    // توقف التحرك التلقائي عند التفاعل
    const pauseAutoPlay = () => {
        setIsAutoPlaying(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        // إعادة تشغيل التحرك التلقائي بعد 5 ثواني من عدم التفاعل
        setTimeout(() => setIsAutoPlaying(true), 4000);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentSlide(slideIndex);
        pauseAutoPlay();
    };

    const goToPrevious = () => {
        setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
        pauseAutoPlay();
    };

    const goToNext = () => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
        pauseAutoPlay();
    };

    // دوال السحب بالماوس
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setTranslateX(0);
        pauseAutoPlay();
        e.preventDefault();
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        
        const currentX = e.clientX;
        const diffX = currentX - startX;
        setTranslateX(diffX);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        
        setIsDragging(false);
        const threshold = 100; // الحد الأدنى للانتقال للصورة التالية
        
        if (translateX > threshold) {
            goToPrevious();
        } else if (translateX < -threshold) {
            goToNext();
        }
        
        setTranslateX(0);
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            handleMouseUp();
        }
    };

    // دوال اللمس للهواتف
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
        setTranslateX(0);
        pauseAutoPlay();
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        setTranslateX(diffX);
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        
        setIsDragging(false);
        const threshold = 50;
        
        if (translateX > threshold) {
            goToPrevious();
        } else if (translateX < -threshold) {
            goToNext();
        }
        
        setTranslateX(0);
    };

    return (
        <div id="default-carousel" className="relative w-full group" data-carousel="slide">
            {/* Carousel wrapper */}
            <div 
                ref={carouselRef}
                className="relative h-56 overflow-hidden rounded-lg md:h-96 cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {slides.map((slide, index) => (
                    <div 
                        key={index}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                            index === currentSlide 
                                ? 'opacity-100 scale-100 z-20' 
                                : 'opacity-0 scale-95 z-10'
                        }`}
                        style={{
                            transform: isDragging && index === currentSlide 
                                ? `translateX(${translateX}px) scale(1)` 
                                : undefined
                        }}
                        data-carousel-item
                    >
                        <img 
                            src={slide.src} 
                            className="absolute block w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105" 
                            alt={slide.alt}
                            draggable={false}
                        />
                        {/* طبقة شفافة للتأثير البصري */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-700 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}></div>
                    </div>
                ))}
                
                {/* مؤشر السحب */}
                {isDragging && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>

            {/* Slider indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                {slides.map((_, index) => (
                    <button 
                        key={index}
                        type="button" 
                        className={`transition-all duration-300 transform hover:scale-125 ${
                            index === currentSlide 
                                ? 'w-8 h-3 bg-white rounded-full shadow-lg' 
                                : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/80'
                        }`}
                        aria-current={index === currentSlide}
                        aria-label={`الانتقال للصورة ${index + 1}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>

            {/* مؤشر التشغيل التلقائي */}
            <div className="absolute top-4 right-4 z-30">
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isAutoPlaying ? 'bg-orange-400 animate-pulse' : 'bg-gray-400'
                }`}></div>
            </div>

            {/* Slider controls */}
            <button 
                type="button" 
                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none opacity-100 transition-opacity duration-300" 
                onClick={goToPrevious}
            >
                {/* <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm dark:group-hover:bg-gray-300/90 group-hover:bg-white/40 dark:bg-orange-400/90 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none transition-all duration-300 transform group-hover:scale-110"> */}
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm dark:group-hover:bg-gray-300/90 group-hover:bg-white/40 dark:bg-gray-400/90 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none transition-all duration-300 transform group-hover:scale-110">

                    <svg className="w-5 h-5 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                    <span className="sr-only">السابق</span>
                </span>
            </button>
            
            <button 
                type="button" 
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none  opacity-100 transition-opacity duration-300" 
                onClick={goToNext}
            >
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm dark:group-hover:bg-gray-300/90 group-hover:bg-white/40 dark:bg-gray-400/90 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none transition-all duration-300 transform group-hover:scale-110">
                    <svg className="w-5 h-5 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="sr-only">التالي</span>
                </span>
            </button>

            {/* شريط التقدم */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
                <div 
                    className="h-full bg-white transition-all duration-300 ease-out"
                    style={{
                        width: `${((currentSlide + 1) / slides.length) * 100}%`
                    }}
                ></div>
            </div>
        </div>
    );
}