import { useEffect, useState } from 'react';
import { randomInt } from '../utils/random';

const faces = {
    1: require('../assets/images/die1.svg').default,
    2: require('../assets/images/die2.svg').default,
    3: require('../assets/images/die3.svg').default,
    4: require('../assets/images/die4.svg').default,
    5: require('../assets/images/die5.svg').default,
    6: require('../assets/images/die6.svg').default,
};

function Die({ value, rolling }) {
    const [rollValue, setRollValue] = useState(1);

    useEffect(() => {
        let rollInterval;

        if (rolling) {
            rollInterval = setInterval(() => {
                setRollValue(randomInt(1, 6));
            }, 100);
        }

        return () => {
            clearInterval(rollInterval);
        };
    }, [rolling]);

    return <img src={rolling ? faces[rollValue] : faces[value]} alt="" />;
}

export default Die;
