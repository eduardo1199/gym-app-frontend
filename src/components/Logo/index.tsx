import Logo from '../../assets/logo.svg'

interface GymLogoProps {
  width?: string
  height?: string
}

export function GymLogo(props: GymLogoProps) {
  return (
    <img
      src={Logo}
      alt="logo"
      width={`${props.width}px`}
      height={`${props.height}px`}
    />
  )
}
