import produce from 'immer';
import { ActionType } from '../actionTypes';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell;
    }
}
const initialState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {}
}

const reducer = produce((state: CellsState = initialState, action: Action): CellsState => {
    switch(action.type){
        case ActionType.INSERT_CELL_BEFORE:
            const newCell: Cell = {
                id: randomID(),
                content: '',
                type: action.payload.type
            };

            state.data[newCell.id] = newCell;

            const idx = state.order.findIndex(id => id === action.payload.id);
            if(idx < 0){
                state.order.push(newCell.id);
            }else{
                state.order.splice(idx, 0, newCell.id);
            }
            return state;

        case ActionType.UPDATE_CELL:
            const { id, content } = action.payload;
            state.data[id].content = content;
            return state;

        case ActionType.MOVE_CELL:
            const { direction } = action.payload;
            const index = state.order.findIndex((id)=> id === action.payload.id);
            const targetIndex = direction === 'up' ? index -1 : index + 1;
            if(targetIndex < 0 || targetIndex > state.order.length - 1) return state;

            state.order[index] = state.order[targetIndex];
            state.order[targetIndex] = action.payload.id;
            return state;

        case ActionType.DELETE_CELL:
            delete state.data[action.payload];
            state.order = state.order.filter(id => id !== action.payload);
            return state;

        case ActionType.FETCH_CELLS:
          state.loading = true;
          state.error = null;
          return state;

        case ActionType.FETCH_CELLS_SUCCESS:
          state.loading = false;
          state.order = action.payload.map(cell => cell.id);
          state.data = action.payload.reduce((acc,cell)=>{
            acc[cell.id] = cell;
            return acc;
          }, {} as CellsState['data']);
          return state;

        case ActionType.FETCH_CELLS_ERROR:
          state.loading = false;
          state.error = action.payload;
          return state;

        case ActionType.SAVE_CELLS_ERROR:
          state.error = action.payload;
          return state;

        default:
          return state;
    }
});

const randomID = () => {
    return Math.random().toString(36).substr(2, 5);
}

export default reducer;