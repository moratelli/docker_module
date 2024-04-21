import express from "express";
import mysql from "mysql2";

const app = express();
const port = 3000;
const names = ["Pedro", "Flávio", "Cuba", "Breno", "Bruno", "Lucas", "Isabela"];

const config = {
    host: "db",
    user: "root",
    password: "root",
    database: "nodedb",
};

const addEverybodyToDb = async () => {
    names.forEach(async (name) => {
        await addPeople(name);
    });
};

const addPeople = async (name) => {
    const connection = mysql.createConnection(config);
    await new Promise((resolve, reject) => {
        connection.query(`INSERT INTO people(name) values("${name}")`, (error, results) => {
            if (error) reject(error);
            resolve(results);
        });
    });
    console.log(`${name} inserted into nodedb!`);
    connection.end();
};

const getAllPeople = async () => {
    const connection = mysql.createConnection(config);
    const res = await new Promise((resolve, reject) => {
        connection.query(`SELECT id, name FROM people`, (error, results) => {
            if (error) reject(error);
            resolve(results);
        });
    });
    console.log(`Got people table!`);
    connection.end();
    return res;
};

const createDb = async () => {
    const connection = mysql.createConnection(config);
    await new Promise((resolve, reject) => {
        connection.query(
            `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (id))`,
            (error, results) => {
                if (error) reject(error);
                resolve(results);
            }
        );
    });
    console.log(`Table people created!`);
    connection.end();
};

await createDb();
await addEverybodyToDb();

app.get("/", async (req, res) => {
    const people = await getAllPeople();
    let table = "<table>";
    table += "<tr><th>#</th><th>Name</th></tr>";

    people.forEach((person) => {
        table += `<tr><td>${person.id}</td><td>${person.name}</td></tr>`;
    });

    res.send("<h1>Full Cycle</h1>" + table);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
