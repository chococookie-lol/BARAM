import Image from 'next/image';
import { style } from './style';

interface RuneIconProps {
  name: string;
  category?: 'Domination' | 'Inspiration' | 'Precision' | 'Resolve' | 'Sorcery' | undefined;
  width: number;
  height: number;
}

function RuneIcon({ name, category = undefined, width, height }: RuneIconProps) {
  console.log(category);
  const padding = category ? 0 : 20;
  const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/';
  const src = category ? `${baseUrl}${category}/${name}/${name}.png` : `${baseUrl}${name}.png`;
  const type = category ? 'primary' : 'secondary';
  return (
    <div css={style[type](width, height)}>
      <Image src={src} width={width - padding} height={height - padding} alt={name} />
    </div>
  );
}

export default RuneIcon;
