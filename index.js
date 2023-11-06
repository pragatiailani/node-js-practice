const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Home Page");
});

// APIs

app.get("/users", (req, res) => {
    html = users
        .map((user) => {
            return `<li>${user.first_name}</li>`;
        })
        .join("");
    res.send(`<ul>${html}</ul>`);
});

app.get("/api/users", (req, res) => {
    return res.json(users);
});

app.post("/api/users", (req, res) => {
    body = req.body;
    const lastUser = users.slice(-1)[0];
    body.id = lastUser ? lastUser.id + 1 : 1;
    users.push(body);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.status(201).json({ id: body.id });
    });
});

app.route("/api/user/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if (!user) return res.status(404).json({ error: "user not found" });
        return res.json(user);
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const filteredUsers = users.filter((user) => user.id !== id);
        users.length = 0;
        users.push(...filteredUsers);
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            return res.json({ status: "user removed" });
        });
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const body = req.body;
        const updatedUsers = users.map((user) => {
            if (user.id === id) {
                user.first_name = body.first_name;
                user.last_name = body.last_name;
                user.email = body.email;
                user.gender = body.gender;
                user.job = body.job;
                console.log(user);
            }
            return user;
        });
        fs.writeFile(
            "./MOCK_DATA.json",
            JSON.stringify(updatedUsers),
            (err, data) => {
                return res.json({ status: "user updated" });
            }
        );
    });

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`HEY! We are on ${PORT}`);
});
