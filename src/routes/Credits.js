import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import pkg from '../../package.json';

function Credits() {
    useEffect(() => {
        let start;
        let scroll;

        window.scroll(0, 0);

        start = setTimeout(() => {
            scroll = setInterval(() => {
                window.scroll(0, window.scrollY + 1);
            }, 1);
        }, 1000);

        return () => {
            clearTimeout(start);
            clearInterval(scroll);
        };
    }, []);

    return (
        <div className="credits">
            <Link to="/" className="close" />
            <section>
                MADE FOR
                <span>GMTK Game Jam 2022</span>
            </section>
            <section>
                BASED ON THE THEME
                <span>Roll of the Dice</span>
            </section>
            <section>
                PROGRAMMING
                <span>C1200</span>
            </section>
            <section>
                SOUND EFFECTS
                <span>qubodup on Freesound</span>
            </section>
            <section>
                IMAGES
                <span>Wikimedia Commons</span>
                <span>FontAwesome</span>
            </section>
            <section>
                NPM PACKAGES
                {Object.keys({
                    ...pkg.dependencies,
                    ...pkg.devDependencies,
                }).map((name) => (
                    <span>{name}</span>
                ))}
            </section>
            <section>
                SPECIAL THANKS TO
                <span>You</span>
            </section>
            <section>
                A<span>C1200 Games and Ultimate Media game</span>
            </section>
            <section>
                Copyright &copy; Ultimate Media {new Date().getFullYear()}
                <span>Licensed under the MIT Licence</span>
                <span>Code available at git.c1200.cf/DiceDecidesFate</span>
            </section>
        </div>
    );
}

export default Credits;
