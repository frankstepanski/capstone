import React from "react";
import NavigationBar from "../../components/NavigationBar";

const Header = () => {
    
    const [searchTerm, setSearchTerm] = useState({value:''});

    return (

        <NavigationBar setSearchTerm={setSearchTerm} />
    );
}

export default Header;