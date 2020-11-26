import { shallowMount, createLocalVue } from '@vue/test-utils';
import SideBar from './SideBar';
import Vuex from 'vuex';


let wrapper;
let store;
let actions;
let mutations;
let state;
const localVue = createLocalVue();
localVue.use(Vuex);

beforeEach(() => {
    actions = {
        someAction: jest.fn()
    };
    mutations = {
        someMutation: jest.fn()
    };
    state = {
        key: {}
    };
    store = new Vuex.Store({
        actions,
        mutations,
        state,
    });
    wrapper = shallowMount(SideBar, {
        propsData: {},
        mocks: {},
        stubs: {},
        methods: {},
        store,
        localVue,
    });
});

afterEach(() => {
    wrapper.destroy();
});

describe('SideBar', () => {
    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test('has side-bar class', () => {
      expect(wrapper.find('.side-bar')).toBeTruthy();
    });

});
