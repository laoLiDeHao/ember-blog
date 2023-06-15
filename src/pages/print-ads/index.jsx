import { Suspense } from "react";

import styles from "./styles.module.css";
import CaseFoodTable from "../../projects/print-ads/case-foodtable/case-foodtable";
export default function PrintAds() {
  return (
    <div className={styles.main}>
      <Suspense fallback={<h1>Loading</h1>}>
        <CaseFoodTable />
      </Suspense>
    </div>
  );
}
