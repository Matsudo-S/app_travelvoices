import LessonCard from "./components/ui/lesson-card/lesson-card";
import MV from "./components/ui/mv/MV";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "./lib/database.types";

// レッスンを取得する関数
// Next.js 14+ App Routerでは、デフォルトでSSR(Server-Side Rendering)で実行される
// fetch()を使用する場合は:
// - デフォルト: 自動的にキャッシュされる（SSG（Server-Side Generation）的な動作）
// - fetch(url, {cache: 'no-store'}): SSR（毎回サーバーでレンダリング）
// - fetch(url, {next: {revalidate: 3600}}): ISR（Incremental Static Regeneration）
// cookieを使うとsupabaseではSSRになる（pnpm buildになるとわかる）
const getAllLessons = async (): Promise<Database['public']['Tables']['lesson']['Row'][]> => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: lessons } = await supabase.from("lesson").select("*");
  return lessons ?? [];
}
  
// ホームページ
export default async function Home() {

  const lessons = await getAllLessons();

  return (
    <>
      <MV />
      <main className="page-container">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </main>
    </>
  );
}
