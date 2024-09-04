const Playlist = require('../models/Playlist');

exports.createPlaylist = async (req, res) => {
    try {
        const newPlaylist = new Playlist({
            user: req.user.id,
            name: req.body.name,
            songs: [],
        });

        const playlist = await newPlaylist.save();
        res.json(playlist);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ user: req.user.id });
        res.json(playlists);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.addSongToPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) {
            return res.status(404).json({ msg: 'Playlist not found' });
        }

        playlist.songs.push(req.body.song);
        await playlist.save();
        res.json(playlist);
    } catch (err) {
        res.status(500).send('Server error');
    }
};
