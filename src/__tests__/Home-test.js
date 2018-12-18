import React from 'react';
import Home from '../Containers/Home';
import renderer from 'react-test-renderer';
import App from '../../App';
import requestBasicData from '../__mocks__/request-basicData';
import requestCustomData from '../__mocks__/request-customData';
import FetchBasicData from "../Actions/FetchBasicData";


test('renders correctly', () => {
  const tree = renderer.create(<App><Home /></App>).toJSON();
  expect(tree).toMatchSnapshot();
});

// jest.mock('../Actions/FetchBasicData');
it('fetches basic business data and renders it on mount', () => {
    const lat = 41.8781;
    const lon = -87.6298;
    return requestBasicData(lat, lon).then(data => expect(data.name).toBe('McDonalds'))
});

it('fetches custom business data and renders it', () => {
    const lat = 41.8781;
    const lon = -87.6298;
    const term = 'McDonalds';
    return requestCustomData(term, lat, lon).then(data => expect(data.id).toBe(1))
});

