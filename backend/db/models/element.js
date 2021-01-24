"use strict";

module.exports = (sequelize, DataTypes) => {
    const Element = sequelize.define(
        "Element", {
            element_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            element_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            position: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            tableName: "elements",
        }
    );

    return Element;
};