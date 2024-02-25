interface LogoProps {
  size: number;
}

const Logo = ({ size }: LogoProps) => {
  return (
    <h1 className={`font-extrabold text-[${size}px] text-blue-700`}>
      Quantum<span className="text-black">Mind</span>{" "}
    </h1>
  );
};

export default Logo;
