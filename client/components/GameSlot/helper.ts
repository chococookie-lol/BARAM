export function secondsToString(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}분 ${seconds % 60}초`;
}

interface TeamTotal {
  blue: TotalValue;
  red: TotalValue;
}

interface TotalValue {
  totalDeal: number;
  totalDeath: number;
  totalTank: number;
  totalHeal: number;
  totalCs: number;
  totalGold: number;
  dealAverage: number;
  dealMax: number;
  goldAverage: number;
  goldMax: number;
  deathAverage: number;
  deathMax: number;
  csAverage: number;
  csMax: number;
}

export function totalValueHelper(participants: Participant[]): TeamTotal {
  const total: TeamTotal = {
    blue: {
      totalDeal: 0,
      totalDeath: 0,
      totalTank: 0,
      totalHeal: 0,
      totalCs: 0,
      totalGold: 0,
      dealAverage: 0,
      dealMax: 0,
      goldAverage: 0,
      goldMax: 0,
      deathAverage: 0,
      deathMax: 0,
      csAverage: 0,
      csMax: 0,
    },
    red: {
      totalDeal: 0,
      totalDeath: 0,
      totalTank: 0,
      totalHeal: 0,
      totalCs: 0,
      totalGold: 0,
      dealAverage: 0,
      dealMax: 0,
      goldAverage: 0,
      goldMax: 0,
      deathAverage: 0,
      deathMax: 0,
      csAverage: 0,
      csMax: 0,
    },
  };

  participants.map((e) => {
    const team = e.teamId == 100 ? 'blue' : 'red';
    total[team].totalDeal += e.totalDamageDealtToChampions;
    total[team].dealMax = Math.max(total[team].dealMax, e.totalDamageDealtToChampions);
    total[team].totalDeath += e.deaths;
    total[team].deathMax = Math.max(total[team].deathMax, e.deaths);
    total[team].totalTank += e.contribution.damaged;

    total[team].totalHeal += e.contribution.heal;

    total[team].totalCs += e.totalMinionsKilled;
    total[team].csMax = Math.max(total[team].csMax, e.totalMinionsKilled);
    total[team].totalGold += e.goldEarned;
    total[team].goldMax = Math.max(total[team].goldMax, e.goldEarned);
  });

  const teams: ('blue' | 'red')[] = ['blue', 'red'];
  teams.map((t) => {
    total[t].deathAverage = total[t].totalDeath / 5;
    total[t].dealAverage = total[t].totalDeal / 5;
    total[t].goldAverage = total[t].totalGold / 5;
    total[t].csAverage = total[t].totalCs / 5;
  });

  return total;
}
