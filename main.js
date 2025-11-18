"use strict";
(self["webpackChunkcow_catalog"] = self["webpackChunkcow_catalog"] || []).push([["main"],{

/***/ 4114:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRoutingModule: () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);



const routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'cows'
}, {
  path: 'cows',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_cows_cows_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./cows/cows.module */ 1497)).then(m => m.CowsModule)
}, {
  path: '**',
  redirectTo: 'cows'
}];
class AppRoutingModule {
  static {
    this.ɵfac = function AppRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppRoutingModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: AppRoutingModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
})();

/***/ }),

/***/ 92:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _shared_components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/components/toolbar/toolbar.component */ 565);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);



class AppComponent {
  constructor() {
    this.title = 'Cow Catalog';
  }
  static {
    this.ɵfac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      decls: 4,
      vars: 0,
      consts: [[1, "app-shell"], [1, "app-shell-main"]],
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-toolbar");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "main", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "router-outlet");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
      },
      dependencies: [_shared_components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_0__.ToolbarComponent, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet],
      styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy4vLi4vY293LWNhdGFsb2clMjAoMSkvc3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0FDQ0YiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuIiwiOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 635:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ 3835);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 4114);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 92);
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/core.module */ 8423);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/shared.module */ 3887);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);







class AppModule {
  static {
    this.ɵfac = function AppModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
      imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__.BrowserAnimationsModule, _core_core_module__WEBPACK_IMPORTED_MODULE_2__.CoreModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__.SharedModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__.BrowserAnimationsModule, _core_core_module__WEBPACK_IMPORTED_MODULE_2__.CoreModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__.SharedModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule]
  });
})();

/***/ }),

/***/ 8423:
/*!*************************************!*\
  !*** ./src/app/core/core.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CoreModule: () => (/* binding */ CoreModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);

class CoreModule {
  // Guard against re-importing core module
  constructor(parentModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
  static {
    this.ɵfac = function CoreModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CoreModule)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](CoreModule, 12));
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: CoreModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({});
  }
}

/***/ }),

/***/ 8940:
/*!************************************************!*\
  !*** ./src/app/core/models/cow-status.enum.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CowStatus: () => (/* binding */ CowStatus)
/* harmony export */ });
// Enum for cow Status s
var CowStatus;
(function (CowStatus) {
  CowStatus["ACTIVE"] = "ACTIVE";
  CowStatus["IN_TREATMENT"] = "IN_TREATMENT";
  CowStatus["DECEASED"] = "DECEASED";
})(CowStatus || (CowStatus = {}));

/***/ }),

/***/ 565:
/*!****************************************************************!*\
  !*** ./src/app/shared/components/toolbar/toolbar.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolbarComponent: () => (/* binding */ ToolbarComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primeng/toolbar */ 1973);


class ToolbarComponent {
  static {
    this.ɵfac = function ToolbarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ToolbarComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: ToolbarComponent,
      selectors: [["app-toolbar"]],
      decls: 6,
      vars: 0,
      consts: [[1, "p-toolbar-group-left"], [1, "app-logo"], [1, "app-title"]],
      template: function ToolbarComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p-toolbar")(1, "div", 0)(2, "span", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "\uD83D\uDC04");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Cow Catalog");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        }
      },
      dependencies: [primeng_toolbar__WEBPACK_IMPORTED_MODULE_1__.Toolbar],
      styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.app-logo[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin-right: 0.5rem;\n}\n\n.app-title[_ngcontent-%COMP%] {\n  font-weight: 900;\n  font-size: 2.25rem;\n  color: brown;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvdG9vbGJhci90b29sYmFyLmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy4vLi4vY293LWNhdGFsb2clMjAoMSkvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy90b29sYmFyL3Rvb2xiYXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0FDQ0Y7O0FERUE7RUFDRSxpQkFBQTtFQUNBLG9CQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0MsWUFBQTtBQ0NIIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLmFwcC1sb2dvIHtcbiAgZm9udC1zaXplOiAxLjVyZW07XG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xufVxuXG4uYXBwLXRpdGxlIHtcbiAgZm9udC13ZWlnaHQ6IDkwMDtcbiAgZm9udC1zaXplOiAyLjI1cmVtO1xuICAgY29sb3I6IGJyb3duO1xufVxuIiwiOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLmFwcC1sb2dvIHtcbiAgZm9udC1zaXplOiAxLjVyZW07XG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xufVxuXG4uYXBwLXRpdGxlIHtcbiAgZm9udC13ZWlnaHQ6IDkwMDtcbiAgZm9udC1zaXplOiAyLjI1cmVtO1xuICBjb2xvcjogYnJvd247XG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 7569:
/*!***************************************************!*\
  !*** ./src/app/shared/pipes/status-label.pipe.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StatusLabelPipe: () => (/* binding */ StatusLabelPipe)
/* harmony export */ });
/* harmony import */ var _core_models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/models/cow-status.enum */ 8940);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);


class StatusLabelPipe {
  transform(value) {
    switch (value) {
      case _core_models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__.CowStatus.ACTIVE:
        return 'Active';
      case _core_models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__.CowStatus.IN_TREATMENT:
        return 'In Treatment';
      case _core_models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__.CowStatus.DECEASED:
        return 'Deceased';
      default:
        return value;
    }
  }
  static {
    this.ɵfac = function StatusLabelPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || StatusLabelPipe)();
    };
  }
  static {
    this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({
      name: "statusLabel",
      type: StatusLabelPipe,
      pure: true
    });
  }
}

/***/ }),

/***/ 3887:
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SharedModule: () => (/* binding */ SharedModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/table */ 6676);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/button */ 9136);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/inputtext */ 8361);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/dropdown */ 6895);
/* harmony import */ var primeng_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/card */ 1486);
/* harmony import */ var primeng_timeline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/timeline */ 4357);
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/dialog */ 6280);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/toolbar */ 1973);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/toast */ 1225);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/confirmdialog */ 8160);
/* harmony import */ var primeng_inputnumber__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/inputnumber */ 1759);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/toolbar/toolbar.component */ 565);
/* harmony import */ var _pipes_status_label_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pipes/status-label.pipe */ 7569);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);


// PrimeNG














class SharedModule {
  static {
    this.ɵfac = function SharedModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SharedModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
      type: SharedModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, primeng_table__WEBPACK_IMPORTED_MODULE_5__.TableModule, primeng_button__WEBPACK_IMPORTED_MODULE_6__.ButtonModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_7__.InputTextModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_8__.DropdownModule, primeng_card__WEBPACK_IMPORTED_MODULE_9__.CardModule, primeng_timeline__WEBPACK_IMPORTED_MODULE_10__.TimelineModule, primeng_dialog__WEBPACK_IMPORTED_MODULE_11__.DialogModule, primeng_toolbar__WEBPACK_IMPORTED_MODULE_12__.ToolbarModule, primeng_toast__WEBPACK_IMPORTED_MODULE_13__.ToastModule, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_14__.ConfirmDialogModule, primeng_inputnumber__WEBPACK_IMPORTED_MODULE_15__.InputNumberModule,
      // Angular
      _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule,
      // PrimeNG
      primeng_table__WEBPACK_IMPORTED_MODULE_5__.TableModule, primeng_button__WEBPACK_IMPORTED_MODULE_6__.ButtonModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_7__.InputTextModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_8__.DropdownModule, primeng_card__WEBPACK_IMPORTED_MODULE_9__.CardModule, primeng_timeline__WEBPACK_IMPORTED_MODULE_10__.TimelineModule, primeng_dialog__WEBPACK_IMPORTED_MODULE_11__.DialogModule, primeng_toolbar__WEBPACK_IMPORTED_MODULE_12__.ToolbarModule, primeng_toast__WEBPACK_IMPORTED_MODULE_13__.ToastModule, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_14__.ConfirmDialogModule, primeng_inputnumber__WEBPACK_IMPORTED_MODULE_15__.InputNumberModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](SharedModule, {
    declarations: [_components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_0__.ToolbarComponent, _pipes_status_label_pipe__WEBPACK_IMPORTED_MODULE_1__.StatusLabelPipe],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, primeng_table__WEBPACK_IMPORTED_MODULE_5__.TableModule, primeng_button__WEBPACK_IMPORTED_MODULE_6__.ButtonModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_7__.InputTextModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_8__.DropdownModule, primeng_card__WEBPACK_IMPORTED_MODULE_9__.CardModule, primeng_timeline__WEBPACK_IMPORTED_MODULE_10__.TimelineModule, primeng_dialog__WEBPACK_IMPORTED_MODULE_11__.DialogModule, primeng_toolbar__WEBPACK_IMPORTED_MODULE_12__.ToolbarModule, primeng_toast__WEBPACK_IMPORTED_MODULE_13__.ToastModule, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_14__.ConfirmDialogModule, primeng_inputnumber__WEBPACK_IMPORTED_MODULE_15__.InputNumberModule],
    exports: [
    // Angular
    _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule,
    // PrimeNG
    primeng_table__WEBPACK_IMPORTED_MODULE_5__.TableModule, primeng_button__WEBPACK_IMPORTED_MODULE_6__.ButtonModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_7__.InputTextModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_8__.DropdownModule, primeng_card__WEBPACK_IMPORTED_MODULE_9__.CardModule, primeng_timeline__WEBPACK_IMPORTED_MODULE_10__.TimelineModule, primeng_dialog__WEBPACK_IMPORTED_MODULE_11__.DialogModule, primeng_toolbar__WEBPACK_IMPORTED_MODULE_12__.ToolbarModule, primeng_toast__WEBPACK_IMPORTED_MODULE_13__.ToastModule, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_14__.ConfirmDialogModule, primeng_inputnumber__WEBPACK_IMPORTED_MODULE_15__.InputNumberModule,
    // Shared declarations
    _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_0__.ToolbarComponent, _pipes_status_label_pipe__WEBPACK_IMPORTED_MODULE_1__.StatusLabelPipe]
  });
})();

/***/ }),

/***/ 5312:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  production: false
};

/***/ }),

/***/ 4429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 635);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 5312);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map