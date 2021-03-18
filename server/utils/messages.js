const moment = require('moment');

const formatMsg = ({ name, text }) => {
  return {
    name,
    text,
    time: moment().format('h:mm a')
  };
};

module.exports = {
  formatMsg
};
