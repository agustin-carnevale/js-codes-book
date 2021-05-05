import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/CellList';

const App = () => {
    return <div style={{padding: "15px"}}>
      <CellList />
    </div>
};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);