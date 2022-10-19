const router = require("express").Router();
const userController = require("../controllers/userController");
const employeeController = require("../controllers/employeeController");
let { User } = require("../models");

//MIDDLEWARE-AUTH
const jwt = require("jsonwebtoken");
const verifyToken = (token) => jwt.verify(token, "tomisugiarto");
let authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    let payload = verifyToken(access_token);
    if (!access_token) throw { name: "NoToken" };
    let user = await User.findByPk(payload.id);
    if (!user) throw { name: "NoUsername/Password" };
    req.user = { id: user.id, role: user.role, username: user.username };
    next();
  } catch (error) {
    if (error.name == "NoToken") {
      res.status(403).json({ message: "please login!" });
    } else if (
      error.name == "NoUsername/Password" ||
      error.name == "JsonWebTokenError"
    ) {
      res.status(400).json({ message: "login error, please re-login!" });
    } else {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }
};

//USER
router.post("/login", userController.loginHandler);
router.post("/register", userController.registerHandler);

//AUTH-APPLICATOR
router.use(authentication);

//EMPLOYEE
router.post("/employee", employeeController.addEmployee);
router.get("/employee", employeeController.showEmployees);
router.put("/employee/:id", employeeController.editEmployee);
router.delete("/employee/:id", employeeController.deleteEmployee);

//CUSTOMER


module.exports = router;
