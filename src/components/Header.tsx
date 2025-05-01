import '../sass/header.css';

const Header = (): JSX.Element => {

    // YEP I know that "Select Device" is not the best for H1 element but for this case its the best option
    return(
        <header className="headerContainer">
            <h1 className="headerContainer-text">
                Wybierz urządzenie
            </h1>
        </header>
    )
}

export default Header;