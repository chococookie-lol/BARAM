import Pie from '../components/Doughnut';
import { useGlobalTheme } from '../styles/GlobalThemeContext';

export default function Home() {
  const context = useGlobalTheme();
  return (
    <div>
      <Pie
        val={[5551, 2322, 200]}
        title="딜 유형"
        label={['마법', '물리', '고정']}
        color={[context.theme.blue1, context.theme.red1, context.theme.background]}
      />
    </div>
  );
}
