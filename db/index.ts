import pg from 'pg';

export default async function connectionString(){
    const client = new pg.Client({
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: 5432
    });
    try{
        if(!client.connect()){
            return null
        }else{
            return client;
        }
    }catch(error){
        console.error(error);
    }
}