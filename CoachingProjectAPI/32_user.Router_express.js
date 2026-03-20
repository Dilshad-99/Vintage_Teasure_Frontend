import express from 'express';

//to link controller
import * as userController from './32_User.Controller_express.js';

const Router = express.Router();

Router.post("/save",userController.save);
Router.post("/login",userController.login);
Router.get("/fetch",userController.fetch);
Router.delete("/delete",userController.deleteUser);
Router.patch("/update",userController.update);

export default Router;



// import express from 'express';

// Yeh line Express.js ko import kar rahi hai. Express ek lightweight web framework hai Node.js ke liye, jo routes aur middleware handle karne mein madad karta hai.

// import UserController from './32_User.Controller_express.js';

// Yeh line UserController ko import kar rahi hai. UserController mein user-related actions define honge jaise save, login, fetch, delete, aur update. In methods ko Express routes ke through call kiya jayega.

// const router = express.Router();

// Yeh line Express ka Router create kar rahi hai. Router ka use specific routes define karne ke liye kiya jata hai, jo apne server pe different HTTP requests ko handle karte hain.

// Routes Definition:

// router.post("/save", UserController.save);

// Yeh route POST request ko handle karta hai, jo /save path pe aayegi. Jab user /save pe POST request bhejega, toh UserController.save function ko call kiya jayega.

// router.post("/login", UserController.login);

// Yeh route POST request ko handle karta hai, jo /login path pe aayegi. Jab user /login pe POST request bhejega, toh UserController.login function ko call kiya jayega.

// router.get("/fetch", UserController.fetch);

// Yeh route GET request ko handle karta hai, jo /fetch path pe aayegi. Jab user /fetch pe GET request bhejega, toh UserController.fetch function ko call kiya jayega.

// router.delete("/delete", UserController.deleteUser);

// Yeh route DELETE request ko handle karta hai, jo /delete path pe aayegi. Jab user /delete pe DELETE request bhejega, toh UserController.deleteUser function ko call kiya jayega.

// router.patch("/update", UserController.update);

// Yeh route PATCH request ko handle karta hai, jo /update path pe aayegi. Jab user /update pe PATCH request bhejega, toh UserController.update function ko call kiya jayega.

// export default router;

// Yeh router ko export kar raha hai taaki baad mein isse apne main server file mein import karke use kiya ja sake.

// import express from 'express';

// import UserController from "./32_User.Controller_express.js"

// const router=express.Router();

// router.post('/save',UserController.save);

// export default router;



// import express from 'express';

// import UserController from './32_User.Controller_express';

// const route=express.Router();

// route.post('/save',UserController.save)

// export default route;



// import express from 'express';

// import userController from './32_User.Controller_express';

// const Router=express.Router();

// Router.post('/save',userController);

// export default Router;



// import express from 'express';

// import UserController from './32_User.Controller_express';

// const Router = express.Router();

// Router.post('/save',UserController.save);
// Router.post('/login',UserController.login);
// Router.get('/fetch',UserController.fetch);
// Router.put('/update',UserController.update);
// Router.delete