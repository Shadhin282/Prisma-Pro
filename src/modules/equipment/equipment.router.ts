import  express  from "express";
import { equipmentController } from "./equipment.controller";
import { auth } from "../../middleware/auth";

const router = express.Router();

router.post('/',auth(),equipmentController.createEquipment)
router.get('/', equipmentController.getEquipment)

export const equipmentRouter = router;