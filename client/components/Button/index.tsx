import { css } from '@emotion/react';
import { useGlobalTheme } from '../../styles/GlobalThemeContext';

interface ButtonProps {
  children: string;
  width: string;
  onClick: () => void;
}

const style = {
  button: (
    backgroundColor: string = 'black',
    foregroundColor: string = 'white',
    width: string = '80px',
  ) => css`
    min-width: 80px;
    width: ${width};
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

export default function Button({ children, width, onClick }: ButtonProps) {
  const context = useGlobalTheme();

  return (
    <div
      css={style.button(context.theme.accent1, context.theme.background, width)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
