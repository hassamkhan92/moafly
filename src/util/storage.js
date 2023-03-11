const prefix = 'moafly:';

function patchStorageKey(key) {
  return `${prefix}${key}`;
}

function getDataType(data) {
  return Object.prototype.toString
    .call(data)
    .slice(8, -1)
    .toLowerCase();
}

function stringifyStorageValue(value, type) {
  const storageValue = {
    type,
    value
  };
  return `${prefix}${JSON.stringify(storageValue)}`;
}

function parseStorageValue(value) {
  value = value.replace(prefix, '');
  const data = JSON.parse(value);
  return data.value;
}

export function setStorage(key, value, local = true) {
  const type = getDataType(value);
  key = patchStorageKey(key);
  if (value === null || value === undefined) {
    if (local) {
      window.localStorage.removeItem(key);
    } else {
      window.sessionStorage.removeItem(key);
    }
    return;
  }
  if (~['object', 'array'].indexOf(type)) {
    value = stringifyStorageValue(value, type);
  }
  if (local) {
    window.localStorage.setItem(key, value);
  } else {
    window.sessionStorage.setItem(key, value);
  }
}

export function getStorage(key, local = true) {
  key = patchStorageKey(key);
  const storageValue = local ? window.localStorage.getItem(key) : window.sessionStorage.getItem(key);
  if (storageValue && storageValue.indexOf(prefix) === 0) {
    return parseStorageValue(storageValue);
  } else {
    return storageValue;
  }
}
