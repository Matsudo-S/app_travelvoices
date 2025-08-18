import React from 'react'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Database } from '../../lib/database.types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card/page';
import Button from '../../components/ui/button/page';
import styles from './lesson-detail.module.css';

// singleをつけると配列でなくオブジェクトとして取得できる
const getDetailLessonById = async (id: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: lesson, error } = await supabase
    .from("lesson")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error || !lesson) {
    return null;
  }

  return lesson;
}

// レッスン詳細ページ paramsを入れることで、idが取得できる
const LessonDetailPage = async ({ params }: { params: { id: string } }) => {
  const lesson = await getDetailLessonById(params.id);

  if (!lesson) {
    notFound();
  }

  return (
    <main className={styles['lesson-detail-container']}>
      <div className={styles['lesson-detail-content']}>
        <div className={styles['back-link']}>
          <Button href="/" variant="back">
            ← レッスン一覧に戻る
          </Button>
        </div>
        
        <Card className={styles['lesson-card']}>
          <CardHeader>
            <CardTitle className={styles['lesson-title']}>
              {lesson?.title}
            </CardTitle>
            {lesson?.description && (
              <CardDescription className={styles['lesson-description']}>
                {lesson.description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className={styles['lesson-content']}>
              <p className={styles['no-content']}>
                レッスンの内容がまだ設定されていません。
              </p>
            </div>
            
            <div className={styles['lesson-meta']}>
              {lesson?.created_at && (
                <p className={styles['created-date']}>
                  作成日: {new Date(lesson.created_at).toLocaleDateString('ja-JP')}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default LessonDetailPage;
