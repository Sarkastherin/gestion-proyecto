import { Modal } from "../Modal";
import {ArchiveBoxIcon, CheckCircleIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline";
import ReactLoading from "react-loading";

export const ModalLoading = ({ id,title }) => {
    
    return (
      <Modal
        modalId={id}
        variant="primary"
        title={title}
        icon={<CloudArrowUpIcon width={"24px"} />}
        disableXButton={true}
      >
        <div className="mx-auto mt-4">
          <ReactLoading
            type={"spin"}
            color=""
            className="mx-auto fill-indigo-500"
          />
        </div>
      </Modal>
    );
  };
  export const ModalSuccess = ({ title, id, children }) => {
    return (
      <Modal
        modalId={id}
        title={title}
        variant="success"
      >
        {children}
      </Modal>
    );
  };