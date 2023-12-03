module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account", { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      subscriptionStatus: {
        type: Sequelize.ENUM('subscribed', 'unsubscribed', 'pending'),
        defaultValue: 'pending', 
        allowNull: false
      }
    });
  
    return Account;
  };