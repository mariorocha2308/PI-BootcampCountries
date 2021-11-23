const { Country, Activity, conn } = require('../../src/db.js');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('id', () => {
      it('should throw an error if id is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid id')))
          .catch(() => done());
      });
      it('should work when its a valid id', () => {
        Country.create({ id: 'ARG' });
      });
    });
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });
    });
    describe('imageFlag', () => {
      it('should throw an error if imageFlag is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid imageFlag')))
          .catch(() => done());
      });
      it('should work when its a valid imageFlag', () => {
        Country.create({ imageFlag: 'https://restcountries.eu/data/arg.svg' });
      });
    });
    describe('continent', () => {
      it('should throw an error if continent is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid continent')))
          .catch(() => done());
      });
      it('should work when its a valid continent', () => {
        Country.create({ continent: 'Americas' });
      });
    });
    describe('capital', () => {
      it('should work when its a valid capital', () => {
        Country.create({ capital: 'Buenos Aires' });
      });
    });
    describe('subregion', () => {
      it('should work when its a valid subregion', () => {
        Country.create({ subregion: 'South America' });
      });
    });
    describe('area', () => {
      it('should work when its a valid area', () => {
        Country.create({ area: '2780400.0' });
      });
    });
    describe('population', () => {
      it('should work when its a valid population', () => {
        Country.create({ population: '43590400' });
      });
    });
  });
});


describe('Activity model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Activity.sync({ force: true }));    
    describe('name', () => {
      it('should work when its a valid name', () => {
        Activity.create({ name: 'Surfear' });
      });
    });
    describe('difficult', () => {
      it('should work when its a valid difficult', () => {
        Activity.create({ difficult: 'Extrema' });
      });
    });
    describe('duration', () => {
      it('should work when its a valid duration', () => {
        Activity.create({ duration: 'Dias indefinidos' });
      });
    });
    describe('season', () => {
      it('should work when its a valid season', () => {
        Activity.create({ season: 'Verano' });
      });
    });
  });
});
