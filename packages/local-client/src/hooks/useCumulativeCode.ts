import { useSelector } from "react-redux";
import { RootState } from "../state";

export const useCumulativeCode = (cellId: string) => {
  return useSelector((state: RootState)=>{
    const { data, order } = state.cells;
    const orderedCells = order.map(id => data[id]);

    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';

      var show = value => {
        const root = document.querySelector('#root');
        if(typeof value === 'object'){
          if(value.$$typeof && value.props){
            _ReactDOM.render(value, root);
          }else{
            root.innerHTML = JSON.stringify(value);
          }
        }else {
          root.innerHTML = value;
        }
      }
    `;
    const showFuncNoop = 'var show = () => {}';
    const cumulativeCodes = [];

    for (let c of orderedCells){
      if(c.type === 'code'){
        if( c.id === cellId){
          cumulativeCodes.push(showFunc);
        }else{
          cumulativeCodes.push(showFuncNoop);
        }
        cumulativeCodes.push(c.content);
      }
      if( c.id === cellId){
        break;
      }
    }
    return cumulativeCodes.join('\n');
  });
}