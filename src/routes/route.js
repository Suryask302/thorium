

const express = require('express');
const router = express.Router();
const weatherMap = require("../controllers/weathermap")
const memeEditor = require("../controllers/memeController")



router.get("/weather/london", weatherMap.getWeather)
router.get("/weather/onlytemp", weatherMap.onlyTemp)

router.get("/citieswithtemp",weatherMap.SortedByTemp)


router.get("/memeeditor",memeEditor.memeEditor)
router.post("/editor",memeEditor.Editor)
module.exports = router;