module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      // Define your model attributes here
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      // Add more fields as needed
    });
  
    return Task;
  };
  