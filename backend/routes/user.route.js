import express from "express";
import { test, updatedUser, deleteUser, getUserListings } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/vertifyUser.js";

const router = express.Router();

router.get('/test', test);

router.post('/update/:id',verifyToken ,updatedUser);

router.delete('/delete/:id',verifyToken, deleteUser);

router.get('/listings/:id', verifyToken, getUserListings)



export default router;