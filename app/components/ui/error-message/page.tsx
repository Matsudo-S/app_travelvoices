import { Card, CardContent } from "../card";
import styles from "./error-message.module.css";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={styles.container}>
      <Card className={styles.errorCard}>
        <CardContent className="pt-6">
          <p className={styles.errorMessage}>{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}
