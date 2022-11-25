const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTEAPI";
const { response } = require("express");
const { Schema } = require("mongoose");

module.exports = {
  /*. 1. Create an ApI for SignUp */
  signUp: async (req, res) => {
    try {
      // Existing User Check
      let result = await userModel.findOne({
        email: req.body.email,
        status: { $ne: "DELETE" },
      });
      if (result) {
        return res.send({
          responseCode: 409,
          responseMessage: "Email Already Exist.",
          result: [],
        });
      } else {
        let password = req.body.password;
        req.body.password = bcrypt.hashSync(password);
        let userSave = await new userModel(req.body).save();
        if (!userSave) {
          return res.send({
            responseCode: 500,
            responseMessage: "Internal Server Error.",
            result: [],
          });
        } else {
          let token = jwt.sign(
            { email: req.body.email, id: userModel._id },
            SECRET_KEY
          );
          return res.send({
            responseCode: 200,
            responseMessage: "SignUp Done Successfully !!!",
            responseResult: userSave,
            token: token,
          });
        }
      }
    } catch (error) {
      return res.send({
        responseCode: 501,
        responseMessage: "Something went wrong, Please try again",
        result: error.message,
      });
    }
  },

  /*. 1. Create an ApI for Login_ */
  login: async (req, res) => {
    try {
      let query = {
        $and: [
          { email: req.body.email },
          { status: { $ne: "DELETE" } },
          { userType: "USER" },
        ],
      };

      let userResult = await userModel.findOne(query);
      if (!userResult) {
        return res.send({
          reponseCode: 404,
          responseMessage: "User Not Found.",
          responseResult: [],
        });
      } else {
        if (req.body.email != userResult.email) {
          return res.send({
            reponseCode: 401,
            responseMessage: "Incorrect EmailId.",
          });
        } else {
          let passCheck = bcrypt.compareSync(
            req.body.password,
            userResult.password
          );
          if (passCheck == false) {
            return res.send({
              reponseCode: 401,
              responseMessage: "Incorrect password.",
            });
          } else {
            /* API for User Authentication*/
            let data = {
              userId: userResult._id,
              email: userResult.email,
            };
            let token = jwt.sign(data, "test", { expiresIn: "1h" });
            return res.send({
              reponseCode: 200,
              responseMessage: "Login Done Successfully !!!",
              responseResult: token,
            });
          }
        }
      }
    } catch (error) {
      return res.send({
        responseCode: 500,
        responseMessage: "Something went wrong, please try again!",
        responseResult: error.message,
      });
    }
  },
};
