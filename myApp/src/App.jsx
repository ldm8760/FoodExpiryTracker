import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
    const [items, setItems] = useState([]);

    async function viewItems() {
        try {
            const response = await fetch("/api/Items");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            setItems((prevItems) => [...prevItems, ...result]);
        } catch (error) {
            console.error("Error sending data:", error);
        }
    }

    return (
        <main>
            <button onClick={viewItems}>View Items</button>
            <div>{items[0]}</div>
            <div>{items[1]}</div>
        </main>
    );
}

export default App;
