"use strict";
exports.__esModule = true;
var Components_1 = require("../Components");
var link_1 = require("next/link");
var route = "/route.tsx";
function Home() {
    return (React.createElement(Components_1.Layout, null,
        React.createElement(link_1["default"], { href: "route" }, "To route !")));
}
exports["default"] = Home;
