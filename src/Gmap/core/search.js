/*
 * @Author: zulezhe
 * @Date: 2022-01-12 21:41:51
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-05-18 22:56:29
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import Is from '../utils/is';
/**
 * 搜索查询地址
 * @param {*} map
 * @param {*} el 搜索框id
 * @return    返回地址 和places对象
 */
export function handleSearch(map, el, callback) {
  const input = document.getElementById(el);
  const searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // map.addListener('bounds_changed', () => {
  //   searchBox.setBounds(map.getBounds());
  // });
  let markers = [];
  searchBox.addListener('places_changed', () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    // 清除旧标记。
    markers.forEach(marker => {
      marker.setMap(null);
    });
    markers = [];
    // 对于每个地方，获取图标，名称和位置。
    const bounds = new google.maps.LatLngBounds();
    places.forEach(place => {
      if (!place.geometry) {
        return;
      }
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      // 为每个地方创建一个标记。
      markers.push(
        new google.maps.Marker({
          map: map,
          icon,
          title: place.name,
          position: place.geometry.location
        })
      );
      if (place.geometry.viewport) {
        // 只有地理编码具有视口。.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    callback(places[0].formatted_address, places);
  });
}
/**
 * 输入地址关键字联想地址
 * @param {*} el  input元素或id
 * @param {*} callback 回调函数
 */
export function autoSearch(el, map, callback) {
  const autocomplete = new google.maps.places.Autocomplete(el, {
    componentRestrictions: { country: ['us'] }
    // fields: ['address_components', 'geometry']
    // types: ['address']
    // types: ['address', 'postal_code']
  });
  autocomplete.addListener('place_changed', () => {
    // 获取地址
    const place = autocomplete.getPlace();
    const bounds = new google.maps.LatLngBounds();
    console.log('place===>', place);

    let result = {
      address: '',
      postcode: ''
    };
    for (const component of place.address_components) {
      const componentType = component.types[0];
      // console.log('componentType===>', componentType);
      switch (componentType) {
        case 'street_number': {
          result.address = `${component.long_name} `;
          break;
        }

        case 'route': {
          result.address += component.short_name;
          break;
        }

        case 'postal_code': {
          result.postcode = `${component.long_name}${result.postcode}`;
          break;
        }

        case 'postal_code_suffix': {
          result.postcode = `${result.postcode}-${component.long_name}`;
          break;
        }

        case 'locality':
          result.locality = component.long_name;
          break;

        case 'administrative_area_level_1': {
          result.state = component.short_name;
          break;
        }

        case 'country':
          result.country = component.long_name;
          break;
      }
    }
    if (place.geometry.viewport) {
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
    result.bounds = bounds;
    map.fitBounds(bounds);
    callback(result, place);
  });
}
