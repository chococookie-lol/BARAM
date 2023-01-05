import Image from 'next/image';
import { style } from './style';

interface RuneIconProps {
  name: string;
  category?: 'Domination' | 'Inspiration' | 'Precision' | 'Resolve' | 'Sorcery' | undefined;
  width: number;
  height: number;
}

function RuneIcon({ name, category = undefined, width, height }: RuneIconProps) {
  const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/';
  const src = category ? `${baseUrl}${category}/${name}/${name}.png` : `${baseUrl}${name}.png`;
  return (
    <div css={style(width, height)}>
      <Image src={src} width={width} height={height} alt={name} />
    </div>
  );
}

export default RuneIcon;
