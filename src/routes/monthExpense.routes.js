const multer = require("multer");
const monthExpense = require("../controllers/monthExpense.controller");

module.exports = (app) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, basedir + "/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    },
  });

  // Filter for CSV file
  const csvFilter = (req, file, cb) => {
    if (file.mimetype.includes("csv") || file.mimetype.includes("excel")) {
      cb(null, true);
    } else {
      cb(
        "Please upload only csv/xls file.The file is -->" + file.mimetype,
        false
      );
    }
  };

  const upload = multer({ storage: storage, fileFilter: csvFilter });

  app.get("/", (req, res) => {
    return res.send("Hello World-->" + basedir);
  });

  app.post("/import/mile", upload.single("file"), monthExpense.importMillenium);
  app.post( "/import/montd", upload.single("file"), monthExpense.importMontepioDebito);

  // app.get("/expenses", monthExpense.findAll);

  // app.get("/expenses/:monthId", monthExpense.findOne);
};
