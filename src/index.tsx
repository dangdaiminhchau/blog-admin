import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from "react-redux";
import { store } from "./store";
import { ConfigProvider } from 'antd';
import vi_VN from 'antd/locale/vi_VN';




ReactDOM.createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <ConfigProvider locale={vi_VN}>
      <App />
    </ConfigProvider>
  </Provider >

)
