'use strict';
var objProto = Object.prototype;
var owns = objProto.hasOwnProperty;
var toStr = objProto.toString;
var symbolValueOf;
if (typeof Symbol === 'function') {
  symbolValueOf = Symbol.prototype.valueOf;
}
var isActualNaN = function(value) {
  return value !== value;
};
var NON_HOST_TYPES = {
  boolean: 1,
  number: 1,
  string: 1,
  undefined: 1
};

const base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
const hexRegex = /^[A-Fa-f0-9]+$/;
const regList = {
  // 必须是以字母开头，只能包含字母数字下划线和减号，4到16位
  account: /^[a-zA-Z]\w{2,15}$/,
  // 汉字,最大18位
  nickName: /^[\u4E00-\u9FA5]{2,18}$/,
  // 判断是否是经度
  lng: /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,10})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,10}|180)$/,
  //判断是否纬度
  alt: /^(\-|\+)?([0-8]?\d{1}\.\d{0,10}|90\.0{0,10}|[0-8]?\d{1}|90)$/,
  //6-20位字母数字集合
  password: /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/,
  // 手机号
  phone: /^1[3|4|5|7|8][0-9]\d{8}$/
};
/**
 * 判断函数 Is
 */
class Is {
  constructor() {}
  /**
   * 判断数据类型是否为type
   * @param {*} value  需要判断的数据
   * @param {String} type 类型
   * @return {Boolean} 如果实际类型和判断类型一致返回true,否则返回false
   */
  type(value, type) {
    return typeof value === type;
  }
  /**
   * 判断是否定义
   * @param {*} value 需要判断的数据
   * @return {Boolean} 如果已经定义返回true,否则返回false
   * @example
   * Is.defined(zulezhe);
   * //false
   */
  defined(value) {
    return typeof value !== 'undefined';
  }
  /**
   * 判断是否为空
   * @param {*} value
   * @return {Boolean} 如果为真返回true,否则返回false
   */
  empty(value) {
    var type = toStr.call(value);
    var key;

    if (type === '[object Array]' || type === '[object Arguments]' || type === '[object String]') {
      return value.length === 0;
    }

    if (type === '[object Object]') {
      for (key in value) {
        if (owns.call(value, key)) {
          return false;
        }
      }
      return true;
    }

    return !value;
  }
  /**
   * 判断是否全等
   *
   * @param {*} value 验证的数据
   * @param {*} other 需要比较的数据
   * @return {Boolean} 如果相等返回true,否则返回false
   * @example
   * Is.equal([123],[123]);
   * //true
   * Is.equal([123],[456]);
   * //false
   */
  equal(value, other) {
    if (value === other) {
      return true;
    }

    var type = toStr.call(value);
    var key;

    if (type !== toStr.call(other)) {
      return false;
    }

    if (type === '[object Object]') {
      for (key in value) {
        if (!this.equal(value[key], other[key]) || !(key in other)) {
          return false;
        }
      }
      for (key in other) {
        if (!this.equal(value[key], other[key]) || !(key in value)) {
          return false;
        }
      }
      return true;
    }

    if (type === '[object Array]') {
      key = value.length;
      if (key !== other.length) {
        return false;
      }
      while (key--) {
        if (!this.equal(value[key], other[key])) {
          return false;
        }
      }
      return true;
    }

    if (type === '[object Function]') {
      return value.prototype === other.prototype;
    }

    if (type === '[object Date]') {
      return value.getTime() === other.getTime();
    }

    return false;
  }
  /**
   * is.hosted
   * Test if `value` is hosted by `host`.
   *
   * @param {*} value to test
   * @param {*} host host to test with
   * @return {Boolean} true if `value` is hosted by `host`, false otherwise
   * @api public
   */

  hosted(value, host) {
    var type = typeof host[value];
    return type === 'object' ? !!host[value] : !NON_HOST_TYPES[type];
  }

  /**
   * is.instance
   * Test if `value` is an instance of `constructor`.
   *
   * @param {*} value value to test
   * @return {Boolean} true if `value` is an instance of `constructor`
   * @api public
   */

  instance(value, constructor) {
    return value instanceof constructor;
  }

  /**
   * is.nil / is.null
   * Test if `value` is null.
   *
   * @param {*} value value to test
   * @return {Boolean} true if `value` is null, false otherwise
   * @api public
   */

  null(value) {
    return value === null;
  }

  /**
   * is.undef / is.undefined
   * Test if `value` is undefined.
   *
   * @param {*} value value to test
   * @return {Boolean} true if `value` is undefined, false otherwise
   * @api public
   */

  undefined(value) {
    return typeof value === 'undefined';
  }

  /**
   * Test arguments.
   */

  /**
   * is.args
   * 判断是否是参数
   *
   * @param {*} value value to test
   * @return {Boolean} true if `value` is an arguments object, false otherwise
   * @api public
   */

  args(value) {
    var isStandardArguments = toStr.call(value) === '[object Arguments]';
    var isOldArguments = !this.array(value) && this.arraylike(value) && this.object(value) && this.fn(value.callee);
    return isStandardArguments || isOldArguments;
  }
  /**
   * is.array
   * 判断是否是数组
   *
   * @param {*} value value to test
   * @return {Boolean} true if `value` is an array, false otherwise
   * @api public
   */

  array(value) {
    return toStr.call(value) === '[object Array]';
  }

  /**
   * argsEmpty
   * 判断参数是否为空
   *
   * @param {*} value value to test
   * @return {Boolean} true if `value` is an empty arguments object, false otherwise
   * @api public
   */
  argsEmpty(value) {
    return is.args(value) && value.length === 0;
  }

  /**
   * arrayEmpty
   * 判读是否是空数组
   *
   * @param {*} value value to test
   * @return {Boolean} true if `value` is an empty array, false otherwise
   * @api public
   */
  arrayEmpty(value) {
    return is.array(value) && value.length === 0;
  }

  /**
   * is.arraylike
   * 判断是否是数组对象
   *
   * @param {*} value value to test
   * @return {Boolean} true if `value` is an arguments object, false otherwise
   * @api public
   */

  arraylike(value) {
    return !!value && !is.bool(value) && owns.call(value, 'length') && isFinite(value.length) && is.number(value.length) && value.length >= 0;
  }

  /**
   * element
   * 判断是否为dom
   *
   * @param {*} value value to test
   * @return {Boolean} true if `value` is an HTML Element, false otherwise
   * @api public
   */

  element(value) {
    return value !== undefined && typeof HTMLElement !== 'undefined' && value instanceof HTMLElement && value.nodeType === 1;
  }
}
const is = {};

/**
 * Test boolean.
 */

/**
 * is.bool
 * 判断是否为布尔类型
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a boolean, false otherwise
 * @api public
 */

is.bool = is['boolean'] = function(value) {
  return toStr.call(value) === '[object Boolean]';
};

/**
 * is.false
 *判断是否为false
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is false, false otherwise
 * @api public
 */

is['false'] = function(value) {
  return is.bool(value) && Boolean(Number(value)) === false;
};

/**
 * is.true
 * 判断是否为真
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is true, false otherwise
 * @api public
 */

is['true'] = function(value) {
  return is.bool(value) && Boolean(Number(value)) === true;
};

/**
 * Test date.
 */

/**
 * is.date
 * 判断是否为date类型
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a date, false otherwise
 * @api public
 */

is.date = function(value) {
  return toStr.call(value) === '[object Date]';
};

/**
 * is.date.valid
 * Test if `value` is a valid date.
 *
 * @param {*} value value to test
 * @returns {Boolean} true if `value` is a valid date, false otherwise
 */
is.date.valid = function(value) {
  return is.date(value) && !isNaN(Number(value));
};

/**
 * Test error.
 */

/**
 * is.error
 * Test if `value` is an error object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an error object, false otherwise
 * @api public
 */

is.error = function(value) {
  return toStr.call(value) === '[object Error]';
};

/**
 * Test function.
 */

/**
 * is.fn / is.function (deprecated)
 * 判断是否是一个函数
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a function, false otherwise
 * @api public
 */

is.fn = is['function'] = function(value) {
  var isAlert = typeof window !== 'undefined' && value === window.alert;
  if (isAlert) {
    return true;
  }
  var str = toStr.call(value);
  return str === '[object Function]' || str === '[object GeneratorFunction]' || str === '[object AsyncFunction]';
};

/**
 * Test number.
 */

/**
 * is.number
 * 判断是否是number
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a number, false otherwise
 * @api public
 */

is.number = function(value) {
  return toStr.call(value) === '[object Number]';
};

/**
 * is.infinite
 * Test if `value` is positive or negative infinity.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is positive or negative Infinity, false otherwise
 * @api public
 */
is.infinite = function(value) {
  return value === Infinity || value === -Infinity;
};

/**
 * is.decimal
 * Test if `value` is a decimal number.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a decimal number, false otherwise
 * @api public
 */

is.decimal = function(value) {
  return is.number(value) && !isActualNaN(value) && !is.infinite(value) && value % 1 !== 0;
};

/**
 * is.divisibleBy
 * Test if `value` is divisible by `n`.
 *
 * @param {Number} value value to test
 * @param {Number} n dividend
 * @return {Boolean} true if `value` is divisible by `n`, false otherwise
 * @api public
 */

is.divisibleBy = function(value, n) {
  var isDividendInfinite = is.infinite(value);
  var isDivisorInfinite = is.infinite(n);
  var isNonZeroNumber = is.number(value) && !isActualNaN(value) && is.number(n) && !isActualNaN(n) && n !== 0;
  return isDividendInfinite || isDivisorInfinite || (isNonZeroNumber && value % n === 0);
};

/**
 * is.integer
 * Test if `value` is an integer.
 *
 * @param value to test
 * @return {Boolean} true if `value` is an integer, false otherwise
 * @api public
 */

is.integer = is['int'] = function(value) {
  return is.number(value) && !isActualNaN(value) && value % 1 === 0;
};

/**
 * is.maximum
 * Test if `value` is greater than 'others' values.
 *
 * @param {Number} value value to test
 * @param {Array} others values to compare with
 * @return {Boolean} true if `value` is greater than `others` values
 * @api public
 */

is.maximum = function(value, others) {
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.arraylike(others)) {
    throw new TypeError('second argument must be array-like');
  }
  var len = others.length;

  while (--len >= 0) {
    if (value < others[len]) {
      return false;
    }
  }

  return true;
};

/**
 * is.minimum
 * Test if `value` is less than `others` values.
 *
 * @param {Number} value value to test
 * @param {Array} others values to compare with
 * @return {Boolean} true if `value` is less than `others` values
 * @api public
 */

is.minimum = function(value, others) {
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.arraylike(others)) {
    throw new TypeError('second argument must be array-like');
  }
  var len = others.length;

  while (--len >= 0) {
    if (value > others[len]) {
      return false;
    }
  }

  return true;
};

/**
 * is.nan
 * Test if `value` is not a number.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is not a number, false otherwise
 * @api public
 */

is.nan = function(value) {
  return !is.number(value) || value !== value;
};

/**
 * is.even
 * Test if `value` is an even number.
 *
 * @param {Number} value value to test
 * @return {Boolean} true if `value` is an even number, false otherwise
 * @api public
 */

is.even = function(value) {
  return is.infinite(value) || (is.number(value) && value === value && value % 2 === 0);
};

/**
 * is.odd
 * Test if `value` is an odd number.
 *
 * @param {Number} value value to test
 * @return {Boolean} true if `value` is an odd number, false otherwise
 * @api public
 */

is.odd = function(value) {
  return is.infinite(value) || (is.number(value) && value === value && value % 2 !== 0);
};

/**
 * is.ge
 * Test if `value` is greater than or equal to `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean}
 * @api public
 */

is.ge = function(value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value >= other;
};

/**
 * is.gt
 * Test if `value` is greater than `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean}
 * @api public
 */

is.gt = function(value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value > other;
};

/**
 * is.le
 * Test if `value` is less than or equal to `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} if 'value' is less than or equal to 'other'
 * @api public
 */

is.le = function(value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value <= other;
};

/**
 * is.lt
 * Test if `value` is less than `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} if `value` is less than `other`
 * @api public
 */

is.lt = function(value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value < other;
};

/**
 * is.within
 * Test if `value` is within `start` and `finish`.
 *
 * @param {Number} value value to test
 * @param {Number} start lower bound
 * @param {Number} finish upper bound
 * @return {Boolean} true if 'value' is is within 'start' and 'finish'
 * @api public
 */
is.within = function(value, start, finish) {
  if (isActualNaN(value) || isActualNaN(start) || isActualNaN(finish)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.number(value) || !is.number(start) || !is.number(finish)) {
    throw new TypeError('all arguments must be numbers');
  }
  var isAnyInfinite = is.infinite(value) || is.infinite(start) || is.infinite(finish);
  return isAnyInfinite || (value >= start && value <= finish);
};

/**
 * Test object.
 */

/**
 * is.object
 * 判断是否是一个对象
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an object, false otherwise
 * @api public
 */
is.object = function(value) {
  return toStr.call(value) === '[object Object]';
};

/**
 * is.primitive
 * Test if `value` is a primitive.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a primitive, false otherwise
 * @api public
 */
is.primitive = function isPrimitive(value) {
  if (!value) {
    return true;
  }
  if (typeof value === 'object' || is.object(value) || is.fn(value) || is.array(value)) {
    return false;
  }
  return true;
};

/**
 * is.hash
 * Test if `value` is a hash - a plain object literal.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a hash, false otherwise
 * @api public
 */

is.hash = function(value) {
  return is.object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
};

/**
 * Test regexp.
 */

/**
 * is.regexp
 * 判断是否是正则对象
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a regexp, false otherwise
 * @api public
 */

is.regexp = function(value) {
  return toStr.call(value) === '[object RegExp]';
};

/**
 * Test string.
 */

/**
 * is.string
 * 判断是否字符串
 *
 * @param {*} value value to test
 * @return {Boolean} true if 'value' is a string, false otherwise
 * @api public
 */

is.string = function(value) {
  return toStr.call(value) === '[object String]';
};

/**
 * Test base64 string.
 */

/**
 * is.base64
 * Test if `value` is a valid base64 encoded string.
 *
 * @param {*} value value to test
 * @return {Boolean} true if 'value' is a base64 encoded string, false otherwise
 * @api public
 */

is.base64 = function(value) {
  return is.string(value) && (!value.length || base64Regex.test(value));
};

/**
 * Test base64 string.
 */

/**
 * is.hex
 * Test if `value` is a valid hex encoded string.
 *
 * @param {*} value value to test
 * @return {Boolean} true if 'value' is a hex encoded string, false otherwise
 * @api public
 */

is.hex = function(value) {
  return is.string(value) && (!value.length || hexRegex.test(value));
};

/**
 * is.symbol
 * Test if `value` is an ES6 Symbol
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a Symbol, false otherise
 * @api public
 */

is.symbol = function(value) {
  return typeof Symbol === 'function' && toStr.call(value) === '[object Symbol]' && typeof symbolValueOf.call(value) === 'symbol';
};
/**
 * is.email
 * 判断是否是邮箱 *
 * @param {*} value value to test
 * @return {Boolean} true 如果是邮箱返回 true
 * @api public
 */
is.email = function(value) {
  const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
};
/**
 * is.phone
 * 判断是否是手机号 *
 * @param {*} value value to test
 * @return {Boolean} true 如果是手机号返回 true
 * @api public
 */
is.phone = function(value) {};

export default new Is();
