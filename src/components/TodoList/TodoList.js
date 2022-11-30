import React, { useEffect, useState } from "react";
import { useGetMethod, usePostMethod } from "../../Hooks/useFetch";
import { Line } from "../helpers/Line";
import "./TodoList.css";
import { FcCheckmark, FcExpired } from "react-icons/fc";
import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsPlusSquare,
} from "react-icons/bs";
import {
  convertDate,
  cutHour,
  isEmptyOrUndefined,
  today,
} from "../helpers/helpers";
import CustomModal from "../Modal/CustomModal";
import { ShowDetails } from "../ShowDetails/ShowDetails";
import { CustomSpinner } from "./CustomSpinner";
import CustomToast from "../Toast/CustomToast";
import { Form } from "react-bootstrap";

export const TodoList = () => {
  const [modal, setModal] = useState({
    show: false,
    entry: null,
    data: null,
  });
  const [trigger, setTrigger] = useState(0);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    title: "",
  });
  /* -------------------------------- GET TASKS ------------------------------- */
  const {
    results: tasks,
    load: tasksLoader,
    trigger: getTasks,
  } = useGetMethod();

  /* ------------------------------ MUTATE TASKS ------------------------------ */
  const { load: removeTaskLoader, trigger: removeTask } = usePostMethod();
  const { load: changeStatusLoader, trigger: changeStatus } = usePostMethod();
  const { load: createNewTaskLoader, trigger: createNewTask } = usePostMethod();

  useEffect(() => {
    getTasks({
      url: "/tasks",
      params: {
        order: "id",
      },
    });
  }, [getTasks, trigger]);

  const handleModalAction = (actionType) => {
    if (actionType === "remove") {
      return removeTask({
        url: "/tasks",
        method: "DELETE",
        params: {
          id: `eq.${modal?.data?.id}`,
        },
        doAfterSuccess: (data) => {
          if (data?.ok) {
            setTrigger(trigger + 1);
            handleCloseModal();
            setShowToast({
              show: true,
              message: "La tarea ha sido borrada con exito",
              title: "Tarea eliminada",
            });
          }
        },
      });
    }
    if (actionType === "changeStatus") {
      return changeStatus({
        url: "/tasks",
        method: "PATCH",
        params: {
          id: `eq.${modal?.data?.id}`,
        },
        body: {
          status: true,
        },
        doAfterSuccess: (data) => {
          if (data?.ok) {
            setTrigger(trigger + 1);
            handleCloseModal();
            setShowToast({
              show: true,
              message: "La tarea ha sido terminada con exito",
              title: "Tarea finalizada",
            });
          }
        },
      });
    }
    if (actionType === "creating" || actionType === "edit") {
      if (
        isEmptyOrUndefined(modal?.data?.name) ||
        isEmptyOrUndefined(modal?.data?.description) ||
        isEmptyOrUndefined(modal?.data?.date) ||
        isEmptyOrUndefined(modal?.data?.hour)
      ) {
        setShowToast({
          show: true,
          message: "Por favor llene todos los campos",
          title: `Todos los campos son obligatorios`,
          warning: true,
        });
        return;
      }
      let { name, description, date, hour } = modal?.data;
      return createNewTask({
        url: "/tasks",
        method: actionType === "creating" ? "POST" : "PATCH",
        params: {
          id: actionType === "edit" ? `eq.${modal?.data?.id}` : "",
        },
        body: {
          name,
          description,
          date,
          hour,
        },
        doAfterSuccess: (res) => {
          if (res?.ok) {
            setTrigger(trigger + 1);
            handleCloseModal();
            setShowToast({
              show: true,
              message: `La tarea ha sido ${
                actionType === "edit" ? "actualizada" : "creada"
              } con exito`,
              title: `Tarea ${
                actionType === "edit" ? "actualizada" : "creada"
              } `,
            });
          }
        },
      });
    }
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
      {/* /* ---------------------------------- Toast --------------------------------- */}
      <CustomToast
        show={showToast.show}
        message={showToast.message}
        title={showToast.title}
        warning={showToast?.warning}
        onHide={() =>
          setShowToast({
            show: false,
            message: "",
            title: "",
          })
        }
      />
      {removeTaskLoader ?? <CustomSpinner />}
      {changeStatusLoader ?? <CustomSpinner />}
      {createNewTaskLoader ?? <CustomSpinner />}
      {/* /* ---------------------------------- Modal --------------------------------- */}
      <CustomModal
        title={
          modal.entry === "remove"
            ? "Eliminar Tarea"
            : modal?.entry === "creating"
            ? "Crear nueva tarea"
            : modal?.data?.name
        }
        show={modal.show}
        btnYesName={
          modal.entry === "remove"
            ? "Eliminar"
            : modal.entry === "changeStatus"
            ? "Si, terminé"
            : modal.entry === "edit"
            ? "Actualizar"
            : "Guardar"
        }
        size={modal.entry === "detail" ? "lg" : ""}
        btnNoName={
          modal.entry === "detail"
            ? "Listo"
            : modal.entry === "changeStatus"
            ? "No, cancelar"
            : "Cancelar"
        }
        btnYesEvent={
          modal.entry === "detail" ? null : () => handleModalAction(modal.entry)
        }
        onHide={() => handleCloseModal()}
      >
        <div className="container">
          {modal.entry === "detail" && <ShowDetails {...modal.data} />}

          {modal.entry === "creating" || modal.entry === "edit" ? (
            <Form>
              <Form.Group className="mb-3 row" controlId="formBasicEmail">
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <Form.Label>Nombre </Form.Label>
                  <Form.Control
                    value={modal.data?.name}
                    onChange={(e) =>
                      setModal({
                        ...modal,
                        data: { ...modal.data, name: e.target.value },
                      })
                    }
                    type="text"
                    placeholder="Bañar al perro"
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <Form.Label>Descripción </Form.Label>
                  <Form.Control
                    value={modal.data?.description}
                    onChange={(e) =>
                      setModal({
                        ...modal,
                        data: { ...modal.data, description: e.target.value },
                      })
                    }
                    as="textarea"
                    type="text"
                    placeholder="Hoy realizaré esta tarea..."
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3 row" controlId="formBasicEmail">
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <Form.Label>Fecha </Form.Label>
                  <Form.Control
                    value={modal.data?.date}
                    onChange={(e) =>
                      setModal({
                        ...modal,
                        data: { ...modal.data, date: e.target.value },
                      })
                    }
                    type="date"
                    placeholder={today()}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <Form.Label>Hora </Form.Label>
                  <Form.Control
                    value={modal.data?.hour}
                    onChange={(e) =>
                      setModal({
                        ...modal,
                        data: { ...modal.data, hour: e.target.value },
                      })
                    }
                    type="time"
                    placeholder="00:00:00"
                  />
                </div>
              </Form.Group>
            </Form>
          ) : (
            <></>
          )}
          {modal.entry === "remove" && (
            <h4 className="mb-4 text-center text-secondary">{`¿ Está seguro de eliminar la tarea ${modal.data?.name} ?`}</h4>
          )}
          {modal.entry === "changeStatus" && (
            <h4 className="mb-4 text-center text-info">
              ¿Terminaste esta tarea?
            </h4>
          )}
        </div>
      </CustomModal>

      <div className="container techStackSection mb-5">
        <div className="sectionTitle text-center text-primary">
          <h1>Cosas que hacer </h1>
          <Line backgroundColor="green" width={"13.5rem"} />
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
                    style={{ padding: "4.5rem" }}
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
                        className={"techContent "}
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
                            ? `${e.description.slice(0, 30)}...`
                            : "Tarea sin descripción"}
                        </p>

                        <p>
                          <b className="text-primary fw-600" >Fecha : </b>{convertDate(e.date)}
                        </p>
                        <p><b className="text-primary fw-600">Hora : </b>{cutHour(e.hour)}</p>
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
                          {e.status === false && (
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
                          )}
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
