"use client";

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

// Testimonials Data
const testimonials = [
    {
        name: "Suhani P.",
        feedback:
            "Absolutely love my new look! The team at GlowNest is so talented and welcoming. Highly recommended!",
    },
    {
        name: "Sadixa B.",
        feedback:
            "Booking was so easy and the service was top-notch. I always walk out feeling refreshed and confident.",
    },
    {
        name: "Kushum P.",
        feedback:
            "The ambiance is stunning and the staff are professionals. GlowNest is now my go-to beauty spot!",
    },
    {
        name: "Nandu P.",
        feedback:
            "Amazing service and friendly staff. GlowNest never fails to impress me!",
    },
    {
        name: "Bihani P.",
        feedback:
            "The online booking was smooth and the actual experience was even better. Highly recommend!",
    },
];

function Testimonials() {
    return (
        <section className="mb-16 px-4 md:px-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#dba052] mb-12 tracking-wider">
                What Our Clients Say
            </h2>

            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={20}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {testimonials.map((testimonial, i) => (
                    <SwiperSlide key={i}>
                        <div className="bg-white h-30 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 w-full flex gap-4 border border-[#f3f3f3] hover:border-[#dba052]/30">
                            {/* Avatar */}
                            <div className="flex-shrink-0 flex items-center">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                                    <img
                                        src={`https://avatar.iran.liara.run/public/boy?username=[${testimonial.name}]`}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-center space-y-2">
                                <p className="italic text-sm md:text-[15px] leading-snug text-gray-600 border-l-2 border-[#dba052] pl-3">
                                    "{testimonial.feedback}"
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-[#222]">{testimonial.name}</span>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 text-xs text-[#1f2937] font-semibold bg-[#f6f6f6] px-2 py-[2px] rounded-full border border-[#e4e4e4]">
                                        <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.798 1.54 8.232L12 18.896l-7.476 4.44 1.54-8.232-6.064-5.798 8.332-1.151z" />
                                        </svg>
                                        <span>4.9</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            
        </section>
    );
}
export default Testimonials;
