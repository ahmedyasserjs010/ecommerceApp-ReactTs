import React from 'react';
import { useBrands } from '../../services/Brands_Categories/Hooks/Brands';
import { IBrand } from '../../services/types';

interface ImageObject {
    src: string;
    alt?: string;
}

interface LogoSliderProps {
    images?: (string | ImageObject)[];
    logoWidth?: number;
    logoHeight?: number;
    containerHeight?: number;
    reverse?: boolean;
    duration?: number;
    pauseOnHover?: boolean;
    className?: string;
    style?: React.CSSProperties;
    theme?: 'light' | 'dark' | 'auto';
    gap?: number;
}

const LogoSlider: React.FC<LogoSliderProps> = ({
    images = [],
    logoWidth = 120,
    logoHeight = 80,
    containerHeight = 100,
    reverse = false,
    duration = 20,
    pauseOnHover = true,
    className = '',
    style = {},
    theme = 'auto',
    gap = 40
}) => {
    const quantity: number = images.length;
    const totalWidth = (logoWidth + gap) * quantity;

    const sliderStyle: React.CSSProperties = {
        '--logo-width': `${logoWidth}px`,
        '--logo-height': `${logoHeight}px`,
        '--container-height': `${containerHeight}px`,
        '--quantity': quantity,
        '--duration': `${duration}s`,
        '--gap': `${gap}px`,
        '--total-width': `${totalWidth}px`,
        ...style
    } as React.CSSProperties;

    const getThemeClass = (): string => {
        if (theme === 'auto') {
            return 'theme-auto';
        }
        return `theme-${theme}`;
    };

    return (
        <div
            className={`logo-slider ${getThemeClass()} ${className}`}
            style={sliderStyle}
            data-reverse={reverse}
            data-pause-on-hover={pauseOnHover}
        >
            <div className="slider-track">
                {/* First set of logos */}
                <div className="slider-set">
                    {images.map((image, index) => (
                        <div
                            key={`first-${index}`}
                            className="logo-item"
                        >
                            <img
                                src={typeof image === 'string' ? image : image.src}
                                alt={typeof image === 'object' ? image.alt || `Logo ${index + 1}` : `Logo ${index + 1}`}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
                {/* Duplicate set for seamless loop */}
                <div className="slider-set">
                    {images.map((image, index) => (
                        <div
                            key={`second-${index}`}
                            className="logo-item"
                        >
                            <img
                                src={typeof image === 'string' ? image : image.src}
                                alt={typeof image === 'object' ? image.alt || `Logo ${index + 1}` : `Logo ${index + 1}`}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .logo-slider {
                    width: 100%;
                    height: var(--container-height);
                    overflow: hidden;
                    position: relative;
                    display: flex;
                    align-items: center;
                    mask-image: linear-gradient(
                        to right,
                        transparent 0%,
                        black 10%,
                        black 90%,
                        transparent 100%
                    );
                    -webkit-mask-image: linear-gradient(
                        to right,
                        transparent 0%,
                        black 10%,
                        black 90%,
                        transparent 100%
                    );
                }

                .slider-track {
                    display: flex;
                    width: calc(var(--total-width) * 2);
                    animation: slideRight var(--duration) linear infinite;
                }

                .logo-slider[data-reverse="true"] .slider-track {
                    animation: slideLeft var(--duration) linear infinite;
                }

                .slider-set {
                    display: flex;
                    align-items: center;
                    width: var(--total-width);
                    flex-shrink: 0;
                }

                .logo-item {
                    width: var(--logo-width);
                    height: var(--logo-height);
                    margin-right: var(--gap);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    padding: 10px;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255);
                    backdrop-filter: blur(10px);
                    border: 3px solid rgba(0, 0, 0, 0.1);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                }

                .logo-item img {
                    max-width: 100%;
                    max-height: 100%;
                    width: auto;
                    height: auto;
                    object-fit: contain;
                    filter: brightness(1) contrast(1);
                    transition: all 0.3s ease;
                }

                /* Dark theme styles */
                .theme-dark .logo-item {
                    background: rgba(0, 0, 0, 0.8);
                    border: 3px solid #fff;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                }

                .theme-dark .logo-item img {
                    filter: brightness(1.1) contrast(0.9);
                }

                /* Auto theme (system preference) */
                @media (prefers-color-scheme: dark) {
                    .theme-auto .logo-item {
                        background: rgba(0, 0, 0, 0.8);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    }

                    .theme-auto .logo-item img {
                        filter: brightness(1.1) contrast(0.9);
                    }
                }

                /* Hover effects */
                .logo-slider[data-pause-on-hover="true"]:hover .slider-track {
                    animation-play-state: paused;
                }

                .logo-slider[data-pause-on-hover="true"] .logo-item:hover {
                    transform: translateY(-5px) scale(1.05);
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
                }

                .theme-dark .logo-slider[data-pause-on-hover="true"] .logo-item:hover {
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
                }

                .logo-slider[data-pause-on-hover="true"] .logo-item:hover img {
                    filter: brightness(1.1) contrast(1.1);
                }

                /* Animations */
                @keyframes slideRight {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(calc(var(--total-width) * -1));
                    }
                }

                @keyframes slideLeft {
                    from {
                        transform: translateX(calc(var(--total-width) * -1));
                    }
                    to {
                        transform: translateX(0);
                    }
                }

                /* Responsive design */
                @media (max-width: 768px) {
                    .logo-slider {
                        --logo-width: 100px;
                        --logo-height: 60px;
                        --container-height: 80px;
                        --gap: 20px;
                    }
                }

                @media (max-width: 480px) {
                    .logo-slider {
                        --logo-width: 80px;
                        --logo-height: 50px;
                        --container-height: 70px;
                        --gap: 15px;
                    }
                }
            `}</style>
        </div>
    );
};

// ✅ الكومبوننت اللي هيجيب الداتا من الـ API ويعرضها
const LogoSliderBrands: React.FC = () => {
    const { data, isLoading, isError } = useBrands();

    // لو بتحميل
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <p className="text-gray-500 dark:text-gray-300">Loading brands...</p>
            </div>
        );
    }

    // لو حصل error
    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <p className="text-red-500">Failed to load brands.</p>
            </div>
        );
    }

    // تحويل الداتا من API إلى الشكل المطلوب
    const logoImages: ImageObject[] =
        data?.data?.data?.map((brand: IBrand) => ({
            src: brand.image,
            alt: brand.name
        })) || [];
    console.log(logoImages);

    return (
        <div
            style={{
                margin: 0,
                padding: '40px 0',
                minHeight: '200px'
            }}
        >
            <main
                style={{
                    width: '100%',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '60px'
                }}
            >
                <div>
                    <h1 className="text-4xl text-center font-bold text-orange-600 mb-6">
                        🏷️ All Brands
                    </h1>
                    <LogoSlider
                        className="border border-gray-300 rounded-lg overflow-hidden"
                        images={logoImages}
                        logoWidth={140}
                        logoHeight={90}
                        containerHeight={120}
                        duration={110}
                        pauseOnHover={true}
                        theme="auto"
                        gap={50}
                        reverse={true} // 👈 false = من اليمين للشمال, true = من الشمال لليمين
                    />
                </div>
            </main>
        </div>
    );
};

export default LogoSliderBrands;