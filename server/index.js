const express = require("express");
const app = express();
const sqlite = require("sqlite3").verbose();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

const DB_NAME = "housing.db";
const HTTP_PORT = 3000;

const db = new sqlite.Database(DB_NAME, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }

  db.run(
    `CREATE TABLE IF NOT EXISTS housing (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        city TEXT,
        state TEXT,
        photo TEXT,
        availableUnits INTEGER,
        wifi BOOLEAN,
        laundry BOOLEAN
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
        throw err;
      }

      const getAll = `SELECT * FROM housing`;

      db.all(getAll, [], (err, rows) => {
        if (err) {
          console.error(err.message);
          throw err;
        }

        if (rows.length > 0) {
          return;
        }

        const insert = `INSERT INTO housing (name, city, state, photo, availableUnits, wifi, laundry) VALUES (?,?,?,?,?,?,?)`;
        const dummyData = [
          [
            "The Hub",
            "Tallahassee",
            "FL",
            "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg",
            2,
            true,
            true,
          ],
          [
            "The Social",
            "Tallahassee",
            "FL",
            "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg",
            2,
            true,
            false,
          ],
          [
            "The Forum",
            "Tallahassee",
            "CA",
            "https://www.mydomaine.com/thmb/CaWdFGvTH4-h1VvG6tukpKuU2lM=/3409x0/filters:no_upscale():strip_icc()/binary-4--583f06853df78c6f6a9e0b7a.jpeg",
            2,
            false,
            false,
          ],
        ];

        dummyData.forEach((data) => {
          db.run(insert, data, (err) => {
            if (err) {
              console.error(err.message);
              throw err;
            }
          });
        });
      });
    }
  );

  console.log(`Connected to the ${DB_NAME} database.`);
});

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});

app.get("/api/housing-data", (req, res, next) => {
  db.all(`SELECT * FROM housing`, [], (err, rows) => {
    if (err) {
      res.status(404).json({
        message: "Housing data not found!",
      });

      return;
    }

    res.status(200).json({
      message: "Housing data retrieved successfully!",
      data: rows,
    });
  });
});

app.use((req, res, next) => {
  res.status(404);
});
