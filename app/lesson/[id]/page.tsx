import React from 'react'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Database } from '../../lib/database.types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card/card';
import { YouTubeEmbed } from "@next/third-parties/google";
import Button from '../../components/ui/button/button';
import styles from './lesson-detail.module.css';
import { extractYouTubeVideoId } from '../../lib/extractYoutubeVideoId';

// singleをつけると配列でなくオブジェクトとして取得できる
const getDetailLessonById = async (id: string, supabase: ReturnType<typeof createServerComponentClient<Database>>): Promise<Database['public']['Tables']['lesson']['Row'] | null> => {
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

const getPremiumContent = async (id: string, supabase: ReturnType<typeof createServerComponentClient<Database>>): Promise<Database['public']['Tables']['premium_content']['Row'] | null> => {
  const { data: video, error } = await supabase
    .from("premium_content")
    .select("video_url")
    .eq("id", Number(id))
    .single();

  if (error || !video) {
    return null;
  }

  return video;
}
// レッスン詳細ページ paramsを入れることで、idが取得できる
const LessonDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const supabase = createServerComponentClient<Database>({ cookies });
  // lesson, awaitを並列処理にする
  const [lesson, video] = await Promise.all([
    await getDetailLessonById(resolvedParams.id, supabase),
    await getPremiumContent(resolvedParams.id, supabase),
  ]);

  const videoId = video?.video_url ? extractYouTubeVideoId(video.video_url) : null;

  console.log(video);
  if (!lesson) {
    notFound();
  }

  return (
    <main className={`page-container ${styles['lesson-detail-container']}`}>
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
            {video?.video_url && (
              <CardDescription className={styles['lesson-description']}>
                {videoId && <YouTubeEmbed videoid={videoId} height={300} />}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className={styles['lesson-content']}>
              <p className={styles['no-content']}>
                レッスンの内容説明がまだ設定されていません。
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
