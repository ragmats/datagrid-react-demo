import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Delivery } from "../types";
import SingleManageMenu from "./SingleManageMenu";
import AddOrChangeDelivery from "./AddOrChangeDelivery";

type DataGridForDeliveriesProps = {
  deliveries: Delivery[] | null;
  setDeliveries: Dispatch<SetStateAction<Delivery[] | null>>;
  setSelectedRowIds: Dispatch<SetStateAction<GridRowSelectionModel>>;
};

export default function DataGridForDeliveries({
  deliveries,
  setDeliveries,
  setSelectedRowIds,
}: DataGridForDeliveriesProps) {
  const columns: GridColDef[] = [
    {
      field: "manage",
      headerName: "MANAGE",
      width: 125,
      renderCell: (params) => (
        <div className="manage-btn-container">
          <button onClick={() => handleClick(params.row.id)}>▼</button>
        </div>
      ),
    },
    { field: "delId", headerName: "DEL ID", width: 125 },
    { field: "delName", headerName: "DEL NAME", width: 150 },
    { field: "fulDate", headerName: "FUL DATE", width: 150 },
    { field: "volUp", headerName: "VOL UP", width: 125 },
    { field: "verDate", headerName: "VER DATE", width: 150 },
    { field: "customer", headerName: "CUST. FG. ETC", width: 275 },
  ];

  const [rows, setRows] = useState<GridRowsProp>([]);
  const [singleSelectedRowId, setSingleSelectedRowId] = useState<number | null>(
    null
  );
  const [showSingleManageMenu, setShowSingleManageMenu] = useState(false);
  const [showChangeDelivery, setShowChangeDelivery] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  useEffect(() => {
    // console.log("rowSelectionModel: ", rowSelectionModel);
    setSelectedRowIds(rowSelectionModel);
  }, [rowSelectionModel]);

  useEffect(() => {
    if (deliveries) {
      setRows(
        deliveries.map((delivery, idx) => {
          return {
            id: idx + 1,
            delId: idx + 1,
            delName: delivery.name,
            fulDate: delivery.fulDate,
            volUp: delivery.volUp ? "Yes" : "No",
            verDate: delivery.verDate,
            customer: delivery.customer,
          };
        })
      );
    }
  }, [deliveries]);

  function handleClick(rowId: number) {
    console.log("row ID: ", rowId);
    setSingleSelectedRowId(rowId);
    setShowSingleManageMenu(!showSingleManageMenu);
  }

  return (
    <>
      {showSingleManageMenu ? (
        <SingleManageMenu
          rowId={singleSelectedRowId}
          setDeliveries={setDeliveries}
          setShowSingleManageMenu={setShowSingleManageMenu}
          setShowChangeDelivery={setShowChangeDelivery}
        />
      ) : null}
      {showChangeDelivery && singleSelectedRowId ? (
        <AddOrChangeDelivery
          action="change"
          setShowAddOrChangeDelivery={setShowChangeDelivery}
          setDeliveries={setDeliveries}
          rowId={singleSelectedRowId}
          deliveries={deliveries}
        />
      ) : null}
      <div style={{ height: "calc(100svh - 120px)", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={!deliveries}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          disableRowSelectionOnClick
          autoPageSize
        />
      </div>
    </>
  );
}
