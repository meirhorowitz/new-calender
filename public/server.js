const parsedUrl = new URL(window.location);
const portIndex = parsedUrl.origin.indexOf(":", 5);
const baseUrl = parsedUrl.origin.slice(0, portIndex + 1);
const port = "8084";
const UseBaseUrl = false;

const Server = {
  getTasks: async function (side) {
    try {
      return await fetch(
        `${UseBaseUrl ? baseUrl + port : ""}/task/all/${firstAndLastDay(
          Calendar.globalElements.currentDate
        )}`
      )
        .then((response) => response.json())
        .then((res) => {
          return res;
        });
    } catch (error) {
      console.log(error);
    }
  },
  getAuditorTasks: async function (id, date) {
    try {
      return await fetch(
        `${UseBaseUrl ? baseUrl + port : ""}/task/auditorTasks/${id}/${date}`
      )
        .then((response) => response.json())
        .then((res) => {
          return res;
        });
    } catch (error) {
      console.log(error);
    }
  },
  getTodayTasks: async function () {
    const c = new AbortController();
    const id = setTimeout(() => c.abort(), 1000);
    try {
      return await fetch(
        `${UseBaseUrl ? baseUrl + port : ""}/task/all/${formatDate(
          new Date()
        )}/${formatDate(new Date())}`
      )
        .then((response) => response.json())
        .then((res) => {
          return res;
        });
    } catch (error) {
      console.log(error);
    }
  },

  getExecutionTasks: async function () {
    const c = new AbortController();
    const id = setTimeout(() => c.abort(), 1000);
    try {
      return await fetch(
        `${
          UseBaseUrl ? baseUrl + port : ""
        }/task/getTaskPerformance/${firstAndLastDay(
          Calendar.globalElements.currentDate
        )}`,
        {
          signal: c.signal,
        }
      )
        .then((response) => response.json())
        .then((res) => {
          // clearTimeout(id);
          return res;
        });
    } catch (error) {
      console.log(error);
    }
  },
  getTodayExecutionTasks: async function () {
    const c = new AbortController();
    const id = setTimeout(() => c.abort(), 1000);
    try {
      return await fetch(
        `${
          UseBaseUrl ? baseUrl + port : ""
        }/task/getTaskPerformance/${formatDate(new Date())}/${formatDate(
          new Date()
        )}`,
        {
          signal: c.signal,
        }
      )
        .then((response) => response.json())
        .then((res) => {
          // clearTimeout(id);
          return res;
        });
    } catch (error) {
      console.log(error);
    }
  },
  getBi: async function () {
    try {
      return await fetch(`${UseBaseUrl ? baseUrl + port : ""}/bi/all`)
        .then((response) => response.json())
        .then((res) => {
          return res;
        });
    } catch (error) {
      console.log(error);
    }
  },

  getTB: async function (date) {
    try {
      return await fetch(
        `${
          UseBaseUrl ? baseUrl + port : ""
        }/PlannedVsExecuted/getOneMonth/${date}`
      )
        .then((response) => response.json())
        .then((res) => {
          return res;
        });
    } catch (error) {
      console.log(error);
    }
  },
  putMoveDay: async function (from, to) {
    try {
      return await fetch(
        `${
          UseBaseUrl ? baseUrl + port : ""
        }/task/moveUnexecutedTasksFromOneDayToAnother/${from}/${to}`,
        {
          method: "PUT",
        }
      )
        .then((response) => response.json())
        .then((res) => {
          return res;
        });
    } catch (error) {
      console.log(error);
    }
  },
  putUpdateTaskToAnotherAuditorAndDate: async function (taskId, toId, date) {
    try {
      return await fetch(
        `${
          UseBaseUrl ? baseUrl + port : ""
        }/task/updateTask/${taskId}/${toId}/${date}`,
        {
          method: "PUT",
        }
      )
        .then((response) => response.json())
        .then((res) => {
          return res;
        });
    } catch (error) {
      console.log(error);
    }
  },
  putSwapAuditors: async function (from, to, fromId, toId) {
    // const c=new AbortController();
    // const id=setTimeout(() => c.abort(), 5000);

    return await fetch(
      `${
        UseBaseUrl ? baseUrl + port : ""
      }/task/swapTasksBetweenAuditors/${from}/${fromId}/${to}/${toId}`,
      {
        method: "PUT",
        // signal: c.signal
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          return res;
        } else {
          throw new Error(res + "Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
        // return(error)
      });
  },
  postCopyDay: async function (from, to) {
    try {
      return await fetch(
        `${
          UseBaseUrl ? baseUrl + port : ""
        }/task/copyAllTasksFromOneDayToAnother/${from}/${to}`,
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((res) => {
          return res;
        });
    } catch (error) {
      console.log(error);
    }
  },
  deleteDay: async function (date) {
    try {
      return await fetch(
        `${
          UseBaseUrl ? baseUrl + port : ""
        }/task/deleteUnexecutedTasksFromOneDay/${date}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((res) => {
          return res;
        });
    } catch (error) {
      console.log(error);
    }
  },
};
