const { Router } = require("express");
const validator = require("fastest-validator");

const router = new Router();
const v = new validator();

const schema = {
  fullName: {
    type: "string",
    trim: true,
    max: 25,
    min: 3,
    messages: {
      required: "Name is  required",
      stringMax: "name must not be more than 25 char",
      stringMin: "name must not be more than 3 char",
    },
  },
  email: {
    type: "email",
    normalize: true,
    messages: {
      emailEmpty: "email is required",
      String: "check the email address",
    },
  },
  password: {
    type: "string",
    min: 4,
    max: 25,
    message: {
      required: "password is required",
      string: "check the password",
      stringMin: "password must be more than 4 char",
      stringMax: "password must be less than 25 char",
    },
  },
  confirmPassword: {
    type: "string",
    min: 4,
    max: 25,
    message: {
      required: "password repeat is required",
      string: "check the password",
      stringMin: "password repeat must be more than 4 char",
      stringMax: "password repeat must be less than 25 char",
    },
  },
};

router.get("/register", (req, res) => {
  res.render("register", { pageTitle: "register", path: "/register" });
});

router.get("/login", (req, res) => {
  res.render("login", { pageTitle: "Login", path: "/login" });
});

router.post("/register", (req, res) => {
  const validate = v.validate(req.body, schema);
  const errorArr = [];
  if (validate === true) {
    const { fullName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      errorArr.push({ message: "password is not same as repeat password" });
      return res.render("register", {
        pageTitle: "register",
        path: "/register",
        errors: errorArr,
      });
    }
    res.redirect("/users/login");
  } else {
    res.render("register", {
      pageTitle: "register",
      path: "/register",
      errors: validate,
    });
  }
});

module.exports = router;
