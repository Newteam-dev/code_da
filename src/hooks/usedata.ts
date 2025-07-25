import { useEffect, useState } from "react"
import { api } from "../config/axios"
export const useData = <T>(route:string)=>{
    const [data,setData] = useState<T[]>([])
    const [isLoading,setLoading] = useState<boolean>(false)
    const [isError,setError] = useState<boolean>(false)
    useEffect(()=>{
        (async()=>{
            try {
                setLoading(true)
                const {data:result} = await api.get(route)
                setData(result) 
                setLoading(false)           
            } catch (error) {
                setError(true)
            }
        })()
    },[route])
    return {data,isLoading,isError}
}