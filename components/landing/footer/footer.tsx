import Link from "next/link";
import { Linkedin, TwitterIcon, Youtube, Github } from "lucide-react";
import Logo from "../logo/logo";
const Footer = () => {
  return (
    <div className="bottom-0 w-full p-4 bg-neutral-900 dark:bg-slate-900 px-6 lg:px-36 relative">
      <div className="md:max-w-screen-2xl mt-4 mb-20 mx-auto flex flex-col lg:flex-row items-start justify-between w-full">
        <Logo onFooter={false} />

        <div className="flex flex-col justify-center my-8 lg:my-0">
          <h3 className="font-semibold text-neutral-100 mb-4">Quick Links</h3>
          <Link
            href={"/terms-conditions"}
            className="hover:text-blue-500 text-neutral-200"
          >
            Terms & Conditions
          </Link>
          <Link
            href={"/privacy-policy"}
            className="hover:text-blue-500 text-neutral-200"
          >
            Privacy Policy
          </Link>
          <Link
            href={"/refund-cancellation"}
            className="hover:text-blue-500 text-neutral-200"
          >
            Refund & Cancellation
          </Link>
        </div>

        <div className="flex flex-col justify-center">
          <div>
            <h4 className="text-neutral-200 font-semibold mb-2">Follow us</h4>
            <div className="flex gap-x-2">
              <Link target="_blank" href={"https://twitter.com/vijeetshah_"}>
                <TwitterIcon className="text-white hover:text-blue-500" />
              </Link>
              <Link
                target="_blank"
                href={"https://www.linkedin.com/in/vijeet-shah/"}
              >
                <Linkedin className="text-white hover:text-blue-500" />
              </Link>
              <Link
                target="_blank"
                href={"https://www.youtube.com/@vijeetshah_"}
              >
                <Youtube className="text-white hover:text-blue-500" />
              </Link>

              <Link target="_blank" href={"https://github.com/vijeet-shah/"}>
                <Github className="text-white hover:text-blue-500" />
              </Link>
            </div>
            <p className="text-white mt-40 absolute bottom-4 right-4">
              © 2024 QuantumMind. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
