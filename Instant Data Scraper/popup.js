/*! instantDataScraper - 2018-02-26 */

function a(a, b, c, d, e, f, g) {
  function h() {
    !n &&
      o &&
      (
        g ||
        function (a) {
          a(!0);
        }
      )(function (a) {
        if (!a) return k();
        n ||
          ((n = !0),
          chrome.webRequest.onBeforeRequest.removeListener(i),
          chrome.webRequest.onCompleted.removeListener(j),
          b());
      });
  }
  function i(a) {
    (l[a.requestId] = 1), (m = new Date());
  }
  function j(a) {
    m && (delete l[a.requestId], Object.keys(l).length || k());
  }
  function k() {
    setTimeout(function () {
      new Date() - m < e || Object.keys(l).length || h();
    }, e);
  }
  var l = {},
    m = null,
    n = !1,
    o = !1,
    p = {
      urls: ["<all_urls>"],
      tabId: c,
      types: [
        "main_frame",
        "sub_frame",
        "stylesheet",
        "script",
        "font",
        "object",
        "xmlhttprequest",
        "other",
      ],
    };
  chrome.webRequest.onBeforeRequest.addListener(i, p),
    chrome.webRequest.onCompleted.addListener(j, p),
    chrome.webRequest.onErrorOccurred.addListener(j, p),
    (
      a ||
      function (a) {
        a();
      }
    )(function () {
      setTimeout(h, d),
        setTimeout(function () {
          (o = !0), k();
        }, f);
    });
}
function b(a, b) {
  return (b || ".") + a.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&");
}
function c(a) {
  return (a.attr("class") || "")
    .trim()
    .split(/\s+/)
    .filter(function (a) {
      return a;
    });
}
function d(a) {
  for (
    var b = window.location.search.substring(1), c = b.split("&"), d = 0;
    d < c.length;
    d++
  ) {
    var e = c[d].split("=");
    if (decodeURIComponent(e[0]) == a) return decodeURIComponent(e[1]);
  }
  console.log("Query variable %s not found", a);
}
function e(a, b, c, d) {
  if ("" === a) return $("#" + b).hide();
  console.log(a),
    $("#" + b)
      .show()
      .text(a),
    c && s(),
    d && _gaq.push(["_trackEvent", "Error", x.startingUrl || w.url, a, 1]);
}
function f(a) {
  function c(a) {
    return a in e ? e[a] : ((e[a] = $(b(a)).length), e[a]);
  }
  var d = a.length,
    e = { "": 1 / 0 },
    f = {},
    g = {},
    h = {},
    i = {};
  a.map(function (a) {
    for (var b in a) b in f || (f[b] = 0), f[b]++;
  }),
    Object.keys(f)
      .map(function (a) {
        return [f[a], a];
      })
      .forEach(function (b) {
        var e = "",
          f = 1 / 0;
        b[1]
          .split(" ")[0]
          .split("/")
          .slice(1)
          .reverse()
          .forEach(function (a) {
            a.split(".")
              .slice(1)
              .forEach(function (a) {
                f < 2 * d || c(a) >= f || ((e = a), (f = c(a)));
              });
          });
        var j = b[1].split(" ")[1],
          k = 0,
          l = a.map(function (a) {
            return b[1] in a;
          });
        j && isNaN(j) && (e += " " + j),
          e in g
            ? (g[e].forEach(function (a, b) {
                if (!k) {
                  var c = !0;
                  a.forEach(function (a, b) {
                    c &= !(l[b] && a);
                  }),
                    c && (k = b + 1);
                }
              }),
              k
                ? (g[e][k - 1] = g[e][k - 1].map(function (a, b) {
                    return l[b] || a;
                  }))
                : (g[e].push(l), (k = g[e].length)),
              k > 1 && (e += " " + k))
            : (g[e] = [l]),
          e in h || (h[e] = []),
          h[e].push(b[1]),
          e in i || (i[e] = 0),
          (i[e] += b[0]);
      });
  var j = {},
    k = 0,
    l = 0,
    m = 0;
  (g = Object.keys(h).filter(function (b) {
    var c = {},
      e = [];
    return (
      !(b in x.config.deletedFields) &&
      (a.map(function (a) {
        for (var d, f = 0; f < h[b].length; f++)
          h[b][f] in a && ((d = a[h[b][f]]), d in c || (c[d] = 0), c[d]++);
        e.push(d);
      }),
      Object.keys(c).length && c[Object.keys(c)[0]] == d
        ? (l++, !1)
        : (e = JSON.stringify(e)) in j
        ? (k++, !1)
        : ((j[e] = 1), !(i[b] < 0.2 * d) || (m++, !1)))
    );
  })),
    console.log("Same columns: " + k),
    console.log("Columns with same rows: " + l),
    console.log("Columns with few rows: " + m),
    console.log("Generated column names:", g);
  var n = {
    fields: g,
    data: a.map(function (a) {
      return g.map(function (b) {
        for (var c = 0; c < h[b].length; c++)
          if (h[b][c] in a) return a[h[b][c]];
        return "";
      });
    }),
  };
  return console.log("Generated csv:", n), n;
}
function g(a) {
  return a.map(function (a) {
    return a in x.config.headers ? x.config.headers[a] : a;
  });
}
function h(a) {
  var b = f(a);
  return (b.fields = g(b.fields)), b;
}
function i(a) {
  for (
    var b = new ArrayBuffer(a.length), c = new Uint8Array(b), d = 0;
    d != a.length;
    ++d
  )
    c[d] = 255 & a.charCodeAt(d);
  return b;
}
function j(a, b) {
  return (
    b && (a += 1462), (Date.parse(a) - new Date(Date.UTC(1899, 11, 30))) / 864e5
  );
}
function k(a, b) {
  for (
    var c = {}, d = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } }, e = 0;
    e != a.length;
    ++e
  )
    for (var f = 0; f != a[e].length; ++f) {
      d.s.r > e && (d.s.r = e),
        d.s.c > f && (d.s.c = f),
        d.e.r < e && (d.e.r = e),
        d.e.c < f && (d.e.c = f);
      var g = { v: a[e][f] };
      if (null !== g.v) {
        var h = XLSX.utils.encode_cell({ c: f, r: e });
        "number" == typeof g.v
          ? (g.t = "n")
          : "boolean" == typeof g.v
          ? (g.t = "b")
          : g.v instanceof Date
          ? ((g.t = "n"), (g.z = XLSX.SSF._table[14]), (g.v = j(g.v)))
          : (g.t = "s"),
          (c[h] = g);
      }
    }
  return d.s.c < 1e7 && (c["!ref"] = XLSX.utils.encode_range(d)), c;
}
function l(a, b) {
  function c() {
    if (!(this instanceof c)) return new c();
    (this.SheetNames = []), (this.Sheets = {});
  }
  a.data.unshift(a.fields);
  var d = new c(),
    e = k(a.data);
  return (
    d.SheetNames.push(b), (d.Sheets[b] = e), XLSX.write(d, { type: "binary" })
  );
}
function m() {
  console.log([
    "_trackEvent",
    "Download",
    x.hostName,
    x.startingUrl,
    x.data.length,
  ]),
    _gaq.push([
      "_trackEvent",
      "Download",
      x.hostName,
      x.startingUrl,
      x.data.length,
    ]);
}
function n() {
  console.log("Showing preview");
  var a = f(x.data);
  (a.data = a.data.slice(0, y)), (x.previewLength = a.data.length);
  var b = $(".wtHolder").scrollTop(),
    c = $(".wtHolder").scrollLeft(),
    d = !1;
  $("#hot").empty();
  new Handsontable($("#hot").get(0), {
    data: a.data,
    colHeaders: g(a.fields),
    wordWrap: !1,
    manualColumnResize: !0,
    width: $(window).width() - 20,
    height: $(window).height() - 300,
    afterRender: function () {
      d ||
        ((d = !0), $(".wtHolder").scrollTop(b), $(".wtHolder").scrollLeft(c));
    },
    modifyColWidth: function (a, b) {
      if (a > 300) return 300;
    },
    afterGetColHeader: function (b, c) {
      if (-1 != b && !($(c).children().length > 1)) {
        var d = this,
          e = $("<div>", { class: "hot-header" }),
          f = $("<div>", {
            class: "header-input",
            contenteditable: "true",
            text: c.firstChild.textContent,
          });
        $(c).append(e),
          e.append(f),
          e.append(
            $("<span>", {
              class: "glyphicon glyphicon-remove remove-column",
            }).click(function () {
              (x.config.deletedFields[a.fields[b]] = !0),
                o(),
                $("#resetColumns").show(),
                n();
            })
          ),
          $(c).click(function () {
            console.log("a"),
              setTimeout(function () {
                f.trigger("focus");
              }, 10);
          }),
          Handsontable.Dom.addEvent(f.get(0), "input", function (c) {
            var e = d.getColHeader();
            (e[b] = f.text()),
              console.log(f.text()),
              (x.config.headers[a.fields[b]] = f.text()),
              o(),
              d.updateSettings({ colHeaders: e });
          }),
          (c.firstChild.style.display = "none");
      }
    },
    beforeOnCellMouseDown: function (a, b, c) {
      b.row < 0 && a.stopImmediatePropagation();
    },
  });
}
function o() {
  localStorage.setItem(x.configName, JSON.stringify(x.config));
}
function p(a) {
  $("#waitHeader").hide(),
    e(
      "Instant Data doesn't support data extraction from this site yet. Our administrators are notified and will try to add support in the future. Thanks for trying us out!",
      "noResponseErr",
      !1,
      !0
    );
}
function q(a) {
  if (!a) {
    if (w.reloaded) return p();
    (w.reloaded = !0),
      chrome.tabs.reload(w.id, {}, function () {
        setTimeout(r, 1e3);
      });
  }
  (x.tableId = a.tableId),
    (x.scraping = !1),
    (x.tableSelector = a.tableSelector),
    (x.startingUrl = a.href),
    (x.hostName = a.hostname),
    (x.previewLength = 0),
    (x.configName = a.hostname + "-config"),
    (x.config = JSON.parse(localStorage.getItem(x.configName)) || {
      headers: {},
      deletedFields: {},
      crawlDelay: 1e3,
      maxWait: 2e4,
    }),
    Object.keys(x.config.deletedFields).length && $("#resetColumns").show();
  var b = w.url.substring(0, 30);
  $("#wrongTable").show(),
    chrome.tabs.sendRequest(w.id, { action: "getTableData" }, function (a) {
      a.tableId == x.tableId &&
        (x.pages ||
          ($("#nextButton").show(),
          (x.nextSelector = localStorage.getItem("nextSelector:" + x.hostName)),
          console.log("Next selector for " + x.hostName, x.nextSelector),
          x.nextSelector &&
            chrome.tabs.sendRequest(
              w.id,
              { action: "markNextButton", selector: x.nextSelector },
              function (a) {
                a.error || $("#startScraping").show();
              }
            )),
        $("#wait").hide(),
        $("#content").show(),
        e(
          'Download data or locate "Next" to crawl multiple pages',
          "instructions"
        ),
        (x.data = a.data),
        (x.pages = 1),
        (x.lastRows = a.data.length),
        (x.tableSelector = a.tableSelector),
        (x.workingTime = 0),
        v(),
        n(),
        $(".download-button").show(),
        $("#csv")
          .off("click")
          .click(function () {
            console.log("Downloading CSV..."),
              m(),
              u({ download: !0 }),
              saveAs(
                new Blob([Papa.unparse(h(x.data))], {
                  type: "application/octet-stream",
                }),
                b + ".csv"
              );
          }),
        $("#xlsx")
          .off("click")
          .click(function () {
            console.log("Downloading XLS..."),
              m(),
              u({ download: !0 }),
              saveAs(
                new Blob([i(l(h(x.data), w.url.substring(0, 100)))], {
                  type: "application/octet-stream",
                }),
                b + ".xlsx"
              );
          }));
    });
}
function r() {
  chrome.tabs.sendRequest(w.id, { action: "findTables" }, q);
}
function s() {
  (x.scraping = !1),
    console.log("Scraping stopped."),
    $("#startScraping").show(),
    $("#stopScraping").hide(),
    e(
      "Crawling stopped. Please download data or continue crawling.",
      "instructions"
    );
}
function t() {
  $("#pleaseRate").show(),
    $("#rateLater")
      .show()
      .click(function () {
        u({ rate: "later" }),
          $("#pleaseRate").hide(),
          _gaq.push(["_trackEvent", "Click", "Rate later", "", 1]);
      }),
    $("#rate")
      .show()
      .click(function () {
        u({ rate: "now" }),
          $("#pleaseRate").hide(),
          _gaq.push(["_trackEvent", "Click", "Rate now", "", 1]),
          chrome.tabs.create({
            url: "https://chrome.google.com/webstore/detail/instant-data-scraper/ofaokhiedipichpaobibbnahnkdoiiah/reviews",
          });
      });
}
function u(a) {
  var b = JSON.parse(localStorage.getItem("stats")) || {
    pages: 0,
    rows: 0,
    downloads: 0,
    tabs: 0,
    lastRateRequest: null,
    lastDownloads: 0,
    lastRows: 0,
    rated: !1,
  };
  a.download
    ? b.downloads++
    : a.rate
    ? ("later" == a.rate &&
        ((b.lastRateRequest = new Date().getTime()),
        (b.lastDownloads = b.downloads),
        (b.lastRows = b.rows)),
      "now" == a.rate && (b.rated = !0))
    : (1 == x.pages && b.tabs++, b.pages++, (b.rows += x.lastRows)),
    !b.rated &&
      new Date().getTime() - b.lastRateRequest > 52704e5 &&
      b.downloads - b.lastDownloads > 9 &&
      b.rows - b.lastRows > 999 &&
      t(),
    localStorage.setItem("stats", JSON.stringify(b));
}
function v() {
  $("#stats")
    .empty()
    .append($("<div>", { text: "Pages scraped: " + x.pages }))
    .append($("<div>", { text: "Rows collected: " + x.data.length }))
    .append($("<div>", { text: "Rows from last page: " + x.lastRows }))
    .append(
      $("<div>", {
        text: "Working time: " + parseInt(x.workingTime / 1e3) + "s",
      })
    ),
    u({});
}
var w = { id: parseInt(d("tabid")), url: d("url") },
  x = {},
  y = 1e3;
$("#wrongTable").click(function () {
  chrome.tabs.sendRequest(w.id, { action: "nextTable" }, q);
}),
  r(),
  $("#nextButton").click(function () {
    function a() {
      chrome.tabs.sendRequest(w.id, { action: "getNextButton" }, function (b) {
        x.scraping ||
          (x.gettingNext && a(),
          b.selector &&
            ($("#startScraping").show(),
            e(
              '"Next" button located. Press "Start crawling" to get more pages or mark another button/link if marked incorrectly.',
              "instructions"
            ),
            (x.nextSelector = b.selector),
            localStorage.setItem("nextSelector:" + x.hostName, b.selector),
            console.log(b)));
      });
    }
    $("#nextButton").hide(),
      e('Mark "Next" button or link', "instructions"),
      (x.gettingNext = !0),
      a();
  }),
  $("#startScraping").click(function () {
    function b() {
      a(
        function (a) {
          chrome.tabs.sendRequest(
            w.id,
            { action: "clickNext", selector: x.nextSelector },
            function (b) {
              if ((console.log("Clicked next, response:", b), b && b.error))
                return (
                  e("", "instructions"),
                  e("Error clicking next: " + b.error, "error", !0)
                );
              $("#wrongTable").hide(), a();
            }
          );
        },
        function () {
          console.log("Getting table..."),
            chrome.tabs.sendRequest(
              w.id,
              { action: "getTableData", selector: x.tableSelector },
              function (a) {
                if ((console.log("Got table data, response:", a), a)) {
                  if ((console.log("Got table data, response:", a), a.error))
                    return (
                      e("", "instructions"),
                      e("Error getting table: " + a.error, "error", !0)
                    );
                  (x.lastRows = a.data.length),
                    x.pages++,
                    (x.data = x.data.concat(a.data)),
                    (x.workingTime += new Date() - c),
                    (c = new Date()),
                    v(),
                    x.previewLength < y
                      ? n()
                      : e("Preview limited to 1000 rows.", "previewLimit"),
                    x.scraping && b();
                }
              }
            );
        },
        w.id,
        x.config.maxWait,
        100,
        x.config.crawlDelay,
        function (a) {
          chrome.tabs.sendRequest(w.id, {}, function (b) {
            a(void 0 !== b);
          });
        }
      );
    }
    (x.gettingNext = !1),
      (x.scraping = !0),
      console.log("Starting scraping..."),
      $("#startScraping").hide(),
      $("#nextButton").hide(),
      $("#stopScraping").show(),
      e("", "error"),
      e('Please wait for more pages or press "Stop crawling".', "instructions");
    var c = new Date();
    b();
  }),
  $("#stopScraping").click(s),
  $("#crawlDelay").bind(
    "propertychange change click keyup input paste",
    function () {
      var a = $(this).val();
      if (isNaN(a) || a < 0 || parseInt(1e3 * a) >= x.config.maxWait)
        return e("Bad min waiting value", "inputError");
      e("", "inputError"), (x.config.crawlDelay = parseInt(1e3 * a)), o();
    }
  ),
  $("#maxWait").bind(
    "propertychange change click keyup input paste",
    function () {
      var a = $(this).val();
      if (isNaN(a) || parseInt(1e3 * a) <= x.config.crawlDelay)
        return e("Bad max waiting value", "inputError");
      e("", "inputError"), (x.config.maxWait = parseInt(1e3 * a)), o();
    }
  ),
  $("#resetColumns").click(function () {
    (x.config.deletedFields = {}), o(), $("#resetColumns").hide(), n();
  }),
  setTimeout(function () {
    $("#waitHeader").is(":visible") && p(!0);
  }, 3e4),
  $(window).resize(function () {
    n();
  });
