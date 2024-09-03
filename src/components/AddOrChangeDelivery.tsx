import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Delivery } from "../types";

type AddOrChangeDeliveryProps = {
  action: string;
  setShowAddOrChangeDelivery: (value: boolean) => void;
  setDeliveries: Dispatch<SetStateAction<Delivery[] | null>>;
  rowId?: number;
  deliveries?: Delivery[] | null;
};

export default function AddOrChangeDelivery({
  action,
  setShowAddOrChangeDelivery,
  setDeliveries,
  rowId,
  deliveries,
}: AddOrChangeDeliveryProps) {
  const [fulDate, setFulDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [volUp, setVolUp] = useState(false);
  const [showFormError, setShowFormError] = useState(false);
  const [delivery, setDelivery] = useState<Delivery | null>(null);

  useEffect(() => {
    if (deliveries && rowId) {
      setDelivery(deliveries[rowId - 1]);
    }
  }, [deliveries, rowId]);

  useEffect(() => {
    if (delivery) {
      setFulDate(delivery.fulDate);
      setCustomer(delivery.customer);
      setVolUp(delivery.volUp);
    }
  }, [delivery]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (fulDate && customer) {
      // Add new delivery
      if (action === "add") {
        const newDelivery = {
          name: "nameX",
          fulDate: fulDate,
          volUp: volUp,
          verDate: null,
          customer: customer,
        };
        setDeliveries((currentDeliveries: Delivery[] | null) => {
          return [...(currentDeliveries || []), newDelivery];
        });
        // Save changed delivery
      } else if (action === "change") {
        const changedDelivery = {
          name: "nameX",
          fulDate: fulDate,
          volUp: volUp,
          verDate: delivery?.verDate ? delivery.verDate : null,
          customer: customer,
        };

        if (rowId) {
          setDeliveries((currentDeliveries: Delivery[] | null) => {
            if (!currentDeliveries) return null;
            return currentDeliveries?.map((delivery) => {
              if (delivery === currentDeliveries[rowId - 1])
                return changedDelivery;
              else return delivery;
            });
          });
        }
      }
      // Close the modal once done adding or saving changes
      setShowAddOrChangeDelivery(false);
      // Show form error if fulDate or customer are missing
    } else setShowFormError(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputId = (e.target as HTMLInputElement).id;
    const inputValue = e.target.value;
    if (inputId === "fulDate") setFulDate(inputValue);
    else if (inputId === "delivery") setCustomer(inputValue);
    else if (inputId === "volUpYes") setVolUp(true);
    else if (inputId === "volUpNo") setVolUp(false);
  }

  return (
    <div className="add-or-change-delivery">
      <h1>{action === "add" ? "Add Delivery" : "Change Delivery"}</h1>

      <form className="add-or-change-delivery-form" onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="fulDate">FULFILLMENT</label>
          <input
            id="fulDate"
            placeholder="2024-08-22"
            onChange={handleChange}
            value={fulDate}
          />
        </div>
        <div className="form-item">
          <label htmlFor="delivery">DELIVERIES</label>
          <input
            id="delivery"
            placeholder="search..."
            onChange={handleChange}
            value={customer}
          />
        </div>
        <div className="form-item">
          <label htmlFor="volUpYes">VOLUME UPGRADE</label>
          <input
            type="radio"
            id="volUpYes"
            name="volUp"
            value="yes"
            onChange={handleChange}
            checked={volUp === true}
          />
          <label htmlFor="volUpYes">Yes</label>
          <input
            type="radio"
            id="volUpNo"
            name="volUp"
            value="no"
            onChange={handleChange}
            checked={volUp === false}
          />
          <label htmlFor="volUpNo">No</label>
        </div>
        <div className="form-btns">
          <button type="submit">
            {action === "add" ? "Add" : "Save Changes"}
          </button>
          <button onClick={() => setShowAddOrChangeDelivery(false)}>
            Cancel
          </button>
        </div>
      </form>
      {showFormError ? (
        <p className="form-error">Please fill in the missing fields.</p>
      ) : null}
    </div>
  );
}
