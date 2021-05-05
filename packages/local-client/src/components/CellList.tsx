import './cell-list.css';
import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state';
import AddCell from './AddCell';
import CellListItem from './CellListItem';
import { useActions } from '../hooks/useActions';

const CellList: React.FC = () => {
  const { fetchCells } = useActions();
  const cells = useSelector((state: RootState) => {
    const { order, data } = state.cells;
    return order.map(id => {
        return data[id];
    });
  });

  useEffect(() => {
    fetchCells();
  }, []);


    const renderCells = () => cells.map(cell => 
      <Fragment key={cell.id} >
        <AddCell nextCellId={cell.id}/>
        <CellListItem cell={cell} />
      </Fragment>
    );

    return <div className="cell-list">
      {renderCells()}
      <AddCell forceVisible={cells.length === 0} nextCellId={null}/>
    </div>;
}

export default CellList;