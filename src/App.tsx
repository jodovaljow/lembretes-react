import { Provider } from 'react-redux';

import Menu from './components/Menu';
import store from './redux/store';

function App() {

  return (
    <Provider store={store}>

      <Menu></Menu>
    </Provider>
  );
}

export default App;
