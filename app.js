const express = require("express");
const path = require("path");
const xlsx = require("xlsx");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Статические файлы
app.use(express.static(path.join(__dirname, "public")));
// Маршрут для главной страницы
app.get("/", (req, res) => {
  // Чтение данных из Excel файла
  const workbook = xlsx.readFile(path.join(__dirname, "data/data.xlsx"));
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);
  // Вывод данных в консоль
  console.log(data);
  // Рендеринг страницы с передачей 
  res.render("index", { data });
});
app.listen(port, () => {
  console.log(`Cервер запушен на http://localhost: ${port}`);
});
