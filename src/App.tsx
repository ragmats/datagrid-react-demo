import { useEffect, useState } from "react";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import "./App.css";
import data from "./data/data.json";
import DataGridForDeliveries from "./components/DataGridForDeliveries";
import { Delivery } from "./types";
import Calendar from "./components/Calendar";
import AddOrChangeDelivery from "./components/AddOrChangeDelivery";

// TODO Remove sorting, sort by Ful Date + Delivery ID

// "Done":
// Add "Add" button
// Add "Add" modal
// Add "Change" modal
// Add col w/ Manage button
// Add single manage modal
// addDelivery function
// changeDelivery function
// deleteSingleDelivery function
// deleteMultipleDelivery function
// verifySingleDelivery function
// verifyMultipleDelivery function

export default function App() {
  const [deliveries, setDeliveries] = useState<Delivery[] | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAddDelivery, setShowAddDelivery] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>(
    []
  );

  useEffect(() => {
    if (data) {
      setDeliveries(data);
    }
  }, []);

  useEffect(() => {
    console.log(selectedRowIds);
  }, [selectedRowIds]);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const buttonId = (e.target as HTMLButtonElement).id;
    if (buttonId === "calendar") setShowCalendar(true);
    else if (buttonId === "manage") setShowCalendar(false);
  }

  function handleAddClick() {
    setShowAddDelivery(true);
  }

  function verifySelectedRows() {
    const today = new Date().toLocaleDateString("en-CA");
    setDeliveries((currentDeliveries: Delivery[] | null) => {
      if (currentDeliveries) {
        return currentDeliveries.map((delivery, index) => {
          if (selectedRowIds.includes(index + 1)) {
            return { ...delivery, verDate: today };
          } else return delivery;
        });
      } else return currentDeliveries;
    });
  }

  function removeSelectedRows() {
    setDeliveries((currentDeliveries: Delivery[] | null) => {
      if (currentDeliveries) {
        return currentDeliveries.filter(
          (_, index) => !selectedRowIds.includes(index + 1)
        );
      } else return currentDeliveries;
    });
  }

  return (
    <>
      <div className="header">
        <div className="header-left">
          <h1>Schedule</h1>
          <div className="header-left-btns">
            <button id="calendar" onClick={handleClick}>
              CALENDAR
            </button>
            <button id="manage" onClick={handleClick}>
              MANAGE
            </button>
            {selectedRowIds.length > 0 ? (
              <>
                <button
                  className="btn-verify"
                  id="verify"
                  onClick={verifySelectedRows}
                >
                  VERIFY
                </button>
                <button
                  className="btn-remove"
                  id="remove"
                  onClick={removeSelectedRows}
                >
                  REMOVE
                </button>
              </>
            ) : null}
          </div>
        </div>
        <div className="header-right">
          <button onClick={handleAddClick}>Add</button>
        </div>
      </div>
      {showCalendar ? (
        <Calendar />
      ) : (
        <DataGridForDeliveries
          deliveries={deliveries}
          setDeliveries={setDeliveries}
          setSelectedRowIds={setSelectedRowIds}
        />
      )}
      {showAddDelivery ? (
        <AddOrChangeDelivery
          action="add"
          setShowAddOrChangeDelivery={setShowAddDelivery}
          setDeliveries={setDeliveries}
        />
      ) : null}
    </>
  );
}
