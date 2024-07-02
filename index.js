import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

let posts = [];

app.get("/", (req, res) => {
    res.render("index", { posts });
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", (req, res) => {
    const { title, content } = req.body;
    const newPost = {
        id: posts.length + 1,
        title,
        content
    };
    posts.push(newPost);
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    res.render("edit", { post });
});

app.post("/edit/:id", (req, res) => {
    const { title, content } = req.body;
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    posts[postIndex] = { id: parseInt(req.params.id), title, content };
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    posts = posts.filter(p => p.id !== parseInt(req.params.id));
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server started on ${port}!`);
});
