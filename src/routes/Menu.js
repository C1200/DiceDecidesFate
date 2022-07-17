import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import logo from '../assets/images/logo.png';
import pkg from '../../package.json';

function Menu() {
    const [versionModal, setVersionModal] = useState(false);

    return (
        <div className="menu">
            <Modal show={versionModal}>
                <p>
                    {pkg.name}@{pkg.version}
                </p>
                {Object.keys(pkg.dependencies).map((dep) => (
                    <p>
                        {dep}@{pkg.dependencies[dep]}
                    </p>
                ))}
                <p>User Agent: {window.navigator.userAgent}</p>
            </Modal>

            <img src={logo} alt="Dice Decides Fate" />
            <Link to="/game" className="btn">
                Play
            </Link>
            <Link to="/credits" className="btn">
                Credits
            </Link>
            <button
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    zIndex: 1010,
                }}
                onClick={() => {
                    setVersionModal((current) => !current);
                }}
            >
                Info
            </button>
        </div>
    );
}

export default Menu;
