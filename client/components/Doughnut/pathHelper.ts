function degreeToCoord(degree: number, radius: number, viewBoxSize: number): string {
  const x = Math.cos((degree * Math.PI) / 180);
  const y = Math.sin((degree * Math.PI) / 180);
  return `${x * radius + viewBoxSize / 2} ${y * -radius + viewBoxSize / 2}`;
}

export interface DoughnutPath {
  rotation: number;
  path: string;
}

export function generatePath(
  val: number[],
  radius: number,
  holeRadius: number,
  viewBoxSize: number,
): DoughnutPath[] {
  const sum = val.reduce((res, v) => res + v, 0);
  const paths: DoughnutPath[] = [];
  let degreeSum = 0;
  val.forEach((v) => {
    const percent = v / sum;
    const degree = percent * 360;
    const longPath = degree > 180 ? 1 : 0;
    const coords = [
      degreeToCoord(degree, radius, viewBoxSize),
      degreeToCoord(degree, holeRadius, viewBoxSize),
    ];
    paths.push({
      rotation: -degreeSum,
      path: `M ${viewBoxSize / 2 + radius} ${viewBoxSize / 2}
      A ${radius} ${radius} 0 ${longPath} 0 ${coords[0]}
      L ${coords[1]}
      A ${holeRadius} ${holeRadius} 0 ${longPath} 1 ${viewBoxSize / 2 + holeRadius} ${
        viewBoxSize / 2
      }
        `,
    });
    degreeSum += degree;
  });
  return paths;
}
