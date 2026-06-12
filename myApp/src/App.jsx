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
    const [error, setError] = useState("");

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
        if (!selectedCategory || !itemname || !date) {
            setError("Please fill in all fields.");
            return;
        }

        setError("");

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

    function deleteItem(itemid) {
        setItems(items.filter((item) => item.itemid !== itemid));
        fetch("api/Items", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemid }),
        });
    }

    function resetInputs() {
        setSelectedCategory("");
        setItemname("");
        setDate(null);
    }

    return (
        <main>
            <h1>Expiration Tracker</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="input-box">
                <div className="input-group">
                    <button className="add-btn" onClick={addItem}>
                        Add Item
                    </button>
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
                <div id="date" className="input-group">
                    <Calendar
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.value)}
                        touchUI
                        showIcon
                        dateFormat="mm-dd-y"
                    />
                </div>
            </div>

            <section className="items-list">
                {items.map((item) => (
                    <div className="item-card" key={item.itemid}>
                        <div>
                            <p className="item-category">{item.category}</p>
                            <h2>{item.itemname}</h2>
                            <p className="item-date">Expires: {item.expdate}</p>
                        </div>

                        <button
                            className="delete-btn"
                            onClick={() => deleteItem(item.itemid)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default App;
