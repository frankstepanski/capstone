import React from "react";
import NavigationBar from "../../components/NavigationBar";

const Header = ( {setResults} ) => {
    
    //const [searchTerm, setSearchTerm] = useState({value:''});

    return (

        <NavigationBar setResults = {setResults} />
    );
}

export default Header;