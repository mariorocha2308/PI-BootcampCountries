//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const request = require('request');
const { Country } = require('./src/db');
const PORT = process.env.PORT || 3001

conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    request('https://restcountries.com/v3.1/all', { json: true }, function(error, response, data) {
      if (error) { res.status(404).send('CONSULTA FALLIDA'); }
      data.map(async(country) => {
          try {
              await Country.findOrCreate({
                  where: {
                      id: country.cca2,
                      name: country.name.common,
                      imageFlag: country.flags.svg,
                      continent: country.region,
                      capital: country.capital ? country.capital[0] : null,
                      subregion: country.subregion ? country.subregion : null,
                      area: country.area,
                      population: country.population,

                      //* NEW DATA DETAIL
                      timezones: country.timezones ? country.timezones[0] : null,
                      languages: country.languages ? Object.values(country.languages) : null
                  }
              })   
          } catch (error) {
              console.log(error)
          }
      })
    });   
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
