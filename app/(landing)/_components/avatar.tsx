import Image from "next/image";

interface AvatarProps {
  src: string;
  verified?: boolean;
  size: number;
}

const Avatar = ({ size, verified, src }: AvatarProps) => {
  return (
    <div>
      <div className="rounded-full h-max w-max flex items-center justify-center shadow-2xl overflow-hidden border-[6px] border-white relative">
        <Image
          src={src}
          alt="pfp"
          height={size}
          width={size}
          className=""
          priority
        />
      </div>
      {verified && (
        <Image
          src={"/tick.png"}
          height={30}
          width={30}
          alt="tick"
          className="absolute bottom-[5%] right-[10%]"
        />
      )}
    </div>
  );
};

export default Avatar;
