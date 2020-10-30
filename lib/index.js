const additionalMethods = [
  {
    type: 'date',
    methods: ['isValid']
  },
  {
    type: 'string',
    methods: ['isEmpty', 'format']
  },
  {
    type: 'array',
    methods: ['isEmpty']
  },
  {
    type: 'object',
    methods: ['isEmpty']
  },
  {
    type: 'number',
    methods: ['isEmpty']
  }
];
const classTypeMap = {
  object: Object,
  string: String,
  number: Number,
  date: Date,
  array: Array
};

/**
 * It
 *  - adds isEmpty method to basic Data types (Array, String, Object, Number)
 *  - adds isValid method to Date type
 *  - adds format method to String
 */
const init = () => {
  Date.prototype.isValid = Date.prototype.isValid || function isValid() {
    return !isNaN(this.getTime());
  };

  Array.prototype.isEmpty = Array.prototype.isEmpty || function isEmpty() {
    return this.length === 0;
  };

  String.prototype.isEmpty = String.prototype.isEmpty || function isEmpty(trim) {
    let str = this.toString();
    if (trim) str = str.trim();
    return str.length === 0;
  };

  String.prototype.format = String.prototype.format || function format(...args) {
    let str = this.toString();
    if (args.length) {
      const t = typeof args[0];
      let key;
      const records = (t === 'string' || t === 'number')
        ? Array.prototype.slice.call(args)
        : args[0];

      // eslint-disable-next-line guard-for-in
      for (key in records) {
        str = str.replace(new RegExp(`\\{${key}\\}`, 'gi'), records[key]);
      }
    }
    return str;
  };

  Number.prototype.isEmpty = Number.prototype.isEmpty || function isEmpty() {
    const n = this.valueOf();
    return !n;
  };

  Object.prototype.isEmpty = Object.prototype.isEmpty || function isEmpty() {
    return Object.keys(this).length === 0;
  };
};

const removeMethods = (Class, methods) => {
  for (const method of methods) {
    delete Class.prototype[method];
  }
};

const removeAllMethods = () => {
  for (const doc of additionalMethods) {
    removeMethods(classTypeMap[doc.type], doc.methods);
  }
};

/**
 * @param  {...any} args Takes list of values
 * @returns {boolean} Returns if all of them is empty
 */
const isEmpty = (...args) => {
  if (args.length === 0) {
    return true;
  }
  if (args.length > 1) {
    let empty = true;
    for (const argument of args) {
      if (!empty) return false;
      empty = empty && isEmpty(argument);
    }
    return empty;
  }
  const value = args[0];
  if (typeof value === 'boolean') return false;
  if (!value) return true;
  if (value instanceof Object && Object.keys(value).length === 0) return true;
  return false;
};

/**
 * @param  {...any} args Takes list of values
 * @returns {boolean} Returns if any of them is empty
 */
const isAnyEmpty = (...args) => {
  if (args.length === 0) {
    return true;
  }
  if (args.length > 1) {
    let empty = false;
    for (const argument of args) {
      if (empty) return true;
      empty = empty || isEmpty(argument);
    }
    return empty;
  }
  const value = args[0];
  if (typeof value === 'boolean') return false;
  if (!value) return true;
  if (value instanceof Object && Object.keys(value).length === 0) return true;
  return false;
};

module.exports = {
  isEmpty,
  isAnyEmpty,
  init,
  removeAllMethods,
  removeMethods
};
