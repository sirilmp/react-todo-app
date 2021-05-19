import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [toDos, addTodos] = useState([]);
  const [input, setinput] = useState("");

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("todos"));
    if (data && data.length > 0) {
      addTodos(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDos));
  }, [toDos]);

  return (
    <div className="app">
      <div className="container">
      <div className="heading">
        <h1 align="center ">
          <span>-</span>ToDo List<span>-</span>
        </h1>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div>
            <div className="subHeading">
              <br></br>
              <h2>
                Whoop, it's <span>{today()}</span>,<span>{todayDate()}</span>
              </h2>
            </div>
            <div className="toDoInput">
              <input
                type="input"
                placeholder="Enter item..."
                onInput={(e) => setinput(e.target.value)}
                value={input}
              />
              <i
                className="fas fa-plus"
                onClick={() => {
                  if (input.length === 0) {
                    alert("Enter text...");
                  } else {
                    addTodos([
                      ...toDos,
                      {
                        value: input,
                        done: false,
                        removed: false,
                        id: Date.now(),
                      },
                    ]);
                    setinput("");
                  }
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div className="hr"></div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 statusHeading">
            <h2>active todos</h2>
            <div className="row">
              {toDos.map((initial) => {
                if (!initial.done && !initial.removed) {
                  return (
                    <div className="todos" key={initial.id}>
                      <div className="todo col-12">
                        <div className="col-11 toDoContent">
                          <label>mark as done : &nbsp;</label>
                          <input
                            type="checkbox"
                            name={initial.id}
                            id=""
                            value={initial.done}
                            onChange={() => {
                              addTodos(
                                toDos.map((old) => {
                                  if (old.id === initial.id) {
                                    old.done = !old.done;
                                  }
                                  return old;
                                })
                              );
                            }}
                          />
                          <h5>
                            {initial.value}
                          </h5>
                          <p>
                            {getTime(initial.id)}
                          </p>
                        </div>
                        <div className="col-1">
                          <i
                            className="fas fa-times"
                            onClick={() => {
                              addTodos(
                                toDos.map((old) => {
                                  if (old.id === initial.id) {
                                    old.removed = !old.removed;
                                  }
                                  return old;
                                })
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
          <div className="col-md-4 statusHeading">
            <h2 align="center ">todos finished</h2>
            <div className="row">
              {toDos.map((initial) => {
                if (initial.done && !initial.removed) {
                  return (
                    <div className="todos" key={initial.id}>
                      <div className="todo col-12">
                        <div className="col-11 toDoContent">
                          <label>marked as done : &nbsp;</label>
                          <input
                            type="checkbox"
                            name="{initial.id}"
                            id="{initial.id}"
                            checked={initial.done}
                            onChange={() => {
                              addTodos(
                                toDos.map((old) => {
                                  if (old.id === initial.id) {
                                    old.done = !old.done;
                                  }
                                  return old;
                                })
                              );
                            }}
                          />
                          <h5
                            className="todo-content">
                            {initial.value}
                          </h5>
                          <p>
                            {getTime(initial.id)}
                          </p>
                        </div>
                        <div className="col-1">
                          <i
                            className="fas fa-times input-dark"
                            onClick={() => {
                              addTodos(
                                toDos.filter((old) => {
                                  if (old.id === initial.id) {
                                    return false;
                                  }
                                  return true;
                                })
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
          <div className="col-md-4 statusHeading">
            <h2 align="center"> Todos cancelled</h2>
            <div className="row">
              {toDos.map((initial) => {
                if (initial.removed) {
                  return (
                    <div className="todos" key={initial.id}>
                      <div className="todo col-12">
                        <div className="col-11 toDoContent">
                          <label>restore todo : &nbsp;</label>
                          <input
                            type="checkbox"
                            name="{initial.id}"
                            id="{initial.id}"
                            value={initial.done}
                            onChange={() => {
                              addTodos(
                                toDos.map((old) => {
                                  if (old.id === initial.id) {
                                    old.removed = !old.removed;
                                  }
                                  return old;
                                })
                              );
                            }}
                          />
                          <h5
                            className="todo-content">
                            {initial.value}
                          </h5>
                          <p>
                            {getTime(initial.id)}
                          </p>
                        </div>
                        <div className="col-1">
                          <i
                            className="fas fa-times input-dark"
                            onClick={() => {
                              addTodos(
                                toDos.filter((old) => {
                                  if (old.id === initial.id) {
                                    return false;
                                  }
                                  return true;
                                })
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="connectMe">
    <a className="text-center" href="https://sirilmp.online/">siril m p</a>
  </div>
    </div>
  );
}

export default App;

function today() {
  var a = new Date();
  var weekdays = new Array(7);
  weekdays[0] = "Sunday";
  weekdays[1] = "Monday";
  weekdays[2] = "Tuesday";
  weekdays[3] = "Wednesday";
  weekdays[4] = "Thursday";
  weekdays[5] = "Friday";
  weekdays[6] = "Saturday";
  var r = weekdays[a.getDay()];
  return r;
}

function todayDate() {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  today = dd + "/" + mm + "/" + yyyy;
  return today;
}

function getTime(time) {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  var d = new Date(time);
  var hr = d.getHours();
  var min = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  var ampm = "am";
  if (hr > 12) {
    hr -= 12;
    ampm = "pm";
  }
  var date = d.getDate();
  var month = months[d.getMonth()];
  var year = d.getFullYear();
  return hr + ":" + min + ampm + " " + date + " " + month + " " + year;
}
