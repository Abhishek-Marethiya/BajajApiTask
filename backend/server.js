const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5050;
const corsOptions = {
    origin: "*", // Frontend's origin
    methods: "GET,POST", // Allowed HTTP methods
    credentials: true, // Optional
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// POST Endpoint
app.post("/bfhl", (req, res) => {
    const { data, file_b64 } = req.body;

    // Separate numbers and alphabets
    const numbers = [];
    const alphabets = [];
    let highestLowercase = null;

    if (data && Array.isArray(data)) {
        data.forEach((item) => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (/^[a-zA-Z]$/.test(item)) {
                alphabets.push(item);
                if (/[a-z]/.test(item)) {
                    highestLowercase = highestLowercase
                        ? (item > highestLowercase ? item : highestLowercase)
                        : item;
                }
            }
        });
    }

    // Check if prime number exists
    const isPrime = (num) => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    };
    const primeFound = numbers.some((num) => isPrime(Number(num)));

    // File validation
    let fileValid = false;
    let fileMimeType = null;
    let fileSizeKB = null;

    if (file_b64) {
        try {
            const buffer = Buffer.from(file_b64, "base64");
            fileValid = true;
            fileSizeKB = (buffer.length / 1024).toFixed(2);
            fileMimeType = "application/octet-stream"; // Default
        } catch (error) {
            fileValid = false;
        }
    }

    // Response
    res.status(200).json({
        is_success: true,
        user_id: "abhsihek",
        email: "abhsihekmarethiya@gmail.com",
        roll_number: "ROLL123",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
        is_prime_found: primeFound,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB,
    });
});

// GET Endpoint
app.get("/bfhl", (req, res) => {
    res.status(200).json({
        operation_code: 1,
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
