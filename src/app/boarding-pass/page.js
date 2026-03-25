import dynamic from "next/dynamic";
const BoardingPassIndex = dynamic(() => import("@/components/boarding"));
export default function Page() {
  return (
    <main>
      <BoardingPassIndex />
    </main>
  );
}
