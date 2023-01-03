import { css } from '@emotion/react';
import ItemIcon from '../ItemIcon';

interface ItemStripProps {
  items: number[];
  version: string;
  width: number;
  height: number;
  padding?: number;
}

function ItemStrip({ items, version, width, height, padding = 3 }: ItemStripProps) {
  const nullItem = 7050;
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      {items.map((e, i) => (
        <div
          key={i}
          css={css`
            padding-left: ${padding}px;
          `}
        >
          <ItemIcon id={e ? e : nullItem} version={version} width={width} height={height} />
        </div>
      ))}
    </div>
  );
}

export default ItemStrip;
