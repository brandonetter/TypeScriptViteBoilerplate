import express, {Express, Request, Response} from 'express';

const app: Express = express();
const port : number = 7777;

app.get('/api/test', (req: Request, res: Response) => {
    console.log(req);
    res.send('Hello World!');
}
);
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
}
);

