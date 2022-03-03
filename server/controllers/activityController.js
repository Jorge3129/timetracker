const {connection} = require('../config');
const dayjs = require('dayjs');

class ActivityController {
    get(req, res) {
        res.json([{title: 'read', lastUsed: dayjs().day(1).format('YYYY-MM-DD')},
            {title: 'guitar', lastUsed: dayjs().day(2).format('YYYY-MM-DD')}]);
    }
}

module.exports = new ActivityController()
