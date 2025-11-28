import { Link } from 'react-router-dom';

const EVENT = [
  
];

function EventPage() {
  return (
    <>
      <h1>Event Page</h1>
      <ul>
        {EVENT.map((event) => (
          <li >
            <Link>{}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventPage;
