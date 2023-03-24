import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface GameSlotContextProps {
  percentMax: PercentMax;
  setPercentMax: Dispatch<SetStateAction<PercentMax>>;
}

const GameSlotContext = createContext<GameSlotContextProps | null>(null);

interface GameSlotProviderProps {
  percentMax: PercentMax;
  children: React.ReactNode;
}

export default function GameSlotProvider(props: GameSlotProviderProps) {
  const [percentMax, setPercentMax] = useState<PercentMax>(props.percentMax);

  return (
    <GameSlotContext.Provider value={{ percentMax, setPercentMax }}>
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
