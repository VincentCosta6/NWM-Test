import { createContext } from "react"

// These are mostly here for intellisense's autocomplete, they do act as default values but i believe it makes more sense to use useState for defaults
export default createContext({ 
    activeCity: -1,
    activeCard: -1,

    setActiveCity: _ => {},
    setActiveCard: _ => {},

    cities: [{ name: "My location" }],
    addCity: extractedData => {},
    removeCity: index => {},

    request: {}
})