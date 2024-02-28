import FSM from '../fsm/fsm';

describe('FSM', () => {
  let fsm;
    
  beforeAll(() => {
    fsm = new FSM('start');
  });

  test('should initialize with the correct initial state', () => {
    expect(fsm.getCurrentState()).toBe('start');
  });

  test('should add a new state and transition to the new state', () => {
    const nextState = 'nextState';
    const state = { transitions: { next: nextState } };
    fsm.addState(nextState, state);
    fsm.transitionTo(nextState);
    expect(fsm.getCurrentState()).toBe(nextState);
  });

  test('should throw an error if transitioning to a non-existent state', () => {
    const nonExistentState = 'nonExistentState';
    expect(() => fsm.transitionTo(nonExistentState)).toThrow(`State '${nonExistentState}' does not exist.`);
  });
});
