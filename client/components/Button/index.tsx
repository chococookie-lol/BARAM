import { css } from '@emotion/react';
import { useGlobalTheme } from '../../styles/GlobalThemeContext';

interface ButtonProps {
  children: string;
  width: string;
  enabled?: boolean;
  onClick: () => void;
}

const style = {
  button: (
    enabled: boolean,
    backgroundColor: string = 'black',
    foregroundColor: string = 'white',
    width: string = '80px',
  ) =>
    css`
      min-width: 80px;
      width: ${width};
      height: 40px;
      border-radius: 10px;
      background-color: ${backgroundColor};
      color: ${foregroundColor};
      cursor: ${enabled ? 'pointer' : 'not-allowed'};
      ${enabled || 'pointer-events: none;'}
      user-select: none;
      line-height: 40px;
      text-align: center;

      &:active {
        filter: brightness(0.9);
      }
    `,
};

export default function Button({ children, width, onClick, enabled = true }: ButtonProps) {
  const context = useGlobalTheme();

  return (
    <div
      css={style.button(enabled, context.theme.accent1, context.theme.background, width)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
