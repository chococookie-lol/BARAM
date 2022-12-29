import Image from 'next/image';
import { useGlobalTheme } from '../styles/GlobalThemeContext';
import LogoSvg from '/assets/logo.svg';

function Logo() {
  const context = useGlobalTheme();
  return <LogoSvg fill={context.theme.accent1} />;
}

export default Logo;
