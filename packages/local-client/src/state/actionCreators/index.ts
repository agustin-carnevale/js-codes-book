import { ActionType } from '../actionTypes';
import { Dispatch } from 'redux';
import { CellType, Cell } from '../cell';
import axios from 'axios';
import bundle from '../../bundler';
import { 
    Action,
    Direction,
    UpdateCellAction, 
    MoveCellAction, 
    DeleteCellAction, 
    InsertCellBeforeAction,
} from '../actions';
import { RootState } from '../reducers';

export const updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id,
            content
        }
    };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id,
            direction
        }
    };
};

export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: id
    };
};

export const insertCellBefore = (id: string | null, type: CellType): InsertCellBeforeAction => {
    return {
        type: ActionType.INSERT_CELL_BEFORE,
        payload: {
            id,
            type
        }
    };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId
      }
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result
      }
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FETCH_CELLS,
    });

    try {
      const {data}: {data: Cell[]} = await axios.get('/cells');

      dispatch({
        type: ActionType.FETCH_CELLS_SUCCESS,
        payload: data
      });

    } catch (error) {
      dispatch({
        type: ActionType.FETCH_CELLS_ERROR,
        payload: error.message
      });
    }

  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { cells: { data, order} } = getState();
    const cells = order.map(id => data[id]);

    try {
      await axios.post('/cells', {
        cells
      });

    } catch (error) {
      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: error.message
      });
    }
  };
};