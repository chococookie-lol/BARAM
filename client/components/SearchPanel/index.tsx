import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import { style } from './style';
import Star from '/assets/star.svg';
import StarFilled from '/assets/star_fill.svg';

export default function SearchPanel() {
  const { theme } = useGlobalTheme();
  const router = useRouter();
  const [users, setUsers] = useState<SavedUser[]>([]);
  const [isRecentList, setRecentList] = useState<boolean>(true);

  const handleClick = (userName: string) => {
    if (router.isReady) {
      router.push(`/summoners/${userName}`);
    }
  };

  const getUsers: () => SavedUser[] = () => {
    try {
      const savedUsers: SavedUser[] = JSON.parse(window.localStorage.getItem('savedUser') ?? '[]');
      return savedUsers;
    } catch (e) {
      console.error('저장된 유저를 가져오는데 실패했습니다.');
    }
    return [];
  };

  const deleteUser = (userName: string) => {
    try {
      const newUser = users.filter((user) => user.userName !== userName);
      setUsers(newUser);
      window.localStorage.setItem('savedUser', JSON.stringify(newUser));
    } catch (e) {
      console.error('유저를 저장하는데 실패했습니다.');
    }
  };

  const toggleStarUser = (userName: string) => {
    try {
      const newUser = users.map((user) => {
        if (user.userName === userName) user.isStarred = !user.isStarred;
        return user;
      });
      window.localStorage.setItem('savedUser', JSON.stringify(newUser));
    } catch (e) {
      console.error('유저를 저장하는데 실패했습니다.');
    }
    if (isRecentList) {
      setUsers(getUsers());
    } else {
      setUsers(getUsers().filter((user) => user.isStarred));
    }
  };

  useEffect(() => {
    if (isRecentList) {
      setUsers(getUsers());
    } else {
      setUsers(getUsers().filter((user) => user.isStarred));
    }
  }, [isRecentList]);

  return (
    <div css={style.container}>
      <div>
        <button
          css={style.button(isRecentList ? theme.background : theme.neutral, theme.foreground)}
          onClick={() => setRecentList(true)}
        >
          최근 검색
        </button>
        <button
          css={style.button(isRecentList ? theme.neutral : theme.background, theme.foreground)}
          onClick={() => setRecentList(false)}
        >
          즐겨찾기
        </button>
      </div>
      <ul css={style.ul(theme.background, theme.foreground)}>
        {users.length === 0 ? (
          <li>{isRecentList ? '최근 검색' : '즐겨찾기'} 목록이 없습니다.</li>
        ) : (
          users.map((user, idx) => (
            <li
              key={idx}
              onClick={() => {
                handleClick(user.userName);
              }}
            >
              <span>{user.userName}</span>
              <div>
                {user.isStarred ? (
                  <StarFilled
                    width={27}
                    height={27}
                    fill="#fdac09"
                    onClick={() => toggleStarUser(user.userName)}
                  />
                ) : (
                  <Star width={24} height={24} onClick={() => toggleStarUser(user.userName)} />
                )}
                <button onClick={() => deleteUser(user.userName)}>✕</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
