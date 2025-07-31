'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/Button';

gsap.registerPlugin(ScrollTrigger);

const AdmissionsPage = () => {
  // Refs for animations
  const titleRef = useRef(null);
  const collegeRef = useRef(null);
  const subText1Ref = useRef(null);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);

  // Split text into characters for animations
  const splitText = (element) => {
    if (!element) return { chars: [], words: [], lines: [] };
    
    const text = element.textContent || '';
    const words = text.split(' ');
    const chars = text.split('');
    
    element.innerHTML = '';
    
    // Create spans for each character
    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '1';
      span.style.transform = 'translateY(50px)';
      element.appendChild(span);
    });
    
    return {
      chars: Array.from(element.children),
      words: words,
      lines: [element]
    };
  };

  useEffect(() => {
    console.log('Animation useEffect triggered');
    
    if (!titleRef.current || !collegeRef.current || !subText1Ref.current || !buttonRef.current) {
      console.log('Some refs are not available');
      return;
    }

    console.log('All refs available, starting animations');

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      // Split text for animations
      const titleSplit = splitText(titleRef.current);
      const collegeSplit = splitText(collegeRef.current);

      // Title animation - fade in one by one statically
      gsap.fromTo(
        titleSplit.chars,
        { 
          opacity: 0,
          scale: 0.8
        },
        { 
          opacity: 1, 
          scale: 1,
          stagger: 0.1, 
          duration: 0.8, 
          ease: "power2.out",
          delay: 0.5
        }
      );

      // College name animation - fade in one by one statically
      gsap.fromTo(
        collegeSplit.chars,
        { 
          opacity: 0,
          scale: 0.8
        },
        { 
          opacity: 1, 
          scale: 1,
          stagger: 0.1, 
          duration: 0.8, 
          ease: "power2.out", 
          delay: 0.5
        }
      );

      // Subtext animation - slide from left to right
      gsap.set(subText1Ref.current, { x: -100, opacity: 0 });
      gsap.to(subText1Ref.current, { 
        x: 0, 
        opacity: 1,
        duration: 1.2, 
        ease: "power3.out", 
        delay: 0.5
      });
    }, 100);

    // Cleanup function
    return () => {
      gsap.killTweensOf([titleRef.current, collegeRef.current, subText1Ref.current, buttonRef.current]);
    };
  }, []);

  // Scroll animations for courses section
  useEffect(() => {
    const container = containerRef.current;
    const leftSection = leftSectionRef.current;
    const rightSection = rightSectionRef.current;

    if (!container || !leftSection || !rightSection) return;

    let stickyTrigger = null;

    // Function to handle sticky behavior
    const handleStickyBehavior = () => {
      // Kill existing trigger
      if (stickyTrigger) {
        stickyTrigger.kill();
        stickyTrigger = null;
      }

      // Create sticky animation for left section (only on desktop)
      if (window.innerWidth >= 1024) {
        stickyTrigger = ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: leftSection,
          pinSpacing: false,
        });
      }
    };

    // Initial setup
    handleStickyBehavior();

    // Add resize listener
    const handleResize = () => {
      handleStickyBehavior();
    };

    window.addEventListener('resize', handleResize);

    // Animate right section items on scroll
    const rightItems = rightSection.querySelectorAll(".scroll-item");

    rightItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => {
      if (stickyTrigger) {
        stickyTrigger.kill();
      }
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const courseSections = [
    {
      id: 1,
      title: "Biological Sciences",
      points: [
        "Human Anatomy: Understanding the structure of the human body and its systems.",
        "Human Physiology: Study of how body systems function and interact.",
        "Biochemistry: Chemical processes within living organisms.",
        "Microbiology: Study of microorganisms and their effects on health.",
        "Pathology: Understanding disease processes and their manifestations.",
        "Pharmacology: Study of drugs and their therapeutic applications.",
      ],
    },
    {
      id: 2,
      title: "Psychological Sciences",
      points: [
        "Psychology: Understanding human behavior and mental processes.",
        "Developmental Psychology: Study of human growth and development across lifespan.",
        "Health Psychology: Psychological factors affecting health and illness.",
        "Counseling Techniques: Methods for providing emotional support to patients.",
        "Communication Skills: Effective patient-nurse communication strategies.",
        "Stress Management: Techniques for managing stress in healthcare settings.",
      ],
    },
    {
      id: 3,
      title: "Nursing Sciences",
      points: [
        "Nursing Foundation: Building a solid base in nursing principles and practices.",
        "Adult Health Nursing: Focusing on the care of adult patients.",
        "Pediatric Nursing: Specializing in the care of infants, children, and adolescents.",
        "Mental Health Nursing: Addressing the mental health needs of patients.",
        "Community Health Nursing: Providing healthcare in community settings.",
        "Obstetrics and Gynecological Nursing: Focusing on women's reproductive health.",
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        className="w-full flex items-center justify-center min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] px-4 py-8 lg:py-20"
        style={{
          backgroundImage: "url('/images/bg.webp')",
    backgroundSize: "60%",
    backgroundPosition: "center 1%",
    backgroundRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    
        }}
      >
        {/* Fade overlay for soft edges around the entire image */}
        <div className="z-10 flex flex-col items-center justify-center w-full max-w-6xl text-center">
          {/* Main Title - Responsive font sizes and margin */}
          <h1 className="text-black 
                         text-[30px] sm:text-4xl md:text-5xl lg:text-[70px] xl:text-[85px] 
                         font-normal leading-tight mb-2 sm:mb-4 lg:mb-6" 
              ref={titleRef}>
            Your Nursing Career Starts Here
          </h1>
          {/* College Name - Responsive font sizes and margin (no more negative margins!) */}
          <h2 className="text-[#FB7185] 
                         text-[28px] sm:text-4xl md:text-5xl lg:text-[70px] xl:text-[85px] 
                         font-normal leading-tight mt-0 mb-6 sm:mb-8 md:mb-10" 
              ref={collegeRef}>
            AJK College of Nursing
          </h2>
          {/* Subtext - Responsive text size and padding */}
          <div className="text-[#333333] text-xs sm:text-sm md:text-base font-extralight tracking-[0%] opacity-100 
                          mt-6 sm:mt-8 md:mt-10 lg:mt-12 
                          px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20" 
               ref={subText1Ref}>
            <div className="mb-2">
              Trusted for 20+ Years • Govt. Approved Courses • Modern Campus !! Secure Your
            </div>
            <div>
              Seat in 2025 Batch - Admission in Progress!
            </div>
          </div>
          {/* Button - Responsive top margin */}
          <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12" ref={buttonRef}>
            <Button type="button" />
          </div>
        </div>
        
      </section>

      {/* About Nursing Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 sm:py-8 md:py-10 lg:py-12">
        <div
          className="w-full rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[2rem] p-6 sm:p-8 md:p-10 lg:p-10 shadow-inner"
          style={{
            background: `linear-gradient(135deg, #fff7fa 0%, #fff7fa 40%, #ffc3dd 100%)`,
            boxShadow: "inset 0 4px 12px rgba(255, 195, 221, 0.35), inset 0 -4px 12px rgba(255, 195, 221, 0.3)",
          }}
        >
          <h2 className="text-[#FF6B95] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-tight mb-4 sm:mb-6 md:mb-8">
            About the Nursing Profession
          </h2>
                       <p className="text-[#555] text-sm sm:text-base md:text-[16px] font-light leading-relaxed">
               Nursing has a profound impact on people's lives and health. As medical technology evolves, it continues to
               transform the nursing profession and the <br />healthcare system.<br/> Today, nurses bring knowledge, leadership, and vital expertise to expanding roles that offer increased
               participation, responsibility, and rewards. <br/>Nursing duties are manifold and cover a wide range of functions and responsibilities that vary with the
               level of qualification and the working <br/>environment.
             </p>
        </div>
      </section>

      {/* B.Sc. Nursing Program Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 sm:py-8 md:py-10 lg:py-12">
        <div
          className="w-full rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[2rem] p-6 sm:p-8 md:p-10 lg:p-12 shadow-inner text-right"
          style={{
            background: `linear-gradient(135deg, #ffc3dd 0%, #ffc3dd  0%, #fff7fa 60%)`,
            boxShadow: "inset 0 4px 12px rgba(255, 195, 221, 0.35), inset 0 -4px 12px rgba(255, 195, 221, 0.3)",
          }}
        >
          <h2 className="text-[#2F0014] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem]  mb-4 sm:mb-6 md:mb-8 leading-tight">
            B.Sc. Nursing Program
          </h2>
                       <p className="text-[#555] text-sm sm:text-base md:text-[16px] pb-[40px] font-light leading-relaxed">
               B.Sc. Nursing or Bachelor of Science in Nursing is a comprehensive 4-year undergraduate course designed to
               equip students with both theoretical knowledge and practical skills essential for the nursing profession. The program includes eight semesters of coursework and a six-month internship, ensuring a well-rounded
               education in nursing concepts.
             </p>
        </div>
      </section>

      {/* Courses of Study Section */}
      <section 
        className="w-full relative py-6 sm:py-8 md:py-10 lg:py-12 "
        style={{
          backgroundImage: "url('/images/normal.svg')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          opacity: 1
        }}
      >
        {/* Overlay for better text readability */}
        <div className=" absolute inset-0 bg-white/20 h-[500px] "></div>
        
        <div ref={containerRef} className="relative z-10 w-full flex flex-col ">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 h-[500px] ">
            <div className="flex flex-col md:flex-row">
              {/* Left Section - Full width on mobile, 50% on desktop */}
              <div ref={leftSectionRef} className="w-full lg:w-1/2 lg:sticky lg:top-20 lg:h-[500px] ">
                <div className="space-y-4 sm:space-y-6 sm:flex-col">
                  <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-[84px] font-normal text-[#9A8C92] leading-tight text-center lg:text-left">
                    Courses of Study <br/>in B.Sc. Nursing
                  
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 font-extralight leading-relaxed max-w-lg">
                    The B.Sc. Nursing program at AJK College offers an extensive curriculum designed to equip students with a strong foundation in various sciences and nursing disciplines. Throughout their undergraduate program, students engage in learning subjects across Biological, Psychological, and Nursing sciences.
                  </p>
                </div>
              </div>

              {/* Right Section - Full width on mobile, 50% on desktop */}
              <div ref={rightSectionRef} className="w-full lg:w-1/2 lg:py-20 h-[500px] sm:overflow-scroll scrollbar-hide sm:flex-col">
                <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
                  {courseSections.map((section) => (
                    <div key={section.id} className="">
                      {/* Section Header */}
                      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
                        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-pink-400 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xs sm:text-sm md:text-base">{section.id}</span>
                        </div>
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">{section.title}</h2>
                      </div>

                      {/* Points List */}
                      <div className="space-y-2 sm:space-y-3 ml-6 sm:ml-8 md:ml-10 lg:ml-14">
                        {section.points.map((point, index) => (
                          <div key={index} className="flex items-start gap-2 sm:gap-3">
                            <div className="flex-shrink-0 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-pink-400 rounded-full mt-1.5 sm:mt-2 md:mt-2.5"></div>
                            <p className="text-[#2F0014C9] leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full pb-20 sm:pb-30 px-4 sm:px-6 smmd:px-8 lg:px-12 xl:px-16 2xl:px-20 py-20 sm:py-30 mt-[600px] md:mt-[0px] ">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[40px] font-normal text-[#2F0014C9] mb-6 sm:mb-8 md:mb-10 text-center tracking-0">
          Admission Criteria for B.Sc. Nursing at AJK College
        </h1>
        <div className="w-full flex items-center justify-center">
          <div className="w-full grid gap-2 sm:gap-3 md:gap-4 p-1 sm:p-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-auto sm:grid-rows-3 md:grid-rows-3">
          
            {/* Slot 1: Main Title - Full width on mobile, col-span-1 on larger screens */}
            <div className="col-span-1 sm:col-span-1 row-span-1 bg-[#fff0f6] rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl flex p-3 sm:p-4 md:p-6 lg:p-8 pt-4 sm:pt-6 md:pt-8 lg:pt-10 shadow-lg">
              <div className="p-2 sm:p-3 md:p-4">
                <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] !text-[#FB7185] mb-2 sm:mb-3 tracking-0">
                  Admission Criteria for<br/> B.Sc. Nursing at AJK<br/> College
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#5B5B5B] font-light leading-tight tracking-0">
                  Aspire to be a centre of excellence in nursing education and prepare nurses who will be an epitome of nursing, providing holistic care at various health care setting universally
                </p>
              </div>
            </div>
          
            {/* Slot 2: Educational Qualification - Full width on mobile, col-span-2 on larger screens */}
            <div className="col-span-1 sm:col-span-2 row-span-1 bg-[#fff0f6] rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl flex p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg">
              <div className="p-2 sm:p-3 md:p-4">
                <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] !text-[#FB7185] mb-2 sm:mb-3 tracking-0">
                  Educational Qualification
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#5B5B5B] font-light">
                  Candidates must have passed 12th (10+2) in Science with at least 50% aggregate in Physics, Chemistry, and Biology, and must have passed English. Candidates from State Open Schools and NIOS with Science and English are also eligible.
                </p>
              </div>
            </div>
          
            {/* Slot 3: Reserved Quota - Full width on mobile, col-span-1 row-span-2 on larger screens */}
            <div className="col-span-1 sm:col-span-1 row-span-1 sm:row-span-2 bg-[#fff0f6] rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg">
              <div className="p-2 sm:p-3 md:p-4">
                <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] !text-[#FB7185] mb-2 sm:mb-3 tracking-0">
                  Reserved Quota
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#5B5B5B] font-light leading-tight tracking-0">
                  For SC/ST/OBC candidates, the required marks in the three core subjects are 40%. Special consideration is given to candidates from reserved categories as per government guidelines.
                </p>
              </div>
            </div>
          
            {/* Slot 4: Medical Fitness - Full width on mobile */}
            <div className="col-span-1 row-span-1 bg-[#fff0f6] rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg">
              <div className="p-2 sm:p-3 md:p-4">
                <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] !text-[#FB7185] mb-2 sm:mb-3 tracking-0">
                  Medical Fitness
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#5B5B5B] font-light leading-tight tracking-0">
                  Candidates must be medically fit and pass the medical examination conducted by the college.
                </p>
              </div>
            </div>
          
            {/* Slot 5: Marital Status - Full width on mobile */}
            <div className="col-span-1 row-span-1 bg-[#fff0f6] rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg">
              <div className="p-2 sm:p-3 md:p-4">
                <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] !text-[#FB7185] mb-2 sm:mb-3 tracking-0">
                  Marital Status
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#5B5B5B] font-light leading-tight tracking-0">
                  Married candidates are eligible for admission.
                </p>
              </div>
            </div>
          
            {/* Slot 6: Foreign Nationals - Full width on mobile, col-span-1 row-span-2 on larger screens */}
            <div className="col-span-1 sm:col-span-1 row-span-1 sm:row-span-2 bg-[#fff0f6] rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg">
              <div className="p-2 sm:p-3 md:p-4">
                <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] !text-[#FB7185] mb-2 sm:mb-3 tracking-0">
                  Foreign Nationals
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#5B5B5B] font-light leading-tight tracking-0">
                  The equivalency of the entry qualification (12th standard) should be obtained from the Association of Indian Universities, New Delhi.
                </p>
              </div>
            </div>
          
            {/* Slot 7: Admission Timing - Full width on mobile, col-span-2 on larger screens */}
            <div className="col-span-1 sm:col-span-2 row-span-1 bg-[#fff0f6] rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg">
              <div className="p-2 sm:p-3 md:p-4">
                <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] !text-[#FB7185] mb-2 sm:mb-3 tracking-0">
                  Admission Timing
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#5B5B5B] font-light leading-tight tracking-0">
                  Admissions are conducted once a year. Applications typically open in March and close in May.
                </p>
              </div>
            </div>
          
            {/* Slot 8: Management Quota - Full width on mobile */}
            <div className="col-span-1 row-span-1 bg-[#fff0f6] rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg">
              <div className="p-2 sm:p-3 md:p-4">
                <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] !text-[#FB7185] mb-2 sm:mb-3 tracking-0">
                  Management Quota
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#5B5B5B] font-light leading-tight tracking-0">
                  Selection for management quota candidates is based on the merit list issued by the All India Recognised Nursing Schools and Colleges Association, Karur, Tamil Nadu.
                </p>
              </div>
            </div>
          
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdmissionsPage;