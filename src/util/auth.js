import { setStorage, getStorage } from '@/util/storage';
import Cookies from 'js-cookie';
const TokenKey = 'Token';
const userData = 'user';
const hoseId = 'hoseId';
const taskKey = 'task';
const systemKey = 'sys';
const homeKey = 'home';
const sellMenuKey = 'sellMenu';
const sellHomeIdKey = 'homeId';
export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}
export function getuserData() {
  return getStorage(userData);
}
export function setuserData(data) {
  return setStorage(userData, data);
}
export function gethoseId() {
  return getStorage(hoseId);
}
export function sethoseId(data) {
  return setStorage(hoseId, data);
}
export function getTaskInfo() {
  return getStorage(taskKey);
}
export function setTaskInfo(data) {
  return setStorage(taskKey, data);
}
export function getSystemList() {
  return getStorage(systemKey);
}
export function setSystemList(data) {
  return setStorage(systemKey, data);
}
export function getHomeInfo() {
  return getStorage(homeKey);
}
export function setHomeInfo(data) {
  return setStorage(homeKey, data);
}
export function getSellMenu() {
  return getStorage(sellMenuKey);
}
export function setSellMenu(data) {
  return setStorage(sellMenuKey, data);
}
export function getSellHomeId() {
  return getStorage(sellHomeIdKey);
}
export function setSellHomeId(data) {
  return setStorage(sellHomeIdKey, data);
}
