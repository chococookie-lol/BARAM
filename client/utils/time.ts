export function convertEpochToRelativeTime(eTime: number): string {
  const now = new Date().getTime();
  const diff = now - eTime;

  if (diff < 1000 * 60) {
    return `1분 미만 전`;
  } else if (diff < 1000 * 60 * 60) {
    return `${(diff / 1000 / 60).toFixed(0)}분 전`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    return `${(diff / 1000 / 60 / 60).toFixed(0)}시간 전`;
  }
  return `${(diff / 1000 / 60 / 60 / 24).toFixed(0)}일 전`;
}
