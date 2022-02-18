const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const app = express();
app.use(cors());

app.use("/", express.static(path.join(__dirname, "public")));
app.get("/task/all/:start/:end", (req, res) => {
  const { start } = req.params;
  const { end } = req.params;
  var data = "";
  http
    .get(`http://192.168.141.15:8084/task/all/${start}/${end}`, (resp) => {
      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        const jsondate = JSON.parse(data);

        res.send(jsondate);
      });
    })
    .on("error", console.log);
});
app.get("/task/auditorTasks/:id/:date", (req, res) => {
  const { id } = req.params;
  const { date } = req.params;
  var data = "";
  http
    .get(
      `http://192.168.141.15:8084/task/getAuditorTasks/${id}/${date}`,
      (resp) => {
        resp.on("data", (chunk) => {
          data += chunk;
        });
        resp.on("end", () => {
          const jsondate = JSON.parse(data);

          res.send(jsondate);
        });
      }
    )
    .on("error", console.log);
});
app.get("/bi/all", (req, res) => {
  var data = "";
  http
    .get("http://192.168.141.15:8084/bi/all", (resp) => {
      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        const jsondate = JSON.parse(data);

        res.send(jsondate);
      });
    })
    .on("error", console.log);
});

app.get("/PlannedVsExecuted/getOneMonth/:date", (req, res) => {
  const { date } = req.params;
  var data = "";
  http
    .get(
      `http://192.168.141.15:8084/PlannedVsExecuted/getOneMonth/${date}`,
      (resp) => {
        resp.on("data", (chunk) => {
          data += chunk;
        });
        resp.on("end", () => {
          const jsondate = JSON.parse(data);

          res.send(jsondate);
        });
      }
    )
    .on("error", console.log);
});

app.get("/task/getTaskPerformance/:start/:end", (req, res) => {
  const { start } = req.params;
  const { end } = req.params;
  var data = "";
  http
    .get(
      `http://192.168.141.15:8084/task/getTaskPerformance/${start}/${end}`,
      (resp) => {
        resp.on("data", (chunk) => {
          data += chunk;
        });
        resp.on("end", () => {
          const jsondate = JSON.parse(data);

          res.send(jsondate);
        });
      }
    )
    .on("error", console.log);
});
app.put(
  "/task/moveUnexecutedTasksFromOneDayToAnother/:start/:end",
  (req, res) => {
    const { start } = req.params;
    const { end } = req.params;

    var options = {
      host: `192.168.141.15`,
      port: 8084,
      path: `/task/moveUnexecutedTasksFromOneDayToAnother/${start}/${end}`,
      method: "PUT",
    };
    var data = "";
    var req = http.request(options, (resp) => {
      console.log("STATUS: " + resp.statusCode);
      console.log("HEADERS: " + JSON.stringify(resp.headers));
      resp.setEncoding("utf8");
      resp.on("data", function (chunk) {
        data += chunk;
      });
      resp.on("end", () => {
        const jsondate = JSON.parse(data);

        res.send(jsondate);
      });
    });

    req.on("error", function (e) {
      console.log("problem with request: " + e.message);
    });

    req.end();
  }
);
app.put(
  "/task/swapTasksBetweenAuditors/:start/:startId/:end/:endId",
  (req, res) => {
    const { start } = req.params;
    const { startId } = req.params;
    const { end } = req.params;
    const { endId } = req.params;

    var options = {
      host: `192.168.141.15`,
      port: 8084,
      path: `/task/swapTasksBetweenAuditors/${start}/${startId}/${end}/${endId}`,
      method: "PUT",
    };
    var data = "";
    var req = http.request(options, (resp) => {
      console.log("STATUS: " + resp.statusCode);
      console.log("HEADERS: " + JSON.stringify(resp.headers));
      resp.setEncoding("utf8");
      resp.on("data", function (chunk) {
        data += chunk;
      });
      resp.on("end", () => {
        const jsondate = JSON.parse(data);

        res.send(jsondate);
      });
    });

    req.on("error", function (e) {
      console.log("problem with request: " + e.message);
    });

    req.end();
  }
);
app.put("/task/updateTask/:taskId/:toId/:date", (req, res) => {
  const { taskId } = req.params;
  const { toId } = req.params;
  const { date } = req.params;

  var options = {
    host: `192.168.141.15`,
    port: 8084,
    path: `/task/updateTaskToAnotherAuditorAndDate/${taskId}/${toId}/${date}`,
    method: "PUT",
  };
  var data = "";
  var req = http.request(options, (resp) => {
    console.log("STATUS: " + resp.statusCode);
    console.log("HEADERS: " + JSON.stringify(resp.headers));
    resp.setEncoding("utf8");
    resp.on("data", function (chunk) {
      data += chunk;
    });
    resp.on("end", () => {
      res.send(data);
    });
  });

  req.on("error", function (e) {
    console.log("problem with request: " + e.message);
  });

  req.end();
});

app.post("/task/copyAllTasksFromOneDayToAnother/:start/:end", (req, res) => {
  const { start } = req.params;
  const { end } = req.params;

  var options = {
    host: `192.168.141.15`,
    port: 8084,
    path: `/task/copyAllTasksFromOneDayToAnother/${start}/${end}`,
    method: "POST",
  };
  var data = "";
  var req = http.request(options, (resp) => {
    console.log("STATUS: " + resp.statusCode);
    console.log("HEADERS: " + JSON.stringify(resp.headers));
    resp.setEncoding("utf8");
    resp.on("data", function (chunk) {
      data += chunk;
    });
    resp.on("end", () => {
      const jsondate = JSON.parse(data);

      res.send(jsondate);
    });
  });
  req.on("error", function (e) {
    console.log("problem with request: " + e.message);
  });
  req.end();
});

app.delete("/task/deleteUnexecutedTasksFromOneDay/:date", (req, res) => {
  const { date } = req.params;

  var options = {
    host: `192.168.141.15`,
    port: 8084,
    path: `/task/deleteUnexecutedTasksFromOneDay/${date}`,
    method: "DELETE",
  };
  var data = "";
  var req = http.request(options, (resp) => {
    console.log("STATUS: " + resp.statusCode);
    console.log("HEADERS: " + JSON.stringify(resp.headers));
    resp.setEncoding("utf8");
    resp.on("data", function (chunk) {
      data += chunk;
    });
    resp.on("end", () => {
      const jsondate = JSON.parse(data);

      res.send(jsondate);
    });
  });
  req.on("error", function (e) {
    console.log("problem with request: " + e.message);
  });
  req.end();
});
app.post("/bi/uploadMotFile", (req, res) => {
  const body = JSON.stringify({ b: req.body });
  var options = {
    host: `192.168.141.15`,
    port: 8084,
    path: `/bi/uploadMotFile`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": body.length,
    },
  };
  var data = "";
  var req = http.request(options, (resp) => {
    console.log("STATUS: " + resp.statusCode);
    console.log("HEADERS: " + JSON.stringify(resp.headers));
    resp.setEncoding("utf8");
    resp.on("data", function (chunk) {
      data += chunk;
    });
    resp.on("end", () => {
      const jsondate = JSON.parse(data);

      res.send(jsondate);
    });
  });
  req.on("error", function (e) {
    console.log("problem with request: " + e.message);
  });
  req.write(body);
  req.end();
});

// app.use((req, res, next) => {
//   // res.sendStatus(403);
//   res.status(403).send("Forbidden");

//   // res.sendStatus(404);
//   res.status(404).send("Not Found");

//   // res.sendStatus(500);
//   res.status(500).send("Internal Server Error");
// });
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.send("Somethung went wrong!!!");
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000!", new Date().toLocaleString());
});
