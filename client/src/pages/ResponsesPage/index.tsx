import styles from "./ResponsesPage.module.css";
import ResponseList from "../../components/ResponseList";

export default function ResponsesPage() {
  return (
    <div>
      <h1 className={styles.title}>Responses</h1>

      <ResponseList />
    </div>
  );
}
