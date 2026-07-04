type Props = {
  params: Promise<{ id: string }>;
};

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      <h1>ブログ詳細ページ</h1>
      <p>記事ID: {id}</p>
    </div>
  );
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return {
    title: `ブログ記事 ${id} のタイトル`,
    description: `ブログ記事 ${id} の説明文です。`,
  };
}
