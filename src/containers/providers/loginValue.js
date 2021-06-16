import React, { useState } from "react";

export const LoginContext = React.createContext({});

export const LoginProvider = (props) => {
    const [callValue, setCallValue] = useState({
    })

    return (
        <LoginContext.Provider value={{ callValue, setCallValue }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export const CallValue = () => React.useContext(LoginProvider)