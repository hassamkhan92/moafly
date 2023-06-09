import Vue from 'vue';
import {
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Radio,
  Tabs,
  TabPane,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Select,
  Option,
  Button,
  DatePicker,
  TimeSelect,
  TimePicker,
  Form,
  FormItem,
  Icon,
  //   Message,
  Avatar,
  Collapse,
  CollapseItem,
  Row,
  Col,
  Upload,
  Notification,
  Loading,
  Autocomplete,
  Popover,
  InputNumber,
  MessageBox,
  Image,
  Scrollbar,
  Menu,
  Submenu,
  Table,
  TableColumn,
  Pagination,
  MenuItem,
  MenuItemGroup,
  Switch,
  Card,
  Carousel,
  CarouselItem,
  Progress,
  Rate,
  Divider,
  Drawer,
  Tree,
  Timeline,
  TimelineItem,
  Tooltip,
  Empty,
  Skeleton,
  SkeletonItem,
  Slider,
  Steps
} from 'element-ui';
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Icon);
Vue.use(Avatar);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Autocomplete);
Vue.use(Popover);
Vue.use(InputNumber);
Vue.use(Image);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Scrollbar);
Vue.use(Menu);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Switch);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Progress);
Vue.use(Rate);
Vue.use(Divider);
Vue.use(Drawer);
Vue.use(Tree);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Tooltip);
Vue.use(Empty);
Vue.use(Skeleton);
Vue.use(SkeletonItem);
Vue.use(Slider);
Vue.use(Steps);
Vue.use(Loading.directive);
Vue.prototype.$notify = Notification;
// Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
locale.use(lang);
Vue.prototype.$loading = {
  loading: null,
  open(params) {
    let option = {
      // 声明一个loading对象
      lock: true, // 是否锁屏
      text: 'loading...', // 加载动画的文字
      spinner: 'el-icon-loading', // 引入的loading图标
      background: 'rgba(0, 0, 0, 0.7)', // 背景颜色
      target: '.sub-main', // 需要遮罩的区域
      body: true,
      customClass: 'mask' // 遮罩层新增类名
    };
    this.loading = Loading.service(Object.assign(option, params));
    // setTimeout(() => {
    //   // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    //   this.loading.close(); // 关闭遮罩层
    // }, 5000);
  },
  close() {
    this.loading.close();
  }
};
