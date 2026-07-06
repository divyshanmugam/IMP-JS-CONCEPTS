const fs = require("fs");

fs.writeFileSync("message.txt", "Hello from Node.js", (err) => {
    if (err) throw err;
    console.log("File created and data written successfully.");
});

fs.writeFileSync("message.txt", "Hello from Angela!", (err) => {
    if (err) throw err;
    console.log("File created and data written successfully.");
});

fs.readFileSync("message.txt", (err, data) => {
    if (err) throw err;
    console.log("File content:", data.toString());
});