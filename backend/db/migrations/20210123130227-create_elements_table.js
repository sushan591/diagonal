"use strict";

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.createTable("elements", {
            element_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            element_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            position: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("now"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("now"),
            },
        });
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.dropTable("elements");
    },
};