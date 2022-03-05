const {connection} = require('../config');
const dayjs = require('dayjs');

class ActivityController {
    get(req, res) {
        res.json({
                data: [{title: 'read', color: '#6f87ad', lastUsed: dayjs().day(1).format('YYYY-MM-DD')},
                    {title: 'guitar', color: '#ff9d00', lastUsed: dayjs().day(2).format('YYYY-MM-DD')},
                    {title: 'JS', color: '#b3863e', lastUsed: dayjs().day(3).format('YYYY-MM-DD')},],
                error: false,
            }
        );
    }
}

module.exports = new ActivityController()
