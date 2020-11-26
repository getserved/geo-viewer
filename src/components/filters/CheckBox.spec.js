import { shallowMount, createLocalVue } from '@vue/test-utils';
import CheckBox from './CheckBox';
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
    wrapper = shallowMount(CheckBox, {
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

describe('CheckBox', () => {
    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test('has check-box class', () => {
      expect(wrapper.find('.check-box')).toBeTruthy();
    });

    test('switch button mutation', () => {
      wrapper.find('button').trigger('click')
      expect(mutations.MUTATION.mock.calls).toHaveLength(1)
    });
});
