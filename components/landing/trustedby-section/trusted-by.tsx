import {
  TextRevealCard,
  TextRevealCardTitle,
  TextRevealCardDescription,
} from "@/components/ui/text-reveal-card";

const TrustedBySection = () => {
  return (
    <div
      className="w-full flex flex-col gap-y-2 items-center justify-center px-4 md:px-36 lg:px-48 mt-12 scroll-mt-20"
      id="trustedby"
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
        Trusted by
      </h2>
      <div className="text-center w-full text-neutral-600 dark:text-neutral-400 text-xl md:text-2xl font-medium">
        <TextRevealCard
          text="Passionate Developers Around the Globle!"
          revealText="Join QuantumMind Community Now!"
          className="w-[100%] shadow-md hover:shadow-lg"
        ></TextRevealCard>
      </div>
    </div>
  );
};

export default TrustedBySection;
