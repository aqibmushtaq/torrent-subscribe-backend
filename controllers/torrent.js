var _ = require("lodash");

module.exports.controller = function (app) {

    this.app = app;

    app.post("/torrent", function(req, res) {

        app.get("logger").trace("[/torrent POST] start");

        var magnetLink = req.query.magnet_link || "";

        app.get("deluge").add(magnetLink, "/media/data1/torrents/complete", function(error, result) {
            if (error) {
                app.get("logger").trace("[/torrent POST] an error occurred: " + JSON.stringify(error));
                res.status(400).send("an error occurred: " + JSON.stringify(error));
                return;
            }
            app.get("logger").trace("[/torrent POST] success: " + result);
            res.send(JSON.stringify({"result": result}));
        });
    });

    app.get("/torrent", function(req, res) {
        app.get("logger").trace("[/torrent GET] start");

        app.get("node-deluge").get_status(function(result) {
            app.get("logger").trace("[/torrent GET] success: " + JSON.stringify(result));
            if (!_.has(result, "result.torrents")) {
                res.status(400).send(JSON.stringify(result));
                return;
            }
            res.send(JSON.stringify(result.result.torrents));
        });
    });

};
