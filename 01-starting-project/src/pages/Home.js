import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <>
            <h1>Home Page</h1>
            <p>
                <Link to="/products">ürünler listesine</Link> git.
            </p>
        </>
    );
}

export default HomePage;
