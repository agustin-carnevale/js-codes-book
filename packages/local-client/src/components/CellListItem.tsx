import './cell-list-item.css';
import React from 'react';
import { Cell } from '../state';
import ActionBar from './ActionBar';
import CodeCell from './CodeCell';
import TextEditor from './TexEditor';

interface CellListItemProps {
    cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
    let child: JSX.Element;

    if(cell.type ==='code'){
        child= 
        <>
            <div className="action-bar-wrapper">
                <ActionBar id={cell.id}/>
            </div>
            <CodeCell cell={cell}/>
        </>
    }else{
        child=
        <>
            <TextEditor cell={cell}/>
            <ActionBar id={cell.id}/>
        </>
    }

    return <div className="cell-list-item">
        {child}
    </div>;
}

export default CellListItem;