// import { createContext, useState } from "react";


// export let CounterContext = createContext(0);

// export function CounterContextProvider({ children }) {

//     const [count, setCount] = useState(0);
//     const [UserName, setUserName] = useState('')
    

//     return (
//         <CounterContext.Provider value={{ count, setCount , UserName, setUserName }}>
//             {children}
//         </CounterContext.Provider>
//     );
// }

// CounterContext.tsx
import { createContext, useState } from "react";

export const CounterContext = createContext<any>(0);

export function CounterProvider({ children }: { children: React.ReactNode }) {
    const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
}
