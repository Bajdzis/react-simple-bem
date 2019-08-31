/* global beforeEach, require */
const jasmineEnzyme = require('jasmine-enzyme'); 
const { configure } = require('enzyme'); 
const Adapter = require('enzyme-adapter-react-16'); 

configure({ adapter: new Adapter() });

beforeEach(() => {
    jasmineEnzyme();
});
