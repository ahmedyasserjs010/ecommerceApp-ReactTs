// CategoriesMarquee.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { useCategories } from "../../../services/Brands_Categories/Hooks/Categories";
import SpinnersCart from '../../../shared_components/SpinnersCart/SpinnersCart';

type Category = {
  _id: string;
  name: string;
  image: string;
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

  console.log("Categories:", categories);

  const trackRef = useRef<HTMLDivElement>(null);
  const SPEED_PX_PER_SEC = 120;

  useEffect(() => {
    async function fetchCats() {
      setIsLoading(true);
      try {
        const res = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
        setCategories(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCats();
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    if (categories.length === 0) return;
    if (imagesLoaded < categories.length) return; 

    const track = trackRef.current;
    const totalWidth = track.scrollWidth; 
    const oneSetWidth = totalWidth / 2; 
    const durationSeconds = Math.max(10, oneSetWidth / SPEED_PX_PER_SEC);
    track.style.setProperty("--marquee-duration", `${durationSeconds}s`);
  }, [categories, imagesLoaded]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center ">
        <SpinnersCart />
      </div>
    );
  }

  const items = [...categories, ...categories];

  return (
    <div className="container mx-auto mt-5 mb-5 ">
      <h3 className="text-center text-3xl font-bold mb-8 text-orange-600 dark:text-orange-400">🛍️ Our Categories</h3>

      <div className="relative overflow-hidden bg-white dark:bg-gray-900 py-6 rounded-xl shadow">
        <div
          ref={trackRef}
          className="flex items-center gap-6 whitespace-nowrap will-change-transform marquee-track"
          style={{
            ["--marquee-duration" as any]: "30s",

          }}
        >
          {items.map((cat, idx) => {
            const isOriginal = idx < categories.length;
            return (
              <div
                key={`${cat._id}-${idx}`}
                className="flex flex-col items-center justify-center min-w-[140px] md:min-w-[160px]"
              >
                <div className="w-28 h-28 md:w-60  md:h-60 rounded-full overflow-hidden border-4 border-orange-100 shadow-lg">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full  object-cover transform transition-transform duration-500"
                    onLoad={() => {
                      if (isOriginal) setImagesLoaded((p) => p + 1);

                    }}
                  />
                </div>
                <p className="mt-2 text-sm md:text-base font-medium text-gray-700 dark:text-white">
                  {cat.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .marquee-track {
          display: flex;
        /* align-items: center;*/
          gap: 5.5rem; /* المسافة بين العناصر */
          white-space: nowrap; /* لا تكسر الأسطر */
          animation: marquee var(--marquee-duration) linear infinite;
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* لو أردت الإيقاف عند المرور: أزل التعليق عن السطر التالي */
        /* .marquee-track:hover { animation-play-state: paused; } */

        /* تحسين responsiveness للصورة والنّص داخل الماركيه */
        @media (max-width: 640px) {
          .marquee-track > div { min-width: 120px; }
        }
      `}</style>
    </div>
  );
}
