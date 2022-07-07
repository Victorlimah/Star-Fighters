import express, { json } from 'express';
import cors from 'cors';
import chalk from 'chalk';

const app = express();
app.use(json());
app.use(cors());

const port = +process.env.PORT || 4000;

app.listen(port, () => {
  console.log(chalk.green(`Server started on port ${port}`));
});

