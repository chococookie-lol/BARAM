import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface GameSlotContextProps {
  gameContribution: GameContribution;
  setGameContribution: Dispatch<SetStateAction<GameContribution>>;
}

const GameSlotContext = createContext<GameSlotContextProps | null>(null);

interface GameSlotProviderProps {
  gameContribution: GameContribution;
  children: React.ReactNode;
}

export default function GameSlotProvider(props: GameSlotProviderProps) {
  const [gameContribution, setGameContribution] = useState<GameContribution>(
    props.gameContribution,
  );

  return (
    <GameSlotContext.Provider value={{ gameContribution, setGameContribution }}>
      {props.children}
    </GameSlotContext.Provider>
  );
}

export function useGameSlot() {
  const value = useContext(GameSlotContext);

  if (value === null) {
    throw new Error(`useGameSlot must be used in GameSlotProvider`);
  }

  return value;
}
