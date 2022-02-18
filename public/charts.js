const Charts = {
  creatLineChart: function (all, done) {
    $("#svg_lineChart").remove();
    $(".loaderCont").css("display", "none");
    if (all) {
      $("#monthCount").removeClass("display-none");
      $("#monthCount").css("display", "flex");
      $("#monthCount").html(
        `<span style="color:#483094;">${done}&nbsp;&nbsp;<b>בוצעו</b></span><span><b>&nbsp;&nbsp; סה"כ</b>&nbsp;${all}&nbsp;<b>ביקורות</b></span>`
      );
      var colors = ["#483094", "#686D74", "#ffc107"]; //from   w ww. de  m o2s .co  m
      var xAxisOffset = 10;
      var chartRightPadding = 50;
      var margin = { top: 20, right: 30, bottom: 30, left: 10 },
        width = 1200 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;
      var data = [
        {
          name: "pland",
          values: [],
        },
        {
          name: "ex",
          values: [],
        },
      ];

      var lastDay = new Date(
        Calendar.globalElements.currentDate.getFullYear(),
        Calendar.globalElements.currentDate.getMonth() + 1,
        0
      );
      lastDay = lastDay.getDate();
      for (let i = 1; i <= lastDay; i++) {
        let date = new Date(
          Calendar.globalElements.currentDate.getFullYear(),
          Calendar.globalElements.currentDate.getMonth(),
          i
        );
        let price = Calendar.getEventCount(i);
        let price1 = Calendar.getExecutionCount(i);

        data[0]["values"].push({ date: date, price: price / 10 });
        data[1]["values"].push({ date: date, price: price1 / 10 });
      }

      // parsing
      var parseDate = d3.time.format("%Y-%m-%d").parse;
      // scales
      var x = d3.time.scale().range([0, width]);
      var y = d3.scale.linear().range([height, 0]);
      var pointsScale = d3.time.scale().range([0, width - chartRightPadding]);
      // axes
      var xAxis = d3.svg
        .axis()
        .scale(x)
        .tickFormat(d3.time.format("%d"))
        .tickPadding(10)
        .innerTickSize(0)
        .outerTickSize(0)
        .orient("bottom");

      var line = d3.svg
        .line()
        .x(function (d) {
          return x(d.date);
        })
        .y(function (d) {
          return y(d.price);
        });
      var chart = d3
        .select(".lineChart")
        .append("svg")
        .attr("id", "svg_lineChart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + 0 + ")");
      var g = chart.append("g");
      var dates = [];

      var companies = data.map(function (company) {
        return {
          name: company.name,
          values: company.values.map(function (value) {
            var date = new Date(value.date);
            dates.push(date);
            return {
              date: date,
              price: value.price,
            };
          }),
        };
      });

      x.domain(d3.extent(dates));
      y.domain([0, 175]);
      pointsScale.domain[(0, 31)];

      chart
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + xAxisOffset + "," + height + ")")
        .call(xAxis);

      chart.append("line").attr({
        class: "horizontalGrid",
        x1: 0,
        x2: width + xAxisOffset,
        y1: y(0),
        y2: y(0),
        fill: "none",
        "shape-rendering": "crispEdges",
        //  "stroke" : "#2A2C2E",
        "stroke-width": "1px",
        "stroke-dasharray": "3, 3",
      });
      var company = chart
        .selectAll(".company")
        .data(companies)
        .enter()
        .append("g")
        .attr("class", "company")
        .attr("transform", "translate(" + xAxisOffset + ",0)");
      var paths = chart
        .selectAll(".company")
        .append("path")
        .attr("class", "line")
        .attr("d", function (d) {
          return line(d.values);
        })
        .style("stroke", function (d, i) {
          return colors[i];
        });
    } else {
      $("#monthCount").css("display", "none");
    }
  },

  creatProgressBar: function (all, done) {
    if (all) {
      $("#monthCount").removeClass("display-none");
      $("#monthCount").css("display", "flex");
      $("#monthCount").html(
        `<span style="color:#483094;">${done}&nbsp;&nbsp;<b>בוצעו</b></span><span><b>&nbsp;&nbsp; סה"כ</b>&nbsp;${all}&nbsp;<b>ביקורות</b></span>`
      );
      $("#monthCountChart").removeClass("display-none");
      var elem = document.getElementById("myBar");
      elem.style.width = 0 + "%";
      elem.innerHTML = 0 + "%";
      var i = 0;
      if (i == 0) {
        i = 1;

        var width = 0;
        var id = setInterval(frame, 10);
        var newWith = ((done / all) * 100).toFixed(0);
        function frame() {
          if (width >= newWith) {
            clearInterval(id);
            i = 0;
          } else {
            width++;
            elem.style.width = width + "%";
            elem.innerHTML = width + "%";
          }
        }
      }
    } else {
      $("#monthCountChart").addClass("display-none");
    }
  },
  creatbarChart: function () {
    $("#my_dataviz").empty();
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40,
      },
      width = 1400 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear().range([height, 0]);

    var color = d3.scale.ordinal().range(["#ddd", "#483094"]);

    var xAxis = d3.svg
      .axis()
      .scale(x0)
      .tickFormat(d3.time.format("%d.%m"))
      .tickPadding(10)
      .innerTickSize(0)
      .outerTickSize(0)
      .orient("bottom");

    var yAxis = d3.svg
      .axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));

    var svg = d3
      .select("#my_dataviz")

      .attr("width", width + margin.left + 0)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + 0 + "," + margin.top + ")");
    var data = [];

    var lastDay = new Date(
      Calendar.globalElements.currentDate.getFullYear(),
      Calendar.globalElements.currentDate.getMonth() + 1,
      0
    );
    lastDay = lastDay.getDate();
    for (let i = 1; i <= lastDay; i++) {
      let date = new Date(
        Calendar.globalElements.currentDate.getFullYear(),
        Calendar.globalElements.currentDate.getMonth(),
        i
      );
      let events = Calendar.getEventCount(i, false);
      let Execution = Calendar.getExecutionCount(i, false);

      data.push({ date: date, events: events, Execution: Execution });
    }

    var ageNames = d3.keys(data[0]).filter(function (key) {
      return key !== "date";
    });

    data.forEach(function (d) {
      d.ages = ageNames.map(function (name) {
        return {
          name: name,
          value: +d[name],
        };
      });
    });

    x0.domain(
      data.map(function (d) {
        return d.date;
      })
    );

    x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([
      0,
      d3.max(data, function (d) {
        return d3.max(d.ages, function (d) {
          return d.value;
        });
      }),
    ]);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.select(".x.axis").selectAll("text").style("font-size", "10px");

    var state = svg
      .selectAll(".state")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "state")
      .attr("transform", function (d) {
        return "translate(" + x0(d.date) + ",0)";
      });

    state
      .selectAll("rect")
      .data(function (d) {
        return d.ages;
      })
      .enter()
      .append("rect")
      .attr("width", x1.rangeBand() - 7)
      .attr("x", function (d) {
        return x1(d.name);
      })
      .attr("height", function (d) {
        return height - y(0);
      }) // always equal to 0
      .attr("y", function (d) {
        return y(0);
      })
      .style("fill", function (d) {
        return color(d.name);
      })
      .transition()
      .duration(1000)
      .attr("y", function (d) {
        return y(d.value);
      })
      .attr("height", function (d) {
        return height - y(d.value);
      });
  },
  creatDonatChart: function (all, done) {
    if (all) {
      $("#donut").removeClass("display-none");
    }
    $("#svg_1").remove();
    var dataset = { things: [all, done] };
    var width = 300;
    var height = 200;
    var radius = Math.min(width, height) / 2;
    var color = ["#f1f1f1", "#483094"];
    var pie = d3.layout.pie().sort(null);
    var arc = d3.svg
      .arc()
      .innerRadius(radius - 20)
      .outerRadius(radius - 50);
    var svg = d3
      .select("#donut")
      .append("svg")
      .attr("id", "svg_1")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2.3 + ")");
    if (all) {
      var path = svg
        .selectAll("path")
        .data(pie(dataset.things))
        .enter()
        .append("path")
        .attr("fill", function (d, i) {
          return color[i];
        })
        .transition()
        .duration(1000)
        .attr("d", arc);

      svg
        .append("svg:text")
        .attr("dy", "-1.5em")
        .attr("text-anchor", "middle")
        .attr("style", "font-family:Ubuntu")
        .attr("font-size", "17")
        .attr("fill", "black")
        .text(
          'סה"כ '
          // ((done / all) * 100).toFixed(1) != "Infinity" &&
          //   !isNaN(((done / all) * 100).toFixed(1))
          //   ? ((done / all) * 100).toFixed(1) + "%"
          //   : ""
        );
      svg
        .append("text")
        .attr("dy", "0em") // you can vary how far apart it shows up
        .attr("text-anchor", "middle")
        .attr("style", "font-family:Ubuntu")
        .attr("style", "font-weight:bolder;")
        .attr("font-size", "20")
        .attr("fill", "black")
        .text(all); // "line 2" or whatever value you want to add here.
      svg
        .append("text")
        .attr("dy", "1.5em") // you can vary how far apart it shows up
        .attr("text-anchor", "middle")
        .attr("style", "font-family:Ubuntu")
        .attr("font-size", "17")
        .attr("fill", "black")
        .text("ביקורות"); // "line 2" or whatever value you want to add here.

      $("#donatLeft").html(
        `<div style="direction: rtl; color:#483094;"><span>${(
          100 -
          (done / all) * 100
        ).toFixed(
          0
        )}%</span>&nbsp;&nbsp;לביצוע</div><div style="direction: rtl;"> <span>${
          all - done
        }</span>&nbsp;&nbsp;ביקורות</div>`
      );
      $("#donatDone").html(
        `<div style="direction: rtl; color:#483094;"><span>${(
          (done / all) *
          100
        ).toFixed(
          0
        )}%</span>&nbsp;&nbsp;בוצעו</div><div style="direction: rtl;"> <span>${done}</span>&nbsp;&nbsp;ביקורות</div>`
      );
    }
  },
};
