import { css } from '@emotion/react';
import { useGlobalTheme } from '../../styles/GlobalThemeContext';
import { Theme } from '../../styles/theme';
import GameSlotRow from '../GameSlotRow';

interface GameSlotTableProps {
  win: boolean;
  teamId: 100 | 200;
  participants: Participant[];
}

const style = {
  container: (theme: Theme, teamId: 100 | 200, win: boolean) => css`
    width: 100%;
    background-color: ${win ? theme.blue4 : theme.red4};
    border-collapse: collapse;
    text-align: center;
    table-layout: fixed;
    thead {
      background-color: ${theme.neutral};
      font-size: 12px;
    }
    th {
      height: 22px;
    }
    th:nth-child(1) {
      text-align: left;
      color: ${theme.foreground};
      span {
        color: ${win ? theme.blue2 : theme.red2};
      }
      width: 22%;
    }
    th:nth-child(2) {
      width: 4.1%;
    }
    th:nth-child(3) {
      width: 6%;
    }
    th:nth-child(4) {
      width: 19%;
    }
    th:nth-child(5) {
      width: 16%;
    }
    th:nth-child(6) {
      width: 16%;
    }
    th:nth-child(7) {
      width: 16%;
    }
  `,
};

function GameSlotTable({ win, teamId, participants }: GameSlotTableProps) {
  const { theme } = useGlobalTheme();
  return (
    <table css={style.container(theme, teamId, win)}>
      <thead>
        <th>
          <span>{win ? '승리' : '패배'}</span> ({teamId === 100 ? '블루' : '레드'}팀)
        </th>
        <th>룬</th>
        <th>KDA</th>
        <th>빌드</th>
        <th>준 피해량</th>
        <th>받은 피해량</th>
        <th>딜 유형</th>
      </thead>
      <tbody>
        {participants.map((e, i) => {
          return <GameSlotRow key={i} participant={e} />;
        })}
      </tbody>
    </table>
  );
}

export default GameSlotTable;
