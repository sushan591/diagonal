const elementscontroller = require("./../controllers").elements;

module.exports = (app) => {
    app.get("/api", (req, res) => {
        res.json({
            status: "success",
            message: "Diagonal Soft",
            data: { version_number: "v1.0.0" },
        });
    });

    app.get("/api/elements", elementscontroller.index);
    app.put("/api/elements/move", elementscontroller.move);
    app.post("/api/elements/dummyData", elementscontroller.insertData);
};