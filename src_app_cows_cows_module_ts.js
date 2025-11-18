"use strict";
(self["webpackChunkcow_catalog"] = self["webpackChunkcow_catalog"] || []).push([["src_app_cows_cows_module_ts"],{

/***/ 7287:
/*!****************************************************!*\
  !*** ./src/app/core/models/cow-event-type.enum.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CowEventType: () => (/* binding */ CowEventType)
/* harmony export */ });
var CowEventType;
(function (CowEventType) {
  CowEventType["WEIGHT_CHECK"] = "WEIGHT_CHECK";
  CowEventType["TREATMENT"] = "TREATMENT";
  CowEventType["PEN_CHANGED"] = "PEN_CHANGED";
  CowEventType["DEATH"] = "DEATH";
})(CowEventType || (CowEventType = {}));

/***/ }),

/***/ 623:
/*!**********************************************!*\
  !*** ./src/app/core/services/cow.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CowService: () => (/* binding */ CowService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 9999);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 271);
/* harmony import */ var _models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/cow-status.enum */ 8940);
/* harmony import */ var _models_cow_event_type_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/cow-event-type.enum */ 7287);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./local-storage.service */ 9879);






const STORAGE_KEY = 'cowCatalog.cows';
class CowService {
  constructor(storage) {
    this.storage = storage;
    this.cowsSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject([]);
    this.cows$ = this.cowsSubject.asObservable();
    this.filterStateSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject({
      tagSearch: '',
      status: 'ALL',
      pen: 'ALL'
    });
    this.filterState$ = this.filterStateSubject.asObservable();
    const persisted = this.storage.getItem(STORAGE_KEY);
    if (persisted && persisted.length) {
      this.cowsSubject.next(persisted);
    } else {
      const seed = this.buildMockData();
      this.cowsSubject.next(seed);
      this.persist();
    }
  }
  getCowById(id) {
    return this.cows$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(cows => cows.find(c => c.id === id)));
  }
  getCowByTag(tag) {
    return this.cowsSubject.value.find(c => c.earTag.toLowerCase() === tag.toLowerCase());
  }
  upsertCow(cow) {
    const list = [...this.cowsSubject.value];
    const existingIndex = list.findIndex(c => c.id === cow.id);
    if (existingIndex >= 0) {
      list[existingIndex] = cow;
    } else {
      list.push(cow);
    }
    this.cowsSubject.next(list);
    this.persist();
  }
  addCowEvent(cowId, event) {
    const list = [...this.cowsSubject.value];
    const idx = list.findIndex(c => c.id === cowId);
    if (idx < 0) {
      return;
    }
    const cow = list[idx];
    const events = [...(cow.events ?? []), event].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const lastEventDate = events[0]?.date ?? cow.lastEventDate;
    list[idx] = {
      ...cow,
      events,
      lastEventDate
    };
    this.cowsSubject.next(list);
    this.persist();
  }
  deleteCow(id) {
    const list = this.cowsSubject.value.filter(c => c.id !== id);
    this.cowsSubject.next(list);
    this.persist();
  }
  hasCowWithEarTag(tag, excludeId) {
    return this.cowsSubject.value.some(c => c.earTag.toLowerCase() === tag.toLowerCase() && c.id !== excludeId);
  }
  updateFilters(partial) {
    const next = {
      ...this.filterStateSubject.value,
      ...partial
    };
    this.filterStateSubject.next(next);
  }
  getFilteredCows$() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.combineLatest)([this.cows$, this.filterState$]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(([cows, filters]) => this.applyFilters(cows, filters)));
  }
  getFilterSnapshot() {
    return this.filterStateSubject.value;
  }
  // Get Pens list
  getDistinctPens() {
    const pens = new Set();
    this.cowsSubject.value.forEach(c => pens.add(c.pen));
    return Array.from(pens).sort();
  }
  // Apply filters to cows
  applyFilters(cows, filters) {
    return cows.filter(cow => {
      const matchesTag = !filters.tagSearch || cow.earTag.toLowerCase().includes(filters.tagSearch.toLowerCase());
      const matchesStatus = filters.status === 'ALL' || cow.status === filters.status;
      const matchesPen = filters.pen === 'ALL' || cow.pen === filters.pen;
      return matchesTag && matchesStatus && matchesPen;
    });
  }
  // Store Item into local storage
  persist() {
    this.storage.setItem(STORAGE_KEY, this.cowsSubject.value);
  }
  // Create Mock data for initial load
  buildMockData() {
    const now = new Date();
    const daysAgo = d => {
      const dt = new Date(now);
      dt.setDate(dt.getDate() - d);
      return dt.toISOString();
    };
    const cow1 = {
      id: '1',
      earTag: '1001',
      sex: 'F',
      pen: 'A1',
      status: _models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__.CowStatus.ACTIVE,
      weight: 550,
      dailyWeightGain: 1.1,
      lastEventDate: daysAgo(2),
      events: [{
        id: 'e1',
        cowTag: '1001',
        type: _models_cow_event_type_enum__WEBPACK_IMPORTED_MODULE_1__.CowEventType.WEIGHT_CHECK,
        description: 'Routine weight check. All good.',
        date: daysAgo(2)
      }, {
        id: 'e2',
        cowTag: '1001',
        type: _models_cow_event_type_enum__WEBPACK_IMPORTED_MODULE_1__.CowEventType.PEN_CHANGED,
        description: 'Moved from pen A0 to A1.',
        date: daysAgo(7)
      }]
    };
    const cow2 = {
      id: '2',
      earTag: '1002',
      sex: 'M',
      pen: 'B1',
      status: _models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__.CowStatus.IN_TREATMENT,
      weight: 620,
      dailyWeightGain: 0.5,
      lastEventDate: daysAgo(1),
      events: [{
        id: 'e3',
        cowTag: '1002',
        type: _models_cow_event_type_enum__WEBPACK_IMPORTED_MODULE_1__.CowEventType.TREATMENT,
        description: 'Antibiotic treatment started.',
        date: daysAgo(1)
      }]
    };
    const cow3 = {
      id: '3',
      earTag: '1003',
      sex: 'F',
      pen: 'C3',
      status: _models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__.CowStatus.DECEASED,
      weight: 480,
      lastEventDate: daysAgo(10),
      events: [{
        id: 'e4',
        cowTag: '1003',
        type: _models_cow_event_type_enum__WEBPACK_IMPORTED_MODULE_1__.CowEventType.DEATH,
        description: 'Found deceased in pen C3.',
        date: daysAgo(10)
      }]
    };
    return [cow1, cow2, cow3];
  }
  static {
    this.ɵfac = function CowService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CowService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_local_storage_service__WEBPACK_IMPORTED_MODULE_2__.LocalStorageService));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
      token: CowService,
      factory: CowService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 9879:
/*!********************************************************!*\
  !*** ./src/app/core/services/local-storage.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalStorageService: () => (/* binding */ LocalStorageService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);

/**
 * Small wrapper around window.localStorage to centralise
 * error handling and JSON (de)serialisation.
 */
class LocalStorageService {
  getItem(key) {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        return null;
      }
      return JSON.parse(raw);
    } catch (error) {
      console.error('LocalStorageService.getItem error', {
        key,
        error
      });
      return null;
    }
  }
  setItem(key, value) {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const raw = JSON.stringify(value);
      localStorage.setItem(key, raw);
    } catch (error) {
      console.error('LocalStorageService.setItem error', {
        key,
        error
      });
    }
  }
  removeItem(key) {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem(key);
  }
  static {
    this.ɵfac = function LocalStorageService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || LocalStorageService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: LocalStorageService,
      factory: LocalStorageService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 9638:
/*!********************************************************************!*\
  !*** ./src/app/cows/components/cow-detail/cow-detail.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CowDetailComponent: () => (/* binding */ CowDetailComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _core_services_cow_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/services/cow.service */ 623);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/api */ 7780);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/button */ 9136);
/* harmony import */ var primeng_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/card */ 1486);
/* harmony import */ var primeng_timeline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/timeline */ 4357);
/* harmony import */ var _shared_pipes_status_label_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/pipes/status-label.pipe */ 7569);










function CowDetailComponent_p_card_0_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 11)(1, "h2", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CowDetailComponent_p_card_0_ng_template_1_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.backToList());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Cow Details \u2013 ", ctx_r1.cow == null ? null : ctx_r1.cow.earTag, "");
  }
}
function CowDetailComponent_p_card_0_ng_container_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r1.cow.dailyWeightGain, " kg/day ");
  }
}
function CowDetailComponent_p_card_0_ng_template_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0, "\u2014");
  }
}
function CowDetailComponent_p_card_0_ng_template_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 14)(1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const event_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](event_r3.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](event_r3.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](7, 3, event_r3.date, "medium"));
  }
}
function CowDetailComponent_p_card_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p-card", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, CowDetailComponent_p_card_0_ng_template_1_Template, 4, 1, "ng-template", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 4)(3, "div", 5)(4, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Ear Tag");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 5)(9, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Sex");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 5)(14, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Pen");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 5)(19, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "Status");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](23, "statusLabel");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "div", 5)(25, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, "Current Weight");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "div", 5)(30, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, "Daily Weight Gain");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](33, CowDetailComponent_p_card_0_ng_container_33_Template, 2, 1, "ng-container", 7)(34, CowDetailComponent_p_card_0_ng_template_34_Template, 1, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "div", 5)(37, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "Last Event Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](41, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "h3", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](43, "Recent Events");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](44, "p-timeline", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](45, CowDetailComponent_p_card_0_ng_template_45_Template, 8, 6, "ng-template", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    let tmp_6_0;
    const NA_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](35);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.cow.earTag);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.getSexLabel());
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.cow.pen);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](23, 9, ctx_r1.cow.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", (tmp_6_0 = ctx_r1.cow.weight) !== null && tmp_6_0 !== undefined ? tmp_6_0 : "\u2014", " kg");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.cow.dailyWeightGain !== undefined)("ngIfElse", NA_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](41, 11, ctx_r1.cow.lastEventDate, "medium"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", ctx_r1.lastEvents);
  }
}
class CowDetailComponent {
  constructor(route, router, cowService) {
    this.route = route;
    this.router = router;
    this.cowService = cowService;
    this.lastEvents = [];
    this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscription();
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/cows']);
      return;
    }
    this.subs.add(this.cowService.getCowById(id).subscribe(cow => {
      if (!cow) {
        this.router.navigate(['/cows']);
        return;
      }
      this.cow = cow;
      this.lastEvents = (cow.events ?? []).slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
    }));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  backToList() {
    this.router.navigate(['/cows']);
  }
  getSexLabel() {
    if (!this.cow) {
      return '';
    }
    return this.cow.sex === 'F' ? 'Female' : 'Male';
  }
  static {
    this.ɵfac = function CowDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CowDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_cow_service__WEBPACK_IMPORTED_MODULE_0__.CowService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: CowDetailComponent,
      selectors: [["app-cow-detail"]],
      decls: 1,
      vars: 1,
      consts: [["NA", ""], ["class", "detail-card", 4, "ngIf"], [1, "detail-card"], ["pTemplate", "header"], [1, "cow-info-grid"], [1, "info-item"], [1, "value"], [4, "ngIf", "ngIfElse"], [1, "timeline-title"], ["align", "alternate", "styleClass", "custom-timeline", 3, "value"], ["pTemplate", "content"], [1, "detail-header"], [1, "detail-title"], ["pButton", "", "type", "button", "label", "Back", "icon", "pi pi-arrow-left", 1, "p-button-secondary", "back-btn", 3, "click"], [1, "timeline-box"], [1, "event-type"], [1, "event-desc"], [1, "event-date"]],
      template: function CowDetailComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, CowDetailComponent_p_card_0_Template, 46, 14, "p-card", 1);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.cow);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, primeng_api__WEBPACK_IMPORTED_MODULE_6__.PrimeTemplate, primeng_button__WEBPACK_IMPORTED_MODULE_7__.ButtonDirective, primeng_card__WEBPACK_IMPORTED_MODULE_8__.Card, primeng_timeline__WEBPACK_IMPORTED_MODULE_9__.Timeline, _angular_common__WEBPACK_IMPORTED_MODULE_5__.DatePipe, _shared_pipes_status_label_pipe__WEBPACK_IMPORTED_MODULE_1__.StatusLabelPipe],
      styles: [".detail-card[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n\n.detail-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #1D4ED8;\n}\n\n.cow-info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1.2rem;\n  margin-top: 1.5rem;\n}\n\n.info-item[_ngcontent-%COMP%] {\n  background: #f8f8f8;\n  padding: 0.9rem 1rem;\n  border-radius: 6px;\n  border: 1px solid #e0e0e0;\n}\n\n.info-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 600;\n  margin-bottom: 4px;\n  font-size: 0.85rem;\n  color: #555;\n}\n\n.value[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #222;\n}\n\n.timeline-title[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  font-size: 1.2rem;\n  font-weight: 600;\n  margin-bottom: 1rem;\n}\n\n\n\n.timeline-box[_ngcontent-%COMP%] {\n  background: #ffffff;\n  padding: 0.8rem 1rem;\n  border-radius: 6px;\n  border: 1px solid #ddd;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);\n}\n\n.event-type[_ngcontent-%COMP%] {\n  font-weight: 700;\n  margin-bottom: 4px;\n  color: #2c3e50;\n}\n\n.event-desc[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n  font-size: 0.9rem;\n}\n\n.event-date[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  opacity: 0.7;\n}\n\n\n\n@media (max-width: 768px) {\n  .cow-info-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(1, 1fr);\n  }\n}\n.detail-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.4rem 2rem;\n  margin-bottom: 1rem;\n  border-bottom: 1px solid #e6e6e6;\n}\n\n.detail-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #333;\n}\n\n.back-btn[_ngcontent-%COMP%] {\n  height: 2.5rem;\n  padding: 0 1.2rem !important;\n  font-weight: 600;\n}\n\n\n\n@media (max-width: 768px) {\n  .detail-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.8rem;\n  }\n  .back-btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY293cy9jb21wb25lbnRzL2Nvdy1kZXRhaWwvY293LWRldGFpbC5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uLy4uL2Nvdy1jYXRhbG9nJTIwKDEpL3NyYy9hcHAvY293cy9jb21wb25lbnRzL2Nvdy1kZXRhaWwvY293LWRldGFpbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7QUNDRjs7QURFQTtFQUNFLGNBQUE7QUNDRjs7QURFQTtFQUNFLGFBQUE7RUFDQSxxQ0FBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBO0VBQ0UsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7QUNDRjs7QURFQTtFQUNFLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FDQ0Y7O0FERUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQ0NGOztBREVBLGlCQUFBO0FBQ0E7RUFDRSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLHlDQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBQ0NGOztBREVBO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtBQ0NGOztBREVBO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0FDQ0Y7O0FERUEsZUFBQTtBQUNBO0VBQ0U7SUFDRSxxQ0FBQTtFQ0NGO0FBQ0Y7QURFQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdDQUFBO0FDQUY7O0FER0E7RUFDRSxTQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUNBRjs7QURHQTtFQUNFLGNBQUE7RUFDQSw0QkFBQTtFQUNBLGdCQUFBO0FDQUY7O0FER0Esc0JBQUE7QUFDQTtFQUNFO0lBQ0Usc0JBQUE7SUFDQSxvQkFBQTtJQUNBLFdBQUE7RUNBRjtFREdBO0lBQ0UsV0FBQTtFQ0RGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuZGV0YWlsLWNhcmQge1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4uZGV0YWlsLWhlYWRlciBoMiB7XG4gIGNvbG9yOiAjMUQ0RUQ4XG59XG5cbi5jb3ctaW5mby1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcbiAgZ2FwOiAxLjJyZW07XG4gIG1hcmdpbi10b3A6IDEuNXJlbTtcbn1cblxuLmluZm8taXRlbSB7XG4gIGJhY2tncm91bmQ6ICNmOGY4Zjg7XG4gIHBhZGRpbmc6IDAuOXJlbSAxcmVtO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlMGUwZTA7XG59XG5cbi5pbmZvLWl0ZW0gbGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIGNvbG9yOiAjNTU1O1xufVxuXG4udmFsdWUge1xuICBmb250LXNpemU6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMjIyO1xufVxuXG4udGltZWxpbmUtdGl0bGUge1xuICBtYXJnaW4tdG9wOiAycmVtO1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuLyogVElNZUxJTkUgQm9YICovXG4udGltZWxpbmUtYm94IHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgcGFkZGluZzogMC44cmVtIDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgYm94LXNoYWRvdzogMCAycHggNXB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XG59XG5cbi5ldmVudC10eXBlIHtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICBjb2xvcjogIzJjM2U1MDtcbn1cblxuLmV2ZW50LWRlc2Mge1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xufVxuXG4uZXZlbnQtZGF0ZSB7XG4gIGZvbnQtc2l6ZTogMC44cmVtO1xuICBvcGFjaXR5OiAwLjc7XG59XG5cbi8qIFJFc1BPTlNJVkUgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAuY293LWluZm8tZ3JpZCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgMWZyKTtcbiAgfVxufVxuXG4uZGV0YWlsLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMS40cmVtIDJyZW07XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTZlNmU2O1xufVxuXG4uZGV0YWlsLXRpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMzMzM7XG59XG5cbi5iYWNrLWJ0biB7XG4gIGhlaWdodDogMi41cmVtO1xuICBwYWRkaW5nOiAwIDEuMnJlbSAhaW1wb3J0YW50O1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4vKiBNb2JpbGUgcmVzcG9uc2l2ZSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5kZXRhaWwtaGVhZGVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICAgIGdhcDogMC44cmVtO1xuICB9XG5cbiAgLmJhY2stYnRuIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxufVxuXG4iLCIuZGV0YWlsLWNhcmQge1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4uZGV0YWlsLWhlYWRlciBoMiB7XG4gIGNvbG9yOiAjMUQ0RUQ4O1xufVxuXG4uY293LWluZm8tZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XG4gIGdhcDogMS4ycmVtO1xuICBtYXJnaW4tdG9wOiAxLjVyZW07XG59XG5cbi5pbmZvLWl0ZW0ge1xuICBiYWNrZ3JvdW5kOiAjZjhmOGY4O1xuICBwYWRkaW5nOiAwLjlyZW0gMXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZTBlMGUwO1xufVxuXG4uaW5mby1pdGVtIGxhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xuICBjb2xvcjogIzU1NTtcbn1cblxuLnZhbHVlIHtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzIyMjtcbn1cblxuLnRpbWVsaW5lLXRpdGxlIHtcbiAgbWFyZ2luLXRvcDogMnJlbTtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbi8qIFRJTWVMSU5FIEJvWCAqL1xuLnRpbWVsaW5lLWJveCB7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIHBhZGRpbmc6IDAuOHJlbSAxcmVtO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDVweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xufVxuXG4uZXZlbnQtdHlwZSB7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbiAgY29sb3I6ICMyYzNlNTA7XG59XG5cbi5ldmVudC1kZXNjIHtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICBmb250LXNpemU6IDAuOXJlbTtcbn1cblxuLmV2ZW50LWRhdGUge1xuICBmb250LXNpemU6IDAuOHJlbTtcbiAgb3BhY2l0eTogMC43O1xufVxuXG4vKiBSRXNQT05TSVZFICovXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLmNvdy1pbmZvLWdyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEsIDFmcik7XG4gIH1cbn1cbi5kZXRhaWwtaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAxLjRyZW0gMnJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlNmU2ZTY7XG59XG5cbi5kZXRhaWwtdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogIzMzMztcbn1cblxuLmJhY2stYnRuIHtcbiAgaGVpZ2h0OiAyLjVyZW07XG4gIHBhZGRpbmc6IDAgMS4ycmVtICFpbXBvcnRhbnQ7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi8qIE1vYmlsZSByZXNwb25zaXZlICovXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLmRldGFpbC1oZWFkZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gICAgZ2FwOiAwLjhyZW07XG4gIH1cbiAgLmJhY2stYnRuIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 5078:
/*!**********************************************************************!*\
  !*** ./src/app/cows/components/cow-filters/cow-filters.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CowFiltersComponent: () => (/* binding */ CowFiltersComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/models/cow-status.enum */ 8940);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/inputtext */ 8361);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/dropdown */ 6895);






class CowFiltersComponent {
  constructor() {
    this.pens = [];
    this.filterChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.cowStatus = _core_models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__.CowStatus;
    this.statusOptions = [{
      label: 'All statuses',
      value: 'ALL'
    }, {
      label: 'Active',
      value: _core_models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__.CowStatus.ACTIVE
    }, {
      label: 'In Treatment',
      value: _core_models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__.CowStatus.IN_TREATMENT
    }, {
      label: 'Deceased',
      value: _core_models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__.CowStatus.DECEASED
    }];
  }
  get penOptions() {
    const base = [{
      label: 'All pens',
      value: 'ALL'
    }];
    const pens = this.pens.map(p => ({
      label: p,
      value: p
    }));
    return [...base, ...pens];
  }
  onTagSearchChange(value) {
    this.filterChange.emit({
      tagSearch: value
    });
  }
  onStatusChange(value) {
    this.filterChange.emit({
      status: value
    });
  }
  onPenChange(value) {
    this.filterChange.emit({
      pen: value
    });
  }
  onSearchClick() {}
  static {
    this.ɵfac = function CowFiltersComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CowFiltersComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: CowFiltersComponent,
      selectors: [["app-cow-filters"]],
      inputs: {
        filterState: "filterState",
        pens: "pens"
      },
      outputs: {
        filterChange: "filterChange"
      },
      decls: 16,
      vars: 5,
      consts: [[1, "filter-container"], [1, "filter-title"], [1, "filter-row"], [1, "filter-item"], ["for", "tagSearch"], ["id", "tagSearch", "type", "text", "pInputText", "", "placeholder", "Search by ear tag", 3, "ngModelChange", "ngModel"], ["for", "statusFilter"], ["inputId", "statusFilter", 3, "onChange", "options", "ngModel"], ["for", "penFilter"], ["inputId", "penFilter", 3, "onChange", "options", "ngModel"]],
      template: function CowFiltersComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Filters");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2)(4, "div", 3)(5, "label", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Tag Search");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "input", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function CowFiltersComponent_Template_input_ngModelChange_7_listener($event) {
            return ctx.onTagSearchChange($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 3)(9, "label", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Status");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "p-dropdown", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("onChange", function CowFiltersComponent_Template_p_dropdown_onChange_11_listener($event) {
            return ctx.onStatusChange($event.value);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 3)(13, "label", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Pen");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "p-dropdown", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("onChange", function CowFiltersComponent_Template_p_dropdown_onChange_15_listener($event) {
            return ctx.onPenChange($event.value);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.filterState == null ? null : ctx.filterState.tagSearch);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("options", ctx.statusOptions)("ngModel", ctx.filterState == null ? null : ctx.filterState.status);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("options", ctx.penOptions)("ngModel", ctx.filterState == null ? null : ctx.filterState.pen);
        }
      },
      dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgModel, primeng_inputtext__WEBPACK_IMPORTED_MODULE_3__.InputText, primeng_dropdown__WEBPACK_IMPORTED_MODULE_4__.Dropdown],
      styles: [".filter-container[_ngcontent-%COMP%] {\n  background: #f1f1f1;\n  padding: 1rem 1.25rem;\n  border-radius: 8px;\n  margin-bottom: 1.2rem;\n  border: 1px solid #ddd;\n}\n\n.filter-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  margin-bottom: 1rem;\n  color: #333;\n}\n\n.filter-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: flex-end;\n}\n\n.filter-item[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n[_nghost-%COMP%]     .p-dropdown {\n  width: 100% !important;\n}\n\n.filter-button[_ngcontent-%COMP%] {\n  flex: 0.6;\n}\n\n.filter-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  margin-bottom: 4px;\n  color: #444;\n}\n\n\n\n@media (max-width: 768px) {\n  .filter-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .filter-button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY293cy9jb21wb25lbnRzL2Nvdy1maWx0ZXJzL2Nvdy1maWx0ZXJzLmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy4vLi4vY293LWNhdGFsb2clMjAoMSkvc3JjL2FwcC9jb3dzL2NvbXBvbmVudHMvY293LWZpbHRlcnMvY293LWZpbHRlcnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLHNCQUFBO0FDQ0Y7O0FERUE7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FDQ0Y7O0FERUE7RUFDRSxhQUFBO0VBQ0EsU0FBQTtFQUNBLHFCQUFBO0FDQ0Y7O0FERUE7RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FDQ0Y7O0FERUE7RUFDRSxzQkFBQTtBQ0NGOztBREVBO0VBQ0UsU0FBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7QUNDRjs7QURFQSxlQUFBO0FBQ0E7RUFDRTtJQUNFLHNCQUFBO0VDQ0Y7RURDQTtJQUNFLE9BQUE7RUNDRjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmZpbHRlci1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kOiAjZjFmMWYxOyBcbiAgcGFkZGluZzogMXJlbSAxLjI1cmVtO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIG1hcmdpbi1ib3R0b206IDEuMnJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbn1cblxuLmZpbHRlci10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICBjb2xvcjogIzMzMztcbn1cblxuLmZpbHRlci1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDFyZW07XG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbn1cblxuLmZpbHRlci1pdGVtIHtcbiAgZmxleDogMTsgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4gIFxuOmhvc3QgOjpuZy1kZWVwIC5wLWRyb3Bkb3duIHtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLmZpbHRlci1idXR0b24ge1xuICBmbGV4OiAwLjY7ICAgICAgXG59XG5cbi5maWx0ZXItaXRlbSBsYWJlbCB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbiAgY29sb3I6ICM0NDQ7XG59XG5cbi8qIFJlc3BvbnNpdmUgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAuZmlsdGVyLXJvdyB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuICAuZmlsdGVyLWJ1dHRvbiB7XG4gICAgZmxleDogMTtcbiAgfVxufVxuIiwiLmZpbHRlci1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kOiAjZjFmMWYxO1xuICBwYWRkaW5nOiAxcmVtIDEuMjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogMS4ycmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xufVxuXG4uZmlsdGVyLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxLjFyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGNvbG9yOiAjMzMzO1xufVxuXG4uZmlsdGVyLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMXJlbTtcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xufVxuXG4uZmlsdGVyLWl0ZW0ge1xuICBmbGV4OiAxO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG46aG9zdCA6Om5nLWRlZXAgLnAtZHJvcGRvd24ge1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xufVxuXG4uZmlsdGVyLWJ1dHRvbiB7XG4gIGZsZXg6IDAuNjtcbn1cblxuLmZpbHRlci1pdGVtIGxhYmVsIHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICBjb2xvcjogIzQ0NDtcbn1cblxuLyogUmVzcG9uc2l2ZSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5maWx0ZXItcm93IHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG4gIC5maWx0ZXItYnV0dG9uIHtcbiAgICBmbGV4OiAxO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 3660:
/*!****************************************************************!*\
  !*** ./src/app/cows/components/cow-form/cow-form.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CowFormComponent: () => (/* binding */ CowFormComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _core_models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/models/cow-status.enum */ 8940);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_cow_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/services/cow.service */ 623);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/api */ 7780);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/button */ 9136);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/inputtext */ 8361);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/dropdown */ 6895);
/* harmony import */ var primeng_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/card */ 1486);
/* harmony import */ var primeng_inputnumber__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/inputnumber */ 1759);













function CowFormComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 13)(1, "h2", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.isEditMode ? "Edit Cow" : "Add New Cow");
  }
}
function CowFormComponent_small_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "small", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Ear Tag is required. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function CowFormComponent_small_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "small", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " This Ear Tag already exists. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function CowFormComponent_small_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "small", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Sex is required. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function CowFormComponent_small_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "small", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Pen is required. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function CowFormComponent_small_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "small", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Status is required. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function CowFormComponent_small_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "small", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Weight must be at least 1 kg. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function CowFormComponent_small_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "small", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Daily gain must be greater than 0. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
class CowFormComponent {
  constructor(fb, cowService, route, router) {
    this.fb = fb;
    this.cowService = cowService;
    this.route = route;
    this.router = router;
    this.isEditMode = false;
    this.statusOptions = [{
      label: 'Active',
      value: _core_models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__.CowStatus.ACTIVE
    }, {
      label: 'In Treatment',
      value: _core_models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__.CowStatus.IN_TREATMENT
    }, {
      label: 'Deceased',
      value: _core_models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__.CowStatus.DECEASED
    }];
    this.sexOptions = [{
      label: 'Female',
      value: 'F'
    }, {
      label: 'Male',
      value: 'M'
    }];
  }
  ngOnInit() {
    this.buildForm();
    this.cowId = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (this.cowId && this.cowId !== 'new') {
      this.isEditMode = true;
      this.cowService.getCowById(this.cowId).subscribe(cow => {
        if (cow) {
          this.form.patchValue({
            earTag: cow.earTag,
            sex: cow.sex,
            pen: cow.pen,
            status: cow.status,
            weight: cow.weight,
            dailyWeightGain: cow.dailyWeightGain
          });
        }
      });
    }
  }
  buildForm() {
    this.form = this.fb.group({
      earTag: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      sex: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required],
      pen: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required],
      status: [_core_models_cow_status_enum__WEBPACK_IMPORTED_MODULE_0__.CowStatus.ACTIVE, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required],
      weight: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.min(1)]],
      dailyWeightGain: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.min(0.1)]]
    });
  }
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const {
      earTag
    } = this.form.value;
    // Unique Ear Tag Validation
    if (this.cowService.hasCowWithEarTag(earTag, this.cowId)) {
      this.form.get('earTag')?.setErrors({
        notUnique: true
      });
      this.form.markAllAsTouched();
      return;
    }
    const now = new Date().toISOString();
    const cow = {
      id: this.cowId ?? this.generateId(),
      earTag: this.form.value.earTag,
      sex: this.form.value.sex,
      pen: this.form.value.pen,
      status: this.form.value.status,
      weight: this.form.value.weight ?? undefined,
      dailyWeightGain: this.form.value.dailyWeightGain ?? undefined,
      lastEventDate: now,
      events: []
    };
    this.cowService.upsertCow(cow);
    this.router.navigate(['/cows']);
  }
  cancel() {
    this.router.navigate(['/cows']);
  }
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }
  static {
    this.ɵfac = function CowFormComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CowFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_cow_service__WEBPACK_IMPORTED_MODULE_1__.CowService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: CowFormComponent,
      selectors: [["app-cow-form"]],
      decls: 37,
      vars: 12,
      consts: [["pTemplate", "header"], [1, "form-grid", 3, "ngSubmit", "formGroup"], [1, "form-item"], ["pInputText", "", "formControlName", "earTag", "placeholder", "Unique ear tag"], ["class", "p-error", 4, "ngIf"], ["formControlName", "sex", "placeholder", "Select sex", 3, "options"], ["pInputText", "", "formControlName", "pen", "placeholder", "i.e. A2"], ["formControlName", "status", 3, "options"], ["formControlName", "weight", 3, "min"], ["formControlName", "dailyWeightGain", 3, "min"], [1, "form-actions"], ["pButton", "", "type", "submit", "label", "Save", "icon", "pi pi-save"], ["pButton", "", "type", "button", "label", "Cancel", 1, "p-button-secondary", 3, "click"], [1, "form-header"], [1, "form-title"], [1, "p-error"]],
      template: function CowFormComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p-card");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, CowFormComponent_ng_template_1_Template, 3, 1, "ng-template", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "form", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function CowFormComponent_Template_form_ngSubmit_2_listener() {
            return ctx.submit();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 2)(4, "label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Ear Tag *");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, CowFormComponent_small_7_Template, 2, 0, "small", 4)(8, CowFormComponent_small_8_Template, 2, 0, "small", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 2)(10, "label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Sex *");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "p-dropdown", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, CowFormComponent_small_13_Template, 2, 0, "small", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 2)(15, "label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Pen *");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "input", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](18, CowFormComponent_small_18_Template, 2, 0, "small", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "div", 2)(20, "label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Status *");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](22, "p-dropdown", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](23, CowFormComponent_small_23_Template, 2, 0, "small", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "div", 2)(25, "label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, "Weight (kg)");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](27, "p-inputNumber", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](28, CowFormComponent_small_28_Template, 2, 0, "small", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "div", 2)(30, "label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, "Daily Weight Gain (kg)");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](32, "p-inputNumber", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](33, CowFormComponent_small_33_Template, 2, 0, "small", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](35, "button", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "button", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CowFormComponent_Template_button_click_36_listener() {
            return ctx.cancel();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          let tmp_1_0;
          let tmp_2_0;
          let tmp_4_0;
          let tmp_5_0;
          let tmp_7_0;
          let tmp_9_0;
          let tmp_11_0;
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.form);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ((tmp_1_0 = ctx.form.get("earTag")) == null ? null : tmp_1_0.hasError("required")) && ((tmp_1_0 = ctx.form.get("earTag")) == null ? null : tmp_1_0.touched));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_2_0 = ctx.form.get("earTag")) == null ? null : tmp_2_0.hasError("notUnique"));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("options", ctx.sexOptions);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ((tmp_4_0 = ctx.form.get("sex")) == null ? null : tmp_4_0.hasError("required")) && ((tmp_4_0 = ctx.form.get("sex")) == null ? null : tmp_4_0.touched));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ((tmp_5_0 = ctx.form.get("pen")) == null ? null : tmp_5_0.hasError("required")) && ((tmp_5_0 = ctx.form.get("pen")) == null ? null : tmp_5_0.touched));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("options", ctx.statusOptions);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ((tmp_7_0 = ctx.form.get("status")) == null ? null : tmp_7_0.hasError("required")) && ((tmp_7_0 = ctx.form.get("status")) == null ? null : tmp_7_0.touched));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("min", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ((tmp_9_0 = ctx.form.get("weight")) == null ? null : tmp_9_0.hasError("min")) && ((tmp_9_0 = ctx.form.get("weight")) == null ? null : tmp_9_0.touched));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("min", 0.1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ((tmp_11_0 = ctx.form.get("dailyWeightGain")) == null ? null : tmp_11_0.hasError("min")) && ((tmp_11_0 = ctx.form.get("dailyWeightGain")) == null ? null : tmp_11_0.touched));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, primeng_api__WEBPACK_IMPORTED_MODULE_6__.PrimeTemplate, primeng_button__WEBPACK_IMPORTED_MODULE_7__.ButtonDirective, primeng_inputtext__WEBPACK_IMPORTED_MODULE_8__.InputText, primeng_dropdown__WEBPACK_IMPORTED_MODULE_9__.Dropdown, primeng_card__WEBPACK_IMPORTED_MODULE_10__.Card, primeng_inputnumber__WEBPACK_IMPORTED_MODULE_11__.InputNumber],
      styles: [".form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1.2rem 2rem;\n}\n\n.header[_ngcontent-%COMP%] {\n  color: #1D4ED8;\n}\n\n.form-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.form-header[_ngcontent-%COMP%] {\n  padding: 0.4rem 0 0.8rem 0;\n  margin-bottom: 1rem;\n  border-bottom: 1px solid #e6e6e6;\n}\n\n.form-title[_ngcontent-%COMP%] {\n  margin: 20px;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1D4ED8;\n}\n\n.form-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  margin-bottom: 4px;\n}\n\n.p-inputtext[_ngcontent-%COMP%], \n.p-dropdown[_ngcontent-%COMP%], \n.p-inputnumber[_ngcontent-%COMP%] {\n  width: 100% !important;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  grid-column: span 2;\n  display: flex;\n  gap: 1rem;\n  margin-top: 1rem;\n}\n\n\n\n@media (max-width: 768px) {\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    grid-column: span 1;\n  }\n}\n[_nghost-%COMP%]     .p-dropdown {\n  width: 100% !important;\n}\n\n[_nghost-%COMP%]     .p-inputnumber {\n  width: 100% !important;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY293cy9jb21wb25lbnRzL2Nvdy1mb3JtL2Nvdy1mb3JtLmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy4vLi4vY293LWNhdGFsb2clMjAoMSkvc3JjL2FwcC9jb3dzL2NvbXBvbmVudHMvY293LWZvcm0vY293LWZvcm0uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EscUNBQUE7RUFDQSxnQkFBQTtBQ0NGOztBREVBO0VBQ0UsY0FBQTtBQ0NGOztBREVBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0FDQ0Y7O0FERUE7RUFDRSwwQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0NBQUE7QUNDRjs7QURFQTtFQUNFLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBOzs7RUFHRSxzQkFBQTtBQ0NGOztBREVBO0VBQ0UsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsU0FBQTtFQUNBLGdCQUFBO0FDQ0Y7O0FERUEsZUFBQTtBQUNBO0VBQ0U7SUFDRSwwQkFBQTtFQ0NGO0VEQ0E7SUFDRSxtQkFBQTtFQ0NGO0FBQ0Y7QURFQTtFQUNFLHNCQUFBO0FDQUY7O0FERUE7RUFDRSxzQkFBQTtBQ0NGIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XG4gIGdhcDogMS4ycmVtIDJyZW07XG59XG5cbi5oZWFkZXIge1xuICBjb2xvcjogIzFENEVEOFxufVxuXG4uZm9ybS1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmZvcm0taGVhZGVyIHtcbiAgcGFkZGluZzogMC40cmVtIDAgMC44cmVtIDA7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTZlNmU2O1xufVxuXG4uZm9ybS10aXRsZSB7XG4gIG1hcmdpbjogMjBweDtcbiAgZm9udC1zaXplOiAxLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMUQ0RUQ4O1xufVxuXG4uZm9ybS1pdGVtIGxhYmVsIHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xufVxuXG4ucC1pbnB1dHRleHQsXG4ucC1kcm9wZG93bixcbi5wLWlucHV0bnVtYmVyIHtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLmZvcm0tYWN0aW9ucyB7XG4gIGdyaWQtY29sdW1uOiBzcGFuIDI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMXJlbTtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbn1cblxuLyogUmVzcG9uc2l2ZSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5mb3JtLWdyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG4gIC5mb3JtLWFjdGlvbnMge1xuICAgIGdyaWQtY29sdW1uOiBzcGFuIDE7XG4gIH1cbn1cblxuOmhvc3QgOjpuZy1kZWVwIC5wLWRyb3Bkb3due1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xufVxuOmhvc3QgOjpuZy1kZWVwIC5wLWlucHV0bnVtYmVye1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xufSIsIi5mb3JtLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xuICBnYXA6IDEuMnJlbSAycmVtO1xufVxuXG4uaGVhZGVyIHtcbiAgY29sb3I6ICMxRDRFRDg7XG59XG5cbi5mb3JtLWl0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4uZm9ybS1oZWFkZXIge1xuICBwYWRkaW5nOiAwLjRyZW0gMCAwLjhyZW0gMDtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlNmU2ZTY7XG59XG5cbi5mb3JtLXRpdGxlIHtcbiAgbWFyZ2luOiAyMHB4O1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMxRDRFRDg7XG59XG5cbi5mb3JtLWl0ZW0gbGFiZWwge1xuICBmb250LXdlaWdodDogNjAwO1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG59XG5cbi5wLWlucHV0dGV4dCxcbi5wLWRyb3Bkb3duLFxuLnAtaW5wdXRudW1iZXIge1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xufVxuXG4uZm9ybS1hY3Rpb25zIHtcbiAgZ3JpZC1jb2x1bW46IHNwYW4gMjtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxcmVtO1xuICBtYXJnaW4tdG9wOiAxcmVtO1xufVxuXG4vKiBSZXNwb25zaXZlICovXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLmZvcm0tZ3JpZCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cbiAgLmZvcm0tYWN0aW9ucyB7XG4gICAgZ3JpZC1jb2x1bW46IHNwYW4gMTtcbiAgfVxufVxuOmhvc3QgOjpuZy1kZWVwIC5wLWRyb3Bkb3duIHtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuOmhvc3QgOjpuZy1kZWVwIC5wLWlucHV0bnVtYmVyIHtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 3056:
/*!****************************************************************!*\
  !*** ./src/app/cows/components/cow-list/cow-list.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CowListComponent: () => (/* binding */ CowListComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_cow_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/services/cow.service */ 623);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/table */ 6676);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/api */ 7780);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/button */ 9136);
/* harmony import */ var primeng_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/card */ 1486);
/* harmony import */ var _cow_filters_cow_filters_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cow-filters/cow-filters.component */ 5078);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _shared_pipes_status_label_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/pipes/status-label.pipe */ 7569);











function CowListComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CowListComponent_ng_template_1_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.onAddNew());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function CowListComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr")(1, "th", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, " Ear Tag ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "p-sortIcon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "th", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, " Sex ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "p-sortIcon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "th", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, " Pen ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](9, "p-sortIcon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "th", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, " Status ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](12, "p-sortIcon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "th", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, " Last Event Date ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](15, "p-sortIcon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function CowListComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr", 17)(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](9, "statusLabel");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](12, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("pSelectableRow", row_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](row_r3.earTag);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r1.getSexLabel(row_r3));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](row_r3.pen);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](9, 6, row_r3.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](12, 8, row_r3.lastEventDate, "mediumDate"));
  }
}
function CowListComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr")(1, "td", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "No cows found.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
class CowListComponent {
  constructor(cowService, router) {
    this.cowService = cowService;
    this.router = router;
    this.cows = [];
    this.pens = [];
    this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subscription();
  }
  ngOnInit() {
    this.filterState = this.cowService.getFilterSnapshot();
    this.pens = this.cowService.getDistinctPens();
    this.subs.add(this.cowService.getFilteredCows$().subscribe(cows => {
      this.cows = cows;
    }));
    this.subs.add(this.cowService.filterState$.subscribe(filter => {
      this.filterState = filter;
    }));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  onFilterChange(partial) {
    this.cowService.updateFilters(partial);
  }
  onRowSelect(cow) {
    this.router.navigate(['/cows', cow.id]);
  }
  onAddNew() {
    this.router.navigate(['/cows', 'new']);
  }
  getSexLabel(cow) {
    return cow.sex === 'F' ? 'Female' : 'Male';
  }
  static {
    this.ɵfac = function CowListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CowListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_cow_service__WEBPACK_IMPORTED_MODULE_0__.CowService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: CowListComponent,
      selectors: [["app-cow-list"]],
      decls: 7,
      vars: 8,
      consts: [["pTemplate", "header"], [3, "filterChange", "filterState", "pens"], ["selectionMode", "single", "dataKey", "id", 3, "onRowSelect", "value", "paginator", "rows", "responsiveLayout", "sortField", "sortOrder"], ["pTemplate", "body"], ["pTemplate", "emptymessage"], [1, "list-header"], ["pButton", "", "type", "button", "label", "Add New Cow", "icon", "pi pi-plus", 1, "add-button", 3, "click"], ["pSortableColumn", "earTag"], ["field", "earTag"], ["pSortableColumn", "sex"], ["field", "sex"], ["pSortableColumn", "pen"], ["field", "pen"], ["pSortableColumn", "status"], ["field", "status"], ["pSortableColumn", "lastEventDate"], ["field", "lastEventDate"], [3, "pSelectableRow"], ["colspan", "5"]],
      template: function CowListComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p-card");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, CowListComponent_ng_template_1_Template, 3, 0, "ng-template", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "app-cow-filters", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("filterChange", function CowListComponent_Template_app_cow_filters_filterChange_2_listener($event) {
            return ctx.onFilterChange($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "p-table", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("onRowSelect", function CowListComponent_Template_p_table_onRowSelect_3_listener($event) {
            return ctx.onRowSelect($event.data);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, CowListComponent_ng_template_4_Template, 16, 0, "ng-template", 0)(5, CowListComponent_ng_template_5_Template, 13, 11, "ng-template", 3)(6, CowListComponent_ng_template_6_Template, 3, 0, "ng-template", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("filterState", ctx.filterState)("pens", ctx.pens);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", ctx.cows)("paginator", true)("rows", 5)("responsiveLayout", "scroll")("sortField", "earTag")("sortOrder", 1);
        }
      },
      dependencies: [primeng_table__WEBPACK_IMPORTED_MODULE_6__.Table, primeng_api__WEBPACK_IMPORTED_MODULE_7__.PrimeTemplate, primeng_table__WEBPACK_IMPORTED_MODULE_6__.SortableColumn, primeng_table__WEBPACK_IMPORTED_MODULE_6__.SelectableRow, primeng_table__WEBPACK_IMPORTED_MODULE_6__.SortIcon, primeng_button__WEBPACK_IMPORTED_MODULE_8__.ButtonDirective, primeng_card__WEBPACK_IMPORTED_MODULE_9__.Card, _cow_filters_cow_filters_component__WEBPACK_IMPORTED_MODULE_1__.CowFiltersComponent, _angular_common__WEBPACK_IMPORTED_MODULE_10__.DatePipe, _shared_pipes_status_label_pipe__WEBPACK_IMPORTED_MODULE_2__.StatusLabelPipe],
      styles: [".list-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.5rem;\n}\n\nh2[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.add-button[_ngcontent-%COMP%] {\n  margin: 20px 20px 0 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY293cy9jb21wb25lbnRzL2Nvdy1saXN0L2Nvdy1saXN0LmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy4vLi4vY293LWNhdGFsb2clMjAoMSkvc3JjL2FwcC9jb3dzL2NvbXBvbmVudHMvY293LWxpc3QvY293LWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLFNBQUE7RUFDQSxxQkFBQTtBQ0NGOztBREVBO0VBQ0UsU0FBQTtBQ0NGOztBRENBO0VBQ0UscUJBQUE7QUNFRiIsInNvdXJjZXNDb250ZW50IjpbIi5saXN0LWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxcmVtO1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG59XG5cbmgyIHtcbiAgbWFyZ2luOiAwO1xufVxuLmFkZC1idXR0b257XG4gIG1hcmdpbjogMjBweCAyMHB4IDAgMDtcbn1cblxuXG4iLCIubGlzdC1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMXJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xufVxuXG5oMiB7XG4gIG1hcmdpbjogMDtcbn1cblxuLmFkZC1idXR0b24ge1xuICBtYXJnaW46IDIwcHggMjBweCAwIDA7XG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 1976:
/*!*********************************************!*\
  !*** ./src/app/cows/cows-routing.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CowsRoutingModule: () => (/* binding */ CowsRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _components_cow_list_cow_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/cow-list/cow-list.component */ 3056);
/* harmony import */ var _components_cow_form_cow_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/cow-form/cow-form.component */ 3660);
/* harmony import */ var _components_cow_detail_cow_detail_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/cow-detail/cow-detail.component */ 9638);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);






const routes = [{
  path: '',
  component: _components_cow_list_cow_list_component__WEBPACK_IMPORTED_MODULE_0__.CowListComponent
}, {
  path: 'new',
  component: _components_cow_form_cow_form_component__WEBPACK_IMPORTED_MODULE_1__.CowFormComponent
}, {
  path: ':id',
  component: _components_cow_detail_cow_detail_component__WEBPACK_IMPORTED_MODULE_2__.CowDetailComponent
}];
class CowsRoutingModule {
  static {
    this.ɵfac = function CowsRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CowsRoutingModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
      type: CowsRoutingModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](CowsRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ }),

/***/ 1497:
/*!*************************************!*\
  !*** ./src/app/cows/cows.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CowsModule: () => (/* binding */ CowsModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/shared.module */ 3887);
/* harmony import */ var _cows_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cows-routing.module */ 1976);
/* harmony import */ var _components_cow_list_cow_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/cow-list/cow-list.component */ 3056);
/* harmony import */ var _components_cow_detail_cow_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/cow-detail/cow-detail.component */ 9638);
/* harmony import */ var _components_cow_form_cow_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/cow-form/cow-form.component */ 3660);
/* harmony import */ var _components_cow_filters_cow_filters_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/cow-filters/cow-filters.component */ 5078);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 7580);







class CowsModule {
  static {
    this.ɵfac = function CowsModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CowsModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
      type: CowsModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
      imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _cows_routing_module__WEBPACK_IMPORTED_MODULE_1__.CowsRoutingModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](CowsModule, {
    declarations: [_components_cow_list_cow_list_component__WEBPACK_IMPORTED_MODULE_2__.CowListComponent, _components_cow_detail_cow_detail_component__WEBPACK_IMPORTED_MODULE_3__.CowDetailComponent, _components_cow_form_cow_form_component__WEBPACK_IMPORTED_MODULE_4__.CowFormComponent, _components_cow_filters_cow_filters_component__WEBPACK_IMPORTED_MODULE_5__.CowFiltersComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _cows_routing_module__WEBPACK_IMPORTED_MODULE_1__.CowsRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_cows_cows_module_ts.js.map