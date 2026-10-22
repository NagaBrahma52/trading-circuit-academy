import { PageSpinner } from "@/components/ui/Spinner";

export default function LibraryLoading() {
  return (
    <main className="min-h-screen bg-circuit-bg">
      <PageSpinner label="Loading the Digital Library..." />
    </main>
  );
}
