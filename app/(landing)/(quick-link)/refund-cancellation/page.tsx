const RefundAndCancellationPage = () => {
  return (
    <main className="flex flex-col items-start mt-6 mb-12 px-4 md:px-36 h-[60vh] lg:h-[70vh]">
      <h1 className="text-3xl md:text-4xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 md:mb-6 w-full text-center md:max-w-screen-2xl mx-auto">
        Quantum Mind Refund/Cancellation Policy
      </h1>

      <p className="my-3 text-neutral-700 dark:text-neutral-300 font-normal text-lg">
        <span className="font-semibold">
          Thank you for choosing Quantum Mind!
        </span>{" "}
        We appreciate your support of this open-source project by Vijeet Shah.
      </p>

      <p className="my-3 text-neutral-700 dark:text-neutral-300 font-normal text-lg">
        Due to the nature of digital course content,
        <span className="font-semibold">
          {" "}
          we are currently unable to offer refunds for purchased courses.
        </span>
      </p>

      <p className="my-3 text-neutral-700 dark:text-neutral-300 font-normal text-lg">
        However, if you encounter any issues with your course access or content,
        please feel free to reach out to our support team at
        `vijeettouch@gmail.com` and we will do our best to assist you.
      </p>
    </main>
  );
};

export default RefundAndCancellationPage;
