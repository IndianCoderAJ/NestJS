const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
    OriginalURL: { type: String },
    urlHash: { type: String },
    shortUrl: { type: String },
    Date: { type: Date, default: Date.now },
});

const Links = mongoose.model('Link', LinkSchema);

module.exports.LinksModule = Links;