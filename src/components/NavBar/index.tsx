import * as React from 'react';
import * as styles from './style.styl';
import Link from '../../modules/Link';

export default class NavBar extends React.Component<any, any> {
    public render() {
        return (
            <nav className={styles.navbar}>
                <Link className="abc" href="/">
                    Index
                </Link>
                <Link href="/todo">TodoApp</Link>
            </nav>
        );
    }
}
