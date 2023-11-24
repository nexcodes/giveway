import Navbar from "./_components/navbar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <>
        <Navbar />
        {children}
      </>
    </main>
  );
}
