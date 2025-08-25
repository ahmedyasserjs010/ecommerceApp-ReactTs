import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import kitchen images exactly like your original code
import Kitchen1 from "../../assets/images/Kitchen/1.png";
import Kitchen2 from "../../assets/images/Kitchen/2.png";
import Kitchen3 from "../../assets/images/Kitchen/3.png";
import Kitchen4 from "../../assets/images/Kitchen/4.png";
import Kitchen5 from "../../assets/images/Kitchen/5.png";
import Kitchen6 from "../../assets/images/Kitchen/6.png";
import Kitchen7 from "../../assets/images/Kitchen/7.png";
import Kitchen8 from "../../assets/images/Kitchen/8.png";
import Kitchen9 from "../../assets/images/Kitchen/4.png";
import Kitchen10 from "../../assets/images/Kitchen/5.png";
import Kitchen11 from "../../assets/images/Kitchen/6.png";
import Kitchen12 from "../../assets/images/Kitchen/7.png";

const kitchenAppliances = [
    {
        img: Kitchen1,
        title: "كبه الجوكر استانلس لحوم وخضروات سعه 3 لتر 600 وات",
        oldPrice: "LE 1,099.00",
        newPrice: "LE 899.00",
        discount: "13%",
    },
    {
        img: Kitchen2,
        title: "قلاية جماكي بدون زيت 7 لتر بقوة 1800 وات jmk5007",
        oldPrice: "LE 3,199.00",
        newPrice: "LE 2,780.00",
        discount: "18%",
    },
    {
        img: Kitchen3,
        title: "غلايه دريم جرانيت 1.5 لتر 1500 وات",
        oldPrice: "LE 400.00",
        newPrice: "LE 329.00",
        discount: "10%",
    },
    {
        img: Kitchen4,
        title: "عجان بلاك اند وايت 7 لتر استانلس 1600وات 6 سرعات SM-716",
        oldPrice: "LE 5,999.00",
        newPrice: "LE 5,399.00",
        discount: "5%",
    },
    {
        img: Kitchen5,
        title: "عجان سمارت 7 لتر 1500وات تاتش تحكم / ليد - 8 سرعات SBM5502LS",
        oldPrice: "LE 6,010.00",
        newPrice: "LE 5,699.00",
        discount: "5%",
    },
    {
        img: Kitchen6,
        title: "بوتجاز فريش 5 شعله غاز بونتو 60*80 بنى مروحه سطح استانليس",
        oldPrice: "LE 10,299.00",
        newPrice: "LE 9,799.00",
        discount: "10%",
    },
    {
        img: Kitchen7,
        title: "كاسيل ميكرويف 20 لتر 29006 MW7020",
        oldPrice: "LE 4,749.00",
        newPrice: "LE 4,274.00",
        discount: "10%",
    },
    {
        img: Kitchen8,
        title: "كاسيل فرن سعه 55 لتر بالشوايه ولمبه وزجاج مزدوج EO4055R",
        oldPrice: "LE 3,349.00",
        newPrice: "LE 3,014.00",
        discount: "10%",
    },
    {
        img: Kitchen9,
        title: "كاسيل كويكى 1.5 لتر 2 سكينه 14001 CHMX1050SP",
        oldPrice: "LE 1,175.00",
        newPrice: "LE 1,059.00",
        discount: "10%",
    },
    {
        img: Kitchen10,
        title: "فرن كاسيل سعه 45 لتر بالشوايه ولمبه ومروحه وزجاج مزدوج EO4045RF",
        oldPrice: "LE 3,285.00",
        newPrice: "LE 2,959.00",
        discount: "17%",
    },
    {
        img: Kitchen11,
        title: "تاتش الزانوكي فرن كهربائي سعه 48 لتر",
        oldPrice: "LE 3,000.00",
        newPrice: "LE 2,499.00",
        discount: "13%",
    },
    {
        img: Kitchen12,
        title: "تاتش الزانوكي مضرب بيض بقوة 600وات",
        oldPrice: "LE 800.00",
        newPrice: "LE 699.00",
        discount: "9%",
    },
];

export default function Kitchen() {
    const [current, setCurrent] = useState(0);
    
    // Responsive items per slide based on screen size
    const getItemsPerSlide = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return 1;      // Mobile: 1 item
            if (window.innerWidth < 768) return 2;      // Tablet: 2 items  
            if (window.innerWidth < 1024) return 3;     // Small laptop: 3 items
            return 4;                                   // Desktop: 4 items
        }
        return 4;
    };

    const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

    // Update items per slide on window resize
    React.useEffect(() => {
        const handleResize = () => {
            setItemsPerSlide(getItemsPerSlide());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Move by 2-3 items based on screen size
    const getMoveStep = () => {
        if (itemsPerSlide === 1) return 1;      // Mobile: move 1
        if (itemsPerSlide === 2) return 2;      // Tablet: move 2
        if (itemsPerSlide === 3) return 3;      // Small laptop: move 3
        return 2;                               // Desktop: move 2
    };

    const moveStep = getMoveStep();

    const nextSlide = () => {
        const maxIndex = kitchenAppliances.length - itemsPerSlide;
        if (current + moveStep <= maxIndex) {
            setCurrent((prev) => prev + moveStep);
        } else if (current < maxIndex) {
            setCurrent(maxIndex);
        }
    };

    const prevSlide = () => {
        if (current - moveStep >= 0) {
            setCurrent((prev) => prev - moveStep);
        } else if (current > 0) {
            setCurrent(0);
        }
    };

    const canGoNext = current < kitchenAppliances.length - itemsPerSlide;
    const canGoPrev = current > 0;

    return (
        <div className="relative w-full max-w-7xl mx-auto py-6 sm:py-8 md:py-12 bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12 dark:text-white text-gray-800">
                أحدث أجهزة المطبخ
            </h2>

            <div className="relative">
                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    disabled={!canGoPrev}
                    className={`
                        absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-10
                        w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-lg
                        flex items-center justify-center
                        transition-all duration-300 transform
                        ${canGoPrev 
                            ? 'bg-orange-600 hover:bg-orange-700 text-white hover:scale-110 shadow-orange-200' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }
                    `}
                >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </button>

                <button
                    onClick={nextSlide}
                    disabled={!canGoNext}
                    className={`
                        absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-10
                        w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-lg
                        flex items-center justify-center
                        transition-all duration-300 transform
                        ${canGoNext 
                            ? 'bg-orange-600 hover:bg-orange-700 text-white hover:scale-110 shadow-orange-200' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }
                    `}
                >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </button>

                {/* Carousel Container */}
                <div className="overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16">
                    <div 
                        className="flex transition-transform duration-500 ease-in-out gap-3 sm:gap-4 md:gap-5 lg:gap-6"
                        style={{
                            transform: `translateX(-${(current * (100 / itemsPerSlide))}%)`
                        }}
                    >
                        {kitchenAppliances.map((item, idx) => (
                            <div
                                key={idx}
                                className={`
                                    flex-none min-w-0
                                    ${itemsPerSlide === 1 ? 'w-full' : ''}
                                    ${itemsPerSlide === 2 ? 'w-1/2' : ''}
                                    ${itemsPerSlide === 3 ? 'w-1/3' : ''}
                                    ${itemsPerSlide === 4 ? 'w-1/4' : ''}
                                `}
                            >
                                <div className="rounded-2xl shadow-lg bg-white dark:bg-gray-800 overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300 border-2 border-orange-500 group h-full">
                                    <div className="p-3 sm:p-4 flex flex-col items-center text-center h-full">
                                        <div className="relative overflow-hidden rounded-lg flex-shrink-0">
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="w-full h-36 sm:h-40 md:h-44 lg:h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <span className="absolute top-2 right-2 bg-orange-600 text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
                                                -{item.discount}
                                            </span>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between mt-3">
                                            <h3 className="text-sm sm:text-base font-semibold dark:text-white text-gray-800 line-clamp-2 mb-2">
                                                {item.title}
                                            </h3>
                                            <div className="space-y-1">
                                                <p className="text-xs sm:text-sm line-through text-gray-400">
                                                    {item.oldPrice}
                                                </p>
                                                <p className="text-base sm:text-lg font-bold text-orange-600">
                                                    {item.newPrice}
                                                </p>
                                                <button className="mt-2 px-3 sm:px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-colors duration-200 font-medium shadow-md hover:shadow-lg text-xs sm:text-sm w-full">
                                                    اشترى الان
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 gap-2">
                    {Array.from({ 
                        length: Math.ceil((kitchenAppliances.length - itemsPerSlide) / moveStep) + 1 
                    }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx * moveStep)}
                            className={`
                                w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200
                                ${current === idx * moveStep
                                    ? 'bg-orange-600 scale-125' 
                                    : 'bg-gray-300 hover:bg-gray-400'
                                }
                            `}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}