import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import { style } from './style';
import Star from '/assets/star.svg';
import StarFilled from '/assets/star_fill.svg';

export default function SearchPanel() {
  const { theme } = useGlobalTheme();

  return (
    <div css={style.container}>
      <div>
        <button css={style.button(theme.background, theme.foreground)}>최근 검색</button>
        <button css={style.button(theme.neutral, theme.foreground)}>즐겨찾기</button>
      </div>
      <ul css={style.ul(theme.background, theme.foreground)}>
        <li>
          <span>dolphinlmg</span>
          <div>
            <Star width={24} height={24} />
            <button>✕</button>
          </div>
        </li>
        <li>
          <span>Dpster</span>
          <div>
            <Star width={24} height={24} />
            {/* <StarFilled width={27} height={27} fill="#fdac09" />*/}
            <button>✕</button>
          </div>
        </li>
      </ul>
    </div>
  );
}
