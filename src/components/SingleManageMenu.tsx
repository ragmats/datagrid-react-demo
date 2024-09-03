import { Dispatch, SetStateAction } from "react";
import { Delivery } from "../types";

type SingleManageMenuProps = {
  rowId: number | null;
  setDeliveries: Dispatch<SetStateAction<Delivery[] | null>>;
  setShowSingleManageMenu: (value: boolean) => void;
  setShowChangeDelivery: (value: boolean) => void;
};

export default function SingleManageMenu({
  rowId,
  setDeliveries,
  setShowSingleManageMenu,
  setShowChangeDelivery,
}: SingleManageMenuProps) {
  function handleVerifyClick() {
    // Verify delivery with given row Id
    const today = new Date().toLocaleDateString("en-CA");
    console.log(today);
    if (rowId) {
      setDeliveries((currentDeliveries: Delivery[] | null) => {
        if (currentDeliveries) {
          return currentDeliveries.map((delivery) => {
            if (delivery === currentDeliveries[rowId - 1]) {
              return { ...delivery, verDate: today };
            } else return delivery;
          });
        } else return currentDeliveries;
      });
    }
    closeSingleManageMenu();
  }

  function handleRemoveClick() {
    if (rowId) {
      setDeliveries((currentDeliveries: Delivery[] | null) => {
        if (currentDeliveries) {
          return currentDeliveries.filter(
            (delivery) => delivery !== currentDeliveries[rowId - 1]
          );
        } else return currentDeliveries;
      });
    }
    closeSingleManageMenu();
  }

  function handleChangeClick() {
    setShowChangeDelivery(true);
    closeSingleManageMenu();
  }

  function closeSingleManageMenu() {
    // Close singleManageMenu
    setShowSingleManageMenu(false);
  }

  return (
    <div className="single-manage-menu">
      <p>(Temporary menu not yet positioned)</p>
      <div className="single-manage-btn-container">
        <button onClick={handleChangeClick}>Change</button>
        <button onClick={handleVerifyClick}>Verify</button>
        <button onClick={handleRemoveClick}>Remove</button>
        <button onClick={closeSingleManageMenu}>Cancel</button>
      </div>
    </div>
  );
}
