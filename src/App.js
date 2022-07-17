import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Game from './routes/Game';
import Menu from './routes/Menu';
import Credits from './routes/Credits';
import './assets/scss/index.scss';

function App() {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/game" element={<Game />} />
                <Route path="/credits" element={<Credits />} />
            </Routes>
        </MemoryRouter>
    );
}

export default App;
