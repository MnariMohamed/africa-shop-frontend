import React, {useEffect} from 'react'
import type {NextPage} from 'next'
import dynamic from 'next/dynamic'
import Test from "../components/test";

const Home = () => {
    console.log('hey');
    
    return (
        <div>
            <Test />
        </div>
    )
}

export default Home