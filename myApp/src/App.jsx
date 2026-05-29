import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    async function handleClick() {
        setCount(count + 1);
        try {
            const response = await fetch("/api/Items");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("Error sending data:", error);
        }
    }

    return (
        <main>
            <button onClick={handleClick}>Count: {count}</button>
        </main>
    );
}

export default App;
