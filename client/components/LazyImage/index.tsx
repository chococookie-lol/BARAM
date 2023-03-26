import { SerializedStyles } from '@emotion/react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  innerCss?: SerializedStyles;
}

export default function LazyImage({ src, width, height, alt, innerCss }: LazyImageProps) {
  return (
    <div>
      <Image src={src} width={width} height={height} alt={alt} css={innerCss} />
    </div>
  );
}
