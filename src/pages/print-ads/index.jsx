import { Suspense } from "react";
import CaseFoodTable from "../../projects/print-ads/case-foodtable";
import styles from "./styles.module.css";
export default function PrintAds() {
  return (
    <div className={styles.main}>
      <Suspense fallback={ <h1>Loading</h1>}>
        <CaseFoodTable />
      </Suspense>
    </div>
  );
}
