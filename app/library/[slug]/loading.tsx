import { PageSpinner } from "@/components/ui/Spinner";

export default function ArticleLoading() {
  return (
    <main className="min-h-screen bg-circuit-bg">
      <PageSpinner label="Loading article..." />
    </main>
  );
}
