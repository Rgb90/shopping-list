import React from 'react'
import { FcFullTrash } from "react-icons/fc";

function IconButton() {
    return (
        <div style={{
            width: 32,
            height: 32,
            margin: "0px auto",
            backgroundColor: "rgba(255,0,0,0.2",
        }}
        className='rounded'>
            <FcFullTrash />
        </div>
    )
}

export default IconButton