import express from 'express'
import cors from 'cors'
import { userRouter } from './modules/user/user.router';
import { equipmentRouter } from './modules/equipment/equipment.router';


const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter)
app.use(equipmentRouter)


export default app;