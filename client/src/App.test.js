import { configure, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from "../src/App"
const { expect } = require("chai")
configure({adapter: new Adapter()});


xdescribe('App', () => {
  let wrapper = shallow(<App/>)
    it("should be a function", () => {
      expect(App).to.be.a("function")
    })
    it("should render a div", () => {
      expect(wrapper.find('div'));
    }) 
    it("should render Route tag", () => {
      expect(wrapper.find('Route'));
    }) 
})