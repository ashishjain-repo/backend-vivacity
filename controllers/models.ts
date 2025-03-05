export interface Person {
    name: string;
    birth: string; // Or Date
    location: string;
    occupation: string;
    username: string;
    password: string;
    image: string | null;
}

export interface PersonLogin{
    username: string,
    password: string
}