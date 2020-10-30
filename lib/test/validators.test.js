/* global describe, it */

const chai = require('chai');
const { validators } = require('..');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

describe('Validators', () => {
  const p1 = 'helloworld';
  const p2 = 'HelloWorld';
  const p3 = 'HelloW0rld';
  const p4 = 'Hello@W0rld';

  const n1 = 'John Doe';
  const n2 = 'Tom Cruise';
  const n3 = 'J.R. Roy';
  const n4 = 'R Rosy Marvel';
  const n5 = 'Tommy 5';
  const n6 = 'Tommy $';
  const n7 = 'Tommy @';

  const h1 = 'tommy';
  const h2 = 'john.doe';
  const h3 = 'tom.cruise';
  const h4 = 'tom_cruise';
  const h5 = 'john-doe';
  const h6 = 'tom';

  describe('password', () => {
    describe('basic', () => {
      it('should validate basic password', () => {
        validators.password.basic.test(p1).should.eql(false);
        validators.password.basic.test(p2).should.eql(false);
        validators.password.basic.test(p3).should.eql(true);
      });
    });

    describe('hard', () => {
      it('should validate hard password', () => {
        validators.password.hard.test(p1).should.eql(false);
        validators.password.hard.test(p2).should.eql(false);
        validators.password.hard.test(p3).should.eql(false);
        validators.password.hard.test(p4).should.eql(true);
      });
    });
  });

  describe('name', () => {
    it('should validate name', () => {
      validators.name.test(n1).should.eql(true);
      validators.name.test(n2).should.eql(true);
      validators.name.test(n3).should.eql(true);
      validators.name.test(n4).should.eql(true);
      validators.name.test(n5).should.eql(false);
      validators.name.test(n6).should.eql(false);
      validators.name.test(n7).should.eql(false);
    });
  });

  describe('handle', () => {
    it('should validate handler', () => {
      validators.handle.test(h1).should.eql(true);
      validators.handle.test(h2).should.eql(true);
      validators.handle.test(h3).should.eql(true);
      validators.handle.test(h4).should.eql(true);
      validators.handle.test(h5).should.eql(false);
      validators.handle.test(h6).should.eql(false);
    });
  });
});
