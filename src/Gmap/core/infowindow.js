/*
 * @Author: zulezhe
 * @Date: 2022-01-12 21:40:22
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-01-12 21:51:19
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
/**
 * 创建地图信息窗口
 * @param {*} map  地图对象
 * @param {*} contentString 弹窗内容,html
 * @param {*} position 位置信息
 */
export function addInfoWindow(map, contentString, position) {
  const infoWindow = new google.maps.InfoWindow();
  infoWindow.setContent(contentString);
  infoWindow.setPosition(position);
  infoWindow.open(map);
  return infoWindow;
}
/**
 * A customized popup on the map.
 */
export class Popup extends google.maps.OverlayView {
  constructor(position, content) {
    super();
    this.position = position;
    content.classList.add('popup-bubble');
    const bubbleAnchor = document.createElement('div');
    bubbleAnchor.classList.add('popup-bubble-anchor');
    bubbleAnchor.appendChild(content);
    this.containerDiv = document.createElement('div');
    this.containerDiv.classList.add('popup-container');
    this.containerDiv.appendChild(bubbleAnchor);
    Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
  }
  onAdd() {
    this.getPanes().floatPane.appendChild(this.containerDiv);
  }
  onRemove() {
    if (this.containerDiv.parentElement) {
      this.containerDiv.parentElement.removeChild(this.containerDiv);
    }
  }
  draw() {
    const divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
    const display = Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ? 'block' : 'none';

    // if (display === 'block') {
    this.containerDiv.style.left = divPosition.x + 'px';
    this.containerDiv.style.top = divPosition.y + 'px';
    // }

    // if (this.containerDiv.style.display !== display) {
    //   this.containerDiv.style.display = display;
    // }
  }
}
