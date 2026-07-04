// Server Component（"use client" がない）
export default async function ServerSamplePage() {
  // 仮のAPI（JSONPlaceholder）
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await res.json();

  return (
    <div>
      <h1>Server Component Sample</h1>
      <p>タイトル: {data.title}</p>
      <p>本文: {data.body}</p>
    </div>
  );
}
