"use client"
import React, { createContext, useState } from "react";

const userInfoContext = createContext();

const UserInfoProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(
        {
            id: "melly",
        }
    );

    return (
        <userInfoContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </userInfoContext.Provider>
    );
};

export default UserInfoProvider;
export const UserInfoContext = userInfoContext;