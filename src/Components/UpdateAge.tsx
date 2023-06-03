
import React from 'react';
import { APIContext } from '../Context/index.tsx';
import type { APIContextType } from '../Context/types.d.ts';
import { useContext } from 'react';

export default function UpdateAge() {
    let {updateAge} = useContext(APIContext) as APIContextType;
    const update = () => {
        updateAge(20);
    }

    return <>
        <button onClick={update}>Update Age</button>
    </>
}
