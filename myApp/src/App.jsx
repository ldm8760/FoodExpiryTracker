import { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";

import "./App.css";

function App() {
    const [items, setItems] = useState([]);
    const [id, setId] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [itemname, setItemname] = useState("");
    const [date, setDate] = useState(null);

    // Fetch data from server
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/Items");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                setItems(result);
                setId(result.length + 1);
            } catch (error) {
                console.error("Error sending data:", error);
            }
        }
        fetchData();
    }, []);

    // Basic dropdown for seperation of responsibility
    function CategoryDropdown() {
        return (
            <>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">--Select--</option>
                    <option value="Poultry">Poultry</option>
                    <option value="Meat">Meat</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Fruit">Fruit</option>
                    <option value="Vegetables">Vegetables</option>
                </select>
            </>
        );
    }

    // Add item functionality
    function addItem() {
        const formattedDate =
            date instanceof Date ? date.toISOString().slice(0, 10) : date;

        const newEntry = {
            itemid: id,
            category: selectedCategory,
            itemname: itemname,
            expdate: formattedDate,
        };
        setItems([...items, newEntry]);
        fetch("api/Items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEntry),
        });
        setId(id + 1);
        resetInputs();
    }

    function resetInputs() {
        setSelectedCategory("");
        setItemname("");
        setDate(null);
    }

    return (
        <main>
            <h1>Expiration Tracker</h1>
            <div className="input-box">
                <div className="input-group">
                    <button onClick={addItem}>Add Item</button>
                </div>
                <div className="input-group">
                    <CategoryDropdown />
                </div>
                <div className="input-group">
                    <InputText
                        id="itemname"
                        placeholder="Item Name"
                        value={itemname}
                        onChange={(e) => setItemname(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <Calendar
                        value={date}
                        onChange={(e) => setDate(e.value)}
                        touchUI
                    />
                </div>
            </div>

            <div>
                {items.map((item) => (
                    <p key={item.itemid}>
                        {item.category} {item.itemname}{" "}
                        {item.expdate instanceof Date
                            ? item.expdate.toLocaleDateString()
                            : item.expdate}
                    </p>
                ))}
            </div>
        </main>
    );
}

export default App;
