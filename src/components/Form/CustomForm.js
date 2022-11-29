import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { cutHour, today } from "../helpers/helpers";

export const CustomForm = (props, isEditing) => {
  console.log("props: ", props, isEditing);
  const [taskInfo, setTaskInfo] = useState({
    name: isEditing ? props?.name : "",
    description: isEditing ? props?.description : "",
    date: isEditing ? props?.date : "",
    hour: isEditing ? cutHour(props?.hour) : "",
    status: false,
  });
  return (
    <Form>
      <Form.Group className="mb-3 row" controlId="formBasicEmail">
        <div className="col-lg-6 col-md-6 col-xs-12">
          <Form.Label>Nombre </Form.Label>
          <Form.Control
            value={taskInfo.name}
            onChange={(e) => setTaskInfo({ ...taskInfo, name: e.target.value })}
            type="text"
            placeholder="Bañar al perro"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-xs-12">
          <Form.Label>Descripción </Form.Label>
          <Form.Control
            onChange={(e) =>
              setTaskInfo({ ...taskInfo, description: e.target.value })
            }
            value={taskInfo.description}
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
            value={taskInfo.date}
            onChange={(e) => setTaskInfo({ ...taskInfo, date: e.target.value })}
            type="date"
            placeholder={today()}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-xs-12">
          <Form.Label>Hora </Form.Label>
          <Form.Control
            value={taskInfo.hour}
            onChange={(e) => setTaskInfo({ ...taskInfo, hour: e.target.value })}
            type="time"
            placeholder="00:00:00"
          />
        </div>
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
    </Form>
  );
};
