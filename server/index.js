import express from "express";
import cors from "cors"
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(cors())

const filePath = "server/data/users.json";

/*
* Funções de I/O
* */

function ReadFile(input) {
  if (!fs.existsSync(input)) {
    console.error(`File: ${input} Not Exists`);
    return { users: [] };
  }

  const jsonData = fs.readFileSync(input, "utf-8");
  return JSON.parse(jsonData);
}

function WriteFile(input, jsonData) {
  const jsonString = JSON.stringify(jsonData, null, 2);
  fs.writeFileSync(input, jsonString, 'utf-8');
  console.log("Updated File!");
}

/*
* Funções do Servidor
* */

const jsonData = ReadFile(filePath);

app.post("/login", (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).send("ID and Password are required.");
  }

  const user = jsonData.users.find((user) => user.id === id && user.password === password);

  if (!user) {
    return res.status(401).send("Invalid ID or Password.");
  }

  res.status(200).send("Login Successful!");
});

app.post("/add-user", (req, res) => {
  const { id, name, email, password } = req.body;

  if (!id || !name || !email || !password) {
    return res.status(400).send("Please Use (ID, name, email, password)");
  }

  const userExists = jsonData.users.find(user => user.id === id);
  if (userExists) {
    return res.status(400).send("ID is existes");
  }

  const newUser = { id, name, email, password };
  jsonData.users.push(newUser);

  WriteFile(filePath, jsonData);

  res.status(201).send("New User Added.");
});

app.delete("/remove-user/:id", (req, res) => {
  const {id} = req.params;

  if (!id) {
    return res.status(400).send("User ID is required.");
  }

  const userIndex = jsonData.users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return res.status(404).send("User not found.");
  }

  jsonData.users.splice(userIndex, 1);

  WriteFile(filePath, jsonData);

  res.status(200).send("User deleted successfully.");
})

app.get("/users", (req, res) => {
  res.status(200).json(jsonData.users);
});

/*
* Rodar Servidor
* */

app.listen(8080, () => {
  console.log("Server: 8080");
});