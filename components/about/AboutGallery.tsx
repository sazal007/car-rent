'use client';

import React from 'react';

export const AboutGallery: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-semibold text-center text-carent-text mb-12">Our Journey in Pictures</h2>
        
        {/* Custom 5x5 Grid Layout */}
        <div className="grid grid-cols-5 grid-rows-5 gap-2 h-[600px] md:h-[800px] w-full max-w-5xl mx-auto">
            
            {/* div1 - Automatically flows to 1,1 */}
            <div className="rounded-2xl overflow-hidden relative group">
                <img src="https://picsum.photos/seed/ag1/400/400" alt="Gallery 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            
            {/* div3 */}
            <div className="col-start-2 row-start-2 rounded-2xl overflow-hidden relative group">
                <img src="https://picsum.photos/seed/ag3/400/400" alt="Gallery 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>

            {/* div5 */}
            <div className="col-start-1 row-start-4 rounded-2xl overflow-hidden relative group">
                <img src="https://picsum.photos/seed/ag5/400/400" alt="Gallery 5" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>

            {/* div6 */}
            <div className="col-start-2 row-start-3 rounded-2xl overflow-hidden relative group">
                <img src="https://picsum.photos/seed/ag6/400/400" alt="Gallery 6" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>

            {/* div7 */}
            <div className="col-start-2 row-start-4 rounded-2xl overflow-hidden relative group">
                <img src="https://picsum.photos/seed/ag7/400/400" alt="Gallery 7" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>

            {/* div8 */}
            <div className="col-start-3 row-start-1 rounded-2xl overflow-hidden relative group">
                <img src="https://picsum.photos/seed/ag8/400/400" alt="Gallery 8" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>

            {/* div9 */}
            <div className="col-start-3 row-start-2 rounded-2xl overflow-hidden relative group">
                <img src="https://picsum.photos/seed/ag9/400/400" alt="Gallery 9" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>

            {/* div10 */}
            <div className="col-start-4 row-start-2 rounded-2xl overflow-hidden relative group">
                <img src="https://picsum.photos/seed/ag10/400/400" alt="Gallery 10" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>

            {/* div11 */}
            <div className="col-start-4 row-start-3 rounded-2xl overflow-hidden relative group">
                <img src="https://picsum.photos/seed/ag11/400/400" alt="Gallery 11" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>

            {/* div12 */}
            <div className="col-start-4 row-start-4 rounded-2xl overflow-hidden relative group">
                <img src="https://picsum.photos/seed/ag12/400/400" alt="Gallery 12" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>

            {/* div13 */}
            <div className="col-start-2 row-start-5 rounded-2xl overflow-hidden relative group">
                <img src="https://picsum.photos/seed/ag13/400/400" alt="Gallery 13" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>

            {/* div14 */}
            <div className="col-start-1 row-start-5 rounded-2xl overflow-hidden relative group">
                <img src="https://picsum.photos/seed/ag14/400/400" alt="Gallery 14" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>

            {/* div15 */}
            <div className="col-start-1 row-start-2 rounded-2xl overflow-hidden relative group">
                <img src="https://picsum.photos/seed/ag15/400/400" alt="Gallery 15" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>

        </div>
      </div>
    </section>
  );
};

