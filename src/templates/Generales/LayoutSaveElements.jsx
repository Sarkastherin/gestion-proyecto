import Container from "../../components/Generals/Container";
import { BoxComponentScrolling } from "../../components/BoxComponent";
import { useState } from "react";
import { Modal } from "../../components/Modal";
import { ModalLoading } from "../../components/Generals/ModalsTypes";
import { Button } from "../../components/Buttons";
export default function LayoutSaveElement({
  hedearTitle,
  backTo,
  form,
  modalLoadingTitle,
  modalResponsetextButton,
  handleResponseButtonClick,
  response,
}) {
  return (
    <>
      <Container text={hedearTitle} to={backTo}>
        <BoxComponentScrolling
          title={hedearTitle}
          height="calc(100vh - 10rem)"
        >
          <div className="mt-4">{form}</div>
          <ModalLoading
            id={"modal-loading"}
            title={modalLoadingTitle}
          />
        </BoxComponentScrolling>
      </Container>
      {response && (
        <Modal
          modalId={"modal-response"}
          title={
            response.type === "success" ? "¡Todo marcha bien!" : "Algo anda mal"
          }
          variant={response.type}
        >
          <div className="flex flex-col gap-4">
            {response.message}
            <Button
              className="max-w-50 mx-auto"
              text={modalResponsetextButton}
              variant={"primary"}
              onClick={handleResponseButtonClick}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
