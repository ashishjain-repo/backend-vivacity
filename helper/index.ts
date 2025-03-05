import {createHash} from 'crypto';

export function generateHash(data, algorithm='sha256'){
    const hash = createHash(algorithm);
    hash.update(data);
    return hash.digest('hex');
};

export function generateToken(userId: number, username: string){
    const payload = {
        userId,
        username
    };
    const token = btoa(JSON.stringify(payload))
    return token;
};

export function decodeToken(token: string){
    try{
        const payload = JSON.parse(atob(token));
        return payload;
    }catch(err){
        return null
    }
};