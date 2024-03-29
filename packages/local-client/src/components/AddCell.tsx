import { useActions } from '../hooks/useActions';
import './add-cell.css';

interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId, forceVisible }) => {
  const { insertCellBefore } = useActions();

  return <div className={`add-cell ${forceVisible && 'force-visible'}`}>
    <div className="add-buttons">
      <button className="button is-primary is-rounded is-small" onClick={()=> insertCellBefore(nextCellId, 'code')}>
        <span className="icon is-small">
          <i className="fas fa-plus"/>
        </span>
        <span>Code</span>
      </button>
      <button className="button is-primary is-rounded is-small" onClick={()=> insertCellBefore(nextCellId, 'text')}>
        <span className="icon is-small">
          <i className="fas fa-plus"/>
        </span>
        <span>Text</span>
      </button>
    </div>
    <div className="divider"/>
  </div> 
}

export default AddCell;