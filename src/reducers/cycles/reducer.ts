import { produce } from "immer";
import { ActionTypes } from "./actions";

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      // COM IMMER
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });

    // O IMMER transforma uma váriavel imutável em uma váriavel mutável, ele cria um rascunho e compila as alterações transformando a em um código limpo
    // Ele transorma esse código em um código limpo seguindo os padrões da imutábilidade.

    // Sem IMMERJS
    // return {
    //   ...state,
    //   cycles: [...state.cycles, action.payload.newCycle],
    //   activeCycleId: action.payload.newCycle.id,
    // };

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (!currentCycleIndex) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
      });

      // SEM IMMER
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, interruptedDate: new Date() };
      //     } else {
      //       return cycle;
      //     }
      //   }),
      //   activeCycleId: null,
      // };
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.find(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (!currentCycleIndex) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        currentCycleIndex.finishedDate = new Date();
      });

      // SEM IMMER
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, finishedDate: new Date() };
      //     } else {
      //       return cycle;
      //     }
      //   }),
      //   activeCycleId: null,
      // };
    }

    default:
      return state;
  }
}
