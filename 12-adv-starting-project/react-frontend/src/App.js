// Görev / Alıştırma
// 1. Beş yeni (dummy) sayfa bileşeni ekleyin (içerik basit <h1> olabilir)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Bu beş sayfa için routing ve route tanımları ekleyin
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<bir-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<bir-id>/edit => EditEventPage
// 3. Tüm sayfa bileşenlerinin üstünde <MainNavigation> bileşenini ekleyen bir root layout oluşturun
// 4. MainNavigation’a düzgün çalışan linkler ekleyin
// 5. MainNavigation’daki linklerin aktif olduğunda "active" sınıfı aldığından emin olun
// 6. EventsPage’de sahte etkinliklerden oluşan bir liste görüntüleyin
//    Her liste öğesi ilgili EventDetailPage’e bir link içermeli
// 7. EventDetailPage’de seçilen etkinliğin ID’sini görüntüleyin
// BONUS: Tüm /events... sayfa bileşenlerinin üstünde <EventNavigation> bileşenini ekleyen başka bir (nested) layout route ekleyin

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import EventPage from './Pages/EventsPage';
import EventDetailPage from './Pages/EventDetailPage';
import NewEventPage from './Pages/NewEventPage';
import EditEventPage from './Pages/EditEventPage';
import ErrorPage from './Pages/Error';
import RootLayout from './pages/Root';
 
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'event', element: <ErrorPage /> },
    ],
  }
]);

// const router = createBrowserRouter(routeDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
