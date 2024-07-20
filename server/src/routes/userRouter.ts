import { Router } from "express";
import { getUser } from "../functions/user/getUser";
import { updateUser } from "../functions/user/updateUser";
import { updateBanner } from "../functions/user/updateBanner";
import multer from "multer";
import { protect } from "../helper/protect";

const router = Router();

router.get("/", protect, getUser);
router.patch("/", protect, updateUser);

// Upload banner image
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/banner", protect, upload.single("image"), updateBanner);

export default router;
