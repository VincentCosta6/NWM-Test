import { createContext } from "react"

export default createContext({ 
    activeCity: -1,
    activeCard: -1,

    setActiveCity: _ => {},
    setActiveCard: _ => {},
    cities: [{ name: "My location" }],

    request: {}
})