const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    songs: [
        {
            title: String,
            artist: String,
            url: String,
        },
    ],
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
