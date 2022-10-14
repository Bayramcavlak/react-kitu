const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  methods: ["POST", "GET", "PATCH", "DELETE"],
  allowedHeaders: [
    "Content-Type: application/json",
    // "Authorization": "Bearer <token>",
    // "Access-Control-Allow-Headers: Authorization",
  ],
};
app.use(cors(corsOptions));

app.get("/", (req, resp) => {
  return resp.send("Welcome to home page");
});

app.get("/api/priority", (req, res) => {
  const data = {
    priority: [
      {
        id: 1,
        name: "Urgent",
        color: "red",
      },
      {
        id: 2,
        name: "Important",
        color: "orange",
      },
      {
        id: 3,
        name: "Trivial",
        color: "blue",
      },
    ],
  };
  res.json(data);
});
app.get("/api/jobs", (req, res) => {
  const data = {
    jobs: [
      {
        id: 1,
        name: "Jim Collins yazarına ait İyi den Mükemmele kitabını oku",
        priority: 3,
      },
      {
        id: 2,
        name: "Netflix üzerinden The Social Dilemma filmi izle",
        priority: 2,
      },
      {
        id: 3,
        name: "Denize gitmek için gerekli hazırlığı yap",
        priority: 1,
      },
      {
        id: 4,
        name: "Bisiklitinin tekerini kontrol ettir",
        priority: 1,
      },
      {
        id: 5,
        name: "Akşam sahil yürüşü yap",
        priority: 2,
      },
    ],
  };
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
