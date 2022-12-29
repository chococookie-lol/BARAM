import { css } from '@emotion/react';
import { useGlobalTheme } from '../../styles/GlobalThemeContext';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const style = {
  button: (backgroundColor: string = 'black', foregroundColor: string = 'white') => css`
    width: 80px;
    height: 40px;
    border-radius: 10px;
    background-color: ${backgroundColor};
    color: ${foregroundColor};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;

    &:active {
      filter: brightness(0.9);
    }
  `,
};

export default function Button({ text, onClick }: ButtonProps) {
  const context = useGlobalTheme();

  return (
    <div css={style.button(context.theme.accent1, context.theme.foreground)} onClick={onClick}>
      {text}
    </div>
  );
}
