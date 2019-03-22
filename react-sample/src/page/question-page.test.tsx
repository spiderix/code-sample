import * as React from 'react';
import * as ReactDOM from 'react-dom';
import QuestionPage from './Question-page';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QuestionPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
