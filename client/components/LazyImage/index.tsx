import { css, SerializedStyles } from '@emotion/react';
import Image from 'next/image';
import { useState } from 'react';

interface LazyImageProps {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  innerCss?: SerializedStyles;
  load?: boolean;
}

const style = (loading: boolean) => css`
  * {
    transition: opacity 0.3s linear;
    opacity: ${loading ? 0 : 1};
  }
`;

export default function LazyImage({
  src,
  width,
  height,
  alt,
  innerCss,
  load = true,
}: LazyImageProps) {
  const [loading, setLoading] = useState<boolean>(load);
  return (
    <div css={style(loading)}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        css={innerCss}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
}
