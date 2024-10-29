/*! instantDataScraper - 2018-02-26 */

function a(a) {
  return Math.max.apply(
    null,
    Object.keys(a).map(function (b) {
      return a[b];
    })
  );
}
function b(a, b) {
  return (
    (b || ".") +
    a.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&").trim()
  );
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
  function b(a, b) {
    for (var c = b.split(" "), d = 0; d < c.length; d++)
      if (!a.hasClass(c[d])) return !1;
    return !0;
  }
  var d = $(a).children(),
    e = {},
    f = {};
  d.each(function () {
    if (
      !["script", "img"].includes(this.nodeName.toLowerCase()) &&
      $(this).text().trim().length
    ) {
      var a = c($(this))
          .sort()
          .filter(function (a) {
            return !a.match(/\d/);
          }),
        b = a.join(" ");
      b in f || (f[b] = 0),
        f[b]++,
        a.forEach(function (a) {
          a in e || (e[a] = 0), e[a]++;
        });
    }
  });
  var g = Object.keys(f).filter(function (a) {
    return f[a] >= d.length / 2 - 2;
  });
  return (
    g.length ||
      (g = Object.keys(e).filter(function (a) {
        return e[a] >= d.length / 2 - 2;
      })),
    d.filter(function () {
      var a = !1,
        c = $(this);
      return (
        g.forEach(function (d) {
          a |= b(c, d);
        }),
        a
      );
    })
  );
}
function e() {
  m.length ||
    ($("body *").each(function () {
      var a = $(this).width() * $(this).height(),
        b = d(this),
        c = b.length,
        e = a * c * c;
      isNaN(e) ||
        (m.push({
          table: this,
          area: a,
          children: b,
          text: b.text(),
          score: e,
          selector: i(this),
        }),
        (bestArea = a),
        (bestScore = e),
        (bestChildren = b),
        (bestTable = this));
    }),
    (m = m
      .sort(function (a, b) {
        return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
      })
      .slice(0, o)),
    console.log("Best tables:", m));
}
function f() {
  var a = (n + m.length - 1) % m.length;
  $(m[a].table).removeClass("tablescraper-selected-table"),
    $(m[a].children).removeClass("tablescraper-selected-row"),
    $(m[n].table).addClass("tablescraper-selected-table"),
    $(m[n].children).addClass("tablescraper-selected-row");
}
function g(a) {
  return a.clone().children().remove().end().text();
}
function h(a, b) {
  var e;
  if (b) {
    var i = (function (a) {
      for (; a.length; ) {
        if ($(a).length) return $(a);
        a = a.split(" ").slice(1).join(" ");
      }
      return null;
    })(b);
    if (!i)
      return a({ error: "Table not found" }), console.log("Table not found");
    m.length || (m = [{}]);
    var j = d(i);
    return i.is($(m[n].table)) && j.text() == m[n].text
      ? (a({ error: "Table not changed. Try to increase crawl delay" }),
        console.log("Table not changed"))
      : ((m[n].table = i),
        (m[n].children = j),
        (m[n].text = j.text()),
        f(),
        void h(a));
  }
  e = m[n].children;
  var k = [];
  e.each(function () {
    function a(a, b, c) {
      if (a) {
        for (var e = b + (c ? " " + c : ""), f = e, g = 1; f in d; )
          f = e + " " + ++g;
        d[f] = a;
      }
    }
    function b(d, e) {
      d.children().each(function () {
        var d = $(this),
          f =
            e +
            "/" +
            this.nodeName.toLowerCase() +
            c(d)
              .map(function (a) {
                return "." + a;
              })
              .join("");
        a(g(d).trim(), f),
          a(d.prop("href"), f, "href"),
          a(d.prop("src"), f, "src"),
          b(d, f);
      });
    }
    var d = {};
    $(this);
    b($(this), ""), Object.keys(d).length && k.push(d);
  }),
    console.log("Collected table data:", k),
    a({ data: k, tableId: n, tableSelector: m[n].selector });
}
function i(a) {
  return $(a)
    .parents()
    .addBack()
    .not("html")
    .not("body")
    .map(function () {
      var a = this.tagName.toLowerCase();
      return (
        "string" == typeof this.id && this.id.trim() && !this.id.match(/\d+/g)
          ? (a += b(this.id, "#"))
          : "string" == typeof this.className &&
            this.className.trim() &&
            (a += b(this.className).replace(/ +/g, ".")),
        a
      );
    })
    .get()
    .join(" ");
}
function j(a) {
  window.focus(),
    (q = function (a) {
      $(this).is($(a.target)) &&
        ($("*").removeClass("tablescraper-hover"),
        $(i(this)).last().addClass("tablescraper-hover"));
    });
  var b = function (b) {
    $("*").off("click", p).off("mouseenter", q),
      $(".tablescraper-hover").removeClass("tablescraper-hover"),
      $(".tablescraper-next-button").removeClass("tablescraper-next-button");
    var c = i(b.target);
    $(b.target).addClass("tablescraper-next-button"),
      console.log("Next button selector:", c),
      a({ selector: c });
  };
  (p = function (a) {
    return a.preventDefault(), b(a), !1;
  }),
    $("*").click(p).on("mouseenter", q);
}
function k(a) {
  var b = document.createEvent("MouseEvents");
  b.initMouseEvent(
    "mousedown",
    !0,
    !0,
    window,
    1,
    a.x,
    a.y,
    a.x,
    a.y,
    !1,
    !1,
    !1,
    !1,
    0,
    null
  );
  var c = document.createEvent("MouseEvents");
  c.initMouseEvent(
    "click",
    !0,
    !0,
    window,
    1,
    a.x,
    a.y,
    a.x,
    a.y,
    !1,
    !1,
    !1,
    !1,
    0,
    null
  );
  var d = document.createEvent("MouseEvents");
  d.initMouseEvent(
    "mouseup",
    !0,
    !0,
    window,
    1,
    a.x,
    a.y,
    a.x,
    a.y,
    !1,
    !1,
    !1,
    !1,
    0,
    null
  ),
    a.dispatchEvent(b),
    a.dispatchEvent(c),
    a.dispatchEvent(d);
}
function l(a, b, c) {
  var d = (function (a) {
    for (; a.length; ) {
      if ($(a).length) return $(a);
      a = a.split(" ").slice(1).join(" ");
    }
    return null;
  })(a);
  return d
    ? (d.last().addClass("tablescraper-next-button"),
      c
        ? b({})
        : ($("*").off("click", p).off("mouseenter", q),
          void setTimeout(function () {
            k(d.last()[0]), b({});
          }, 100)))
    : b({
        error: c
          ? "Next button not found"
          : "No more next buttons: Finished crawling. Download CSV or Excel file",
      });
}
var m = [],
  n = 0,
  o = 5,
  p,
  q,
  r = !1;
chrome.extension.onRequest.addListener(function (a, b, c) {
  return (
    console.log("Got request", a),
    "nextTable" == a.action || "findTables" == a.action
      ? ("findTables" == a.action ? e() : (n = (n + 1) % m.length),
        f(),
        c({
          tableId: n,
          tableSelector: m[n].selector,
          href: window.location.href,
          hostname: window.location.hostname,
        }))
      : "getTableData" == a.action
      ? h(c, a.selector)
      : "getNextButton" == a.action
      ? j(c)
      : "clickNext" == a.action
      ? l(a.selector, c)
      : "markNextButton" == a.action
      ? l(a.selector, c, !0)
      : void c({})
  );
}),
  console.log("Table scraper loaded."),
  chrome.runtime.sendMessage({ state: "loaded" }, function (a) {});
