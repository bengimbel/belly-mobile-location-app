import React from 'react';
import Home from '../Containers/Home';
import renderer from 'react-test-renderer';
import App from '../../App';
import ListView from '../Components/ListView';

test('renders correctly', () => {
  const tree = renderer.create(<App><Home><ListView /></Home></App>).toJSON();
  expect(tree).toMatchSnapshot();
  
});


