import { Provider } from 'react-redux';

import { TaskList, Menu } from './components';

import store from './redux/store';

function App() {

  return (
    <Provider store={store}>

      <Menu></Menu>
      <TaskList></TaskList>
    </Provider>
  );
}

export default App;
