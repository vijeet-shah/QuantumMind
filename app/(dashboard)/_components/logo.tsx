import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image height={150} width={150} alt="src" src="./image.svg" />
    </div>
  );
};

export default Logo;
