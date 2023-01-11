import GameSlotTable from '../GameSlotTable';

interface GameSlotDetailProps {
  participants: Participant[];
  teams: Team[];
}

function GameSlotDetail({ participants, teams }: GameSlotDetailProps) {
  const red: Participant[] = [];
  const blue: Participant[] = [];
  participants.forEach((e) => {
    if (e.teamId == 100) blue.push(e);
    else red.push(e);
  });
  const bluewin = teams[0].win;
  return (
    <div>
      <GameSlotTable win={bluewin} teamId={100} participants={blue} />
      <GameSlotTable win={!bluewin} teamId={200} participants={red} />
    </div>
  );
}

export default GameSlotDetail;
