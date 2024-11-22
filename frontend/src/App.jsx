import React, { useState } from "react";
import './App.css';

const App = () => {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState([]);
    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(input);
            const response = await fetch("https://bajaj-api-task-ten.vercel.app/bfhl
", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parsedInput),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch from server");
            }

            const data = await response.json();
            setResponse(data);
            setError("");
        } catch (err) {
            setError("Invalid JSON or server error.");
        }
    };

    const renderResponse = () => {
        if (!response) return null;
        let filteredData = {};
        if (filter.includes("Alphabets")) filteredData.alphabets = response.alphabets;
        if (filter.includes("Numbers")) filteredData.numbers = response.numbers;
        if (filter.includes("Highest Lowercase Alphabet"))
            filteredData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        return (
            <div className="api-response">
                <h3>Filtered Response:</h3>
                <pre>{JSON.stringify(filteredData, null, 2)}</pre>
            </div>
        );
    };

    return (
        <div className="app-container">
            <h1>Bajaj Finserv Challenge</h1>
            <textarea
                placeholder='Enter JSON like {"data": ["A", "1", "b", "2"]}'
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p className="error-message">{error}</p>}

            {response && (
                <>
                    <div className="api-response">
                        <h3>API Response:</h3>
                        <pre>{JSON.stringify(response, null, 2)}</pre>
                    </div>
                    <div className="filter-options">
                        <label>
                            <input
                                type="checkbox"
                                value="Alphabets"
                                onChange={(e) =>
                                    setFilter((prev) =>
                                        e.target.checked
                                            ? [...prev, e.target.value]
                                            : prev.filter((f) => f !== e.target.value)
                                    )
                                }
                            />
                            Alphabets
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Numbers"
                                onChange={(e) =>
                                    setFilter((prev) =>
                                        e.target.checked
                                            ? [...prev, e.target.value]
                                            : prev.filter((f) => f !== e.target.value)
                                    )
                                }
                            />
                            Numbers
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Highest Lowercase Alphabet"
                                onChange={(e) =>
                                    setFilter((prev) =>
                                        e.target.checked
                                            ? [...prev, e.target.value]
                                            : prev.filter((f) => f !== e.target.value)
                                    )
                                }
                            />
                            Highest Lowercase Alphabet
                        </label>
                    </div>
                    {renderResponse()}
                </>
            )}
        </div>
    );
};

export default App;
