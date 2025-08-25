import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import dishes images exactly like your original code
import Dishes1 from "../../assets/images/dishes/1.png";
import Dishes2 from "../../assets/images/dishes/2.png";
import Dishes3 from "../../assets/images/dishes/3.png";
import Dishes4 from "../../assets/images/dishes/4.png";
import Dishes5 from "../../assets/images/dishes/5.png";
import Dishes6 from "../../assets/images/dishes/6.png";
import Dishes7 from "../../assets/images/dishes/7.png";
import Dishes8 from "../../assets/images/dishes/8.png";
import Dishes9 from "../../assets/images/dishes/9.png";
import Dishes10 from "../../assets/images/dishes/10.png";
import Dishes11 from "../../assets/images/dishes/11.png";
import Dishes12 from "../../assets/images/dishes/12.png";
import Dishes13 from "../../assets/images/dishes/13.png";
import Dishes14 from "../../assets/images/dishes/14.png";
import Dishes15 from "../../assets/images/dishes/15.png";
import Dishes16 from "../../assets/images/dishes/16.png";
import Dishes17 from "../../assets/images/dishes/17.png";
import Dishes18 from "../../assets/images/dishes/18.png";
import Dishes19 from "../../assets/images/dishes/19.png";
import Dishes20 from "../../assets/images/dishes/20.png";
import Dishes21 from "../../assets/images/dishes/21.png";
import Dishes22 from "../../assets/images/dishes/22.png";
import Dishes23 from "../../assets/images/dishes/23.png";
import Dishes24 from "../../assets/images/dishes/24.png";
import Dishes25 from "../../assets/images/dishes/25.png";
import Dishes26 from "../../assets/images/dishes/26.png";
import Dishes27 from "../../assets/images/dishes/27.png";
import Dishes28 from "../../assets/images/dishes/28.png";
import Dishes29 from "../../assets/images/dishes/29.png";
import Dishes30 from "../../assets/images/dishes/30.png";
import Dishes31 from "../../assets/images/dishes/31.png";
import Dishes32 from "../../assets/images/dishes/32.png";
import Dishes33 from "../../assets/images/dishes/33.png";
import Dishes34 from "../../assets/images/dishes/34.png";
import Dishes35 from "../../assets/images/dishes/35.png";
import Dishes36 from "../../assets/images/dishes/36.png";
import Dishes37 from "../../assets/images/dishes/37.png";
import Dishes38 from "../../assets/images/dishes/38.png";
import Dishes39 from "../../assets/images/dishes/39.png";
import Dishes40 from "../../assets/images/dishes/40.png";
import Dishes41 from "../../assets/images/dishes/41.png";

const dishesAndTools = [
    {
        img: Dishes1,
        title: "طقم أواني طبخ استانلس 12 قطعة مع أغطية زجاجية",
        oldPrice: "LE 2,599.00",
        newPrice: "LE 1,999.00",
        discount: "23%",
    },
    {
        img: Dishes2,
        title: "مقلاة سيراميك مضادة للالتصاق 28 سم مع غطاء",
        oldPrice: "LE 599.00",
        newPrice: "LE 449.00",
        discount: "25%",
    },
    {
        img: Dishes3,
        title: "طقم سكاكين مطبخ ألماني 8 قطع مع حامل خشبي",
        oldPrice: "LE 899.00",
        newPrice: "LE 699.00",
        discount: "22%",
    },
    {
        img: Dishes4,
        title: "طقم أطباق بورسلين فاخر 24 قطعة لـ 6 أشخاص",
        oldPrice: "LE 1,299.00",
        newPrice: "LE 999.00",
        discount: "23%",
    },
    {
        img: Dishes5,
        title: "مجموعة حافظات طعام زجاجية بأغطية محكمة 10 قطع",
        oldPrice: "LE 749.00",
        newPrice: "LE 579.00",
        discount: "23%",
    },
    {
        img: Dishes6,
        title: "خلاط يدوي كهربائي 5 سرعات مع إكسسوارات",
        oldPrice: "LE 399.00",
        newPrice: "LE 299.00",
        discount: "25%",
    },
    {
        img: Dishes7,
        title: "طقم أكواب قهوة وشاي بورسلين 12 قطعة",
        oldPrice: "LE 459.00",
        newPrice: "LE 349.00",
        discount: "24%",
    },
    {
        img: Dishes8,
        title: "لوح تقطيع خشب طبيعي مضاد للبكتيريا مجموعة 3 قطع",
        oldPrice: "LE 299.00",
        newPrice: "LE 229.00",
        discount: "23%",
    },
    {
        img: Dishes9,
        title: "طقم ملاعق وشوك استانلس فاخر 24 قطعة",
        oldPrice: "LE 799.00",
        newPrice: "LE 599.00",
        discount: "25%",
    },
    {
        img: Dishes10,
        title: "حلة ضغط استانلس 8 لتر مع صمام أمان",
        oldPrice: "LE 1,199.00",
        newPrice: "LE 899.00",
        discount: "25%",
    },
    {
        img: Dishes11,
        title: "طقم قدور جرانيت مضادة للالتصاق 7 قطع",
        oldPrice: "LE 1,599.00",
        newPrice: "LE 1,199.00",
        discount: "25%",
    },
    {
        img: Dishes12,
        title: "مبشرة متعددة الاستخدامات مع حاوية تجميع",
        oldPrice: "LE 199.00",
        newPrice: "LE 149.00",
        discount: "25%",
    },
    {
        img: Dishes13,
        title: "طقم صواني تقديم استانلس مقاوم للصدأ 3 قطع",
        oldPrice: "LE 699.00",
        newPrice: "LE 529.00",
        discount: "24%",
    },
    {
        img: Dishes14,
        title: "ميزان مطبخ رقمي دقيق حتى 5 كيلو",
        oldPrice: "LE 349.00",
        newPrice: "LE 269.00",
        discount: "23%",
    },
    {
        img: Dishes15,
        title: "طقم أوعية خلط مضادة للانزلاق 5 أحجام مختلفة",
        oldPrice: "LE 459.00",
        newPrice: "LE 349.00",
        discount: "24%",
    },
    {
        img: Dishes16,
        title: "مصفاة خضروات قابلة للطي سيليكون عملية",
        oldPrice: "LE 179.00",
        newPrice: "LE 129.00",
        discount: "28%",
    },
    {
        img: Dishes17,
        title: "طقم كاسات عصير زجاج ملون 6 قطع مع صينية",
        oldPrice: "LE 399.00",
        newPrice: "LE 299.00",
        discount: "25%",
    },
    {
        img: Dishes18,
        title: "فتاحة علب كهربائية أوتوماتيكية بدون جهد",
        oldPrice: "LE 299.00",
        newPrice: "LE 229.00",
        discount: "23%",
    },
    {
        img: Dishes19,
        title: "طقم حافظات بهارات زجاجية مع ملصقات 12 قطعة",
        oldPrice: "LE 549.00",
        newPrice: "LE 419.00",
        discount: "24%",
    },
    {
        img: Dishes20,
        title: "مقص مطبخ متعدد الاستخدامات استانلس حاد",
        oldPrice: "LE 149.00",
        newPrice: "LE 109.00",
        discount: "27%",
    },
    {
        img: Dishes21,
        title: "طقم أطباق تقديم خزفية بتصميم عربي أصيل 6 قطع",
        oldPrice: "LE 899.00",
        newPrice: "LE 679.00",
        discount: "24%",
    },
    {
        img: Dishes22,
        title: "حافظة خبز فولاذية مضادة للصدأ بغطاء شفاف",
        oldPrice: "LE 459.00",
        newPrice: "LE 349.00",
        discount: "24%",
    },
    {
        img: Dishes23,
        title: "طقم أكواب شاي زجاجية مقاومة للحرارة 6 قطع",
        oldPrice: "LE 349.00",
        newPrice: "LE 259.00",
        discount: "26%",
    },
    {
        img: Dishes24,
        title: "مطحنة فلفل وملح كهربائية LED مجموعة قطعتين",
        oldPrice: "LE 399.00",
        newPrice: "LE 299.00",
        discount: "25%",
    },
    {
        img: Dishes25,
        title: "طقم سلطانيات سيراميك ملونة للسلطات 8 قطع",
        oldPrice: "LE 649.00",
        newPrice: "LE 489.00",
        discount: "25%",
    },
    {
        img: Dishes26,
        title: "مقشرة خضروات متعددة الشفرات مع واقي إصبع",
        oldPrice: "LE 99.00",
        newPrice: "LE 79.00",
        discount: "20%",
    },
    {
        img: Dishes27,
        title: "طقم قوالب كيك سيليكون مختلفة الأشكال 12 قطعة",
        oldPrice: "LE 449.00",
        newPrice: "LE 339.00",
        discount: "24%",
    },
    {
        img: Dishes28,
        title: "منظم أدراج مطبخ بلاستيك شفاف قابل للتعديل",
        oldPrice: "LE 199.00",
        newPrice: "LE 149.00",
        discount: "25%",
    },
    {
        img: Dishes29,
        title: "طقم ترامس حفظ الطعام الحار والبارد 3 أحجام",
        oldPrice: "LE 899.00",
        newPrice: "LE 699.00",
        discount: "22%",
    },
    {
        img: Dishes30,
        title: "مصباح LED تحت الخزائن يعمل بالبطارية",
        oldPrice: "LE 249.00",
        newPrice: "LE 189.00",
        discount: "24%",
    },
    {
        img: Dishes31,
        title: "طقم فرش تنظيف الزجاجات والقوارير 5 قطع",
        oldPrice: "LE 159.00",
        newPrice: "LE 119.00",
        discount: "25%",
    },
    {
        img: Dishes32,
        title: "حامل أكياس القمامة قابل للطي وسهل التركيب",
        oldPrice: "LE 179.00",
        newPrice: "LE 129.00",
        discount: "28%",
    },
    {
        img: Dishes33,
        title: "طقم مناشف مطبخ قطنية ماصة للماء 6 قطع",
        oldPrice: "LE 299.00",
        newPrice: "LE 229.00",
        discount: "23%",
    },
    {
        img: Dishes34,
        title: "منظف فرن طبيعي فعال مع إسفنجة تنظيف",
        oldPrice: "LE 89.00",
        newPrice: "LE 69.00",
        discount: "22%",
    },
    {
        img: Dishes35,
        title: "طقم حصائر طعام مضادة للانزلاق 4 قطع ألوان متدرجة",
        oldPrice: "LE 199.00",
        newPrice: "LE 149.00",
        discount: "25%",
    },
    {
        img: Dishes36,
        title: "جهاز تقطيع البصل دون دموع مع حاوية تجميع",
        oldPrice: "LE 259.00",
        newPrice: "LE 199.00",
        discount: "23%",
    },
    {
        img: Dishes37,
        title: "طقم أدوات طبخ سيليكون مقاومة للحرارة 10 قطع",
        oldPrice: "LE 549.00",
        newPrice: "LE 419.00",
        discount: "24%",
    },
    {
        img: Dishes38,
        title: "منظم توابل دوار 2 طبقة يحمل 16 علبة بهارات",
        oldPrice: "LE 399.00",
        newPrice: "LE 299.00",
        discount: "25%",
    },
    {
        img: Dishes39,
        title: "طقم قفازات فرن سيليكون مقاومة للحرارة مع حصيرة",
        oldPrice: "LE 149.00",
        newPrice: "LE 119.00",
        discount: "20%",
    },
    {
        img: Dishes40,
        title: "آلة صنع الآيس كريم المنزلية سعة 1.5 لتر",
        oldPrice: "LE 1,299.00",
        newPrice: "LE 999.00",
        discount: "23%",
    },
    {
        img: Dishes41,
        title: "طقم فناجين قهوة تركية نحاسية أصلية مع صينية",
        oldPrice: "LE 799.00",
        newPrice: "LE 599.00",
        discount: "25%",
    },
];

export default function Dishes() {
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
        const maxIndex = dishesAndTools.length - itemsPerSlide;
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

    const canGoNext = current < dishesAndTools.length - itemsPerSlide;
    const canGoPrev = current > 0;

    return (
        <div className="relative w-full max-w-7xl mx-auto py-6 sm:py-8 md:py-12 bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 rounded-b-2xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12 dark:text-white text-gray-800">
                أحدث الأدوات المنزلية
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
                        {dishesAndTools.map((item, idx) => (
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
                        length: Math.ceil((dishesAndTools.length - itemsPerSlide) / moveStep) + 1 
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