import {Link} from "react-router-dom"
// import Link from "react-router-dom"        -> this is wrong bullshit react


export default function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'> Home </Link>
                    </li>
                <li>
                    <Link to='/about'>About </Link>
                    </li>
                <li>
                    <Link to='/articles' > Articles</Link>
                    </li>
            </ul>
        </nav>
    )
}