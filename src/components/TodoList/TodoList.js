import React, { useEffect, useState } from "react";
import { useGetMethod } from "../../Hooks/useFetch";
import { Line } from "../helpers/Line";
import "./TodoList.css";
import { FcCheckmark, FcExpired } from "react-icons/fc";
import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsPlusSquare,
} from "react-icons/bs";
import { convertDate, cutHour, isEmptyOrUndefined } from "../helpers/helpers";
import CustomModal from "../Modal/CustomModal";
import { CustomForm } from "../Form/CustomForm";
import { ShowDetails } from "../ShowDetails/ShowDetails";
import { CustomSpinner } from "./CustomSpinner";

export const TodoList = () => {
  const [modal, setModal] = useState({
    show: false,
    entry: null,
    data: null,
  });
  console.log("modal: ", modal);
  const {
    results: tasks,
    load: tasksLoader,
    trigger: getTasks,
  } = useGetMethod();

  useEffect(() => {
    getTasks({
      url: "/tasks",
      params: {
        order: "id",
      },
    });
  }, [getTasks]);

  const handleModalAction = () => {
    return alert("bien");
  };
  const handleShowModal = (data, entry) => {
    entry === "creating"
      ? setModal({ show: true, data: null, entry: entry })
      : setModal({ show: true, data: data, entry: entry });
  };
  const handleCloseModal = () => {
    setModal({ show: false, entry: null, data: null });
  };
  return (
    <>
      {/* /* ---------------------------------- Modal --------------------------------- */}
      <CustomModal
        title={modal.entry === "remove" ? "Eliminar Tarea" : modal?.data?.name}
        show={modal.show}
        btnYesName={
          modal.entry === "remove"
            ? "Eliminar"
            : modal.entry === "changeStatus"
            ? "Si,terminé"
            : "Guardar"
        }
        size={modal.entry === "detail" ? "lg" : ""}
        btnNoName={
          modal.entry === "detail"
            ? "Listo"
            : modal.entry === "changeStatus"
            ? "No,cancelar"
            : "Cancelar"
        }
        btnYesEvent={
          modal.entry === "detail" ? null : () => handleModalAction()
        }
        onHide={() => handleCloseModal()}
      >
        <div className="container">
          {modal.entry === "edit" && (
            <CustomForm {...modal.data} isEditing={true} />
          )}
          {modal.entry === "detail" && <ShowDetails {...modal.data} />}
          {modal.entry === "creating" && <CustomForm />}
          {modal.entry === "remove" && (
            <h4 className="mb-4 text-center text-secondary">{`¿Está seguro de eliminar la tarea ${modal.data?.name}`}</h4>
          )}
          {modal.entry === "changeStatus" && (
            <h4 className="mb-4 text-center text-info">
              ¿Terminaste esta tarea?
            </h4>
          )}
        </div>
      </CustomModal>

      <div className="container techStackSection">
        <div className="sectionTitle">
          <h5>Cosas que hacer </h5>
          <Line backgroundColor="green" width={"4.5rem"} />
        </div>
        {tasksLoader ? (
          <CustomSpinner />
        ) : (
          <>
            <div className="row">
              <div
                className="col-xl-4 col-lg-4 col-md-6 col-xs-12"
                data-toggle="tooltip"
                title={"Crear nueva tarea"}
              >
                <div
                  className={"techContent"}
                  onClick={() => handleShowModal("", "creating")}
                >
                  <div
                    className="d-flex justify-content-center "
                    style={{ padding: "5.2rem" }}
                  >
                    <BsPlusSquare size={40} color="rgb(61, 123, 145)" />
                  </div>
                </div>
              </div>

              {tasks.length > 0 &&
                tasks.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="col-xl-4 col-lg-4 col-md-6 col-xs-12"
                      data-toggle="tooltip"
                      title={e.description}
                    >
                      <div
                        className={"techContent"}
                        onClick={() => handleShowModal(e, "detail")}
                      >
                        <span className="d-flex justify-content-evenly">
                          <h3 className="text-center text-secondary">
                            {e.status ? <s>{e.name}</s> : e.name}
                          </h3>
                          {e.status ? (
                            <FcCheckmark size={40} />
                          ) : (
                            <FcExpired
                              title="Terminar"
                              className="iconHover"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleShowModal(e, "changeStatus");
                              }}
                              size={40}
                            />
                          )}
                        </span>

                        <p className="text-center">
                          {!isEmptyOrUndefined(e.description)
                            ? `${e.description.slice(0, 50)}...`
                            : "Tarea sin descripción"}
                        </p>

                        <p>{`Fecha: ${convertDate(e.date)}`}</p>
                        <p>{`Hora: ${cutHour(e.hour)}`}</p>

                        <section className="d-flex justify-content-end actionSection">
                          <BsFillTrashFill
                            size={20}
                            color="gray"
                            title="Borrar"
                            className="iconHover"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleShowModal(e, "remove");
                            }}
                          />

                          <BsFillPencilFill
                            size={20}
                            color="#3d7b91"
                            title="Editar"
                            className="iconHover"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleShowModal(e, "edit");
                            }}
                          />
                        </section>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </>
  );
};
