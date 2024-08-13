import React,  {useEffect} from 'react'

function NotFound({ showErrorMsg, setShowErrorMsg}) {
    useEffect(() => {
        if (showErrorMsg) {
            const timer = setTimeout(() => {
                setShowErrorMsg(false)
            }, 2000)
        
            return () => clearTimeout(timer)
        }
    }, [showErrorMsg, setShowErrorMsg])

    return (
        <p className={`mt-2 text-red-500 font-bold transition-all duration-300 ${showErrorMsg ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'}`}>
            Location Not Found
        </p>
    )
}

export default NotFound
