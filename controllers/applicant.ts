import connectionString from '../db';
import { Request, Response, NextFunction } from 'express';
import { Person, PersonLogin } from './models';
import { generateHash, generateToken, decodeToken } from '../helper';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const person: Person = {
        name: req.body.name,
        birth: req.body.birth,
        location: req.body.location,
        occupation: req.body.occupation,
        username: req.body.username,
        password: req.body.password,
        image: req.body.image
    };
    const query = 'INSERT INTO "Person" ("Name", "BirthDate", "Location", "Occupation", "Username", "Password", "Image") VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const values = [
        person.name,
        person.birth,
        person.location,
        person.occupation,
        person.username,
        generateHash(person.password),
        person.image
    ]
    const connection = await connectionString();
    try {
        const result = await connection?.query(query, values);
        if (result) {
            res.status(201).json("Person Created");
        } else {
            res.status(500).json("Person Creation Failed");
        }
    } catch (err) {
        res.status(500).json("Internal Server Error");
    } finally {
        connection?.end();
    };
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const connection = await connectionString();
    const query = 'SELECT "Person"."Id", "Person"."Username" FROM "Person" WHERE "Username" = $1 AND "Password" = $2';
    const values = [username, generateHash(password)]
    try {
        const result = await connection?.query(query, values);
        if (result?.rowCount > 0) {
            const userId = result?.rows[0]['Id'];
            const username = result?.rows[0]['Username'];
            const token = generateToken(userId, username);
            res.cookie('auth', token, { httpOnly: true });
            res.status(200).json({ message: 'Login Successful' })
        } else {
            res.status(400).json("Invalid Credentials");
        }
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.auth;
        if (!token) {
            res.json({ authenticated: false })
        }
        const decode = decodeToken(token);
        if (decode) {
            res.json({ authenticated: true })
        }
    } catch (err) {
        res.json({ authenticated: false })
    }
};

export const getUserDetail = async (req: Request, res: Response, next: NextFunction) => {
    const connection = await connectionString();
    try {
        const results: any = await connection?.query('SELECT * FROM "Person"');
        const persons = results.rows;
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(persons)
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
};

export default { createUser, loginUser, checkAuth, getUserDetail }