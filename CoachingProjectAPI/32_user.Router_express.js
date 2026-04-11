// import express from 'express';
// import * as userController from './32_User.Controller_express.js';

// // 32_user.Router_express.js mein
// import authMiddleware from './32_authMiddleware.js';
// const Router = express.Router();

// Router.post("/save",             userController.save);
// Router.post("/login",            userController.login);
// Router.get("/fetch",             userController.fetch);
// Router.delete("/delete",         userController.deleteUser);
// Router.patch("/update",          userController.update);
// Router.get("/verify/:email",     userController.verifyEmail);     // ✅ Email verify
// Router.post("/changepassword",   userController.changePassword);  // ✅ Bcrypt aware


// Router.get("/fetch",    authMiddleware, userController.fetch);   // protected
// Router.patch("/update", authMiddleware, userController.update);  // protected
// Router.delete("/delete",authMiddleware, userController.deleteUser); // protected


// export default Router;


import express from 'express';
import * as userController from './32_User.Controller_express.js';
import authMiddleware from './32_authMiddleware.js';

const Router = express.Router();

// public routes
Router.post("/save", userController.save);
Router.post("/login", userController.login);
Router.get("/verify/:email", userController.verifyEmail);
Router.post("/changepassword", userController.changePassword);

// protected routes
Router.get("/fetch", authMiddleware, userController.fetch);
Router.patch("/update", authMiddleware, userController.update);
Router.delete("/delete", authMiddleware, userController.deleteUser);

export default Router;