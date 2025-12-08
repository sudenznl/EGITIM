import { useRouteError } from 'react-router-dom';
import PageContent from '../components/PageContent';
import MainNavigation from '../components/MainNavigation';

function ErrorPage() {
  const error = useRouteError();

  let title = 'Bir Hata Oluştu !';
  let message = 'Bir şeyler yanlış gitti!';

  if(error.status === 500) 
  {
    message = error.data.message;
  }

  if(error.status === 404)
  {
    title = 'Bulunamadı!'
    message = 'Sayfa kaynağı bulunamadı.'
  }  

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
