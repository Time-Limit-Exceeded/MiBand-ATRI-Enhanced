
        export default function(global, globalThis, window, $app_exports$, $app_evaluate$){
          var org_app_require = $app_require$;
        
          (function(global, globalThis, window, $app_exports$, $app_evaluate$){
            var setTimeout = global.setTimeout;
            var setInterval = global.setInterval;
            var clearTimeout = global.clearTimeout;
            var clearInterval = global.clearInterval;
            var $app_require$ = global.$app_require$ || org_app_require

            // 转换动态 style 的函数
            var $translateStyle$ = function (value) {
              if (typeof value === 'string') {
                return Object.fromEntries(value.split(';').filter(item => Boolean(item && item.trim())).map(
                  item => {
                    const matchs = item.match(/([^:]+):(.*)/)
                    if (matchs && matchs.length> 2) {
                      return [matchs[1].trim().replace(/-([a-z])/g, (_, match) => match.toUpperCase()), matchs[2].trim()]
                    }
                    return []
                  }))}
              return value
            }
        
            var createPageHandler = function() {
              return (() => { // webpackBootstrap
var __webpack_modules__ = ({});
/************************************************************************/
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId](module, module.exports, __webpack_require__);

// Return the exports of the module
return module.exports;

}

/************************************************************************/
// webpack/runtime/global
(() => {
__webpack_require__.g = (() => {
	if (typeof globalThis === 'object') return globalThis;
	try {
		return this || new Function('return this')();
	} catch (e) {
		if (typeof window === 'object') return window;
	}
})();
})();
// webpack/runtime/rspack_version
(() => {
__webpack_require__.rv = () => ("1.3.0")
})();
// webpack/runtime/rspack_unique_id
(() => {
__webpack_require__.ruid = "bundler=rspack@1.3.0";

})();
/************************************************************************/

/*!************************************************!*\
  !*** ./src/pages/detail/detail.ux?uxType=page ***!
  \************************************************/
var $app_style$ = [[[[0,"page"]],{"position":"absolute","top":0,"left":0,"width":"336px","height":"480px"}],[[[0,"menu"]],{"flexWrap":"nowrap","flexDirection":"column","justifyContent":"center","alignItems":"center","backgroundColor":"rgba(0,0,0,0.7)"}],[[[0,"scroll"]],{"paddingTop":"18.5px","paddingRight":"0","paddingBottom":"18.5px","paddingLeft":"0","overflow":"hidden","flexWrap":"nowrap","flexDirection":"column","alignItems":"center","backgroundColor":"rgba(0,0,0,0.7)"}],[[[0,"btn"]],{"width":"284px","height":"60px","borderRadius":"30px","marginTop":"7px","marginBottom":"7px","fontSize":"28px","fontWeight":"bold","textAlign":"center","color":"#ffffff","backgroundColor":"rgba(255,255,255,0.3)"}],[[[0,"text-box"]],{"position":"absolute","left":0,"right":0,"bottom":0,"height":"160px","paddingTop":"9px","paddingRight":"15px","paddingBottom":"15px","paddingLeft":"15px","display":"flex","flexDirection":"column","flexWrap":"wrap","alignItems":"flex-start","overflow":"hidden","backgroundColor":"rgba(0,0,0,0.4)"}],[[[0,"fade"]],{"opacity":0,"transitionProperty":"opacity","transitionTimingFunction":"ease-in-out","transitionDuration":"500ms","transitionDelay":"0s","backgroundColor":"#000000"}]]
var $app_script$ = function __scriptModule__(module, exports, $app_require$) {	"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _system = _interopRequireDefault($app_require$("@app-module/system.router"));
var _system2 = _interopRequireDefault($app_require$("@app-module/system.storage"));
var _system3 = _interopRequireDefault($app_require$("@app-module/system.prompt"));
var _system4 = _interopRequireDefault($app_require$("@app-module/system.file"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// 章节-文件名映射表
const fileNameMap = {
  0: "b999",
  1: "b101",
  2: "b102",
  3: "b103",
  4: "b111",
  5: "b112",
  6: "b113",
  7: "b114",
  8: "b121",
  9: "b122",
  10: "b123",
  11: "b124",
  12: "b200",
  13: "b201",
  14: "b202",
  15: "b203",
  16: "b204",
  17: "b205",
  18: "b206",
  19: "b207",
  20: "b301",
  21: "b302",
  22: "b303",
  23: "b304",
  24: "b401",
  25: "b402",
  26: "b403",
  27: "b404",
  28: "b405",
  29: "b406",
  30: "b407",
  31: "b501",
  BE: "b601",
  TE: "b701"
};
var _default = exports.default = {
  // 变量声明
  private: {
    // 游戏状态
    chapter: 0,
    currentScene: 0,
    currentDialogue: 0,
    choice: [],
    END: "",
    // 对话状态
    character: "",
    showText: "",
    index: 0,
    intervalId: null,
    canContinue: true,
    // 页面状态
    menuPage: false,
    loadRecoveryPage: false,
    editRecoveryPage: false,
    showFade: false,
    fadeOpacity: 0,
    background: "bg.png",
    // 游戏数据
    gameData: {
      scenes: []
    },
    // 存档数据
    recoveryIndex: null,
    recoveryData: [],
    // 设置数据
    settingsData: {
      textSpeed: 50,
      textSize: 24
    }
  },
  // 页面初始化
  onInit() {
    this.recoveryIndex = JSON.parse(this.recoveryIndex);
    this.readData("settingsData", callback => {
      if (callback) this.settingsData = callback;else this.settingsData = {
        textSpeed: 50,
        textSize: 24
      };
    });
    this.readData("recoveryData", callback => {
      if (callback) {
        this.recoveryData = callback;
        if (this.recoveryIndex != null) this.loadRecoveryData(this.recoveryIndex);else this.loadChapter(0);
      } else this.loadChapter(0);
    });
  },
  // 页面销毁
  onDestroy() {
    this.clearTimer();
    __webpack_require__.g.runGC();
  },
  // 读取数据
  readData(name, callback) {
    _system2.default.get({
      key: name,
      success: data => {
        if (data === "") {
          callback(null);
          console.info(`存储的数据 ${name} 为空`);
        } else callback(JSON.parse(data));
      },
      fail: () => {
        console.error(`读取数据 ${name} 失败`);
        callback(null);
      }
    });
  },
  // 写入数据
  writeData(name, data) {
    _system2.default.set({
      key: name,
      value: JSON.stringify(data),
      success: () => console.info(`写入数据 ${name} 成功`),
      fail: () => console.info(`写入数据 ${name} 失败`)
    });
  },
  // 加载章节
  loadChapter(chapter) {
    __webpack_require__.g.runGC();
    _system4.default.readText({
      uri: `/common/${fileNameMap[chapter]}.txt`,
      success: data => {
        this.gameData.scenes = [];
        this.gameData.scenes = JSON.parse(data.text);
        this.loadScene(this.currentScene);
      },
      fail: function (_err, code) {
        console.error(`加载章节 ${chapter} 失败，错误码 ${code}`);
        _system3.default.showToast({
          message: "加载资源失败，请重试"
        });
      }
    });
  },
  // 加载场景
  loadScene(sceneIndex) {
    const scene = this.gameData.scenes[sceneIndex];
    this.background = scene.background;
    if (scene.choices) {
      return;
    }
    this.showDialogue(scene.dialogues[this.currentDialogue]);
  },
  // 显示对话
  showDialogue(dialogue) {
    // 准备工作
    this.clearTimer();
    this.character = dialogue.character;
    this.index = 0;
    this.showText = "";
    this.canContinue = false;
    // 极值处理
    if (this.settingsData.textSpeed <= 0) {
      this.showText = dialogue.text;
      this.canContinue = true;
      return;
    }
    // 逐字动画
    this.intervalId = setInterval(() => {
      if (this.index >= dialogue.text.length) {
        this.clearTimer();
        this.canContinue = true;
        return;
      }
      this.showText += dialogue.text.charAt(this.index++);
    }, this.settingsData.textSpeed);
  },
  // 清除定时器
  clearTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  },
  // 下一段对话
  nextDialogue() {
    // 仅当允许继续时执行
    if (!this.canContinue) return;
    // 重置状态并滚动到顶部
    this.scrollToTop();
    this.canContinue = false;
    // 获取当前场景数据和最后一段对话数据
    const scene = this.gameData.scenes[this.currentScene];
    const lastSceneIndex = this.gameData.scenes.length - 1;
    const lastDialogueIndex = scene.dialogues.length - 1;
    const lastDialogue = scene.dialogues[lastDialogueIndex];
    // --- 场景内对话未结束 ---
    if (this.currentDialogue < lastDialogueIndex) this.showDialogue(scene.dialogues[++this.currentDialogue]);
    // --- 场景内对话已结束 ---
    else {
      // 当前场景非最后一个场景
      if (this.currentScene < lastSceneIndex) this.nextScene(lastDialogue);
      // 当前场景是最后一个场景
      else this.nextChapter(lastDialogue);
    }
  },
  // 处理场景跳转
  nextScene(lastDialogue) {
    // 若最后对话定义了 toScenes，按偏移量跳转
    if (lastDialogue.toScenes !== undefined) this.currentScene += lastDialogue.toScenes;
    // 否则跳转到下一个场景
    else this.currentScene++;
    this.currentDialogue = 0;
    this.loadScene(this.currentScene);
  },
  // 处理章节跳转
  nextChapter(lastDialogue) {
    // 分支条件处理
    if (lastDialogue.branch !== undefined) this.handleBranch(lastDialogue.branch);
    // 结局处理
    else if (lastDialogue.END !== undefined) {
      this.END = lastDialogue.END;
      this.saveFin(this.END);
    }
    // 默认加载下一章节
    else this.loadChapterWithFade(++this.chapter);
  },
  // 处理分支条件
  handleBranch(branchData) {
    // 检查玩家选择是否匹配分支条件
    if (JSON.stringify(this.choice) === JSON.stringify(branchData.choices)) this.chapter = branchData.toChapter;
    // 未匹配则进入坏结局
    else this.chapter = "BE";
    // 加载分支章节
    this.currentScene = 0;
    this.currentDialogue = 0;
    this.loadChapterWithFade(this.chapter);
  },
  // 加载章节（渐入渐出）
  loadChapterWithFade(chapter) {
    // 显示遮罩层
    this.showFade = true;
    this.fadeOpacity = 0;
    // 微小延迟确保 DOM 渲染
    setTimeout(() => {
      // 启动渐入动画
      this.fadeOpacity = 1;
      setTimeout(() => {
        // 渐入完成后加载章节
        this.currentScene = 0;
        this.currentDialogue = 0;
        this.loadChapter(chapter);
        // 渐出动画
        this.fadeOpacity = 0;
        setTimeout(() => this.showFade = false, 500);
      }, 500);
    }, 50);
  },
  // 滑动事件处理
  handleSwipe(event) {
    if (this.END) return;
    if (event.direction === "right") {
      if (!this.menuPage) this.menuPage = true;
      if (this.loadRecoveryPage || this.editRecoveryPage) this.back();
    }
  },
  // 返回上级
  back() {
    if (this.loadRecoveryPage) this.loadRecoveryPage = false;else if (this.editRecoveryPage) this.editRecoveryPage = false;else if (this.menuPage) this.menuPage = false;
  },
  // 回主界面
  exit() {
    _system.default.replace({
      uri: "/pages/index"
    });
  },
  // 选择选项
  selectChoice(choiceIndex) {
    this.choice.push(choiceIndex);
    this.currentScene += this.gameData.scenes[this.currentScene].choices[choiceIndex].nextScene;
    this.currentDialogue = 0;
    this.loadScene(this.currentScene);
  },
  // 跳转存档页面
  toRecoveryPage(name) {
    if (name === "load") if (this.recoveryData && this.recoveryData.length > 0) this.loadRecoveryPage = true;else _system3.default.showToast({
      message: "无可用存档"
    });
    if (name === "edit") this.editRecoveryPage = true;
  },
  // 新增/覆写存档
  saveRecoveryData(index) {
    const tempData = {
      chapter: this.chapter,
      currentScene: this.currentScene,
      currentDialogue: this.currentDialogue,
      choice: this.choice
    };
    if (index === "new") {
      if (this.recoveryData.length >= 10) _system3.default.showToast({
        message: "存档数已达上限，长按可删除存档"
      });else {
        this.recoveryData.push(tempData);
        this.writeData("recoveryData", this.recoveryData);
      }
    } else {
      this.recoveryData[index] = tempData;
      this.writeData("recoveryData", this.recoveryData);
      _system3.default.showToast({
        message: `已覆盖本地存档 #${index + 1}`
      });
    }
  },
  // 删除存档
  deleteRecoveryData(index, event) {
    this.recoveryData.splice(index, 1);
    this.writeData("recoveryData", this.recoveryData);
    _system3.default.showToast({
      message: `已删除本地存档 #${index + 1}`
    });
  },
  // 加载存档
  loadRecoveryData(index) {
    if (index === "TE") {
      this.loadChapter("TE");
      return;
    }
    // 恢复游戏状态
    const tempData = this.recoveryData[index];
    this.chapter = tempData.chapter;
    this.currentScene = tempData.currentScene;
    this.currentDialogue = tempData.currentDialogue;
    this.choice = tempData.choice;
    // 退出加载界面
    this.menuPage = false;
    this.loadRecoveryPage = false;
    // 加载游戏数据
    this.loadChapter(this.chapter);
  },
  // 跳过场景
  skipScene() {
    var _currentScene$dialogu;
    // 获取当前场景对象
    const currentScene = this.gameData.scenes[this.currentScene];
    // 获取当前场景的最后一段对话
    const lastDialogue = (_currentScene$dialogu = currentScene.dialogues) === null || _currentScene$dialogu === void 0 ? void 0 : _currentScene$dialogu[currentScene.dialogues.length - 1];
    // 检查当前场景是否存在选项
    const hasChoices = currentScene.choices !== undefined;
    // 检查最后对话是否包含强制剧情节点（END/branch/toScenes）
    const hasCriticalNode = (lastDialogue === null || lastDialogue === void 0 ? void 0 : lastDialogue.END) || (lastDialogue === null || lastDialogue === void 0 ? void 0 : lastDialogue.branch) || (lastDialogue === null || lastDialogue === void 0 ? void 0 : lastDialogue.toScenes);
    // 检查目标场景是否超出章节范围
    const isTargetSceneInvalid = this.currentScene + 1 >= this.gameData.scenes.length;
    // 综合判断
    if (hasChoices || hasCriticalNode) _system3.default.showToast({
      message: "关键场景，无法跳过"
    });else if (isTargetSceneInvalid) _system3.default.showToast({
      message: "已是本章最后场景"
    });else {
      // 执行跳过
      this.currentDialogue = 0;
      this.loadScene(++this.currentScene);
      this.menuPage = false;
    }
  },
  // 跳过章节
  skipChapter() {
    // 检查当前章节是否存在选项
    const hasChoices = this.gameData.scenes.some(scene => scene.choices !== undefined);
    // 检查当前章节是否处于结局或分支场景
    const hasEndingOrBranch = this.gameData.scenes.some(scene => {
      var _scene$dialogues;
      return (_scene$dialogues = scene.dialogues) === null || _scene$dialogues === void 0 ? void 0 : _scene$dialogues.some(d => d.END || d.branch);
    });
    // 检查下一章节是否存在
    const isNextChapterValid = fileNameMap.hasOwnProperty(this.chapter + 1);
    // 综合判断
    if (hasChoices || hasEndingOrBranch) _system3.default.showToast({
      message: "关键章节，无法跳过"
    });else if (!isNextChapterValid) _system3.default.showToast({
      message: "已是最后一章"
    });else {
      // 执行跳过
      this.loadChapterWithFade(++this.chapter);
      this.menuPage = false;
    }
  },
  // 保存结局
  saveFin(end) {
    this.readData("fin", callback => {
      let fin = callback || {
        HE: false,
        BE: false
      };
      if (end === "Happy Ending") fin.HE = true;else if (end === "Bad Ending") fin.BE = true;
      this.writeData("fin", fin);
    });
  },
  //（debug）打印存档数据
  printData(index) {
    console.log(`本地存档 #${index + 1} 数据:`, this.recoveryData[index]);
  },
  // 滚动对话到顶部
  scrollToTop() {
    this.$element("text-box").scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }
};


  const moduleOwn = exports.default || module.exports
  const accessors = ['public', 'protected', 'private']

  if (moduleOwn.data && accessors.some(function (acc) { return moduleOwn[acc] })) {
    throw new Error('页面VM对象中的属性data不可与"' + accessors.join(',') + '"同时存在，请使用private替换data名称')
  }
  else if (!moduleOwn.data) {
    moduleOwn.data = {}
    moduleOwn._descriptor = {}
    accessors.forEach(function (acc) {
      const accType = typeof moduleOwn[acc]
      if (accType === 'object') {
        moduleOwn.data = Object.assign(moduleOwn.data, moduleOwn[acc])
        for (const name in moduleOwn[acc]) {
          moduleOwn._descriptor[name] = { access: acc }
        }
      }
      else if (accType === 'function') {
        console.warn('页面VM对象中的属性' + acc + '的值不能是函数，请使用对象')
      }
    })
  }

}
var $app_template$ = function (vm) {
      const _vm_ = vm || this
      return aiot.__ce__("div", {"__vm__":_vm_,
"__opts__":{"classList":["page"],
"events":{"swipe":function(evt) { return _vm_.handleSwipe(evt) }}}}, [aiot.__ce__("div", {"__vm__":_vm_,
"__opts__":{"classList":["page"],
"style":{"backgroundColor":"#000000"},
"events":{"click":function(evt) { return _vm_.nextDialogue(evt) }}}}, [aiot.__ce__("image", {"__vm__":_vm_,
"__opts__":{"src":function() { return "/common/" + (_vm_.background) }}}, []),
aiot.__ci__({"__vm__":_vm_,
"__opts__":{"shown":function(){ return (_vm_.gameData.scenes[_vm_.currentScene].Img!==undefined); }}}, function(){
          return [aiot.__ce__("image", {"__vm__":_vm_,
"__opts__":{"src":function() { return "/common/" + (_vm_.gameData.scenes[_vm_.currentScene].Img) },
"style":function() {
        return $translateStyle$("\n\t\t\t\tposition: absolute;\t\n\t\t\t\ttop:" + (_vm_.gameData.scenes[_vm_.currentScene].ImgTop) + "px;\n\t\t\t\tleft:" + (_vm_.gameData.scenes[_vm_.currentScene].ImgLeft) + "px;\n\t\t\t\t")
      }}}, [])]
        }),
aiot.__ci__({"__vm__":_vm_,
"__opts__":{"shown":function(){ return (_vm_.character!=""&&_vm_.gameData.scenes[_vm_.currentScene].choices==undefined&&_vm_.END===""); }}}, function(){
          return [aiot.__ce__("text", {"__vm__":_vm_,
"__opts__":{"style":function() {
        return $translateStyle$("\n\t\t\t\tposition: absolute;\n\t\t\t\tbottom: 160px;\n\t\t\t\tleft: 0;\n\t\t\t\theight:" + (_vm_.settingsData.textSize+20) + "px;\n\t\t\t\twidth:" + (_vm_.character.length*(_vm_.settingsData.textSize+5)+30) + "px;\n\t\t\t\tpadding: 15px 15px 0px 15px;\n\t\t\t\tfont-size: " + (_vm_.settingsData.textSize+5) + "px;\n\t\t\t\tfont-weight: bold;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\tbackground-color: rgba(0, 0, 0, 0.4);\n\t\t\t\t")
      },
"value":function() { return _vm_.character }}}, [])]
        }),
aiot.__ci__({"__vm__":_vm_,
"__opts__":{"shown":function(){ return (_vm_.gameData.scenes[_vm_.currentScene].choices==undefined&&_vm_.END===""); }}}, function(){
          return [aiot.__ce__("scroll", {"__vm__":_vm_,
"__opts__":{"scrollY":"true",
"bounces":"true",
"classList":["text-box"],
"id":"text-box"}}, [aiot.__ce__("text", {"__vm__":_vm_,
"__opts__":{"style":function() {
        return $translateStyle$("\n\t\t\t\ttext-align: left; \n\t\t\t\tfont-weight: bold; \n\t\t\t\tfont-size: " + (_vm_.settingsData.textSize) + "px;\n\t\t\t\tcolor: #ffffff;\n\t\t\t\t")
      },
"value":function() { return _vm_.showText }}}, [])])]
        })]),
aiot.__ci__({"__vm__":_vm_,
"__opts__":{"shown":function(){ return (_vm_.gameData.scenes[_vm_.currentScene].choices!=undefined); }}}, function(){
          return [aiot.__ce__("div", {"__vm__":_vm_,
"__opts__":{"classList":["menu","page"]}}, [aiot.__ce__("text", {"__vm__":_vm_,
"__opts__":{"classList":["btn"],
"style":{"marginBottom":"30px"},
"events":{"click":function(evt) { return _vm_.selectChoice(0, evt) }},
"value":function() { return _vm_.gameData.scenes[_vm_.currentScene].choices[0].text }}}, []),
aiot.__ce__("text", {"__vm__":_vm_,
"__opts__":{"classList":["btn"],
"events":{"click":function(evt) { return _vm_.selectChoice(1, evt) }},
"value":function() { return _vm_.gameData.scenes[_vm_.currentScene].choices[1].text }}}, [])])]
        }),
aiot.__ci__({"__vm__":_vm_,
"__opts__":{"shown":function(){ return (_vm_.showFade); }}}, function(){
          return [aiot.__ce__("div", {"__vm__":_vm_,
"__opts__":{"classList":["fade","page"],
"style":function() {
        return $translateStyle$("opacity: " + (_vm_.fadeOpacity) + ";")
      }}}, [])]
        }),
aiot.__ci__({"__vm__":_vm_,
"__opts__":{"shown":function(){ return (_vm_.menuPage&&!_vm_.editRecoveryPage&&!_vm_.loadRecoveryPage); }}}, function(){
          return [aiot.__ce__("div", {"__vm__":_vm_,
"__opts__":{"classList":["menu","page"]}}, [aiot.__ce__("text", {"__vm__":_vm_,
"__opts__":{"classList":["btn"],
"events":{"click":function(evt) { return _vm_.back(evt) }},
"value":"回到游戏"}}, []),
aiot.__ce__("text", {"__vm__":_vm_,
"__opts__":{"classList":["btn"],
"events":{"click":function(evt) { return _vm_.exit(evt) }},
"value":"返回主页"}}, []),
aiot.__ce__("text", {"__vm__":_vm_,
"__opts__":{"classList":["btn"],
"events":{"click":function(evt) { return _vm_.skipScene(evt) }},
"value":"跳过场景"}}, []),
aiot.__ce__("text", {"__vm__":_vm_,
"__opts__":{"classList":["btn"],
"events":{"click":function(evt) { return _vm_.skipChapter(evt) }},
"value":"跳过章节"}}, []),
aiot.__ce__("text", {"__vm__":_vm_,
"__opts__":{"classList":["btn"],
"events":{"click":function(evt) { return _vm_.toRecoveryPage("edit", evt) }},
"value":"管理存档"}}, []),
aiot.__ce__("text", {"__vm__":_vm_,
"__opts__":{"classList":["btn"],
"events":{"click":function(evt) { return _vm_.toRecoveryPage("load", evt) }},
"value":"加载存档"}}, [])])]
        }),
aiot.__ci__({"__vm__":_vm_,
"__opts__":{"shown":function(){ return (_vm_.editRecoveryPage); }}}, function(){
          return [aiot.__ce__("scroll", {"__vm__":_vm_,
"__opts__":{"classList":["page","scroll"],
"scrollY":"true",
"bounces":"true",
"events":{"swipe":function(evt) { return _vm_.handleSwipe(evt) }}}}, [aiot.__cf__({"__vm__":_vm_,
"__opts__":{"exp":function() { return _vm_.recoveryData },
"key":"$idx",
"value":"$item"}}, function($idx, $item, ){
          return [aiot.__ce__("text", {"__vm__":_vm_,
"__opts__":{"classList":["btn"],
"events":{"click":function(evt) { return _vm_.saveRecoveryData($idx, evt) },
"longpress":function(evt) { return _vm_.deleteRecoveryData($idx, evt) }},
"value":function() { return "本地存档 #" + ($idx+1) }}}, [])]
        }),
aiot.__ce__("text", {"__vm__":_vm_,
"__opts__":{"classList":["btn"],
"events":{"click":function(evt) { return _vm_.saveRecoveryData("new", evt) }},
"value":"+ 创建新存档"}}, [])])]
        }),
aiot.__ci__({"__vm__":_vm_,
"__opts__":{"shown":function(){ return (_vm_.loadRecoveryPage); }}}, function(){
          return [aiot.__ce__("scroll", {"__vm__":_vm_,
"__opts__":{"classList":["page","scroll"],
"scrollY":"true",
"bounces":"true",
"events":{"swipe":function(evt) { return _vm_.handleSwipe(evt) }}}}, [aiot.__cf__({"__vm__":_vm_,
"__opts__":{"exp":function() { return _vm_.recoveryData },
"key":"$idx",
"value":"$item"}}, function($idx, $item, ){
          return [aiot.__ce__("text", {"__vm__":_vm_,
"__opts__":{"classList":["btn"],
"events":{"click":function(evt) { return _vm_.loadRecoveryData($idx, evt) },
"longpress":function(evt) { return _vm_.printData($idx, evt) }},
"value":function() { return "本地存档 #" + ($idx+1) }}}, [])]
        })])]
        }),
aiot.__ci__({"__vm__":_vm_,
"__opts__":{"shown":function(){ return (_vm_.END); }}}, function(){
          return [aiot.__ce__("div", {"__vm__":_vm_,
"__opts__":{"classList":["page"],
"style":{"justifyContent":"center","backgroundColor":"rgba(0, 0, 0, 0.7)"},
"events":{"swipe":function(evt) { return _vm_.handleSwipe(evt) }}}}, [aiot.__ce__("text", {"__vm__":_vm_,
"__opts__":{"style":{"position":"absolute","top":"68px","fontSize":"48px","color":"#ffffff"},
"value":"达成结局"}}, []),
aiot.__ce__("text", {"__vm__":_vm_,
"__opts__":{"style":{"position":"absolute","top":"148px","fontSize":"32px","color":"#ffffff"},
"value":function() { return _vm_.END }}}, []),
aiot.__ce__("text", {"__vm__":_vm_,
"__opts__":{"style":{"position":"absolute","bottom":"78px","width":"180px","height":"80px","borderRadius":"40px","fontSize":"28px","fontWeight":"bold","textAlign":"center","color":"#ffffff","backgroundColor":"rgba(255, 255, 255, 0.3)"},
"events":{"click":function(evt) { return _vm_.exit(evt) }},
"value":"返回主页"}}, [])])]
        })])

    }
$app_exports$['entry'] = function ($app_exports$) {
$app_script$({}, $app_exports$, $app_require$);
$app_exports$.default.template = $app_template$;
$app_exports$.default.style = $app_style$;
}
})()
;
            }
        
            return createPageHandler();
          })(global, globalThis, window, $app_exports$, $app_evaluate$)
        }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXNcXGRldGFpbFxcZGV0YWlsLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9wYWdlcy9kZXRhaWwvZGV0YWlsLnV4Il0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuXHQ8ZGl2IGNsYXNzPVwicGFnZVwiIEBzd2lwZT1cImhhbmRsZVN3aXBlXCI+XHJcblx0XHQ8IS0tIOS4u+WvueivnemhtSAtLT5cclxuXHRcdDxkaXYgY2xhc3M9XCJwYWdlXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwXCIgQGNsaWNrPVwibmV4dERpYWxvZ3VlXCI+XHJcblx0XHRcdDwhLS0g6IOM5pmv5Zu+54mHIC0tPlxyXG5cdFx0XHQ8aW1hZ2Ugc3JjPVwiL2NvbW1vbi97e2JhY2tncm91bmR9fVwiPjwvaW1hZ2U+XHJcblx0XHRcdDwhLS0g5YmN5pmv5Zu+54mH77yI6Iul5pyJ77yJIC0tPlxyXG5cdFx0XHQ8aW1hZ2Ugc3JjPVwiL2NvbW1vbi97e2dhbWVEYXRhLnNjZW5lc1tjdXJyZW50U2NlbmVdLkltZ319XCIgc3R5bGU9XCJcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHRcclxuXHRcdFx0XHR0b3A6e3tnYW1lRGF0YS5zY2VuZXNbY3VycmVudFNjZW5lXS5JbWdUb3B9fXB4O1xyXG5cdFx0XHRcdGxlZnQ6e3tnYW1lRGF0YS5zY2VuZXNbY3VycmVudFNjZW5lXS5JbWdMZWZ0fX1weDtcclxuXHRcdFx0XHRcIiBpZj1cInt7Z2FtZURhdGEuc2NlbmVzW2N1cnJlbnRTY2VuZV0uSW1nICE9PSB1bmRlZmluZWR9fVwiPjwvaW1hZ2U+XHJcblxyXG5cdFx0XHQ8IS0tIOinkuiJsuWQjeensCAtLT5cclxuXHRcdFx0PHRleHQgc3R5bGU9XCJcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0Ym90dG9tOiAxNjBweDtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdGhlaWdodDp7e3NldHRpbmdzRGF0YS50ZXh0U2l6ZSsyMH19cHg7XHJcblx0XHRcdFx0d2lkdGg6e3sgY2hhcmFjdGVyLmxlbmd0aCooc2V0dGluZ3NEYXRhLnRleHRTaXplKzUpKzMwfX1weDtcclxuXHRcdFx0XHRwYWRkaW5nOiAxNXB4IDE1cHggMHB4IDE1cHg7XHJcblx0XHRcdFx0Zm9udC1zaXplOiB7e3NldHRpbmdzRGF0YS50ZXh0U2l6ZSs1fX1weDtcclxuXHRcdFx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7XHJcblx0XHRcdFx0XCIgaWY9XCJ7e2NoYXJhY3RlciE9JycgJiYgZ2FtZURhdGEuc2NlbmVzW2N1cnJlbnRTY2VuZV0uY2hvaWNlcyA9PSB1bmRlZmluZWQgJiYgRU5EID09PScnfX1cIj5cclxuXHRcdFx0XHR7eyBjaGFyYWN0ZXIgfX1cclxuXHRcdFx0PC90ZXh0PlxyXG5cclxuXHRcdFx0PCEtLSDlr7nor53lhoXlrrkgLS0+XHJcblx0XHRcdDxzY3JvbGwgc2Nyb2xsLXk9XCJ0cnVlXCIgYm91bmNlcz1cInRydWVcIiBjbGFzcz1cInRleHQtYm94XCIgaWQ9XCJ0ZXh0LWJveFwiXHJcblx0XHRcdFx0aWY9XCJ7e2dhbWVEYXRhLnNjZW5lc1tjdXJyZW50U2NlbmVdLmNob2ljZXMgPT0gdW5kZWZpbmVkICYmIEVORCA9PT0nJ319XCI+XHJcblx0XHRcdFx0PHRleHQgc3R5bGU9XCJcclxuXHRcdFx0XHR0ZXh0LWFsaWduOiBsZWZ0OyBcclxuXHRcdFx0XHRmb250LXdlaWdodDogYm9sZDsgXHJcblx0XHRcdFx0Zm9udC1zaXplOiB7e3NldHRpbmdzRGF0YS50ZXh0U2l6ZX19cHg7XHJcblx0XHRcdFx0Y29sb3I6ICNmZmZmZmY7XHJcblx0XHRcdFx0XCI+XHJcblx0XHRcdFx0XHR7eyBzaG93VGV4dCB9fVxyXG5cdFx0XHRcdDwvdGV4dD5cclxuXHRcdFx0PC9zY3JvbGw+XHJcblx0XHQ8L2Rpdj5cclxuXHRcdDwhLS0g6YCJ6aG56aG1IC0tPlxyXG5cdFx0PGRpdiBjbGFzcz1cIm1lbnUgcGFnZVwiIGlmPVwie3tnYW1lRGF0YS5zY2VuZXNbY3VycmVudFNjZW5lXS5jaG9pY2VzICE9IHVuZGVmaW5lZH19XCI+XHJcblx0XHRcdDwhLS0g6YCJ6aG5MSAtLT5cclxuXHRcdFx0PHRleHQgY2xhc3M9XCJidG5cIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDMwcHhcIiBAY2xpY2s9XCJzZWxlY3RDaG9pY2UoMClcIj5cclxuXHRcdFx0XHR7eyBnYW1lRGF0YS5zY2VuZXNbY3VycmVudFNjZW5lXS5jaG9pY2VzWzBdLnRleHQgfX1cclxuXHRcdFx0PC90ZXh0PlxyXG5cdFx0XHQ8IS0tIOmAiemhuTIgLS0+XHJcblx0XHRcdDx0ZXh0IGNsYXNzPVwiYnRuXCIgQGNsaWNrPVwic2VsZWN0Q2hvaWNlKDEpXCI+XHJcblx0XHRcdFx0e3sgZ2FtZURhdGEuc2NlbmVzW2N1cnJlbnRTY2VuZV0uY2hvaWNlc1sxXS50ZXh0IH19XHJcblx0XHRcdDwvdGV4dD5cclxuXHRcdDwvZGl2PlxyXG5cdFx0PCEtLSDmuJDlhaXmuJDlh7rliqjnlLvpga7nvakgLS0+XHJcblx0XHQ8ZGl2IGNsYXNzPVwiZmFkZSBwYWdlXCIgc3R5bGU9XCJvcGFjaXR5OiB7e2ZhZGVPcGFjaXR5fX07XCIgaWY9XCJ7e3Nob3dGYWRlfX1cIj48L2Rpdj5cclxuXHRcdDwhLS0g6I+c5Y2V6aG1IC0tPlxyXG5cdFx0PGRpdiBjbGFzcz1cIm1lbnUgcGFnZVwiIGlmPVwie3ttZW51UGFnZSAmJiAhZWRpdFJlY292ZXJ5UGFnZSAmJiAhbG9hZFJlY292ZXJ5UGFnZX19XCI+XHJcblx0XHRcdDx0ZXh0IGNsYXNzPVwiYnRuXCIgQGNsaWNrPVwiYmFjaygpXCI+5Zue5Yiw5ri45oiPPC90ZXh0PlxyXG5cdFx0XHQ8dGV4dCBjbGFzcz1cImJ0blwiIEBjbGljaz1cImV4aXQoKVwiPui/lOWbnuS4u+mhtTwvdGV4dD5cclxuXHRcdFx0PHRleHQgY2xhc3M9XCJidG5cIiBAY2xpY2s9XCJza2lwU2NlbmUoKVwiPui3s+i/h+WcuuaZrzwvdGV4dD5cclxuXHRcdFx0PHRleHQgY2xhc3M9XCJidG5cIiBAY2xpY2s9XCJza2lwQ2hhcHRlcigpXCI+6Lez6L+H56ug6IqCPC90ZXh0PlxyXG5cdFx0XHQ8dGV4dCBjbGFzcz1cImJ0blwiIEBjbGljaz1cInRvUmVjb3ZlcnlQYWdlKCdlZGl0JylcIj7nrqHnkIblrZjmoaM8L3RleHQ+XHJcblx0XHRcdDx0ZXh0IGNsYXNzPVwiYnRuXCIgQGNsaWNrPVwidG9SZWNvdmVyeVBhZ2UoJ2xvYWQnKVwiPuWKoOi9veWtmOahozwvdGV4dD5cclxuXHRcdDwvZGl2PlxyXG5cdFx0PCEtLSDlrZjmoaPnrqHnkIbpobUgLS0+XHJcblx0XHQ8c2Nyb2xsIGNsYXNzPVwicGFnZSBzY3JvbGxcIiBzY3JvbGwteT1cInRydWVcIiBib3VuY2VzPVwidHJ1ZVwiIGlmPVwie3tlZGl0UmVjb3ZlcnlQYWdlfX1cIiBAc3dpcGU9XCJoYW5kbGVTd2lwZVwiPlxyXG5cdFx0XHQ8dGV4dCBjbGFzcz1cImJ0blwiIGZvcj1cInt7cmVjb3ZlcnlEYXRhfX1cIiBAY2xpY2s9XCJzYXZlUmVjb3ZlcnlEYXRhKCRpZHgpXCIgQGxvbmdwcmVzcz1cImRlbGV0ZVJlY292ZXJ5RGF0YSgkaWR4KVwiPlxyXG5cdFx0XHRcdOacrOWcsOWtmOahoyAje3sgJGlkeCArIDEgfX1cclxuXHRcdFx0PC90ZXh0PlxyXG5cdFx0XHQ8dGV4dCBjbGFzcz1cImJ0blwiIEBjbGljaz1cInNhdmVSZWNvdmVyeURhdGEoJ25ldycpXCI+KyDliJvlu7rmlrDlrZjmoaM8L3RleHQ+XHJcblx0XHQ8L3Njcm9sbD5cclxuXHRcdDwhLS0g5Yqg6L295a2Y5qGj6aG1IC0tPlxyXG5cdFx0PHNjcm9sbCBjbGFzcz1cInBhZ2Ugc2Nyb2xsXCIgc2Nyb2xsLXk9XCJ0cnVlXCIgYm91bmNlcz1cInRydWVcIiBpZj1cInt7bG9hZFJlY292ZXJ5UGFnZX19XCIgQHN3aXBlPVwiaGFuZGxlU3dpcGVcIj5cclxuXHRcdFx0PHRleHQgY2xhc3M9XCJidG5cIiBmb3I9XCJ7e3JlY292ZXJ5RGF0YX19XCIgQGNsaWNrPVwibG9hZFJlY292ZXJ5RGF0YSgkaWR4KVwiIEBsb25ncHJlc3M9XCJwcmludERhdGEoJGlkeClcIj5cclxuXHRcdFx0XHTmnKzlnLDlrZjmoaMgI3t7ICRpZHggKyAxIH19XHJcblx0XHRcdDwvdGV4dD5cclxuXHRcdDwvc2Nyb2xsPlxyXG5cdFx0PCEtLSDnu5PlsYDpobUgLS0+XHJcblx0XHQ8ZGl2IGNsYXNzPVwicGFnZVwiIHN0eWxlPVwianVzdGlmeS1jb250ZW50OiBjZW50ZXI7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43KVwiIGlmPVwie3tFTkR9fVwiXHJcblx0XHRcdEBzd2lwZT1cImhhbmRsZVN3aXBlXCI+XHJcblx0XHRcdDx0ZXh0IHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDY4cHg7IGZvbnQtc2l6ZTogNDhweDsgY29sb3I6ICNmZmZmZmZcIj5cclxuXHRcdFx0XHTovr7miJDnu5PlsYBcclxuXHRcdFx0PC90ZXh0PlxyXG5cdFx0XHQ8dGV4dCBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAxNDhweDsgZm9udC1zaXplOiAzMnB4OyBjb2xvcjogI2ZmZmZmZlwiPlxyXG5cdFx0XHRcdHt7IEVORCB9fVxyXG5cdFx0XHQ8L3RleHQ+XHJcblx0XHRcdDx0ZXh0IHN0eWxlPVwiXHJcblx0XHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0XHRib3R0b206IDc4cHg7XHJcblx0XHRcdFx0XHR3aWR0aDogMTgwcHg7XHJcblx0XHRcdFx0XHRoZWlnaHQ6IDgwcHg7XHJcblx0XHRcdFx0XHRib3JkZXItcmFkaXVzOiA0MHB4O1xyXG5cdFx0XHRcdFx0Zm9udC1zaXplOiAyOHB4O1xyXG5cdFx0XHRcdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XHJcblx0XHRcdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRcdFx0XHRjb2xvcjogI2ZmZmZmZjtcclxuXHRcdFx0XHRcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcclxuXHRcdFx0XHRcIiBAY2xpY2s9XCJleGl0XCI+XHJcblx0XHRcdFx06L+U5Zue5Li76aG1XHJcblx0XHRcdDwvdGV4dD5cclxuXHRcdDwvZGl2PlxyXG5cdDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHJvdXRlciBmcm9tIFwiQHN5c3RlbS5yb3V0ZXJcIjtcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSBcIkBzeXN0ZW0uc3RvcmFnZVwiO1xyXG5pbXBvcnQgcHJvbXB0IGZyb20gXCJAc3lzdGVtLnByb21wdFwiO1xyXG5pbXBvcnQgZmlsZSBmcm9tIFwiQHN5c3RlbS5maWxlXCI7XHJcblxyXG4vLyDnq6DoioIt5paH5Lu25ZCN5pig5bCE6KGoXHJcbmNvbnN0IGZpbGVOYW1lTWFwID0ge1xyXG5cdDA6IFwiYjk5OVwiLFxyXG5cdDE6IFwiYjEwMVwiLFxyXG5cdDI6IFwiYjEwMlwiLFxyXG5cdDM6IFwiYjEwM1wiLFxyXG5cdDQ6IFwiYjExMVwiLFxyXG5cdDU6IFwiYjExMlwiLFxyXG5cdDY6IFwiYjExM1wiLFxyXG5cdDc6IFwiYjExNFwiLFxyXG5cdDg6IFwiYjEyMVwiLFxyXG5cdDk6IFwiYjEyMlwiLFxyXG5cdDEwOiBcImIxMjNcIixcclxuXHQxMTogXCJiMTI0XCIsXHJcblx0MTI6IFwiYjIwMFwiLFxyXG5cdDEzOiBcImIyMDFcIixcclxuXHQxNDogXCJiMjAyXCIsXHJcblx0MTU6IFwiYjIwM1wiLFxyXG5cdDE2OiBcImIyMDRcIixcclxuXHQxNzogXCJiMjA1XCIsXHJcblx0MTg6IFwiYjIwNlwiLFxyXG5cdDE5OiBcImIyMDdcIixcclxuXHQyMDogXCJiMzAxXCIsXHJcblx0MjE6IFwiYjMwMlwiLFxyXG5cdDIyOiBcImIzMDNcIixcclxuXHQyMzogXCJiMzA0XCIsXHJcblx0MjQ6IFwiYjQwMVwiLFxyXG5cdDI1OiBcImI0MDJcIixcclxuXHQyNjogXCJiNDAzXCIsXHJcblx0Mjc6IFwiYjQwNFwiLFxyXG5cdDI4OiBcImI0MDVcIixcclxuXHQyOTogXCJiNDA2XCIsXHJcblx0MzA6IFwiYjQwN1wiLFxyXG5cdDMxOiBcImI1MDFcIixcclxuXHRCRTogXCJiNjAxXCIsXHJcblx0VEU6IFwiYjcwMVwiLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdC8vIOWPmOmHj+WjsOaYjlxyXG5cdHByaXZhdGU6IHtcclxuXHRcdC8vIOa4uOaIj+eKtuaAgVxyXG5cdFx0Y2hhcHRlcjogMCxcclxuXHRcdGN1cnJlbnRTY2VuZTogMCxcclxuXHRcdGN1cnJlbnREaWFsb2d1ZTogMCxcclxuXHRcdGNob2ljZTogW10sXHJcblx0XHRFTkQ6IFwiXCIsXHJcblx0XHQvLyDlr7nor53nirbmgIFcclxuXHRcdGNoYXJhY3RlcjogXCJcIixcclxuXHRcdHNob3dUZXh0OiBcIlwiLFxyXG5cdFx0aW5kZXg6IDAsXHJcblx0XHRpbnRlcnZhbElkOiBudWxsLFxyXG5cdFx0Y2FuQ29udGludWU6IHRydWUsXHJcblx0XHQvLyDpobXpnaLnirbmgIFcclxuXHRcdG1lbnVQYWdlOiBmYWxzZSxcclxuXHRcdGxvYWRSZWNvdmVyeVBhZ2U6IGZhbHNlLFxyXG5cdFx0ZWRpdFJlY292ZXJ5UGFnZTogZmFsc2UsXHJcblx0XHRzaG93RmFkZTogZmFsc2UsXHJcblx0XHRmYWRlT3BhY2l0eTogMCxcclxuXHRcdGJhY2tncm91bmQ6IFwiYmcucG5nXCIsXHJcblx0XHQvLyDmuLjmiI/mlbDmja5cclxuXHRcdGdhbWVEYXRhOiB7IHNjZW5lczogW10gfSxcclxuXHRcdC8vIOWtmOaho+aVsOaNrlxyXG5cdFx0cmVjb3ZlcnlJbmRleDogbnVsbCxcclxuXHRcdHJlY292ZXJ5RGF0YTogW10sXHJcblx0XHQvLyDorr7nva7mlbDmja5cclxuXHRcdHNldHRpbmdzRGF0YTogeyB0ZXh0U3BlZWQ6IDUwLCB0ZXh0U2l6ZTogMjQgfSxcclxuXHR9LFxyXG5cclxuXHQvLyDpobXpnaLliJ3lp4vljJZcclxuXHRvbkluaXQoKSB7XHJcblx0XHR0aGlzLnJlY292ZXJ5SW5kZXggPSBKU09OLnBhcnNlKHRoaXMucmVjb3ZlcnlJbmRleCk7XHJcblx0XHR0aGlzLnJlYWREYXRhKFwic2V0dGluZ3NEYXRhXCIsIChjYWxsYmFjaykgPT4ge1xyXG5cdFx0XHRpZiAoY2FsbGJhY2spIHRoaXMuc2V0dGluZ3NEYXRhID0gY2FsbGJhY2s7XHJcblx0XHRcdGVsc2UgdGhpcy5zZXR0aW5nc0RhdGEgPSB7IHRleHRTcGVlZDogNTAsIHRleHRTaXplOiAyNCB9O1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLnJlYWREYXRhKFwicmVjb3ZlcnlEYXRhXCIsIChjYWxsYmFjaykgPT4ge1xyXG5cdFx0XHRpZiAoY2FsbGJhY2spIHtcclxuXHRcdFx0XHR0aGlzLnJlY292ZXJ5RGF0YSA9IGNhbGxiYWNrO1xyXG5cdFx0XHRcdGlmICh0aGlzLnJlY292ZXJ5SW5kZXggIT0gbnVsbClcclxuXHRcdFx0XHRcdHRoaXMubG9hZFJlY292ZXJ5RGF0YSh0aGlzLnJlY292ZXJ5SW5kZXgpO1xyXG5cdFx0XHRcdGVsc2UgdGhpcy5sb2FkQ2hhcHRlcigwKTtcclxuXHRcdFx0fSBlbHNlIHRoaXMubG9hZENoYXB0ZXIoMCk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHQvLyDpobXpnaLplIDmr4FcclxuXHRvbkRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLmNsZWFyVGltZXIoKTtcclxuXHRcdGdsb2JhbC5ydW5HQygpO1xyXG5cdH0sXHJcblxyXG5cdC8vIOivu+WPluaVsOaNrlxyXG5cdHJlYWREYXRhKG5hbWUsIGNhbGxiYWNrKSB7XHJcblx0XHRzdG9yYWdlLmdldCh7XHJcblx0XHRcdGtleTogbmFtZSxcclxuXHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcclxuXHRcdFx0XHRpZiAoZGF0YSA9PT0gXCJcIikge1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2sobnVsbCk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmluZm8oYOWtmOWCqOeahOaVsOaNriAke25hbWV9IOS4uuepumApO1xyXG5cdFx0XHRcdH0gZWxzZSBjYWxsYmFjayhKU09OLnBhcnNlKGRhdGEpKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZmFpbDogKCkgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoYOivu+WPluaVsOaNriAke25hbWV9IOWksei0pWApO1xyXG5cdFx0XHRcdGNhbGxiYWNrKG51bGwpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Ly8g5YaZ5YWl5pWw5o2uXHJcblx0d3JpdGVEYXRhKG5hbWUsIGRhdGEpIHtcclxuXHRcdHN0b3JhZ2Uuc2V0KHtcclxuXHRcdFx0a2V5OiBuYW1lLFxyXG5cdFx0XHR2YWx1ZTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcblx0XHRcdHN1Y2Nlc3M6ICgpID0+IGNvbnNvbGUuaW5mbyhg5YaZ5YWl5pWw5o2uICR7bmFtZX0g5oiQ5YqfYCksXHJcblx0XHRcdGZhaWw6ICgpID0+IGNvbnNvbGUuaW5mbyhg5YaZ5YWl5pWw5o2uICR7bmFtZX0g5aSx6LSlYCksXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHQvLyDliqDovb3nq6DoioJcclxuXHRsb2FkQ2hhcHRlcihjaGFwdGVyKSB7XHJcblx0XHRnbG9iYWwucnVuR0MoKTtcclxuXHRcdGZpbGUucmVhZFRleHQoe1xyXG5cdFx0XHR1cmk6IGAvY29tbW9uLyR7ZmlsZU5hbWVNYXBbY2hhcHRlcl19LnR4dGAsXHJcblx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5nYW1lRGF0YS5zY2VuZXMgPSBbXTtcclxuXHRcdFx0XHR0aGlzLmdhbWVEYXRhLnNjZW5lcyA9IEpTT04ucGFyc2UoZGF0YS50ZXh0KTtcclxuXHRcdFx0XHR0aGlzLmxvYWRTY2VuZSh0aGlzLmN1cnJlbnRTY2VuZSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGZhaWw6IGZ1bmN0aW9uIChfZXJyLCBjb2RlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihg5Yqg6L2956ug6IqCICR7Y2hhcHRlcn0g5aSx6LSl77yM6ZSZ6K+v56CBICR7Y29kZX1gKTtcclxuXHRcdFx0XHRwcm9tcHQuc2hvd1RvYXN0KHsgbWVzc2FnZTogXCLliqDovb3otYTmupDlpLHotKXvvIzor7fph43or5VcIiB9KTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdC8vIOWKoOi9veWcuuaZr1xyXG5cdGxvYWRTY2VuZShzY2VuZUluZGV4KSB7XHJcblx0XHRjb25zdCBzY2VuZSA9IHRoaXMuZ2FtZURhdGEuc2NlbmVzW3NjZW5lSW5kZXhdO1xyXG5cdFx0dGhpcy5iYWNrZ3JvdW5kID0gc2NlbmUuYmFja2dyb3VuZDtcclxuXHRcdGlmIChzY2VuZS5jaG9pY2VzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2hvd0RpYWxvZ3VlKHNjZW5lLmRpYWxvZ3Vlc1t0aGlzLmN1cnJlbnREaWFsb2d1ZV0pO1xyXG5cdH0sXHJcblxyXG5cdC8vIOaYvuekuuWvueivnVxyXG5cdHNob3dEaWFsb2d1ZShkaWFsb2d1ZSkge1xyXG5cdFx0Ly8g5YeG5aSH5bel5L2cXHJcblx0XHR0aGlzLmNsZWFyVGltZXIoKTtcclxuXHRcdHRoaXMuY2hhcmFjdGVyID0gZGlhbG9ndWUuY2hhcmFjdGVyO1xyXG5cdFx0dGhpcy5pbmRleCA9IDA7XHJcblx0XHR0aGlzLnNob3dUZXh0ID0gXCJcIjtcclxuXHRcdHRoaXMuY2FuQ29udGludWUgPSBmYWxzZTtcclxuXHRcdC8vIOaegeWAvOWkhOeQhlxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3NEYXRhLnRleHRTcGVlZCA8PSAwKSB7XHJcblx0XHRcdHRoaXMuc2hvd1RleHQgPSBkaWFsb2d1ZS50ZXh0O1xyXG5cdFx0XHR0aGlzLmNhbkNvbnRpbnVlID0gdHJ1ZTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Ly8g6YCQ5a2X5Yqo55S7XHJcblx0XHR0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLmluZGV4ID49IGRpYWxvZ3VlLnRleHQubGVuZ3RoKSB7XHJcblx0XHRcdFx0dGhpcy5jbGVhclRpbWVyKCk7XHJcblx0XHRcdFx0dGhpcy5jYW5Db250aW51ZSA9IHRydWU7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2hvd1RleHQgKz0gZGlhbG9ndWUudGV4dC5jaGFyQXQodGhpcy5pbmRleCsrKTtcclxuXHRcdH0sIHRoaXMuc2V0dGluZ3NEYXRhLnRleHRTcGVlZCk7XHJcblx0fSxcclxuXHJcblx0Ly8g5riF6Zmk5a6a5pe25ZmoXHJcblx0Y2xlYXJUaW1lcigpIHtcclxuXHRcdGlmICh0aGlzLmludGVydmFsSWQpIHtcclxuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xyXG5cdFx0XHR0aGlzLmludGVydmFsSWQgPSBudWxsO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIOS4i+S4gOauteWvueivnVxyXG5cdG5leHREaWFsb2d1ZSgpIHtcclxuXHRcdC8vIOS7heW9k+WFgeiuuOe7p+e7reaXtuaJp+ihjFxyXG5cdFx0aWYgKCF0aGlzLmNhbkNvbnRpbnVlKSByZXR1cm47XHJcblx0XHQvLyDph43nva7nirbmgIHlubbmu5rliqjliLDpobbpg6hcclxuXHRcdHRoaXMuc2Nyb2xsVG9Ub3AoKTtcclxuXHRcdHRoaXMuY2FuQ29udGludWUgPSBmYWxzZTtcclxuXHRcdC8vIOiOt+WPluW9k+WJjeWcuuaZr+aVsOaNruWSjOacgOWQjuS4gOauteWvueivneaVsOaNrlxyXG5cdFx0Y29uc3Qgc2NlbmUgPSB0aGlzLmdhbWVEYXRhLnNjZW5lc1t0aGlzLmN1cnJlbnRTY2VuZV07XHJcblx0XHRjb25zdCBsYXN0U2NlbmVJbmRleCA9IHRoaXMuZ2FtZURhdGEuc2NlbmVzLmxlbmd0aCAtIDE7XHJcblx0XHRjb25zdCBsYXN0RGlhbG9ndWVJbmRleCA9IHNjZW5lLmRpYWxvZ3Vlcy5sZW5ndGggLSAxO1xyXG5cdFx0Y29uc3QgbGFzdERpYWxvZ3VlID0gc2NlbmUuZGlhbG9ndWVzW2xhc3REaWFsb2d1ZUluZGV4XTtcclxuXHRcdC8vIC0tLSDlnLrmma/lhoXlr7nor53mnKrnu5PmnZ8gLS0tXHJcblx0XHRpZiAodGhpcy5jdXJyZW50RGlhbG9ndWUgPCBsYXN0RGlhbG9ndWVJbmRleClcclxuXHRcdFx0dGhpcy5zaG93RGlhbG9ndWUoc2NlbmUuZGlhbG9ndWVzWysrdGhpcy5jdXJyZW50RGlhbG9ndWVdKTtcclxuXHRcdC8vIC0tLSDlnLrmma/lhoXlr7nor53lt7Lnu5PmnZ8gLS0tXHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Ly8g5b2T5YmN5Zy65pmv6Z2e5pyA5ZCO5LiA5Liq5Zy65pmvXHJcblx0XHRcdGlmICh0aGlzLmN1cnJlbnRTY2VuZSA8IGxhc3RTY2VuZUluZGV4KSB0aGlzLm5leHRTY2VuZShsYXN0RGlhbG9ndWUpO1xyXG5cdFx0XHQvLyDlvZPliY3lnLrmma/mmK/mnIDlkI7kuIDkuKrlnLrmma9cclxuXHRcdFx0ZWxzZSB0aGlzLm5leHRDaGFwdGVyKGxhc3REaWFsb2d1ZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8g5aSE55CG5Zy65pmv6Lez6L2sXHJcblx0bmV4dFNjZW5lKGxhc3REaWFsb2d1ZSkge1xyXG5cdFx0Ly8g6Iul5pyA5ZCO5a+56K+d5a6a5LmJ5LqGIHRvU2NlbmVz77yM5oyJ5YGP56e76YeP6Lez6L2sXHJcblx0XHRpZiAobGFzdERpYWxvZ3VlLnRvU2NlbmVzICE9PSB1bmRlZmluZWQpXHJcblx0XHRcdHRoaXMuY3VycmVudFNjZW5lICs9IGxhc3REaWFsb2d1ZS50b1NjZW5lcztcclxuXHRcdC8vIOWQpuWImei3s+i9rOWIsOS4i+S4gOS4quWcuuaZr1xyXG5cdFx0ZWxzZSB0aGlzLmN1cnJlbnRTY2VuZSsrO1xyXG5cdFx0dGhpcy5jdXJyZW50RGlhbG9ndWUgPSAwO1xyXG5cdFx0dGhpcy5sb2FkU2NlbmUodGhpcy5jdXJyZW50U2NlbmUpO1xyXG5cdH0sXHJcblxyXG5cdC8vIOWkhOeQhueroOiKgui3s+i9rFxyXG5cdG5leHRDaGFwdGVyKGxhc3REaWFsb2d1ZSkge1xyXG5cdFx0Ly8g5YiG5pSv5p2h5Lu25aSE55CGXHJcblx0XHRpZiAobGFzdERpYWxvZ3VlLmJyYW5jaCAhPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHR0aGlzLmhhbmRsZUJyYW5jaChsYXN0RGlhbG9ndWUuYnJhbmNoKTtcclxuXHRcdC8vIOe7k+WxgOWkhOeQhlxyXG5cdFx0ZWxzZSBpZiAobGFzdERpYWxvZ3VlLkVORCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuRU5EID0gbGFzdERpYWxvZ3VlLkVORDtcclxuXHRcdFx0dGhpcy5zYXZlRmluKHRoaXMuRU5EKTtcclxuXHRcdH1cclxuXHRcdC8vIOm7mOiupOWKoOi9veS4i+S4gOeroOiKglxyXG5cdFx0ZWxzZSB0aGlzLmxvYWRDaGFwdGVyV2l0aEZhZGUoKyt0aGlzLmNoYXB0ZXIpO1xyXG5cdH0sXHJcblxyXG5cdC8vIOWkhOeQhuWIhuaUr+adoeS7tlxyXG5cdGhhbmRsZUJyYW5jaChicmFuY2hEYXRhKSB7XHJcblx0XHQvLyDmo4Dmn6XnjqnlrrbpgInmi6nmmK/lkKbljLnphY3liIbmlK/mnaHku7ZcclxuXHRcdGlmIChKU09OLnN0cmluZ2lmeSh0aGlzLmNob2ljZSkgPT09IEpTT04uc3RyaW5naWZ5KGJyYW5jaERhdGEuY2hvaWNlcykpXHJcblx0XHRcdHRoaXMuY2hhcHRlciA9IGJyYW5jaERhdGEudG9DaGFwdGVyO1xyXG5cdFx0Ly8g5pyq5Yy56YWN5YiZ6L+b5YWl5Z2P57uT5bGAXHJcblx0XHRlbHNlIHRoaXMuY2hhcHRlciA9IFwiQkVcIjtcclxuXHRcdC8vIOWKoOi9veWIhuaUr+eroOiKglxyXG5cdFx0dGhpcy5jdXJyZW50U2NlbmUgPSAwO1xyXG5cdFx0dGhpcy5jdXJyZW50RGlhbG9ndWUgPSAwO1xyXG5cdFx0dGhpcy5sb2FkQ2hhcHRlcldpdGhGYWRlKHRoaXMuY2hhcHRlcik7XHJcblx0fSxcclxuXHJcblx0Ly8g5Yqg6L2956ug6IqC77yI5riQ5YWl5riQ5Ye677yJXHJcblx0bG9hZENoYXB0ZXJXaXRoRmFkZShjaGFwdGVyKSB7XHJcblx0XHQvLyDmmL7npLrpga7nvanlsYJcclxuXHRcdHRoaXMuc2hvd0ZhZGUgPSB0cnVlO1xyXG5cdFx0dGhpcy5mYWRlT3BhY2l0eSA9IDA7XHJcblx0XHQvLyDlvq7lsI/lu7bov5/noa7kv50gRE9NIOa4suafk1xyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdC8vIOWQr+WKqOa4kOWFpeWKqOeUu1xyXG5cdFx0XHR0aGlzLmZhZGVPcGFjaXR5ID0gMTtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0Ly8g5riQ5YWl5a6M5oiQ5ZCO5Yqg6L2956ug6IqCXHJcblx0XHRcdFx0dGhpcy5jdXJyZW50U2NlbmUgPSAwO1xyXG5cdFx0XHRcdHRoaXMuY3VycmVudERpYWxvZ3VlID0gMDtcclxuXHRcdFx0XHR0aGlzLmxvYWRDaGFwdGVyKGNoYXB0ZXIpO1xyXG5cdFx0XHRcdC8vIOa4kOWHuuWKqOeUu1xyXG5cdFx0XHRcdHRoaXMuZmFkZU9wYWNpdHkgPSAwO1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4gKHRoaXMuc2hvd0ZhZGUgPSBmYWxzZSksIDUwMCk7XHJcblx0XHRcdH0sIDUwMCk7XHJcblx0XHR9LCA1MCk7XHJcblx0fSxcclxuXHJcblx0Ly8g5ruR5Yqo5LqL5Lu25aSE55CGXHJcblx0aGFuZGxlU3dpcGUoZXZlbnQpIHtcclxuXHRcdGlmICh0aGlzLkVORCkgcmV0dXJuO1xyXG5cdFx0aWYgKGV2ZW50LmRpcmVjdGlvbiA9PT0gXCJyaWdodFwiKSB7XHJcblx0XHRcdGlmICghdGhpcy5tZW51UGFnZSkgdGhpcy5tZW51UGFnZSA9IHRydWU7XHJcblx0XHRcdGlmICh0aGlzLmxvYWRSZWNvdmVyeVBhZ2UgfHwgdGhpcy5lZGl0UmVjb3ZlcnlQYWdlKSB0aGlzLmJhY2soKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyDov5Tlm57kuIrnuqdcclxuXHRiYWNrKCkge1xyXG5cdFx0aWYgKHRoaXMubG9hZFJlY292ZXJ5UGFnZSkgdGhpcy5sb2FkUmVjb3ZlcnlQYWdlID0gZmFsc2U7XHJcblx0XHRlbHNlIGlmICh0aGlzLmVkaXRSZWNvdmVyeVBhZ2UpIHRoaXMuZWRpdFJlY292ZXJ5UGFnZSA9IGZhbHNlO1xyXG5cdFx0ZWxzZSBpZiAodGhpcy5tZW51UGFnZSkgdGhpcy5tZW51UGFnZSA9IGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cdC8vIOWbnuS4u+eVjOmdolxyXG5cdGV4aXQoKSB7XHJcblx0XHRyb3V0ZXIucmVwbGFjZSh7IHVyaTogXCIvcGFnZXMvaW5kZXhcIiB9KTtcclxuXHR9LFxyXG5cclxuXHQvLyDpgInmi6npgInpoblcclxuXHRzZWxlY3RDaG9pY2UoY2hvaWNlSW5kZXgpIHtcclxuXHRcdHRoaXMuY2hvaWNlLnB1c2goY2hvaWNlSW5kZXgpO1xyXG5cdFx0dGhpcy5jdXJyZW50U2NlbmUgKz1cclxuXHRcdFx0dGhpcy5nYW1lRGF0YS5zY2VuZXNbdGhpcy5jdXJyZW50U2NlbmVdLmNob2ljZXNbY2hvaWNlSW5kZXhdLm5leHRTY2VuZTtcclxuXHRcdHRoaXMuY3VycmVudERpYWxvZ3VlID0gMDtcclxuXHRcdHRoaXMubG9hZFNjZW5lKHRoaXMuY3VycmVudFNjZW5lKTtcclxuXHR9LFxyXG5cclxuXHQvLyDot7PovazlrZjmoaPpobXpnaJcclxuXHR0b1JlY292ZXJ5UGFnZShuYW1lKSB7XHJcblx0XHRpZiAobmFtZSA9PT0gXCJsb2FkXCIpXHJcblx0XHRcdGlmICh0aGlzLnJlY292ZXJ5RGF0YSAmJiB0aGlzLnJlY292ZXJ5RGF0YS5sZW5ndGggPiAwKVxyXG5cdFx0XHRcdHRoaXMubG9hZFJlY292ZXJ5UGFnZSA9IHRydWU7XHJcblx0XHRcdGVsc2UgcHJvbXB0LnNob3dUb2FzdCh7IG1lc3NhZ2U6IFwi5peg5Y+v55So5a2Y5qGjXCIgfSk7XHJcblx0XHRpZiAobmFtZSA9PT0gXCJlZGl0XCIpIHRoaXMuZWRpdFJlY292ZXJ5UGFnZSA9IHRydWU7XHJcblx0fSxcclxuXHJcblx0Ly8g5paw5aKeL+imhuWGmeWtmOaho1xyXG5cdHNhdmVSZWNvdmVyeURhdGEoaW5kZXgpIHtcclxuXHRcdGNvbnN0IHRlbXBEYXRhID0ge1xyXG5cdFx0XHRjaGFwdGVyOiB0aGlzLmNoYXB0ZXIsXHJcblx0XHRcdGN1cnJlbnRTY2VuZTogdGhpcy5jdXJyZW50U2NlbmUsXHJcblx0XHRcdGN1cnJlbnREaWFsb2d1ZTogdGhpcy5jdXJyZW50RGlhbG9ndWUsXHJcblx0XHRcdGNob2ljZTogdGhpcy5jaG9pY2UsXHJcblx0XHR9O1xyXG5cdFx0aWYgKGluZGV4ID09PSBcIm5ld1wiKSB7XHJcblx0XHRcdGlmICh0aGlzLnJlY292ZXJ5RGF0YS5sZW5ndGggPj0gMTApXHJcblx0XHRcdFx0cHJvbXB0LnNob3dUb2FzdCh7IG1lc3NhZ2U6IFwi5a2Y5qGj5pWw5bey6L6+5LiK6ZmQ77yM6ZW/5oyJ5Y+v5Yig6Zmk5a2Y5qGjXCIgfSk7XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMucmVjb3ZlcnlEYXRhLnB1c2godGVtcERhdGEpO1xyXG5cdFx0XHRcdHRoaXMud3JpdGVEYXRhKFwicmVjb3ZlcnlEYXRhXCIsIHRoaXMucmVjb3ZlcnlEYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5yZWNvdmVyeURhdGFbaW5kZXhdID0gdGVtcERhdGE7XHJcblx0XHRcdHRoaXMud3JpdGVEYXRhKFwicmVjb3ZlcnlEYXRhXCIsIHRoaXMucmVjb3ZlcnlEYXRhKTtcclxuXHRcdFx0cHJvbXB0LnNob3dUb2FzdCh7IG1lc3NhZ2U6IGDlt7Lopobnm5bmnKzlnLDlrZjmoaMgIyR7aW5kZXggKyAxfWAgfSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8g5Yig6Zmk5a2Y5qGjXHJcblx0ZGVsZXRlUmVjb3ZlcnlEYXRhKGluZGV4LCBldmVudCkge1xyXG5cdFx0dGhpcy5yZWNvdmVyeURhdGEuc3BsaWNlKGluZGV4LCAxKTtcclxuXHRcdHRoaXMud3JpdGVEYXRhKFwicmVjb3ZlcnlEYXRhXCIsIHRoaXMucmVjb3ZlcnlEYXRhKTtcclxuXHRcdHByb21wdC5zaG93VG9hc3QoeyBtZXNzYWdlOiBg5bey5Yig6Zmk5pys5Zyw5a2Y5qGjICMke2luZGV4ICsgMX1gIH0pO1xyXG5cdH0sXHJcblxyXG5cdC8vIOWKoOi9veWtmOaho1xyXG5cdGxvYWRSZWNvdmVyeURhdGEoaW5kZXgpIHtcclxuXHRcdGlmIChpbmRleCA9PT0gXCJURVwiKSB7XHJcblx0XHRcdHRoaXMubG9hZENoYXB0ZXIoXCJURVwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Ly8g5oGi5aSN5ri45oiP54q25oCBXHJcblx0XHRjb25zdCB0ZW1wRGF0YSA9IHRoaXMucmVjb3ZlcnlEYXRhW2luZGV4XTtcclxuXHRcdHRoaXMuY2hhcHRlciA9IHRlbXBEYXRhLmNoYXB0ZXI7XHJcblx0XHR0aGlzLmN1cnJlbnRTY2VuZSA9IHRlbXBEYXRhLmN1cnJlbnRTY2VuZTtcclxuXHRcdHRoaXMuY3VycmVudERpYWxvZ3VlID0gdGVtcERhdGEuY3VycmVudERpYWxvZ3VlO1xyXG5cdFx0dGhpcy5jaG9pY2UgPSB0ZW1wRGF0YS5jaG9pY2U7XHJcblx0XHQvLyDpgIDlh7rliqDovb3nlYzpnaJcclxuXHRcdHRoaXMubWVudVBhZ2UgPSBmYWxzZTtcclxuXHRcdHRoaXMubG9hZFJlY292ZXJ5UGFnZSA9IGZhbHNlO1xyXG5cdFx0Ly8g5Yqg6L295ri45oiP5pWw5o2uXHJcblx0XHR0aGlzLmxvYWRDaGFwdGVyKHRoaXMuY2hhcHRlcik7XHJcblx0fSxcclxuXHJcblx0Ly8g6Lez6L+H5Zy65pmvXHJcblx0c2tpcFNjZW5lKCkge1xyXG5cdFx0Ly8g6I635Y+W5b2T5YmN5Zy65pmv5a+56LGhXHJcblx0XHRjb25zdCBjdXJyZW50U2NlbmUgPSB0aGlzLmdhbWVEYXRhLnNjZW5lc1t0aGlzLmN1cnJlbnRTY2VuZV07XHJcblx0XHQvLyDojrflj5blvZPliY3lnLrmma/nmoTmnIDlkI7kuIDmrrXlr7nor51cclxuXHRcdGNvbnN0IGxhc3REaWFsb2d1ZSA9XHJcblx0XHRcdGN1cnJlbnRTY2VuZS5kaWFsb2d1ZXM/LltjdXJyZW50U2NlbmUuZGlhbG9ndWVzLmxlbmd0aCAtIDFdO1xyXG5cdFx0Ly8g5qOA5p+l5b2T5YmN5Zy65pmv5piv5ZCm5a2Y5Zyo6YCJ6aG5XHJcblx0XHRjb25zdCBoYXNDaG9pY2VzID0gY3VycmVudFNjZW5lLmNob2ljZXMgIT09IHVuZGVmaW5lZDtcclxuXHRcdC8vIOajgOafpeacgOWQjuWvueivneaYr+WQpuWMheWQq+W8uuWItuWJp+aDheiKgueCue+8iEVORC9icmFuY2gvdG9TY2VuZXPvvIlcclxuXHRcdGNvbnN0IGhhc0NyaXRpY2FsTm9kZSA9XHJcblx0XHRcdGxhc3REaWFsb2d1ZT8uRU5EIHx8IGxhc3REaWFsb2d1ZT8uYnJhbmNoIHx8IGxhc3REaWFsb2d1ZT8udG9TY2VuZXM7XHJcblx0XHQvLyDmo4Dmn6Xnm67moIflnLrmma/mmK/lkKbotoXlh7rnq6DoioLojIPlm7RcclxuXHRcdGNvbnN0IGlzVGFyZ2V0U2NlbmVJbnZhbGlkID1cclxuXHRcdFx0dGhpcy5jdXJyZW50U2NlbmUgKyAxID49IHRoaXMuZ2FtZURhdGEuc2NlbmVzLmxlbmd0aDtcclxuXHRcdC8vIOe7vOWQiOWIpOaWrVxyXG5cdFx0aWYgKGhhc0Nob2ljZXMgfHwgaGFzQ3JpdGljYWxOb2RlKVxyXG5cdFx0XHRwcm9tcHQuc2hvd1RvYXN0KHsgbWVzc2FnZTogXCLlhbPplK7lnLrmma/vvIzml6Dms5Xot7Pov4dcIiB9KTtcclxuXHRcdGVsc2UgaWYgKGlzVGFyZ2V0U2NlbmVJbnZhbGlkKVxyXG5cdFx0XHRwcm9tcHQuc2hvd1RvYXN0KHsgbWVzc2FnZTogXCLlt7LmmK/mnKznq6DmnIDlkI7lnLrmma9cIiB9KTtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHQvLyDmiafooYzot7Pov4dcclxuXHRcdFx0dGhpcy5jdXJyZW50RGlhbG9ndWUgPSAwO1xyXG5cdFx0XHR0aGlzLmxvYWRTY2VuZSgrK3RoaXMuY3VycmVudFNjZW5lKTtcclxuXHRcdFx0dGhpcy5tZW51UGFnZSA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIOi3s+i/h+eroOiKglxyXG5cdHNraXBDaGFwdGVyKCkge1xyXG5cdFx0Ly8g5qOA5p+l5b2T5YmN56ug6IqC5piv5ZCm5a2Y5Zyo6YCJ6aG5XHJcblx0XHRjb25zdCBoYXNDaG9pY2VzID0gdGhpcy5nYW1lRGF0YS5zY2VuZXMuc29tZShcclxuXHRcdFx0KHNjZW5lKSA9PiBzY2VuZS5jaG9pY2VzICE9PSB1bmRlZmluZWRcclxuXHRcdCk7XHJcblx0XHQvLyDmo4Dmn6XlvZPliY3nq6DoioLmmK/lkKblpITkuo7nu5PlsYDmiJbliIbmlK/lnLrmma9cclxuXHRcdGNvbnN0IGhhc0VuZGluZ09yQnJhbmNoID0gdGhpcy5nYW1lRGF0YS5zY2VuZXMuc29tZSgoc2NlbmUpID0+XHJcblx0XHRcdHNjZW5lLmRpYWxvZ3Vlcz8uc29tZSgoZCkgPT4gZC5FTkQgfHwgZC5icmFuY2gpXHJcblx0XHQpO1xyXG5cdFx0Ly8g5qOA5p+l5LiL5LiA56ug6IqC5piv5ZCm5a2Y5ZyoXHJcblx0XHRjb25zdCBpc05leHRDaGFwdGVyVmFsaWQgPSBmaWxlTmFtZU1hcC5oYXNPd25Qcm9wZXJ0eSh0aGlzLmNoYXB0ZXIgKyAxKTtcclxuXHRcdC8vIOe7vOWQiOWIpOaWrVxyXG5cdFx0aWYgKGhhc0Nob2ljZXMgfHwgaGFzRW5kaW5nT3JCcmFuY2gpXHJcblx0XHRcdHByb21wdC5zaG93VG9hc3QoeyBtZXNzYWdlOiBcIuWFs+mUrueroOiKgu+8jOaXoOazlei3s+i/h1wiIH0pO1xyXG5cdFx0ZWxzZSBpZiAoIWlzTmV4dENoYXB0ZXJWYWxpZCkgcHJvbXB0LnNob3dUb2FzdCh7IG1lc3NhZ2U6IFwi5bey5piv5pyA5ZCO5LiA56ugXCIgfSk7XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Ly8g5omn6KGM6Lez6L+HXHJcblx0XHRcdHRoaXMubG9hZENoYXB0ZXJXaXRoRmFkZSgrK3RoaXMuY2hhcHRlcik7XHJcblx0XHRcdHRoaXMubWVudVBhZ2UgPSBmYWxzZTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyDkv53lrZjnu5PlsYBcclxuXHRzYXZlRmluKGVuZCkge1xyXG5cdFx0dGhpcy5yZWFkRGF0YShcImZpblwiLCAoY2FsbGJhY2spID0+IHtcclxuXHRcdFx0bGV0IGZpbiA9IGNhbGxiYWNrIHx8IHsgSEU6IGZhbHNlLCBCRTogZmFsc2UgfTtcclxuXHRcdFx0aWYgKGVuZCA9PT0gXCJIYXBweSBFbmRpbmdcIikgZmluLkhFID0gdHJ1ZTtcclxuXHRcdFx0ZWxzZSBpZiAoZW5kID09PSBcIkJhZCBFbmRpbmdcIikgZmluLkJFID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy53cml0ZURhdGEoXCJmaW5cIiwgZmluKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdC8v77yIZGVidWfvvInmiZPljbDlrZjmoaPmlbDmja5cclxuXHRwcmludERhdGEoaW5kZXgpIHtcclxuXHRcdGNvbnNvbGUubG9nKGDmnKzlnLDlrZjmoaMgIyR7aW5kZXggKyAxfSDmlbDmja46YCwgdGhpcy5yZWNvdmVyeURhdGFbaW5kZXhdKTtcclxuXHR9LFxyXG5cclxuXHQvLyDmu5rliqjlr7nor53liLDpobbpg6hcclxuXHRzY3JvbGxUb1RvcCgpIHtcclxuXHRcdHRoaXMuJGVsZW1lbnQoXCJ0ZXh0LWJveFwiKS5zY3JvbGxUbyh7XHJcblx0XHRcdHRvcDogMCxcclxuXHRcdFx0bGVmdDogMCxcclxuXHRcdFx0YmVoYXZpb3I6IFwiaW5zdGFudFwiLFxyXG5cdFx0fSk7XHJcblx0fSxcclxufTtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGU+XHJcbi8qIOWfuuehgOmhtemdouagt+W8jyAqL1xyXG4ucGFnZSB7XHJcblx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdHRvcDogMDtcclxuXHRsZWZ0OiAwO1xyXG5cdHdpZHRoOiAzMzZweDtcclxuXHRoZWlnaHQ6IDQ4MHB4O1xyXG59XHJcbi8qIOmAmueUqOiPnOWNleagt+W8jyAqL1xyXG4ubWVudSB7XHJcblx0ZmxleC13cmFwOiBub3dyYXA7XHJcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cdGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43KTtcclxufVxyXG4vKiDpgJrnlKjliJfooajmoLflvI8gKi9cclxuLnNjcm9sbCB7XHJcblx0cGFkZGluZzogMTguNXB4IDA7XHJcblx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRmbGV4LXdyYXA6IG5vd3JhcDtcclxuXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjcpO1xyXG59XHJcbi8qIOmAmueUqOaMiemSruagt+W8jyAqL1xyXG4uYnRuIHtcclxuXHR3aWR0aDogMjg0cHg7XHJcblx0aGVpZ2h0OiA2MHB4O1xyXG5cdGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcblx0bWFyZ2luLXRvcDogN3B4O1xyXG5cdG1hcmdpbi1ib3R0b206IDdweDtcclxuXHRmb250LXNpemU6IDI4cHg7XHJcblx0Zm9udC13ZWlnaHQ6IGJvbGQ7XHJcblx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdGNvbG9yOiAjZmZmZmZmO1xyXG5cdGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcclxufVxyXG4vKiDlr7nor53mloflrZflrrnlmajmoLflvI8gKi9cclxuLnRleHQtYm94IHtcclxuXHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0bGVmdDogMDtcclxuXHRyaWdodDogMDtcclxuXHRib3R0b206IDA7XHJcblx0aGVpZ2h0OiAxNjBweDtcclxuXHRwYWRkaW5nOiA5cHggMTVweCAxNXB4IDE1cHg7XHJcblx0ZGlzcGxheTogZmxleDtcclxuXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cdGZsZXgtd3JhcDogd3JhcDtcclxuXHRhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuXHRvdmVyZmxvdzogaGlkZGVuO1xyXG5cdGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcclxufVxyXG4vKiDmuJDlhaXmuJDlh7rpga7nvanmoLflvI8gKi9cclxuLmZhZGUge1xyXG5cdG9wYWNpdHk6IDA7XHJcblx0dHJhbnNpdGlvbjogb3BhY2l0eSA1MDBtcyBlYXNlLWluLW91dDtcclxuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xyXG59XHJcbjwvc3R5bGU+Il0sIm5hbWVzIjpbIl9zeXN0ZW0iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiJGFwcF9yZXF1aXJlJCIsIl9zeXN0ZW0yIiwiX3N5c3RlbTMiLCJfc3lzdGVtNCIsIiIsImUiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsImZpbGVOYW1lTWFwIiwiQkUiLCJURSIsIl9kZWZhdWx0IiwiZXhwb3J0cyIsInByaXZhdGUiLCJjaGFwdGVyIiwiY3VycmVudFNjZW5lIiwiY3VycmVudERpYWxvZ3VlIiwiY2hvaWNlIiwiRU5EIiwiY2hhcmFjdGVyIiwic2hvd1RleHQiLCJpbmRleCIsImludGVydmFsSWQiLCJjYW5Db250aW51ZSIsIm1lbnVQYWdlIiwibG9hZFJlY292ZXJ5UGFnZSIsImVkaXRSZWNvdmVyeVBhZ2UiLCJzaG93RmFkZSIsImZhZGVPcGFjaXR5IiwiYmFja2dyb3VuZCIsImdhbWVEYXRhIiwic2NlbmVzIiwicmVjb3ZlcnlJbmRleCIsInJlY292ZXJ5RGF0YSIsInNldHRpbmdzRGF0YSIsInRleHRTcGVlZCIsInRleHRTaXplIiwib25Jbml0IiwiSlNPTiIsInBhcnNlIiwicmVhZERhdGEiLCJjYWxsYmFjayIsImxvYWRSZWNvdmVyeURhdGEiLCJsb2FkQ2hhcHRlciIsIm9uRGVzdHJveSIsImNsZWFyVGltZXIiLCJnbG9iYWwiLCJydW5HQyIsIm5hbWUiLCJzdG9yYWdlIiwiZ2V0Iiwia2V5Iiwic3VjY2VzcyIsImRhdGEiLCJjb25zb2xlIiwiaW5mbyIsImZhaWwiLCJlcnJvciIsIndyaXRlRGF0YSIsInNldCIsInZhbHVlIiwic3RyaW5naWZ5IiwiZmlsZSIsInJlYWRUZXh0IiwidXJpIiwidGV4dCIsImxvYWRTY2VuZSIsIl9lcnIiLCJjb2RlIiwicHJvbXB0Iiwic2hvd1RvYXN0IiwibWVzc2FnZSIsInNjZW5lSW5kZXgiLCJzY2VuZSIsImNob2ljZXMiLCJzaG93RGlhbG9ndWUiLCJkaWFsb2d1ZXMiLCJkaWFsb2d1ZSIsInNldEludGVydmFsIiwibGVuZ3RoIiwiY2hhckF0IiwiY2xlYXJJbnRlcnZhbCIsIm5leHREaWFsb2d1ZSIsInNjcm9sbFRvVG9wIiwibGFzdFNjZW5lSW5kZXgiLCJsYXN0RGlhbG9ndWVJbmRleCIsImxhc3REaWFsb2d1ZSIsIm5leHRTY2VuZSIsIm5leHRDaGFwdGVyIiwidG9TY2VuZXMiLCJ1bmRlZmluZWQiLCJicmFuY2giLCJoYW5kbGVCcmFuY2giLCJzYXZlRmluIiwibG9hZENoYXB0ZXJXaXRoRmFkZSIsImJyYW5jaERhdGEiLCJ0b0NoYXB0ZXIiLCJzZXRUaW1lb3V0IiwiaGFuZGxlU3dpcGUiLCJldmVudCIsImRpcmVjdGlvbiIsImJhY2siLCJleGl0Iiwicm91dGVyIiwicmVwbGFjZSIsInNlbGVjdENob2ljZSIsImNob2ljZUluZGV4IiwicHVzaCIsInRvUmVjb3ZlcnlQYWdlIiwic2F2ZVJlY292ZXJ5RGF0YSIsInRlbXBEYXRhIiwiZGVsZXRlUmVjb3ZlcnlEYXRhIiwic3BsaWNlIiwic2tpcFNjZW5lIiwiX2N1cnJlbnRTY2VuZSRkaWFsb2d1IiwiaGFzQ2hvaWNlcyIsImhhc0NyaXRpY2FsTm9kZSIsImlzVGFyZ2V0U2NlbmVJbnZhbGlkIiwic2tpcENoYXB0ZXIiLCJzb21lIiwiaGFzRW5kaW5nT3JCcmFuY2giLCJfc2NlbmUkZGlhbG9ndWVzIiwiZCIsImlzTmV4dENoYXB0ZXJWYWxpZCIsImhhc093blByb3BlcnR5IiwiZW5kIiwiZmluIiwiSEUiLCJwcmludERhdGEiLCJsb2ciLCIkZWxlbWVudCIsInNjcm9sbFRvIiwidG9wIiwibGVmdCIsImJlaGF2aW9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUdBLElBQUFBLE9BQUEsR0FBQUMsc0JBQUEsQ0FBQUMsYUFBQTtBQUNBLElBQUFDLFFBQUEsR0FBQUYsc0JBQUEsQ0FBQUMsYUFBQTtBQUNBLElBQUFFLFFBQUEsR0FBQUgsc0JBQUEsQ0FBQUMsYUFBQTtBQUNBLElBQUFHLFFBQUEsR0FBQUosc0JBQUEsQ0FBQUMsYUFBQTtBQUFnQyxTQUFBRCx1QkFBQU0sQ0FBQSxXQUFBQSxDQUFBLElBQUFBLENBQUEsQ0FBQUMsVUFBQSxHQUFBRCxDQUFBLEtBQUFFLE9BQUEsRUFBQUYsQ0FBQTtBQUVoQztBQUNBLE1BQU1HLFdBQVcsR0FBRztBQUNwQkosRUFBQyxDQUFDLEVBQUUsTUFBTTtBQUNWQSxFQUFDLENBQUMsRUFBRSxNQUFNO0FBQ1ZBLEVBQUMsQ0FBQyxFQUFFLE1BQU07QUFDVkEsRUFBQyxDQUFDLEVBQUUsTUFBTTtBQUNWQSxFQUFDLENBQUMsRUFBRSxNQUFNO0FBQ1ZBLEVBQUMsQ0FBQyxFQUFFLE1BQU07QUFDVkEsRUFBQyxDQUFDLEVBQUUsTUFBTTtBQUNWQSxFQUFDLENBQUMsRUFBRSxNQUFNO0FBQ1ZBLEVBQUMsQ0FBQyxFQUFFLE1BQU07QUFDVkEsRUFBQyxDQUFDLEVBQUUsTUFBTTtBQUNWQSxFQUFDLEVBQUUsRUFBRSxN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