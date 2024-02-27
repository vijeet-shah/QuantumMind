const AboutUsSection = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center my-20">
      <h2 className="text-2xl md:text-4xl font-semibold text-slate-800 dark:text-slate-200 mb-8">
        About QuantumMind
      </h2>

      <div className="flex flex-col items-center justify-center px-4 lg:px-48 mb-6 md:mb-12">
        <div className="w-full flex flex-col items-start text-xl md:text-2xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          <h3>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-black">
              QuantumMind{" : "}
            </span>
            Beyond Ordinary Coding
          </h3>
        </div>

        <div className="w-full text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-2">
          <h3>
            Welcome, fellow{" "}
            <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Quantum Minds!{" "}
            </span>
            Tired of being just an average engineer? Break through the barrier
            and unlock your true potential with{" "}
            <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Vijeet Shah!
              <br />
            </span>
            Vijeet believes in the quantum leap everyone can take, and he's here
            to guide you on your journey.
            <br />
            <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Join Vijeet's live course{" "}
            </span>
            and master Full Stack Development{" "}
            <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              while contributing to the open-source world.
            </span>
            <br /> Learn by doing and build real-world applications, not just
            theory.{" "}
            <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Ready to level up?
            </span>{" "}
            <br />
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-black">
              QuantumMind !
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
