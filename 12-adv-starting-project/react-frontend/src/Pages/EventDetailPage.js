import { useParams, Link } from 'react-router-dom';

function EventDetailPage() {
  const params = useParams();

    return(
        <>
            <h1>Event Details Page</h1>
            <p>{params.eventId}</p>
            <p><Link to=".." relative='path'>Geri Dön</Link></p>
        </>
    );
}

export default EventDetailPage;