import Image from 'next/image';

import Logo from '../../assets/logo.svg';

interface GymLogoProps {
  width: string;
  height: string;
}

export function GymLogo(props: GymLogoProps) {
  return (
    <Image 
      src={Logo} 
      alt="logo"
      width={`${props.width}px`}
      height={`${props.height}px`}
    />
  )
}