const express = require('express');
const { createPlaylist, getPlaylists, addSongToPlaylist } = require('../controllers/playlistController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, createPlaylist);
router.get('/', auth, getPlaylists);
router.put('/:id', auth, addSongToPlaylist);

module.exports = router;
