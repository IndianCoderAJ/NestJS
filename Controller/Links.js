let links = {};

const { LinksModule } = require('../Model/Links');
const short = require('short-uuid');
const isValidURL = require('../utils/is_url');

links.getLink = async(req, res) => {
    try {
        let linksData = await LinksModule.find({}, { Date: 0, _id: 0 });
        return res.status(200).json(linksData);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ Error: "Something went wrong" })
    }

}

links.postLink = async(req, res) => {
    try {
        if (isValidURL(req.body.url)) {
            let urlHash = short.generate();
            let link = new LinksModule({
                OriginalURL: req.body.url,
                urlHash: urlHash,
                shortUrl: `${process.env.BASE_URL}${urlHash}`
            });

            let insertLink = await link.save();
            return res.status(200).json({
                url: insertLink.OriginalURL,
                urlHash: insertLink.urlHash,
                shortUrl: insertLink.shortUrl
            });
        } else {
            return res.status(404).json({ Error: "Provide proper URL" });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ Error: "Something went wrong" })
    }

}

links.putLink = async(req, res) => {
    try {
        if (isValidURL(req.body.url)) {
            let urlHash = short.generate();
            let getResult = await LinksModule.findOneAndUpdate({ OriginalURL: req.body.url }, { OriginalURL: req.body.url, urlHash: urlHash, shortUrl: `http://localhost:3000/${urlHash}` });
            if (getResult) {
                let UpdateResult = await LinksModule.findOne({ OriginalURL: req.body.url })
                return res.status(200).json({
                    url: UpdateResult.OriginalURL,
                    urlHash: UpdateResult.urlHash,
                    shortUrl: UpdateResult.shortUrl
                });
            } else {
                return res.status(401).json({ message: "Data not found." })
            }

        } else {
            return res.status(404).json({ Error: "Provide proper URL" });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ Error: "Something went wrong" })
    }


}

links.deleteLink = async(req, res) => {
    try {
        let isAvailable = await LinksModule.findOneAndDelete({ OriginalURL: req.body.url });
        if (isAvailable) {
            return res.status(200).json({
                url: isAvailable.OriginalURL,
                urlHash: isAvailable.urlHash,
                shortUrl: isAvailable.shortUrl
            });
        } else {
            return res.status(401).json({ message: "Data not found." })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ Error: "Something went wrong" })
    }

}

links.redirectLink = async(req, res) => {
    try {
        let url = await LinksModule.findOne({ urlHash: req.params.code });
        if (url) {
            //return res.status(302).json({ location: url.OriginalURL });
             return res.redirect(url.OriginalURL);
        } else {
            return res.status(404).json({ Error: 'No url found' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ Error: "Something went wrong" });
    }
}

module.exports = links;