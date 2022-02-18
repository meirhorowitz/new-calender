const DataTable = {
  creatBiTable: function (data) {
    $("#dochBI").DataTable({
      bDestroy: true,
      data: data,

      columns: [
        { data: "agency_id", title: "קוד מפעיל" },
        { data: "cluster_id", title: " קוד אשכול" },
        { data: "cluster_name", title: "שם אשכול" },
        { data: "line", title: "מס' קו " },
        { data: "makat", title: "מקט קו " },
        { data: "line_speciality", title: "יחודיות הקו " },
        { data: "service_type", title: "סוג שירות " },
        { data: "line_type", title: " סוג קו " },
        { data: "month", title: " חודש דגימה " },
        { data: "total_monthly_trips", title: "ס'כ נסיעות חודשיות " },
        { data: "value", title: " חלוקה לימים " },
        { data: "time_range", title: "טווח שעות " },
        { data: "total2_procent", title: "כמות דגימות" },
      ],

      language: {
        lengthMenu: "הצג _MENU_ שורות לדף ",
        search: "",
        searchPlaceholder: "חיפוש",
        paginate: {
          previous: "הקודם",
          next: "הבא",
        },
        info: "מציג דף _PAGE_ מתוך _PAGES_",
      },

      dom:
        "<'row top'<'col-sm-6 text-left'B><'col-sm-3'l><'col-sm-3'f>>" +
        "<'bar-4'>" +
        "tr" +
        "<'row bottom'<''p>>",
      buttons: {
        dom: {
          button: {
            tag: "button",
            className: "",
          },
        },
        buttons: [
          {
            extend: "copyHtml5",
            text: `
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 27.454 31.375">
                    <path id="Icon_awesome-copy" data-name="Icon awesome-copy" d="M19.61,27.453V29.9a1.471,1.471,0,0,1-1.471,1.471H1.471A1.471,1.471,0,0,1,0,29.9V7.354A1.471,1.471,0,0,1,1.471,5.883H5.883V24.021a3.436,3.436,0,0,0,3.432,3.432Zm0-21.08V0H9.315A1.471,1.471,0,0,0,7.844,1.471V24.021a1.471,1.471,0,0,0,1.471,1.471H25.983a1.471,1.471,0,0,0,1.471-1.471V7.844H21.081A1.475,1.475,0,0,1,19.61,6.373Zm7.413-1.9L22.982.431A1.471,1.471,0,0,0,21.942,0h-.371V5.883h5.883V5.512a1.471,1.471,0,0,0-.431-1.04Z" fill="#483094"/>
                  </svg>
                  `,
            titleAttr: "Copy",
            className: "",
            exportOptions: {},
            title: "דוח BI",
          },
          {
            extend: "excelHtml5",
            text: `
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 31.959 31.374">
                    <path id="Icon_simple-microsoftexcel" data-name="Icon simple-microsoftexcel" d="M31.363,4.167H20.657V6.149h3.156V9.283H20.657v1h3.156V13.42H20.657v1.027h3.156v2.968H20.657V18.6h3.156v2.975H20.657v1.189h3.156V25.76H20.657v2.182H31.363c.169-.051.31-.25.423-.6a2.92,2.92,0,0,0,.172-.847V4.53c0-.17-.059-.273-.172-.309A1.465,1.465,0,0,0,31.363,4.167Zm-1.389,21.59H24.838V22.768h5.136v2.989Zm0-4.178H24.838V18.6h5.136Zm0-4.165H24.838V14.459h5.136v2.955Zm0-3.995H24.838V10.285h5.136V13.42h0Zm0-4.153H24.838V6.15h5.136V9.266ZM0,3.673V28.442L18.856,31.7V.328L0,3.684ZM11.176,22.41q-.108-.292-1.009-2.481c-.6-1.459-.959-2.309-1.064-2.551H9.07L7.047,22.191l-2.7-.182L7.55,16.017,4.614,10.025,7.37,9.88l1.822,4.688h.036l2.057-4.9,2.848-.18-3.392,6.485,3.5,6.615-3.061-.18Z" transform="translate(0 -0.329)" fill="#483094"/>
                  </svg>
                  `,
            className: "",
            titleAttr: "Excel",
            title: "דוח BI",

            exportOptions: {},
          },
        ],
      },

      lengthMenu: [
        [10, 25, 50, 100, -1],
        [10, 25, 50, 100, "הכל"],
      ],
    });
    var table = $("#dochBI").DataTable();
    total = table

      .column(12)
      .data()
      .reduce(function (a, b) {
        return a + b;
      }, 0);

    $(".bar-4").css({ width: "100%", direction: "rtl", display: "flex" });
    $(".bar-4").html(`<b>סה"כ: </b>&nbsp;&nbsp;${total} דגימות`);
    table.on("draw", function () {
      $(".bar-4").html(`<b>סה"כ: </b>&nbsp;&nbsp;${total} דגימות`);
    });
  },

  creatBTTable: function (data, date) {
    $("#dochTB").DataTable({
      bDestroy: true,
      data: data,
      lengthMenu: [
        [10, 25, 50, 100, -1],
        [10, 25, 50, 100, "הכל"],
      ],
      columns: [
        { data: "agency_id", title: "קוד מפעיל" },
        { data: "cluster_id", title: " קוד אשכול" },
        { data: "cluster_name", title: "שם אשכול" },
        { data: "line", title: "מס' קו " },
        { data: "makat", title: "מקט קו " },
        { data: "line_speciality", title: "יחודיות הקו " },
        { data: "service_type", title: "סוג שירות " },
        { data: "line_type", title: " סוג קו " },
        { data: "month", title: " חודש דגימה " },
        { data: "total_monthly_trips", title: "ס'כ נסיעות חודשיות " },
        { data: "total_planned", title: " תכנון" },
        { data: "total_executed", title: "  ביצוע " },
      ],
      columnDefs: [{ className: "dt-center", targets: "_all" }],
      select: {
        style: "multi",
      },

      language: {
        lengthMenu: "הצג _MENU_ שורות לדף ",
        search: "",
        searchPlaceholder: "חיפוש",
        paginate: {
          previous: "הקודם",
          next: "הבא",
        },
        info: "מציג דף _PAGE_ מתוך _PAGES_",
      },

      dom:
        "<'row top'<'col-sm-3 text-left'B><'mid col-sm-3'><' col-sm-3'l><'col-sm-3'f>>" +
        "<'bar-3'>" +
        "tr" +
        "<'row bottom'<''p>>",
      buttons: {
        dom: {
          button: {
            tag: "button",
            className: "",
          },
        },
        buttons: [
          {
            extend: "copyHtml5",
            text: `
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 27.454 31.375">
                    <path id="Icon_awesome-copy" data-name="Icon awesome-copy" d="M19.61,27.453V29.9a1.471,1.471,0,0,1-1.471,1.471H1.471A1.471,1.471,0,0,1,0,29.9V7.354A1.471,1.471,0,0,1,1.471,5.883H5.883V24.021a3.436,3.436,0,0,0,3.432,3.432Zm0-21.08V0H9.315A1.471,1.471,0,0,0,7.844,1.471V24.021a1.471,1.471,0,0,0,1.471,1.471H25.983a1.471,1.471,0,0,0,1.471-1.471V7.844H21.081A1.475,1.475,0,0,1,19.61,6.373Zm7.413-1.9L22.982.431A1.471,1.471,0,0,0,21.942,0h-.371V5.883h5.883V5.512a1.471,1.471,0,0,0-.431-1.04Z" fill="#483094"/>
                  </svg>
                  `,
            titleAttr: "Copy",
            className: "",
            exportOptions: {},
          },
          {
            extend: "excelHtml5",
            text: `
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 31.959 31.374">
                    <path id="Icon_simple-microsoftexcel" data-name="Icon simple-microsoftexcel" d="M31.363,4.167H20.657V6.149h3.156V9.283H20.657v1h3.156V13.42H20.657v1.027h3.156v2.968H20.657V18.6h3.156v2.975H20.657v1.189h3.156V25.76H20.657v2.182H31.363c.169-.051.31-.25.423-.6a2.92,2.92,0,0,0,.172-.847V4.53c0-.17-.059-.273-.172-.309A1.465,1.465,0,0,0,31.363,4.167Zm-1.389,21.59H24.838V22.768h5.136v2.989Zm0-4.178H24.838V18.6h5.136Zm0-4.165H24.838V14.459h5.136v2.955Zm0-3.995H24.838V10.285h5.136V13.42h0Zm0-4.153H24.838V6.15h5.136V9.266ZM0,3.673V28.442L18.856,31.7V.328L0,3.684ZM11.176,22.41q-.108-.292-1.009-2.481c-.6-1.459-.959-2.309-1.064-2.551H9.07L7.047,22.191l-2.7-.182L7.55,16.017,4.614,10.025,7.37,9.88l1.822,4.688h.036l2.057-4.9,2.848-.18-3.392,6.485,3.5,6.615-3.061-.18Z" transform="translate(0 -0.329)" fill="#483094"/>
                  </svg>
                  `,
            className: "",
            titleAttr: "Excel",

            exportOptions: {},
          },
        ],
      },
    });

    $(".mid").html(
      `<input type="month" id="start" class="my-input"  name="start" value="${date.slice(
        0,
        -3
      )}">`
    );
  },

  creatControllerTable: function (data) {
    $("#allControllerUl").DataTable({
      bDestroy: true,
      data: data,

      columns: [
        { data: "name", title: " שם פרטי" },
        { data: "lastName", title: " שם משפחה" },
        { data: "identificationNumber", title: "תז מבקר" },
        { data: "phone", title: "מספר טלפון" },

        {
          data: null,
          title: "משמרת",
          render: function (data, type, row, meta) {
            return "<select class='form-control' id='shiftSelct'><option value='1'>בוקר</option><option value='2'>ערב</option></select>";
          },
        },
      ],
      columnDefs: [{ className: "dt-center", targets: "_all" }],
      select: {
        style: "multi",
      },

      language: {
        lengthMenu: "הצג _MENU_ שורות לדף ",
        search: "",
        searchPlaceholder: "חיפוש",
        paginate: {
          previous: "הקודם",
          next: "הבא",
        },
        info: "מציג דף _PAGE_ מתוך _PAGES_",
      },
      createdRow: function (row, data, dataIndex) {
        $(row).attr("data", JSON.stringify({ id: data.name }));
        $(row).attr("data-ownerid", data.area);
      },

      initComplete: function () {
        this.api()
          .columns([0, 1, 2, 3])
          .every(function (d) {
            var column = this;

            var theadname = $("#allControllerUl th").eq([d]).text();
            var select = $(
              '<select class="form-control"   style="width: 5vw; float:left;" multi ><option value="" > הכל</option></select>'
            ).appendTo($("#allControllerUl th").eq([d]));
            $(select).on("change", function (e) {
              var val = $(this).val();

              column.search(val, true, false).draw();
            });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append('<option value="' + d + '">' + d + "</option>");
              });
          });
      },
      dom:
        "<'row top'<'col-sm-6 text-left'B><'col-sm-3'l><'col-sm-3'f>>" +
        "<'bar-2'>" +
        "tr" +
        "<'row bottom'<''p>>",
      buttons: [
        {
          extend: "copyHtml5",
          text: '<i class="fa fa-files-o"></i>',
          titleAttr: "Copy",
          exportOptions: {
            format: {
              body: function (data, row, column, node) {
                if (column == 4) {
                  return $(data).find("option:selected").text();
                } else return data;
              },

              header: function (content, index) {
                switch (index) {
                  case 0:
                    return "שם פרטי ";
                  case 1:
                    return "שם משפחה ";
                  case 2:
                    return "תז מבקר ";
                  case 3:
                    return "מספר טלפון";
                  case 4:
                    return "משמרת ";
                  default:
                    break;
                }
              },
            },
          },
        },
        {
          extend: "excelHtml5",
          text: `
          <svg xmlns="http://www.w3.org/2000/svg" width="31.959" height="31.374" viewBox="0 0 31.959 31.374">
            <path id="Icon_simple-microsoftexcel" data-name="Icon simple-microsoftexcel" d="M31.363,4.167H20.657V6.149h3.156V9.283H20.657v1h3.156V13.42H20.657v1.027h3.156v2.968H20.657V18.6h3.156v2.975H20.657v1.189h3.156V25.76H20.657v2.182H31.363c.169-.051.31-.25.423-.6a2.92,2.92,0,0,0,.172-.847V4.53c0-.17-.059-.273-.172-.309A1.465,1.465,0,0,0,31.363,4.167Zm-1.389,21.59H24.838V22.768h5.136v2.989Zm0-4.178H24.838V18.6h5.136Zm0-4.165H24.838V14.459h5.136v2.955Zm0-3.995H24.838V10.285h5.136V13.42h0Zm0-4.153H24.838V6.15h5.136V9.266ZM0,3.673V28.442L18.856,31.7V.328L0,3.684ZM11.176,22.41q-.108-.292-1.009-2.481c-.6-1.459-.959-2.309-1.064-2.551H9.07L7.047,22.191l-2.7-.182L7.55,16.017,4.614,10.025,7.37,9.88l1.822,4.688h.036l2.057-4.9,2.848-.18-3.392,6.485,3.5,6.615-3.061-.18Z" transform="translate(0 -0.329)" fill="#483094"/>
          </svg>
          `,
          titleAttr: "Excel",
          className: "btn",
          exportOptions: {
            format: {
              body: function (data, row, column, node) {
                if (column == 4) {
                  return $(data).find("option:selected").text();
                } else return data;
              },
              header: function (content, index) {
                switch (index) {
                  case 0:
                    return "שם פרטי ";
                  case 1:
                    return "שם משפחה ";
                  case 2:
                    return "תז מבקר ";
                  case 3:
                    return "מספר טלפון";
                  case 4:
                    return "משמרת ";
                  default:
                    break;
                }
              },
            },
          },
        },
      ],
    });
    var table = $("#allControllerUl").DataTable();
    $(".bar-2").css({ width: "100%", direction: "rtl", display: "flex" });
    $(".bar-2").html(`<b>סה"כ: </b>&nbsp;&nbsp;${table.rows().count()}`);
    table.on("draw", function () {
      $(".bar-2").html(
        `<b>סה"כ: </b>&nbsp;&nbsp;${table.rows({ search: "applied" }).count()}`
      );
    });
    $("#allControllerUl_filter").css("direction", "rtl");

    $("#allControllerUl").on("click", "td.editor-view", function () {
      let row = $(this).closest("tr");
      var data = table.row(row).data();
      privet = data.identificationNumber;
      Calendar.creatCalendar(Calendar.globalElements.currentDate);
      $("#mevakrimCont").addClass("display-none");
      $("#mvakrimListCard").addClass("display-none");
      $("#mesimotCont").removeClass("display-none");
      $(".subName").html(` שם המבקר :${data.name}${data.lastName}`);
      $("#loaderModalCenter").modal("show");
      showEvent(privet);
    });
  },
  creatsidebarEventsTable: function (data, all) {
    $("#moveTaskBtn").attr("disabled", true);
    $("#copyTaskBtn").attr("disabled", true);
    let language = {};
    if (all) {
      language = {
        lengthMenu: "הצג _MENU_ שורות לדף ",
        search: "",
        searchPlaceholder: "חיפוש",
        paginate: {
          previous: "הקודם",
          next: "הבא",
        },
        info: "מציג דף _PAGE_ מתוך _PAGES_",
      };
    } else {
      language = {
        search: "",
        searchPlaceholder: "חיפוש",
      };
    }

    $("#sidebarEventsTable").DataTable({
      bDestroy: true,
      data: data,
      paging: all,

      language: language,
      lengthMenu: [
        [50, 100, -1],
        [50, 100, "All"],
      ],
      columns: [
        { data: "auditor_name", title: "שם", visible: all },
        { data: "date", title: " תאריך", visible: all },

        {
          data: "line",
          title: "קו",
          render: function (data, type) {
            return `<div style="background-color:#483094; color:#fff; margin:0px 30%; padding:6%;">${data}</div>`;
          },
        },
        { data: "makat", title: "מקט" },
        { data: "time_range", title: " טווח שעות" },
        { data: "area_name", title: " אזור" },

        { data: "shift_name", title: " משמרת" },
        {
          data: "done",
          title: "ביצוע",
          render: function (data, type) {
            if (type === "display") {
              if (data === "true") {
                return '<span <i class="fa fa-check" aria-hidden="true" style="color: #00A405;"></i></span> ';
              } else {
                return '<span aria-hidden="true" style="font-size: 25px;">&times;</span>';
              }
            }
            return data;
          },
        },
      ],

      dom:
        "<'row top-1 top'<'col-sm-3 text-left'B><'col-sm-3'l><'col-sm-2 md'><'col-sm-4'f>>" +
        "<'bar-2'>" +
        "tr" +
        "<'row bottom'<''p>>",

      buttons: {
        dom: {
          button: {
            tag: "button",
            className: "",
          },
        },
        buttons: [
          {
            extend: "copyHtml5",
            text: `
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 27.454 31.375">
                    <path id="Icon_awesome-copy" data-name="Icon awesome-copy" d="M19.61,27.453V29.9a1.471,1.471,0,0,1-1.471,1.471H1.471A1.471,1.471,0,0,1,0,29.9V7.354A1.471,1.471,0,0,1,1.471,5.883H5.883V24.021a3.436,3.436,0,0,0,3.432,3.432Zm0-21.08V0H9.315A1.471,1.471,0,0,0,7.844,1.471V24.021a1.471,1.471,0,0,0,1.471,1.471H25.983a1.471,1.471,0,0,0,1.471-1.471V7.844H21.081A1.475,1.475,0,0,1,19.61,6.373Zm7.413-1.9L22.982.431A1.471,1.471,0,0,0,21.942,0h-.371V5.883h5.883V5.512a1.471,1.471,0,0,0-.431-1.04Z" fill="#483094"/>
                  </svg>
                  `,
            titleAttr: "Copy",
            className: "",
            title: "Data export",
            exportOptions: {},
          },
          {
            extend: "excelHtml5",
            text: `
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 31.959 31.374">
                    <path id="Icon_simple-microsoftexcel" data-name="Icon simple-microsoftexcel" d="M31.363,4.167H20.657V6.149h3.156V9.283H20.657v1h3.156V13.42H20.657v1.027h3.156v2.968H20.657V18.6h3.156v2.975H20.657v1.189h3.156V25.76H20.657v2.182H31.363c.169-.051.31-.25.423-.6a2.92,2.92,0,0,0,.172-.847V4.53c0-.17-.059-.273-.172-.309A1.465,1.465,0,0,0,31.363,4.167Zm-1.389,21.59H24.838V22.768h5.136v2.989Zm0-4.178H24.838V18.6h5.136Zm0-4.165H24.838V14.459h5.136v2.955Zm0-3.995H24.838V10.285h5.136V13.42h0Zm0-4.153H24.838V6.15h5.136V9.266ZM0,3.673V28.442L18.856,31.7V.328L0,3.684ZM11.176,22.41q-.108-.292-1.009-2.481c-.6-1.459-.959-2.309-1.064-2.551H9.07L7.047,22.191l-2.7-.182L7.55,16.017,4.614,10.025,7.37,9.88l1.822,4.688h.036l2.057-4.9,2.848-.18-3.392,6.485,3.5,6.615-3.061-.18Z" transform="translate(0 -0.329)" fill="#483094"/>
                  </svg>
                  `,
            className: "",
            titleAttr: "Excel",
            title: "Data export",

            exportOptions: {},
          },
        ],
      },
    });

    $(".bar-2").html(`<input type="checkbox" id="scales" name="scales"
  > <label for="scales">בחר הכל</label>`);
  },

  creatDT: function (data, placeId, date) {
    let newCol;
    $("#mvakrimListCardBody").css("visibility", "visible");
    if (date < new Date()) {
      newCol = {
        data: null,
        className: "",
        defaultContent: "",
        orderable: false,
      };
    } else {
      newCol = {
        data: null,
        className: "dt-center editor-delete",
        defaultContent: '<i class="fa fa-trash-o"></i>',
        orderable: false,
      };
    }
    $(placeId).DataTable({
      bDestroy: true,

      data: data,

      paging: false,

      language: {
        lengthMenu: "הצג _MENU_ שורות לדף ",
        search: "",
        searchPlaceholder: "חיפוש",
        paginate: {
          previous: "הקודם",
          next: "הבא",
        },
        info: "מציג דף _PAGE_ מתוך _PAGES_",
      },
      createdRow: function (row, data, dataIndex) {
        $(row).attr("data", JSON.stringify({ id: data.auditor_id }));
      },
      columns: [
        { data: "auditor_name", title: "שם" },
        { data: "auditor_id", title: " מספר מבקר" },
        {
          data: "ex",
          title: "ביצוע/תכנון",
          render: function (data, type, row, meta) {
            return type === "display"
              ? `<div style="display:flex;"><p>${
                  data > 0 ? "<b>" + data + "</b>" : data
                }</p><progress value="${data}" max="${row.num}"></progress><p>${
                  row.num
                }</p></div>`
              : data;
          },
          orderable: false,
        },
        {
          data: null,

          className: "dt-center editor-view",
          defaultContent: '<i class="fa fa-eye"></i>',
          orderable: false,
        },

        newCol,
      ],

      dom:
        "<'row top'<'subT col-sm-6'><'col-sm-6 text-left' f>>" +
        "<'bar-1'>" +
        "tr" +
        "<'row bottom'<''p>>",
    });

    var table = $(placeId).DataTable();

    $(".bar-1").css({
      width: "100%",
      direction: "rtl",
      display: "flex",
      justifyContent: "space-between",
    });
    $(".bar-1").html(
      `<div><b>סה"כ: </b>&nbsp;&nbsp;${table
        .rows()
        .count()}&nbsp;&nbsp;מבקרים</div><div class="addBar"></div>`
    );
    if (date > new Date()) {
      $(".addBar").html(
        `<button id="addMvaker" class="btn"><i class="fa fa-plus-circle"></i>&nbsp;&nbsp;הוסף מבקר</button`
      );
    } else {
      $(".addBar").html("");
    }

    table.on("draw", function () {
      $(".bar-1").html(
        `<b>סה"כ: </b>&nbsp;&nbsp;${table
          .rows({ search: "applied" })
          .count()}&nbsp;&nbsp;מבקרים`
      );
      if (date > new Date()) {
        $(".addBar").html("<div>ADD</div");
      } else {
        $(".addBar").html("");
      }
    });
    $(".subT").html(`<h4>דוח מבקרים</h4>`);
    table.on("draw", function () {});

    $(placeId).on("click", "td.editor-view", function () {
      let row = $(this).closest("tr");
      var data = table.row(row).data();
      let attr = $(row).attr("data");
      let id = JSON.parse(attr).id;
      $("#loaderModalCenter").modal("show");
      setTimeout(() => {
        showEvent(id);
      }, 0);
    });
    $(placeId).on("click", "td.editor-delete", function () {
      let row = $(this).closest("tr");
      var data = table.row(row).data();
      let attr = $(row).attr("data");
      let id = JSON.parse(attr).id;
      removeAuditor(id);
      console.log(id);
    });
  },
};
