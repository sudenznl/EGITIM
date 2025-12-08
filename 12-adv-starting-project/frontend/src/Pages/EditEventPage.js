import { useRouteLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

function EditEventPage() {
  const data = useRouteLoaderData();

  return <EventForm event={data.event} />;
}

export default EditEventPage;
