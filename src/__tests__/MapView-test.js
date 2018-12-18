import React from 'react';
import Home from '../Containers/Home';
import renderer from 'react-test-renderer';
import App from '../../App';
import MapView from '../Components/MapView';

test('renders correctly', () => {
  const tree = renderer.create(<App><Home><MapView /></Home></App>).toJSON();
  expect(tree).toMatchSnapshot();
});
