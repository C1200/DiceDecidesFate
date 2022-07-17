function Space({ current, type }) {
    return (
        <div className={'space ' + type}>
            {current && <div className="player" />}
        </div>
    );
}

export default Space;
