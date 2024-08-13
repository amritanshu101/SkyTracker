import React, { useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";

function Form({setLocation}){
    const [input, setInput] = useState('')
    const inputRef = useRef(null)

    function handleInput (e) {
        e.preventDefault();
    
        if (input !== ''){
            setLocation(input)
        }

        inputRef.current.value = ''
    }
    

    return (
        <form method="get" className="flex mt-7">
            <input 
                type="text"
                placeholder="Enter a city or country"
                className="p-2 rounded-s-2xl outline-none md:w-96"
                onChange={e => setInput(e.target.value)}
                ref={inputRef}
             />

            <button 
                onClick={(e) => handleInput(e)}
                className="setted-color btn p-3 rounded-e-2xl"
            >
                <IoIosSearch />
            </button>
        </form>
    )
}

export default Form