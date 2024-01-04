'use client'
import {Provider} from 'react-redux'    
import {   store } from './store'
import React, { useEffect } from 'react'

export function Providers({children}:{children:React.ReactNode}){
    
    return (
        <Provider store={store} key='3'>
            {children}
        </Provider>
    )

}
