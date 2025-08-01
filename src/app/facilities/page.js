'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Facilities() {
    const headingRef = useRef(null);
    const [showAllLabs, setShowAllLabs] = useState(false);

    useEffect(() => {
        // Split the heading text into individual characters and animate them
        const heading = headingRef.current;
        if (heading) {
          const text = heading.textContent || '';
          const characters = text.split('');
          heading.innerHTML = characters.map((char) => 
            char === ' ' ? ' ' : `<span class="opacity-0">${char}</span>`
          ).join('');
          
          const spans = heading.querySelectorAll('span');
          
          gsap.to(spans, {
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.5
          });
        }
      }, []);

      const preclinicalRef = useRef(null);
  const nursingFoundationRef = useRef(null);
  const obgRef = useRef(null);
  const childHealthRef = useRef(null);
  const communityHealthRef = useRef(null);
  const computerRef = useRef(null);
  const nutritionRef = useRef(null);
  const audioVisualRef = useRef(null);
  const hostelRef = useRef(null);
  const sportsRef = useRef(null);
  const libraryRef = useRef(null);
  const cafeteriaRef = useRef(null);
  const medicalRef = useRef(null);

  useEffect(() => {
    // Animation for Preclinical Science Lab (Right to Left)
    gsap.from(preclinicalRef.current, {
      x: 200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: preclinicalRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animation for Nursing Foundation Lab (Left to Right)
    gsap.from(nursingFoundationRef.current, {
      x: -200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: nursingFoundationRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animation for OBG Lab (Right to Left)
    gsap.from(obgRef.current, {
      x: 200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: obgRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animation for Child Health Lab (Left to Right)
    gsap.from(childHealthRef.current, {
      x: -200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: childHealthRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animation for Community Health Lab (Right to Left)
    gsap.from(communityHealthRef.current, {
      x: 200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: communityHealthRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animation for Computer Lab (Left to Right)
    gsap.from(computerRef.current, {
      x: -200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: computerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animation for Nutrition Lab (Right to Left)
    gsap.from(nutritionRef.current, {
      x: 200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: nutritionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animation for Audio-Visual Aids Room (Left to Right)
    gsap.from(audioVisualRef.current, {
      x: -200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: audioVisualRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animation for Hostel Facilities (Right to Left)
    gsap.from(hostelRef.current, {
      x: 200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: hostelRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animation for Sports & Recreation Facilities (Left to Right)
    gsap.from(sportsRef.current, {
      x: -200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: sportsRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animation for Library & Study Center (Right to Left)
    gsap.from(libraryRef.current, {
      x: 200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: libraryRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animation for Cafeteria & Dining (Left to Right)
    gsap.from(cafeteriaRef.current, {
      x: -200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: cafeteriaRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animation for Medical Center (Right to Left)
    gsap.from(medicalRef.current, {
      x: 200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: medicalRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

    return(
        <section className="bg-white text-gray-800 overflow-hidden">

<div className="absolute inset-0 z-0 pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-pink-50/50 to-white/80"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-pink-100/40"></div>
  </div>
      {/* Section 1 */}
      <div
        className="relative py-12 md:py-24 px-4 md:px-6 lg:px-16 overflow-hidden"
        style={{
          backgroundImage: 'url(/images/bg.webp)',
         
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
           backgroundSize: '600px 600px'
          
          
        }}
      >
        {/* Light Color Fade Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-pink-50/80 to-white/90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-pink-100/40"></div> */}
       
        
        {/* Content */}
        <div className="relative z-10">
          <div className="mx-auto text-left mb-8 md:mb-16 px-4">
          <h2
            ref={headingRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl !font-extrabold !text-[#FB7185] !leading-snug">
             State-of-the-Art Facilities Empowering Future Healthcare Professionals
           </h2>
          </div>

          <div className="mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-12 px-4">
            {/* Text Section */}
            <div className="w-full lg:w-1/2 text-base md:text-lg lg:text-xl leading-relaxed">
              <p className="text-gray-800 font-medium">
                At AJK College of Nursing, we believe a strong foundation in nursing education starts with
                cutting-edge infrastructure and immersive learning environments. Our facilities are thoughtfully
                designed to foster practical knowledge, clinical skill development, and holistic student growth,
                ensuring our graduates become confident, competent, and compassionate nursing professionals.
              </p>
            </div>

            {/* Video Section */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="rounded-2xl overflow-hidden shadow-xl max-w-xl w-full">
                <video
                  src="/lab.webm"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="px-4 md:px-6 lg:px-16 py-12 md:py-16 space-y-16 md:space-y-24 ">


      <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-center !text-[#9A8C92] px-4">
        Laboratories and Classrooms
      </h2>

      {/* Laboratories Section */}
      <div className="space-y-16 md:space-y-24">
        {/* Preclinical Science Lab */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10" ref={preclinicalRef}>
          <div className="w-full md:w-1/2">
            <img
              src="/images/Preclinical Science Lab.webp"
              alt="Preclinical Science Lab"
              className="rounded-2xl w-full h-auto"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-xl md:text-2xl font-bold text-[#FB7185] mb-3 md:mb-4">
              Preclinical Science Lab
            </h3>
            <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
              Our Preclinical Science Lab is designed to strengthen students' understanding of human anatomy,
              physiology, biochemistry, and microbiology. Students gain hands-on experience using microscopes,
              identifying microorganisms, and studying anatomical specimens, bones, and human models. This lab
              bridges theoretical knowledge with practical applications in a real-world healthcare context.
            </p>
          </div>
        </div>

        {/* Nursing Foundation Lab */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10" ref={nursingFoundationRef}>
          <div className="w-full md:w-1/2">
            <img
              src="/images/Nursing Foundation.webp"
              alt="Nursing Foundation Lab"
              className="rounded-2xl w-full h-auto"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-xl md:text-2xl font-bold text-[#FB7185] mb-3 md:mb-4">
              Nursing Foundation, Adult Health & Advanced Nursing Lab
            </h3>
            <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
              Simulating a hospital environment, this lab prepares students to deliver patient-centered care. It is fully equipped with hospital beds, I.V. arms, CPR mannequins (manual and advanced), simulators, oxygen cylinders, cardiac tables, stretchers, and wheelchairs. Under expert supervision, students master essential procedures before entering clinical practice, ensuring safety and confidence.
            </p>
          </div>
        </div>

        {/* OBG Lab */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10" ref={obgRef}>
          <div className="w-full md:w-1/2">
            <img
              src="/images/Obstetrics and Gynaecology.webp"
              alt="Obstetrics and Gynaecology Lab"
              className="rounded-2xl w-full h-auto"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-xl md:text-2xl font-bold text-[#FB7185] mb-3 md:mb-4">
              Obstetrics and Gynaecology (OBG) Nursing Lab
            </h3>
            <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
              This lab is designed to strengthen students' understanding of maternal and newborn care. It provides equipment for antenatal, intranatal, and postnatal procedures, helping students bridge theoretical knowledge with hands-on training in women's health.
            </p>
          </div>
        </div>

        {/* Child Health Lab */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10" ref={childHealthRef}>
          <div className="w-full md:w-1/2">
            <img
              src="/images/Child Health Nursing Lab.webp"
              alt="Child Health Nursing Lab"
              className="rounded-2xl w-full h-auto"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-xl md:text-2xl font-bold text-[#FB7185] mb-3 md:mb-4">
              Child Health Nursing Lab
            </h3>
            <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
              Equipped with pediatric CPR and multiprocedural mannequins, baby dolls, pediatric stethoscopes, weighing scales, infantometers, and play materials, this lab helps students understand child growth and pediatric care. Students gain confidence in performing newborn and pediatric procedures with empathy and precision.
            </p>
          </div>
        </div>

        {/* Hidden Labs - Show when showAllLabs is true */}
        {showAllLabs && (
          <>
            {/* Community Health Lab */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10" ref={communityHealthRef}>
              <div className="w-full md:w-1/2">
                <img
                  src="/images/Community Health Nursing Lab.webp"
                  alt="Community Health Nursing Lab"
                  className="rounded-2xl w-full h-auto"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-xl md:text-2xl font-bold text-[#FB7185] mb-3 md:mb-4">
                  Community Health Nursing Lab
                </h3>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
                  Our Community Health Lab equips students to serve urban and rural populations. It includes community health bags, models (ideal home, village, wells), and educational aids (charts, puppets, posters). Students use these resources during school health programs, home visits, and public health campaigns to promote awareness and prevention.
                </p>
              </div>
            </div>

            {/* Computer Lab */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10" ref={computerRef}>
              <div className="w-full md:w-1/2">
                <img
                  src="/images/Computer Lab.webp"
                  alt="Computer Lab"
                  className="rounded-2xl w-full h-auto"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-xl md:text-2xl font-bold text-[#FB7185] mb-3 md:mb-4">Computer Lab</h3>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
                  Our digitally-enabled Computer Lab fosters technological competence in nursing students. With internet-enabled systems and software such as MS Office, students access online journals, digital libraries, and e-learning platforms. The lab is managed by trained instructors ensuring real-time support and technical training.
                </p>
              </div>
            </div>

            {/* Nutrition Lab */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10" ref={nutritionRef}>
              <div className="w-full md:w-1/2">
                <img
                  src="/images/Nutrition Lab.webp"
                  alt="Nutrition Lab"
                  className="rounded-2xl w-full h-auto"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-xl md:text-2xl font-bold text-[#FB7185] mb-3 md:mb-4">Nutrition Lab</h3>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
                  This well-furnished lab allows students to practice cooking therapeutic diets tailored to age, gender, and medical needs. Equipped with modern kitchen appliances (gas stoves, refrigerators, microwave), vessels, and weighing tools, students learn to calculate and prepare balanced diets for various health conditions under faculty guidance.
                </p>
              </div>
            </div>

            {/* Audio-Visual Aids Room */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10" ref={audioVisualRef}>
              <div className="w-full md:w-1/2">
                <img
                  src="/images/Audio-Visual Aids Room.webp"
                  alt="Audio-Visual Aids Room"
                  className="rounded-2xl w-full h-auto"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-xl md:text-2xl font-bold text-[#FB7185] mb-3 md:mb-4">Audio-Visual Aids Room</h3>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
                  Modern teaching meets traditional learning in our AV Aids Room. Equipped with LCD projectors, laptops, OHPs, TVs, audio systems, charts, posters, and boards, students create and deliver interactive learning materials for health education in classroom and field settings.
                </p>
              </div>
            </div>
          </>
        )}

        {/* Show More/Less Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={() => setShowAllLabs(!showAllLabs)}
            className="px-8 py-3 bg-[#FB7185] text-white font-semibold rounded-lg hover:bg-[#e55a6f] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {showAllLabs ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>

      {/* Extra Heading */}
      <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-center !text-[#9A8C92] px-4">
        Campus Infrastructure
      </h2>

      {/* Hostel Facilities */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10" ref={hostelRef}>
        <div className="w-full md:w-1/2">
          <img
            src="/images/Hostel Facilities.webp"
            alt="Hostel Facilities"
            className="rounded-2xl w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-xl md:text-2xl font-bold text-[#FB7185] mb-3 md:mb-4">
            Hostel Facilities
          </h3>
          <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
          The hostel ensures a safe, hygienic, and student-friendly environment. Each student is provided with a comfortable bed, study table, and storage. Facilities include a study hall, recreation room, visitor lounge, and a well-equipped mess. Indoor games and reading materials are also available for well-rounded campus life
          </p>
        </div>
      </div>

      {/* Sports & Recreation Facilities */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10" ref={sportsRef}>
        <div className="w-full md:w-1/2">
          <img
            src="/images/Sports.webp"
            alt="Sports & Recreation Facilities"
            className="rounded-2xl w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-xl md:text-2xl font-bold text-[#FB7185] mb-3 md:mb-4">
            Sports & Recreation Facilities
          </h3>
          <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
          Physical wellness is key to nursing resilience. The campus offers indoor and outdoor sports equipment including cricket, football, volleyball, shuttle, tennikoit, chess, carrom, and a full gymnasium. Supervised by a qualified physical director, students regularly participate in sports meets and competitions.
          </p>
        </div>
      </div>

      {/* Library & Study Center */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10" ref={libraryRef}>
        <div className="w-full md:w-1/2">
          <img
            src="/images/Auditorium.webp"
            alt="Library & Study Center"
            className="rounded-2xl w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-xl md:text-2xl font-bold text-[#FB7185] mb-3 md:mb-4">
            Auditorium
          </h3>
          <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
          Our fully air-conditioned auditorium seats over 300 attendees and serves as a venue for seminars, workshops, cultural programs, and large-scale examinations. It fosters academic exchange and extracurricular development.
          </p>
        </div>
      </div>

      {/* Cafeteria & Dining */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10" ref={cafeteriaRef}>
        <div className="w-full md:w-1/2">
          <img
            src="/images/Library.webp"
            alt="Cafeteria & Dining"
            className="rounded-2xl w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-xl md:text-2xl font-bold text-[#FB7185] mb-3 md:mb-4">
          Library & Digital Resources
          </h3>
          <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
          The central library houses over 3,500+ books, national and international nursing journals, and online resources through DELNET. Fully computerized and managed by trained staff, it supports both academic research and general reading. High-speed Wi-Fi and dedicated reading spaces enhance the learning experience
          </p>
        </div>
      </div>

      {/* Medical Center */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10" ref={medicalRef}>
        <div className="w-full md:w-1/2">
          <img
            src="/images/Smart.webp"
            alt="Medical Center"
            className="rounded-2xl w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-xl md:text-2xl font-bold text-[#FB7185] mb-3 md:mb-4">
           Smart Classrooms
          </h3>
          <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
          Each classroom is ergonomically designed and equipped with smart boards, sound systems, and Wi-Fi. Designed for interactive learning, classrooms accommodate up to 60 students and foster a focused academic atmosphere with modern teaching tools.
          </p>
        </div>
      </div>
    </div>

    
      </section>
    )
} 