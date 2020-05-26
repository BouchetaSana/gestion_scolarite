import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'matricule', field: 'matricule' },
      { title: 'Name', field: 'name' },
      { title: 'note', field: 'note' },
    
    
    ],
    data: [
     
      { matricule: '17/179', name: 'Ibtissem Khedim', },
      { matricule: '17/180', name: 'Sana boucheta', },
      { matricule: '17/145', name: 'Zahoua amoura', },

      
    ],
  });

  return (
    <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        
      }}
    />
  );
}