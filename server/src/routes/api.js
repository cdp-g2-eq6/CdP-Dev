const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/ping', (req, res) => {
  res.send('pong');
});


module.exports = router;


