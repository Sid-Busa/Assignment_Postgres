module.exports = (sequelize, Sequelize) => {
    const App = sequelize.define("app", { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      network: {
        type: Sequelize.STRING
      },
      apiKey: {
        type: Sequelize.STRING
      },
      developerID: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'account', 
          key: 'id'
        }
      }
    });
  
    return App;
  };