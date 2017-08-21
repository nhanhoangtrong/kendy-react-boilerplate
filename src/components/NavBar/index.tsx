import * as React from 'react';
import * as styles from './style.styl';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component<any, any> {
    public render() {
        return (
            <nav className={styles.navbar}>
                <Link to="/">Index</Link>
                <Link to="/todo">TodoApp</Link>
            </nav>
        );
    }
}
