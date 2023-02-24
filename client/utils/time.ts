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

export function secondsToString(seconds: number) {
  if (seconds > 100000) {
    const minutes = Math.floor(seconds / 60 / 1000);
    return `${minutes}분 ${seconds % 60}초`;
  }

  const minutes = Math.floor(seconds / 60);
  return `${minutes}분 ${seconds % 60}초`;
}

export function convertEpochToDate(eTime: number): string {
  const day = new Date(eTime);
  return `${day.getMonth() + 1}월 ${day.getDate()}일 ${day.getHours()}:${day
    .getMinutes()
    .toString()
    .padStart(2, '0;')}`;
}
