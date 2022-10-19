const { Employee } = require("../models");

class employeeController {
  static async addEmployee(req, res) {
    try {
      const {
        firstName,
        lastname,
        phoneNumber,
        joinDate,
        salary = 100,
      } = req.body;

      let { id } = req.user;
      let UserId = id;
      const added = await Employee.create({
        UserId,
        firstName,
        lastname,
        phoneNumber,
        joinDate,
        salary,
      });
      res.status(201).json({ message: "employee added", added });
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        res.status(400).json(error.errors[0].message);
      } else if (error.name == "SequelizeDatabaseError") {
        res.status(400).json({ message: "by default type '0' at salary form" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async showEmployees(req, res) {
    try {
      const allEmployees = await Employee.findAll();
      res.status(200).json(allEmployees);
    } catch (error) {
      res.send("error");
    }
  }

  static async editEmployee(req, res) {
    try {
      const {
        firstName,
        lastname,
        phoneNumber,
        joinDate,
        salary = 100,
      } = req.body;

      let { id } = req.user;
      let UserId = id;
      let EmployeeId = req.params.id;
      const findEmployee = await Employee.findByPk(EmployeeId);
      if (!findEmployee) throw { name: "EmployeeNotFound" };
      else {
        const edited = await findEmployee.update({
          UserId,
          firstName,
          lastname,
          phoneNumber,
          joinDate,
          salary,
        });
        res
          .status(201)
          .json({ message: "data employee has been changed", edited });
      }
    } catch (error) {
      if ((error.name = "EmployeeNotFound")) {
        res.status(400).json({ message: "Employee not found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async deleteEmployee(req, res) {
    try {
      const EmployeeId = req.params.id;
      const foundEmployee = await Employee.findByPk(EmployeeId);
      if (!foundEmployee) throw { name: "EmployeeNotFound" };
      else {
        const deletedEmployee = await Employee.destroy({
          where: {
            id: EmployeeId,
          },
        });
        res
          .status(200)
          .json({ message: `employee with id ${EmployeeId} has been deleted` });
      }
    } catch (error) {
        if ((error.name = "EmployeeNotFound")) {
          res.status(400).json({ message: "Employee not found" });
        } else {
          res.status(500).json({ message: "Internal Server Error" });
        }
      }
  }
}

module.exports = employeeController;
