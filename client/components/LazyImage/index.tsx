import { SerializedStyles } from '@emotion/react';
import Image from 'next/image';
import { DEAFULT_PLACEHOLDER_GRAY } from '../../utils/ddragon';

interface LazyImageProps {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  innerCss?: SerializedStyles;
  load?: boolean;
}

export default function LazyImage({
  src,
  width,
  height,
  alt,
  innerCss,
  load = true,
}: LazyImageProps) {
  return (
    <div>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        css={innerCss}
        placeholder="blur"
        blurDataURL={DEAFULT_PLACEHOLDER_GRAY}
        loading="lazy"
      />
    </div>
  );
}
