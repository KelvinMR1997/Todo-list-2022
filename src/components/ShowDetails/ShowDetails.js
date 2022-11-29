import React from "react";
import { FcCheckmark, FcExpired } from "react-icons/fc";
import { convertDate, cutHour } from "../helpers/helpers";

export const ShowDetails = (props) => {
  return (
    <>
      <div className="container mb-3">
        <div className="row bordered">
          <label className="col-lg-6 col-md6 col-xs-12">Nombre: </label>
          <p className="col-lg-6 col-md6 col-xs-12">{props?.name}</p>
        </div>
        <div className="row bordered">
          <label className="col-lg-6 col-md6 col-xs-12">Descripcion: </label>
          <p className="col-lg-6 col-md6 col-xs-12">{props?.description}</p>
        </div>
        <div className="row bordered">
          <label className="col-lg-6 col-md6 col-xs-12">Fecha: </label>
          <p className="col-lg-6 col-md6 col-xs-12">
            {convertDate(props?.date)}
          </p>
        </div>
        <div className="row bordered">
          <label className="col-lg-6 col-md6 col-xs-12">Hora: </label>
          <p className="col-lg-6 col-md6 col-xs-12">{cutHour(props?.hour)}</p>
        </div>
        <div className="row bordered">
          <label className="col-lg-6 col-md6 col-xs-12">Estado: </label>
          <p className="col-lg-6 col-md6 col-xs-12">
            {props?.status ? (
              <>
                Terminada
                <FcCheckmark size={25} className="pb-1" />
              </>
            ) : (
              <>
                Por hacer
                <FcExpired size={28} className="pb-1 pt-1" />
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
};
