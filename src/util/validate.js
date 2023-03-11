import dayjs from 'dayjs';
import Message from '@/components/message/message.js';
//  当前验证方法可以直接在elementui的表单验证中使用,自定义验证规则
/**
 * 手机号验证
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function isPhone(rule, value, callback) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  if (!value) {
    callback(new Error('请输入手机号码'));
  } else if (!reg.test(value)) {
    callback(new Error('请输入正确的11位手机号码'));
  } else {
    callback();
  }
}
//邮箱验证
export function validateEamail1(rule, value, callback) {
  if (!value) {
    callback(new Error('Please enter your email address'));
  } else {
    if (value) {
      const reg = /^[A-Za-z0-9\u4E00-\u9FA5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(value)) {
        callback(new Error('Enter a valid email address'));
      }
    }
    callback();
  }
}
//邮箱验证
export function validateEmail(value) {
  if (value === '') {
    Message.warn('Enter a valid email address');
    return false;
  } else {
    if (value !== '') {
      const reg = /^[A-Za-z0-9\u4E00-\u9FA5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(value)) {
        Message.warn('Enter a valid email address');
        return false;
      }
    }
    return true;
  }
}
// 密码验证
export function isPassword(rule, value, callback) {
  const regex = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/; //6-20位字母数字集合
  if (!value) {
    callback(new Error('Please enter your password.'));
  } else if (!regex.test(value)) {
    callback(new Error('Must be a set of 6-20 alphanumeric characters'));
  } else {
    callback();
  }
}

export function validPassword(value) {
  const regex = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/; //6-20位字母数字集合
  if (!value) {
    Message.error('请输入密码');
    // callback(new Error('请输入密码'));
    return false;
  } else if (!regex.test(value)) {
    // callback(new Error('必须是6-20位字母数字集合'));
    Message.error('必须是6-20位字母数字集合');
    return false;
  } else {
    // callback();
    return true;
  }
}
// 验证用户名
export function isNickName(rule, value, callback) {
  const reg1 = /^[\u4E00-\u9FA5]+$/;
  const reg2 = /^[\u4E00-\u9FA5]{2,18}$/;
  if (!value) {
    callback(new Error('请输入用户名'));
  } else if (!reg1.test(value)) {
    callback(new Error('用户名必须为汉字'));
  } else if (!reg2.test(value)) {
    callback(new Error('最少2个字符,最多18个字符'));
  } else {
    callback();
  }
}
// 验证用户名是否合法，必须是以字母开头，只能包含字母数字下划线和减号，4到16位
export function isAccount(rule, value, callback) {
  const reg = /^[a-zA-Z]\w{2,15}$/;
  if (!value) {
    callback(new Error('请输入账户'));
  } else if (!reg.test(value)) {
    callback(new Error('以字母开头，只能包含字母数字下划线和减号，3到14位'));
  } else {
    callback();
  }
}

/* 判断是否为数字,包括浮点数 */
export function isNumber(rule, value, callback) {
  const reg = /^(-?\d+)(\.\d+)?$/;
  if (!value) {
    callback(new Error('请输入内容'));
  } else if (!reg.test(value)) {
    callback(new Error('内容必须是数字'));
  } else {
    callback();
  }
}

export function isLng(rule, value, callback) {
  //验证经度
  const reg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,10})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,10}|180)$/;
  if (!value) {
    callback(new Error('请输入经度'));
  } else if (!reg.test(value)) {
    callback(new Error('经度整数部分为0-180,小数部分为0到10位!'));
  } else {
    callback();
  }
}
// //校验纬度是否符合规范
// //纬度
export function isLat(rule, value, callback) {
  const reg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,10}|90\.0{0,10}|[0-8]?\d{1}|90)$/;

  if (!value) {
    callback(new Error('请输入经度'));
  } else if (!reg.test(value)) {
    callback(new Error('纬度整数部分为0-90,小数部分为0到10位!'));
  } else {
    callback();
  }
}
/**
 * @Description:   价格验证，正则（小数点前8位，小数点后5位）
 */
export function isPrice(rule, value, callback) {
  const reg = /^(?:0\.\d{0,1}[1-9]|(?!0)\d{1,8}(?:\.\d{0,4}[1-9])?)$/;
  if (!value) {
    return callback(new Error('Must fill in'));
  } else if (!/^(-?\d+)(\.\d+)?$/.test(Number(value))) {
    callback(new Error('Must be a number'));
  } else if (!reg.test(Number(value))) {
    callback(new Error('整数部分最大8位，小数部分最多保留5位'));
  } else {
    callback();
  }
}
// 验证是否正整数
export function isInteger(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  if (!Number(value)) {
    callback(new Error('请输入正整数'));
  } else {
    const re = /^[0-9]*[1-9][0-9]*$/;
    const rsCheck = re.test(value);
    if (!rsCheck) {
      callback(new Error('请输入正整数'));
    } else {
      callback();
    }
  }
}
/**
 * 不能有特殊符号, 也不能是负数
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 * @returns
 */
export function validateSymbol(rule, value, callback) {
  if (!value) {
    return callback(new Error('The input cannot be empty'));
  }
  var reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
  if (reg.test(value)) {
    callback(new Error('Cannot contain special symbols'));
  } else {
    callback();
  }
}
export function isHttps() {
  return 'https:' == document.location.protocol ? true : false;
}
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function is(val) {
  return val !== [] || val !== '' || !val;
}

export function isArrayFn(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
}
//验证银行卡号
// export function regTestCardNumber(value) {
//   let regExp = /^([1-9]{1})(\d{16})$/;
//   if (regExp.test(value)) {
//     return true;
//   } else {
//     Message.warn('Incorrect card format');
//   }
// }
export function validateCardNumber(rule, value, callback) {
  //   let regExp = /^([1-9]{1})(\d{16})$/;
  let regExp = /^\d{16}$/;
  if (!value) {
    callback(new Error('Please enter the card number'));
  } else if (!regExp.test(value)) {
    callback(new Error('Please enter the 16-digit card number'));
  } else {
    callback();
  }
}

/**
 * 验证CVC
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validateCVC(rule, value, callback) {
  let reg = /^[0-9]{3,4}$/;
  if (!value) {
    callback(new Error('Please enter the CVC'));
  } else if (!reg.test(value)) {
    callback(new Error('Invalid CVC'));
  } else {
    callback();
  }
}
//验证银行卡有效期
export function regTestCardPeriod(rule, value, callback) {
  let regExp = /^(?:0?[1-9]|1[0-2]) *\/ *[2-9][0-9]$/;
  var month = dayjs().month() + 1;
  var year = dayjs().year();
  console.log('month==>', month);
  console.log('year==>', year);
  if (!value) {
    callback(new Error('Please enter the card validity period'));
  } else if (!regExp.test(value)) {
    callback(new Error('Bank card validity period is wrong'));
  } else {
    let date = value.split('/');
    let valueMonth = date[0];
    let valueYear = '20' + date[1];
    if (valueYear < year) {
      callback(new Error('Invalid validity period'));
    } else if (Number(valueYear) == year && Number(valueMonth) <= month) {
      callback(new Error('Invalid validity period'));
    } else {
      callback();
    }
  }
}
//验证银行卡附加码
export function regTestCardPlusCode(rule, value, callback) {
  console.log('value', value);
  if (!value) {
    callback(new Error('Please enter the extra code attached to your bank card'));
  } else if (value.length !== 3) {
    callback(new Error('There is an error in attaching a code to the bank card'));
  } else {
    callback();
  }
}
