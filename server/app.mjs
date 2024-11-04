import express from "express";
import connectionPool from "./utils/db.mjs";

const app = express();
const port = 4001;
app.use(express.json());

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.get("/users", async (req, res) => {
  try {
    const result = await connectionPool.query("select * from users");
    return res.json({
      data: result.rows,
    });
  } catch (e) {
    return res.json({
      message: e.message,
    });
  }
});

app.post("/assignments",async (req,res) => {
  try{
  const newAssignment = {
    ...req.body,
  };
  console.log(newAssignment)

  await connectionPool.query(
    `insert into assignments (title, content, category)
    values ($1,$2,$3)`,
    [
      newAssignment.title,
      newAssignment.content,
      newAssignment.category,
    ]
  );
  return res.status(201).json({
    message: "Created assignment sucessfully.",
  })
} catch (e) {
  return res.status(400).json({
    message: "Server could not create assignment because there are missing data from client",
  })
}
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
