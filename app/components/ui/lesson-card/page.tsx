import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../card/page";
import { Lesson } from "../../../types";
import styles from "./lesson-card.module.css";

interface LessonCardProps {
  lesson: Lesson;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Link href={`/lesson/${lesson.id}`} className="block">
      <Card className={styles.lessonCard}>
        <CardHeader>
          <CardTitle className={styles.title}>
            {lesson.title}
          </CardTitle>
          <CardDescription className={styles.description}>
            {lesson.description || "レッスンの詳細を確認してください"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className={styles.content}>
            {lesson.content || "レッスンの内容がここに表示されます"}
          </p>
        </CardContent>
        <CardFooter>
          <p className="text-sm font-medium">クリックして詳細を見る →</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
