import '@testing-library/jest-dom';

const { TextDecoder, TextEncoder } = require('util');

Object.assign(global, { TextDecoder, TextEncoder });

// react-scripts uses Jest 27, whose resolver does not understand the
// `react-router/dom` package export introduced by React Router 7.
const mockRouterDomPath = `${process.cwd()}/node_modules/react-router/dist/development/dom-export.js`;
jest.mock('react-router/dom', () => require(mockRouterDomPath), { virtual: true });
