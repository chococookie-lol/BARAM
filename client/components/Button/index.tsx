import { Theme, css } from '@emotion/react';

interface ButtonProps {
  children: string;
  width: string;
  enabled?: boolean;
  onClick: () => void;
}

const style = {
  button:
    (enabled: boolean, width: string = '80px') =>
    (theme: Theme) =>
      css`
        min-width: 80px;
        width: ${width};
        height: 40px;
        border-radius: 10px;
        background-color: ${theme.accent1};
        color: ${theme.background};
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
  return (
    <div css={style.button(enabled, width)} onClick={onClick}>
      {children}
    </div>
  );
}
