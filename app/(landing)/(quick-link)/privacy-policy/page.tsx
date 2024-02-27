import { privacyPolicyContent } from "@/components/landing/footer/privacy-policy/privacy-policy";

const PrivacyPolicyPage = () => {
  return (
    <main className="flex flex-col items-start justify-center mt-6 mb-12 px-4 md:px-36">
      <h1 className="text-3xl md:text-4xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 md:mb-6 w-full text-center md:max-w-screen-2xl mx-auto">
        Privacy Policy
      </h1>
      {privacyPolicyContent.map((item) => {
        return (
          <div
            className="my-3 text-neutral-700 dark:text-neutral-300 font-normal text-lg"
            key={item.id}
          >
            <li className="">{item.description}</li>
            <hr className="border-t border-gray-300 my-6" />
          </div>
        );
      })}
    </main>
  );
};

export default PrivacyPolicyPage;
