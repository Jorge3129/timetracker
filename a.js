const dayjs = require('dayjs');

const date = dayjs().day(1);
const a = new Array(7)
    .fill(0)
    .map((e, i) => i + 1)
    .map(day => dayjs().day(day === 0 ? 7 : day));
console.log(a.map(d => d.format('DD.MM.YYYY')));
