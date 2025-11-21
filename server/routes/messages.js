const { addMessage, getMessages, addImageMessage } = require("../controllers/messageController");
const router = require("express").Router();
const multer = require("multer");
const upload = multer({ limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

router.post("/addmessage/", addMessage);
router.post("/getmessage/", getMessages);
router.post("/addimagemessage", upload.single("image"), addImageMessage);

module.exports = router;