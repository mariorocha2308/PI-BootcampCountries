import { configure, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Main  from '../pages/main.jsx'
import Home  from '../pages/home.jsx'
const { expect } = require("chai")
configure({adapter: new Adapter()});

xdescribe('Main page', () => {
    let wrapper = shallow(<Main/>)
    it("should be a function", () => {
        expect(Main).to.be.a("function")
    })
    it("should render 2 div", () => {
        expect(wrapper.find('div'));
    }) 
    it("should render One h1", () => {
        expect(wrapper.find('h1'));
    }) 
    it("should render a Button", () => {
        expect(wrapper.find('button'));
    }) 
})

xdescribe('Home page', () => {
    let wrapper = shallow(<Home/>)
    it("should be a function", () => {
        expect(Home).to.be.a("function")
    })
    it("should render 2 div", () => {
        expect(wrapper.find('div'));
    }) 
    it("should render a label", () => {
        expect(wrapper.find('label'));
    })
    it("should render a button", () => {
        expect(wrapper.find('button'));
    }) 
    it("should render 2 h3", () => {
        expect(wrapper.find('h3'));
    })  
})