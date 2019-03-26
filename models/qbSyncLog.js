"use strict";
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "QbSyncLog",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      syncToQb: {
        type: DataTypes.DATE
      },
      syncFromQb: {
        type: DataTypes.DATE
      },
      memo: {
        type: DataTypes.TEXT
      }
    },
    {}
  );
};
