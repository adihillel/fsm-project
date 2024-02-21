interface StateTransitions {
  next?: string;
}

interface State {
  transitions: StateTransitions;
}

interface States {
  [key: string]: State;
}

class FSM {
  private currentState: string;
  private states: States;

  constructor(initialState: string) {
    this.currentState = initialState;
    this.states = {};
  }

  addState(name: string, state: State): void {
    this.states[name] = state;
  }

  transitionTo(newState: string): void {
    if (!this.states[newState]) {
      throw new Error(`State '${newState}' does not exist.`);
    }

    this.currentState = newState;
  }

  getCurrentState(): string {
    return this.currentState;
  }

  getState(): State {
    return this.states[this.currentState];
  }
}

export default FSM;
