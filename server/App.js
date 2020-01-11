"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _configProvider = _interopRequireDefault(require("antd/lib/config-provider"));

var _table = _interopRequireDefault(require("antd/lib/table"));

var _react = _interopRequireWildcard(require("react"));

var _reactHooks = require("@apollo/react-hooks");

var _apolloBoost = require("apollo-boost");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      query {\n        dataSource {\n          name\n          age\n          id\n          gender\n        }\n      }\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query {\n    dataSource {\n      name\n      age\n      id\n      gender\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var q = (0, _apolloBoost.gql)(_templateObject());
console.log(q);
console.log(q === (0, _apolloBoost.gql)(_templateObject2()));

var App = function App() {
  console.log('app render');
  var config = (0, _react.useRef)({
    query: {
      "kind": "Document",
      "definitions": [{
        "kind": "OperationDefinition",
        "operation": "query",
        "variableDefinitions": [],
        "directives": [],
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [{
            "kind": "Field",
            "name": {
              "kind": "Name",
              "value": "dataSource"
            },
            "arguments": [],
            "directives": [],
            "selectionSet": {
              "kind": "SelectionSet",
              "selections": [{
                "kind": "Field",
                "name": {
                  "kind": "Name",
                  "value": "name"
                },
                "arguments": [],
                "directives": []
              }, {
                "kind": "Field",
                "name": {
                  "kind": "Name",
                  "value": "age"
                },
                "arguments": [],
                "directives": []
              }, {
                "kind": "Field",
                "name": {
                  "kind": "Name",
                  "value": "id"
                },
                "arguments": [],
                "directives": []
              }, {
                "kind": "Field",
                "name": {
                  "kind": "Name",
                  "value": "gender"
                },
                "arguments": [],
                "directives": []
              }]
            }
          }]
        }
      }],
      "loc": {
        "start": 0,
        "end": 117,
        "source": {
          "body": "\n      query {\n        dataSource {\n          name\n          age\n          id\n          gender\n        }\n      }\n    ",
          "name": "GraphQL request",
          "locationOffset": {
            "line": 1,
            "column": 1
          }
        }
      }
    }
  });

  var _useQuery = (0, _reactHooks.useQuery)(config.current.query),
      data = _useQuery.data,
      loading = _useQuery.loading;

  var cfg = {
    columns: [{
      dataIndex: "name",
      title: "姓名",
      width: 2000
    }, {
      dataIndex: "age",
      title: "年龄"
    }, {
      dataIndex: "gender",
      title: "性别",
      fixed: "right",
      width: 200
    }],
    tableLayout: "auto",
    bordered: true,
    scroll: {
      x: true
    },
    size: "middle",
    rowKey: "id"
  };
  return _react.default.createElement(_table.default, _extends({
    loading: loading
  }, cfg, {
    dataSource: data && data.dataSource
  }));
};

var _default = function _default() {
  return _react.default.createElement(_reactHooks.ApolloProvider, {
    client: new _apolloBoost.ApolloClient({
      ssrMode: true,
      ssrForceFetchDelay: 100,
      cache: new _apolloBoost.InMemoryCache(),
      link: new _apolloBoost.HttpLink({
        uri: "http://localhost:3030/graphql",
        fetch: _nodeFetch.default
      })
    })
  }, _react.default.createElement(_configProvider.default, null, _react.default.createElement(App, null)));
};

exports.default = _default;
//# sourceMappingURL=App.js.map