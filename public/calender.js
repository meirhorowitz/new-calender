var Calendar = {
  globalElements: {
    calendar: document.getElementById("calendar-table"),
    gridTable: document.getElementById("table-body"),
    menu: $("#drop-down"),
    outClick: $("#out-click"),
    currentDate: new Date(),
    selectedDate: new Date(),
    privet: false,
    selectedDayBlock: null,
    copyDayData: [],
    dontCopyDayData: [],
    items: [],
    itemsExecution: [],
    bi: [],
    tb: [],
    globalEventObj: { planning: [], execution: [] },
  },

  creatCalendar: function (date, side) {
    $("#controllersCount").html("");
    $("#monthCount").addClass("display-none");

    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    lastDay = lastDay.getDate();
    let itemInMounth = 0;
    let doneitemInMounth = 0;

    for (let i = 1; i <= lastDay; i++) {
      itemInMounth += Calendar.getEventCount(i, false);
      doneitemInMounth += Calendar.getExecutionCount(i, false);
    }

    Charts.creatbarChart(itemInMounth, doneitemInMounth);
    Charts.creatProgressBar(itemInMounth, doneitemInMounth);

    let sidebarEvents = document.getElementById("sidebarEvents");

    let ControllersEvents = document.getElementById("dayControllerUl");
    ControllersEvents.innerHTML = "";
    var currentDate = date;

    var startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    var monthTitle = document.getElementById("month-name");
    var monthName = currentDate.toLocaleString("he-IL", {
      month: "long",
    });
    var yearNum = currentDate.toLocaleString("he-IL", {
      year: "numeric",
    });
    monthTitle.innerHTML = `${monthName} ${yearNum}`;

    let yyyy = Calendar.globalElements.currentDate.getFullYear();
    let mm = Calendar.globalElements.currentDate.getMonth() + 1;
    if (mm < 10) {
      mm = "0" + mm;
    }
    let today = yyyy + "-" + mm;

    $("#mainDateInput").val(today);

    if (side == "left") {
      Calendar.globalElements.gridTable.className = "animated fadeOutRight";
    } else {
      Calendar.globalElements.gridTable.className = "animated fadeOutLeft";
    }

    setTimeout(
      () => {
        Calendar.globalElements.gridTable.innerHTML = "";

        var newTr = document.createElement("div");
        newTr.className = "row";
        var currentTr = Calendar.globalElements.gridTable.appendChild(newTr);

        for (let i = 0; i < startDate.getDay(); i++) {
          let emptyDivCol = document.createElement("div");
          emptyDivCol.className = "col empty-day";
          currentTr.appendChild(emptyDivCol);
        }

        var lastDay = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
        lastDay = lastDay.getDate();

        for (let i = 1; i <= lastDay; i++) {
          if (currentTr.children.length >= 7) {
            currentTr = Calendar.globalElements.gridTable.appendChild(
              addNewRow()
            );
          }
          let currentDay = document.createElement("div");

          currentDay.className = "col";

          $(currentDay).attr(
            "date",
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              i
            ).toDateString()
          );

          if (
            new Date(currentDate.getFullYear(), currentDate.getMonth(), i) <
            new Date()
          ) {
            setTimeout(() => {
              currentDay.classList.add("col-past");
            }, 300);
          }
          if (
            (Calendar.globalElements.selectedDayBlock == null &&
              i == currentDate.getDate()) ||
            Calendar.globalElements.selectedDate.toDateString() ==
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                i
              ).toDateString()
          ) {
            Calendar.globalElements.selectedDate = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              i
            );

            document.getElementById("eventDayName").innerHTML =
              Calendar.globalElements.selectedDate.toLocaleString("he-IL", {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric",
              });

            Calendar.globalElements.selectedDayBlock = currentDay;
            // setTimeout(() => {
            currentDay.classList.add("blue");
            currentDay.classList.add("lighten-3");

            // }, 900);
          }
          currentDay.innerHTML = i;

          //show marks
          if (!privet) {
            if (
              Calendar.globalElements.globalEventObj.planning[
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  i
                ).toDateString()
              ]
            ) {
              let eventMark = document.createElement("div");
              eventMark.className = "day-mark";
              eventMark.classList.add("shadow-sm");
              currentDay.appendChild(eventMark);
              let eventsCount = Calendar.getEventCount(i);
              let executionCount = Calendar.getExecutionCount(i);

              eventMark.innerHTML = `<div style="color:#483094;">${executionCount}</div><div style="color:#6c757d;">${eventsCount}</div>`;
            }
          } else {
            if (
              Calendar.globalElements.globalEventObj.planning[
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  i
                ).toDateString()
              ]
            ) {
              if (
                Calendar.globalElements.globalEventObj.planning[
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    i
                  ).toDateString()
                ][privet]
              ) {
                let eventMark = document.createElement("div");
                eventMark.className = "day-mark-privet";
                currentDay.appendChild(eventMark);

                let eventsCount = Calendar.getEventCount(i, false);
                let executionCount = Calendar.getExecutionCount(i, false);

                eventMark.innerHTML = `<div style="color:#28a745;">${executionCount}</div><div style="color:#ffc107;">${eventsCount}</div>`;
              }
            }
          }

          currentTr.appendChild(currentDay);
        }

        for (
          let i = currentTr.getElementsByClassName("col").length;
          i < 7;
          i++
        ) {
          let emptyDivCol = document.createElement("div");
          emptyDivCol.className = "col empty-day";
          currentTr.appendChild(emptyDivCol);
        }

        if (side == "left") {
          Calendar.globalElements.gridTable.className = "animated fadeInLeft";
        } else {
          Calendar.globalElements.gridTable.className = "animated fadeInRight";
        }

        function addNewRow() {
          let node = document.createElement("div");
          node.className = "row";
          return node;
        }
      },
      !side ? 0 : 200
    );
    $("#loaderModalCenter").modal("hide");
  },

  getEventCount: function (i, today) {
    let eventsCount = 0;

    if (!today) {
      for (key in Calendar.globalElements.globalEventObj.planning[
        new Date(
          Calendar.globalElements.currentDate.getFullYear(),
          Calendar.globalElements.currentDate.getMonth(),
          i
        ).toDateString()
      ]) {
        eventsCount +=
          Calendar.globalElements.globalEventObj.planning[
            new Date(
              Calendar.globalElements.currentDate.getFullYear(),
              Calendar.globalElements.currentDate.getMonth(),
              i
            ).toDateString()
          ][key].length;
      }
      return eventsCount;
    } else {
      for (key in Calendar.globalElements.globalEventObj.planning[
        new Date().toDateString()
      ]) {
        eventsCount +=
          Calendar.globalElements.globalEventObj.planning[
            new Date().toDateString()
          ][key].length;
      }
      return eventsCount;
    }
  },

  getExecutionCount: function (i, today) {
    let eventsCount = 0;
    if (!today) {
      for (key in Calendar.globalElements.globalEventObj.execution[
        new Date(
          Calendar.globalElements.currentDate.getFullYear(),
          Calendar.globalElements.currentDate.getMonth(),
          i
        ).toDateString()
      ]) {
        eventsCount +=
          Calendar.globalElements.globalEventObj.execution[
            new Date(
              Calendar.globalElements.currentDate.getFullYear(),
              Calendar.globalElements.currentDate.getMonth(),
              i
            ).toDateString()
          ][key].length;
      }
      return eventsCount;
    } else {
      for (key in Calendar.globalElements.globalEventObj.execution[
        new Date().toDateString()
      ]) {
        eventsCount +=
          Calendar.globalElements.globalEventObj.execution[
            new Date().toDateString()
          ][key].length;
      }
      return eventsCount;
    }
  },
};
