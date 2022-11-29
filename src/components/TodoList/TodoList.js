import React, { useEffect, useState } from "react";
import { useGetMethod } from "../../Hooks/useFetch";
import { Line } from "../helpers/Line";
import "./TodoList.css";
import { FcCheckmark, FcExpired } from "react-icons/fc";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { convertDate, cutHour, isEmptyOrUndefined } from "../helpers/helpers";
import { CustomModal } from "../Modal/CustomModal";

export const TodoList = () => {
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
  const [itemSelected, setItemSelected] = useState(null);

  const markItem = (index) => {
    index === itemSelected ? setItemSelected(null) : setItemSelected(index);
  };

  return (
    <div className="container techStackSection">
      <CustomModal />
      <div className="sectionTitle">
        <h5>Cosas que hacer </h5>
        <Line backgroundColor="green" width={"4.5rem"} />
      </div>
      {tasksLoader ? (
        "Loading..."
      ) : (
        <>
          <div className="row">
            {tasks.length > 0 &&
              tasks.map((e, i) => {
                return (
                  <div
                    className="col-xl-4 col-lg-4 col-md-6 col-xs-12"
                    data-toggle="tooltip"
                    title={e.description}
                  >
                    <div
                      onClick={() => markItem(i)}
                      className={
                        itemSelected === i
                          ? "techContent itemSelected"
                          : "techContent"
                      }
                    >
                      <span className="d-flex justify-content-evenly">
                        <h3 className="text-center text-secondary">{e.name}</h3>
                        {e.status ? (
                          <FcCheckmark size={40} />
                        ) : (
                          <FcExpired size={40} />
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
                        />

                        <BsFillPencilFill
                          size={20}
                          color="#3d7b91"
                          title="Editar"
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
  );
};
