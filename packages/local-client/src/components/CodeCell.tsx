import './code-cell.css';
import { useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import { Cell, RootState } from '../state';
import { useActions } from '../hooks/useActions';
import { useSelector } from 'react-redux';
import { useCumulativeCode } from '../hooks/useCumulativeCode';

interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useSelector((state: RootState) => state.bundles[cell.id]);
    const cumulativeCode = useCumulativeCode(cell.id);

    useEffect(() => {
      if(!bundle){
        createBundle(cell.id, cumulativeCode);
        return;
      }
        const timer = setTimeout(async ()=>{
          createBundle(cell.id, cumulativeCode);
        }, 800);

        return () => {
          clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cell.id, cumulativeCode, createBundle]);

    return <Resizable direction='vertical'>
        <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
            <Resizable direction="horizontal">
                <CodeEditor 
                    initialValue={cell.content}
                    onChange={(code)=> updateCell(cell.id, code)}
                />
            </Resizable>
            <div className="progress-wrapper">
              {(!bundle || bundle.loading)
                ? <div className="progress-cover">
                    <progress className="progress is-small is-primary" max="100">
                      Loading
                    </progress>
                  </div>
                : <Preview code={bundle.code} error={bundle.err}/>
              }
            </div>
       </div>
    </Resizable>
};

export default CodeCell;