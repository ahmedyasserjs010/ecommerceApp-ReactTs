// import React from 'react';
// //ANCHOR - import Images 
// import image1 from '../../assets/images/slider1_1.png';
// import image2 from '../../assets/images/slider1_2.png';
// import image3 from '../../assets/images/slider1_3.png';
// import image4 from '../../assets/images/slider1_4.png';
// import image5 from '../../assets/images/slider1_7.png';
// import image6 from '../../assets/images/slider1_6.png';


// interface ImageObject {
//     src: string;
//     alt?: string;
// }

// interface InfiniteSliderProps {
//     images?: (string | ImageObject)[];
//     width?: number;
//     height?: number;
//     reverse?: boolean;
//     duration?: number;
//     pauseOnHover?: boolean;
//     className?: string;
//     style?: React.CSSProperties;
// }

// const InfiniteSlider: React.FC<InfiniteSliderProps> = ({
//     images = [],
//     width = 100,
//     height = 50,
//     reverse = false,
//     duration = 10,
//     pauseOnHover = true,
//     className = '',
//     style = {}
// }) => {
//     const quantity: number = images.length;

//     const sliderStyle: React.CSSProperties = {
//         '--width': `${width}px`,
//         '--height': `${height}px`,
//         '--quantity': quantity,
//         '--duration': `${duration}s`,
//         ...style
//     } as React.CSSProperties;

//     const itemStyle = (position: number): React.CSSProperties => ({
//         '--position': position
//     } as React.CSSProperties);

//     return (
//         <div
//             className={`infinite-slider ${className}`}
//             style={sliderStyle}
//             data-reverse={reverse}
//             data-pause-on-hover={pauseOnHover}
//         >
//             <div className="slider-list">
//                 {images.map((image, index) => (
//                     <div
//                         key={index}
//                         className="slider-item"
//                         style={itemStyle(index + 1)}
//                     >
//                         <img
//                             src={typeof image === 'string' ? image : image.src}
//                             alt={typeof image === 'object' ? image.alt || `Slide ${index + 1}` : `Slide ${index + 1}`}
//                         />
//                     </div>
//                 ))}
//             </div>

//             <style>{`
//         .infinite-slider {
//           width: 100%;
//           height: var(--height);
//           overflow: hidden;
//           mask-image: linear-gradient(
//             to right,
//             transparent,
//             #000 10% 90%,
//             transparent
//           );
//         }
        
//         .slider-list {
//           display: flex;
//           width: 100%;
//           min-width: calc(var(--width) * var(--quantity));
//           position: relative;
//         }
        
//         .slider-item {
//           width: var(--width);
//           height: var(--height);
//           position: absolute;
//           left: 100%;
//           animation: autoRun var(--duration) linear infinite;
//           transition: filter 0.5s;
//           animation-delay: calc((var(--duration) / var(--quantity)) * (var(--position) - 1) - var(--duration)) !important;
//         }
        
//         .slider-item img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }
        
//         @keyframes autoRun {
//           from {
//             left: 100%;
//           }
//           to {
//             left: calc(var(--width) * -1);
//           }
//         }
        
//         .infinite-slider[data-pause-on-hover="true"]:hover .slider-item {
//           animation-play-state: paused !important;
//           filter: grayscale(1);
//         }
        
//         .infinite-slider[data-pause-on-hover="true"] .slider-item:hover {
//           filter: grayscale(0);
//         }
        
//         .infinite-slider[data-reverse="true"] .slider-item {
//           animation: reversePlay var(--duration) linear infinite;
//           animation-delay: calc((var(--duration) / var(--quantity)) * (var(--position) - 1) - var(--duration)) !important;
//         }
        
//         @keyframes reversePlay {
//           from {
//             left: calc(var(--width) * -1);
//           }
//           to {
//             left: 100%;
//           }
//         }
//       `}</style>
//         </div>
//     );
// };

// // Demo usage of the component
// const InfiniteSlide: React.FC = () => {
//     // Sample images - replace with your actual image URLs
//     const slider1Images: string[] = [
//         'https://picsum.photos/100/50?random=1',
//         'https://picsum.photos/100/50?random=2',
//         'https://picsum.photos/100/50?random=3',
//         'https://picsum.photos/100/50?random=4',
//         'https://picsum.photos/100/50?random=5',
//         'https://picsum.photos/100/50?random=6',
//         'https://picsum.photos/100/50?random=7',
//         'https://picsum.photos/100/50?random=8',
//         'https://picsum.photos/100/50?random=9',
//         'https://picsum.photos/100/50?random=10'
//     ];

//     const slider2Images: ImageObject[] = [
//         { src: image1, alt: 'Image 1' },
//         { src: image2, alt: 'Image 2' },
//         { src: image3, alt: 'Image 3' },
//         { src: image4, alt: 'Image 4' },
//         { src: image5, alt: 'Image 5' },
//         { src: image6, alt: 'Image 6' },
//         // { src: 'https://picsum.photos/200/200?random=17', alt: 'Image 7' },
//         // { src: 'https://picsum.photos/200/200?random=19', alt: 'Image 9' }
//     ];

//     return (
//         <div style={{
//             margin: 0,
//             // backgroundColor: '#e5e5e5',
//             // minHeight: '100vh',
//             padding: '20px 0'
//         }}>
//             <main style={{
//                 // width: 'min(1200px, 90vw)',
//                 width: '100%',
//                 margin: 'auto',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '40px'
//             }}>
//                 {/* <div>
//                     <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Basic Slider</h2>
//                     <InfiniteSlider
//                         images={slider1Images}
//                         width={100}
//                         height={50}
//                         duration={10}
//                     />
//                 </div> */}

//                 <div>
//                     <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Reverse Slider</h2>
//                     <InfiniteSlider
//                         images={slider2Images}
//                         width={200}
//                         height={200}
//                         reverse={true}
//                         duration={15}
//                     />
//                 </div>

//                 {/* <div>
//                     <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Fast Slider (No Pause on Hover)</h2>
//                     <InfiniteSlider
//                         images={slider1Images}
//                         width={80}
//                         height={80}
//                         duration={5}
//                         pauseOnHover={false}
//                     />
//                 </div> */}
//             </main>
//         </div>
//     );
// };

// export default InfiniteSlide;