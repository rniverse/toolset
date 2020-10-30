/* global describe, it */
const chai = require('chai');
const {
  isEmpty,
  isAnyEmpty,
  init,
  removeAllMethods
} = require('..');

const should = chai.should();

describe('Util', () => {
  const dt = new Date();
  const doc = {};
  const array = [];
  const str = '';
  const n = 0;

  describe('isEmpty', () => {
    it('should return true if passed any empty value (single value)', () => {
      isEmpty(0).should.eql(true);
      isEmpty(null).should.eql(true);
      isEmpty(undefined).should.eql(true);
      isEmpty(NaN).should.eql(true);
      isEmpty('').should.eql(true);
      isEmpty([]).should.eql(true);
      isEmpty({}).should.eql(true);
    });

    it('should return false if passed any non empty value (single value)', () => {
      isEmpty(1).should.eql(false);
      isEmpty('null').should.eql(false);
      isEmpty([0]).should.eql(false);
      isEmpty({ a: 0 }).should.eql(false);
    });

    it('should return true if all values are empty', () => {
      isEmpty('', {}, []).should.eql(true);
    });

    it('should return false if one/more values are not empty', () => {
      isEmpty('', {}, [0]).should.eql(false);
      isEmpty(1, 'hello', [1], { a: 0 }).should.eql(false);
    });

    it('should return false if boolean values present(any bool will be considered non empty)', () => {
      isEmpty(true).should.eql(false);
      isEmpty(false).should.eql(false);
      isEmpty(false, false).should.eql(false);
      isEmpty(false, {}).should.eql(false);
    });

    it('should return true if called with no args', () => {
      isEmpty().should.eql(true);
    });
  });
  describe('isAnyEmpty', () => {
    it('should return true if passed any empty value (single value)', () => {
      isAnyEmpty(0).should.eql(true);
      isAnyEmpty(null).should.eql(true);
      isAnyEmpty(undefined).should.eql(true);
      isAnyEmpty(NaN).should.eql(true);
      isAnyEmpty('').should.eql(true);
      isAnyEmpty([]).should.eql(true);
      isAnyEmpty({}).should.eql(true);
    });

    it('should return false if passed any non empty value (single value)', () => {
      isAnyEmpty(1).should.eql(false);
      isAnyEmpty('null').should.eql(false);
      isAnyEmpty([0]).should.eql(false);
      isAnyEmpty({ a: 0 }).should.eql(false);
    });

    it('should return true if called with no args', () => {
      isAnyEmpty().should.eql(true);
    });

    it('should return true if one/more values are empty', () => {
      isAnyEmpty('', {}, [0]).should.eql(true);
      isAnyEmpty('', { a: 0 }, [0]).should.eql(true);
      isAnyEmpty([], { a: 0 }, [0]).should.eql(true);
    });

    it('should return false if all values are not empty', () => {
      isAnyEmpty('hello', { a: 0 }, [1]).should.eql(false);
    });

    it('should return false if boolean values present(any bool will be considered non empty)', () => {
      isAnyEmpty(true).should.eql(false);
      isAnyEmpty(false).should.eql(false);
      isAnyEmpty(false, false).should.eql(false);
      isAnyEmpty(false, {}).should.eql(true);
    });
  });

  describe('init', () => {
    it('should not have additional methods before init call', () => {
      should.not.exist(dt.isValid);
      should.not.exist(doc.isEmpty);
      should.not.exist(array.isEmpty);
      should.not.exist(str.isEmpty);
      should.not.exist(str.format);
      should.not.exist(n.isEmpty);
    });

    it('should have addition methods after init call', () => {
      init();
      should.exist(dt.isValid);
      should.exist(doc.isEmpty);
      should.exist(array.isEmpty);
      should.exist(str.isEmpty);
      should.exist(str.format);
      should.exist(n.isEmpty);
    });

    it('should validate date', () => {
      dt.isValid().should.eql(true);
      new Date('').isValid().should.eql(false);
      new Date('hello').isValid().should.eql(false);
      new Date(0).isValid().should.eql(true);
      new Date('2020-10-2').isValid().should.eql(true);
    });

    it('should validate emptiness of give values', () => {
      doc.isEmpty().should.eql(true);
      ({ a: 1 }).isEmpty().should.eql(false);
      ({ length: 0 }).isEmpty().should.eql(false);
      str.isEmpty().should.eql(true);
      'John doe'.isEmpty().should.eql(false);
      '      '.isEmpty(true).should.eql(true);
      '  '.isEmpty().should.eql(false);
      array.isEmpty().should.eql(true);
      [0].isEmpty().should.eql(false);
      [undefined].isEmpty().should.eql(false);
      n.isEmpty().should.eql(true);
      const n1 = NaN;
      n1.isEmpty().should.eql(true);
      const n2 = 5;
      n2.isEmpty().should.eql(false);
    });

    it('should return formatted strings for string format method', () => {
      const data = { name: 'John Doe', firstName: 'John', lastName: 'Doe' };
      const list = ['John Doe', 'John', 'Doe'];
      const result = 'Hi John Doe, John Doe\'s first name is John and last name is Doe';
      const fs = 'Hi {0}, {0}\'s first name is {1} and last name is {2}';
      const s1 = fs.format(...list);
      const s2 = fs.format(...list);
      const s3 = ('Hi {name}, {name}\'s first name'
        + ' is {firstName} and last name is {lastName}').format(data);
      s1.should.eql(result);
      s2.should.eql(result);
      s3.should.eql(result);
    });

    it('should return original string if no args passed to format', () => {
      const fs = 'Hi {0}, {0}\'s first name is {1} and last name is {2}';
      const s1 = fs.format();
      s1.should.eql(fs);
    });
  });

  describe('removeAllMethods', () => {
    it('should remove added methods after removeAllMethods', () => {
      /* before */
      should.exist(dt.isValid);
      should.exist(doc.isEmpty);
      should.exist(array.isEmpty);
      should.exist(str.isEmpty);
      should.exist(str.format);
      should.exist(n.isEmpty);

      removeAllMethods();

      /* after */

      should.not.exist(dt.isValid);
      should.not.exist(doc.isEmpty);
      should.not.exist(array.isEmpty);
      should.not.exist(str.isEmpty);
      should.not.exist(str.format);
      should.not.exist(n.isEmpty);
    });
  });
});
