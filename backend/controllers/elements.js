const Element = require("../db/models").Element;
const Sequelize = require("sequelize");
const sequelize = Sequelize.sequelize;
const Op = Sequelize.Op;

module.exports = {
    //GET ALL ELEMENTS. Matches GET request to http://localhost:3002/api/elements/
    async index(req, res, next) {
        try {
            const elements = await Element.findAll({
                attributes: ['element_id', 'element_name', 'position'],
                order: [
                    ["position", "ASC"]
                ],
            });
            res.status(200).send(elements);
        } catch (err) {
            next(err);
        }
    },
    //Move item position. Matches POST request to http://localhost:3002/api/elements/move + json body {number_of_rows:DESIRED_NUMBER_OF_ROWS}
    async move(req, res, next) {
        try {

            let { oldPosition, newPosition } = req.body;
            let lowerPosition = newPosition;
            let upperPosition = oldPosition;
            let logic = '+';
            if (oldPosition < newPosition) {
                lowerPosition = oldPosition;
                upperPosition = newPosition;
                logic = '-';
            }
            // first get_id of oldPosition
            // increment position by 1 from new position through old position
            // update old position to new position by using id

            const OldPosId = await Element.findOne({
                where: {
                    position: oldPosition
                },
                attributes: ["element_id"]

            });

            const test = await Element.update({ position: Sequelize.literal(`position ${logic} 1`) }, {
                where: {
                    position: {
                        [Op.between]: [lowerPosition, upperPosition]
                    },
                }
            });

            await Element.update({
                position: newPosition
            }, {
                where: { element_id: OldPosId.element_id }
            });

            const elements = await Element.findAll({
                attributes: ['element_id', 'element_name', 'position'],
                order: [
                    ["position", "ASC"]
                ],
            });
            res.status(200).send(elements);
        } catch (err) {
            next(err);
        }
    },
    //Insert dummy data. Matches POST request to http://localhost:3002/api/elements/dummyData + json body {number_of_rows:DESIRED_NUMBER_OF_ROWS}
    async insertData(req, res, next) {
        let errors = [];
        let result = {};

        if (!req.body.number_of_rows) {
            result.response = "error";
            errors.push({ msg: "number_of_rows to insert dummy data not provided." });
            result.errors = errors;
            return res.status(200).send(result);
        }
        try {
            const elements = await Element.findOne({
                attributes: [
                    [Sequelize.fn('MAX', Sequelize.col('element_id')), "element_id"]
                ],
            });
            let i = 1;
            let max_length = req.body.number_of_rows;
            if (elements.element_id > 0) {
                i = elements.element_id + 1;
                max_length = elements.element_id + req.body.number_of_rows;
            }
            for (i; i <= max_length; i++) {
                Element.create({
                    element_id: i,
                    element_name: `Task ${i}`,
                    position: i,
                });
            }

            return res.status(200).send("success");

            // USE BULK CREATE
            // let data = [];
            // for (i; i <= max_length; i++) {
            //     data.push({
            //         element_id: i,
            //         element_name: `task ${i}`,
            //         position: i,
            //     });
            // }
            // await Element.bulkCreate(data).then(result => {
            //     return res.status(200).send(result);
            // }).catch(err => { console.log("error ", err) });

        } catch (err) {
            next(err);
        }
    },
};