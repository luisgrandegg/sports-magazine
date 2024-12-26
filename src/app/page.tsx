import styles from './page.module.css';
import BasketballHeatmap from '@/features/Heatmap/BasketballHeatmap/BasketballHeatmap';
import shotsSample from './data-samples/shots.json';
import { ShotData } from '@/Shot';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <BasketballHeatmap data={shotsSample as ShotData[]} />
      </main>
      <footer className={styles.footer}>Patata</footer>
    </div>
  );
}
