import {Modal } from "flowbite-react";
import { ReactNode } from "react";

type Props = {
  title: string;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
};

export const ModalForm = ({
  openModal = false,
  setOpenModal,
  title,
  children,
}: Props) => {
  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            {children}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
