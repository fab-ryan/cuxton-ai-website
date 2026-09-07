"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react"

export const ScrollTop = () => {
    const params = useSearchParams()
    useEffect(() => {
        const id = params.get("id");
        
        const top = document.getElementById(id || "");
        if (top) {
            top.scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
    }, [params])
    return null
}