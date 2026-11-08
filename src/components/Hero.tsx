import Image from "next/image";
import banner from "@/assets/banner.png";

const Hero = () => {
  return (
    <section className="container mx-auto pt-6 px-4 pb-10 md:pt-16 md:px-6 md:pb-20">
      <div className="hero bg-[#15171D] rounded-xl border border-[#252830] px-5 py-8 sm:px-8 md:px-14 md:py-12 min-h-[445px]">
        <div className="hero-content flex-col-reverse lg:flex-row-reverse w-full justify-between gap-6 md:gap-8">
          {/* Right Side Image */}
          <Image
            alt="Workout illustration"
            src={banner}
            className="w-full max-w-[220px] sm:max-w-xs lg:max-w-sm object-contain"
            width={500}
            height={300}
            priority
          />

          {/* Left Side Content */}
          <div className="w-full text-center lg:text-left">
            <p className="pb-4 md:pb-5 font-semibold text-xs sm:text-sm text-[#C2F800]">
              WORKOUT LIBRARY
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>

            <p className="py-4 md:py-6 text-sm sm:text-base text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today's plan, and watch the week's work add up.
            </p>

            <a
              href="#library"
              className="btn btn-sm sm:btn-md bg-[#C2F800] hover:bg-[#b4e600] text-black border-none font-semibold"
            >
              BROWSE WORKOUTS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
