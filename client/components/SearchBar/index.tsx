import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from 'react';
import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import { style } from './style';
import Search from '/assets/search.svg';

interface SearchBarProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  onSearchButtonClick: () => void;
}

export default function SearchBar({ text, setText, onSearchButtonClick }: SearchBarProps) {
  const context = useGlobalTheme();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchButtonClick();
    }
  };

  return (
    <div css={style.container(context.theme.accent1)}>
      <div css={style.flex}>
        <input
          type={'text'}
          css={style.input}
          placeholder={'소환사 이름'}
          value={text}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        ></input>
        <div css={style.button(context.theme.accent1)} onClick={onSearchButtonClick}>
          <Search css={style.search} />
        </div>
      </div>
    </div>
  );
}
