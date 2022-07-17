import { useEffect, useState } from 'react';
import up from '../assets/images/up.svg';
import down from '../assets/images/down.svg';

function NumberInput({ min, max, onChange }) {
    const [number, setNumber] = useState(min || 0);

    useEffect(() => {
        onChange && onChange(number);
    }, [number, onChange]);

    return (
        <div className="input number">
            <div className="display">{number}</div>
            <div className="controls">
                <button
                    type="button"
                    className="up"
                    onClick={() => {
                        if (number !== max) {
                            setNumber((current) => current + 1);
                        }
                    }}
                >
                    <img src={up} alt="up" />
                </button>
                <button
                    type="button"
                    className="down"
                    onClick={() => {
                        if (number !== min) {
                            setNumber((current) => current - 1);
                        }
                    }}
                >
                    <img src={down} alt="down" />
                </button>
            </div>
        </div>
    );
}

export default NumberInput;
