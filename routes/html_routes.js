//algo.html
const path = require("path"); 

module.exports = function (app) {
    // app.get('/', (req, res) => {
    //     res.sendFile(path.join(__dirname, "../algo.html"));
    // });

    //Directs user to index.handlebars
    app.get("/", (req, res) => {
        // directs the user to the index.handlebars
        res.render(path.join(__dirname, "../views/index.handlebars"));
      });
};



