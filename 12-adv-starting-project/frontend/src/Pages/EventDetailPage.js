import { useParams } from 'react-router-dom';

function EventDetailPage() {
  const params = useParams(); //bu hooks sayesinde bir bileşen işlevinde çağrıldığı zaman o anda etkin olan rol parametrelerine (yani url de kodlanan değerlere) erişmemizi sağlar.

    return(
        <>
            <h1>Event Details Page</h1>
            <p>Event ID: {params.eventId}</p>
        </>
    );
}

export default EventDetailPage;