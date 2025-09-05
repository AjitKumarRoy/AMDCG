import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src="/images/logos/orbi-logo.png" // The path to your logo from the `public` directory
      alt="ORBI Research Group Logo"
      width={100} // Set a default width
      height={40} // Set a default height
      priority // Helps load the logo faster
      className="h-auto" // Ensures the logo scales correctly
    />
  );
};

export default Logo;