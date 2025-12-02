import app from './app.js';
import dotenv from 'dotenv';
import express from "express";
dotenv.config();
app.use(express.json());
console.log(process.env.PORT)
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})