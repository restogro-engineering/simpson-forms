/** @format */

import SideMenu from '../core/side-menu';
import './index.scss';
import Header from '../core/header';
import { NESTED_MENU_LIST } from '../core/side-menu/config';
import WaterMark from '../resources/icons/watermark.png';
const MainContainer = ({ children }) => {
  return (
    <div className='main-container'>
      <img src={WaterMark} className='water-mark' />
      <div className='main-left-container si-hide-mobile'>
        <SideMenu options={NESTED_MENU_LIST} onMenuCLick={() => {}} />
      </div>
      <div className='si-hide-web'>
        <Header />
      </div>
      <div className='main-right-container'>{children}</div>
    </div>
  );
};

export default MainContainer;
