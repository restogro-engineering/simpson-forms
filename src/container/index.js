import "./index.scss";
import Header from "../core/header";
const MainContainer = ({ children }) => {
  return (
    <div className='main-container'>
      {/* <div className='main-left-container'>left</div> */}
      <div className='main-right-container'>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default MainContainer;
