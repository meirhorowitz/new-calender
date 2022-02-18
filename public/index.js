var privet = false;
var first = 1;
var allTasksInMonth = [];
var tasksInDay = [];
var ExecutionInDay = [];
var itemsExecution = [];
let controllersArray = [];
var bi = [];
var tb = [];
let removeIcon = `<svg  class="removeIcon"xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>`;
let arrowDownIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>`;
let arrowUpIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 14l5-5 5 5H7z"/></svg>`;
let backArrowIcon = `<svg class="backArrowIcon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`;
let shiftColor = {
  1: "2px solid #f7ee08;",
  2: "2px solid #69859f;",
};
let modal = {
  delete: {
    title: "האם תרצו למחוק את",
    body: ``,
    footer: `
    <button id="deleteAuditor" type="button" class="btn my-btn">מחיקה</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">ביטול</button>`,
  },
  moveMesimot: {
    title: "העברת ביקורות שטרם בוצעו ליום אחר",
    body: `<div style="display:flex; justify-content: space-around;"><label for="from">מיום:<input id="from" class="from my-input" type="date" lang="he-IL"  required></label><label for="to">ליום:<input id="to" class="my-input"  type="date" lang="he-IL" required></label></div>`,
    footer: `
    <button id="moveModalBtn" type="submit" class="btn my-btn">העבר</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">ביטול</button>`,
  },
  moveMesimot1: {
    title: "העברת ביקורות שטרם בוצעו ליום אחר",
    body: `<div style="display:flex; justify-content: space-around;"><label for="from">מיום:<input id="from" class="from my-input" type="date" lang="he-IL"  required></label><label for="to">ליום:<input id="to" class="my-input" type="date" lang="he-IL" required></label></div>`,
    footer: `
    <button id="moveModalBtn" type="submit" class="btn my-btn">העבר</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">ביטול</button>`,
  },
  exchangeMesimot: {
    title: "החלפת ביקורות ממבקר למבקר  אחר",
    body: `<div style="display:flex; justify-content: space-around;"><label for="from">מיום:<input id="from"   class="from my-input" type="date" lang="he-IL"  required></label><label for="to">ליום:<input id="to" class="to my-input" type="date" lang="he-IL" required></label></div>
           <div style="display:flex; justify-content: space-around;"><label for="fromMevaker">ממבקר:</label><input id="fromMevaker" class="my-input" type="number" placeholder="מספר מזהה" style="width:25%;" required><label for="toMevaker">למבקר:</label><input id="toMevaker" class="my-input" type="number" placeholder="מספר מזהה" style="width:25%;" required></div>`,
    footer: `
    <button id="exchangeModalBtn" type="submit" class="btn my-btn">העבר</button>
    <button type="button" class="btn btn-secondary " data-dismiss="modal">ביטול</button>`,
  },
  exchangeMesimot1: {
    title: "החלפת ביקורות ממבקר למבקר  אחר",
    body: `<div style="display:flex; justify-content: space-around;"><label for="from">מיום:<input id="from"  class="from my-input" type="date" lang="he-IL"  required></label><label for="to">ליום:<input id="to" class="to my-input" type="date" lang="he-IL" required></label></div>
           <div style="display:flex; justify-content: space-around;"><label for="fromMevaker">ממבקר:</label><input id="fromMevaker" class="my-input" type="number" placeholder="מספר מזהה" style="width:25%;" required><label for="toMevaker">למבקר:</label><input id="toMevaker" class="my-input" type="number" placeholder="מספר מזהה" style="width:25%;" required></div>`,
    footer: `
    <button id="exchangeModalBtn" type="submit" class="btn my-btn">העבר</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">ביטול</button>`,
  },
  copyMesimot: {
    title: "העתקת ביקורות מיום ליום ",
    body: `<div style="display:flex; justify-content: space-around;"><label for="from">מיום:<input id="from"  class="from my-input" type="date" lang="he-IL" required></label><label for="to">ליום:<input id="to" class="my-input"  type="date" lang="he-IL" required></label></div>`,
    footer: `
    <button id="copyModalBtn" type="submit" class="btn my-btn">העתק</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">ביטול</button>`,
  },
  copyMesimot1: {
    title: "העתקת ביקורות מיום ליום ",
    body: `<div style="display:flex; justify-content: space-around;"><label for="from">מיום:<input id="from"  class="from my-input" type="date" lang="he-IL" required></label><label for="to">ליום:<input id="to" class="my-input" type="date" lang="he-IL" required></label></div>`,
    footer: `
    <button id="copyModalBtn" type="submit" class="btn my-btn">העתק</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">ביטול</button>`,
  },
  deleteMesimot: {
    title: "מחיקת ביקורות מיום מסוים ",
    body: `<div style="display:flex; justify-content: space-around;"><label for="from">מיום:<input id="from"  class="from my-input" type="date" lang="he-IL"  required></label></div>`,
    footer: `
    <button id="deleteModalBtn" type="submit" class="btn my-btn">מחיקה</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">ביטול</button>`,
  },
  deleteMesimot1: {
    title: "מחיקת ביקורות מיום מסוים ",
    body: `<div style="display:flex; justify-content: space-around;"><label for="from1">מיום:<input id="from"  class="from my-input" type="date" lang="he-IL"  required></label></div>`,
    footer: `
    <button id="deleteModalBtn" type="submit" class="btn my-btn">מחיקה</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">ביטול</button>`,
  },
  moveTask: {
    title: " העברת משימה ",
    body: `<div style="display:flex; justify-content: space-around;"><label for="toMevaker">למבקר:</label><input id="toMevaker" class="my-input" type="number" placeholder="מספר מזהה"  required><label for="toDate">ליום:<input id="toDate" class="to my-input" type="date" lang="he-IL" required></label></div>`,
    footer: `
    <button id="moveTaskModalBtn" type="submit" class="btn my-btn">העבר</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">ביטול</button>`,
  },
  copyTask: {
    title: " העתקת משימה ",
    body: `<div style="display:flex; justify-content: space-around;"><label for="toMevaker">למבקר:</label><input id="toMevaker" class="my-input" type="number" placeholder="מספר מזהה"  required><label for="toDate">ליום:<input id="toDate" class="to my-input" type="date" lang="he-IL" required></label></div>`,
    footer: `
    <button id="copyTaskModalBtn" type="submit" class="btn my-btn">העבר</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">ביטול</button>`,
  },
  uploadFile: {
    title: " העלאת קבצים ליצירת תוכנית",
    body: `<label for="fileupload">קובץ משרד התחבורה</label>
    <input
      type="file"
      name="fileupload"
      class="form-control-file"
      id="fileupload"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      required
    />`,
    footer: `
    <button id="sendFile"  type="button" class="btn my-btn ml-3">העלאת קובץ</button>
    <button id="creatPlan" type="button" class="btn my-btn mr-3 display-none" >יצירת תוכנית</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">ביטול</button>`,
  },
};

let info = {
  id: "מזהה",
  date: "תאריך",
  makat: "מקט",
  line: "קו",
  auditor_id: "מספר מבקר",
  auditor_name: "שם מבקר",
  area_name: "אזור",
  shift_name: "משמרת",
  time_range: "טווח",
  done: "סטטוס",
};

$("#first").on("click", function () {
  $("#passengersCont").addClass("display-none");
  $("#mesimotCont").removeClass("display-none");
  $("#mevakrimManegmentHeader").removeClass("display-none");
});
$("#second").on("click", function () {
  $("#mesimotCont").addClass("display-none");
  $("#passengersCont").removeClass("display-none");
  $("#mevakrimManegmentHeader").addClass("display-none");
});
// $("#mevakrimBtm").on("click", function () {
//   $("#mesimotCont").addClass("display-none");
//   $("#niohlMesimotCont").addClass("display-none");
//   $("#dochMesimotCont").addClass("display-none");
//   $("#dochCont").addClass("display-none");
//   $("#dayCont").addClass("display-none");
//   $("#mevakrimCont").removeClass("display-none");
// });
$("#dochMesimotBtn").on("click", function () {
  removefocus();
  addfocus("#dochMesimotBtn");
  $("#mesimotCont").addClass("display-none");
  $("#mevakrimCont").addClass("display-none");
  $("#niohlMesimotCont").addClass("display-none");
  $("#dochCont").addClass("display-none");
  $("#dayCont").addClass("display-none");
  $("#dochMesimotCont").removeClass("display-none");
});
$("#dochBtn").on("click", function () {
  removefocus();
  addfocus("#dochBtn");
  $("#mesimotCont").addClass("display-none");
  $("#mevakrimCont").addClass("display-none");
  $("#niohlMesimotCont").addClass("display-none");
  $("#dochMesimotCont").addClass("display-none");
  $("#dayCont").addClass("display-none");
  $("#dochCont").removeClass("display-none");
  var startDate = new Date(
    Calendar.globalElements.currentDate.getFullYear(),
    Calendar.globalElements.currentDate.getMonth(),
    1
  );

  getTB(formatDate(startDate));
});

$("#mesimotDayBtn").on("click", function () {
  Calendar.globalElements.selectedDate = new Date();
  Calendar.globalElements.currentDate = Calendar.globalElements.selectedDate;
  Calendar.creatCalendar(Calendar.globalElements.currentDate);
  if (!$("#mesimotDayBtn").hasClass("focus")) {
    removefocus();
    $("#loaderModalCenter").modal("show");
    addfocus("#mesimotDayBtn");
    $("#mesimotCont").addClass("display-none");
    $("#mevakrimCont").addClass("display-none");
    $("#niohlMesimotCont").addClass("display-none");
    $("#dochMesimotCont").addClass("display-none");
    $("#dochCont").addClass("display-none");
    $("#dayCont").removeClass("display-none");
    $("#dateHeader").html(
      new Date().toLocaleString("he-IL", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    );
    getTodayExecutionTasks().then(() =>
      getTodayTasks().then(() => {
        if (tasksInDay.length > 0) {
          $("#showAllTaskInDay").attr("disabled", false);
        } else {
          $("#showAllTaskInDay").attr("disabled", true);
        }
      })
    );
  }
});

$("#mesimotBtn").on("click", function () {
  privet = false;
  Calendar.globalElements.selectedDate = new Date();
  Calendar.globalElements.currentDate = Calendar.globalElements.selectedDate;
  if (!$("#mesimotBtn").hasClass("focus")) {
    // if (first) {
    first--;
    $("#loaderModalCenter").modal("show");
    getExecutionTasks().then(() => {
      getTasks().then(() => {
        if (allTasksInMonth.length > 0) {
          $("#showAllTasksMonth").attr("disabled", false);
        } else {
          $("#showAllTasksMonth").attr("disabled", true);
        }
      });
    });
    // } else {
    //   Calendar.creatCalendar(Calendar.globalElements.currentDate, "left");
    //   if (allTasksInMonth.length > 0) {
    //     $("#showAllTasksMonth").attr("disabled", false);
    //   } else {
    //     $("#showAllTasksMonth").attr("disabled", true);
    //   }
    // }
    removefocus();
    addfocus("#mesimotBtn");

    $(".bar-2").empty();
    $(".bar-3").empty();
    $("#headerB").empty();
    $("#mevakrimCont").addClass("display-none");
    $("#monthCount").addClass("display-none");
    $("#niohlMesimotCont").addClass("display-none");
    $("#dochMesimotCont").addClass("display-none");
    $("#dochCont").addClass("display-none");
    $("#dayCont").addClass("display-none");
    $("#mesimotCont").removeClass("display-none");
    $("#mvakrimListCard").removeClass("display-none");
    $(".subName").html(` `);
  }
});
$("#moveMesimot").on("click", () =>
  showModal(
    modal.moveMesimot.title,
    modal.moveMesimot.body,
    modal.moveMesimot.footer
  )
);
$("#moveMesimot1").on("click", () =>
  showModal(
    modal.moveMesimot1.title,
    modal.moveMesimot1.body,
    modal.moveMesimot1.footer
  )
);
$("#copyMesimot").on("click", () =>
  showModal(
    modal.copyMesimot.title,
    modal.copyMesimot.body,
    modal.copyMesimot.footer
  )
);
$("#copyMesimot1").on("click", () =>
  showModal(
    modal.copyMesimot1.title,
    modal.copyMesimot1.body,
    modal.copyMesimot1.footer
  )
);
$("#exchangeMesimot").on("click", () =>
  showModal(
    modal.exchangeMesimot.title,
    modal.exchangeMesimot.body,
    modal.exchangeMesimot.footer
  )
);
$("#exchangeMesimot1").on("click", () =>
  showModal(
    modal.exchangeMesimot1.title,
    modal.exchangeMesimot1.body,
    modal.exchangeMesimot1.footer
  )
);
$("#deleteMesimot").on("click", () =>
  showModal(
    modal.deleteMesimot.title,
    modal.deleteMesimot.body,
    modal.deleteMesimot.footer
  )
);
$("#deleteMesimot1").on("click", (e) => {
  showModal(
    modal.deleteMesimot1.title,
    modal.deleteMesimot1.body,
    modal.deleteMesimot1.footer
  );
});
$("#moveTaskBtn").on("click", (e) => {
  showModal(modal.moveTask.title, modal.moveTask.body, modal.moveTask.footer);
  $("#lineInfo").modal("hide");
});
$("#copyTaskBtn").on("click", (e) => {
  showModal(modal.copyTask.title, modal.copyTask.body, modal.copyTask.footer);
});
$("#niholMesimotBtn").on("click", () => {
  // removefocus()
  // addfocus("#niholMesimotBtn")
  $("#settingsModal").modal("show");
});
$(document).on("click", "#addMvaker", () => {
  // removefocus()
  // addfocus("#niholMesimotBtn")
  $("#settingsModal").modal("show");
});
$("#niholBtn").on("click", () => $("#upModalCenter").modal("show"));

$(document).on("click", "#moveModalBtn", function () {
  let from = $("#from").val();
  let to = $("#to").val();
  if (from && to) {
    putMoveDay(from, to);
  }
});
$(document).on("click", "#exchangeModalBtn", function () {
  let from = $("#from").val();
  let to = $("#to").val();
  let fromId = $("#fromMevaker").val();
  let toId = $("#toMevaker").val();
  if (from && to && fromId && toId) {
    $("#optionsModalCenter").modal("hide");
    putSwapAuditors(from, to, fromId, toId);
  }
});

let vDAy = "";

$(document).on("change", "#to", function () {
  vDAy = new Date($("#from").val()).getDay();
  if (!validate($(this).val())) {
    $(this).val("");
  }
});

const validate = (dateString) => {
  const day = new Date(dateString).getDay();
  switch (vDAy) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
      if (day == 5 || day == 6) {
        return false;
      }
      return true;
    case 5:
      if (day == 5) {
        return true;
      }
      return false;
    case 6:
      if (day == 6) {
        return true;
      }
      return false;
    default:
      break;
  }
};

$(document).on("click", "#copyModalBtn", function () {
  let from = $("#from").val();
  let to = $("#to").val();
  if (from && to) {
    postCopyDay(from, to);
  }
});
$(document).on("click", "#deleteModalBtn", function () {
  let date = $("#from").val();
  if (date) {
    deleteDay(date);
  }
});
$("#daySearch").on("keyup", () => {
  searchInput("daySearch", "sidebarEvents", "li", "div");
});
$("#dayControllerSearch").on("keyup", () => {
  searchInput("dayControllerSearch", "dayControllerUl", "li", "div");
});

$(document).on("change", "#showAllCheckBox", function () {
  if (this.checked) {
    $(".eventCardDay").removeClass("display-none");
  } else {
    $(".eventCardDay").addClass("display-none");
  }
});

$(Calendar.globalElements.gridTable).on("click", gridTableClick);
$(Calendar.globalElements.gridTable).on("contextmenu", gridTablecontextmenu);

$(document).on("click", "#out-click", () => {
  $("#out-click").css("display", "none");
  $("#drop-down").removeClass("show");
  $("#drop-down-main").removeClass("show");
});

$(document).on("change", "#start", function () {
  let date = $(this).val() + "-01";

  getTB(date);
});
function addfocus(btn) {
  $(btn).addClass("focus");
}
function removefocus() {
  $("#mySidenav button").removeClass("focus");
}

function searchInput(target, myUl, myLi, myA) {
  var input, filter, ul, li, a, i, div, txtValue;
  input = document.getElementById(target);
  filter = input.value.toUpperCase();
  ul = document.getElementById(myUl);
  li = ul.getElementsByTagName(myLi);

  for (i = 0; i < li.length; i++) {
    if (target == "dayControllerSearch") {
      a = li[i].getElementsByTagName(myA)[1];
      txtValue = $(a).text();
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        $(li[i]).css("display", "block");
      } else {
        $(li[i]).css("display", "none");
      }
    } else {
      div = li[i].getElementsByTagName(myA);

      for (j = 0; j < div.length; j++) {
        for (l = 0; l < div.length; l++) {
          a = div[j].getElementsByTagName(myA)[l];
          let sp = div[j].getElementsByTagName("span")[l];
          txtValue = $(a).text();
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            $(a).css("display", "flex");
            $(sp).css("display", "flex");
          } else {
            $(a).css("display", "none");
            $(sp).css("display", "none");
          }
        }
      }
    }
  }
}
function firstAndLastDay(data) {
  var currentDate = data;
  var startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  var lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  return `${formatDate(startDate)}/${formatDate(lastDay)}`;
}

var todayDayName = document.getElementById("todayDayName");
todayDayName.innerHTML =
  "Today is " +
  Calendar.globalElements.currentDate.toLocaleString("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
$("#mainDateInput").on("change", function () {
  let month = $("#mainDateInput").val().split("-")[1];
  let year = $("#mainDateInput").val().split("-")[0];
  if ($("#mainDateInput").val() != "") {
    Calendar.globalElements.currentDate = new Date($("#mainDateInput").val());

    // if (
    //   !Calendar.globalElements.globalEventObj.planning[
    //     new Date(Calendar.globalElements.currentDate).toDateString()
    //   ]
    // ) {
    $("#loaderModalCenter").modal("show");
    getExecutionTasks().then(() => {
      getTasks().then(() => {
        if (allTasksInMonth.length > 0) {
          $("#showAllTasksMonth").attr("disabled", false);
        } else {
          $("#showAllTasksMonth").attr("disabled", true);
        }
      });
    });
    //   // Calendar.creatCalendar(Calendar.globalElements.currentDate, "left");
    // } else {
    //   // getTasks();
    //   Calendar.creatCalendar(Calendar.globalElements.currentDate, "left");
    //   $("#showAllTasksMonth").prop("disabled", false);

    // }
  }
});

function addEvent(data) {
  if (
    !Calendar.globalElements.globalEventObj.planning[
      new Date(data.date).toDateString()
    ]
  ) {
    Calendar.globalElements.globalEventObj.planning[
      new Date(data.date).toDateString()
    ] = [];
  }
  if (
    !Calendar.globalElements.globalEventObj.planning[
      new Date(data.date).toDateString()
    ][data.auditor_id]
  ) {
    Calendar.globalElements.globalEventObj.planning[
      new Date(data.date).toDateString()
    ][data.auditor_id] = [];
  }
  Calendar.globalElements.globalEventObj.planning[
    new Date(data.date).toDateString()
  ][data.auditor_id].push(data);
}
function addExecution(data) {
  if (
    !Calendar.globalElements.globalEventObj.execution[
      new Date(data.date).toDateString()
    ]
  ) {
    Calendar.globalElements.globalEventObj.execution[
      new Date(data.date).toDateString()
    ] = [];
  }
  if (
    !Calendar.globalElements.globalEventObj.execution[
      new Date(data.date).toDateString()
    ][data.auditor_id]
  ) {
    Calendar.globalElements.globalEventObj.execution[
      new Date(data.date).toDateString()
    ][data.auditor_id] = [];
  }
  Calendar.globalElements.globalEventObj.execution[
    new Date(data.date).toDateString()
  ][data.auditor_id].push(data);
}
function removeExecution(data) {
  if (
    Calendar.globalElements.globalEventObj.execution[
      new Date(data.date).toDateString()
    ]
  ) {
    Calendar.globalElements.globalEventObj.execution[
      new Date(data.date).toDateString()
    ] = [];
  }
}
function removeAuditor(id) {
  if (
    Calendar.globalElements.globalEventObj.planning[
      Calendar.globalElements.selectedDate.toDateString()
    ]
  ) {
    if (
      Calendar.globalElements.globalEventObj.planning[
        Calendar.globalElements.selectedDate.toDateString()
      ][id]
    ) {
      delete Calendar.globalElements.globalEventObj.planning[
        Calendar.globalElements.selectedDate.toDateString()
      ][id];
    }
  }
  setTimeout(() => {
    Calendar.creatCalendar(Calendar.globalElements.selectedDate);
    showControllersEvents();
    // showTodayControllersEvents();
  }, 2000);
}
function removeTask(data) {
  if (
    Calendar.globalElements.globalEventObj.planning[
      new Date(data.date).toDateString()
    ]
  ) {
    if (
      Calendar.globalElements.globalEventObj.planning[
        new Date(data.date).toDateString()
      ][data.auditor_id]
    ) {
      let index = Calendar.globalElements.globalEventObj.planning[
        new Date(data.date).toDateString()
      ][data.auditor_id].findIndex((x) => x.id === data.id);
      Calendar.globalElements.globalEventObj.planning[
        new Date(data.date).toDateString()
      ][data.auditor_id].splice(index, 1);
    }
    if (
      !Calendar.globalElements.globalEventObj.planning[
        new Date(data.date).toDateString()
      ][data.auditor_id].length
    ) {
      delete Calendar.globalElements.globalEventObj.planning[
        new Date(data.date).toDateString()
      ][data.auditor_id];
    }
  }
}
function addTask(data) {
  if (
    !Calendar.globalElements.globalEventObj.planning[
      new Date(data.date).toDateString()
    ]
  ) {
    Calendar.globalElements.globalEventObj.planning[
      new Date(data.date).toDateString()
    ] = [];
  }
  if (
    !Calendar.globalElements.globalEventObj.planning[
      new Date(data.date).toDateString()
    ][data.auditor_id]
  ) {
    Calendar.globalElements.globalEventObj.planning[
      new Date(data.date).toDateString()
    ][data.auditor_id] = [];
  }
  Calendar.globalElements.globalEventObj.planning[
    new Date(data.date).toDateString()
  ][data.auditor_id].push(data);
}
function removeItems(data) {
  if (
    Calendar.globalElements.globalEventObj.planning[
      new Date(data.date).toDateString()
    ]
  ) {
    Calendar.globalElements.globalEventObj.planning[
      new Date(data.date).toDateString()
    ] = [];
  }
}
function removeAuditorTasks(date, id) {
  if (
    Calendar.globalElements.globalEventObj.planning[
      new Date(date).toDateString()
    ]
  ) {
    if (
      Calendar.globalElements.globalEventObj.planning[
        new Date(date).toDateString()
      ][id]
    ) {
      delete Calendar.globalElements.globalEventObj.planning[
        new Date(date).toDateString()
      ][id];
    }
  }
}
function showEvent(id) {
  $("#headerB").empty();
  let sidebarEvents = document.getElementById("InfoModalBody");

  let objWithPrivetDate;
  let objWithexecutionPrivetDate;
  let objWithDate =
    Calendar.globalElements.globalEventObj.planning[
      Calendar.globalElements.selectedDate.toDateString()
    ];
  let objWithexecutionDate =
    Calendar.globalElements.globalEventObj.execution[
      Calendar.globalElements.selectedDate.toDateString()
    ];
  if (objWithexecutionDate) {
    objWithexecutionPrivetDate =
      Calendar.globalElements.globalEventObj.execution[
        Calendar.globalElements.selectedDate.toDateString()
      ][id];
  }
  if (objWithDate) {
    objWithPrivetDate =
      Calendar.globalElements.globalEventObj.planning[
        Calendar.globalElements.selectedDate.toDateString()
      ][id];

    DataTable.creatsidebarEventsTable(objWithPrivetDate, false);
  }
  if (objWithPrivetDate) {
    if (objWithPrivetDate.length) {
      $("#eventDayName").html(
        Calendar.globalElements.selectedDate.toLocaleString("en", {
          month: "2-digit",
          year: "numeric",
        })
      );
      $("#infoHeader").html(
        Calendar.globalElements.selectedDate.toLocaleString("he-IL", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
      $("#infoCount").html("");
      $("#infoCount").html(`${objWithPrivetDate.length}&nbspביקורות`);
    }
    $("#infoTitle").html(
      `פירוט ביקורות &nbsp;&nbsp;${objWithPrivetDate[0].auditor_name}`
    );
    setTimeout(() => {
      $("#lineInfo").modal("show");
    }, 200);
  }
}

let selected;
let index;
$(document).on("click", "#scales", function () {
  var table = $("#sidebarEventsTable").DataTable();
  if ($(this).is(":checked")) {
    $("#sidebarEventsTable tbody tr").addClass("selected");
  } else {
    $("#sidebarEventsTable tbody tr").removeClass("selected");
  }
  selected = table.rows(".selected").data();
  index = table.rows(".selected").data().length;
  if (table.rows(".selected").data().length) {
    $("#moveTaskBtn").attr("disabled", false);
    $("#copyTaskBtn").attr("disabled", false);
    index = table.rows(".selected").data().length;
  } else {
    $("#moveTaskBtn").attr("disabled", true);
    $("#copyTaskBtn").attr("disabled", true);
  }
});

$(document).on("click", "#sidebarEventsTable tbody td ", function () {
  var table = $("#sidebarEventsTable").DataTable();
  $(this).closest("tr").toggleClass("selected");

  selected = table.rows(".selected").data();
  if (table.rows(".selected").data().length) {
    $("#moveTaskBtn").attr("disabled", false);
    $("#copyTaskBtn").attr("disabled", false);
    index = table.rows(".selected").data().length;
  } else {
    $("#moveTaskBtn").attr("disabled", true);
    $("#copyTaskBtn").attr("disabled", true);
  }
});
$(document).on("click", "#moveTaskModalBtn", function () {
  if ($("#toDate").val() && $("#toMevaker").val()) {
    let date = $("#toDate").val();
    let id = $("#toMevaker").val();
    for (let i = 0; i < index; i++) {
      UpdateTask(selected[i], id, date);
    }

    setTimeout(() => {
      getAuditorTasks(id, date);
    }, 1000);
    getTodayExecutionTasks().then(() => getTodayTasks());
    setTimeout(() => {
      Calendar.creatCalendar(Calendar.globalElements.currentDate);
      showControllersEvents();
      showTodayControllersEvents();
    }, 2000);
    $("#optionsModalCenter").modal("hide");
  }
});

function showControllersEvents() {
  let ControllersEvents = document.getElementById("dayControllerUl");

  let objWithDate =
    Calendar.globalElements.globalEventObj.planning[
      Calendar.globalElements.selectedDate.toDateString()
    ];
  let objExWithDate =
    Calendar.globalElements.globalEventObj.execution[
      Calendar.globalElements.selectedDate.toDateString()
    ];

  if (objWithDate) {
    let controllersCount = 0;
    let eventsCount = 0;
    controllersArray = [];
    for (key in objWithDate) {
      if (objExWithDate) {
        if (
          Calendar.globalElements.globalEventObj.execution[
            Calendar.globalElements.selectedDate.toDateString()
          ][key]
        ) {
          eventsCount =
            Calendar.globalElements.globalEventObj.execution[
              Calendar.globalElements.selectedDate.toDateString()
            ][key].length;
        }
      }

      controllersArray.push({
        auditor_name: objWithDate[key][0].auditor_name,
        auditor_id: objWithDate[key][0].auditor_id,
        num: objWithDate[key].length,
        ex: eventsCount,
      });
    }

    DataTable.creatDT(
      controllersArray,
      "#allMonthTable",
      Calendar.globalElements.selectedDate
    );
  }
}
function showTodayControllersEvents() {
  let objWithDate =
    Calendar.globalElements.globalEventObj.planning[new Date().toDateString()];
  let objExWithDate =
    Calendar.globalElements.globalEventObj.execution[new Date().toDateString()];

  if (objWithDate) {
    let eventsCount = 0;
    controllersArray = [];
    for (key in objWithDate) {
      if (objExWithDate) {
        if (
          Calendar.globalElements.globalEventObj.execution[
            new Date().toDateString()
          ][key]
        ) {
          eventsCount =
            Calendar.globalElements.globalEventObj.execution[
              new Date().toDateString()
            ][key].length;
        }
      }

      controllersArray.push({
        auditor_name: objWithDate[key][0].auditor_name,
        auditor_id: objWithDate[key][0].auditor_id,
        num: objWithDate[key].length,
        ex: eventsCount,
      });
    }

    DataTable.creatDT(controllersArray, "#allDayTable");
  }
}

$("#showAllTaskInDay").on("click", () => {
  $("#loaderModalCenter").modal("show");
  setTimeout(showAllTasksInDay, 200);
});

$("#showAllTasksMonth").on("click", () => {
  $("#loaderModalCenter").modal("show");
  setTimeout(showAllTasksInMonth, 200);
});
function gridTablecontextmenu(e) {
  e.preventDefault();
  if (
    !e.target.classList.contains("col") ||
    e.target.classList.contains("empty-day")
  ) {
    return;
  }

  if (Calendar.globalElements.selectedDayBlock) {
    if (
      Calendar.globalElements.selectedDayBlock.classList.contains("blue") &&
      Calendar.globalElements.selectedDayBlock.classList.contains("lighten-3")
    ) {
      Calendar.globalElements.selectedDayBlock.classList.remove("blue");
      Calendar.globalElements.selectedDayBlock.classList.remove("lighten-3");
    }
  }
  Calendar.globalElements.selectedDayBlock = e.target;
  Calendar.globalElements.selectedDayBlock.classList.add("blue");
  Calendar.globalElements.selectedDayBlock.classList.add("lighten-3");

  Calendar.globalElements.selectedDate = new Date(
    Calendar.globalElements.currentDate.getFullYear(),
    Calendar.globalElements.currentDate.getMonth(),
    parseInt(e.target.innerHTML)
  );

  creatDropdown(e, "#drop-down-main");
}
function gridTableClick(e) {
  if (
    !e.target.classList.contains("col") ||
    e.target.classList.contains("empty-day")
  ) {
    return;
  }

  if (Calendar.globalElements.selectedDayBlock) {
    if (
      Calendar.globalElements.selectedDayBlock.classList.contains("blue") &&
      Calendar.globalElements.selectedDayBlock.classList.contains("lighten-3")
    ) {
      Calendar.globalElements.selectedDayBlock.classList.remove("blue");
      Calendar.globalElements.selectedDayBlock.classList.remove("lighten-3");
    }
  }
  Calendar.globalElements.selectedDayBlock = e.target;
  Calendar.globalElements.selectedDayBlock.classList.add("blue");
  Calendar.globalElements.selectedDayBlock.classList.add("lighten-3");

  Calendar.globalElements.selectedDate = new Date(
    Calendar.globalElements.currentDate.getFullYear(),
    Calendar.globalElements.currentDate.getMonth(),
    parseInt(e.target.innerHTML)
  );

  if (!privet) {
    $("#headerB")
      .html(`<input class="form-check-input my-input" style="height: 20px; width: 20px;" type="checkbox" value="" id="showAllCheckBox">
    <label class="form-check-label" for="showAllCheckBox" style="margin-right: 25px;">
      פתח הכל
    </label>`);
    let countevents = 0;
    let lineArray = [];
    for (key in Calendar.globalElements.globalEventObj.planning[
      Calendar.globalElements.selectedDate.toDateString()
    ]) {
      countevents++;
      for (key2 in Calendar.globalElements.globalEventObj.planning[
        Calendar.globalElements.selectedDate.toDateString()
      ][key]) {
        lineArray.push(
          Calendar.globalElements.globalEventObj.planning[
            Calendar.globalElements.selectedDate.toDateString()
          ][key][key2].line
        );
      }
    }
    const counts = {};
    lineArray.forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
    });

    showControllersEvents();
  } else {
    $("#loaderModalCenter").modal("show");
    showEvent(privet);
  }

  document.getElementById("eventDayName").innerHTML =
    Calendar.globalElements.selectedDate.toLocaleString("he-IL", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
}
function showAllTasksInDay() {
  if (tasksInDay.length > 0) {
    DataTable.creatsidebarEventsTable(tasksInDay, true);

    $("#eventDayName").html("");
    $("#infoTitle").html(`פירוט ביקורות`);
    $("#infoHeader").html(
      new Date(tasksInDay[0].date).toLocaleString("he-IL", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );
    $("#infoCount").html("");

    $("#lineInfo").modal("show");
  } else {
    console.log("hh");
    $("#loaderModalCenter").modal("hide");
  }
}
function showAllTasksInMonth() {
  if (allTasksInMonth.length > 0) {
    DataTable.creatsidebarEventsTable(allTasksInMonth, true);
    $("#eventDayName").html("");
    $("#infoTitle").html(`פירוט ביקורות`);
    $("#infoHeader").html(
      new Date(allTasksInMonth[0].date).toLocaleString("en", {
        month: "2-digit",
        year: "numeric",
      })
    );
    $("#infoCount").html("");

    $("#lineInfo").modal("show");
  } else {
    console.log("ggg");
    $("#loaderModalCenter").modal("hide");
  }
}
$("#lineInfo").on("shown.bs.modal", function (e) {
  $("#loaderModalCenter").modal("hide");
});

async function getAuditorTasks(id, date) {
  let res = await Server.getAuditorTasks(id, date);
  if (res) {
    removeAuditorTasks(date, id);
    res.forEach((ev) => {
      ev.done = false;
      addEvent(ev);
    });
  }
}
async function getTasks(side) {
  allTasksInMonth = [];

  $(".day-mark").remove();
  $("#dayControllerUl").empty();
  $("#headerB").empty();
  $("#controllersCount").empty();
  $("#sidebarEvents").empty();

  $("#monthCount").addClass("display-none");
  $("#mvakrimListCardBody").css("visibility", "hidden");
  // $("#loaderModalCenter").modal("show");
  // setTimeout(() => $("#loaderModalCenter").modal("hide"), 3000);
  Calendar.globalElements.items = [];
  let res = await Server.getTasks();

  res.forEach((item) => {
    removeItems(item);
    item.done = false;
    Calendar.globalElements.items.push(item);
  });
  Calendar.globalElements.items.forEach((ev) => {
    Calendar.globalElements.itemsExecution.some(({ id: id2 }) => {
      if (id2 === ev.id) {
        ev.done = true;
      }
    });
    allTasksInMonth.push(ev);

    addEvent(ev);
  });

  setTimeout(() => {
    Calendar.creatCalendar(Calendar.globalElements.currentDate, side);
  }, 0);
}
async function getTodayTasks() {
  tasksInDay = [];
  $(".day-mark").remove();
  $("#dayControllerUl").empty();
  $("#headerB").empty();
  $("#controllersCount").empty();
  $("#sidebarEvents").empty();
  $("#monthCount").addClass("display-none");
  $("#mvakrimListCardBody").css("visibility", "hidden");

  Calendar.globalElements.items = [];
  // setTimeout(() => $("#loaderModalCenter").modal("hide"), 1000);
  let res = await Server.getTodayTasks();
  if (res) {
    res.forEach((item) => {
      removeItems(item);
      item.done = false;
      Calendar.globalElements.items.push(item);
    });

    Calendar.globalElements.items.forEach((ev) => {
      Calendar.globalElements.itemsExecution.some(({ id: id2 }) => {
        if (id2 === ev.id) {
          ev.done = true;
        }
      });
      tasksInDay.push(ev);

      addEvent(ev);
    });
    let i = new Date().getDate();

    let eventsCount = Calendar.getEventCount(i, true);
    let executionCount = Calendar.getExecutionCount(i, true);
    Charts.creatDonatChart(eventsCount, executionCount);
    showTodayControllersEvents();
    $("#loaderModalCenter").modal("hide");
  }
}
async function getExecutionTasks() {
  Calendar.globalElements.itemsExecution = [];
  let res = await Server.getExecutionTasks();
  if (res) {
    res.forEach((item) => {
      removeExecution(item);
      Calendar.globalElements.itemsExecution.push(item);
    });
    Calendar.globalElements.itemsExecution.forEach((ev) => {
      addExecution(ev);
    });
  }

  // if (
  //   Calendar.globalElements.items.length > 0 &&
  //   Calendar.globalElements.itemsExecution.length > 0
  // ) {
  //   Calendar.globalElements.items.filter(({ id: id1 }) =>
  //     Calendar.globalElements.itemsExecution.some(({ id: id2 }) => {
  //       if (id2 === id1) {
  //         Calendar.globalElements.items[id1].done = true;
  //       }
  //     })
  //   );
  // }
}
async function getTodayExecutionTasks() {
  Calendar.globalElements.itemsExecution = [];
  let res = await Server.getTodayExecutionTasks();
  if (res) {
    res.forEach((item) => {
      removeExecution(item);
      Calendar.globalElements.itemsExecution.push(item);
    });
    Calendar.globalElements.itemsExecution.forEach((ev) => {
      addExecution(ev);
    });
  }

  // if (
  //   Calendar.globalElements.items.length > 0 &&
  //   Calendar.globalElements.itemsExecution.length > 0
  // ) {
  //   Calendar.globalElements.items.filter(({ id: id1 }) =>
  //     Calendar.globalElements.itemsExecution.some(({ id: id2 }) => {
  //       if (id2 === id1) {
  //         Calendar.globalElements.items[id1].done = true;
  //       }
  //     })
  //   );
  // }
}
async function getBi() {
  bi = [];
  let res = await Server.getBi();

  res.forEach((item) => {
    bi.push(item);
  });

  DataTable.creatBiTable(bi);
}

async function getTB(date) {
  tb = [];
  let res = await Server.getTB(date);
  res.forEach((item) => {
    tb.push(item);
  });

  DataTable.creatBTTable(tb, date);
}
async function putMoveDay(from, to) {
  let res = await Server.putMoveDay(from, to);
  if (res) {
    if (
      Calendar.globalElements.globalEventObj.planning[
        new Date(from).toDateString()
      ]
    ) {
      delete Calendar.globalElements.globalEventObj.planning[
        new Date(from).toDateString()
      ];
    }
    if (
      Calendar.globalElements.globalEventObj.execution[
        new Date(from).toDateString()
      ]
    ) {
      delete Calendar.globalElements.globalEventObj.execution[
        new Date(from).toDateString()
      ];
    }
    if (
      Calendar.globalElements.globalEventObj.planning[
        new Date(to).toDateString()
      ]
    ) {
      delete Calendar.globalElements.globalEventObj.planning[
        new Date(to).toDateString()
      ];
    }
    res.forEach((item) => {
      item.done = false;
      Calendar.globalElements.itemsExecution.some(({ id: id2 }) => {
        if (id2 === item.id) {
          item.done = true;
        }
      });
      addEvent(item);

      if (item.date == from) {
        addExecution(item);
      }
    });
    Calendar.creatCalendar(Calendar.globalElements.currentDate);
    showControllersEvents();

    var x = document.getElementById("snackbar");
    x.innerHTML = "  הפעולה בוצע בהצלחה!";
    x.classList.add("show", "bg-success");
    setTimeout(function () {
      x.classList.remove("show");
    }, 3000);
  } else {
    var x = document.getElementById("snackbar");
    x.innerHTML = " לא ניתן היה לבצע את הפעולה!";
    x.classList.add("show", "bg-warning");
    setTimeout(function () {
      x.classList.remove("show");
    }, 3000);
  }

  $("#optionsModalCenter").modal("hide");
}
async function UpdateTask(data, toId, date) {
  try {
    let res = await Server.putUpdateTaskToAnotherAuditorAndDate(
      data.id,
      toId,
      date
    );

    if (res == 1) {
      removeTask(data);

      var x = document.getElementById("snackbar");
      x.innerHTML = "  הפעולה בוצע בהצלחה!";
      x.classList.add("show", "bg-success");
      setTimeout(function () {
        x.classList.remove("show");
      }, 3000);
    } else if (res == 0) {
      var x = document.getElementById("snackbar");
      x.innerHTML = " לא ניתן היה לבצע את הפעולה!";
      x.classList.add("show", "bg-warning");
      setTimeout(function () {
        x.classList.remove("show");
      }, 3000);
    }
  } catch (error) {}
}
async function putSwapAuditors(from, to, fromId, toId) {
  try {
    let res = await Server.putSwapAuditors(from, to, fromId, toId);

    if (res) {
      if (
        Calendar.globalElements.globalEventObj.planning[
          new Date(from).toDateString()
        ][fromId]
      ) {
        delete Calendar.globalElements.globalEventObj.planning[
          new Date(from).toDateString()
        ][fromId];
      }

      if (
        Calendar.globalElements.globalEventObj.planning[
          new Date(to).toDateString()
        ]
      ) {
        delete Calendar.globalElements.globalEventObj.planning[
          new Date(to).toDateString()
        ][toId];
      }
      res.forEach((item) => {
        item.done = false;
        Calendar.globalElements.itemsExecution.some(({ id: id2 }) => {
          if (id2 === item.id) {
            item.done = true;
          }
        });
        addEvent(item);
      });
      Calendar.creatCalendar(Calendar.globalElements.currentDate);
      showControllersEvents();
      var x = document.getElementById("snackbar");
      x.innerHTML = "  הפעולה בוצע בהצלחה!";
      x.classList.add("show", "bg-success");
      setTimeout(function () {
        x.classList.remove("show");
      }, 3000);
    } else {
      var x = document.getElementById("snackbar");
      x.innerHTML = " לא ניתן היה לבצע את הפעולה!";
      x.classList.add("show", "bg-warning");
      setTimeout(function () {
        x.classList.remove("show");
      }, 3000);
    }
  } catch (error) {}

  $("#optionsModalCenter").modal("hide");
}
async function postCopyDay(from, to) {
  let res = await Server.postCopyDay(from, to);

  if (res) {
    if (
      Calendar.globalElements.globalEventObj.planning[
        new Date(to).toDateString()
      ]
    ) {
      delete Calendar.globalElements.globalEventObj.planning[
        new Date(to).toDateString()
      ];
    }

    res.forEach((item) => {
      item.done = false;
      Calendar.globalElements.itemsExecution.some(({ id: id2 }) => {
        if (id2 === item.id) {
          item.done = true;
        }
      });
      addEvent(item);
    });
    Calendar.creatCalendar(Calendar.globalElements.currentDate);
    showControllersEvents();

    var x = document.getElementById("snackbar");
    x.innerHTML = "  הפעולה בוצע בהצלחה!";
    x.classList.add("show", "bg-success");
    setTimeout(function () {
      x.classList.remove("show");
    }, 3000);
  } else {
    var x = document.getElementById("snackbar");
    x.innerHTML = " לא ניתן היה לבצע את הפעולה!";
    x.classList.add("show", "bg-warning");
    setTimeout(function () {
      x.classList.remove("show");
    }, 3000);
  }

  $("#optionsModalCenter").modal("hide");
}
async function deleteDay(date) {
  let res = await Server.deleteDay(date);
  if (res) {
    if (
      Calendar.globalElements.globalEventObj.planning[
        new Date(date).toDateString()
      ]
    ) {
      delete Calendar.globalElements.globalEventObj.planning[
        new Date(date).toDateString()
      ];
    }
    if (
      Calendar.globalElements.globalEventObj.execution[
        new Date(date).toDateString()
      ]
    ) {
      delete Calendar.globalElements.globalEventObj.execution[
        new Date(date).toDateString()
      ];
    }

    Calendar.creatCalendar(Calendar.globalElements.currentDate);

    var x = document.getElementById("snackbar");
    x.innerHTML = "  הפעולה בוצע בהצלחה!";
    x.classList.add("show", "bg-success");
    setTimeout(function () {
      x.classList.remove("show");
    }, 3000);
  } else {
    var x = document.getElementById("snackbar");
    x.innerHTML = " לא ניתן היה לבצע את הפעולה!";
    x.classList.add("show", "bg-warning");
    setTimeout(function () {
      x.classList.remove("show");
    }, 3000);
  }

  $("#optionsModalCenter").modal("hide");
}

async function uploadFile() {
  $("#settingsModal").modal("hide");
  $("#loaderModalCenter").modal("show");
  if (fileupload.files.length) {
    let formData = new FormData();
    formData.append("file", fileupload.files[0]);
    try {
      let response = await fetch(
        "http://192.168.141.15:8084/bi/uploadMotFile",
        {
          method: "POST",
          timeout: 100000,
          body: formData,
        }
      );

      if (response.status == 200) {
        $("#loaderModalCenter").modal("hide");
        var x = document.getElementById("snackbar");
        x.innerHTML = "התוכנית נוצרה בהצלחה!";
        x.classList.add("show", "bg-success");
        setTimeout(function () {
          x.classList.remove("show");
        }, 3000);
      }
    } catch (error) {
      if (error == "timeout") {
        console.log(
          `Request forhttp://192.168.141.15:8084/bi/uploadMotFile , timed out after ${timeout} milliseconds`
        );
        $("#loaderModalCenter").modal("hide");
      } else {
        console.log(error);

        $("#loaderModalCenter").modal("hide");
        var x = document.getElementById("snackbar");
        x.innerHTML = "התוכנית לא נוצרה!";
        x.classList.add("show", "bg-warning");

        setTimeout(function () {
          x.classList.remove("show");
        }, 3000);
      }
    }
  }
}

function creatDropdown(e, dropdown) {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  let winWidth = $(window).width() - e.pageX;
  let dropdownWidth = $(dropdown).width();
  if (winWidth >= dropdownWidth) {
    tempX = e.pageX;
  } else {
    tempX = e.pageX - (dropdownWidth - winWidth) + window.pageXOffset - 20;
  }
  let winHeight = $(window).height() - e.pageY;
  let dropdownHeight = $(dropdown).height();
  if (winHeight >= dropdownHeight) {
    tempY = e.pageY - 20;
  } else {
    tempY = e.pageY - (dropdownHeight - winHeight) + window.pageYOffset - 20;
  }
  $(dropdown).css("top", tempY);
  $(dropdown).css("left", tempX);

  $(dropdown).addClass("show");

  $("#out-click").css("display", "block");
}

function showModal(title, body, footer) {
  let date = new Date($(Calendar.globalElements.selectedDayBlock).attr("date"));
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (dd < 10) {
    dd = "0" + dd;
  }
  let today = yyyy + "-" + mm + "-" + dd;

  $("#optionsModalCenter .modal-title").html(title);
  $("#optionsModalCenter .modal-body").html(body);
  $("#optionsModalCenter .modal-footer").html(footer);
  $(".from").val(today);
  $(".to").val(today);
  $("#out-click").css("display", "none");
  $("#drop-down-main").removeClass("show");
  $("#optionsModalCenter").modal("show");
}

function formatDate(date) {
  var d = date;

  var datestring =
    d.getFullYear() +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getDate()).slice(-2);

  return datestring;
}
function isBetween(start, end, time) {
  var x = new Date(`01/01/2001 ${start}`).getTime();
  var y = new Date(`01/01/2001 ${end}`).getTime();

  var a = new Date(`01/01/2001 ${time}`).getTime();

  if (x <= a && y >= a) {
    return `${start}-${end}`;
  } else {
    return 0;
  }
}
$("#mkArea-modal-btn").on("click", function () {
  $(
    "#uploadModalFormBody"
  ).html(`<div id="newRow" class="row" style="justify-content: space-between"></div>
    <button id="addRow" type="button" class="btn btn-info">הוסף קו</button>`);
  $("#uploadModalCenter").modal("show");
});
$("#shift-modal-btn").on("click", function () {
  $("#uploadModalFormBody").html(
    `<div id="" class="row m-2" style="justify-content: space-between"><div class="col-6"><input type="text" class="form-control" value="בוקר" readonly></div><div class="col-6"><input type="text" class="form-control" ></div></div>
  
    <div id="" class="row m-2" style="justify-content: space-between"><div class="col-6"><input type="text" class="form-control"  value="ערב" readonly></div><div class="col-6"><input type="text" class="form-control" ></div></div>`
  );
  $("#uploadModalCenter").modal("show");
});

let options = ["צפון", "דרום", "מרכז"];
let add_id = 0;
$(document).on("click", "#addRow", function () {
  add_id++;
  var html = `<div id="mk_${add_id}_div" class="mk_div form-row  mb-3 col-6">
  <div class="col-7">
  
  <input id="mk_${add_id}_input" type="text" class="form-control" placeholder="מספר קו">
</div>
<div class="col-3">
  <select id="mk_${add_id}_select" class="mk_select form-control"></select>
</div>
<div class="col-2">
<svg
  class="removeRow"
  xmlns="http://www.w3.org/2000/svg"
  enable-background="new 0 0 24 24"
  height="40px"
  viewBox="0 0 24 24"
  width="24px"
  fill="#dc3545"
>
  <g><rect fill="none" height="24" width="24" /></g>
  <g>
    <g>
      <path
        d="M7,11v2h10v-2H7z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8 s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z"
      />
    </g>
  </g>
</svg>
</div>
</div>`;

  $("#newRow").append(html);
  options.forEach((op) => {
    $(`#mk_${add_id}_select`).append(` <option value="${op}">${op}</option>`);
  });
});
$(document).on("click", ".removeRow", function () {
  $(this).closest(".mk_div").remove();
});
$("#uploadModalCenter").on("hidden.bs.modal", function (e) {
  $("#newRow").empty();
});
$(function () {
  // getExecutionTasks();
  // getTasks();

  $("#loaderModalCenter").modal("show");
  $('[data-toggle="tooltip"]').tooltip();
  getBi();
  Calendar.globalElements.selectedDate = new Date();
  Calendar.globalElements.currentDate = Calendar.globalElements.selectedDate;
  removefocus();
  addfocus("#mesimotDayBtn");
  $("#dateHeader").html(
    new Date().toLocaleString("he-IL", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  );
  getTodayExecutionTasks().then(() =>
    getTodayTasks().then(() => {
      if (tasksInDay.length > 0) {
        $("#showAllTaskInDay").attr("disabled", false);
      } else {
        $("#showAllTaskInDay").attr("disabled", true);
      }
    })
  );

  // setTimeout(getTodayTasks, 1000);

  // Calendar.creatCalendar(Calendar.globalElements.currentDate);
});
