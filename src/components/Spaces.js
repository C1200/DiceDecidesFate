import Space from './Space';

function Spaces({ spaces }) {
    return (
        <>
            {spaces.map((type, i) => (
                <Space key={i} current={i === 4} type={type} />
            ))}
        </>
    );
}

export default Spaces;
