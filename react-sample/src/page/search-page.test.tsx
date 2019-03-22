import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SearchPage from './Search-page';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchPage pageLoading={()=>{}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
