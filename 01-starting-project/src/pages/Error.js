import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>HATA</h1>
        <p> Sayfa bulunamadı</p>
      </main>
    </>
  );
}

export default ErrorPage;
