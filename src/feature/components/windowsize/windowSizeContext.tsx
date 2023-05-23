import React, { useContext } from 'react';
import { getWindowClass } from './windowTypes';
import type { WindowClass } from './windowTypes';
import { useWindowDimensions } from 'react-native';

const WindowClassContext = React.createContext<any>(null)

export const useWindowClass = () => useContext<WindowClass>(WindowClassContext)
export const useWindowHeightClass = () => useWindowClass().height
export const useWindowWidthClass = () => useWindowClass().width

type WindowClassProviderProps = {
    children?: React.ReactNode
}

export const WindowClassProvider = ({ children }: WindowClassProviderProps) => {
    const dimensions = useWindowDimensions()
    const windowClass = getWindowClass({
        height: dimensions.height,
        width: dimensions.width,
    })

    return (
        <WindowClassContext.Provider value={windowClass}>
            {children}
        </WindowClassContext.Provider>
    )
}