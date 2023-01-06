export function spellIdToName(id: number) {
  //TODO: implement this
  return 'SummonerFlash';
}

export function secondsToString(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}분 ${seconds % 60}초`;
}

export function styleToRuneCategory(
  style: number,
): 'Precision' | 'Domination' | 'Inspiration' | 'Resolve' | 'Sorcery' {
  //TODO: implement this
  return 'Precision';
}

export function perkToRuneName(perk: number) {
  //TODO: implement this
  return 'Conqueror';
}

export function styleToRuneName(style: number) {
  //TODO: implement this
  return '7203_Whimsy';
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
}

export function totalValueHelper(participants: Participant[]): TeamTotal {
  const total = {
    blue: { totalDeal: 0, totalTank: 0, totalHeal: 0, totalDeath: 0 },
    red: { totalDeal: 0, totalTank: 0, totalHeal: 0, totalDeath: 0 },
  };
  participants.map((e) => {
    if (e.teamId == 100) {
      total.blue.totalDeal += e.totalDamageDealtToChampions;
      total.blue.totalDeath += e.deaths;
      total.blue.totalTank += e.totalDamageTaken;
      total.blue.totalHeal += e.totalHealsOnTeammates;
    } else {
      total.red.totalDeal += e.totalDamageDealtToChampions;
      total.red.totalDeath += e.deaths;
      total.red.totalTank += e.totalDamageTaken;
      total.red.totalHeal += e.totalHealsOnTeammates;
    }
  });
  return total;
}
