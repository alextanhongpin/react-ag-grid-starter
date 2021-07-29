import { useRef } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function App() {
  const gridRef = useRef(null);
  const rowData = [
    { make: { value: "Toyota" }, model: "Celica", price: 350000 },
    { make: { value: "Ford" }, model: "Mondeo", price: 320000 },
    { make: { value: "Porsche" }, model: "Boxter", price: 720000 },
  ];

  const handleClick = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringRepresentation = selectedData
      .map((node) => `${node.make} ${node.model}`)
      .join(", ");
    window.alert(selectedDataStringRepresentation);
  };
  const handleCellValueChanged = (e) => console.log(e);
  const makeValueGetter = (params) => params.data.make.value;
  const makeValueSetter = (params) => {
    if (params.newValue.startsWith("HAHA")) {
      return false;
    }
    params.data.make.value = params.newValue;
    return true;
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 540 }}>
      <button onClick={handleClick}>Get selected rows</button>
      <AgGridReact
        ref={gridRef}
        rowSelection="multiple"
        rowData={rowData}
        enableMultiRowDragging={true}
        defaultColDef={{
          sortable: true,
          filter: true,
        }}
        rowDragManaged={true}
        animateRows={true}
      >
        <AgGridColumn
          field="make"
          checkboxSelection={true}
          rowDrag={true}
          editable={true}
          onCellValueChanged={handleCellValueChanged}
          valueGetter={makeValueGetter}
          valueSetter={makeValueSetter}
        ></AgGridColumn>
        <AgGridColumn field="model"></AgGridColumn>
        <AgGridColumn field="price"></AgGridColumn>
      </AgGridReact>
    </div>
  );
}

export default App;
