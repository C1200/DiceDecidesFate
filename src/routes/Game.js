import { useCallback, useEffect, useState } from 'react';
import { Howl } from 'howler';
import { randomInt } from '../utils/random';
import Spaces from '../components/Spaces';
import Die from '../components/Die';
import Modal from '../components/Modal';
import NumberInput from '../components/NumberInput';
import whooshSrc from '../assets/sounds/whoosh.mp3';
import { Link } from 'react-router-dom';

function generateSpace() {
    const rand = randomInt(0, 1000);
    if (rand >= 0 && rand < 500) return 'trap';
    if (rand >= 501 && rand < 1000) return 'free';
    if (rand === 1000) return 'yay';
}

window.whoosh = new Howl({
    src: [whooshSrc],
});

function Game() {
    const [start, setStart] = useState(true);
    const [lost, setLost] = useState(false);
    const [rolling, setRolling] = useState(false);
    const [moveInput, setMoveInput] = useState(false);
    const [moveAmount, setMoveAmount] = useState(0);
    const [doMove, setDoMove] = useState(false);
    const [money, setMoney] = useState(0);
    const [dieValues, setDieValues] = useState([]);
    const [spaces, setSpaces] = useState([]);
    const [trapped, setTrapped] = useState(false);

    function reset() {
        setStart(true);
        setLost(false);
        setRolling(false);
        setMoveInput(false);
        setMoveAmount(0);
        setDoMove(false);
        setMoney(0);
        setDieValues([]);
        setSpaces([]);
        setTrapped(false);
    }

    const currentSpace = spaces[4];

    const push = useCallback(
        () => setSpaces((current) => [...current, generateSpace()]),
        []
    );
    const pop = useCallback(() => setSpaces((current) => current.slice(1)), []);

    if (spaces.length === 0) {
        const newSpaces = ['', '', '', '', 'start'];
        for (let i = 0; i < 5; i++) {
            newSpaces.push(generateSpace());
        }
        setSpaces(newSpaces);
    }

    useEffect(() => {
        let startTimeout;
        let rollTimeout;

        if (start) {
            setRolling(true);

            const newDieValues = [];
            for (let i = 0; i < 8; i++) {
                newDieValues.push(randomInt(1, 6));
            }
            setDieValues(newDieValues);

            rollTimeout = setTimeout(() => {
                setRolling(false);
            }, 5000);

            startTimeout = setTimeout(() => {
                setMoney(newDieValues.reduce((a, b) => a + b, 0));
                setStart(false);
                setMoveInput(true);
            }, 8000);
        }

        return () => {
            clearTimeout(startTimeout);
            clearTimeout(rollTimeout);
        };
    }, [start]);

    useEffect(() => {
        let moveTimeout;
        let rollTimeout;
        let trapTimeout;

        if (doMove) {
            moveTimeout = setTimeout(() => {
                push();
                pop();
                window.whoosh.play();
                setMoney((current) => current - 1);
                setMoveAmount((current) => current - 1);
            }, 1000);
        }

        if (moveAmount === 0) {
            setDoMove(false);

            if (currentSpace === 'trap') {
                setTrapped(true);
                setRolling(true);

                const rand = randomInt(1, 6);
                setDieValues([rand]);

                rollTimeout = setTimeout(() => {
                    setRolling(false);
                }, 5000);

                trapTimeout = setTimeout(() => {
                    if (rand === 1) setMoney((current) => current + 10);
                    if (rand === 2) setMoney((current) => current - 1);
                    if (rand === 3) setMoney((current) => current - 2);
                    if (rand === 4) setMoney((current) => current - 3);
                    if (rand === 5) setMoney((current) => current - 4);
                    if (rand === 6) setMoney(0);

                    setSpaces((current) => {
                        current[4] = 'free';
                        return current;
                    });
                    setTrapped(false);
                    setMoveInput(true);
                }, 8000);
            } else if (currentSpace === 'free') {
                setMoveInput(true);
            } else if (currentSpace === 'yay') {
                setTrapped(true);
                setRolling(true);

                const rand = randomInt(1, 6);
                setDieValues([rand]);

                rollTimeout = setTimeout(() => {
                    setRolling(false);
                }, 5000);

                trapTimeout = setTimeout(() => {
                    setMoney((current) => current + rand * 4);

                    setSpaces((current) => {
                        current[4] = 'free';
                        return current;
                    });
                    setTrapped(false);
                    setMoveInput(true);
                }, 8000);
            }
        }

        return () => {
            clearTimeout(moveTimeout);
            clearTimeout(rollTimeout);
            clearTimeout(trapTimeout);
        };
    }, [doMove, moveAmount, currentSpace, pop, push]);

    useEffect(() => {
        if (!start && !trapped && money <= 0) {
            setLost(true);
        }
    }, [money, start, trapped]);

    return (
        <>
            <Modal show={moveInput && !lost}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <h1>How far do you want to move?</h1>
                    {moveInput && !lost && (
                        <NumberInput
                            min={1}
                            max={money}
                            onChange={(value) => setMoveAmount(value)}
                        />
                    )}
                    <button
                        type="button"
                        style={{ margin: '0.67em' }}
                        onClick={() => {
                            setDoMove(true);
                            setMoveInput(false);
                        }}
                    >
                        Move
                    </button>
                </div>
            </Modal>

            <Modal show={lost}>
                <h1>Bankrupt!</h1>
                <button type="button" onClick={() => reset()}>
                    Again?
                </button>
                <Link to="/" className="btn" style={{ marginLeft: '1rem' }}>
                    Menu
                </Link>
            </Modal>

            {start && (
                <div className="dice">
                    <Die value={dieValues[0]} rolling={rolling} />
                    <Die value={dieValues[1]} rolling={rolling} />
                    <Die value={dieValues[2]} rolling={rolling} />
                    <Die value={dieValues[3]} rolling={rolling} />
                    <Die value={dieValues[4]} rolling={rolling} />
                    <Die value={dieValues[5]} rolling={rolling} />
                    <Die value={dieValues[6]} rolling={rolling} />
                    <Die value={dieValues[7]} rolling={rolling} />
                </div>
            )}

            {trapped && (
                <div className="dice">
                    <Die decidesFate value={dieValues[0]} rolling={rolling} />
                </div>
            )}

            <Spaces spaces={spaces} />
            <div className="score">
                <h1>${money}</h1>
                <p>Movement Money</p>
            </div>
        </>
    );
}

export default Game;
