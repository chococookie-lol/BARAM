export function getUsersFromLocalStorage(): SavedUser[] {
  try {
    const savedUsers: SavedUser[] = JSON.parse(window.localStorage.getItem('savedUser') ?? '[]');
    return savedUsers;
  } catch (e) {
    console.error('저장된 유저를 가져오는데 실패했습니다.');
  }
  return [];
}

export function setUsersToLocalStorage(users: SavedUser[]) {
  try {
    window.localStorage.setItem('savedUser', JSON.stringify(users));
  } catch (e) {
    console.error('유저를 저장하는데 실패했습니다.');
  }
  return [];
}
