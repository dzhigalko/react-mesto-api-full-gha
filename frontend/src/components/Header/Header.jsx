import logo from "../../images/logo.svg"

export default function Header({ menu }) {
    return (
        <header className="header">
            <img
                className="header__logo"
                src={logo}
                alt="Логотип Место"
            />
            { menu && <div className="header__info">
              { menu.map((component, i) => <div key={i}>{component}</div>) }
            </div> }
        </header>
    )
}