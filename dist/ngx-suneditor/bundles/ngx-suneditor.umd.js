(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('suneditor'), require('@angular/common'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('ngx-suneditor', ['exports', '@angular/core', 'suneditor', '@angular/common', '@angular/platform-browser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ngx-suneditor'] = {}, global.ng.core, global['^2']['41']['0'], global.ng.common, global.ng.platformBrowser));
}(this, (function (exports, i0, suneditor, i1$1, i1) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var suneditor__default = /*#__PURE__*/_interopDefaultLegacy(suneditor);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var blockquote = {
        name: 'blockquote',
        display: 'command',
        add: function (core, targetElement) {
            var context = core.context;
            context.blockquote = {
                targetButton: targetElement,
                tag: core.util.createElement('BLOCKQUOTE')
            };
        },
        /**
         * @Override core
         */
        active: function (element) {
            if (!element) {
                this.util.removeClass(this.context.blockquote.targetButton, 'active');
            }
            else if (/blockquote/i.test(element.nodeName)) {
                this.util.addClass(this.context.blockquote.targetButton, 'active');
                return true;
            }
            return false;
        },
        /**
         * @Override core
         */
        action: function () {
            var currentBlockquote = this.util.getParentElement(this.getSelectionNode(), 'blockquote');
            if (currentBlockquote) {
                this.detachRangeFormatElement(currentBlockquote, null, null, false, false);
            }
            else {
                this.applyRangeFormatElement(this.context.blockquote.tag.cloneNode(false));
            }
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var align = {
        name: 'align',
        display: 'submenu',
        add: function (core, targetElement) {
            var icons = core.icons;
            var context = core.context;
            context.align = {
                targetButton: targetElement,
                _alignList: null,
                currentAlign: '',
                defaultDir: core.options.rtl ? 'right' : 'left',
                icons: {
                    justify: icons.align_justify,
                    left: icons.align_left,
                    right: icons.align_right,
                    center: icons.align_center
                }
            };
            /** set submenu */
            var listDiv = this.setSubmenu(core);
            var listUl = listDiv.querySelector('ul');
            /** add event listeners */
            listUl.addEventListener('click', this.pickup.bind(core));
            context.align._alignList = listUl.querySelectorAll('li button');
            /** append target button menu */
            core.initMenuTarget(this.name, targetElement, listDiv);
            /** empty memory */
            listDiv = null, listUl = null;
        },
        setSubmenu: function (core) {
            var lang = core.lang;
            var icons = core.icons;
            var listDiv = core.util.createElement('DIV');
            var leftDir = core.context.align.defaultDir === 'left';
            var leftMenu = '<li>' +
                '<button type="button" class="se-btn-list se-btn-align" data-command="justifyleft" data-value="left" title="' + lang.toolbar.alignLeft + '">' +
                '<span class="se-list-icon">' + icons.align_left + '</span>' + lang.toolbar.alignLeft +
                '</button>' +
                '</li>';
            var rightMenu = '<li>' +
                '<button type="button" class="se-btn-list se-btn-align" data-command="justifyright" data-value="right" title="' + lang.toolbar.alignRight + '">' +
                '<span class="se-list-icon">' + icons.align_right + '</span>' + lang.toolbar.alignRight +
                '</button>' +
                '</li>';
            listDiv.className = 'se-submenu se-list-layer se-list-align';
            listDiv.innerHTML = '' +
                '<div class="se-list-inner">' +
                '<ul class="se-list-basic">' +
                (leftDir ? leftMenu : rightMenu) +
                '<li>' +
                '<button type="button" class="se-btn-list se-btn-align" data-command="justifycenter" data-value="center" title="' + lang.toolbar.alignCenter + '">' +
                '<span class="se-list-icon">' + icons.align_center + '</span>' + lang.toolbar.alignCenter +
                '</button>' +
                '</li>' +
                (leftDir ? rightMenu : leftMenu) +
                '<li>' +
                '<button type="button" class="se-btn-list se-btn-align" data-command="justifyfull" data-value="justify" title="' + lang.toolbar.alignJustify + '">' +
                '<span class="se-list-icon">' + icons.align_justify + '</span>' + lang.toolbar.alignJustify +
                '</button>' +
                '</li>' +
                '</ul>' +
                '</div>';
            return listDiv;
        },
        /**
         * @Override core
         */
        active: function (element) {
            var alignContext = this.context.align;
            var targetButton = alignContext.targetButton;
            var target = targetButton.firstElementChild;
            if (!element) {
                this.util.changeElement(target, alignContext.icons[alignContext.defaultDir]);
                targetButton.removeAttribute('data-focus');
            }
            else if (this.util.isFormatElement(element)) {
                var textAlign = element.style.textAlign;
                if (textAlign) {
                    this.util.changeElement(target, alignContext.icons[textAlign] || alignContext.icons[alignContext.defaultDir]);
                    targetButton.setAttribute('data-focus', textAlign);
                    return true;
                }
            }
            return false;
        },
        /**
         * @Override submenu
         */
        on: function () {
            var alignContext = this.context.align;
            var alignList = alignContext._alignList;
            var currentAlign = alignContext.targetButton.getAttribute('data-focus') || alignContext.defaultDir;
            if (currentAlign !== alignContext.currentAlign) {
                for (var i = 0, len = alignList.length; i < len; i++) {
                    if (currentAlign === alignList[i].getAttribute('data-value')) {
                        this.util.addClass(alignList[i], 'active');
                    }
                    else {
                        this.util.removeClass(alignList[i], 'active');
                    }
                }
                alignContext.currentAlign = currentAlign;
            }
        },
        pickup: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var target = e.target;
            var value = null;
            while (!value && !/UL/i.test(target.tagName)) {
                value = target.getAttribute('data-value');
                target = target.parentNode;
            }
            if (!value)
                return;
            var defaultDir = this.context.align.defaultDir;
            var selectedFormsts = this.getSelectedElements();
            for (var i = 0, len = selectedFormsts.length; i < len; i++) {
                this.util.setStyle(selectedFormsts[i], 'textAlign', (value === defaultDir ? '' : value));
            }
            this.effectNode = null;
            this.submenuOff();
            this.focus();
            // history stack
            this.history.push(false);
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var font = {
        name: 'font',
        display: 'submenu',
        add: function (core, targetElement) {
            var context = core.context;
            context.font = {
                targetText: targetElement.querySelector('.txt'),
                targetTooltip: targetElement.parentNode.querySelector('.se-tooltip-text'),
                _fontList: null,
                currentFont: ''
            };
            /** set submenu */
            var listDiv = this.setSubmenu(core);
            /** add event listeners */
            listDiv.querySelector('.se-list-inner').addEventListener('click', this.pickup.bind(core));
            context.font._fontList = listDiv.querySelectorAll('ul li button');
            /** append target button menu */
            core.initMenuTarget(this.name, targetElement, listDiv);
            /** empty memory */
            listDiv = null;
        },
        setSubmenu: function (core) {
            var option = core.options;
            var lang = core.lang;
            var listDiv = core.util.createElement('DIV');
            listDiv.className = 'se-submenu se-list-layer se-list-font-family';
            var font, text, i, len;
            var fontList = !option.font ?
                [
                    'Arial',
                    'Comic Sans MS',
                    'Courier New',
                    'Impact',
                    'Georgia',
                    'tahoma',
                    'Trebuchet MS',
                    'Verdana'
                ] : option.font;
            var list = '<div class="se-list-inner">' +
                '<ul class="se-list-basic">' +
                '<li><button type="button" class="default_value se-btn-list" title="' + lang.toolbar.default + '">(' + lang.toolbar.default + ')</button></li>';
            for (i = 0, len = fontList.length; i < len; i++) {
                font = fontList[i];
                text = font.split(',')[0];
                list += '<li><button type="button" class="se-btn-list" data-value="' + font + '" data-txt="' + text + '" title="' + text + '" style="font-family:' + font + ';">' + text + '</button></li>';
            }
            list += '</ul></div>';
            listDiv.innerHTML = list;
            return listDiv;
        },
        /**
        * @Override core
        */
        active: function (element) {
            var target = this.context.font.targetText;
            var tooltip = this.context.font.targetTooltip;
            if (!element) {
                var font = this.hasFocus ? this.wwComputedStyle.fontFamily : this.lang.toolbar.font;
                this.util.changeTxt(target, font);
                this.util.changeTxt(tooltip, this.hasFocus ? this.lang.toolbar.font + ' (' + font + ')' : font);
            }
            else if (element.style && element.style.fontFamily.length > 0) {
                var selectFont = element.style.fontFamily.replace(/["']/g, '');
                this.util.changeTxt(target, selectFont);
                this.util.changeTxt(tooltip, this.lang.toolbar.font + ' (' + selectFont + ')');
                return true;
            }
            return false;
        },
        /**
        * @Override submenu
        */
        on: function () {
            var fontContext = this.context.font;
            var fontList = fontContext._fontList;
            var currentFont = fontContext.targetText.textContent;
            if (currentFont !== fontContext.currentFont) {
                for (var i = 0, len = fontList.length; i < len; i++) {
                    if (currentFont === fontList[i].getAttribute('data-value')) {
                        this.util.addClass(fontList[i], 'active');
                    }
                    else {
                        this.util.removeClass(fontList[i], 'active');
                    }
                }
                fontContext.currentFont = currentFont;
            }
        },
        pickup: function (e) {
            if (!/^BUTTON$/i.test(e.target.tagName))
                return false;
            e.preventDefault();
            e.stopPropagation();
            var value = e.target.getAttribute('data-value');
            if (value) {
                var newNode = this.util.createElement('SPAN');
                newNode.style.fontFamily = value;
                this.nodeChange(newNode, ['font-family'], null, null);
            }
            else {
                this.nodeChange(null, ['font-family'], ['span'], true);
            }
            this.submenuOff();
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var fontSize = {
        name: 'fontSize',
        display: 'submenu',
        add: function (core, targetElement) {
            var context = core.context;
            context.fontSize = {
                targetText: targetElement.querySelector('.txt'),
                _sizeList: null,
                currentSize: ''
            };
            /** set submenu */
            var listDiv = this.setSubmenu(core);
            var listUl = listDiv.querySelector('ul');
            /** add event listeners */
            listUl.addEventListener('click', this.pickup.bind(core));
            context.fontSize._sizeList = listUl.querySelectorAll('li button');
            /** append target button menu */
            core.initMenuTarget(this.name, targetElement, listDiv);
            /** empty memory */
            listDiv = null, listUl = null;
        },
        setSubmenu: function (core) {
            var option = core.options;
            var lang = core.lang;
            var listDiv = core.util.createElement('DIV');
            listDiv.className = 'se-submenu se-list-layer se-list-font-size';
            var sizeList = !option.fontSize ? [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72] : option.fontSize;
            var list = '<div class="se-list-inner">' +
                '<ul class="se-list-basic">' +
                '<li><button type="button" class="default_value se-btn-list" title="' + lang.toolbar.default + '">(' + lang.toolbar.default + ')</button></li>';
            for (var i = 0, unit = option.fontSizeUnit, len = sizeList.length, size = void 0; i < len; i++) {
                size = sizeList[i];
                list += '<li><button type="button" class="se-btn-list" data-value="' + size + unit + '" title="' + size + unit + '" style="font-size:' + size + unit + ';">' + size + '</button></li>';
            }
            list += '</ul></div>';
            listDiv.innerHTML = list;
            return listDiv;
        },
        /**
        * @Override core
        */
        active: function (element) {
            if (!element) {
                this.util.changeTxt(this.context.fontSize.targetText, this.hasFocus ? this.wwComputedStyle.fontSize : this.lang.toolbar.fontSize);
            }
            else if (element.style && element.style.fontSize.length > 0) {
                this.util.changeTxt(this.context.fontSize.targetText, element.style.fontSize);
                return true;
            }
            return false;
        },
        /**
        * @Override submenu
        */
        on: function () {
            var fontSizeContext = this.context.fontSize;
            var sizeList = fontSizeContext._sizeList;
            var currentSize = fontSizeContext.targetText.textContent;
            if (currentSize !== fontSizeContext.currentSize) {
                for (var i = 0, len = sizeList.length; i < len; i++) {
                    if (currentSize === sizeList[i].getAttribute('data-value')) {
                        this.util.addClass(sizeList[i], 'active');
                    }
                    else {
                        this.util.removeClass(sizeList[i], 'active');
                    }
                }
                fontSizeContext.currentSize = currentSize;
            }
        },
        pickup: function (e) {
            if (!/^BUTTON$/i.test(e.target.tagName))
                return false;
            e.preventDefault();
            e.stopPropagation();
            var value = e.target.getAttribute('data-value');
            if (value) {
                var newNode = this.util.createElement('SPAN');
                newNode.style.fontSize = value;
                this.nodeChange(newNode, ['font-size'], null, null);
            }
            else {
                this.nodeChange(null, ['font-size'], ['span'], true);
            }
            this.submenuOff();
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2018 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var colorPicker = {
        name: 'colorPicker',
        /**
         * @description Constructor
         * @param {Object} core Core object
         */
        add: function (core) {
            var context = core.context;
            context.colorPicker = {
                colorListHTML: '',
                _colorInput: '',
                _defaultColor: '#000',
                _styleProperty: 'color',
                _currentColor: '',
                _colorList: []
            };
            /** set submenu */
            context.colorPicker.colorListHTML = this.createColorList(core, this._makeColorList);
        },
        /**
         * @description Create color list
         * @param {Object} core Core object
         * @param {Function} makeColor this._makeColorList
         * @returns {String} HTML string
         */
        createColorList: function (core, makeColor) {
            var option = core.options;
            var lang = core.lang;
            var colorList = !option.colorList || option.colorList.length === 0 ?
                [
                    '#ff0000', '#ff5e00', '#ffe400', '#abf200', '#00d8ff', '#0055ff', '#6600ff', '#ff00dd', '#000000',
                    '#ffd8d8', '#fae0d4', '#faf4c0', '#e4f7ba', '#d4f4fa', '#d9e5ff', '#e8d9ff', '#ffd9fa', '#f1f1f1',
                    '#ffa7a7', '#ffc19e', '#faed7d', '#cef279', '#b2ebf4', '#b2ccff', '#d1b2ff', '#ffb2f5', '#bdbdbd',
                    '#f15f5f', '#f29661', '#e5d85c', '#bce55c', '#5cd1e5', '#6699ff', '#a366ff', '#f261df', '#8c8c8c',
                    '#980000', '#993800', '#998a00', '#6b9900', '#008299', '#003399', '#3d0099', '#990085', '#353535',
                    '#670000', '#662500', '#665c00', '#476600', '#005766', '#002266', '#290066', '#660058', '#222222'
                ] : option.colorList;
            var colorArr = [];
            var list = '<div class="se-list-inner">';
            for (var i = 0, len = colorList.length, color = void 0; i < len; i++) {
                color = colorList[i];
                if (!color)
                    continue;
                if (typeof color === 'string') {
                    colorArr.push(color);
                    if (i < len - 1)
                        continue;
                }
                if (colorArr.length > 0) {
                    list += '<div class="se-selector-color">' + makeColor(colorArr) + '</div>';
                    colorArr = [];
                }
                if (typeof color === 'object') {
                    list += '<div class="se-selector-color">' + makeColor(color) + '</div>';
                }
            }
            list += '' +
                '<form class="se-form-group">' +
                '<input type="text" maxlength="9" class="_se_color_picker_input se-color-input"/>' +
                '<button type="submit" class="se-btn-primary _se_color_picker_submit" title="' + lang.dialogBox.submitButton + '">' +
                core.icons.checked +
                '</button>' +
                '<button type="button" class="se-btn _se_color_picker_remove" title="' + lang.toolbar.removeFormat + '">' +
                core.icons.erase +
                '</button>' +
                '</form>' +
                '</div>';
            return list;
        },
        /**
         * @description Internal function used by this.createColorList
         * @param {Array} colorList Color list
         * @private
         */
        _makeColorList: function (colorList) {
            var list = '';
            list += '<ul class="se-color-pallet">';
            for (var i = 0, len = colorList.length, color = void 0; i < len; i++) {
                color = colorList[i];
                if (typeof color === 'string') {
                    list += '<li>' +
                        '<button type="button" data-value="' + color + '" title="' + color + '" style="background-color:' + color + ';"></button>' +
                        '</li>';
                }
            }
            list += '</ul>';
            return list;
        },
        /**
         * @description Displays or resets the currently selected color at color list.
         * @param {Node} node Current Selected node
         * @param {String|null} color Color value
         */
        init: function (node, color) {
            var colorPicker = this.plugins.colorPicker;
            var fillColor = color ? color : colorPicker.getColorInNode.call(this, node) || this.context.colorPicker._defaultColor;
            fillColor = colorPicker.isHexColor(fillColor) ? fillColor : colorPicker.rgb2hex(fillColor) || fillColor;
            var colorList = this.context.colorPicker._colorList;
            if (colorList) {
                for (var i = 0, len = colorList.length; i < len; i++) {
                    if (fillColor.toLowerCase() === colorList[i].getAttribute('data-value').toLowerCase()) {
                        this.util.addClass(colorList[i], 'active');
                    }
                    else {
                        this.util.removeClass(colorList[i], 'active');
                    }
                }
            }
            colorPicker.setInputText.call(this, colorPicker.colorName2hex.call(this, fillColor));
        },
        /**
         * @description Store color values
         * @param {String} hexColorStr Hax color value
         */
        setCurrentColor: function (hexColorStr) {
            this.context.colorPicker._currentColor = hexColorStr;
            this.context.colorPicker._colorInput.style.borderColor = hexColorStr;
        },
        /**
         * @description Set color at input element
         * @param {String} hexColorStr Hax color value
         */
        setInputText: function (hexColorStr) {
            hexColorStr = /^#/.test(hexColorStr) ? hexColorStr : '#' + hexColorStr;
            this.context.colorPicker._colorInput.value = hexColorStr;
            this.plugins.colorPicker.setCurrentColor.call(this, hexColorStr);
        },
        /**
         * @description Gets color value at color property of node
         * @param {Node} node Selected node
         * @returns {String}
         */
        getColorInNode: function (node) {
            var findColor = '';
            var styleProperty = this.context.colorPicker._styleProperty;
            while (node && !this.util.isWysiwygDiv(node) && findColor.length === 0) {
                if (node.nodeType === 1 && node.style[styleProperty])
                    findColor = node.style[styleProperty];
                node = node.parentNode;
            }
            return findColor;
        },
        /**
         * @description Function to check hex format color
         * @param {String} str Color value
         */
        isHexColor: function (str) {
            return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(str);
        },
        /**
         * @description Function to convert hex format to a rgb color
         * @param {String} rgb RGB color format
         * @returns {String}
         */
        rgb2hex: function (rgb) {
            var rgbMatch = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            return (rgbMatch && rgbMatch.length === 4) ? "#" +
                ("0" + parseInt(rgbMatch[1], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgbMatch[2], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgbMatch[3], 10).toString(16)).slice(-2) : '';
        },
        /**
         * @description Converts color values of other formats to hex color values and returns.
         * @param {String} colorName Color value
         * @returns {String}
         */
        colorName2hex: function (colorName) {
            if (/^#/.test(colorName))
                return colorName;
            var temp = this.util.createElement('div');
            temp.style.display = 'none';
            temp.style.color = colorName;
            var colors = this._w.getComputedStyle(this._d.body.appendChild(temp)).color.match(/\d+/g).map(function (a) { return parseInt(a, 10); });
            this.util.removeItem(temp);
            return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var fontColor = {
        name: 'fontColor',
        display: 'submenu',
        add: function (core, targetElement) {
            core.addModule([colorPicker]);
            var context = core.context;
            context.fontColor = {
                previewEl: null,
                colorInput: null,
                colorList: null
            };
            /** set submenu */
            var listDiv = this.setSubmenu(core);
            context.fontColor.colorInput = listDiv.querySelector('._se_color_picker_input');
            /** add event listeners */
            context.fontColor.colorInput.addEventListener('keyup', this.onChangeInput.bind(core));
            listDiv.querySelector('._se_color_picker_submit').addEventListener('click', this.submit.bind(core));
            listDiv.querySelector('._se_color_picker_remove').addEventListener('click', this.remove.bind(core));
            listDiv.addEventListener('click', this.pickup.bind(core));
            context.fontColor.colorList = listDiv.querySelectorAll('li button');
            /** append target button menu */
            core.initMenuTarget(this.name, targetElement, listDiv);
            /** empty memory */
            listDiv = null;
        },
        setSubmenu: function (core) {
            var colorArea = core.context.colorPicker.colorListHTML;
            var listDiv = core.util.createElement('DIV');
            listDiv.className = 'se-submenu se-list-layer';
            listDiv.innerHTML = colorArea;
            return listDiv;
        },
        /**
        * @Override submenu
        */
        on: function () {
            var contextPicker = this.context.colorPicker;
            var contextFontColor = this.context.fontColor;
            contextPicker._colorInput = contextFontColor.colorInput;
            var color = this.wwComputedStyle.color;
            contextPicker._defaultColor = color ? this.plugins.colorPicker.isHexColor(color) ? color : this.plugins.colorPicker.rgb2hex(color) : "#333333";
            contextPicker._styleProperty = 'color';
            contextPicker._colorList = contextFontColor.colorList;
            this.plugins.colorPicker.init.call(this, this.getSelectionNode(), null);
        },
        /**
        * @Override _colorPicker
        */
        onChangeInput: function (e) {
            this.plugins.colorPicker.setCurrentColor.call(this, e.target.value);
        },
        submit: function () {
            this.plugins.fontColor.applyColor.call(this, this.context.colorPicker._currentColor);
        },
        pickup: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.plugins.fontColor.applyColor.call(this, e.target.getAttribute('data-value'));
        },
        remove: function () {
            this.nodeChange(null, ['color'], ['span'], true);
            this.submenuOff();
        },
        applyColor: function (color) {
            if (!color)
                return;
            var newNode = this.util.createElement('SPAN');
            newNode.style.color = color;
            this.nodeChange(newNode, ['color'], null, null);
            this.submenuOff();
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var hiliteColor = {
        name: 'hiliteColor',
        display: 'submenu',
        add: function (core, targetElement) {
            core.addModule([colorPicker]);
            var context = core.context;
            context.hiliteColor = {
                previewEl: null,
                colorInput: null,
                colorList: null
            };
            /** set submenu */
            var listDiv = this.setSubmenu(core);
            context.hiliteColor.colorInput = listDiv.querySelector('._se_color_picker_input');
            /** add event listeners */
            context.hiliteColor.colorInput.addEventListener('keyup', this.onChangeInput.bind(core));
            listDiv.querySelector('._se_color_picker_submit').addEventListener('click', this.submit.bind(core));
            listDiv.querySelector('._se_color_picker_remove').addEventListener('click', this.remove.bind(core));
            listDiv.addEventListener('click', this.pickup.bind(core));
            context.hiliteColor.colorList = listDiv.querySelectorAll('li button');
            /** append target button menu */
            core.initMenuTarget(this.name, targetElement, listDiv);
            /** empty memory */
            listDiv = null;
        },
        setSubmenu: function (core) {
            var colorArea = core.context.colorPicker.colorListHTML;
            var listDiv = core.util.createElement('DIV');
            listDiv.className = 'se-submenu se-list-layer';
            listDiv.innerHTML = colorArea;
            return listDiv;
        },
        /**
        * @Override submenu
        */
        on: function () {
            var contextPicker = this.context.colorPicker;
            var contextHiliteColor = this.context.hiliteColor;
            contextPicker._colorInput = contextHiliteColor.colorInput;
            var color = this.wwComputedStyle.backgroundColor;
            contextPicker._defaultColor = color ? this.plugins.colorPicker.isHexColor(color) ? color : this.plugins.colorPicker.rgb2hex(color) : "#ffffff";
            contextPicker._styleProperty = 'backgroundColor';
            contextPicker._colorList = contextHiliteColor.colorList;
            this.plugins.colorPicker.init.call(this, this.getSelectionNode(), null);
        },
        /**
        * @Override _colorPicker
        */
        onChangeInput: function (e) {
            this.plugins.colorPicker.setCurrentColor.call(this, e.target.value);
        },
        submit: function () {
            this.plugins.hiliteColor.applyColor.call(this, this.context.colorPicker._currentColor);
        },
        pickup: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.plugins.hiliteColor.applyColor.call(this, e.target.getAttribute('data-value'));
        },
        remove: function () {
            this.nodeChange(null, ['background-color'], ['span'], true);
            this.submenuOff();
        },
        applyColor: function (color) {
            if (!color)
                return;
            var newNode = this.util.createElement('SPAN');
            newNode.style.backgroundColor = color;
            this.nodeChange(newNode, ['background-color'], null, null);
            this.submenuOff();
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var horizontalRule = {
        name: 'horizontalRule',
        display: 'submenu',
        add: function (core, targetElement) {
            core.context.horizontalRule = {
                currentHR: null,
            };
            /** set submenu */
            var listDiv = this.setSubmenu(core);
            /** add event listeners */
            listDiv.querySelector('ul').addEventListener('click', this.horizontalRulePick.bind(core));
            /** append target button menu */
            core.initMenuTarget(this.name, targetElement, listDiv);
            /** empty memory */
            listDiv = null;
        },
        setSubmenu: function (core) {
            var lang = core.lang;
            var listDiv = core.util.createElement('DIV');
            listDiv.className = 'se-submenu se-list-layer se-list-line';
            listDiv.innerHTML = '' +
                '<div class="se-list-inner">' +
                '<ul class="se-list-basic">' +
                '<li>' +
                '<button type="button" class="se-btn-list btn_line" data-command="horizontalRule" data-value="solid" title="' + lang.toolbar.hr_solid + '">' +
                '<hr style="border-width: 1px 0 0; border-style: solid none none; border-color: black; border-image: initial; height: 1px;" />' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button type="button" class="se-btn-list btn_line" data-command="horizontalRule" data-value="dotted" title="' + lang.toolbar.hr_dotted + '">' +
                '<hr style="border-width: 1px 0 0; border-style: dotted none none; border-color: black; border-image: initial; height: 1px;" />' +
                '</button>' +
                '</li>' +
                '<li>' +
                '<button type="button" class="se-btn-list btn_line" data-command="horizontalRule" data-value="dashed" title="' + lang.toolbar.hr_dashed + '">' +
                '<hr style="border-width: 1px 0 0; border-style: dashed none none; border-color: black; border-image: initial; height: 1px;" />' +
                '</button>' +
                '</li>' +
                '</ul>' +
                '</div>';
            return listDiv;
        },
        active: function (element) {
            if (!element) {
                if (this.util.hasClass(this.context.horizontalRule.currentHR, 'on')) {
                    this.controllersOff();
                }
            }
            else if (/HR/i.test(element.nodeName)) {
                this.context.horizontalRule.currentHR = element;
                if (!this.util.hasClass(element, 'on')) {
                    this.util.addClass(element, 'on');
                    this.controllersOn('hr', this.util.removeClass.bind(this.util, element, 'on'));
                }
                return true;
            }
            return false;
        },
        appendHr: function (className) {
            var oHr = this.util.createElement('HR');
            oHr.className = className;
            this.focus();
            return this.insertComponent(oHr, false, true, false);
        },
        horizontalRulePick: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var target = e.target;
            var value = null;
            while (!value && !/UL/i.test(target.tagName)) {
                value = target.getAttribute('data-value');
                target = target.parentNode;
            }
            if (!value)
                return;
            var oNode = this.plugins.horizontalRule.appendHr.call(this, '__se__' + value);
            if (oNode) {
                this.setRange(oNode, 0, oNode, 0);
                this.submenuOff();
            }
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var list = {
        name: 'list',
        display: 'submenu',
        add: function (core, targetElement) {
            var context = core.context;
            context.list = {
                targetButton: targetElement,
                _list: null,
                currentList: '',
                icons: {
                    bullets: core.icons.list_bullets,
                    number: core.icons.list_number
                }
            };
            /** set submenu */
            var listDiv = this.setSubmenu(core);
            var listUl = listDiv.querySelector('ul');
            /** add event listeners */
            listUl.addEventListener('click', this.pickup.bind(core));
            context.list._list = listUl.querySelectorAll('li button');
            /** append target button menu */
            core.initMenuTarget(this.name, targetElement, listDiv);
            /** empty memory */
            listDiv = null, listUl = null;
        },
        setSubmenu: function (core) {
            var lang = core.lang;
            var listDiv = core.util.createElement('DIV');
            listDiv.className = 'se-submenu se-list-layer';
            listDiv.innerHTML = '' +
                '<div class="se-list-inner">' +
                '<ul class="se-list-basic">' +
                '<li><button type="button" class="se-btn-list se-tooltip" data-command="OL" title="' + lang.toolbar.orderList + '">' +
                core.icons.list_number +
                '</button></li>' +
                '<li><button type="button" class="se-btn-list se-tooltip" data-command="UL" title="' + lang.toolbar.unorderList + '">' +
                core.icons.list_bullets +
                '</button></li>' +
                '</ul>' +
                '</div>';
            return listDiv;
        },
        /**
        * @Override core
        */
        active: function (element) {
            var button = this.context.list.targetButton;
            var icon = button.firstElementChild;
            var util = this.util;
            if (!element) {
                button.removeAttribute('data-focus');
                util.changeElement(icon, this.context.list.icons.number);
                util.removeClass(button, 'active');
            }
            else if (util.isList(element)) {
                var nodeName = element.nodeName;
                button.setAttribute('data-focus', nodeName);
                util.addClass(button, 'active');
                if (/UL/i.test(nodeName)) {
                    util.changeElement(icon, this.context.list.icons.bullets);
                }
                else {
                    util.changeElement(icon, this.context.list.icons.number);
                }
                return true;
            }
            return false;
        },
        /**
        * @Override submenu
        */
        on: function () {
            var listContext = this.context.list;
            var list = listContext._list;
            var currentList = listContext.targetButton.getAttribute('data-focus') || '';
            if (currentList !== listContext.currentList) {
                for (var i = 0, len = list.length; i < len; i++) {
                    if (currentList === list[i].getAttribute('data-command')) {
                        this.util.addClass(list[i], 'active');
                    }
                    else {
                        this.util.removeClass(list[i], 'active');
                    }
                }
                listContext.currentList = currentList;
            }
        },
        editList: function (command, selectedCells, detach) {
            var range = this.getRange();
            var selectedFormats = !selectedCells ? this.getSelectedElementsAndComponents(false) : selectedCells;
            if (selectedFormats.length === 0) {
                if (selectedCells)
                    return;
                range = this.getRange_addLine(range, null);
                selectedFormats = this.getSelectedElementsAndComponents(false);
                if (selectedFormats.length === 0)
                    return;
            }
            var util = this.util;
            util.sortByDepth(selectedFormats, true);
            // merge
            var firstSel = selectedFormats[0];
            var lastSel = selectedFormats[selectedFormats.length - 1];
            var topEl = (util.isListCell(firstSel) || util.isComponent(firstSel)) && !firstSel.previousElementSibling ? firstSel.parentNode.previousElementSibling : firstSel.previousElementSibling;
            var bottomEl = (util.isListCell(lastSel) || util.isComponent(lastSel)) && !lastSel.nextElementSibling ? lastSel.parentNode.nextElementSibling : lastSel.nextElementSibling;
            var originRange = {
                sc: range.startContainer,
                so: (range.startContainer === range.endContainer && util.onlyZeroWidthSpace(range.startContainer) && range.startOffset === 0 && range.endOffset === 1) ? range.endOffset : range.startOffset,
                ec: range.endContainer,
                eo: range.endOffset
            };
            var isRemove = true;
            var _loop_1 = function (i, len) {
                if (!util.isList(util.getRangeFormatElement(selectedFormats[i], function (current) {
                    return this.getRangeFormatElement(current) && current !== selectedFormats[i];
                }.bind(util)))) {
                    isRemove = false;
                    return "break";
                }
            };
            for (var i = 0, len = selectedFormats.length; i < len; i++) {
                var state_1 = _loop_1(i, len);
                if (state_1 === "break")
                    break;
            }
            if (isRemove && (!topEl || (firstSel.tagName !== topEl.tagName || command !== topEl.tagName.toUpperCase())) && (!bottomEl || (lastSel.tagName !== bottomEl.tagName || command !== bottomEl.tagName.toUpperCase()))) {
                if (detach) {
                    for (var i = 0, len = selectedFormats.length; i < len; i++) {
                        for (var j = i - 1; j >= 0; j--) {
                            if (selectedFormats[j].contains(selectedFormats[i])) {
                                selectedFormats.splice(i, 1);
                                i--;
                                len--;
                                break;
                            }
                        }
                    }
                }
                var currentFormat = util.getRangeFormatElement(firstSel);
                var cancel = currentFormat && currentFormat.tagName === command;
                var rangeArr = void 0, tempList = void 0;
                var passComponent = function (current) {
                    return !this.isComponent(current);
                }.bind(util);
                if (!cancel)
                    tempList = util.createElement(command);
                for (var i = 0, len = selectedFormats.length, r = void 0, o = void 0; i < len; i++) {
                    o = util.getRangeFormatElement(selectedFormats[i], passComponent);
                    if (!o || !util.isList(o))
                        continue;
                    if (!r) {
                        r = o;
                        rangeArr = { r: r, f: [util.getParentElement(selectedFormats[i], 'LI')] };
                    }
                    else {
                        if (r !== o) {
                            if (detach && util.isListCell(o.parentNode)) {
                                this.plugins.list._detachNested.call(this, rangeArr.f);
                            }
                            else {
                                this.detachRangeFormatElement(rangeArr.f[0].parentNode, rangeArr.f, tempList, false, true);
                            }
                            o = selectedFormats[i].parentNode;
                            if (!cancel)
                                tempList = util.createElement(command);
                            r = o;
                            rangeArr = { r: r, f: [util.getParentElement(selectedFormats[i], 'LI')] };
                        }
                        else {
                            rangeArr.f.push(util.getParentElement(selectedFormats[i], 'LI'));
                        }
                    }
                    if (i === len - 1) {
                        if (detach && util.isListCell(o.parentNode)) {
                            this.plugins.list._detachNested.call(this, rangeArr.f);
                        }
                        else {
                            this.detachRangeFormatElement(rangeArr.f[0].parentNode, rangeArr.f, tempList, false, true);
                        }
                    }
                }
            }
            else {
                var topElParent = topEl ? topEl.parentNode : topEl;
                var bottomElParent = bottomEl ? bottomEl.parentNode : bottomEl;
                topEl = topElParent && !util.isWysiwygDiv(topElParent) && topElParent.nodeName === command ? topElParent : topEl;
                bottomEl = bottomElParent && !util.isWysiwygDiv(bottomElParent) && bottomElParent.nodeName === command ? bottomElParent : bottomEl;
                var mergeTop = topEl && topEl.tagName === command;
                var mergeBottom = bottomEl && bottomEl.tagName === command;
                var list = mergeTop ? topEl : util.createElement(command);
                var firstList = null;
                var lastList = null;
                var topNumber = null;
                var bottomNumber = null;
                var passComponent = function (current) {
                    return !this.isComponent(current) && !this.isList(current);
                }.bind(util);
                for (var i = 0, len = selectedFormats.length, newCell = void 0, fTag = void 0, isCell = void 0, next = void 0, originParent = void 0, nextParent = void 0, parentTag = void 0, siblingTag = void 0, rangeTag = void 0; i < len; i++) {
                    fTag = selectedFormats[i];
                    if (fTag.childNodes.length === 0 && !util._isIgnoreNodeChange(fTag)) {
                        util.removeItem(fTag);
                        continue;
                    }
                    next = selectedFormats[i + 1];
                    originParent = fTag.parentNode;
                    nextParent = next ? next.parentNode : null;
                    isCell = util.isListCell(fTag);
                    rangeTag = util.isRangeFormatElement(originParent) ? originParent : null;
                    parentTag = isCell && !util.isWysiwygDiv(originParent) ? originParent.parentNode : originParent;
                    siblingTag = isCell && !util.isWysiwygDiv(originParent) ? (!next || util.isListCell(parentTag)) ? originParent : originParent.nextSibling : fTag.nextSibling;
                    newCell = util.createElement('LI');
                    util.copyFormatAttributes(newCell, fTag);
                    if (util.isComponent(fTag)) {
                        var isHR = /^HR$/i.test(fTag.nodeName);
                        if (!isHR)
                            newCell.innerHTML = '<br>';
                        newCell.innerHTML += fTag.outerHTML;
                        if (isHR)
                            newCell.innerHTML += '<br>';
                    }
                    else {
                        var fChildren = fTag.childNodes;
                        while (fChildren[0]) {
                            newCell.appendChild(fChildren[0]);
                        }
                    }
                    list.appendChild(newCell);
                    if (!next)
                        lastList = list;
                    if (!next || parentTag !== nextParent || util.isRangeFormatElement(siblingTag)) {
                        if (!firstList)
                            firstList = list;
                        if ((!mergeTop || !next || parentTag !== nextParent) && !(next && util.isList(nextParent) && nextParent === originParent)) {
                            if (list.parentNode !== parentTag)
                                parentTag.insertBefore(list, siblingTag);
                        }
                    }
                    util.removeItem(fTag);
                    if (mergeTop && topNumber === null)
                        topNumber = list.children.length - 1;
                    if (next && (util.getRangeFormatElement(nextParent, passComponent) !== util.getRangeFormatElement(originParent, passComponent) || (util.isList(nextParent) && util.isList(originParent) && util.getElementDepth(nextParent) !== util.getElementDepth(originParent)))) {
                        list = util.createElement(command);
                    }
                    if (rangeTag && rangeTag.children.length === 0)
                        util.removeItem(rangeTag);
                }
                if (topNumber) {
                    firstList = firstList.children[topNumber];
                }
                if (mergeBottom) {
                    bottomNumber = list.children.length - 1;
                    list.innerHTML += bottomEl.innerHTML;
                    lastList = list.children[bottomNumber];
                    util.removeItem(bottomEl);
                }
            }
            this.effectNode = null;
            return originRange;
        },
        _detachNested: function (cells) {
            var first = cells[0];
            var last = cells[cells.length - 1];
            var next = last.nextElementSibling;
            var originList = first.parentNode;
            var sibling = originList.parentNode.nextElementSibling;
            var parentNode = originList.parentNode.parentNode;
            for (var c = 0, cLen = cells.length; c < cLen; c++) {
                parentNode.insertBefore(cells[c], sibling);
            }
            if (next && originList.children.length > 0) {
                var newList = originList.cloneNode(false);
                var children = originList.childNodes;
                var index = this.util.getPositionIndex(next);
                while (children[index]) {
                    newList.appendChild(children[index]);
                }
                last.appendChild(newList);
            }
            if (originList.children.length === 0)
                this.util.removeItem(originList);
            this.util.mergeSameTags(parentNode);
            var edge = this.util.getEdgeChildNodes(first, last);
            return {
                cc: first.parentNode,
                sc: edge.sc,
                ec: edge.ec
            };
        },
        editInsideList: function (remove, selectedCells) {
            selectedCells = !selectedCells ? this.getSelectedElements().filter(function (el) { return this.isListCell(el); }.bind(this.util)) : selectedCells;
            var cellsLen = selectedCells.length;
            if (cellsLen === 0 || (!remove && (!this.util.isListCell(selectedCells[0].previousElementSibling) && !this.util.isListCell(selectedCells[cellsLen - 1].nextElementSibling)))) {
                return {
                    sc: selectedCells[0],
                    so: 0,
                    ec: selectedCells[cellsLen - 1],
                    eo: 1
                };
            }
            var originList = selectedCells[0].parentNode;
            var lastCell = selectedCells[cellsLen - 1];
            var range = null;
            if (remove) {
                if (originList !== lastCell.parentNode && this.util.isList(lastCell.parentNode.parentNode) && lastCell.nextElementSibling) {
                    lastCell = lastCell.nextElementSibling;
                    while (lastCell) {
                        selectedCells.push(lastCell);
                        lastCell = lastCell.nextElementSibling;
                    }
                }
                range = this.plugins.list.editList.call(this, originList.nodeName.toUpperCase(), selectedCells, true);
            }
            else {
                var innerList = this.util.createElement(originList.nodeName);
                var prev = selectedCells[0].previousElementSibling;
                var next = lastCell.nextElementSibling;
                var nodePath = { s: null, e: null, sl: originList, el: originList };
                for (var i = 0, len = cellsLen, c = void 0; i < len; i++) {
                    c = selectedCells[i];
                    if (c.parentNode !== originList) {
                        this.plugins.list._insiedList.call(this, originList, innerList, prev, next, nodePath);
                        originList = c.parentNode;
                        innerList = this.util.createElement(originList.nodeName);
                    }
                    prev = c.previousElementSibling;
                    next = c.nextElementSibling;
                    innerList.appendChild(c);
                }
                this.plugins.list._insiedList.call(this, originList, innerList, prev, next, nodePath);
                var sc = this.util.getNodeFromPath(nodePath.s, nodePath.sl);
                var ec = this.util.getNodeFromPath(nodePath.e, nodePath.el);
                range = {
                    sc: sc,
                    so: 0,
                    ec: ec,
                    eo: ec.textContent.length
                };
            }
            return range;
        },
        _insiedList: function (originList, innerList, prev, next, nodePath) {
            var insertPrev = false;
            if (prev && innerList.tagName === prev.tagName) {
                var children = innerList.children;
                while (children[0]) {
                    prev.appendChild(children[0]);
                }
                innerList = prev;
                insertPrev = true;
            }
            if (next && innerList.tagName === next.tagName) {
                var children = next.children;
                while (children[0]) {
                    innerList.appendChild(children[0]);
                }
                var temp = next.nextElementSibling;
                next.parentNode.removeChild(next);
                next = temp;
            }
            if (!insertPrev) {
                if (this.util.isListCell(prev)) {
                    originList = prev;
                    next = null;
                }
                originList.insertBefore(innerList, next);
                if (!nodePath.s) {
                    nodePath.s = this.util.getNodePath(innerList.firstElementChild.firstChild, originList, null);
                    nodePath.sl = originList;
                }
                var slPath = originList.contains(nodePath.sl) ? this.util.getNodePath(nodePath.sl, originList) : null;
                nodePath.e = this.util.getNodePath(innerList.lastElementChild.firstChild, originList, null);
                nodePath.el = originList;
                this.util.mergeSameTags(originList, [nodePath.s, nodePath.e, slPath], false);
                this.util.mergeNestedTags(originList);
                if (slPath)
                    nodePath.sl = this.util.getNodeFromPath(slPath, originList);
            }
            return innerList;
        },
        pickup: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var target = e.target;
            var command = '';
            while (!command && !/^UL$/i.test(target.tagName)) {
                command = target.getAttribute('data-command');
                target = target.parentNode;
            }
            if (!command)
                return;
            var range = this.plugins.list.editList.call(this, command, null, false);
            if (range)
                this.setRange(range.sc, range.so, range.ec, range.eo);
            this.submenuOff();
            // history stack
            this.history.push(false);
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var table = {
        name: 'table',
        display: 'submenu',
        add: function (core, targetElement) {
            var context = core.context;
            var contextTable = context.table = {
                _element: null,
                _tdElement: null,
                _trElement: null,
                _trElements: null,
                _tableXY: [],
                _maxWidth: true,
                _fixedColumn: false,
                _rtl: core.options.rtl,
                cellControllerTop: core.options.tableCellControllerPosition === 'top',
                resizeText: null,
                headerButton: null,
                mergeButton: null,
                splitButton: null,
                splitMenu: null,
                maxText: core.lang.controller.maxSize,
                minText: core.lang.controller.minSize,
                _physical_cellCnt: 0,
                _logical_cellCnt: 0,
                _rowCnt: 0,
                _rowIndex: 0,
                _physical_cellIndex: 0,
                _logical_cellIndex: 0,
                _current_colSpan: 0,
                _current_rowSpan: 0,
                icons: {
                    expansion: core.icons.expansion,
                    reduction: core.icons.reduction
                }
            };
            /** set submenu */
            var listDiv = this.setSubmenu(core);
            var tablePicker = listDiv.querySelector('.se-controller-table-picker');
            contextTable.tableHighlight = listDiv.querySelector('.se-table-size-highlighted');
            contextTable.tableUnHighlight = listDiv.querySelector('.se-table-size-unhighlighted');
            contextTable.tableDisplay = listDiv.querySelector('.se-table-size-display');
            if (core.options.rtl)
                contextTable.tableHighlight.style.left = (10 * 18 - 13) + 'px';
            /** set table controller */
            var tableController = this.setController_table(core);
            contextTable.tableController = tableController;
            contextTable.resizeButton = tableController.querySelector('._se_table_resize');
            contextTable.resizeText = tableController.querySelector('._se_table_resize > span > span');
            contextTable.columnFixedButton = tableController.querySelector('._se_table_fixed_column');
            contextTable.headerButton = tableController.querySelector('._se_table_header');
            /** set resizing */
            var resizeDiv = this.setController_tableEditor(core, contextTable.cellControllerTop);
            contextTable.resizeDiv = resizeDiv;
            contextTable.splitMenu = resizeDiv.querySelector('.se-btn-group-sub');
            contextTable.mergeButton = resizeDiv.querySelector('._se_table_merge_button');
            contextTable.splitButton = resizeDiv.querySelector('._se_table_split_button');
            contextTable.insertRowAboveButton = resizeDiv.querySelector('._se_table_insert_row_a');
            contextTable.insertRowBelowButton = resizeDiv.querySelector('._se_table_insert_row_b');
            /** add event listeners */
            tablePicker.addEventListener('mousemove', this.onMouseMove_tablePicker.bind(core, contextTable));
            tablePicker.addEventListener('click', this.appendTable.bind(core));
            resizeDiv.addEventListener('click', this.onClick_tableController.bind(core));
            tableController.addEventListener('click', this.onClick_tableController.bind(core));
            /** append target button menu */
            core.initMenuTarget(this.name, targetElement, listDiv);
            /** append controller */
            context.element.relative.appendChild(resizeDiv);
            context.element.relative.appendChild(tableController);
            /** empty memory */
            listDiv = null, tablePicker = null, resizeDiv = null, tableController = null, contextTable = null;
        },
        setSubmenu: function (core) {
            var listDiv = core.util.createElement('DIV');
            listDiv.className = 'se-submenu se-selector-table';
            listDiv.innerHTML = '' +
                '<div class="se-table-size">' +
                '<div class="se-table-size-picker se-controller-table-picker"></div>' +
                '<div class="se-table-size-highlighted"></div>' +
                '<div class="se-table-size-unhighlighted"></div>' +
                '</div>' +
                '<div class="se-table-size-display">1 x 1</div>';
            return listDiv;
        },
        setController_table: function (core) {
            var lang = core.lang;
            var icons = core.icons;
            var tableResize = core.util.createElement('DIV');
            tableResize.className = 'se-controller se-controller-table';
            tableResize.innerHTML = '' +
                '<div>' +
                '<div class="se-btn-group">' +
                '<button type="button" data-command="resize" class="se-btn se-tooltip _se_table_resize">' +
                icons.expansion +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.maxSize + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="layout" class="se-btn se-tooltip _se_table_fixed_column">' +
                icons.fixed_column_width +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.fixedColumnWidth + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="header" class="se-btn se-tooltip _se_table_header">' +
                icons.table_header +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.tableHeader + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="remove" class="se-btn se-tooltip">' +
                icons.delete +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.remove + '</span></span>' +
                '</button>' +
                '</div>' +
                '</div>';
            return tableResize;
        },
        setController_tableEditor: function (core, cellControllerTop) {
            var lang = core.lang;
            var icons = core.icons;
            var tableResize = core.util.createElement('DIV');
            tableResize.className = 'se-controller se-controller-table-cell';
            tableResize.innerHTML = (cellControllerTop ? '' : '<div class="se-arrow se-arrow-up"></div>') +
                '<div class="se-btn-group">' +
                '<button type="button" data-command="insert" data-value="row" data-option="up" class="se-btn se-tooltip _se_table_insert_row_a">' +
                icons.insert_row_above +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.insertRowAbove + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="insert" data-value="row" data-option="down" class="se-btn se-tooltip _se_table_insert_row_b">' +
                icons.insert_row_below +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.insertRowBelow + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="delete" data-value="row" class="se-btn se-tooltip">' +
                icons.delete_row +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.deleteRow + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="merge" class="_se_table_merge_button se-btn se-tooltip" disabled>' +
                icons.merge_cell +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.mergeCells + '</span></span>' +
                '</button>' +
                '</div>' +
                '<div class="se-btn-group" style="padding-top: 0;">' +
                '<button type="button" data-command="insert" data-value="cell" data-option="left" class="se-btn se-tooltip">' +
                icons.insert_column_left +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.insertColumnBefore + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="insert" data-value="cell" data-option="right" class="se-btn se-tooltip">' +
                icons.insert_column_right +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.insertColumnAfter + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="delete" data-value="cell" class="se-btn se-tooltip">' +
                icons.delete_column +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.deleteColumn + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="onsplit" class="_se_table_split_button se-btn se-tooltip">' +
                icons.split_cell +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.splitCells + '</span></span>' +
                '</button>' +
                '<div class="se-btn-group-sub sun-editor-common se-list-layer se-table-split">' +
                '<div class="se-list-inner">' +
                '<ul class="se-list-basic">' +
                '<li class="se-btn-list" data-command="split" data-value="vertical" style="line-height:32px;" title="' + lang.controller.VerticalSplit + '">' +
                lang.controller.VerticalSplit + '</li>' +
                '<li class="se-btn-list" data-command="split" data-value="horizontal" style="line-height:32px;" title="' + lang.controller.HorizontalSplit + '">' +
                lang.controller.HorizontalSplit + '</li>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>';
            return tableResize;
        },
        appendTable: function () {
            var oTable = this.util.createElement('TABLE');
            var createCells = this.plugins.table.createCells;
            var x = this.context.table._tableXY[0];
            var y = this.context.table._tableXY[1];
            var tableHTML = '<tbody>';
            while (y > 0) {
                tableHTML += '<tr>' + createCells.call(this, 'td', x) + '</tr>';
                --y;
            }
            tableHTML += '</tbody>';
            oTable.innerHTML = tableHTML;
            var changed = this.insertComponent(oTable, false, true, false);
            if (changed) {
                var firstTd = oTable.querySelector('td div');
                this.setRange(firstTd, 0, firstTd, 0);
                this.plugins.table.reset_table_picker.call(this);
            }
        },
        createCells: function (nodeName, cnt, returnElement) {
            nodeName = nodeName.toLowerCase();
            if (!returnElement) {
                var cellsHTML = '';
                while (cnt > 0) {
                    cellsHTML += '<' + nodeName + '><div><br></div></' + nodeName + '>';
                    cnt--;
                }
                return cellsHTML;
            }
            else {
                var cell = this.util.createElement(nodeName);
                cell.innerHTML = '<div><br></div>';
                return cell;
            }
        },
        onMouseMove_tablePicker: function (contextTable, e) {
            e.stopPropagation();
            var x = this._w.Math.ceil(e.offsetX / 18);
            var y = this._w.Math.ceil(e.offsetY / 18);
            x = x < 1 ? 1 : x;
            y = y < 1 ? 1 : y;
            if (contextTable._rtl) {
                contextTable.tableHighlight.style.left = (x * 18 - 13) + 'px';
                x = 11 - x;
            }
            contextTable.tableHighlight.style.width = x + 'em';
            contextTable.tableHighlight.style.height = y + 'em';
            // let x_u = x < 5 ? 5 : (x > 9 ? 10 : x + 1);
            // let y_u = y < 5 ? 5 : (y > 9 ? 10 : y + 1);
            // contextTable.tableUnHighlight.style.width = x_u + 'em';
            // contextTable.tableUnHighlight.style.height = y_u + 'em';
            this.util.changeTxt(contextTable.tableDisplay, x + ' x ' + y);
            contextTable._tableXY = [x, y];
        },
        reset_table_picker: function () {
            if (!this.context.table.tableHighlight)
                return;
            var highlight = this.context.table.tableHighlight.style;
            var unHighlight = this.context.table.tableUnHighlight.style;
            highlight.width = '1em';
            highlight.height = '1em';
            unHighlight.width = '10em';
            unHighlight.height = '10em';
            this.util.changeTxt(this.context.table.tableDisplay, '1 x 1');
            this.submenuOff();
        },
        init: function () {
            var contextTable = this.context.table;
            var tablePlugin = this.plugins.table;
            tablePlugin._removeEvents.call(this);
            if (tablePlugin._selectedTable) {
                var selectedCells = tablePlugin._selectedTable.querySelectorAll('.se-table-selected-cell');
                for (var i = 0, len = selectedCells.length; i < len; i++) {
                    this.util.removeClass(selectedCells[i], 'se-table-selected-cell');
                }
            }
            tablePlugin._toggleEditor.call(this, true);
            contextTable._element = null;
            contextTable._tdElement = null;
            contextTable._trElement = null;
            contextTable._trElements = null;
            contextTable._tableXY = [];
            contextTable._maxWidth = true;
            contextTable._fixedColumn = false;
            contextTable._physical_cellCnt = 0;
            contextTable._logical_cellCnt = 0;
            contextTable._rowCnt = 0;
            contextTable._rowIndex = 0;
            contextTable._physical_cellIndex = 0;
            contextTable._logical_cellIndex = 0;
            contextTable._current_colSpan = 0;
            contextTable._current_rowSpan = 0;
            tablePlugin._shift = false;
            tablePlugin._selectedCells = null;
            tablePlugin._selectedTable = null;
            tablePlugin._ref = null;
            tablePlugin._fixedCell = null;
            tablePlugin._selectedCell = null;
            tablePlugin._fixedCellName = null;
        },
        /** table edit controller */
        call_controller_tableEdit: function (tdElement) {
            var tablePlugin = this.plugins.table;
            var contextTable = this.context.table;
            if (!this.getSelection().isCollapsed && !tablePlugin._selectedCell) {
                this.controllersOff();
                this.util.removeClass(tdElement, 'se-table-selected-cell');
                return;
            }
            var tableElement = contextTable._element || this.plugins.table._selectedTable || this.util.getParentElement(tdElement, 'TABLE');
            contextTable._maxWidth = this.util.hasClass(tableElement, 'se-table-size-100') || tableElement.style.width === '100%' || (!tableElement.style.width && !this.util.hasClass(tableElement, 'se-table-size-auto'));
            contextTable._fixedColumn = this.util.hasClass(tableElement, 'se-table-layout-fixed') || tableElement.style.tableLayout === 'fixed';
            tablePlugin.setTableStyle.call(this, contextTable._maxWidth ? 'width|column' : 'width');
            tablePlugin.setPositionControllerTop.call(this, tableElement);
            tablePlugin.setPositionControllerDiv.call(this, tdElement, tablePlugin._shift);
            if (!tablePlugin._shift)
                this.controllersOn(contextTable.resizeDiv, contextTable.tableController, tablePlugin.init.bind(this), tdElement, 'table');
        },
        setPositionControllerTop: function (tableElement) {
            this.setControllerPosition(this.context.table.tableController, tableElement, 'top', { left: 0, top: 0 });
        },
        setPositionControllerDiv: function (tdElement, reset) {
            var contextTable = this.context.table;
            var resizeDiv = contextTable.resizeDiv;
            this.plugins.table.setCellInfo.call(this, tdElement, reset);
            if (contextTable.cellControllerTop) {
                this.setControllerPosition(resizeDiv, contextTable._element, 'top', { left: contextTable.tableController.offsetWidth, top: 0 });
            }
            else {
                this.setControllerPosition(resizeDiv, tdElement, 'bottom', { left: 0, top: 0 });
            }
        },
        setCellInfo: function (tdElement, reset) {
            var contextTable = this.context.table;
            var table = contextTable._element = this.plugins.table._selectedTable || this.util.getParentElement(tdElement, 'TABLE');
            if (/THEAD/i.test(table.firstElementChild.nodeName)) {
                this.util.addClass(contextTable.headerButton, 'active');
            }
            else {
                this.util.removeClass(contextTable.headerButton, 'active');
            }
            if (reset || contextTable._physical_cellCnt === 0) {
                if (contextTable._tdElement !== tdElement) {
                    contextTable._tdElement = tdElement;
                    contextTable._trElement = tdElement.parentNode;
                }
                var rows = contextTable._trElements = table.rows;
                var cellIndex = tdElement.cellIndex;
                var cellCnt = 0;
                for (var i = 0, cells = rows[0].cells, len = rows[0].cells.length; i < len; i++) {
                    cellCnt += cells[i].colSpan;
                }
                // row cnt, row index
                var rowIndex = contextTable._rowIndex = contextTable._trElement.rowIndex;
                contextTable._rowCnt = rows.length;
                // cell cnt, physical cell index
                contextTable._physical_cellCnt = contextTable._trElement.cells.length;
                contextTable._logical_cellCnt = cellCnt;
                contextTable._physical_cellIndex = cellIndex;
                // span
                contextTable._current_colSpan = contextTable._tdElement.colSpan - 1;
                contextTable._current_rowSpan - contextTable._trElement.cells[cellIndex].rowSpan - 1;
                // find logcal cell index
                var rowSpanArr = [];
                var spanIndex = [];
                for (var i = 0, cells = void 0, colSpan = void 0; i <= rowIndex; i++) {
                    cells = rows[i].cells;
                    colSpan = 0;
                    for (var c = 0, cLen = cells.length, cell = void 0, cs = void 0, rs = void 0, logcalIndex = void 0; c < cLen; c++) {
                        cell = cells[c];
                        cs = cell.colSpan - 1;
                        rs = cell.rowSpan - 1;
                        logcalIndex = c + colSpan;
                        if (spanIndex.length > 0) {
                            for (var r = 0, arr = void 0; r < spanIndex.length; r++) {
                                arr = spanIndex[r];
                                if (arr.row > i)
                                    continue;
                                if (logcalIndex >= arr.index) {
                                    colSpan += arr.cs;
                                    logcalIndex += arr.cs;
                                    arr.rs -= 1;
                                    arr.row = i + 1;
                                    if (arr.rs < 1) {
                                        spanIndex.splice(r, 1);
                                        r--;
                                    }
                                }
                                else if (c === cLen - 1) {
                                    arr.rs -= 1;
                                    arr.row = i + 1;
                                    if (arr.rs < 1) {
                                        spanIndex.splice(r, 1);
                                        r--;
                                    }
                                }
                            }
                        }
                        // logcal cell index
                        if (i === rowIndex && c === cellIndex) {
                            contextTable._logical_cellIndex = logcalIndex;
                            break;
                        }
                        if (rs > 0) {
                            rowSpanArr.push({
                                index: logcalIndex,
                                cs: cs + 1,
                                rs: rs,
                                row: -1
                            });
                        }
                        colSpan += cs;
                    }
                    spanIndex = spanIndex.concat(rowSpanArr).sort(function (a, b) { return a.index - b.index; });
                    rowSpanArr = [];
                }
                rowSpanArr = null;
                spanIndex = null;
            }
        },
        editTable: function (type, option) {
            var tablePlugin = this.plugins.table;
            var contextTable = this.context.table;
            var table = contextTable._element;
            var isRow = type === 'row';
            if (isRow) {
                var tableAttr = contextTable._trElement.parentNode;
                if (/^THEAD$/i.test(tableAttr.nodeName)) {
                    if (option === 'up') {
                        return;
                    }
                    else if (!tableAttr.nextElementSibling || !/^TBODY$/i.test(tableAttr.nextElementSibling.nodeName)) {
                        table.innerHTML += '<tbody><tr>' + tablePlugin.createCells.call(this, 'td', contextTable._logical_cellCnt, false) + '</tr></tbody>';
                        return;
                    }
                }
            }
            // multi
            if (tablePlugin._ref) {
                var positionCell = contextTable._tdElement;
                var selectedCells = tablePlugin._selectedCells;
                // multi - row
                if (isRow) {
                    // remove row
                    if (!option) {
                        var row = selectedCells[0].parentNode;
                        var removeCells = [selectedCells[0]];
                        for (var i = 1, len = selectedCells.length, cell = void 0; i < len; i++) {
                            cell = selectedCells[i];
                            if (row !== cell.parentNode) {
                                removeCells.push(cell);
                                row = cell.parentNode;
                            }
                        }
                        for (var i = 0, len = removeCells.length; i < len; i++) {
                            tablePlugin.setCellInfo.call(this, removeCells[i], true);
                            tablePlugin.editRow.call(this, option);
                        }
                    }
                    else { // edit row
                        tablePlugin.setCellInfo.call(this, option === 'up' ? selectedCells[0] : selectedCells[selectedCells.length - 1], true);
                        tablePlugin.editRow.call(this, option, positionCell);
                    }
                }
                else { // multi - cell
                    var firstRow = selectedCells[0].parentNode;
                    // remove cell
                    if (!option) {
                        var removeCells = [selectedCells[0]];
                        for (var i = 1, len = selectedCells.length, cell = void 0; i < len; i++) {
                            cell = selectedCells[i];
                            if (firstRow === cell.parentNode) {
                                removeCells.push(cell);
                            }
                            else {
                                break;
                            }
                        }
                        for (var i = 0, len = removeCells.length; i < len; i++) {
                            tablePlugin.setCellInfo.call(this, removeCells[i], true);
                            tablePlugin.editCell.call(this, option);
                        }
                    }
                    else { // edit cell
                        var rightCell = null;
                        for (var i = 0, len = selectedCells.length - 1; i < len; i++) {
                            if (firstRow !== selectedCells[i + 1].parentNode) {
                                rightCell = selectedCells[i];
                                break;
                            }
                        }
                        tablePlugin.setCellInfo.call(this, option === 'left' ? selectedCells[0] : rightCell || selectedCells[0], true);
                        tablePlugin.editCell.call(this, option, positionCell);
                    }
                }
                if (!option)
                    tablePlugin.init.call(this);
            } // one
            else {
                tablePlugin[isRow ? 'editRow' : 'editCell'].call(this, option);
            }
            // after remove
            if (!option) {
                var children = table.children;
                for (var i = 0; i < children.length; i++) {
                    if (children[i].children.length === 0) {
                        this.util.removeItem(children[i]);
                        i--;
                    }
                }
                if (table.children.length === 0)
                    this.util.removeItem(table);
            }
        },
        editRow: function (option, positionResetElement) {
            var contextTable = this.context.table;
            var remove = !option;
            var up = option === 'up';
            var originRowIndex = contextTable._rowIndex;
            var rowIndex = remove || up ? originRowIndex : originRowIndex + contextTable._current_rowSpan + 1;
            var sign = remove ? -1 : 1;
            var rows = contextTable._trElements;
            var cellCnt = contextTable._logical_cellCnt;
            for (var i = 0, len = originRowIndex + (remove ? -1 : 0), cell = void 0; i <= len; i++) {
                cell = rows[i].cells;
                if (cell.length === 0)
                    return;
                for (var c = 0, cLen = cell.length, rs = void 0, cs = void 0; c < cLen; c++) {
                    rs = cell[c].rowSpan;
                    cs = cell[c].colSpan;
                    if (rs < 2 && cs < 2)
                        continue;
                    if (rs + i > rowIndex && rowIndex > i) {
                        cell[c].rowSpan = rs + sign;
                        cellCnt -= cs;
                    }
                }
            }
            if (remove) {
                var next = rows[originRowIndex + 1];
                if (next) {
                    var spanCells = [];
                    var cells = rows[originRowIndex].cells;
                    var colSpan = 0;
                    for (var i = 0, len = cells.length, cell = void 0, logcalIndex = void 0; i < len; i++) {
                        cell = cells[i];
                        logcalIndex = i + colSpan;
                        colSpan += cell.colSpan - 1;
                        if (cell.rowSpan > 1) {
                            cell.rowSpan -= 1;
                            spanCells.push({ cell: cell.cloneNode(false), index: logcalIndex });
                        }
                    }
                    if (spanCells.length > 0) {
                        var spanCell = spanCells.shift();
                        cells = next.cells;
                        colSpan = 0;
                        for (var i = 0, len = cells.length, cell = void 0, logcalIndex = void 0; i < len; i++) {
                            cell = cells[i];
                            logcalIndex = i + colSpan;
                            colSpan += cell.colSpan - 1;
                            if (logcalIndex >= spanCell.index) {
                                i--, colSpan--;
                                colSpan += spanCell.cell.colSpan - 1;
                                next.insertBefore(spanCell.cell, cell);
                                spanCell = spanCells.shift();
                                if (!spanCell)
                                    break;
                            }
                        }
                        if (spanCell) {
                            next.appendChild(spanCell.cell);
                            for (var i = 0, len = spanCells.length; i < len; i++) {
                                next.appendChild(spanCells[i].cell);
                            }
                        }
                    }
                }
                contextTable._element.deleteRow(rowIndex);
            }
            else {
                var newRow = contextTable._element.insertRow(rowIndex);
                newRow.innerHTML = this.plugins.table.createCells.call(this, 'td', cellCnt, false);
            }
            if (!remove) {
                this.plugins.table.setPositionControllerDiv.call(this, positionResetElement || contextTable._tdElement, true);
            }
            else {
                this.controllersOff();
            }
        },
        editCell: function (option, positionResetElement) {
            var contextTable = this.context.table;
            var util = this.util;
            var remove = !option;
            var left = option === 'left';
            var colSpan = contextTable._current_colSpan;
            var cellIndex = remove || left ? contextTable._logical_cellIndex : contextTable._logical_cellIndex + colSpan + 1;
            var rows = contextTable._trElements;
            var rowSpanArr = [];
            var spanIndex = [];
            var passCell = 0;
            var removeCell = [];
            var removeSpanArr = [];
            for (var i = 0, len = contextTable._rowCnt, row = void 0, insertIndex = void 0, cells = void 0, newCell = void 0, applySpan = void 0, cellColSpan = void 0; i < len; i++) {
                row = rows[i];
                insertIndex = cellIndex;
                applySpan = false;
                cells = row.cells;
                cellColSpan = 0;
                for (var c = 0, cell = void 0, cLen = cells.length, rs = void 0, cs = void 0, removeIndex = void 0; c < cLen; c++) {
                    cell = cells[c];
                    if (!cell)
                        break;
                    rs = cell.rowSpan - 1;
                    cs = cell.colSpan - 1;
                    if (!remove) {
                        if (c >= insertIndex)
                            break;
                        if (cs > 0) {
                            if (passCell < 1 && cs + c >= insertIndex) {
                                cell.colSpan += 1;
                                insertIndex = null;
                                passCell = rs + 1;
                                break;
                            }
                            insertIndex -= cs;
                        }
                        if (!applySpan) {
                            for (var r = 0, arr = void 0; r < spanIndex.length; r++) {
                                arr = spanIndex[r];
                                insertIndex -= arr.cs;
                                arr.rs -= 1;
                                if (arr.rs < 1) {
                                    spanIndex.splice(r, 1);
                                    r--;
                                }
                            }
                            applySpan = true;
                        }
                    }
                    else {
                        removeIndex = c + cellColSpan;
                        if (spanIndex.length > 0) {
                            var lastCell = !cells[c + 1];
                            for (var r = 0, arr = void 0; r < spanIndex.length; r++) {
                                arr = spanIndex[r];
                                if (arr.row > i)
                                    continue;
                                if (removeIndex >= arr.index) {
                                    cellColSpan += arr.cs;
                                    removeIndex = c + cellColSpan;
                                    arr.rs -= 1;
                                    arr.row = i + 1;
                                    if (arr.rs < 1) {
                                        spanIndex.splice(r, 1);
                                        r--;
                                    }
                                }
                                else if (lastCell) {
                                    arr.rs -= 1;
                                    arr.row = i + 1;
                                    if (arr.rs < 1) {
                                        spanIndex.splice(r, 1);
                                        r--;
                                    }
                                }
                            }
                        }
                        if (rs > 0) {
                            rowSpanArr.push({
                                rs: rs,
                                cs: cs + 1,
                                index: removeIndex,
                                row: -1
                            });
                        }
                        if (removeIndex >= insertIndex && removeIndex + cs <= insertIndex + colSpan) {
                            removeCell.push(cell);
                        }
                        else if (removeIndex <= insertIndex + colSpan && removeIndex + cs >= insertIndex) {
                            cell.colSpan -= util.getOverlapRangeAtIndex(cellIndex, cellIndex + colSpan, removeIndex, removeIndex + cs);
                        }
                        else if (rs > 0 && (removeIndex < insertIndex || removeIndex + cs > insertIndex + colSpan)) {
                            removeSpanArr.push({
                                cell: cell,
                                i: i,
                                rs: i + rs
                            });
                        }
                        cellColSpan += cs;
                    }
                }
                spanIndex = spanIndex.concat(rowSpanArr).sort(function (a, b) { return a.index - b.index; });
                rowSpanArr = [];
                if (!remove) {
                    if (passCell > 0) {
                        passCell -= 1;
                        continue;
                    }
                    if (insertIndex !== null && cells.length > 0) {
                        newCell = this.plugins.table.createCells.call(this, cells[0].nodeName, 0, true);
                        newCell = row.insertBefore(newCell, cells[insertIndex]);
                    }
                }
            }
            if (remove) {
                var removeFirst = void 0, removeEnd = void 0;
                for (var r = 0, rLen = removeCell.length, row = void 0; r < rLen; r++) {
                    row = removeCell[r].parentNode;
                    util.removeItem(removeCell[r]);
                    if (row.cells.length === 0) {
                        if (!removeFirst)
                            removeFirst = util.getArrayIndex(rows, row);
                        removeEnd = util.getArrayIndex(rows, row);
                        util.removeItem(row);
                    }
                }
                for (var c = 0, cLen = removeSpanArr.length, rowSpanCell = void 0; c < cLen; c++) {
                    rowSpanCell = removeSpanArr[c];
                    rowSpanCell.cell.rowSpan = util.getOverlapRangeAtIndex(removeFirst, removeEnd, rowSpanCell.i, rowSpanCell.rs);
                }
                this.controllersOff();
            }
            else {
                this.plugins.table.setPositionControllerDiv.call(this, positionResetElement || contextTable._tdElement, true);
            }
        },
        _closeSplitMenu: null,
        openSplitMenu: function () {
            this.util.addClass(this.context.table.splitButton, 'on');
            this.context.table.splitMenu.style.display = 'inline-table';
            this.plugins.table._closeSplitMenu = function () {
                this.util.removeClass(this.context.table.splitButton, 'on');
                this.context.table.splitMenu.style.display = 'none';
                this.removeDocEvent('click', this.plugins.table._closeSplitMenu);
                this.plugins.table._closeSplitMenu = null;
            }.bind(this);
            this.addDocEvent('click', this.plugins.table._closeSplitMenu);
        },
        splitCells: function (direction) {
            var util = this.util;
            var vertical = direction === 'vertical';
            var contextTable = this.context.table;
            var currentCell = contextTable._tdElement;
            var rows = contextTable._trElements;
            var currentRow = contextTable._trElement;
            var index = contextTable._logical_cellIndex;
            var rowIndex = contextTable._rowIndex;
            var newCell = this.plugins.table.createCells.call(this, currentCell.nodeName, 0, true);
            // vertical
            if (vertical) {
                var currentColSpan = currentCell.colSpan;
                newCell.rowSpan = currentCell.rowSpan;
                // colspan > 1
                if (currentColSpan > 1) {
                    newCell.colSpan = this._w.Math.floor(currentColSpan / 2);
                    currentCell.colSpan = currentColSpan - newCell.colSpan;
                    currentRow.insertBefore(newCell, currentCell.nextElementSibling);
                }
                else { // colspan - 1
                    var rowSpanArr = [];
                    var spanIndex = [];
                    for (var i = 0, len = contextTable._rowCnt, cells = void 0, colSpan = void 0; i < len; i++) {
                        cells = rows[i].cells;
                        colSpan = 0;
                        for (var c = 0, cLen = cells.length, cell = void 0, cs = void 0, rs = void 0, logcalIndex = void 0; c < cLen; c++) {
                            cell = cells[c];
                            cs = cell.colSpan - 1;
                            rs = cell.rowSpan - 1;
                            logcalIndex = c + colSpan;
                            if (spanIndex.length > 0) {
                                for (var r = 0, arr = void 0; r < spanIndex.length; r++) {
                                    arr = spanIndex[r];
                                    if (arr.row > i)
                                        continue;
                                    if (logcalIndex >= arr.index) {
                                        colSpan += arr.cs;
                                        logcalIndex += arr.cs;
                                        arr.rs -= 1;
                                        arr.row = i + 1;
                                        if (arr.rs < 1) {
                                            spanIndex.splice(r, 1);
                                            r--;
                                        }
                                    }
                                    else if (c === cLen - 1) {
                                        arr.rs -= 1;
                                        arr.row = i + 1;
                                        if (arr.rs < 1) {
                                            spanIndex.splice(r, 1);
                                            r--;
                                        }
                                    }
                                }
                            }
                            if (logcalIndex <= index && rs > 0) {
                                rowSpanArr.push({
                                    index: logcalIndex,
                                    cs: cs + 1,
                                    rs: rs,
                                    row: -1
                                });
                            }
                            if (cell !== currentCell && logcalIndex <= index && logcalIndex + cs >= index + currentColSpan - 1) {
                                cell.colSpan += 1;
                                break;
                            }
                            if (logcalIndex > index)
                                break;
                            colSpan += cs;
                        }
                        spanIndex = spanIndex.concat(rowSpanArr).sort(function (a, b) { return a.index - b.index; });
                        rowSpanArr = [];
                    }
                    currentRow.insertBefore(newCell, currentCell.nextElementSibling);
                }
            }
            else { // horizontal
                var currentRowSpan = currentCell.rowSpan;
                newCell.colSpan = currentCell.colSpan;
                // rowspan > 1
                if (currentRowSpan > 1) {
                    newCell.rowSpan = this._w.Math.floor(currentRowSpan / 2);
                    var newRowSpan = currentRowSpan - newCell.rowSpan;
                    var rowSpanArr = [];
                    var nextRowIndex = util.getArrayIndex(rows, currentRow) + newRowSpan;
                    for (var i = 0, cells = void 0, colSpan = void 0; i < nextRowIndex; i++) {
                        cells = rows[i].cells;
                        colSpan = 0;
                        for (var c = 0, cLen = cells.length, cell = void 0, cs = void 0, logcalIndex = void 0; c < cLen; c++) {
                            logcalIndex = c + colSpan;
                            if (logcalIndex >= index)
                                break;
                            cell = cells[c];
                            cs = cell.rowSpan - 1;
                            if (cs > 0 && cs + i >= nextRowIndex && logcalIndex < index) {
                                rowSpanArr.push({
                                    index: logcalIndex,
                                    cs: cell.colSpan
                                });
                            }
                            colSpan += cell.colSpan - 1;
                        }
                    }
                    var nextRow = rows[nextRowIndex];
                    var nextCells = nextRow.cells;
                    var rs = rowSpanArr.shift();
                    for (var c = 0, cLen = nextCells.length, colSpan = 0, cell = void 0, cs = void 0, logcalIndex = void 0, insertIndex = void 0; c < cLen; c++) {
                        logcalIndex = c + colSpan;
                        cell = nextCells[c];
                        cs = cell.colSpan - 1;
                        insertIndex = logcalIndex + cs + 1;
                        if (rs && insertIndex >= rs.index) {
                            colSpan += rs.cs;
                            insertIndex += rs.cs;
                            rs = rowSpanArr.shift();
                        }
                        if (insertIndex >= index || c === cLen - 1) {
                            nextRow.insertBefore(newCell, cell.nextElementSibling);
                            break;
                        }
                        colSpan += cs;
                    }
                    currentCell.rowSpan = newRowSpan;
                }
                else { // rowspan - 1
                    newCell.rowSpan = currentCell.rowSpan;
                    var newRow = util.createElement('TR');
                    newRow.appendChild(newCell);
                    for (var i = 0, cells_1; i < rowIndex; i++) {
                        cells_1 = rows[i].cells;
                        if (cells_1.length === 0)
                            return;
                        for (var c = 0, cLen = cells_1.length; c < cLen; c++) {
                            if (i + cells_1[c].rowSpan - 1 >= rowIndex) {
                                cells_1[c].rowSpan += 1;
                            }
                        }
                    }
                    var physicalIndex = contextTable._physical_cellIndex;
                    var cells = currentRow.cells;
                    for (var c = 0, cLen = cells.length; c < cLen; c++) {
                        if (c === physicalIndex)
                            continue;
                        cells[c].rowSpan += 1;
                    }
                    currentRow.parentNode.insertBefore(newRow, currentRow.nextElementSibling);
                }
            }
            this.focusEdge(currentCell);
            this.plugins.table.setPositionControllerDiv.call(this, currentCell, true);
        },
        mergeCells: function () {
            var tablePlugin = this.plugins.table;
            var contextTable = this.context.table;
            var util = this.util;
            var ref = tablePlugin._ref;
            var selectedCells = tablePlugin._selectedCells;
            var mergeCell = selectedCells[0];
            var emptyRowFirst = null;
            var emptyRowLast = null;
            var cs = (ref.ce - ref.cs) + 1;
            var rs = (ref.re - ref.rs) + 1;
            var mergeHTML = '';
            var row = null;
            for (var i = 1, len = selectedCells.length, cell = void 0, ch = void 0; i < len; i++) {
                cell = selectedCells[i];
                if (row !== cell.parentNode)
                    row = cell.parentNode;
                ch = cell.children;
                for (var c = 0, cLen = ch.length; c < cLen; c++) {
                    if (util.isFormatElement(ch[c]) && util.onlyZeroWidthSpace(ch[c].textContent)) {
                        util.removeItem(ch[c]);
                    }
                }
                mergeHTML += cell.innerHTML;
                util.removeItem(cell);
                if (row.cells.length === 0) {
                    if (!emptyRowFirst)
                        emptyRowFirst = row;
                    else
                        emptyRowLast = row;
                    rs -= 1;
                }
            }
            if (emptyRowFirst) {
                var rows = contextTable._trElements;
                var rowIndexFirst = util.getArrayIndex(rows, emptyRowFirst);
                var rowIndexLast = util.getArrayIndex(rows, emptyRowLast || emptyRowFirst);
                var removeRows = [];
                for (var i = 0, cells = void 0; i <= rowIndexLast; i++) {
                    cells = rows[i].cells;
                    if (cells.length === 0) {
                        removeRows.push(rows[i]);
                        continue;
                    }
                    for (var c = 0, cLen = cells.length, cell = void 0, rs_1; c < cLen; c++) {
                        cell = cells[c];
                        rs_1 = cell.rowSpan - 1;
                        if (rs_1 > 0 && i + rs_1 >= rowIndexFirst) {
                            cell.rowSpan -= util.getOverlapRangeAtIndex(rowIndexFirst, rowIndexLast, i, i + rs_1);
                        }
                    }
                }
                for (var i = 0, len = removeRows.length; i < len; i++) {
                    util.removeItem(removeRows[i]);
                }
            }
            mergeCell.innerHTML += mergeHTML;
            mergeCell.colSpan = cs;
            mergeCell.rowSpan = rs;
            this.controllersOff();
            tablePlugin.setActiveButton.call(this, true, false);
            tablePlugin.call_controller_tableEdit.call(this, mergeCell);
            util.addClass(mergeCell, 'se-table-selected-cell');
            this.focusEdge(mergeCell);
        },
        toggleHeader: function () {
            var util = this.util;
            var headerButton = this.context.table.headerButton;
            var active = util.hasClass(headerButton, 'active');
            var table = this.context.table._element;
            if (!active) {
                var header = util.createElement('THEAD');
                header.innerHTML = '<tr>' + this.plugins.table.createCells.call(this, 'th', this.context.table._logical_cellCnt, false) + '</tr>';
                table.insertBefore(header, table.firstElementChild);
            }
            else {
                util.removeItem(table.querySelector('thead'));
            }
            util.toggleClass(headerButton, 'active');
            if (/TH/i.test(this.context.table._tdElement.nodeName)) {
                this.controllersOff();
            }
            else {
                this.plugins.table.setPositionControllerDiv.call(this, this.context.table._tdElement, false);
            }
        },
        setTableStyle: function (styles) {
            var contextTable = this.context.table;
            var tableElement = contextTable._element;
            var icon, span, sizeIcon, text;
            if (styles.indexOf('width') > -1) {
                icon = contextTable.resizeButton.firstElementChild;
                span = contextTable.resizeText;
                if (!contextTable._maxWidth) {
                    sizeIcon = contextTable.icons.expansion;
                    text = contextTable.maxText;
                    contextTable.columnFixedButton.style.display = 'none';
                    this.util.removeClass(tableElement, 'se-table-size-100');
                    this.util.addClass(tableElement, 'se-table-size-auto');
                }
                else {
                    sizeIcon = contextTable.icons.reduction;
                    text = contextTable.minText;
                    contextTable.columnFixedButton.style.display = 'block';
                    this.util.removeClass(tableElement, 'se-table-size-auto');
                    this.util.addClass(tableElement, 'se-table-size-100');
                }
                this.util.changeElement(icon, sizeIcon);
                this.util.changeTxt(span, text);
            }
            if (styles.indexOf('column') > -1) {
                if (!contextTable._fixedColumn) {
                    this.util.removeClass(tableElement, 'se-table-layout-fixed');
                    this.util.addClass(tableElement, 'se-table-layout-auto');
                    this.util.removeClass(contextTable.columnFixedButton, 'active');
                }
                else {
                    this.util.removeClass(tableElement, 'se-table-layout-auto');
                    this.util.addClass(tableElement, 'se-table-layout-fixed');
                    this.util.addClass(contextTable.columnFixedButton, 'active');
                }
            }
        },
        setActiveButton: function (fixedCell, selectedCell) {
            var contextTable = this.context.table;
            if (/^TH$/i.test(fixedCell.nodeName)) {
                contextTable.insertRowAboveButton.setAttribute('disabled', true);
                contextTable.insertRowBelowButton.setAttribute('disabled', true);
            }
            else {
                contextTable.insertRowAboveButton.removeAttribute('disabled');
                contextTable.insertRowBelowButton.removeAttribute('disabled');
            }
            if (!selectedCell || fixedCell === selectedCell) {
                contextTable.splitButton.removeAttribute('disabled');
                contextTable.mergeButton.setAttribute('disabled', true);
            }
            else {
                contextTable.splitButton.setAttribute('disabled', true);
                contextTable.mergeButton.removeAttribute('disabled');
            }
        },
        // multi selecte
        _bindOnSelect: null,
        _bindOffSelect: null,
        _bindOffShift: null,
        _selectedCells: null,
        _shift: false,
        _fixedCell: null,
        _fixedCellName: null,
        _selectedCell: null,
        _selectedTable: null,
        _ref: null,
        _toggleEditor: function (enabled) {
            this.context.element.wysiwyg.setAttribute('contenteditable', enabled);
            if (enabled)
                this.util.removeClass(this.context.element.wysiwyg, 'se-disabled');
            else
                this.util.addClass(this.context.element.wysiwyg, 'se-disabled');
        },
        _offCellMultiSelect: function (e) {
            e.stopPropagation();
            var tablePlugin = this.plugins.table;
            if (!tablePlugin._shift) {
                tablePlugin._removeEvents.call(this);
                tablePlugin._toggleEditor.call(this, true);
            }
            else if (tablePlugin._initBind) {
                this._wd.removeEventListener('touchmove', tablePlugin._initBind);
                tablePlugin._initBind = null;
            }
            if (!tablePlugin._fixedCell || !tablePlugin._selectedTable)
                return;
            tablePlugin.setActiveButton.call(this, tablePlugin._fixedCell, tablePlugin._selectedCell);
            tablePlugin.call_controller_tableEdit.call(this, tablePlugin._selectedCell || tablePlugin._fixedCell);
            tablePlugin._selectedCells = tablePlugin._selectedTable.querySelectorAll('.se-table-selected-cell');
            if (tablePlugin._selectedCell && tablePlugin._fixedCell)
                this.focusEdge(tablePlugin._selectedCell);
            if (!tablePlugin._shift) {
                tablePlugin._fixedCell = null;
                tablePlugin._selectedCell = null;
                tablePlugin._fixedCellName = null;
            }
        },
        _onCellMultiSelect: function (e) {
            this._antiBlur = true;
            var tablePlugin = this.plugins.table;
            var target = this.util.getParentElement(e.target, this.util.isCell);
            if (tablePlugin._shift) {
                if (target === tablePlugin._fixedCell)
                    tablePlugin._toggleEditor.call(this, true);
                else
                    tablePlugin._toggleEditor.call(this, false);
            }
            else if (!tablePlugin._ref) {
                if (target === tablePlugin._fixedCell)
                    return;
                else
                    tablePlugin._toggleEditor.call(this, false);
            }
            if (!target || target === tablePlugin._selectedCell || tablePlugin._fixedCellName !== target.nodeName ||
                tablePlugin._selectedTable !== this.util.getParentElement(target, 'TABLE')) {
                return;
            }
            tablePlugin._selectedCell = target;
            tablePlugin._setMultiCells.call(this, tablePlugin._fixedCell, target);
        },
        _setMultiCells: function (startCell, endCell) {
            var tablePlugin = this.plugins.table;
            var rows = tablePlugin._selectedTable.rows;
            var util = this.util;
            var selectedCells = tablePlugin._selectedTable.querySelectorAll('.se-table-selected-cell');
            for (var i = 0, len = selectedCells.length; i < len; i++) {
                util.removeClass(selectedCells[i], 'se-table-selected-cell');
            }
            if (startCell === endCell) {
                util.addClass(startCell, 'se-table-selected-cell');
                if (!tablePlugin._shift)
                    return;
            }
            var findSelectedCell = true;
            var spanIndex = [];
            var rowSpanArr = [];
            var ref = tablePlugin._ref = { _i: 0, cs: null, ce: null, rs: null, re: null };
            for (var i = 0, len = rows.length, cells = void 0, colSpan = void 0; i < len; i++) {
                cells = rows[i].cells;
                colSpan = 0;
                for (var c = 0, cLen = cells.length, cell = void 0, logcalIndex = void 0, cs = void 0, rs = void 0; c < cLen; c++) {
                    cell = cells[c];
                    cs = cell.colSpan - 1;
                    rs = cell.rowSpan - 1;
                    logcalIndex = c + colSpan;
                    if (spanIndex.length > 0) {
                        for (var r = 0, arr = void 0; r < spanIndex.length; r++) {
                            arr = spanIndex[r];
                            if (arr.row > i)
                                continue;
                            if (logcalIndex >= arr.index) {
                                colSpan += arr.cs;
                                logcalIndex += arr.cs;
                                arr.rs -= 1;
                                arr.row = i + 1;
                                if (arr.rs < 1) {
                                    spanIndex.splice(r, 1);
                                    r--;
                                }
                            }
                            else if (c === cLen - 1) {
                                arr.rs -= 1;
                                arr.row = i + 1;
                                if (arr.rs < 1) {
                                    spanIndex.splice(r, 1);
                                    r--;
                                }
                            }
                        }
                    }
                    if (findSelectedCell) {
                        if (cell === startCell || cell === endCell) {
                            ref.cs = ref.cs !== null && ref.cs < logcalIndex ? ref.cs : logcalIndex;
                            ref.ce = ref.ce !== null && ref.ce > logcalIndex + cs ? ref.ce : logcalIndex + cs;
                            ref.rs = ref.rs !== null && ref.rs < i ? ref.rs : i;
                            ref.re = ref.re !== null && ref.re > i + rs ? ref.re : i + rs;
                            ref._i += 1;
                        }
                        if (ref._i === 2) {
                            findSelectedCell = false;
                            spanIndex = [];
                            rowSpanArr = [];
                            i = -1;
                            break;
                        }
                    }
                    else if (util.getOverlapRangeAtIndex(ref.cs, ref.ce, logcalIndex, logcalIndex + cs) && util.getOverlapRangeAtIndex(ref.rs, ref.re, i, i + rs)) {
                        var newCs = ref.cs < logcalIndex ? ref.cs : logcalIndex;
                        var newCe = ref.ce > logcalIndex + cs ? ref.ce : logcalIndex + cs;
                        var newRs = ref.rs < i ? ref.rs : i;
                        var newRe = ref.re > i + rs ? ref.re : i + rs;
                        if (ref.cs !== newCs || ref.ce !== newCe || ref.rs !== newRs || ref.re !== newRe) {
                            ref.cs = newCs;
                            ref.ce = newCe;
                            ref.rs = newRs;
                            ref.re = newRe;
                            i = -1;
                            spanIndex = [];
                            rowSpanArr = [];
                            break;
                        }
                        util.addClass(cell, 'se-table-selected-cell');
                    }
                    if (rs > 0) {
                        rowSpanArr.push({
                            index: logcalIndex,
                            cs: cs + 1,
                            rs: rs,
                            row: -1
                        });
                    }
                    colSpan += cell.colSpan - 1;
                }
                spanIndex = spanIndex.concat(rowSpanArr).sort(function (a, b) { return a.index - b.index; });
                rowSpanArr = [];
            }
        },
        _removeEvents: function () {
            var tablePlugin = this.plugins.table;
            if (tablePlugin._initBind) {
                this._wd.removeEventListener('touchmove', tablePlugin._initBind);
                tablePlugin._initBind = null;
            }
            if (tablePlugin._bindOnSelect) {
                this._wd.removeEventListener('mousedown', tablePlugin._bindOnSelect);
                this._wd.removeEventListener('mousemove', tablePlugin._bindOnSelect);
                tablePlugin._bindOnSelect = null;
            }
            if (tablePlugin._bindOffSelect) {
                this._wd.removeEventListener('mouseup', tablePlugin._bindOffSelect);
                tablePlugin._bindOffSelect = null;
            }
            if (tablePlugin._bindOffShift) {
                this._wd.removeEventListener('keyup', tablePlugin._bindOffShift);
                tablePlugin._bindOffShift = null;
            }
        },
        _initBind: null,
        onTableCellMultiSelect: function (tdElement, shift) {
            var tablePlugin = this.plugins.table;
            tablePlugin._removeEvents.call(this);
            this.controllersOff();
            tablePlugin._shift = shift;
            tablePlugin._fixedCell = tdElement;
            tablePlugin._fixedCellName = tdElement.nodeName;
            tablePlugin._selectedTable = this.util.getParentElement(tdElement, 'TABLE');
            var selectedCells = tablePlugin._selectedTable.querySelectorAll('.se-table-selected-cell');
            for (var i = 0, len = selectedCells.length; i < len; i++) {
                this.util.removeClass(selectedCells[i], 'se-table-selected-cell');
            }
            this.util.addClass(tdElement, 'se-table-selected-cell');
            tablePlugin._bindOnSelect = tablePlugin._onCellMultiSelect.bind(this);
            tablePlugin._bindOffSelect = tablePlugin._offCellMultiSelect.bind(this);
            if (!shift) {
                this._wd.addEventListener('mousemove', tablePlugin._bindOnSelect, false);
            }
            else {
                tablePlugin._bindOffShift = function () {
                    this.controllersOn(this.context.table.resizeDiv, this.context.table.tableController, this.plugins.table.init.bind(this), tdElement, 'table');
                    if (!tablePlugin._ref)
                        this.controllersOff();
                }.bind(this);
                this._wd.addEventListener('keyup', tablePlugin._bindOffShift, false);
                this._wd.addEventListener('mousedown', tablePlugin._bindOnSelect, false);
            }
            this._wd.addEventListener('mouseup', tablePlugin._bindOffSelect, false);
            tablePlugin._initBind = tablePlugin.init.bind(this);
            this._wd.addEventListener('touchmove', tablePlugin._initBind, false);
        },
        onClick_tableController: function (e) {
            e.stopPropagation();
            var target = e.target.getAttribute('data-command') ? e.target : e.target.parentNode;
            if (target.getAttribute('disabled'))
                return;
            var command = target.getAttribute('data-command');
            var value = target.getAttribute('data-value');
            var option = target.getAttribute('data-option');
            var tablePlugin = this.plugins.table;
            if (typeof tablePlugin._closeSplitMenu === 'function') {
                tablePlugin._closeSplitMenu();
                if (command === 'onsplit')
                    return;
            }
            if (!command)
                return;
            e.preventDefault();
            var contextTable = this.context.table;
            switch (command) {
                case 'insert':
                case 'delete':
                    tablePlugin.editTable.call(this, value, option);
                    break;
                case 'header':
                    tablePlugin.toggleHeader.call(this);
                    break;
                case 'onsplit':
                    tablePlugin.openSplitMenu.call(this);
                    break;
                case 'split':
                    tablePlugin.splitCells.call(this, value);
                    break;
                case 'merge':
                    tablePlugin.mergeCells.call(this);
                    break;
                case 'resize':
                    contextTable._maxWidth = !contextTable._maxWidth;
                    tablePlugin.setTableStyle.call(this, 'width');
                    tablePlugin.setPositionControllerTop.call(this, contextTable._element);
                    tablePlugin.setPositionControllerDiv.call(this, contextTable._tdElement, tablePlugin._shift);
                    break;
                case 'layout':
                    contextTable._fixedColumn = !contextTable._fixedColumn;
                    tablePlugin.setTableStyle.call(this, 'column');
                    tablePlugin.setPositionControllerTop.call(this, contextTable._element);
                    tablePlugin.setPositionControllerDiv.call(this, contextTable._tdElement, tablePlugin._shift);
                    break;
                case 'remove':
                    var emptyDiv = contextTable._element.parentNode;
                    this.util.removeItem(contextTable._element);
                    this.controllersOff();
                    if (emptyDiv !== this.context.element.wysiwyg)
                        this.util.removeItemAllParents(emptyDiv, function (current) { return current.childNodes.length === 0; }, null);
                    this.focus();
            }
            // history stack
            this.history.push(false);
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var formatBlock = {
        name: 'formatBlock',
        display: 'submenu',
        add: function (core, targetElement) {
            var context = core.context;
            context.formatBlock = {
                targetText: targetElement.querySelector('.txt'),
                targetTooltip: targetElement.parentNode.querySelector('.se-tooltip-text'),
                _formatList: null,
                currentFormat: ''
            };
            /** set submenu */
            var listDiv = this.setSubmenu(core);
            /** add event listeners */
            listDiv.querySelector('ul').addEventListener('click', this.pickUp.bind(core));
            context.formatBlock._formatList = listDiv.querySelectorAll('li button');
            /** append target button menu */
            core.initMenuTarget(this.name, targetElement, listDiv);
            /** empty memory */
            listDiv = null;
        },
        setSubmenu: function (core) {
            var option = core.options;
            var lang_toolbar = core.lang.toolbar;
            var listDiv = core.util.createElement('DIV');
            listDiv.className = 'se-submenu se-list-layer se-list-format';
            var defaultFormats = ['p', 'div', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
            var formatList = !option.formats || option.formats.length === 0 ? defaultFormats : option.formats;
            var list = '<div class="se-list-inner"><ul class="se-list-basic">';
            for (var i = 0, len = formatList.length, format = void 0, tagName = void 0, command = void 0, name = void 0, h = void 0, attrs = void 0, className = void 0; i < len; i++) {
                format = formatList[i];
                if (typeof format === 'string' && defaultFormats.indexOf(format) > -1) {
                    tagName = format.toLowerCase();
                    command = tagName === 'blockquote' ? 'range' : tagName === 'pre' ? 'free' : 'replace';
                    h = /^h/.test(tagName) ? tagName.match(/\d+/)[0] : '';
                    name = lang_toolbar['tag_' + (h ? 'h' : tagName)] + h;
                    className = '';
                    attrs = '';
                }
                else {
                    tagName = format.tag.toLowerCase();
                    command = format.command;
                    name = format.name || tagName;
                    className = format.class;
                    attrs = className ? ' class="' + className + '"' : '';
                }
                list += '<li>' +
                    '<button type="button" class="se-btn-list" data-command="' + command + '" data-value="' + tagName + '" data-class="' + className + '" title="' + name + '">' +
                    '<' + tagName + attrs + '>' + name + '</' + tagName + '>' +
                    '</button></li>';
            }
            list += '</ul></div>';
            listDiv.innerHTML = list;
            return listDiv;
        },
        /**
        * @Override core
        */
        active: function (element) {
            var formatTitle = this.lang.toolbar.formats;
            var target = this.context.formatBlock.targetText;
            if (!element) {
                this.util.changeTxt(target, formatTitle);
            }
            else if (this.util.isFormatElement(element)) {
                var formatContext = this.context.formatBlock;
                var formatList = formatContext._formatList;
                var nodeName = element.nodeName.toLowerCase();
                var className = (element.className.match(/(\s|^)__se__format__[^\s]+/) || [''])[0].trim();
                for (var i = 0, len = formatList.length, f = void 0; i < len; i++) {
                    f = formatList[i];
                    if (nodeName === f.getAttribute('data-value') && className === f.getAttribute('data-class')) {
                        formatTitle = f.title;
                        break;
                    }
                }
                this.util.changeTxt(target, formatTitle);
                target.setAttribute('data-value', nodeName);
                target.setAttribute('data-class', className);
                return true;
            }
            return false;
        },
        /**
        * @Override submenu
        */
        on: function () {
            var formatContext = this.context.formatBlock;
            var formatList = formatContext._formatList;
            var target = formatContext.targetText;
            var currentFormat = (target.getAttribute('data-value') || '') + (target.getAttribute('data-class') || '');
            if (currentFormat !== formatContext.currentFormat) {
                for (var i = 0, len = formatList.length, f = void 0; i < len; i++) {
                    f = formatList[i];
                    if (currentFormat === f.getAttribute('data-value') + f.getAttribute('data-class')) {
                        this.util.addClass(f, 'active');
                    }
                    else {
                        this.util.removeClass(f, 'active');
                    }
                }
                formatContext.currentFormat = currentFormat;
            }
        },
        pickUp: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var target = e.target;
            var command = null, value = null, tag = null, className = '';
            while (!command && !/UL/i.test(target.tagName)) {
                command = target.getAttribute('data-command');
                value = target.getAttribute('data-value');
                className = target.getAttribute('data-class');
                if (command) {
                    tag = target.firstChild;
                    break;
                }
                target = target.parentNode;
            }
            if (!command)
                return;
            // blockquote
            if (command === 'range') {
                var rangeElement = tag.cloneNode(false);
                this.applyRangeFormatElement(rangeElement);
            }
            // free, replace
            else {
                var range = this.getRange();
                var selectedFormsts = this.getSelectedElementsAndComponents(false);
                if (selectedFormsts.length === 0) {
                    range = this.getRange_addLine(range, null);
                    selectedFormsts = this.getSelectedElementsAndComponents(false);
                    if (selectedFormsts.length === 0)
                        return;
                }
                var startOffset = range.startOffset;
                var endOffset = range.endOffset;
                var util = this.util;
                var first = selectedFormsts[0];
                var last = selectedFormsts[selectedFormsts.length - 1];
                var firstPath = util.getNodePath(range.startContainer, first, null, null);
                var lastPath = util.getNodePath(range.endContainer, last, null, null);
                // remove selected list
                var rlist = this.detachList(selectedFormsts, false);
                if (rlist.sc)
                    first = rlist.sc;
                if (rlist.ec)
                    last = rlist.ec;
                // change format tag
                this.setRange(util.getNodeFromPath(firstPath, first), startOffset, util.getNodeFromPath(lastPath, last), endOffset);
                var modifiedFormsts = this.getSelectedElementsAndComponents(false);
                // free format
                if (command === 'free') {
                    var len = modifiedFormsts.length - 1;
                    var parentNode_1 = modifiedFormsts[len].parentNode;
                    var freeElement = tag.cloneNode(false);
                    var focusElement = freeElement;
                    for (var i = len, f = void 0, html = void 0, before = void 0, next = void 0, inner = void 0, isComp = void 0, first_1 = true; i >= 0; i--) {
                        f = modifiedFormsts[i];
                        if (f === (!modifiedFormsts[i + 1] ? null : modifiedFormsts[i + 1].parentNode))
                            continue;
                        isComp = util.isComponent(f);
                        html = isComp ? '' : f.innerHTML.replace(/(?!>)\s+(?=<)|\n/g, ' ');
                        before = util.getParentElement(f, function (current) {
                            return current.parentNode === parentNode_1;
                        });
                        if (parentNode_1 !== f.parentNode || isComp) {
                            if (util.isFormatElement(parentNode_1)) {
                                parentNode_1.parentNode.insertBefore(freeElement, parentNode_1.nextSibling);
                                parentNode_1 = parentNode_1.parentNode;
                            }
                            else {
                                parentNode_1.insertBefore(freeElement, before ? before.nextSibling : null);
                                parentNode_1 = f.parentNode;
                            }
                            next = freeElement.nextSibling;
                            if (next && freeElement.nodeName === next.nodeName && util.isSameAttributes(freeElement, next)) {
                                freeElement.innerHTML += '<BR>' + next.innerHTML;
                                util.removeItem(next);
                            }
                            freeElement = tag.cloneNode(false);
                            first_1 = true;
                        }
                        inner = freeElement.innerHTML;
                        freeElement.innerHTML = ((first_1 || !html || !inner || /<br>$/i.test(html)) ? html : html + '<BR>') + inner;
                        if (i === 0) {
                            parentNode_1.insertBefore(freeElement, f);
                            next = f.nextSibling;
                            if (next && freeElement.nodeName === next.nodeName && util.isSameAttributes(freeElement, next)) {
                                freeElement.innerHTML += '<BR>' + next.innerHTML;
                                util.removeItem(next);
                            }
                            var prev = freeElement.previousSibling;
                            if (prev && freeElement.nodeName === prev.nodeName && util.isSameAttributes(freeElement, prev)) {
                                prev.innerHTML += '<BR>' + freeElement.innerHTML;
                                util.removeItem(freeElement);
                            }
                        }
                        if (!isComp)
                            util.removeItem(f);
                        if (!!html)
                            first_1 = false;
                    }
                    this.setRange(focusElement, 0, focusElement, 0);
                }
                // replace format
                else {
                    for (var i = 0, len = modifiedFormsts.length, node = void 0, newFormat = void 0; i < len; i++) {
                        node = modifiedFormsts[i];
                        if ((node.nodeName.toLowerCase() !== value.toLowerCase() || (node.className.match(/(\s|^)__se__format__[^\s]+/) || [''])[0].trim() !== className) && !util.isComponent(node)) {
                            newFormat = tag.cloneNode(false);
                            util.copyFormatAttributes(newFormat, node);
                            newFormat.innerHTML = node.innerHTML;
                            node.parentNode.replaceChild(newFormat, node);
                        }
                        if (i === 0)
                            first = newFormat || node;
                        if (i === len - 1)
                            last = newFormat || node;
                        newFormat = null;
                    }
                    this.setRange(util.getNodeFromPath(firstPath, first), startOffset, util.getNodeFromPath(lastPath, last), endOffset);
                }
                // history stack
                this.history.push(false);
            }
            this.submenuOff();
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 20197 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var lineHeight = {
        name: 'lineHeight',
        display: 'submenu',
        add: function (core, targetElement) {
            var context = core.context;
            context.lineHeight = {
                _sizeList: null,
                currentSize: -1
            };
            /** set submenu */
            var listDiv = this.setSubmenu(core);
            var listUl = listDiv.querySelector('ul');
            /** add event listeners */
            listUl.addEventListener('click', this.pickup.bind(core));
            context.lineHeight._sizeList = listUl.querySelectorAll('li button');
            /** append target button menu */
            core.initMenuTarget(this.name, targetElement, listDiv);
            /** empty memory */
            listDiv = null, listUl = null;
        },
        setSubmenu: function (core) {
            var option = core.options;
            var lang = core.lang;
            var listDiv = core.util.createElement('DIV');
            listDiv.className = 'se-submenu se-list-layer';
            var sizeList = !option.lineHeights ? [
                { text: '1', value: 1 },
                { text: '1.15', value: 1.15 },
                { text: '1.5', value: 1.5 },
                { text: '2', value: 2 }
            ] : option.lineHeights;
            var list = '<div class="se-list-inner">' +
                '<ul class="se-list-basic">' +
                '<li><button type="button" class="default_value se-btn-list" title="' + lang.toolbar.default + '">(' + lang.toolbar.default + ')</button></li>';
            for (var i = 0, len = sizeList.length, size = void 0; i < len; i++) {
                size = sizeList[i];
                list += '<li><button type="button" class="se-btn-list" data-value="' + size.value + '" title="' + size.text + '">' + size.text + '</button></li>';
            }
            list += '</ul></div>';
            listDiv.innerHTML = list;
            return listDiv;
        },
        /**
        * @Override submenu
        */
        on: function () {
            var lineHeightContext = this.context.lineHeight;
            var sizeList = lineHeightContext._sizeList;
            var format = this.util.getFormatElement(this.getSelectionNode());
            var currentSize = !format ? '' : format.style.lineHeight + '';
            if (currentSize !== lineHeightContext.currentSize) {
                for (var i = 0, len = sizeList.length; i < len; i++) {
                    if (currentSize === sizeList[i].getAttribute('data-value')) {
                        this.util.addClass(sizeList[i], 'active');
                    }
                    else {
                        this.util.removeClass(sizeList[i], 'active');
                    }
                }
                lineHeightContext.currentSize = currentSize;
            }
        },
        pickup: function (e) {
            if (!/^BUTTON$/i.test(e.target.tagName))
                return false;
            e.preventDefault();
            e.stopPropagation();
            var value = e.target.getAttribute('data-value') || '';
            var formats = this.getSelectedElements();
            for (var i = 0, len = formats.length; i < len; i++) {
                formats[i].style.lineHeight = value;
            }
            this.submenuOff();
            // history stack
            this.history.push(false);
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var template = {
        name: 'template',
        display: 'submenu',
        add: function (core, targetElement) {
            var context = core.context;
            context.template = {};
            /** set submenu */
            var templateDiv = this.setSubmenu(core);
            /** add event listeners */
            templateDiv.querySelector('ul').addEventListener('click', this.pickup.bind(core));
            /** append target button menu */
            core.initMenuTarget(this.name, targetElement, templateDiv);
            /** empty memory */
            templateDiv = null;
        },
        setSubmenu: function (core) {
            var templateList = core.options.templates;
            if (!templateList || templateList.length === 0) {
                throw Error('[SUNEDITOR.plugins.template.fail] To use the "template" plugin, please define the "templates" option.');
            }
            var listDiv = core.util.createElement('DIV');
            listDiv.className = 'se-list-layer';
            var list = '<div class="se-submenu se-list-inner">' +
                '<ul class="se-list-basic">';
            for (var i = 0, len = templateList.length, t = void 0; i < len; i++) {
                t = templateList[i];
                list += '<li><button type="button" class="se-btn-list" data-value="' + i + '" title="' + t.name + '">' + t.name + '</button></li>';
            }
            list += '</ul></div>';
            listDiv.innerHTML = list;
            return listDiv;
        },
        pickup: function (e) {
            if (!/^BUTTON$/i.test(e.target.tagName))
                return false;
            e.preventDefault();
            e.stopPropagation();
            var temp = this.options.templates[e.target.getAttribute('data-value')];
            if (temp.html) {
                this.setContents(temp.html);
            }
            else {
                this.submenuOff();
                throw Error('[SUNEDITOR.template.fail] cause : "templates[i].html not found"');
            }
            this.submenuOff();
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var paragraphStyle = {
        name: 'paragraphStyle',
        display: 'submenu',
        add: function (core, targetElement) {
            var context = core.context;
            context.paragraphStyle = {
                _classList: null
            };
            /** set submenu */
            var listDiv = this.setSubmenu(core);
            /** add event listeners */
            listDiv.querySelector('ul').addEventListener('click', this.pickUp.bind(core));
            context.paragraphStyle._classList = listDiv.querySelectorAll('li button');
            /** append target button menu */
            core.initMenuTarget(this.name, targetElement, listDiv);
            /** empty memory */
            listDiv = null;
        },
        setSubmenu: function (core) {
            var option = core.options;
            var listDiv = core.util.createElement('DIV');
            listDiv.className = 'se-submenu se-list-layer se-list-format';
            var menuLang = core.lang.menu;
            var defaultList = {
                spaced: {
                    name: menuLang.spaced,
                    class: '__se__p-spaced',
                    _class: ''
                },
                bordered: {
                    name: menuLang.bordered,
                    class: '__se__p-bordered',
                    _class: ''
                },
                neon: {
                    name: menuLang.neon,
                    class: '__se__p-neon',
                    _class: ''
                }
            };
            var paragraphStyles = !option.paragraphStyles || option.paragraphStyles.length === 0 ? ['spaced', 'bordered', 'neon'] : option.paragraphStyles;
            var list = '<div class="se-list-inner"><ul class="se-list-basic">';
            for (var i = 0, len = paragraphStyles.length, p = void 0, name = void 0, attrs = void 0, _class = void 0; i < len; i++) {
                p = paragraphStyles[i];
                if (typeof p === 'string') {
                    var defaultStyle = defaultList[p.toLowerCase()];
                    if (!defaultStyle)
                        continue;
                    p = defaultStyle;
                }
                name = p.name;
                attrs = p.class ? ' class="' + p.class + '"' : '';
                _class = p._class;
                list += '<li>' +
                    '<button type="button" class="se-btn-list' + (_class ? ' ' + _class : '') + '" data-value="' + p.class + '" title="' + name + '">' +
                    '<div' + attrs + '>' + name + '</div>' +
                    '</button></li>';
            }
            list += '</ul></div>';
            listDiv.innerHTML = list;
            return listDiv;
        },
        /**
        * @Override submenu
        */
        on: function () {
            var paragraphContext = this.context.paragraphStyle;
            var paragraphList = paragraphContext._classList;
            var currentFormat = this.util.getFormatElement(this.getSelectionNode());
            for (var i = 0, len = paragraphList.length; i < len; i++) {
                if (this.util.hasClass(currentFormat, paragraphList[i].getAttribute('data-value'))) {
                    this.util.addClass(paragraphList[i], 'active');
                }
                else {
                    this.util.removeClass(paragraphList[i], 'active');
                }
            }
        },
        pickUp: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var target = e.target;
            var value = null;
            while (!/^UL$/i.test(target.tagName)) {
                value = target.getAttribute('data-value');
                if (value)
                    break;
                target = target.parentNode;
            }
            if (!value)
                return;
            var selectedFormsts = this.getSelectedElements();
            if (selectedFormsts.length === 0) {
                this.getRange_addLine(this.getRange(), null);
                selectedFormsts = this.getSelectedElements();
                if (selectedFormsts.length === 0)
                    return;
            }
            // change format class
            var toggleClass = this.util.hasClass(target, 'active') ? this.util.removeClass.bind(this.util) : this.util.addClass.bind(this.util);
            for (var i = 0, len = selectedFormsts.length; i < len; i++) {
                toggleClass(selectedFormsts[i], value);
            }
            this.submenuOff();
            // history stack
            this.history.push(false);
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var textStyle = {
        name: 'textStyle',
        display: 'submenu',
        add: function (core, targetElement) {
            var context = core.context;
            context.textStyle = {
                _styleList: null
            };
            /** set submenu */
            var listDiv = this.setSubmenu(core);
            var listUl = listDiv.querySelector('ul');
            /** add event listeners */
            listUl.addEventListener('click', this.pickup.bind(core));
            context.textStyle._styleList = listDiv.querySelectorAll('li button');
            /** append target button menu */
            core.initMenuTarget(this.name, targetElement, listDiv);
            /** empty memory */
            listDiv = null, listUl = null;
        },
        setSubmenu: function (core) {
            var option = core.options;
            var listDiv = core.util.createElement('DIV');
            listDiv.className = 'se-submenu se-list-layer se-list-format';
            var defaultList = {
                code: {
                    name: core.lang.menu.code,
                    class: '__se__t-code',
                    tag: 'code',
                },
                translucent: {
                    name: core.lang.menu.translucent,
                    style: 'opacity: 0.5;',
                    tag: 'span',
                },
                shadow: {
                    name: core.lang.menu.shadow,
                    class: '__se__t-shadow',
                    tag: 'span',
                }
            };
            var styleList = !option.textStyles ? core._w.Object.keys(defaultList) : option.textStyles;
            var list = '<div class="se-list-inner"><ul class="se-list-basic">';
            for (var i = 0, len = styleList.length, t = void 0, tag = void 0, name = void 0, attrs = void 0, command = void 0, value = void 0, _class = void 0; i < len; i++) {
                t = styleList[i];
                attrs = '', value = '', command = [];
                if (typeof t === 'string') {
                    var defaultStyle = defaultList[t.toLowerCase()];
                    if (!defaultStyle)
                        continue;
                    t = defaultStyle;
                }
                name = t.name;
                tag = t.tag || 'span';
                _class = t._class;
                if (t.style) {
                    attrs += ' style="' + t.style + '"';
                    value += t.style.replace(/:[^;]+(;|$)\s*/g, ',');
                    command.push('style');
                }
                if (t.class) {
                    attrs += ' class="' + t.class + '"';
                    value += '.' + t.class.trim().replace(/\s+/g, ',.');
                    command.push('class');
                }
                value = value.replace(/,$/, '');
                list += '<li>' +
                    '<button type="button" class="se-btn-list' + (_class ? ' ' + _class : '') + '" data-command="' + tag + '" data-value="' + value + '" title="' + name + '">' +
                    '<' + tag + attrs + '>' + name + '</' + tag + '>' +
                    '</button></li>';
            }
            list += '</ul></div>';
            listDiv.innerHTML = list;
            return listDiv;
        },
        /**
        * @Override submenu
        */
        on: function () {
            var util = this.util;
            var textStyleContext = this.context.textStyle;
            var styleButtonList = textStyleContext._styleList;
            var selectionNode = this.getSelectionNode();
            for (var i = 0, len = styleButtonList.length, btn = void 0, data = void 0, active = void 0; i < len; i++) {
                btn = styleButtonList[i];
                data = btn.getAttribute('data-value').split(',');
                for (var v = 0, node = void 0, value = void 0; v < data.length; v++) {
                    node = selectionNode;
                    active = false;
                    while (node && !util.isFormatElement(node) && !util.isComponent(node)) {
                        if (node.nodeName.toLowerCase() === btn.getAttribute('data-command').toLowerCase()) {
                            value = data[v];
                            if (/^\./.test(value) ? util.hasClass(node, value.replace(/^\./, '')) : !!node.style[value]) {
                                active = true;
                                break;
                            }
                        }
                        node = node.parentNode;
                    }
                    if (!active)
                        break;
                }
                active ? util.addClass(btn, 'active') : util.removeClass(btn, 'active');
            }
        },
        pickup: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var target = e.target;
            var command = null, tag = null;
            while (!command && !/UL/i.test(target.tagName)) {
                command = target.getAttribute('data-command');
                if (command) {
                    tag = target.firstChild;
                    break;
                }
                target = target.parentNode;
            }
            if (!command)
                return;
            var checkStyles = tag.style.cssText.replace(/:.+(;|$)/g, ',').split(',');
            checkStyles.pop();
            var classes = tag.classList;
            for (var i = 0, len = classes.length; i < len; i++) {
                checkStyles.push('.' + classes[i]);
            }
            var newNode = this.util.hasClass(target, 'active') ? null : tag.cloneNode(false);
            var removeNodes = newNode ? null : [tag.nodeName];
            this.nodeChange(newNode, checkStyles, removeNodes, true);
            this.submenuOff();
        }
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
    function getDefaultExportFromCjs(x) {
        return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }
    function getDefaultExportFromNamespaceIfPresent(n) {
        return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
    }
    function getDefaultExportFromNamespaceIfNotNamed(n) {
        return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
    }
    function getAugmentedNamespace(n) {
        if (n.__esModule)
            return n;
        var a = Object.defineProperty({}, '__esModule', { value: true });
        Object.keys(n).forEach(function (k) {
            var d = Object.getOwnPropertyDescriptor(n, k);
            Object.defineProperty(a, k, d.get ? d : {
                enumerable: true,
                get: function () {
                    return n[k];
                }
            });
        });
        return a;
    }
    function commonjsRequire(path) {
        throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
    }

    var dialog$1 = { exports: {} };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    (function (module) {
        'use strict';
        (function (global, factory) {
            if ('object' === 'object' && 'object' === 'object') {
                module.exports = global.document ?
                    factory(global, true) :
                    function (w) {
                        if (!w.document) {
                            throw new Error('SUNEDITOR_MODULES a window with a document');
                        }
                        return factory(w);
                    };
            }
            else {
                factory(global);
            }
        }(typeof window !== 'undefined' ? window : commonjsGlobal, function (window, noGlobal) {
            var dialog = {
                name: 'dialog',
                /**
                 * @description Constructor
                 * @param {Object} core Core object
                 */
                add: function (core) {
                    var context = core.context;
                    context.dialog = {
                        kind: '',
                        updateModal: false,
                        _closeSignal: false
                    };
                    /** dialog */
                    var dialog_div = core.util.createElement('DIV');
                    dialog_div.className = 'se-dialog sun-editor-common';
                    var dialog_back = core.util.createElement('DIV');
                    dialog_back.className = 'se-dialog-back';
                    dialog_back.style.display = 'none';
                    var dialog_area = core.util.createElement('DIV');
                    dialog_area.className = 'se-dialog-inner';
                    dialog_area.style.display = 'none';
                    dialog_div.appendChild(dialog_back);
                    dialog_div.appendChild(dialog_area);
                    context.dialog.modalArea = dialog_div;
                    context.dialog.back = dialog_back;
                    context.dialog.modal = dialog_area;
                    /** add event listeners */
                    context.dialog.modal.addEventListener('mousedown', this._onMouseDown_dialog.bind(core));
                    context.dialog.modal.addEventListener('click', this._onClick_dialog.bind(core));
                    /** append html */
                    context.element.relative.appendChild(dialog_div);
                    /** empty memory */
                    dialog_div = null, dialog_back = null, dialog_area = null;
                },
                /**
                 * @description Event to control the behavior of closing the dialog
                 * @param {MouseEvent} e Event object
                 * @private
                 */
                _onMouseDown_dialog: function (e) {
                    if (/se-dialog-inner/.test(e.target.className)) {
                        this.context.dialog._closeSignal = true;
                    }
                    else {
                        this.context.dialog._closeSignal = false;
                    }
                },
                /**
                 * @description Event to close the window when the outside area of the dialog or close button is click
                 * @param {MouseEvent} e Event object
                 * @private
                 */
                _onClick_dialog: function (e) {
                    if (/close/.test(e.target.getAttribute('data-command')) || this.context.dialog._closeSignal) {
                        this.plugins.dialog.close.call(this);
                    }
                },
                /**
                 * @description Open a Dialog plugin
                 * @param {String} kind Dialog plugin name
                 * @param {Boolean} update Whether it will open for update ('image' === this.currentControllerName)
                 */
                open: function (kind, update) {
                    if (this.modalForm)
                        return false;
                    if (this.plugins.dialog._bindClose) {
                        this._d.removeEventListener('keydown', this.plugins.dialog._bindClose);
                        this.plugins.dialog._bindClose = null;
                    }
                    this.plugins.dialog._bindClose = function (e) {
                        if (!/27/.test(e.keyCode))
                            return;
                        this.plugins.dialog.close.call(this);
                    }.bind(this);
                    this._d.addEventListener('keydown', this.plugins.dialog._bindClose);
                    this.context.dialog.updateModal = update;
                    if (this.options.popupDisplay === 'full') {
                        this.context.dialog.modalArea.style.position = 'fixed';
                    }
                    else {
                        this.context.dialog.modalArea.style.position = 'absolute';
                    }
                    this.context.dialog.kind = kind;
                    this.modalForm = this.context[kind].modal;
                    var focusElement = this.context[kind].focusElement;
                    if (typeof this.plugins[kind].on === 'function')
                        this.plugins[kind].on.call(this, update);
                    this.context.dialog.modalArea.style.display = 'block';
                    this.context.dialog.back.style.display = 'block';
                    this.context.dialog.modal.style.display = 'block';
                    this.modalForm.style.display = 'block';
                    if (focusElement)
                        focusElement.focus();
                },
                _bindClose: null,
                /**
                 * @description Close a Dialog plugin
                 * The plugin's "init" method is called.
                 */
                close: function () {
                    if (this.plugins.dialog._bindClose) {
                        this._d.removeEventListener('keydown', this.plugins.dialog._bindClose);
                        this.plugins.dialog._bindClose = null;
                    }
                    var kind = this.context.dialog.kind;
                    this.modalForm.style.display = 'none';
                    this.context.dialog.back.style.display = 'none';
                    this.context.dialog.modalArea.style.display = 'none';
                    this.context.dialog.updateModal = false;
                    if (typeof this.plugins[kind].init === 'function')
                        this.plugins[kind].init.call(this);
                    this.context.dialog.kind = '';
                    this.modalForm = null;
                    this.focus();
                }
            };
            if (typeof noGlobal === typeof undefined) {
                if (!window.SUNEDITOR_MODULES) {
                    Object.defineProperty(window, 'SUNEDITOR_MODULES', {
                        enumerable: true,
                        writable: false,
                        configurable: false,
                        value: {}
                    });
                }
                Object.defineProperty(window.SUNEDITOR_MODULES, 'dialog', {
                    enumerable: true,
                    writable: false,
                    configurable: false,
                    value: dialog
                });
            }
            return dialog;
        }));
    }(dialog$1));
    var dialog = dialog$1.exports;

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2018 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var selectMenu = {
        name: 'selectMenu',
        add: function (core) {
            core.context.selectMenu = {
                caller: {},
                callerContext: null
            };
        },
        setForm: function () {
            return '<div class="se-select-list"></div>';
        },
        createList: function (listContext, items, html) {
            listContext.form.innerHTML = '<ul>' + html + '</ul>';
            listContext.items = items;
            listContext.menus = listContext.form.querySelectorAll('li');
        },
        initEvent: function (pluginName, forms) {
            var form = forms.querySelector('.se-select-list');
            var context = this.context.selectMenu.caller[pluginName] = {
                form: form,
                items: [],
                menus: [],
                index: -1,
                item: null,
                clickMethod: null,
                callerName: pluginName
            };
            form.addEventListener('mousedown', this.plugins.selectMenu.onMousedown_list);
            form.addEventListener('mousemove', this.plugins.selectMenu.onMouseMove_list.bind(this, context));
            form.addEventListener('click', this.plugins.selectMenu.onClick_list.bind(this, context));
        },
        onMousedown_list: function (e) {
            e.preventDefault();
            e.stopPropagation();
        },
        onMouseMove_list: function (context, e) {
            this.util.addClass(context.form, '__se_select-menu-mouse-move');
            var index = e.target.getAttribute('data-index');
            if (!index)
                return;
            context.index = index * 1;
        },
        onClick_list: function (context, e) {
            var index = e.target.getAttribute('data-index');
            if (!index)
                return;
            context.clickMethod.call(this, context.items[index]);
        },
        moveItem: function (listContext, num) {
            this.util.removeClass(listContext.form, '__se_select-menu-mouse-move');
            num = listContext.index + num;
            var menus = listContext.menus;
            var len = menus.length;
            var selectIndex = listContext.index = num >= len ? 0 : num < 0 ? len - 1 : num;
            for (var i = 0; i < len; i++) {
                if (i === selectIndex) {
                    this.util.addClass(menus[i], 'active');
                }
                else {
                    this.util.removeClass(menus[i], 'active');
                }
            }
            listContext.item = listContext.items[selectIndex];
        },
        getItem: function (listContext, index) {
            index = (!index || index < 0) ? listContext.index : index;
            return listContext.items[index];
        },
        on: function (callerName, clickMethod) {
            var listContext = this.context.selectMenu.caller[callerName];
            this.context.selectMenu.callerContext = listContext;
            listContext.clickMethod = clickMethod;
            listContext.callerName = callerName;
        },
        open: function (listContext, positionHandler) {
            var form = listContext.form;
            form.style.visibility = 'hidden';
            form.style.display = 'block';
            positionHandler(form);
            form.style.visibility = '';
        },
        close: function (listContext) {
            listContext.form.style.display = 'none';
            listContext.items = [];
            listContext.menus = [];
            listContext.index = -1;
            listContext.item = null;
        },
        init: function (listContext) {
            if (!listContext)
                return;
            listContext.items = [];
            listContext.menus = [];
            listContext.index = -1;
            listContext.item = null;
            listContext.callerName = '';
            this.context.selectMenu.callerContext = null;
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var anchor = {
        name: 'anchor',
        add: function (core) {
            core.addModule([selectMenu]);
            core.context.anchor = {
                caller: {},
                forms: this.setDialogForm(core),
                host: (core._w.location.origin + core._w.location.pathname).replace(/\/$/, ''),
                callerContext: null
            };
        },
        /** dialog */
        setDialogForm: function (core) {
            var lang = core.lang;
            var relList = core.options.linkRel;
            var defaultRel = (core.options.linkRelDefault.default || '').split(' ');
            var icons = core.icons;
            var forms = core.util.createElement('DIV');
            var html = '<div class="se-dialog-body">' +
                '<div class="se-dialog-form">' +
                '<label>' + lang.dialogBox.linkBox.url + '</label>' +
                '<div class="se-dialog-form-files">' +
                '<input class="se-input-form se-input-url" type="text" placeholder="' + (core.options.protocol || '') + '" />' +
                '<button type="button" class="se-btn se-dialog-files-edge-button _se_bookmark_button" title="' + lang.dialogBox.linkBox.bookmark + '">' + icons.bookmark + '</button>' +
                core.plugins.selectMenu.setForm() +
                '</div>' +
                '<div class="se-anchor-preview-form">' +
                '<span class="se-svg se-anchor-preview-icon _se_anchor_bookmark_icon">' + icons.bookmark + '</span>' +
                '<span class="se-svg se-anchor-preview-icon _se_anchor_download_icon">' + icons.download + '</span>' +
                '<pre class="se-link-preview"></pre>' +
                '</div>' +
                '</div>' +
                '<div class="se-dialog-form">' +
                '<label>' + lang.dialogBox.linkBox.text + '</label><input class="se-input-form _se_anchor_text" type="text" />' +
                '</div>' +
                '<div class="se-dialog-form-footer">' +
                '<label><input type="checkbox" class="se-dialog-btn-check _se_anchor_check" />&nbsp;' + lang.dialogBox.linkBox.newWindowCheck + '</label>' +
                '<label><input type="checkbox" class="se-dialog-btn-check _se_anchor_download" />&nbsp;' + lang.dialogBox.linkBox.downloadLinkCheck + '</label>';
            if (relList.length > 0) {
                html += '<div class="se-anchor-rel"><button type="button" class="se-btn se-btn-select se-anchor-rel-btn">&lt;rel&gt;</button>' +
                    '<div class="se-anchor-rel-wrapper"><pre class="se-link-preview se-anchor-rel-preview"></pre></div>' +
                    '<div class="se-list-layer">' +
                    '<div class="se-list-inner">' +
                    '<ul class="se-list-basic se-list-checked">';
                for (var i = 0, len = relList.length, rel = void 0; i < len; i++) {
                    rel = relList[i];
                    html += '<li><button type="button" class="se-btn-list' + (defaultRel.indexOf(rel) > -1 ? ' se-checked' : '') + '" data-command="' + rel + '" title="' + rel + '"><span class="se-svg">' + icons.checked + '</span>' + rel + '</button></li>';
                }
                html += '</ul></div></div></div>';
            }
            html += '</div></div>';
            forms.innerHTML = html;
            return forms;
        },
        initEvent: function (pluginName, forms) {
            var anchorPlugin = this.plugins.anchor;
            var context = this.context.anchor.caller[pluginName] = {
                modal: forms,
                urlInput: null,
                linkDefaultRel: this.options.linkRelDefault,
                defaultRel: this.options.linkRelDefault.default || '',
                currentRel: [],
                linkAnchor: null,
                linkValue: '',
                _change: false,
                callerName: pluginName
            };
            if (typeof context.linkDefaultRel.default === 'string')
                context.linkDefaultRel.default = context.linkDefaultRel.default.trim();
            if (typeof context.linkDefaultRel.check_new_window === 'string')
                context.linkDefaultRel.check_new_window = context.linkDefaultRel.check_new_window.trim();
            if (typeof context.linkDefaultRel.check_bookmark === 'string')
                context.linkDefaultRel.check_bookmark = context.linkDefaultRel.check_bookmark.trim();
            context.urlInput = forms.querySelector('.se-input-url');
            context.anchorText = forms.querySelector('._se_anchor_text');
            context.newWindowCheck = forms.querySelector('._se_anchor_check');
            context.downloadCheck = forms.querySelector('._se_anchor_download');
            context.download = forms.querySelector('._se_anchor_download_icon');
            context.preview = forms.querySelector('.se-link-preview');
            context.bookmark = forms.querySelector('._se_anchor_bookmark_icon');
            context.bookmarkButton = forms.querySelector('._se_bookmark_button');
            this.plugins.selectMenu.initEvent.call(this, pluginName, forms);
            var listContext = this.context.selectMenu.caller[pluginName];
            /** rel */
            if (this.options.linkRel.length > 0) {
                context.relButton = forms.querySelector('.se-anchor-rel-btn');
                context.relList = forms.querySelector('.se-list-layer');
                context.relPreview = forms.querySelector('.se-anchor-rel-preview');
                context.relButton.addEventListener('click', anchorPlugin.onClick_relButton.bind(this, context));
                context.relList.addEventListener('click', anchorPlugin.onClick_relList.bind(this, context));
            }
            context.newWindowCheck.addEventListener('change', anchorPlugin.onChange_newWindowCheck.bind(this, context));
            context.downloadCheck.addEventListener('change', anchorPlugin.onChange_downloadCheck.bind(this, context));
            context.anchorText.addEventListener('input', anchorPlugin.onChangeAnchorText.bind(this, context));
            context.urlInput.addEventListener('input', anchorPlugin.onChangeUrlInput.bind(this, context));
            context.urlInput.addEventListener('keydown', anchorPlugin.onKeyDownUrlInput.bind(this, listContext));
            context.urlInput.addEventListener('focus', anchorPlugin.onFocusUrlInput.bind(this, context, listContext));
            context.urlInput.addEventListener('blur', anchorPlugin.onBlurUrlInput.bind(this, listContext));
            context.bookmarkButton.addEventListener('click', anchorPlugin.onClick_bookmarkButton.bind(this, context));
        },
        on: function (contextAnchor, update) {
            if (!update) {
                this.plugins.anchor.init.call(this, contextAnchor);
                contextAnchor.anchorText.value = this.getSelection().toString();
            }
            else if (contextAnchor.linkAnchor) {
                this.context.dialog.updateModal = true;
                var href = contextAnchor.linkAnchor.href;
                contextAnchor.linkValue = contextAnchor.preview.textContent = contextAnchor.urlInput.value = /\#.+$/.test(href) ? href.substr(href.lastIndexOf('#')) : href;
                contextAnchor.anchorText.value = contextAnchor.linkAnchor.textContent.trim() || contextAnchor.linkAnchor.getAttribute('alt');
                contextAnchor.newWindowCheck.checked = (/_blank/i.test(contextAnchor.linkAnchor.target) ? true : false);
                contextAnchor.downloadCheck.checked = contextAnchor.linkAnchor.download;
            }
            this.context.anchor.callerContext = contextAnchor;
            this.plugins.anchor.setRel.call(this, contextAnchor, (update && contextAnchor.linkAnchor) ? contextAnchor.linkAnchor.rel : contextAnchor.defaultRel);
            this.plugins.anchor.setLinkPreview.call(this, contextAnchor, contextAnchor.linkValue);
            this.plugins.selectMenu.on.call(this, contextAnchor.callerName, this.plugins.anchor.setHeaderBookmark);
        },
        _closeRelMenu: null,
        toggleRelList: function (contextAnchor, show) {
            if (!show) {
                if (this.plugins.anchor._closeRelMenu)
                    this.plugins.anchor._closeRelMenu();
            }
            else {
                var target = contextAnchor.relButton;
                var relList = contextAnchor.relList;
                this.util.addClass(target, 'active');
                relList.style.visibility = 'hidden';
                relList.style.display = 'block';
                if (!this.options.rtl)
                    relList.style.left = (target.offsetLeft + target.offsetWidth + 1) + 'px';
                else
                    relList.style.left = (target.offsetLeft - relList.offsetWidth - 1) + 'px';
                relList.style.top = (target.offsetTop + (target.offsetHeight / 2) - (relList.offsetHeight / 2)) + 'px';
                relList.style.visibility = '';
                this.plugins.anchor._closeRelMenu = function (context, target, e) {
                    if (e && (context.relButton.contains(e.target) || context.relList.contains(e.target)))
                        return;
                    this.util.removeClass(target, 'active');
                    context.relList.style.display = 'none';
                    this.modalForm.removeEventListener('click', this.plugins.anchor._closeRelMenu);
                    this.plugins.anchor._closeRelMenu = null;
                }.bind(this, contextAnchor, target);
                this.modalForm.addEventListener('click', this.plugins.anchor._closeRelMenu);
            }
        },
        onClick_relButton: function (contextAnchor, e) {
            this.plugins.anchor.toggleRelList.call(this, contextAnchor, !this.util.hasClass(e.target, 'active'));
        },
        onClick_relList: function (contextAnchor, e) {
            var target = e.target;
            var cmd = target.getAttribute('data-command');
            if (!cmd)
                return;
            var current = contextAnchor.currentRel;
            var checked = this.util.toggleClass(target, 'se-checked');
            var index = current.indexOf(cmd);
            if (checked) {
                if (index === -1)
                    current.push(cmd);
            }
            else {
                if (index > -1)
                    current.splice(index, 1);
            }
            contextAnchor.relPreview.title = contextAnchor.relPreview.textContent = current.join(' ');
        },
        setRel: function (contextAnchor, relAttr) {
            var relListEl = contextAnchor.relList;
            var rels = contextAnchor.currentRel = !relAttr ? [] : relAttr.split(' ');
            if (!relListEl)
                return;
            var checkedRel = relListEl.querySelectorAll('button');
            for (var i = 0, len = checkedRel.length, cmd = void 0; i < len; i++) {
                cmd = checkedRel[i].getAttribute('data-command');
                if (rels.indexOf(cmd) > -1) {
                    this.util.addClass(checkedRel[i], 'se-checked');
                }
                else {
                    this.util.removeClass(checkedRel[i], 'se-checked');
                }
            }
            contextAnchor.relPreview.title = contextAnchor.relPreview.textContent = rels.join(' ');
        },
        createHeaderList: function (contextAnchor, contextList, urlValue) {
            var headers = this.util.getListChildren(this.context.element.wysiwyg, function (current) {
                return /h[1-6]/i.test(current.nodeName);
            });
            if (headers.length === 0)
                return;
            var valueRegExp = new this._w.RegExp('^' + urlValue.replace(/^#/, ''), 'i');
            var list = [];
            var html = '';
            for (var i = 0, len = headers.length, h = void 0; i < len; i++) {
                h = headers[i];
                if (!valueRegExp.test(h.textContent))
                    continue;
                list.push(h);
                html += '<li class="se-select-item" data-index="' + i + '">' + h.textContent + '</li>';
            }
            if (list.length === 0) {
                this.plugins.selectMenu.close.call(this, contextList);
            }
            else {
                this.plugins.selectMenu.createList(contextList, list, html);
                this.plugins.selectMenu.open.call(this, contextList, this.plugins.anchor._setMenuListPosition.bind(this, contextAnchor));
            }
        },
        _setMenuListPosition: function (contextAnchor, list) {
            list.style.top = (contextAnchor.urlInput.offsetHeight + 1) + 'px';
        },
        onKeyDownUrlInput: function (contextList, e) {
            var keyCode = e.keyCode;
            switch (keyCode) {
                case 38: // up
                    e.preventDefault();
                    e.stopPropagation();
                    this.plugins.selectMenu.moveItem.call(this, contextList, -1);
                    break;
                case 40: // down
                    e.preventDefault();
                    e.stopPropagation();
                    this.plugins.selectMenu.moveItem.call(this, contextList, 1);
                    break;
                case 13: // enter
                    if (contextList.index > -1) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.plugins.anchor.setHeaderBookmark.call(this, this.plugins.selectMenu.getItem(contextList, null));
                    }
                    break;
            }
        },
        setHeaderBookmark: function (header) {
            var contextAnchor = this.context.anchor.callerContext;
            var id = header.id || 'h_' + this._w.Math.random().toString().replace(/.+\./, '');
            header.id = id;
            contextAnchor.urlInput.value = '#' + id;
            if (!contextAnchor.anchorText.value.trim() || !contextAnchor._change) {
                contextAnchor.anchorText.value = header.textContent;
            }
            this.plugins.anchor.setLinkPreview.call(this, contextAnchor, contextAnchor.urlInput.value);
            this.plugins.selectMenu.close.call(this, this.context.selectMenu.callerContext);
            this.context.anchor.callerContext.urlInput.focus();
        },
        onChangeAnchorText: function (contextAnchor, e) {
            contextAnchor._change = !!e.target.value.trim();
        },
        onChangeUrlInput: function (contextAnchor, e) {
            var value = e.target.value.trim();
            this.plugins.anchor.setLinkPreview.call(this, contextAnchor, value);
            if (/^#/.test(value))
                this.plugins.anchor.createHeaderList.call(this, contextAnchor, this.context.selectMenu.callerContext, value);
            else
                this.plugins.selectMenu.close.call(this, this.context.selectMenu.callerContext);
        },
        onFocusUrlInput: function (contextAnchor, contextLink) {
            var value = contextAnchor.urlInput.value;
            if (/^#/.test(value))
                this.plugins.anchor.createHeaderList.call(this, contextAnchor, contextLink, value);
        },
        onBlurUrlInput: function (contextList) {
            this.plugins.selectMenu.close.call(this, contextList);
        },
        setLinkPreview: function (context, value) {
            var preview = context.preview;
            var protocol = this.options.linkProtocol;
            var reservedProtocol = /^(mailto\:|tel\:|sms\:|https*\:\/\/|#)/.test(value);
            var sameProtocol = !protocol ? false : this._w.RegExp('^' + value.substr(0, protocol.length)).test(protocol);
            context.linkValue = preview.textContent = !value ? '' : (protocol && !reservedProtocol && !sameProtocol) ? protocol + value : reservedProtocol ? value : /^www\./.test(value) ? 'http://' + value : this.context.anchor.host + (/^\//.test(value) ? '' : '/') + value;
            if (value.indexOf('#') === 0) {
                context.bookmark.style.display = 'block';
                this.util.addClass(context.bookmarkButton, 'active');
            }
            else {
                context.bookmark.style.display = 'none';
                this.util.removeClass(context.bookmarkButton, 'active');
            }
            if (value.indexOf('#') === -1 && context.downloadCheck.checked) {
                context.download.style.display = 'block';
            }
            else {
                context.download.style.display = 'none';
            }
        },
        setCtx: function (anchor, contextAnchor) {
            if (!anchor)
                return;
            contextAnchor.linkAnchor = anchor;
            contextAnchor.linkValue = anchor.href;
            contextAnchor.currentRel = anchor.rel.split(" ");
        },
        updateAnchor: function (anchor, url, alt, contextAnchor, notText) {
            // download
            if (!/^\#/.test(url) && contextAnchor.downloadCheck.checked) {
                anchor.setAttribute('download', alt || url);
            }
            else {
                anchor.removeAttribute('download');
            }
            // new window
            if (contextAnchor.newWindowCheck.checked)
                anchor.target = '_blank';
            else
                anchor.removeAttribute('target');
            // rel
            var rel = contextAnchor.currentRel.join(' ');
            if (!rel)
                anchor.removeAttribute('rel');
            else
                anchor.rel = rel;
            // est url, alt
            anchor.href = url;
            anchor.setAttribute('alt', alt);
            if (notText) {
                if (anchor.children.length === 0)
                    anchor.textContent = '';
            }
            else {
                anchor.textContent = alt;
            }
        },
        createAnchor: function (contextAnchor, notText) {
            if (contextAnchor.linkValue.length === 0)
                return null;
            var url = contextAnchor.linkValue;
            var anchor = contextAnchor.anchorText;
            var anchorText = anchor.value.length === 0 ? url : anchor.value;
            var oA = contextAnchor.linkAnchor || this.util.createElement('A');
            this.plugins.anchor.updateAnchor(oA, url, anchorText, contextAnchor, notText);
            contextAnchor.linkValue = contextAnchor.preview.textContent = contextAnchor.urlInput.value = contextAnchor.anchorText.value = '';
            return oA;
        },
        onClick_bookmarkButton: function (contextAnchor) {
            var url = contextAnchor.urlInput.value;
            if (/^\#/.test(url)) {
                url = url.substr(1);
                contextAnchor.bookmark.style.display = 'none';
                this.util.removeClass(contextAnchor.bookmarkButton, 'active');
                this.plugins.selectMenu.close.call(this, this.context.selectMenu.callerContext);
            }
            else {
                url = '#' + url;
                contextAnchor.bookmark.style.display = 'block';
                this.util.addClass(contextAnchor.bookmarkButton, 'active');
                contextAnchor.downloadCheck.checked = false;
                contextAnchor.download.style.display = 'none';
                this.plugins.anchor.createHeaderList.call(this, contextAnchor, this.context.selectMenu.callerContext, url);
            }
            contextAnchor.urlInput.value = url;
            this.plugins.anchor.setLinkPreview.call(this, contextAnchor, url);
            contextAnchor.urlInput.focus();
        },
        onChange_newWindowCheck: function (contextAnchor, e) {
            if (typeof contextAnchor.linkDefaultRel.check_new_window !== 'string')
                return;
            if (e.target.checked) {
                this.plugins.anchor.setRel.call(this, contextAnchor, this.plugins.anchor._relMerge.call(this, contextAnchor, contextAnchor.linkDefaultRel.check_new_window));
            }
            else {
                this.plugins.anchor.setRel.call(this, contextAnchor, this.plugins.anchor._relDelete.call(this, contextAnchor, contextAnchor.linkDefaultRel.check_new_window));
            }
        },
        onChange_downloadCheck: function (contextAnchor, e) {
            if (e.target.checked) {
                contextAnchor.download.style.display = 'block';
                contextAnchor.bookmark.style.display = 'none';
                this.util.removeClass(contextAnchor.bookmarkButton, 'active');
                contextAnchor.linkValue = contextAnchor.preview.textContent = contextAnchor.urlInput.value = contextAnchor.urlInput.value.replace(/^\#+/, '');
                if (typeof contextAnchor.linkDefaultRel.check_bookmark === 'string') {
                    this.plugins.anchor.setRel.call(this, contextAnchor, this.plugins.anchor._relMerge.call(this, contextAnchor, contextAnchor.linkDefaultRel.check_bookmark));
                }
            }
            else {
                contextAnchor.download.style.display = 'none';
                if (typeof contextAnchor.linkDefaultRel.check_bookmark === 'string') {
                    this.plugins.anchor.setRel.call(this, contextAnchor, this.plugins.anchor._relDelete.call(this, contextAnchor, contextAnchor.linkDefaultRel.check_bookmark));
                }
            }
        },
        _relMerge: function (contextAnchor, relAttr) {
            var current = contextAnchor.currentRel;
            if (!relAttr)
                return current.join(' ');
            if (/^only\:/.test(relAttr)) {
                relAttr = relAttr.replace(/^only\:/, '').trim();
                contextAnchor.currentRel = relAttr.split(' ');
                return relAttr;
            }
            var rels = relAttr.split(' ');
            for (var i = 0, len = rels.length, index = void 0; i < len; i++) {
                index = current.indexOf(rels[i]);
                if (index === -1)
                    current.push(rels[i]);
            }
            return current.join(' ');
        },
        _relDelete: function (contextAnchor, relAttr) {
            if (!relAttr)
                return contextAnchor.currentRel.join(' ');
            if (/^only\:/.test(relAttr))
                relAttr = relAttr.replace(/^only\:/, '').trim();
            var rels = contextAnchor.currentRel.join(' ').replace(this._w.RegExp(relAttr + '\\s*'), '');
            contextAnchor.currentRel = rels.split(' ');
            return rels;
        },
        init: function (contextAnchor) {
            contextAnchor.linkAnchor = null;
            contextAnchor.linkValue = contextAnchor.preview.textContent = contextAnchor.urlInput.value = '';
            contextAnchor.anchorText.value = '';
            contextAnchor.newWindowCheck.checked = false;
            contextAnchor.downloadCheck.checked = false;
            contextAnchor._change = false;
            this.plugins.anchor.setRel.call(this, contextAnchor, contextAnchor.defaultRel);
            if (contextAnchor.relList) {
                this.plugins.anchor.toggleRelList.call(this, contextAnchor, false);
            }
            this.context.anchor.callerContext = null;
            this.plugins.selectMenu.init.call(this, this.context.selectMenu.callerContext);
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var link = {
        name: 'link',
        display: 'dialog',
        add: function (core) {
            core.addModule([dialog, anchor]);
            var context = core.context;
            var contextLink = context.link = {
                focusElement: null,
                _linkAnchor: null,
                anchorCtx: null
            };
            /** link dialog */
            var link_dialog = this.setDialog(core);
            contextLink.modal = link_dialog;
            /** link controller */
            var link_controller = this.setController_LinkButton(core);
            contextLink.linkController = link_controller;
            link_dialog.querySelector('form').addEventListener('submit', this.submit.bind(core));
            link_controller.addEventListener('click', this.onClick_linkController.bind(core));
            /** append html */
            context.dialog.modal.appendChild(link_dialog);
            /** append controller */
            context.element.relative.appendChild(link_controller);
            /** link event */
            core.plugins.anchor.initEvent.call(core, 'link', link_dialog);
            contextLink.focusElement = context.anchor.caller.link.urlInput;
            /** empty memory */
            link_dialog = null, link_controller = null;
        },
        /** dialog */
        setDialog: function (core) {
            var lang = core.lang;
            var dialog = core.util.createElement('DIV');
            var icons = core.icons;
            dialog.className = 'se-dialog-content';
            dialog.style.display = 'none';
            var html = '' +
                '<form>' +
                '<div class="se-dialog-header">' +
                '<button type="button" data-command="close" class="se-btn se-dialog-close" aria-label="Close" title="' + lang.dialogBox.close + '">' +
                icons.cancel +
                '</button>' +
                '<span class="se-modal-title">' + lang.dialogBox.linkBox.title + '</span>' +
                '</div>' +
                core.context.anchor.forms.innerHTML +
                '<div class="se-dialog-footer">' +
                '<button type="submit" class="se-btn-primary" title="' + lang.dialogBox.submitButton + '"><span>' + lang.dialogBox.submitButton + '</span></button>' +
                '</div>' +
                '</form>';
            dialog.innerHTML = html;
            return dialog;
        },
        /** modify controller button */
        setController_LinkButton: function (core) {
            var lang = core.lang;
            var icons = core.icons;
            var link_btn = core.util.createElement('DIV');
            link_btn.className = 'se-controller se-controller-link';
            link_btn.innerHTML = '' +
                '<div class="se-arrow se-arrow-up"></div>' +
                '<div class="link-content"><span><a target="_blank" href=""></a>&nbsp;</span>' +
                '<div class="se-btn-group">' +
                '<button type="button" data-command="update" tabindex="-1" class="se-btn se-tooltip">' +
                icons.edit +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.edit + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="unlink" tabindex="-1" class="se-btn se-tooltip">' +
                icons.unlink +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.unlink + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="delete" tabindex="-1" class="se-btn se-tooltip">' +
                icons.delete +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.remove + '</span></span>' +
                '</button>' +
                '</div>' +
                '</div>';
            return link_btn;
        },
        /**
         * @Override dialog
         */
        open: function () {
            this.plugins.dialog.open.call(this, 'link', 'link' === this.currentControllerName);
        },
        submit: function (e) {
            this.showLoading();
            e.preventDefault();
            e.stopPropagation();
            try {
                var oA = this.plugins.anchor.createAnchor.call(this, this.context.anchor.caller.link, false);
                if (!this.context.dialog.updateModal) {
                    var selectedFormats = this.getSelectedElements();
                    if (selectedFormats.length > 1) {
                        var oFormat = this.util.createElement(selectedFormats[0].nodeName);
                        oFormat.appendChild(oA);
                        if (!this.insertNode(oFormat, null, true))
                            return;
                    }
                    else {
                        if (!this.insertNode(oA, null, true))
                            return;
                    }
                    this.setRange(oA.childNodes[0], 0, oA.childNodes[0], oA.textContent.length);
                }
                else {
                    // set range
                    var textNode = this.context.link._linkAnchor.childNodes[0];
                    this.setRange(textNode, 0, textNode, textNode.textContent.length);
                }
            }
            finally {
                this.plugins.dialog.close.call(this);
                this.closeLoading();
                // history stack
                this.history.push(false);
            }
            return false;
        },
        /**
         * @Override core
         */
        active: function (element) {
            if (!element) {
                if (this.controllerArray.indexOf(this.context.link.linkController) > -1) {
                    this.controllersOff();
                }
            }
            else if (this.util.isAnchor(element) && element.getAttribute('data-image-link') === null) {
                if (this.controllerArray.indexOf(this.context.link.linkController) < 0) {
                    this.plugins.link.call_controller.call(this, element);
                }
                return true;
            }
            return false;
        },
        /**
         * @Override dialog
         */
        on: function (update) {
            this.plugins.anchor.on.call(this, this.context.anchor.caller.link, update);
        },
        call_controller: function (selectionATag) {
            this.editLink = this.context.link._linkAnchor = this.context.anchor.caller.link.linkAnchor = selectionATag;
            var linkBtn = this.context.link.linkController;
            var link = linkBtn.querySelector('a');
            link.href = selectionATag.href;
            link.title = selectionATag.textContent;
            link.textContent = selectionATag.textContent;
            this.util.addClass(selectionATag, 'on');
            this.setControllerPosition(linkBtn, selectionATag, 'bottom', { left: 0, top: 0 });
            this.controllersOn(linkBtn, selectionATag, 'link', this.util.removeClass.bind(this.util, this.context.link._linkAnchor, 'on'));
        },
        onClick_linkController: function (e) {
            e.stopPropagation();
            var command = e.target.getAttribute('data-command') || e.target.parentNode.getAttribute('data-command');
            if (!command)
                return;
            e.preventDefault();
            if (/update/.test(command)) {
                this.plugins.dialog.open.call(this, 'link', true);
            }
            else if (/unlink/.test(command)) {
                var sc = this.util.getChildElement(this.context.link._linkAnchor, function (current) { return current.childNodes.length === 0 || current.nodeType === 3; }, false);
                var ec = this.util.getChildElement(this.context.link._linkAnchor, function (current) { return current.childNodes.length === 0 || current.nodeType === 3; }, true);
                this.setRange(sc, 0, ec, ec.textContent.length);
                this.nodeChange(null, null, ['A'], false);
            }
            else {
                /** delete */
                this.util.removeItem(this.context.link._linkAnchor);
                this.context.anchor.caller.link.linkAnchor = null;
                this.focus();
                // history stack
                this.history.push(false);
            }
            this.controllersOff();
        },
        /**
         * @Override dialog
         */
        init: function () {
            this.context.link.linkController.style.display = 'none';
            this.plugins.anchor.init.call(this, this.context.anchor.caller.link);
        }
    };

    var component$1 = { exports: {} };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    (function (module) {
        'use strict';
        (function (global, factory) {
            if ('object' === 'object' && 'object' === 'object') {
                module.exports = global.document ?
                    factory(global, true) :
                    function (w) {
                        if (!w.document) {
                            throw new Error('SUNEDITOR_MODULES a window with a document');
                        }
                        return factory(w);
                    };
            }
            else {
                factory(global);
            }
        }(typeof window !== 'undefined' ? window : commonjsGlobal, function (window, noGlobal) {
            var component = {
                name: 'component',
                /**
                 * @description Create a container for the resizing component and insert the element.
                 * @param {Element} cover Cover element (FIGURE)
                 * @param {String} className Class name of container (fixed: se-component)
                 * @returns {Element} Created container element
                 */
                set_container: function (cover, className) {
                    var container = this.util.createElement('DIV');
                    container.className = 'se-component ' + className;
                    container.setAttribute('contenteditable', false);
                    container.appendChild(cover);
                    return container;
                },
                /**
                 * @description Cover the target element with a FIGURE element.
                 * @param {Element} element Target element
                 */
                set_cover: function (element) {
                    var cover = this.util.createElement('FIGURE');
                    cover.appendChild(element);
                    return cover;
                },
                /**
                 * @description Return HTML string of caption(FIGCAPTION) element
                 * @returns {String}
                 */
                create_caption: function () {
                    var caption = this.util.createElement('FIGCAPTION');
                    caption.setAttribute('contenteditable', true);
                    caption.innerHTML = '<div>' + this.lang.dialogBox.caption + '</div>';
                    return caption;
                }
            };
            if (typeof noGlobal === typeof undefined) {
                if (!window.SUNEDITOR_MODULES) {
                    Object.defineProperty(window, 'SUNEDITOR_MODULES', {
                        enumerable: true,
                        writable: false,
                        configurable: false,
                        value: {}
                    });
                }
                Object.defineProperty(window.SUNEDITOR_MODULES, 'component', {
                    enumerable: true,
                    writable: false,
                    configurable: false,
                    value: component
                });
            }
            return component;
        }));
    }(component$1));
    var component = component$1.exports;

    var resizing$1 = { exports: {} };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    (function (module) {
        'use strict';
        (function (global, factory) {
            if ('object' === 'object' && 'object' === 'object') {
                module.exports = global.document ?
                    factory(global, true) :
                    function (w) {
                        if (!w.document) {
                            throw new Error('SUNEDITOR_MODULES a window with a document');
                        }
                        return factory(w);
                    };
            }
            else {
                factory(global);
            }
        }(typeof window !== 'undefined' ? window : commonjsGlobal, function (window, noGlobal) {
            var resizing = {
                name: 'resizing',
                /**
                 * @description Constructor
                 * Require context properties when resizing module
                    inputX: Element,
                    inputY: Element,
                    _container: null,
                    _cover: null,
                    _element: null,
                    _element_w: 1,
                    _element_h: 1,
                    _element_l: 0,
                    _element_t: 0,
                    _defaultSizeX: 'auto',
                    _defaultSizeY: 'auto',
                    _origin_w: core.options.imageWidth === 'auto' ? '' : core.options.imageWidth,
                    _origin_h: core.options.imageHeight === 'auto' ? '' : core.options.imageHeight,
                    _proportionChecked: true,
                    // -- select function --
                    _resizing: core.options.imageResizing,
                    _resizeDotHide: !core.options.imageHeightShow,
                    _rotation: core.options.imageRotation,
                    _onlyPercentage: core.options.imageSizeOnlyPercentage,
                    _ratio: false,
                    _ratioX: 1,
                    _ratioY: 1
                    _captionShow: true,
                    // -- when used caption (_captionShow: true) --
                    _caption: null,
                    _captionChecked: false,
                    captionCheckEl: null,
                 * @param {Object} core Core object
                 */
                add: function (core) {
                    var icons = core.icons;
                    var context = core.context;
                    context.resizing = {
                        _resizeClientX: 0,
                        _resizeClientY: 0,
                        _resize_plugin: '',
                        _resize_w: 0,
                        _resize_h: 0,
                        _origin_w: 0,
                        _origin_h: 0,
                        _rotateVertical: false,
                        _resize_direction: '',
                        _move_path: null,
                        _isChange: false,
                        alignIcons: {
                            basic: icons.align_justify,
                            left: icons.align_left,
                            right: icons.align_right,
                            center: icons.align_center
                        }
                    };
                    /** resize controller, button */
                    var resize_div_container = this.setController_resize(core);
                    context.resizing.resizeContainer = resize_div_container;
                    context.resizing.resizeDiv = resize_div_container.querySelector('.se-modal-resize');
                    context.resizing.resizeDot = resize_div_container.querySelector('.se-resize-dot');
                    context.resizing.resizeDisplay = resize_div_container.querySelector('.se-resize-display');
                    var resize_button = this.setController_button(core);
                    context.resizing.resizeButton = resize_button;
                    var resize_handles = context.resizing.resizeHandles = context.resizing.resizeDot.querySelectorAll('span');
                    context.resizing.resizeButtonGroup = resize_button.querySelector('._se_resizing_btn_group');
                    context.resizing.rotationButtons = resize_button.querySelectorAll('._se_resizing_btn_group ._se_rotation');
                    context.resizing.percentageButtons = resize_button.querySelectorAll('._se_resizing_btn_group ._se_percentage');
                    context.resizing.alignMenu = resize_button.querySelector('.se-resizing-align-list');
                    context.resizing.alignMenuList = context.resizing.alignMenu.querySelectorAll('button');
                    context.resizing.alignButton = resize_button.querySelector('._se_resizing_align_button');
                    context.resizing.autoSizeButton = resize_button.querySelector('._se_resizing_btn_group ._se_auto_size');
                    context.resizing.captionButton = resize_button.querySelector('._se_resizing_caption_button');
                    /** add event listeners */
                    resize_div_container.addEventListener('mousedown', function (e) { e.preventDefault(); });
                    resize_handles[0].addEventListener('mousedown', this.onMouseDown_resize_handle.bind(core));
                    resize_handles[1].addEventListener('mousedown', this.onMouseDown_resize_handle.bind(core));
                    resize_handles[2].addEventListener('mousedown', this.onMouseDown_resize_handle.bind(core));
                    resize_handles[3].addEventListener('mousedown', this.onMouseDown_resize_handle.bind(core));
                    resize_handles[4].addEventListener('mousedown', this.onMouseDown_resize_handle.bind(core));
                    resize_handles[5].addEventListener('mousedown', this.onMouseDown_resize_handle.bind(core));
                    resize_handles[6].addEventListener('mousedown', this.onMouseDown_resize_handle.bind(core));
                    resize_handles[7].addEventListener('mousedown', this.onMouseDown_resize_handle.bind(core));
                    resize_button.addEventListener('click', this.onClick_resizeButton.bind(core));
                    /** append html */
                    context.element.relative.appendChild(resize_div_container);
                    context.element.relative.appendChild(resize_button);
                    /** empty memory */
                    resize_div_container = null, resize_button = null, resize_handles = null;
                },
                /** resize controller, button (image, iframe, video) */
                setController_resize: function (core) {
                    var resize_container = core.util.createElement('DIV');
                    resize_container.className = 'se-controller se-resizing-container';
                    resize_container.style.display = 'none';
                    resize_container.innerHTML = '' +
                        '<div class="se-modal-resize"></div>' +
                        '<div class="se-resize-dot">' +
                        '<span class="tl"></span>' +
                        '<span class="tr"></span>' +
                        '<span class="bl"></span>' +
                        '<span class="br"></span>' +
                        '<span class="lw"></span>' +
                        '<span class="th"></span>' +
                        '<span class="rw"></span>' +
                        '<span class="bh"></span>' +
                        '<div class="se-resize-display"></div>' +
                        '</div>';
                    return resize_container;
                },
                setController_button: function (core) {
                    var lang = core.lang;
                    var icons = core.icons;
                    var resize_button = core.util.createElement("DIV");
                    resize_button.className = "se-controller se-controller-resizing";
                    resize_button.innerHTML = '' +
                        '<div class="se-arrow se-arrow-up"></div>' +
                        '<div class="se-btn-group _se_resizing_btn_group">' +
                        '<button type="button" data-command="percent" data-value="1" class="se-tooltip _se_percentage">' +
                        '<span>100%</span>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.resize100 + '</span></span>' +
                        '</button>' +
                        '<button type="button" data-command="percent" data-value="0.75" class="se-tooltip _se_percentage">' +
                        '<span>75%</span>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.resize75 + '</span></span>' +
                        '</button>' +
                        '<button type="button" data-command="percent" data-value="0.5" class="se-tooltip _se_percentage">' +
                        '<span>50%</span>' +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.resize50 + '</span></span>' +
                        '</button>' +
                        '<button type="button" data-command="auto" class="se-btn se-tooltip _se_auto_size">' +
                        icons.auto_size +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.autoSize + '</span></span>' +
                        '</button>' +
                        '<button type="button" data-command="rotate" data-value="-90" class="se-btn se-tooltip _se_rotation">' +
                        icons.rotate_left +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.rotateLeft + '</span></span>' +
                        '</button>' +
                        '<button type="button" data-command="rotate" data-value="90" class="se-btn se-tooltip _se_rotation">' +
                        icons.rotate_right +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.rotateRight + '</span></span>' +
                        '</button>' +
                        '</div>' +
                        '<div class="se-btn-group" style="padding-top: 0;">' +
                        '<button type="button" data-command="mirror" data-value="h" class="se-btn se-tooltip">' +
                        icons.mirror_horizontal +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.mirrorHorizontal + '</span></span>' +
                        '</button>' +
                        '<button type="button" data-command="mirror" data-value="v" class="se-btn se-tooltip">' +
                        icons.mirror_vertical +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.mirrorVertical + '</span></span>' +
                        '</button>' +
                        '<button type="button" data-command="onalign" class="se-btn se-tooltip _se_resizing_align_button">' +
                        icons.align_justify +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.toolbar.align + '</span></span>' +
                        '</button>' +
                        '<div class="se-btn-group-sub sun-editor-common se-list-layer se-resizing-align-list">' +
                        '<div class="se-list-inner">' +
                        '<ul class="se-list-basic">' +
                        '<li><button type="button" class="se-btn-list se-tooltip" data-command="align" data-value="basic">' +
                        icons.align_justify +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.basic + '</span></span>' +
                        '</button></li>' +
                        '<li><button type="button" class="se-btn-list se-tooltip" data-command="align" data-value="left">' +
                        icons.align_left +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.left + '</span></span>' +
                        '</button></li>' +
                        '<li><button type="button" class="se-btn-list se-tooltip" data-command="align" data-value="center">' +
                        icons.align_center +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.center + '</span></span>' +
                        '</button></li>' +
                        '<li><button type="button" class="se-btn-list se-tooltip" data-command="align" data-value="right">' +
                        icons.align_right +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.right + '</span></span>' +
                        '</button></li>' +
                        '</ul>' +
                        '</div>' +
                        '</div>' +
                        '<button type="button" data-command="caption" class="se-btn se-tooltip _se_resizing_caption_button">' +
                        icons.caption +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.caption + '</span></span>' +
                        '</button>' +
                        '<button type="button" data-command="revert" class="se-btn se-tooltip">' +
                        icons.revert +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.dialogBox.revertButton + '</span></span>' +
                        '</button>' +
                        '<button type="button" data-command="update" class="se-btn se-tooltip">' +
                        icons.modify +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.edit + '</span></span>' +
                        '</button>' +
                        '<button type="button" data-command="delete" class="se-btn se-tooltip">' +
                        icons.delete +
                        '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.remove + '</span></span>' +
                        '</button>' +
                        '</div>';
                    return resize_button;
                },
                /**
                 * @description Gets the width size
                 * @param {Object} contextPlugin context object of plugin (core.context[plugin])
                 * @param {Element} element Target element
                 * @param {Element} cover Cover element (FIGURE)
                 * @param {Element} container Container element (DIV.se-component)
                 * @returns {String}
                 */
                _module_getSizeX: function (contextPlugin, element, cover, container) {
                    if (!element)
                        element = contextPlugin._element;
                    if (!cover)
                        cover = contextPlugin._cover;
                    if (!container)
                        container = contextPlugin._container;
                    if (!element)
                        return '';
                    return !/%$/.test(element.style.width) ? element.style.width : ((container && this.util.getNumber(container.style.width, 2)) || 100) + '%';
                },
                /**
                 * @description Gets the height size
                 * @param {Object} contextPlugin context object of plugin (core.context[plugin])
                 * @param {Element} element Target element
                 * @param {Element} cover Cover element (FIGURE)
                 * @param {Element} container Container element (DIV.se-component)
                 * @returns {String}
                 */
                _module_getSizeY: function (contextPlugin, element, cover, container) {
                    if (!element)
                        element = contextPlugin._element;
                    if (!cover)
                        cover = contextPlugin._cover;
                    if (!container)
                        container = contextPlugin._container;
                    if (!container || !cover)
                        return (element && element.style.height) || '';
                    return this.util.getNumber(cover.style.paddingBottom, 0) > 0 && !this.context.resizing._rotateVertical ? cover.style.height : (!/%$/.test(element.style.height) || !/%$/.test(element.style.width) ? element.style.height : ((container && this.util.getNumber(container.style.height, 2)) || 100) + '%');
                },
                /**
                 * @description Called at the "openModify" to put the size of the current target into the size input element.
                 * @param {Object} contextPlugin context object of plugin (core.context[plugin])
                 * @param {Object} pluginObj Plugin object
                 */
                _module_setModifyInputSize: function (contextPlugin, pluginObj) {
                    var percentageRotation = contextPlugin._onlyPercentage && this.context.resizing._rotateVertical;
                    contextPlugin.proportion.checked = contextPlugin._proportionChecked = contextPlugin._element.getAttribute('data-proportion') !== 'false';
                    var x = percentageRotation ? '' : this.plugins.resizing._module_getSizeX.call(this, contextPlugin);
                    if (x === contextPlugin._defaultSizeX)
                        x = '';
                    if (contextPlugin._onlyPercentage)
                        x = this.util.getNumber(x, 2);
                    contextPlugin.inputX.value = x;
                    pluginObj.setInputSize.call(this, 'x');
                    if (!contextPlugin._onlyPercentage) {
                        var y = percentageRotation ? '' : this.plugins.resizing._module_getSizeY.call(this, contextPlugin);
                        if (y === contextPlugin._defaultSizeY)
                            y = '';
                        if (contextPlugin._onlyPercentage)
                            y = this.util.getNumber(y, 2);
                        contextPlugin.inputY.value = y;
                    }
                    contextPlugin.inputX.disabled = percentageRotation ? true : false;
                    contextPlugin.inputY.disabled = percentageRotation ? true : false;
                    contextPlugin.proportion.disabled = percentageRotation ? true : false;
                    pluginObj.setRatio.call(this);
                },
                /**
                 * @description It is called in "setInputSize" (input tag keyupEvent),
                 * checks the value entered in the input tag,
                 * calculates the ratio, and sets the calculated value in the input tag of the opposite size.
                 * @param {Object} contextPlugin context object of plugin (core.context[plugin])
                 * @param {String} xy 'x': width, 'y': height
                 */
                _module_setInputSize: function (contextPlugin, xy) {
                    if (contextPlugin._onlyPercentage) {
                        if (xy === 'x' && contextPlugin.inputX.value > 100)
                            contextPlugin.inputX.value = 100;
                        return;
                    }
                    if (contextPlugin.proportion.checked && contextPlugin._ratio && /\d/.test(contextPlugin.inputX.value) && /\d/.test(contextPlugin.inputY.value)) {
                        var xUnit = contextPlugin.inputX.value.replace(/\d+|\./g, '') || contextPlugin.sizeUnit;
                        var yUnit = contextPlugin.inputY.value.replace(/\d+|\./g, '') || contextPlugin.sizeUnit;
                        if (xUnit !== yUnit)
                            return;
                        var dec = xUnit === '%' ? 2 : 0;
                        if (xy === 'x') {
                            contextPlugin.inputY.value = this.util.getNumber(contextPlugin._ratioY * this.util.getNumber(contextPlugin.inputX.value, dec), dec) + yUnit;
                        }
                        else {
                            contextPlugin.inputX.value = this.util.getNumber(contextPlugin._ratioX * this.util.getNumber(contextPlugin.inputY.value, dec), dec) + xUnit;
                        }
                    }
                },
                /**
                 * @description It is called in "setRatio" (input and proportionCheck tags changeEvent),
                 * checks the value of the input tag, calculates the ratio, and resets it in the input tag.
                 * @param {Object} contextPlugin context object of plugin (core.context[plugin])
                 */
                _module_setRatio: function (contextPlugin) {
                    var xValue = contextPlugin.inputX.value;
                    var yValue = contextPlugin.inputY.value;
                    if (contextPlugin.proportion.checked && /\d+/.test(xValue) && /\d+/.test(yValue)) {
                        var xUnit = xValue.replace(/\d+|\./g, '') || contextPlugin.sizeUnit;
                        var yUnit = yValue.replace(/\d+|\./g, '') || contextPlugin.sizeUnit;
                        if (xUnit !== yUnit) {
                            contextPlugin._ratio = false;
                        }
                        else if (!contextPlugin._ratio) {
                            var x = this.util.getNumber(xValue, 0);
                            var y = this.util.getNumber(yValue, 0);
                            contextPlugin._ratio = true;
                            contextPlugin._ratioX = x / y;
                            contextPlugin._ratioY = y / x;
                        }
                    }
                    else {
                        contextPlugin._ratio = false;
                    }
                },
                /**
                 * @description Revert size of element to origin size (plugin._origin_w, plugin._origin_h)
                 * @param {Object} contextPlugin context object of plugin (core.context[plugin])
                 */
                _module_sizeRevert: function (contextPlugin) {
                    if (contextPlugin._onlyPercentage) {
                        contextPlugin.inputX.value = contextPlugin._origin_w > 100 ? 100 : contextPlugin._origin_w;
                    }
                    else {
                        contextPlugin.inputX.value = contextPlugin._origin_w;
                        contextPlugin.inputY.value = contextPlugin._origin_h;
                    }
                },
                /**
                 * @description Save the size data (element.setAttribute("data-size"))
                 * Used at the "setSize" method
                 * @param {Object} contextPlugin context object of plugin (core.context[plugin])
                 */
                _module_saveCurrentSize: function (contextPlugin) {
                    var x = this.plugins.resizing._module_getSizeX.call(this, contextPlugin);
                    var y = this.plugins.resizing._module_getSizeY.call(this, contextPlugin);
                    contextPlugin._element.setAttribute('data-size', x + ',' + y);
                    if (!!contextPlugin._videoRatio)
                        contextPlugin._videoRatio = y;
                },
                /**
                 * @description Call the resizing module
                 * @param {Element} targetElement Resizing target element
                 * @param {string} plugin Plugin name
                 * @returns {Object} Size of resizing div {w, h, t, l}
                 */
                call_controller_resize: function (targetElement, plugin) {
                    var contextResizing = this.context.resizing;
                    var contextPlugin = this.context[plugin];
                    contextResizing._resize_plugin = plugin;
                    var resizeContainer = contextResizing.resizeContainer;
                    var resizeDiv = contextResizing.resizeDiv;
                    var offset = this.util.getOffset(targetElement, this.context.element.wysiwygFrame);
                    var isVertical = contextResizing._rotateVertical = /^(90|270)$/.test(Math.abs(targetElement.getAttribute('data-rotate')).toString());
                    var w = isVertical ? targetElement.offsetHeight : targetElement.offsetWidth;
                    var h = isVertical ? targetElement.offsetWidth : targetElement.offsetHeight;
                    var t = offset.top;
                    var l = offset.left - this.context.element.wysiwygFrame.scrollLeft;
                    resizeContainer.style.top = t + 'px';
                    resizeContainer.style.left = l + 'px';
                    resizeContainer.style.width = w + 'px';
                    resizeContainer.style.height = h + 'px';
                    resizeDiv.style.top = '0px';
                    resizeDiv.style.left = '0px';
                    resizeDiv.style.width = w + 'px';
                    resizeDiv.style.height = h + 'px';
                    var align = targetElement.getAttribute('data-align') || 'basic';
                    align = align === 'none' ? 'basic' : align;
                    // text
                    var container = this.util.getParentElement(targetElement, this.util.isComponent);
                    var cover = this.util.getParentElement(targetElement, 'FIGURE');
                    var displayX = this.plugins.resizing._module_getSizeX.call(this, contextPlugin, targetElement, cover, container) || 'auto';
                    var displayY = contextPlugin._onlyPercentage && plugin === 'image' ? '' : ', ' + (this.plugins.resizing._module_getSizeY.call(this, contextPlugin, targetElement, cover, container) || 'auto');
                    this.util.changeTxt(contextResizing.resizeDisplay, this.lang.dialogBox[align] + ' (' + displayX + displayY + ')');
                    // resizing display
                    contextResizing.resizeButtonGroup.style.display = contextPlugin._resizing ? '' : 'none';
                    var resizeDotShow = contextPlugin._resizing && !contextPlugin._resizeDotHide && !contextPlugin._onlyPercentage ? 'flex' : 'none';
                    var resizeHandles = contextResizing.resizeHandles;
                    for (var i = 0, len = resizeHandles.length; i < len; i++) {
                        resizeHandles[i].style.display = resizeDotShow;
                    }
                    if (contextPlugin._resizing) {
                        var rotations = contextResizing.rotationButtons;
                        rotations[0].style.display = rotations[1].style.display = contextPlugin._rotation ? '' : 'none';
                    }
                    // align icon
                    var alignList = contextResizing.alignMenuList;
                    this.util.changeElement(contextResizing.alignButton.firstElementChild, contextResizing.alignIcons[align]);
                    for (var i = 0, len = alignList.length; i < len; i++) {
                        if (alignList[i].getAttribute('data-value') === align)
                            this.util.addClass(alignList[i], 'on');
                        else
                            this.util.removeClass(alignList[i], 'on');
                    }
                    // percentage active
                    var pButtons = contextResizing.percentageButtons;
                    var value = /%$/.test(targetElement.style.width) && /%$/.test(container.style.width) ? (this.util.getNumber(container.style.width, 0) / 100) + '' : '';
                    for (var i = 0, len = pButtons.length; i < len; i++) {
                        if (pButtons[i].getAttribute('data-value') === value) {
                            this.util.addClass(pButtons[i], 'active');
                        }
                        else {
                            this.util.removeClass(pButtons[i], 'active');
                        }
                    }
                    // caption display, active
                    if (!contextPlugin._captionShow) {
                        contextResizing.captionButton.style.display = 'none';
                    }
                    else {
                        contextResizing.captionButton.style.display = '';
                        if (this.util.getChildElement(targetElement.parentNode, 'figcaption')) {
                            this.util.addClass(contextResizing.captionButton, 'active');
                            contextPlugin._captionChecked = true;
                        }
                        else {
                            this.util.removeClass(contextResizing.captionButton, 'active');
                            contextPlugin._captionChecked = false;
                        }
                    }
                    resizeContainer.style.display = 'block';
                    var addOffset = { left: 0, top: 50 };
                    if (this.options.iframe) {
                        addOffset.left -= this.context.element.wysiwygFrame.parentElement.offsetLeft;
                        addOffset.top -= this.context.element.wysiwygFrame.parentElement.offsetTop;
                    }
                    this.setControllerPosition(contextResizing.resizeButton, resizeContainer, 'bottom', addOffset);
                    this.controllersOn(resizeContainer, contextResizing.resizeButton, this.util.setDisabledButtons.bind(this, false, this.resizingDisabledButtons), targetElement, plugin);
                    this.util.setDisabledButtons(true, this.resizingDisabledButtons);
                    contextResizing._resize_w = w;
                    contextResizing._resize_h = h;
                    var originSize = (targetElement.getAttribute('origin-size') || '').split(',');
                    contextResizing._origin_w = originSize[0] || targetElement.naturalWidth;
                    contextResizing._origin_h = originSize[1] || targetElement.naturalHeight;
                    return {
                        w: w,
                        h: h,
                        t: t,
                        l: l
                    };
                },
                _closeAlignMenu: null,
                /**
                 * @description Open align submenu of module
                 */
                openAlignMenu: function () {
                    var alignButton = this.context.resizing.alignButton;
                    this.util.addClass(alignButton, 'on');
                    this.context.resizing.alignMenu.style.top = (alignButton.offsetTop + alignButton.offsetHeight) + 'px';
                    this.context.resizing.alignMenu.style.left = (alignButton.offsetLeft - alignButton.offsetWidth / 2) + 'px';
                    this.context.resizing.alignMenu.style.display = 'block';
                    this.plugins.resizing._closeAlignMenu = function () {
                        this.util.removeClass(this.context.resizing.alignButton, 'on');
                        this.context.resizing.alignMenu.style.display = 'none';
                        this.removeDocEvent('click', this.plugins.resizing._closeAlignMenu);
                        this.plugins.resizing._closeAlignMenu = null;
                    }.bind(this);
                    this.addDocEvent('click', this.plugins.resizing._closeAlignMenu);
                },
                /**
                 * @description Click event of resizing toolbar
                 * Performs the action of the clicked toolbar button.
                 * @param {MouseEvent} e Event object
                 */
                onClick_resizeButton: function (e) {
                    e.stopPropagation();
                    var target = e.target;
                    var command = target.getAttribute('data-command') || target.parentNode.getAttribute('data-command');
                    if (!command)
                        return;
                    var value = target.getAttribute('data-value') || target.parentNode.getAttribute('data-value');
                    var pluginName = this.context.resizing._resize_plugin;
                    var currentContext = this.context[pluginName];
                    var contextEl = currentContext._element;
                    var currentModule = this.plugins[pluginName];
                    e.preventDefault();
                    if (typeof this.plugins.resizing._closeAlignMenu === 'function') {
                        this.plugins.resizing._closeAlignMenu();
                        if (command === 'onalign')
                            return;
                    }
                    switch (command) {
                        case 'auto':
                            this.plugins.resizing.resetTransform.call(this, contextEl);
                            currentModule.setAutoSize.call(this);
                            this.selectComponent(contextEl, pluginName);
                            break;
                        case 'percent':
                            var percentY = this.plugins.resizing._module_getSizeY.call(this, currentContext);
                            if (this.context.resizing._rotateVertical) {
                                var percentage = contextEl.getAttribute('data-percentage');
                                if (percentage)
                                    percentY = percentage.split(',')[1];
                            }
                            this.plugins.resizing.resetTransform.call(this, contextEl);
                            currentModule.setPercentSize.call(this, (value * 100), (this.util.getNumber(percentY, 0) === null || !/%$/.test(percentY)) ? '' : percentY);
                            this.selectComponent(contextEl, pluginName);
                            break;
                        case 'mirror':
                            var r = contextEl.getAttribute('data-rotate') || '0';
                            var x = contextEl.getAttribute('data-rotateX') || '';
                            var y = contextEl.getAttribute('data-rotateY') || '';
                            if ((value === 'h' && !this.context.resizing._rotateVertical) || (value === 'v' && this.context.resizing._rotateVertical)) {
                                y = y ? '' : '180';
                            }
                            else {
                                x = x ? '' : '180';
                            }
                            contextEl.setAttribute('data-rotateX', x);
                            contextEl.setAttribute('data-rotateY', y);
                            this.plugins.resizing._setTransForm(contextEl, r, x, y);
                            break;
                        case 'rotate':
                            var contextResizing = this.context.resizing;
                            var slope = (contextEl.getAttribute('data-rotate') * 1) + (value * 1);
                            var deg = this._w.Math.abs(slope) >= 360 ? 0 : slope;
                            contextEl.setAttribute('data-rotate', deg);
                            contextResizing._rotateVertical = /^(90|270)$/.test(this._w.Math.abs(deg).toString());
                            this.plugins.resizing.setTransformSize.call(this, contextEl, null, null);
                            this.selectComponent(contextEl, pluginName);
                            break;
                        case 'onalign':
                            this.plugins.resizing.openAlignMenu.call(this);
                            return;
                        case 'align':
                            var alignValue = value === 'basic' ? 'none' : value;
                            currentModule.setAlign.call(this, alignValue, null, null, null);
                            this.selectComponent(contextEl, pluginName);
                            break;
                        case 'caption':
                            var caption = !currentContext._captionChecked;
                            currentModule.openModify.call(this, true);
                            currentContext._captionChecked = currentContext.captionCheckEl.checked = caption;
                            currentModule.update_image.call(this, false, false, false);
                            if (caption) {
                                var captionText = this.util.getChildElement(currentContext._caption, function (current) {
                                    return current.nodeType === 3;
                                });
                                if (!captionText) {
                                    currentContext._caption.focus();
                                }
                                else {
                                    this.setRange(captionText, 0, captionText, captionText.textContent.length);
                                }
                                this.controllersOff();
                            }
                            else {
                                this.selectComponent(contextEl, pluginName);
                                currentModule.openModify.call(this, true);
                            }
                            break;
                        case 'revert':
                            currentModule.setOriginSize.call(this);
                            this.selectComponent(contextEl, pluginName);
                            break;
                        case 'update':
                            currentModule.openModify.call(this);
                            this.controllersOff();
                            break;
                        case 'delete':
                            currentModule.destroy.call(this);
                            break;
                    }
                    // history stack
                    this.history.push(false);
                },
                /**
                 * @description Initialize the transform style (rotation) of the element.
                 * @param {Element} element Target element
                 */
                resetTransform: function (element) {
                    var size = (element.getAttribute('data-size') || element.getAttribute('data-origin') || '').split(',');
                    this.context.resizing._rotateVertical = false;
                    element.style.maxWidth = '';
                    element.style.transform = '';
                    element.style.transformOrigin = '';
                    element.setAttribute('data-rotate', '');
                    element.setAttribute('data-rotateX', '');
                    element.setAttribute('data-rotateY', '');
                    this.plugins[this.context.resizing._resize_plugin].setSize.call(this, size[0] ? size[0] : 'auto', size[1] ? size[1] : '', true);
                },
                /**
                 * @description Set the transform style (rotation) of the element.
                 * @param {Element} element Target element
                 * @param {Number|null} width Element's width size
                 * @param {Number|null} height Element's height size
                 */
                setTransformSize: function (element, width, height) {
                    var percentage = element.getAttribute('data-percentage');
                    var isVertical = this.context.resizing._rotateVertical;
                    var deg = element.getAttribute('data-rotate') * 1;
                    var transOrigin = '';
                    if (percentage && !isVertical) {
                        percentage = percentage.split(',');
                        if (percentage[0] === 'auto' && percentage[1] === 'auto') {
                            this.plugins[this.context.resizing._resize_plugin].setAutoSize.call(this);
                        }
                        else {
                            this.plugins[this.context.resizing._resize_plugin].setPercentSize.call(this, percentage[0], percentage[1]);
                        }
                    }
                    else {
                        var cover = this.util.getParentElement(element, 'FIGURE');
                        var offsetW = width || element.offsetWidth;
                        var offsetH = height || element.offsetHeight;
                        var w = (isVertical ? offsetH : offsetW) + 'px';
                        var h = (isVertical ? offsetW : offsetH) + 'px';
                        this.plugins[this.context.resizing._resize_plugin].cancelPercentAttr.call(this);
                        this.plugins[this.context.resizing._resize_plugin].setSize.call(this, offsetW + 'px', offsetH + 'px', true);
                        cover.style.width = w;
                        cover.style.height = (!!this.context[this.context.resizing._resize_plugin]._caption ? '' : h);
                        if (isVertical) {
                            var transW = (offsetW / 2) + 'px ' + (offsetW / 2) + 'px 0';
                            var transH = (offsetH / 2) + 'px ' + (offsetH / 2) + 'px 0';
                            transOrigin = deg === 90 || deg === -270 ? transH : transW;
                        }
                    }
                    element.style.transformOrigin = transOrigin;
                    this.plugins.resizing._setTransForm(element, deg.toString(), element.getAttribute('data-rotateX') || '', element.getAttribute('data-rotateY') || '');
                    if (isVertical)
                        element.style.maxWidth = 'none';
                    else
                        element.style.maxWidth = '';
                    this.plugins.resizing.setCaptionPosition.call(this, element);
                },
                _setTransForm: function (element, r, x, y) {
                    var width = (element.offsetWidth - element.offsetHeight) * (/-/.test(r) ? 1 : -1);
                    var translate = '';
                    if (/[1-9]/.test(r) && (x || y)) {
                        translate = x ? 'Y' : 'X';
                        switch (r) {
                            case '90':
                                translate = x && y ? 'X' : y ? translate : '';
                                break;
                            case '270':
                                width *= -1;
                                translate = x && y ? 'Y' : x ? translate : '';
                                break;
                            case '-90':
                                translate = x && y ? 'Y' : x ? translate : '';
                                break;
                            case '-270':
                                width *= -1;
                                translate = x && y ? 'X' : y ? translate : '';
                                break;
                            default:
                                translate = '';
                        }
                    }
                    if (r % 180 === 0) {
                        element.style.maxWidth = '';
                    }
                    element.style.transform = 'rotate(' + r + 'deg)' + (x ? ' rotateX(' + x + 'deg)' : '') + (y ? ' rotateY(' + y + 'deg)' : '') + (translate ? ' translate' + translate + '(' + width + 'px)' : '');
                },
                /**
                 * @description The position of the caption is set automatically.
                 * @param {Element} element Target element (not caption element)
                 */
                setCaptionPosition: function (element) {
                    var figcaption = this.util.getChildElement(this.util.getParentElement(element, 'FIGURE'), 'FIGCAPTION');
                    if (figcaption) {
                        figcaption.style.marginTop = (this.context.resizing._rotateVertical ? element.offsetWidth - element.offsetHeight : 0) + 'px';
                    }
                },
                /**
                 * @description Mouse down event of resize handles
                 * @param {MouseEvent} e Event object
                 */
                onMouseDown_resize_handle: function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var contextResizing = this.context.resizing;
                    var direction = contextResizing._resize_direction = e.target.classList[0];
                    contextResizing._resizeClientX = e.clientX;
                    contextResizing._resizeClientY = e.clientY;
                    this.context.element.resizeBackground.style.display = 'block';
                    contextResizing.resizeButton.style.display = 'none';
                    contextResizing.resizeDiv.style.float = /l/.test(direction) ? 'right' : /r/.test(direction) ? 'left' : 'none';
                    var closureFunc_bind = function closureFunc(e) {
                        if (e.type === 'keydown' && e.keyCode !== 27)
                            return;
                        var change = contextResizing._isChange;
                        contextResizing._isChange = false;
                        this.removeDocEvent('mousemove', resizing_element_bind);
                        this.removeDocEvent('mouseup', closureFunc_bind);
                        this.removeDocEvent('keydown', closureFunc_bind);
                        if (e.type === 'keydown') {
                            this.controllersOff();
                            this.context.element.resizeBackground.style.display = 'none';
                            this.plugins[this.context.resizing._resize_plugin].init.call(this);
                        }
                        else {
                            // element resize
                            this.plugins.resizing.cancel_controller_resize.call(this, direction);
                            // history stack
                            if (change)
                                this.history.push(false);
                        }
                    }.bind(this);
                    var resizing_element_bind = this.plugins.resizing.resizing_element.bind(this, contextResizing, direction, this.context[contextResizing._resize_plugin]);
                    this.addDocEvent('mousemove', resizing_element_bind);
                    this.addDocEvent('mouseup', closureFunc_bind);
                    this.addDocEvent('keydown', closureFunc_bind);
                },
                /**
                 * @description Mouse move event after call "onMouseDown_resize_handle" of resize handles
                 * The size of the module's "div" is adjusted according to the mouse move event.
                 * @param {Object} contextResizing "core.context.resizing" object (binding argument)
                 * @param {String} direction Direction ("tl", "tr", "bl", "br", "lw", "th", "rw", "bh") (binding argument)
                 * @param {Object} plugin "core.context[currentPlugin]" object (binding argument)
                 * @param {MouseEvent} e Event object
                 */
                resizing_element: function (contextResizing, direction, plugin, e) {
                    var clientX = e.clientX;
                    var clientY = e.clientY;
                    var resultW = plugin._element_w;
                    var resultH = plugin._element_h;
                    var w = plugin._element_w + (/r/.test(direction) ? clientX - contextResizing._resizeClientX : contextResizing._resizeClientX - clientX);
                    var h = plugin._element_h + (/b/.test(direction) ? clientY - contextResizing._resizeClientY : contextResizing._resizeClientY - clientY);
                    var wh = ((plugin._element_h / plugin._element_w) * w);
                    if (/t/.test(direction))
                        contextResizing.resizeDiv.style.top = (plugin._element_h - (/h/.test(direction) ? h : wh)) + 'px';
                    if (/l/.test(direction))
                        contextResizing.resizeDiv.style.left = (plugin._element_w - w) + 'px';
                    if (/r|l/.test(direction)) {
                        contextResizing.resizeDiv.style.width = w + 'px';
                        resultW = w;
                    }
                    if (/^(t|b)[^h]$/.test(direction)) {
                        contextResizing.resizeDiv.style.height = wh + 'px';
                        resultH = wh;
                    }
                    else if (/^(t|b)h$/.test(direction)) {
                        contextResizing.resizeDiv.style.height = h + 'px';
                        resultH = h;
                    }
                    contextResizing._resize_w = resultW;
                    contextResizing._resize_h = resultH;
                    this.util.changeTxt(contextResizing.resizeDisplay, this._w.Math.round(resultW) + ' x ' + this._w.Math.round(resultH));
                    contextResizing._isChange = true;
                },
                /**
                 * @description Resize the element to the size of the "div" adjusted in the "resizing_element" method.
                 * Called at the mouse-up event registered in "onMouseDown_resize_handle".
                 * @param {String} direction Direction ("tl", "tr", "bl", "br", "lw", "th", "rw", "bh")
                 */
                cancel_controller_resize: function (direction) {
                    var isVertical = this.context.resizing._rotateVertical;
                    this.controllersOff();
                    this.context.element.resizeBackground.style.display = 'none';
                    var w = this._w.Math.round(isVertical ? this.context.resizing._resize_h : this.context.resizing._resize_w);
                    var h = this._w.Math.round(isVertical ? this.context.resizing._resize_w : this.context.resizing._resize_h);
                    if (!isVertical && !/%$/.test(w)) {
                        var padding = 16;
                        var limit = this.context.element.wysiwygFrame.clientWidth - (padding * 2) - 2;
                        if (this.util.getNumber(w, 0) > limit) {
                            h = this._w.Math.round((h / w) * limit);
                            w = limit;
                        }
                    }
                    var pluginName = this.context.resizing._resize_plugin;
                    this.plugins[pluginName].setSize.call(this, w, h, false, direction);
                    if (isVertical)
                        this.plugins.resizing.setTransformSize.call(this, this.context[this.context.resizing._resize_plugin]._element, w, h);
                    this.selectComponent(this.context[pluginName]._element, pluginName);
                }
            };
            if (typeof noGlobal === typeof undefined) {
                if (!window.SUNEDITOR_MODULES) {
                    Object.defineProperty(window, 'SUNEDITOR_MODULES', {
                        enumerable: true,
                        writable: false,
                        configurable: false,
                        value: {}
                    });
                }
                Object.defineProperty(window.SUNEDITOR_MODULES, 'resizing', {
                    enumerable: true,
                    writable: false,
                    configurable: false,
                    value: resizing
                });
            }
            return resizing;
        }));
    }(resizing$1));
    var resizing = resizing$1.exports;

    var fileManager$1 = { exports: {} };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    (function (module) {
        'use strict';
        (function (global, factory) {
            if ('object' === 'object' && 'object' === 'object') {
                module.exports = global.document ?
                    factory(global, true) :
                    function (w) {
                        if (!w.document) {
                            throw new Error('SUNEDITOR_MODULES a window with a document');
                        }
                        return factory(w);
                    };
            }
            else {
                factory(global);
            }
        }(typeof window !== 'undefined' ? window : commonjsGlobal, function (window, noGlobal) {
            var fileManager = {
                name: 'fileManager',
                _xmlHttp: null,
                _checkMediaComponent: function (tag) {
                    if (/IMG/i.test(tag)) {
                        return !/FIGURE/i.test(tag.parentElement.nodeName) || !/FIGURE/i.test(tag.parentElement.parentElement.nodeName);
                    }
                    else if (/VIDEO/i.test(tag)) {
                        return !/FIGURE/i.test(tag.parentElement.nodeName);
                    }
                    return true;
                },
                /**
                 * @description Upload the file to the server.
                 * @param {String} uploadUrl Upload server url
                 * @param {Object|null} uploadHeader Request header
                 * @param {FormData} formData FormData in body
                 * @param {Function|null} callBack Success call back function
                 * @param {Function|null} errorCallBack Error call back function
                 * @example this.plugins.fileManager.upload.call(this, imageUploadUrl, this.options.imageUploadHeader, formData, this.plugins.image.callBack_imgUpload.bind(this, info), this.functions.onImageUploadError);
                 */
                upload: function (uploadUrl, uploadHeader, formData, callBack, errorCallBack) {
                    this.showLoading();
                    var filePlugin = this.plugins.fileManager;
                    var xmlHttp = filePlugin._xmlHttp = this.util.getXMLHttpRequest();
                    xmlHttp.onreadystatechange = filePlugin._callBackUpload.bind(this, xmlHttp, callBack, errorCallBack);
                    xmlHttp.open('post', uploadUrl, true);
                    if (uploadHeader !== null && typeof uploadHeader === 'object' && this._w.Object.keys(uploadHeader).length > 0) {
                        for (var key in uploadHeader) {
                            xmlHttp.setRequestHeader(key, uploadHeader[key]);
                        }
                    }
                    xmlHttp.send(formData);
                },
                _callBackUpload: function (xmlHttp, callBack, errorCallBack) {
                    if (xmlHttp.readyState === 4) {
                        if (xmlHttp.status === 200) {
                            try {
                                callBack(xmlHttp);
                            }
                            catch (e) {
                                throw Error('[SUNEDITOR.fileManager.upload.callBack.fail] cause : "' + e.message + '"');
                            }
                            finally {
                                this.closeLoading();
                            }
                        }
                        else { // exception
                            this.closeLoading();
                            var res = !xmlHttp.responseText ? xmlHttp : JSON.parse(xmlHttp.responseText);
                            if (typeof errorCallBack !== 'function' || errorCallBack('', res, this)) {
                                var err = '[SUNEDITOR.fileManager.upload.serverException] status: ' + xmlHttp.status + ', response: ' + (res.errorMessage || xmlHttp.responseText);
                                this.functions.noticeOpen(err);
                                throw Error(err);
                            }
                        }
                    }
                },
                /**
                 * @description Checke the file's information and modify the tag that does not fit the format.
                 * @param {String} pluginName Plugin name
                 * @param {Array} tagNames Tag array to check
                 * @param {Function|null} uploadEventHandler Event handler to process updated file info after checking (used in "setInfo")
                 * @param {Function} modifyHandler A function to modify a tag that does not fit the format (Argument value: Tag element)
                 * @param {Boolean} resizing True if the plugin is using a resizing module
                 * @example
                 * const modifyHandler = function (tag) {
                 *      imagePlugin.onModifyMode.call(this, tag, null);
                 *      imagePlugin.openModify.call(this, true);
                 *      imagePlugin.update_image.call(this, true, false, true);
                 *  }.bind(this);
                 *  this.plugins.fileManager.checkInfo.call(this, 'image', ['img'], this.functions.onImageUpload, modifyHandler, true);
                 */
                checkInfo: function (pluginName, tagNames, uploadEventHandler, modifyHandler, resizing) {
                    var tags = [];
                    for (var i = 0, len = tagNames.length; i < len; i++) {
                        tags = tags.concat([].slice.call(this.context.element.wysiwyg.getElementsByTagName(tagNames[i])));
                    }
                    var fileManagerPlugin = this.plugins.fileManager;
                    var context = this.context[pluginName];
                    var infoList = context._infoList;
                    var setFileInfo = fileManagerPlugin.setInfo.bind(this);
                    if (tags.length === infoList.length) {
                        // reset
                        if (this._componentsInfoReset) {
                            for (var i = 0, len = tags.length; i < len; i++) {
                                setFileInfo(pluginName, tags[i], uploadEventHandler, null, resizing);
                            }
                            return;
                        }
                        else {
                            var infoUpdate = false;
                            var _loop_1 = function (i, len, info) {
                                info = infoList[i];
                                if (tags.filter(function (t) { return info.src === t.src && info.index.toString() === t.getAttribute('data-index'); }).length === 0) {
                                    infoUpdate = true;
                                    return out_info_1 = info, "break";
                                }
                                out_info_1 = info;
                            };
                            var out_info_1;
                            for (var i = 0, len = infoList.length, info = void 0; i < len; i++) {
                                var state_1 = _loop_1(i, len, info);
                                info = out_info_1;
                                if (state_1 === "break")
                                    break;
                            }
                            // pass
                            if (!infoUpdate)
                                return;
                        }
                    }
                    // check
                    var _resize_plugin = resizing ? this.context.resizing._resize_plugin : '';
                    if (resizing)
                        this.context.resizing._resize_plugin = pluginName;
                    var currentTags = [];
                    var infoIndex = [];
                    for (var i = 0, len = infoList.length; i < len; i++) {
                        infoIndex[i] = infoList[i].index;
                    }
                    for (var i = 0, len = tags.length, tag = void 0; i < len; i++) {
                        tag = tags[i];
                        if (!this.util.getParentElement(tag, this.util.isMediaComponent) || !fileManagerPlugin._checkMediaComponent(tag)) {
                            currentTags.push(context._infoIndex);
                            modifyHandler(tag);
                        }
                        else if (!tag.getAttribute('data-index') || infoIndex.indexOf(tag.getAttribute('data-index') * 1) < 0) {
                            currentTags.push(context._infoIndex);
                            tag.removeAttribute('data-index');
                            setFileInfo(pluginName, tag, uploadEventHandler, null, resizing);
                        }
                        else {
                            currentTags.push(tag.getAttribute('data-index') * 1);
                        }
                    }
                    for (var i = 0, dataIndex = void 0; i < infoList.length; i++) {
                        dataIndex = infoList[i].index;
                        if (currentTags.indexOf(dataIndex) > -1)
                            continue;
                        infoList.splice(i, 1);
                        if (typeof uploadEventHandler === 'function')
                            uploadEventHandler(null, dataIndex, 'delete', null, 0, this);
                        i--;
                    }
                    if (resizing)
                        this.context.resizing._resize_plugin = _resize_plugin;
                },
                /**
                 * @description Create info object of file and add it to "_infoList" (this.context[pluginName]._infoList[])
                 * @param {String} pluginName Plugin name
                 * @param {Element} element
                 * @param {Function|null} uploadEventHandler Event handler to process updated file info (created in setInfo)
                 * @param {Object|null} file
                 * @param {Boolean} resizing True if the plugin is using a resizing module
                 * @example
                 * uploadCallBack {.. file = { name: fileList[i].name, size: fileList[i].size };
                 * this.plugins.fileManager.setInfo.call(this, 'image', oImg, this.functions.onImageUpload, file, true);
                 */
                setInfo: function (pluginName, element, uploadEventHandler, file, resizing) {
                    var _resize_plugin = resizing ? this.context.resizing._resize_plugin : '';
                    if (resizing)
                        this.context.resizing._resize_plugin = pluginName;
                    var plguin = this.plugins[pluginName];
                    var context = this.context[pluginName];
                    var infoList = context._infoList;
                    var dataIndex = element.getAttribute('data-index');
                    var info = null;
                    var state = '';
                    if (!file) {
                        file = {
                            'name': element.getAttribute('data-file-name') || (typeof element.src === 'string' ? element.src.split('/').pop() : ''),
                            'size': element.getAttribute('data-file-size') || 0
                        };
                    }
                    // create
                    if (!dataIndex || this._componentsInfoInit) {
                        state = 'create';
                        dataIndex = context._infoIndex++;
                        element.setAttribute('data-index', dataIndex);
                        element.setAttribute('data-file-name', file.name);
                        element.setAttribute('data-file-size', file.size);
                        info = {
                            src: element.src,
                            index: dataIndex * 1,
                            name: file.name,
                            size: file.size
                        };
                        infoList.push(info);
                    }
                    else { // update
                        state = 'update';
                        dataIndex *= 1;
                        for (var i = 0, len = infoList.length; i < len; i++) {
                            if (dataIndex === infoList[i].index) {
                                info = infoList[i];
                                break;
                            }
                        }
                        if (!info) {
                            dataIndex = context._infoIndex++;
                            info = { index: dataIndex };
                            infoList.push(info);
                        }
                        info.src = element.src;
                        info.name = element.getAttribute("data-file-name");
                        info.size = element.getAttribute("data-file-size") * 1;
                    }
                    // method bind
                    info.element = element;
                    info.delete = plguin.destroy.bind(this, element);
                    info.select = function (element) {
                        element.scrollIntoView(true);
                        this._w.setTimeout(plguin.select.bind(this, element));
                    }.bind(this, element);
                    if (resizing) {
                        if (!element.getAttribute('origin-size') && element.naturalWidth) {
                            element.setAttribute('origin-size', element.naturalWidth + ',' + element.naturalHeight);
                        }
                        if (!element.getAttribute('data-origin')) {
                            var container = this.util.getParentElement(element, this.util.isMediaComponent);
                            var cover = this.util.getParentElement(element, 'FIGURE');
                            var w = this.plugins.resizing._module_getSizeX.call(this, context, element, cover, container);
                            var h = this.plugins.resizing._module_getSizeY.call(this, context, element, cover, container);
                            element.setAttribute('data-origin', w + ',' + h);
                            element.setAttribute('data-size', w + ',' + h);
                        }
                        if (!element.style.width) {
                            var size = (element.getAttribute('data-size') || element.getAttribute('data-origin') || '').split(',');
                            plguin.onModifyMode.call(this, element, null);
                            plguin.applySize.call(this, size[0], size[1]);
                        }
                        this.context.resizing._resize_plugin = _resize_plugin;
                    }
                    if (typeof uploadEventHandler === 'function')
                        uploadEventHandler(element, dataIndex, state, info, --context._uploadFileLength < 0 ? 0 : context._uploadFileLength, this);
                },
                /**
                 * @description Delete info object at "_infoList"
                 * @param {String} pluginName Plugin name
                 * @param {Number} index index of info object (this.context[pluginName]._infoList[].index)
                 * @param {Function|null} uploadEventHandler Event handler to process updated file info (created in setInfo)
                 */
                deleteInfo: function (pluginName, index, uploadEventHandler) {
                    if (index >= 0) {
                        var infoList = this.context[pluginName]._infoList;
                        for (var i = 0, len = infoList.length; i < len; i++) {
                            if (index === infoList[i].index) {
                                infoList.splice(i, 1);
                                if (typeof uploadEventHandler === 'function')
                                    uploadEventHandler(null, index, 'delete', null, 0, this);
                                return;
                            }
                        }
                    }
                },
                /**
                 * @description Reset info object and "_infoList = []", "_infoIndex = 0"
                 * @param {String} pluginName Plugin name
                 * @param {Function|null} uploadEventHandler Event handler to process updated file info (created in setInfo)
                 */
                resetInfo: function (pluginName, uploadEventHandler) {
                    var context = this.context[pluginName];
                    if (typeof uploadEventHandler === 'function') {
                        var infoList = context._infoList;
                        for (var i = 0, len = infoList.length; i < len; i++) {
                            uploadEventHandler(null, infoList[i].index, 'delete', null, 0, this);
                        }
                    }
                    context._infoList = [];
                    context._infoIndex = 0;
                }
            };
            if (typeof noGlobal === typeof undefined) {
                if (!window.SUNEDITOR_MODULES) {
                    Object.defineProperty(window, 'SUNEDITOR_MODULES', {
                        enumerable: true,
                        writable: false,
                        configurable: false,
                        value: {}
                    });
                }
                Object.defineProperty(window.SUNEDITOR_MODULES, 'fileManager', {
                    enumerable: true,
                    writable: false,
                    configurable: false,
                    value: fileManager
                });
            }
            return fileManager;
        }));
    }(fileManager$1));
    var fileManager = fileManager$1.exports;

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var image = {
        name: 'image',
        display: 'dialog',
        add: function (core) {
            core.addModule([dialog, anchor, component, resizing, fileManager]);
            var options = core.options;
            var context = core.context;
            var contextImage = context.image = {
                _infoList: [],
                _infoIndex: 0,
                _uploadFileLength: 0,
                focusElement: null,
                sizeUnit: options._imageSizeUnit,
                _linkElement: '',
                _altText: '',
                _align: 'none',
                _floatClassRegExp: '__se__float\\-[a-z]+',
                _v_src: { _linkValue: '' },
                svgDefaultSize: '30%',
                base64RenderIndex: 0,
                // @require @Override component
                _element: null,
                _cover: null,
                _container: null,
                // @Override resizing properties
                inputX: null,
                inputY: null,
                _element_w: 1,
                _element_h: 1,
                _element_l: 0,
                _element_t: 0,
                _defaultSizeX: 'auto',
                _defaultSizeY: 'auto',
                _origin_w: options.imageWidth === 'auto' ? '' : options.imageWidth,
                _origin_h: options.imageHeight === 'auto' ? '' : options.imageHeight,
                _proportionChecked: true,
                _resizing: options.imageResizing,
                _resizeDotHide: !options.imageHeightShow,
                _rotation: options.imageRotation,
                _onlyPercentage: options.imageSizeOnlyPercentage,
                _ratio: false,
                _ratioX: 1,
                _ratioY: 1,
                _captionShow: true,
                _captionChecked: false,
                _caption: null,
                captionCheckEl: null
            };
            /** image dialog */
            var image_dialog = this.setDialog(core);
            contextImage.modal = image_dialog;
            contextImage.imgInputFile = image_dialog.querySelector('._se_image_file');
            contextImage.imgUrlFile = image_dialog.querySelector('._se_image_url');
            contextImage.focusElement = contextImage.imgInputFile || contextImage.imgUrlFile;
            contextImage.altText = image_dialog.querySelector('._se_image_alt');
            contextImage.captionCheckEl = image_dialog.querySelector('._se_image_check_caption');
            contextImage.previewSrc = image_dialog.querySelector('._se_tab_content_image .se-link-preview');
            /** add event listeners */
            image_dialog.querySelector('.se-dialog-tabs').addEventListener('click', this.openTab.bind(core));
            image_dialog.querySelector('form').addEventListener('submit', this.submit.bind(core));
            if (contextImage.imgInputFile)
                image_dialog.querySelector('.se-file-remove').addEventListener('click', this._removeSelectedFiles.bind(contextImage.imgInputFile, contextImage.imgUrlFile, contextImage.previewSrc));
            if (contextImage.imgUrlFile)
                contextImage.imgUrlFile.addEventListener('input', this._onLinkPreview.bind(contextImage.previewSrc, contextImage._v_src, options.linkProtocol));
            if (contextImage.imgInputFile && contextImage.imgUrlFile)
                contextImage.imgInputFile.addEventListener('change', this._fileInputChange.bind(contextImage));
            var imageGalleryButton = image_dialog.querySelector('.__se__gallery');
            if (imageGalleryButton)
                imageGalleryButton.addEventListener('click', this._openGallery.bind(core));
            contextImage.proportion = {};
            contextImage.inputX = {};
            contextImage.inputY = {};
            if (options.imageResizing) {
                contextImage.proportion = image_dialog.querySelector('._se_image_check_proportion');
                contextImage.inputX = image_dialog.querySelector('._se_image_size_x');
                contextImage.inputY = image_dialog.querySelector('._se_image_size_y');
                contextImage.inputX.value = options.imageWidth;
                contextImage.inputY.value = options.imageHeight;
                contextImage.inputX.addEventListener('keyup', this.setInputSize.bind(core, 'x'));
                contextImage.inputY.addEventListener('keyup', this.setInputSize.bind(core, 'y'));
                contextImage.inputX.addEventListener('change', this.setRatio.bind(core));
                contextImage.inputY.addEventListener('change', this.setRatio.bind(core));
                contextImage.proportion.addEventListener('change', this.setRatio.bind(core));
                image_dialog.querySelector('.se-dialog-btn-revert').addEventListener('click', this.sizeRevert.bind(core));
            }
            /** append html */
            context.dialog.modal.appendChild(image_dialog);
            /** link event */
            core.plugins.anchor.initEvent.call(core, 'image', image_dialog.querySelector('._se_tab_content_url'));
            contextImage.anchorCtx = core.context.anchor.caller.image;
            /** empty memory */
            image_dialog = null;
        },
        /** dialog */
        setDialog: function (core) {
            var option = core.options;
            var lang = core.lang;
            var dialog = core.util.createElement('DIV');
            dialog.className = 'se-dialog-content se-dialog-image';
            dialog.style.display = 'none';
            var html = '' +
                '<div class="se-dialog-header">' +
                '<button type="button" data-command="close" class="se-btn se-dialog-close" class="close" aria-label="Close" title="' + lang.dialogBox.close + '">' +
                core.icons.cancel +
                '</button>' +
                '<span class="se-modal-title">' + lang.dialogBox.imageBox.title + '</span>' +
                '</div>' +
                '<div class="se-dialog-tabs">' +
                '<button type="button" class="_se_tab_link active" data-tab-link="image">' + lang.toolbar.image + '</button>' +
                '<button type="button" class="_se_tab_link" data-tab-link="url">' + lang.toolbar.link + '</button>' +
                '</div>' +
                '<form method="post" enctype="multipart/form-data">' +
                '<div class="_se_tab_content _se_tab_content_image">' +
                '<div class="se-dialog-body"><div style="border-bottom: 1px dashed #ccc;">';
            if (option.imageFileInput) {
                html += '' +
                    '<div class="se-dialog-form">' +
                    '<label>' + lang.dialogBox.imageBox.file + '</label>' +
                    '<div class="se-dialog-form-files">' +
                    '<input class="se-input-form _se_image_file" type="file" accept="' + option.imageAccept + '"' + (option.imageMultipleFile ? ' multiple="multiple"' : '') + '/>' +
                    '<button type="button" class="se-btn se-dialog-files-edge-button se-file-remove" title="' + lang.controller.remove + '">' + core.icons.cancel + '</button>' +
                    '</div>' +
                    '</div>';
            }
            if (option.imageUrlInput) {
                html += '' +
                    '<div class="se-dialog-form">' +
                    '<label>' + lang.dialogBox.imageBox.url + '</label>' +
                    '<div class="se-dialog-form-files">' +
                    '<input class="se-input-form se-input-url _se_image_url" type="text" />' +
                    ((option.imageGalleryUrl && core.plugins.imageGallery) ? '<button type="button" class="se-btn se-dialog-files-edge-button __se__gallery" title="' + lang.toolbar.imageGallery + '">' + core.icons.image_gallery + '</button>' : '') +
                    '</div>' +
                    '<pre class="se-link-preview"></pre>' +
                    '</div>';
            }
            html += '</div>' +
                '<div class="se-dialog-form">' +
                '<label>' + lang.dialogBox.imageBox.altText + '</label><input class="se-input-form _se_image_alt" type="text" />' +
                '</div>';
            if (option.imageResizing) {
                var onlyPercentage = option.imageSizeOnlyPercentage;
                var onlyPercentDisplay = onlyPercentage ? ' style="display: none !important;"' : '';
                var heightDisplay = !option.imageHeightShow ? ' style="display: none !important;"' : '';
                html += '<div class="se-dialog-form">';
                if (onlyPercentage || !option.imageHeightShow) {
                    html += '' +
                        '<div class="se-dialog-size-text">' +
                        '<label class="size-w">' + lang.dialogBox.size + '</label>' +
                        '</div>';
                }
                else {
                    html += '' +
                        '<div class="se-dialog-size-text">' +
                        '<label class="size-w">' + lang.dialogBox.width + '</label>' +
                        '<label class="se-dialog-size-x">&nbsp;</label>' +
                        '<label class="size-h">' + lang.dialogBox.height + '</label>' +
                        '</div>';
                }
                html += '' +
                    '<input class="se-input-control _se_image_size_x" placeholder="auto"' + (onlyPercentage ? ' type="number" min="1"' : 'type="text"') + (onlyPercentage ? ' max="100"' : '') + ' />' +
                    '<label class="se-dialog-size-x"' + heightDisplay + '>' + (onlyPercentage ? '%' : 'x') + '</label>' +
                    '<input type="text" class="se-input-control _se_image_size_y" placeholder="auto"' + onlyPercentDisplay + (onlyPercentage ? ' max="100"' : '') + heightDisplay + '/>' +
                    '<label' + onlyPercentDisplay + heightDisplay + '><input type="checkbox" class="se-dialog-btn-check _se_image_check_proportion" checked/>&nbsp;' + lang.dialogBox.proportion + '</label>' +
                    '<button type="button" title="' + lang.dialogBox.revertButton + '" class="se-btn se-dialog-btn-revert" style="float: right;">' + core.icons.revert + '</button>' +
                    '</div>';
            }
            html += '' +
                '<div class="se-dialog-form se-dialog-form-footer">' +
                '<label><input type="checkbox" class="se-dialog-btn-check _se_image_check_caption" />&nbsp;' + lang.dialogBox.caption + '</label>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="_se_tab_content _se_tab_content_url" style="display: none">' +
                core.context.anchor.forms.innerHTML +
                '</div>' +
                '<div class="se-dialog-footer">' +
                '<div>' +
                '<label><input type="radio" name="suneditor_image_radio" class="se-dialog-btn-radio" value="none" checked>' + lang.dialogBox.basic + '</label>' +
                '<label><input type="radio" name="suneditor_image_radio" class="se-dialog-btn-radio" value="left">' + lang.dialogBox.left + '</label>' +
                '<label><input type="radio" name="suneditor_image_radio" class="se-dialog-btn-radio" value="center">' + lang.dialogBox.center + '</label>' +
                '<label><input type="radio" name="suneditor_image_radio" class="se-dialog-btn-radio" value="right">' + lang.dialogBox.right + '</label>' +
                '</div>' +
                '<button type="submit" class="se-btn-primary" title="' + lang.dialogBox.submitButton + '"><span>' + lang.dialogBox.submitButton + '</span></button>' +
                '</div>' +
                '</form>';
            dialog.innerHTML = html;
            return dialog;
        },
        _fileInputChange: function () {
            if (!this.imgInputFile.value) {
                this.imgUrlFile.removeAttribute('disabled');
                this.previewSrc.style.textDecoration = '';
            }
            else {
                this.imgUrlFile.setAttribute('disabled', true);
                this.previewSrc.style.textDecoration = 'line-through';
            }
        },
        _removeSelectedFiles: function (urlInput, previewSrc) {
            this.value = '';
            if (urlInput) {
                urlInput.removeAttribute('disabled');
                previewSrc.style.textDecoration = '';
            }
        },
        _openGallery: function () {
            this.callPlugin('imageGallery', this.plugins.imageGallery.open.bind(this, this.plugins.image._setUrlInput.bind(this.context.image)), null);
        },
        _setUrlInput: function (target) {
            this.altText.value = target.alt;
            this._v_src._linkValue = this.previewSrc.textContent = this.imgUrlFile.value = target.src;
            this.imgUrlFile.focus();
        },
        _onLinkPreview: function (context, protocol, e) {
            var value = e.target.value.trim();
            context._linkValue = this.textContent = !value ? '' : (protocol && value.indexOf('://') === -1 && value.indexOf('#') !== 0) ? protocol + value : value.indexOf('://') === -1 ? '/' + value : value;
        },
        /**
         * @Override @Required fileManager
         */
        fileTags: ['img'],
        /**
         * @Override core, fileManager, resizing
         * @description It is called from core.selectComponent.
         * @param {Element} element Target element
         */
        select: function (element) {
            this.plugins.image.onModifyMode.call(this, element, this.plugins.resizing.call_controller_resize.call(this, element, 'image'));
        },
        /**
         * @Override fileManager, resizing
         */
        destroy: function (element) {
            var imageEl = element || this.context.image._element;
            var imageContainer = this.util.getParentElement(imageEl, this.util.isMediaComponent) || imageEl;
            var dataIndex = imageEl.getAttribute('data-index') * 1;
            var focusEl = (imageContainer.previousElementSibling || imageContainer.nextElementSibling);
            var emptyDiv = imageContainer.parentNode;
            this.util.removeItem(imageContainer);
            this.plugins.image.init.call(this);
            this.controllersOff();
            if (emptyDiv !== this.context.element.wysiwyg)
                this.util.removeItemAllParents(emptyDiv, function (current) { return current.childNodes.length === 0; }, null);
            // focus
            this.focusEdge(focusEl);
            // event
            this.plugins.fileManager.deleteInfo.call(this, 'image', dataIndex, this.functions.onImageUpload);
            // history stack
            this.history.push(false);
        },
        /**
         * @Required @Override dialog
         */
        on: function (update) {
            var contextImage = this.context.image;
            if (!update) {
                contextImage.inputX.value = contextImage._origin_w = this.options.imageWidth === contextImage._defaultSizeX ? '' : this.options.imageWidth;
                contextImage.inputY.value = contextImage._origin_h = this.options.imageHeight === contextImage._defaultSizeY ? '' : this.options.imageHeight;
                if (contextImage.imgInputFile && this.options.imageMultipleFile)
                    contextImage.imgInputFile.setAttribute('multiple', 'multiple');
            }
            else {
                if (contextImage.imgInputFile && this.options.imageMultipleFile)
                    contextImage.imgInputFile.removeAttribute('multiple');
            }
            this.plugins.anchor.on.call(this, contextImage.anchorCtx, update);
        },
        /**
         * @Required @Override dialog
         */
        open: function () {
            this.plugins.dialog.open.call(this, 'image', 'image' === this.currentControllerName);
        },
        openTab: function (e) {
            var modal = this.context.image.modal;
            var targetElement = (e === 'init' ? modal.querySelector('._se_tab_link') : e.target);
            if (!/^BUTTON$/i.test(targetElement.tagName)) {
                return false;
            }
            // Declare all variables
            var tabName = targetElement.getAttribute('data-tab-link');
            var contentClassName = '_se_tab_content';
            var i, tabContent, tabLinks;
            // Get all elements with class="tabcontent" and hide them
            tabContent = modal.getElementsByClassName(contentClassName);
            for (i = 0; i < tabContent.length; i++) {
                tabContent[i].style.display = 'none';
            }
            // Get all elements with class="tablinks" and remove the class "active"
            tabLinks = modal.getElementsByClassName('_se_tab_link');
            for (i = 0; i < tabLinks.length; i++) {
                this.util.removeClass(tabLinks[i], 'active');
            }
            // Show the current tab, and add an "active" class to the button that opened the tab
            modal.querySelector('.' + contentClassName + '_' + tabName).style.display = 'block';
            this.util.addClass(targetElement, 'active');
            // focus
            if (tabName === 'image' && this.context.image.focusElement) {
                this.context.image.focusElement.focus();
            }
            else if (tabName === 'url') {
                this.context.anchor.caller.image.urlInput.focus();
            }
            return false;
        },
        submit: function (e) {
            var contextImage = this.context.image;
            var imagePlugin = this.plugins.image;
            e.preventDefault();
            e.stopPropagation();
            contextImage._altText = contextImage.altText.value;
            contextImage._align = contextImage.modal.querySelector('input[name="suneditor_image_radio"]:checked').value;
            contextImage._captionChecked = contextImage.captionCheckEl.checked;
            if (contextImage._resizing)
                contextImage._proportionChecked = contextImage.proportion.checked;
            try {
                if (this.context.dialog.updateModal) {
                    imagePlugin.update_image.call(this, false, true, false);
                }
                if (contextImage.imgInputFile && contextImage.imgInputFile.files.length > 0) {
                    this.showLoading();
                    imagePlugin.submitAction.call(this, this.context.image.imgInputFile.files);
                }
                else if (contextImage.imgUrlFile && contextImage._v_src._linkValue.length > 0) {
                    this.showLoading();
                    imagePlugin.onRender_imgUrl.call(this);
                }
            }
            catch (error) {
                this.closeLoading();
                throw Error('[SUNEDITOR.image.submit.fail] cause : "' + error.message + '"');
            }
            finally {
                this.plugins.dialog.close.call(this);
            }
            return false;
        },
        submitAction: function (fileList) {
            if (fileList.length === 0)
                return;
            var fileSize = 0;
            var files = [];
            for (var i = 0, len = fileList.length; i < len; i++) {
                if (/image/i.test(fileList[i].type)) {
                    files.push(fileList[i]);
                    fileSize += fileList[i].size;
                }
            }
            var limitSize = this.options.imageUploadSizeLimit;
            if (limitSize > 0) {
                var infoSize = 0;
                var imagesInfo = this.context.image._infoList;
                for (var i = 0, len = imagesInfo.length; i < len; i++) {
                    infoSize += imagesInfo[i].size * 1;
                }
                if ((fileSize + infoSize) > limitSize) {
                    this.closeLoading();
                    var err = '[SUNEDITOR.imageUpload.fail] Size of uploadable total images: ' + (limitSize / 1000) + 'KB';
                    if (typeof this.functions.onImageUploadError !== 'function' || this.functions.onImageUploadError(err, { 'limitSize': limitSize, 'currentSize': infoSize, 'uploadSize': fileSize }, this)) {
                        this.functions.noticeOpen(err);
                    }
                    return;
                }
            }
            var contextImage = this.context.image;
            contextImage._uploadFileLength = files.length;
            var anchor = this.plugins.anchor.createAnchor.call(this, contextImage.anchorCtx, true);
            var info = {
                anchor: anchor,
                inputWidth: contextImage.inputX.value,
                inputHeight: contextImage.inputY.value,
                align: contextImage._align,
                isUpdate: this.context.dialog.updateModal,
                element: contextImage._element
            };
            if (typeof this.functions.onImageUploadBefore === 'function') {
                var result = this.functions.onImageUploadBefore(files, info, this, function (data) {
                    if (data && this._w.Array.isArray(data.result)) {
                        this.plugins.image.register.call(this, info, data);
                    }
                    else {
                        this.plugins.image.upload.call(this, info, data);
                    }
                }.bind(this));
                if (typeof result === 'undefined')
                    return;
                if (!result) {
                    this.closeLoading();
                    return;
                }
                if (this._w.Array.isArray(result) && result.length > 0)
                    files = result;
            }
            this.plugins.image.upload.call(this, info, files);
        },
        error: function (message, response) {
            this.closeLoading();
            if (typeof this.functions.onImageUploadError !== 'function' || this.functions.onImageUploadError(message, response, this)) {
                this.functions.noticeOpen(message);
                throw Error('[SUNEDITOR.plugin.image.error] response: ' + message);
            }
        },
        upload: function (info, files) {
            if (!files) {
                this.closeLoading();
                return;
            }
            if (typeof files === 'string') {
                this.plugins.image.error.call(this, files, null);
                return;
            }
            var imageUploadUrl = this.options.imageUploadUrl;
            var filesLen = this.context.dialog.updateModal ? 1 : files.length;
            // server upload
            if (typeof imageUploadUrl === 'string' && imageUploadUrl.length > 0) {
                var formData = new FormData();
                for (var i = 0; i < filesLen; i++) {
                    formData.append('file-' + i, files[i]);
                }
                this.plugins.fileManager.upload.call(this, imageUploadUrl, this.options.imageUploadHeader, formData, this.plugins.image.callBack_imgUpload.bind(this, info), this.functions.onImageUploadError);
            }
            else { // base64
                this.plugins.image.setup_reader.call(this, files, info.anchor, info.inputWidth, info.inputHeight, info.align, filesLen, info.isUpdate);
            }
        },
        callBack_imgUpload: function (info, xmlHttp) {
            if (typeof this.functions.imageUploadHandler === 'function') {
                this.functions.imageUploadHandler(xmlHttp, info, this);
            }
            else {
                var response = JSON.parse(xmlHttp.responseText);
                if (response.errorMessage) {
                    this.plugins.image.error.call(this, response.errorMessage, response);
                }
                else {
                    this.plugins.image.register.call(this, info, response);
                }
            }
        },
        register: function (info, response) {
            var fileList = response.result;
            for (var i = 0, len = fileList.length, file = void 0; i < len; i++) {
                file = { name: fileList[i].name, size: fileList[i].size };
                if (info.isUpdate) {
                    this.plugins.image.update_src.call(this, fileList[i].url, info.element, file);
                    break;
                }
                else {
                    this.plugins.image.create_image.call(this, fileList[i].url, info.anchor, info.inputWidth, info.inputHeight, info.align, file);
                }
            }
            this.closeLoading();
        },
        setup_reader: function (files, anchor, width, height, align, filesLen, isUpdate) {
            try {
                this.context.image.base64RenderIndex = filesLen;
                var wFileReader = this._w.FileReader;
                var filesStack_1 = [filesLen];
                this.context.image.inputX.value = width;
                this.context.image.inputY.value = height;
                for (var i = 0, reader = void 0, file = void 0; i < filesLen; i++) {
                    reader = new wFileReader();
                    file = files[i];
                    reader.onload = function (reader, update, updateElement, file, index) {
                        filesStack_1[index] = { result: reader.result, file: file };
                        if (--this.context.image.base64RenderIndex === 0) {
                            this.plugins.image.onRender_imgBase64.call(this, update, filesStack_1, updateElement, anchor, width, height, align);
                            this.closeLoading();
                        }
                    }.bind(this, reader, isUpdate, this.context.image._element, file, i);
                    reader.readAsDataURL(file);
                }
            }
            catch (e) {
                this.closeLoading();
                throw Error('[SUNEDITOR.image.setup_reader.fail] cause : "' + e.message + '"');
            }
        },
        onRender_imgBase64: function (update, filesStack, updateElement, anchor, width, height, align) {
            var updateMethod = this.plugins.image.update_src;
            var createMethod = this.plugins.image.create_image;
            for (var i = 0, len = filesStack.length; i < len; i++) {
                if (update) {
                    this.context.image._element.setAttribute('data-file-name', filesStack[i].file.name);
                    this.context.image._element.setAttribute('data-file-size', filesStack[i].file.size);
                    updateMethod.call(this, filesStack[i].result, updateElement, filesStack[i].file);
                }
                else {
                    createMethod.call(this, filesStack[i].result, anchor, width, height, align, filesStack[i].file);
                }
            }
        },
        onRender_imgUrl: function () {
            var contextImage = this.context.image;
            if (contextImage._v_src._linkValue.length === 0)
                return false;
            try {
                var file = { name: contextImage._v_src._linkValue.split('/').pop(), size: 0 };
                if (this.context.dialog.updateModal)
                    this.plugins.image.update_src.call(this, contextImage._v_src._linkValue, contextImage._element, file);
                else
                    this.plugins.image.create_image.call(this, contextImage._v_src._linkValue, this.plugins.anchor.createAnchor.call(this, contextImage.anchorCtx, true), contextImage.inputX.value, contextImage.inputY.value, contextImage._align, file);
            }
            catch (e) {
                throw Error('[SUNEDITOR.image.URLRendering.fail] cause : "' + e.message + '"');
            }
            finally {
                this.closeLoading();
            }
        },
        onRender_link: function (imgTag, anchor) {
            if (anchor) {
                anchor.setAttribute('data-image-link', 'image');
                imgTag.setAttribute('data-image-link', anchor.href);
                anchor.appendChild(imgTag);
                return anchor;
            }
            return imgTag;
        },
        /**
         * @Override resizing
         * @param {String} xy 'x': width, 'y': height
         * @param {KeyboardEvent} e Event object
         */
        setInputSize: function (xy, e) {
            if (e && e.keyCode === 32) {
                e.preventDefault();
                return;
            }
            this.plugins.resizing._module_setInputSize.call(this, this.context.image, xy);
        },
        /**
         * @Override resizing
         */
        setRatio: function () {
            this.plugins.resizing._module_setRatio.call(this, this.context.image);
        },
        /**
         * @Override fileManager
         */
        checkFileInfo: function () {
            var imagePlugin = this.plugins.image;
            var contextImage = this.context.image;
            var modifyHandler = function (tag) {
                imagePlugin.onModifyMode.call(this, tag, null);
                imagePlugin.openModify.call(this, true);
                // get size
                contextImage.inputX.value = contextImage._origin_w;
                contextImage.inputY.value = contextImage._origin_h;
                // get align
                var format = this.util.getFormatElement(tag);
                if (format)
                    contextImage._align = format.style.textAlign || format.style.float;
                // link
                var link = this.util.getParentElement(tag, this.util.isAnchor);
                if (link && !contextImage.anchorCtx.linkValue)
                    contextImage.anchorCtx.linkValue = ' ';
                imagePlugin.update_image.call(this, true, false, true);
            }.bind(this);
            this.plugins.fileManager.checkInfo.call(this, 'image', ['img'], this.functions.onImageUpload, modifyHandler, true);
        },
        /**
         * @Override fileManager
         */
        resetFileInfo: function () {
            this.plugins.fileManager.resetInfo.call(this, 'image', this.functions.onImageUpload);
        },
        create_image: function (src, anchor, width, height, align, file) {
            var imagePlugin = this.plugins.image;
            var contextImage = this.context.image;
            this.context.resizing._resize_plugin = 'image';
            var oImg = this.util.createElement('IMG');
            oImg.src = src;
            oImg.alt = contextImage._altText;
            oImg.setAttribute('data-rotate', '0');
            anchor = imagePlugin.onRender_link.call(this, oImg, anchor);
            if (contextImage._resizing) {
                oImg.setAttribute('data-proportion', contextImage._proportionChecked);
            }
            var cover = this.plugins.component.set_cover.call(this, anchor);
            var container = this.plugins.component.set_container.call(this, cover, 'se-image-container');
            // caption
            if (contextImage._captionChecked) {
                contextImage._caption = this.plugins.component.create_caption.call(this);
                contextImage._caption.setAttribute('contenteditable', false);
                cover.appendChild(contextImage._caption);
            }
            contextImage._element = oImg;
            contextImage._cover = cover;
            contextImage._container = container;
            // set size
            imagePlugin.applySize.call(this, width, height);
            // align
            imagePlugin.setAlign.call(this, align, oImg, cover, container);
            oImg.onload = imagePlugin._image_create_onload.bind(this, oImg, contextImage.svgDefaultSize, container);
            if (this.insertComponent(container, true, true, true))
                this.plugins.fileManager.setInfo.call(this, 'image', oImg, this.functions.onImageUpload, file, true);
            this.context.resizing._resize_plugin = '';
        },
        _image_create_onload: function (oImg, svgDefaultSize, container) {
            // svg exception handling
            if (oImg.offsetWidth === 0)
                this.plugins.image.applySize.call(this, svgDefaultSize, '');
            if (this.options.mediaAutoSelect) {
                this.selectComponent(oImg, 'image');
            }
            else {
                var line = this.appendFormatTag(container, null);
                if (line)
                    this.setRange(line, 0, line, 0);
            }
        },
        update_image: function (init, openController, notHistoryPush) {
            var contextImage = this.context.image;
            var imageEl = contextImage._element;
            var cover = contextImage._cover;
            var container = contextImage._container;
            var isNewContainer = false;
            if (cover === null) {
                isNewContainer = true;
                imageEl = contextImage._element.cloneNode(true);
                cover = this.plugins.component.set_cover.call(this, imageEl);
            }
            if (container === null) {
                cover = cover.cloneNode(true);
                imageEl = cover.querySelector('img');
                isNewContainer = true;
                container = this.plugins.component.set_container.call(this, cover, 'se-image-container');
            }
            else if (isNewContainer) {
                container.innerHTML = '';
                container.appendChild(cover);
                contextImage._cover = cover;
                contextImage._element = imageEl;
                isNewContainer = false;
            }
            // check size
            var changeSize;
            var x = this.util.isNumber(contextImage.inputX.value) ? contextImage.inputX.value + contextImage.sizeUnit : contextImage.inputX.value;
            var y = this.util.isNumber(contextImage.inputY.value) ? contextImage.inputY.value + contextImage.sizeUnit : contextImage.inputY.value;
            if (/%$/.test(imageEl.style.width)) {
                changeSize = x !== container.style.width || y !== container.style.height;
            }
            else {
                changeSize = x !== imageEl.style.width || y !== imageEl.style.height;
            }
            // alt
            imageEl.alt = contextImage._altText;
            // caption
            var modifiedCaption = false;
            if (contextImage._captionChecked) {
                if (!contextImage._caption) {
                    contextImage._caption = this.plugins.component.create_caption.call(this);
                    cover.appendChild(contextImage._caption);
                    modifiedCaption = true;
                }
            }
            else {
                if (contextImage._caption) {
                    this.util.removeItem(contextImage._caption);
                    contextImage._caption = null;
                    modifiedCaption = true;
                }
            }
            // link
            var anchor = this.plugins.anchor.createAnchor.call(this, contextImage.anchorCtx, true);
            if (anchor) {
                contextImage._linkElement = contextImage._linkElement === anchor ? anchor.cloneNode(false) : anchor;
                cover.insertBefore(this.plugins.image.onRender_link.call(this, imageEl, contextImage._linkElement), contextImage._caption);
            }
            else if (contextImage._linkElement !== null) {
                var imageElement = imageEl;
                imageElement.setAttribute('data-image-link', '');
                if (cover.contains(contextImage._linkElement)) {
                    var newEl = imageElement.cloneNode(true);
                    cover.removeChild(contextImage._linkElement);
                    cover.insertBefore(newEl, contextImage._caption);
                    imageEl = newEl;
                }
            }
            if (isNewContainer) {
                var existElement = (this.util.isRangeFormatElement(contextImage._element.parentNode) || this.util.isWysiwygDiv(contextImage._element.parentNode)) ?
                    contextImage._element :
                    /^A$/i.test(contextImage._element.parentNode.nodeName) ? contextImage._element.parentNode : this.util.getFormatElement(contextImage._element) || contextImage._element;
                if (this.util.isFormatElement(existElement) && existElement.childNodes.length > 0) {
                    existElement.parentNode.insertBefore(container, existElement);
                    this.util.removeItem(contextImage._element);
                    // clean format tag
                    this.util.removeEmptyNode(existElement, null);
                    if (existElement.children.length === 0)
                        existElement.innerHTML = this.util.htmlRemoveWhiteSpace(existElement.innerHTML);
                }
                else {
                    if (this.util.isFormatElement(existElement.parentNode)) {
                        var formats = existElement.parentNode;
                        formats.parentNode.insertBefore(container, existElement.previousSibling ? formats.nextElementSibling : formats);
                        this.util.removeItem(existElement);
                    }
                    else {
                        existElement.parentNode.replaceChild(container, existElement);
                    }
                }
                imageEl = container.querySelector('img');
                contextImage._element = imageEl;
                contextImage._cover = cover;
                contextImage._container = container;
            }
            // transform
            if (modifiedCaption || (!contextImage._onlyPercentage && changeSize)) {
                if (!init && (/\d+/.test(imageEl.style.height) || (this.context.resizing._rotateVertical && contextImage._captionChecked))) {
                    if (/%$/.test(contextImage.inputX.value) || /%$/.test(contextImage.inputY.value)) {
                        this.plugins.resizing.resetTransform.call(this, imageEl);
                    }
                    else {
                        this.plugins.resizing.setTransformSize.call(this, imageEl, this.util.getNumber(contextImage.inputX.value, 0), this.util.getNumber(contextImage.inputY.value, 0));
                    }
                }
            }
            // size
            if (contextImage._resizing) {
                imageEl.setAttribute('data-proportion', contextImage._proportionChecked);
                if (changeSize) {
                    this.plugins.image.applySize.call(this);
                }
            }
            // align
            this.plugins.image.setAlign.call(this, null, imageEl, null, null);
            // set imagesInfo
            if (init) {
                this.plugins.fileManager.setInfo.call(this, 'image', imageEl, this.functions.onImageUpload, null, true);
            }
            if (openController) {
                this.selectComponent(imageEl, 'image');
            }
            // history stack
            if (!notHistoryPush)
                this.history.push(false);
        },
        update_src: function (src, element, file) {
            element.src = src;
            this._w.setTimeout(this.plugins.fileManager.setInfo.bind(this, 'image', element, this.functions.onImageUpload, file, true));
            this.selectComponent(element, 'image');
        },
        /**
         * @Required @Override fileManager, resizing
         */
        onModifyMode: function (element, size) {
            if (!element)
                return;
            var contextImage = this.context.image;
            contextImage._linkElement = contextImage.anchorCtx.linkAnchor = /^A$/i.test(element.parentNode.nodeName) ? element.parentNode : null;
            contextImage._element = element;
            contextImage._cover = this.util.getParentElement(element, 'FIGURE');
            contextImage._container = this.util.getParentElement(element, this.util.isMediaComponent);
            contextImage._caption = this.util.getChildElement(contextImage._cover, 'FIGCAPTION');
            contextImage._align = element.style.float || element.getAttribute('data-align') || 'none';
            element.style.float = '';
            this.plugins.anchor.setCtx(contextImage._linkElement, contextImage.anchorCtx);
            if (size) {
                contextImage._element_w = size.w;
                contextImage._element_h = size.h;
                contextImage._element_t = size.t;
                contextImage._element_l = size.l;
            }
            var userSize = contextImage._element.getAttribute('data-size') || contextImage._element.getAttribute('data-origin');
            var w, h;
            if (userSize) {
                userSize = userSize.split(',');
                w = userSize[0];
                h = userSize[1];
            }
            else if (size) {
                w = size.w;
                h = size.h;
            }
            contextImage._origin_w = w || element.style.width || element.width || '';
            contextImage._origin_h = h || element.style.height || element.height || '';
        },
        /**
         * @Required @Override fileManager, resizing
         */
        openModify: function (notOpen) {
            var contextImage = this.context.image;
            if (contextImage.imgUrlFile) {
                contextImage._v_src._linkValue = contextImage.previewSrc.textContent = contextImage.imgUrlFile.value = contextImage._element.src;
            }
            contextImage._altText = contextImage.altText.value = contextImage._element.alt;
            contextImage.modal.querySelector('input[name="suneditor_image_radio"][value="' + contextImage._align + '"]').checked = true;
            contextImage._align = contextImage.modal.querySelector('input[name="suneditor_image_radio"]:checked').value;
            contextImage._captionChecked = contextImage.captionCheckEl.checked = !!contextImage._caption;
            if (contextImage._resizing) {
                this.plugins.resizing._module_setModifyInputSize.call(this, contextImage, this.plugins.image);
            }
            if (!notOpen)
                this.plugins.dialog.open.call(this, 'image', true);
        },
        /**
         * @Override fileManager
         */
        applySize: function (w, h) {
            var contextImage = this.context.image;
            if (!w)
                w = contextImage.inputX.value || this.options.imageWidth;
            if (!h)
                h = contextImage.inputY.value || this.options.imageHeight;
            if ((contextImage._onlyPercentage && !!w) || /%$/.test(w)) {
                this.plugins.image.setPercentSize.call(this, w, h);
                return true;
            }
            else if ((!w || w === 'auto') && (!h || h === 'auto')) {
                this.plugins.image.setAutoSize.call(this);
            }
            else {
                this.plugins.image.setSize.call(this, w, h, false);
            }
            return false;
        },
        /**
         * @Override resizing
         */
        sizeRevert: function () {
            this.plugins.resizing._module_sizeRevert.call(this, this.context.image);
        },
        /**
         * @Override resizing
         */
        setSize: function (w, h, notResetPercentage, direction) {
            var contextImage = this.context.image;
            var onlyW = /^(rw|lw)$/.test(direction);
            var onlyH = /^(th|bh)$/.test(direction);
            if (!onlyH) {
                contextImage._element.style.width = this.util.isNumber(w) ? w + contextImage.sizeUnit : w;
                this.plugins.image.cancelPercentAttr.call(this);
            }
            if (!onlyW) {
                contextImage._element.style.height = this.util.isNumber(h) ? h + contextImage.sizeUnit : /%$/.test(h) ? '' : h;
            }
            if (contextImage._align === 'center')
                this.plugins.image.setAlign.call(this, null, null, null, null);
            if (!notResetPercentage)
                contextImage._element.removeAttribute('data-percentage');
            // save current size
            this.plugins.resizing._module_saveCurrentSize.call(this, contextImage);
        },
        /**
         * @Override resizing
         */
        setAutoSize: function () {
            var contextImage = this.context.image;
            this.plugins.resizing.resetTransform.call(this, contextImage._element);
            this.plugins.image.cancelPercentAttr.call(this);
            contextImage._element.style.maxWidth = '';
            contextImage._element.style.width = '';
            contextImage._element.style.height = '';
            contextImage._cover.style.width = '';
            contextImage._cover.style.height = '';
            this.plugins.image.setAlign.call(this, null, null, null, null);
            contextImage._element.setAttribute('data-percentage', 'auto,auto');
            // save current size
            this.plugins.resizing._module_saveCurrentSize.call(this, contextImage);
        },
        /**
         * @Override resizing
         */
        setOriginSize: function () {
            var contextImage = this.context.image;
            contextImage._element.removeAttribute('data-percentage');
            this.plugins.resizing.resetTransform.call(this, contextImage._element);
            this.plugins.image.cancelPercentAttr.call(this);
            var originSize = (contextImage._element.getAttribute('data-origin') || '').split(',');
            var w = originSize[0];
            var h = originSize[1];
            if (originSize) {
                if (contextImage._onlyPercentage || (/%$/.test(w) && (/%$/.test(h) || !/\d/.test(h)))) {
                    this.plugins.image.setPercentSize.call(this, w, h);
                }
                else {
                    this.plugins.image.setSize.call(this, w, h);
                }
                // save current size
                this.plugins.resizing._module_saveCurrentSize.call(this, contextImage);
            }
        },
        /**
         * @Override resizing
         */
        setPercentSize: function (w, h) {
            var contextImage = this.context.image;
            h = !!h && !/%$/.test(h) && !this.util.getNumber(h, 0) ? this.util.isNumber(h) ? h + '%' : h : this.util.isNumber(h) ? h + contextImage.sizeUnit : (h || '');
            var heightPercentage = /%$/.test(h);
            contextImage._container.style.width = this.util.isNumber(w) ? w + '%' : w;
            contextImage._container.style.height = '';
            contextImage._cover.style.width = '100%';
            contextImage._cover.style.height = !heightPercentage ? '' : h;
            contextImage._element.style.width = '100%';
            contextImage._element.style.height = heightPercentage ? '' : h;
            contextImage._element.style.maxWidth = '';
            if (contextImage._align === 'center')
                this.plugins.image.setAlign.call(this, null, null, null, null);
            contextImage._element.setAttribute('data-percentage', w + ',' + h);
            this.plugins.resizing.setCaptionPosition.call(this, contextImage._element);
            // save current size
            this.plugins.resizing._module_saveCurrentSize.call(this, contextImage);
        },
        /**
         * @Override resizing
         */
        cancelPercentAttr: function () {
            var contextImage = this.context.image;
            contextImage._cover.style.width = '';
            contextImage._cover.style.height = '';
            contextImage._container.style.width = '';
            contextImage._container.style.height = '';
            this.util.removeClass(contextImage._container, this.context.image._floatClassRegExp);
            this.util.addClass(contextImage._container, '__se__float-' + contextImage._align);
            if (contextImage._align === 'center')
                this.plugins.image.setAlign.call(this, null, null, null, null);
        },
        /**
         * @Override resizing
         */
        setAlign: function (align, element, cover, container) {
            var contextImage = this.context.image;
            if (!align)
                align = contextImage._align;
            if (!element)
                element = contextImage._element;
            if (!cover)
                cover = contextImage._cover;
            if (!container)
                container = contextImage._container;
            if (align && align !== 'none') {
                cover.style.margin = 'auto';
            }
            else {
                cover.style.margin = '0';
            }
            if (/%$/.test(element.style.width) && align === 'center') {
                container.style.minWidth = '100%';
                cover.style.width = container.style.width;
            }
            else {
                container.style.minWidth = '';
                cover.style.width = this.context.resizing._rotateVertical ? (element.style.height || element.offsetHeight) : ((!element.style.width || element.style.width === 'auto') ? '' : element.style.width || '100%');
            }
            if (!this.util.hasClass(container, '__se__float-' + align)) {
                this.util.removeClass(container, contextImage._floatClassRegExp);
                this.util.addClass(container, '__se__float-' + align);
            }
            element.setAttribute('data-align', align);
        },
        /**
         * @Override dialog
         */
        init: function () {
            var contextImage = this.context.image;
            if (contextImage.imgInputFile)
                contextImage.imgInputFile.value = '';
            if (contextImage.imgUrlFile)
                contextImage._v_src._linkValue = contextImage.previewSrc.textContent = contextImage.imgUrlFile.value = '';
            if (contextImage.imgInputFile && contextImage.imgUrlFile) {
                contextImage.imgUrlFile.removeAttribute('disabled');
                contextImage.previewSrc.style.textDecoration = '';
            }
            contextImage.altText.value = '';
            contextImage.modal.querySelector('input[name="suneditor_image_radio"][value="none"]').checked = true;
            contextImage.captionCheckEl.checked = false;
            contextImage._element = null;
            this.plugins.image.openTab.call(this, 'init');
            if (contextImage._resizing) {
                contextImage.inputX.value = this.options.imageWidth === contextImage._defaultSizeX ? '' : this.options.imageWidth;
                contextImage.inputY.value = this.options.imageHeight === contextImage._defaultSizeY ? '' : this.options.imageHeight;
                contextImage.proportion.checked = true;
                contextImage._ratio = false;
                contextImage._ratioX = 1;
                contextImage._ratioY = 1;
            }
            this.plugins.anchor.init.call(this, contextImage.anchorCtx);
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var video = {
        name: 'video',
        display: 'dialog',
        add: function (core) {
            core.addModule([dialog, component, resizing, fileManager]);
            var options = core.options;
            var context = core.context;
            var contextVideo = context.video = {
                _infoList: [],
                _infoIndex: 0,
                _uploadFileLength: 0,
                focusElement: null,
                sizeUnit: options._videoSizeUnit,
                _align: 'none',
                _floatClassRegExp: '__se__float\\-[a-z]+',
                _youtubeQuery: options.youtubeQuery,
                _videoRatio: (options.videoRatio * 100) + '%',
                _defaultRatio: (options.videoRatio * 100) + '%',
                _linkValue: '',
                // @require @Override component
                _element: null,
                _cover: null,
                _container: null,
                // @Override resizing properties
                inputX: null,
                inputY: null,
                _element_w: 1,
                _element_h: 1,
                _element_l: 0,
                _element_t: 0,
                _defaultSizeX: '100%',
                _defaultSizeY: (options.videoRatio * 100) + '%',
                _origin_w: options.videoWidth === '100%' ? '' : options.videoWidth,
                _origin_h: options.videoHeight === '56.25%' ? '' : options.videoHeight,
                _proportionChecked: true,
                _resizing: options.videoResizing,
                _resizeDotHide: !options.videoHeightShow,
                _rotation: options.videoRotation,
                _onlyPercentage: options.videoSizeOnlyPercentage,
                _ratio: false,
                _ratioX: 1,
                _ratioY: 1,
                _captionShow: false
            };
            /** video dialog */
            var video_dialog = this.setDialog(core);
            contextVideo.modal = video_dialog;
            contextVideo.videoInputFile = video_dialog.querySelector('._se_video_file');
            contextVideo.videoUrlFile = video_dialog.querySelector('.se-input-url');
            contextVideo.focusElement = contextVideo.videoUrlFile || contextVideo.videoInputFile;
            contextVideo.preview = video_dialog.querySelector('.se-link-preview');
            /** add event listeners */
            video_dialog.querySelector('form').addEventListener('submit', this.submit.bind(core));
            if (contextVideo.videoInputFile)
                video_dialog.querySelector('.se-dialog-files-edge-button').addEventListener('click', this._removeSelectedFiles.bind(contextVideo.videoInputFile, contextVideo.videoUrlFile, contextVideo.preview));
            if (contextVideo.videoInputFile && contextVideo.videoUrlFile)
                contextVideo.videoInputFile.addEventListener('change', this._fileInputChange.bind(contextVideo));
            if (contextVideo.videoUrlFile)
                contextVideo.videoUrlFile.addEventListener('input', this._onLinkPreview.bind(contextVideo.preview, contextVideo, options.linkProtocol));
            contextVideo.proportion = {};
            contextVideo.videoRatioOption = {};
            contextVideo.inputX = {};
            contextVideo.inputY = {};
            if (options.videoResizing) {
                contextVideo.proportion = video_dialog.querySelector('._se_video_check_proportion');
                contextVideo.videoRatioOption = video_dialog.querySelector('.se-video-ratio');
                contextVideo.inputX = video_dialog.querySelector('._se_video_size_x');
                contextVideo.inputY = video_dialog.querySelector('._se_video_size_y');
                contextVideo.inputX.value = options.videoWidth;
                contextVideo.inputY.value = options.videoHeight;
                contextVideo.inputX.addEventListener('keyup', this.setInputSize.bind(core, 'x'));
                contextVideo.inputY.addEventListener('keyup', this.setInputSize.bind(core, 'y'));
                contextVideo.inputX.addEventListener('change', this.setRatio.bind(core));
                contextVideo.inputY.addEventListener('change', this.setRatio.bind(core));
                contextVideo.proportion.addEventListener('change', this.setRatio.bind(core));
                contextVideo.videoRatioOption.addEventListener('change', this.setVideoRatio.bind(core));
                video_dialog.querySelector('.se-dialog-btn-revert').addEventListener('click', this.sizeRevert.bind(core));
            }
            /** append html */
            context.dialog.modal.appendChild(video_dialog);
            /** empty memory */
            video_dialog = null;
        },
        /** dialog */
        setDialog: function (core) {
            var option = core.options;
            var lang = core.lang;
            var dialog = core.util.createElement('DIV');
            dialog.className = 'se-dialog-content';
            dialog.style.display = 'none';
            var html = '' +
                '<form method="post" enctype="multipart/form-data">' +
                '<div class="se-dialog-header">' +
                '<button type="button" data-command="close" class="se-btn se-dialog-close" aria-label="Close" title="' + lang.dialogBox.close + '">' +
                core.icons.cancel +
                '</button>' +
                '<span class="se-modal-title">' + lang.dialogBox.videoBox.title + '</span>' +
                '</div>' +
                '<div class="se-dialog-body">';
            if (option.videoFileInput) {
                html += '' +
                    '<div class="se-dialog-form">' +
                    '<label>' + lang.dialogBox.videoBox.file + '</label>' +
                    '<div class="se-dialog-form-files">' +
                    '<input class="se-input-form _se_video_file" type="file" accept="' + option.videoAccept + '"' + (option.videoMultipleFile ? ' multiple="multiple"' : '') + '/>' +
                    '<button type="button" data-command="filesRemove" class="se-btn se-dialog-files-edge-button se-file-remove" title="' + lang.controller.remove + '">' + core.icons.cancel + '</button>' +
                    '</div>' +
                    '</div>';
            }
            if (option.videoUrlInput) {
                html += '' +
                    '<div class="se-dialog-form">' +
                    '<label>' + lang.dialogBox.videoBox.url + '</label>' +
                    '<input class="se-input-form se-input-url" type="text" />' +
                    '<pre class="se-link-preview"></pre>' +
                    '</div>';
            }
            if (option.videoResizing) {
                var ratioList = option.videoRatioList || [{ name: '16:9', value: 0.5625 }, { name: '4:3', value: 0.75 }, { name: '21:9', value: 0.4285 }];
                var ratio = option.videoRatio;
                var onlyPercentage = option.videoSizeOnlyPercentage;
                var onlyPercentDisplay = onlyPercentage ? ' style="display: none !important;"' : '';
                var heightDisplay = !option.videoHeightShow ? ' style="display: none !important;"' : '';
                var ratioDisplay = !option.videoRatioShow ? ' style="display: none !important;"' : '';
                var onlyWidthDisplay = !onlyPercentage && !option.videoHeightShow && !option.videoRatioShow ? ' style="display: none !important;"' : '';
                html += '' +
                    '<div class="se-dialog-form">' +
                    '<div class="se-dialog-size-text">' +
                    '<label class="size-w">' + lang.dialogBox.width + '</label>' +
                    '<label class="se-dialog-size-x">&nbsp;</label>' +
                    '<label class="size-h"' + heightDisplay + '>' + lang.dialogBox.height + '</label>' +
                    '<label class="size-h"' + ratioDisplay + '>(' + lang.dialogBox.ratio + ')</label>' +
                    '</div>' +
                    '<input class="se-input-control _se_video_size_x" placeholder="100%"' + (onlyPercentage ? ' type="number" min="1"' : 'type="text"') + (onlyPercentage ? ' max="100"' : '') + '/>' +
                    '<label class="se-dialog-size-x"' + onlyWidthDisplay + '>' + (onlyPercentage ? '%' : 'x') + '</label>' +
                    '<input class="se-input-control _se_video_size_y" placeholder="' + (option.videoRatio * 100) + '%"' + (onlyPercentage ? ' type="number" min="1"' : 'type="text"') + (onlyPercentage ? ' max="100"' : '') + heightDisplay + '/>' +
                    '<select class="se-input-select se-video-ratio" title="' + lang.dialogBox.ratio + '"' + ratioDisplay + '>';
                if (!heightDisplay)
                    html += '<option value=""> - </option>';
                for (var i = 0, len = ratioList.length; i < len; i++) {
                    html += '<option value="' + ratioList[i].value + '"' + (ratio.toString() === ratioList[i].value.toString() ? ' selected' : '') + '>' + ratioList[i].name + '</option>';
                }
                html += '</select>' +
                    '<button type="button" title="' + lang.dialogBox.revertButton + '" class="se-btn se-dialog-btn-revert" style="float: right;">' + core.icons.revert + '</button>' +
                    '</div>' +
                    '<div class="se-dialog-form se-dialog-form-footer"' + onlyPercentDisplay + onlyWidthDisplay + '>' +
                    '<label><input type="checkbox" class="se-dialog-btn-check _se_video_check_proportion" checked/>&nbsp;' + lang.dialogBox.proportion + '</label>' +
                    '</div>';
            }
            html += '' +
                '</div>' +
                '<div class="se-dialog-footer">' +
                '<div>' +
                '<label><input type="radio" name="suneditor_video_radio" class="se-dialog-btn-radio" value="none" checked>' + lang.dialogBox.basic + '</label>' +
                '<label><input type="radio" name="suneditor_video_radio" class="se-dialog-btn-radio" value="left">' + lang.dialogBox.left + '</label>' +
                '<label><input type="radio" name="suneditor_video_radio" class="se-dialog-btn-radio" value="center">' + lang.dialogBox.center + '</label>' +
                '<label><input type="radio" name="suneditor_video_radio" class="se-dialog-btn-radio" value="right">' + lang.dialogBox.right + '</label>' +
                '</div>' +
                '<button type="submit" class="se-btn-primary" title="' + lang.dialogBox.submitButton + '"><span>' + lang.dialogBox.submitButton + '</span></button>' +
                '</div>' +
                '</form>';
            dialog.innerHTML = html;
            return dialog;
        },
        _fileInputChange: function () {
            if (!this.videoInputFile.value) {
                this.videoUrlFile.removeAttribute('disabled');
                this.preview.style.textDecoration = '';
            }
            else {
                this.videoUrlFile.setAttribute('disabled', true);
                this.preview.style.textDecoration = 'line-through';
            }
        },
        _removeSelectedFiles: function (urlInput, preview) {
            this.value = '';
            if (urlInput) {
                urlInput.removeAttribute('disabled');
                preview.style.textDecoration = '';
            }
        },
        _onLinkPreview: function (context, protocol, e) {
            var value = e.target.value.trim();
            if (/^<iframe.*\/iframe>$/.test(value)) {
                context._linkValue = value;
                this.textContent = '<IFrame :src=".."></IFrame>';
            }
            else {
                context._linkValue = this.textContent = !value ? '' : (protocol && value.indexOf('://') === -1 && value.indexOf('#') !== 0) ? protocol + value : value.indexOf('://') === -1 ? '/' + value : value;
            }
        },
        _setTagAttrs: function (element) {
            element.setAttribute('controls', true);
            var attrs = this.options.videoTagAttrs;
            if (!attrs)
                return;
            for (var key in attrs) {
                if (!this.util.hasOwn(attrs, key))
                    continue;
                element.setAttribute(key, attrs[key]);
            }
        },
        createVideoTag: function () {
            var videoTag = this.util.createElement('VIDEO');
            this.plugins.video._setTagAttrs.call(this, videoTag);
            return videoTag;
        },
        _setIframeAttrs: function (element) {
            element.frameBorder = '0';
            element.allowFullscreen = true;
            var attrs = this.options.videoIframeAttrs;
            if (!attrs)
                return;
            for (var key in attrs) {
                if (!this.util.hasOwn(attrs, key))
                    continue;
                element.setAttribute(key, attrs[key]);
            }
        },
        createIframeTag: function () {
            var iframeTag = this.util.createElement('IFRAME');
            this.plugins.video._setIframeAttrs.call(this, iframeTag);
            return iframeTag;
        },
        /**
         * @Override @Required fileManager
         */
        fileTags: ['iframe', 'video'],
        /**
         * @Override core, resizing, fileManager
         * @description It is called from core.selectComponent.
         * @param {Element} element Target element
         */
        select: function (element) {
            this.plugins.video.onModifyMode.call(this, element, this.plugins.resizing.call_controller_resize.call(this, element, 'video'));
        },
        /**
         * @Override fileManager, resizing
         */
        destroy: function (element) {
            var frame = element || this.context.video._element;
            var container = this.context.video._container;
            var dataIndex = frame.getAttribute('data-index') * 1;
            var focusEl = (container.previousElementSibling || container.nextElementSibling);
            var emptyDiv = container.parentNode;
            this.util.removeItem(container);
            this.plugins.video.init.call(this);
            this.controllersOff();
            if (emptyDiv !== this.context.element.wysiwyg)
                this.util.removeItemAllParents(emptyDiv, function (current) { return current.childNodes.length === 0; }, null);
            // focus
            this.focusEdge(focusEl);
            // event
            this.plugins.fileManager.deleteInfo.call(this, 'video', dataIndex, this.functions.onVideoUpload);
            // history stack
            this.history.push(false);
        },
        /**
         * @Required @Override dialog
         */
        on: function (update) {
            var contextVideo = this.context.video;
            if (!update) {
                contextVideo.inputX.value = contextVideo._origin_w = this.options.videoWidth === contextVideo._defaultSizeX ? '' : this.options.videoWidth;
                contextVideo.inputY.value = contextVideo._origin_h = this.options.videoHeight === contextVideo._defaultSizeY ? '' : this.options.videoHeight;
                contextVideo.proportion.disabled = true;
                if (contextVideo.videoInputFile && this.options.videoMultipleFile)
                    contextVideo.videoInputFile.setAttribute('multiple', 'multiple');
            }
            else {
                if (contextVideo.videoInputFile && this.options.videoMultipleFile)
                    contextVideo.videoInputFile.removeAttribute('multiple');
            }
            if (contextVideo._resizing) {
                this.plugins.video.setVideoRatioSelect.call(this, contextVideo._origin_h || contextVideo._defaultRatio);
            }
        },
        /**
         * @Required @Override dialog
         */
        open: function () {
            this.plugins.dialog.open.call(this, 'video', 'video' === this.currentControllerName);
        },
        setVideoRatio: function (e) {
            var contextVideo = this.context.video;
            var value = e.target.options[e.target.selectedIndex].value;
            contextVideo._defaultSizeY = contextVideo._videoRatio = !value ? contextVideo._defaultSizeY : (value * 100) + '%';
            contextVideo.inputY.placeholder = !value ? '' : (value * 100) + '%';
            contextVideo.inputY.value = '';
        },
        /**
         * @Override resizing
         * @param {String} xy 'x': width, 'y': height
         * @param {KeyboardEvent} e Event object
         */
        setInputSize: function (xy, e) {
            if (e && e.keyCode === 32) {
                e.preventDefault();
                return;
            }
            var contextVideo = this.context.video;
            this.plugins.resizing._module_setInputSize.call(this, contextVideo, xy);
            if (xy === 'y') {
                this.plugins.video.setVideoRatioSelect.call(this, e.target.value || contextVideo._defaultRatio);
            }
        },
        /**
         * @Override resizing
         */
        setRatio: function () {
            this.plugins.resizing._module_setRatio.call(this, this.context.video);
        },
        submit: function (e) {
            var contextVideo = this.context.video;
            var videoPlugin = this.plugins.video;
            e.preventDefault();
            e.stopPropagation();
            contextVideo._align = contextVideo.modal.querySelector('input[name="suneditor_video_radio"]:checked').value;
            try {
                if (contextVideo.videoInputFile && contextVideo.videoInputFile.files.length > 0) {
                    this.showLoading();
                    videoPlugin.submitAction.call(this, this.context.video.videoInputFile.files);
                }
                else if (contextVideo.videoUrlFile && contextVideo._linkValue.length > 0) {
                    this.showLoading();
                    videoPlugin.setup_url.call(this);
                }
            }
            catch (error) {
                this.closeLoading();
                throw Error('[SUNEDITOR.video.submit.fail] cause : "' + error.message + '"');
            }
            finally {
                this.plugins.dialog.close.call(this);
            }
            return false;
        },
        submitAction: function (fileList) {
            if (fileList.length === 0)
                return;
            var fileSize = 0;
            var files = [];
            for (var i = 0, len = fileList.length; i < len; i++) {
                if (/video/i.test(fileList[i].type)) {
                    files.push(fileList[i]);
                    fileSize += fileList[i].size;
                }
            }
            var limitSize = this.options.videoUploadSizeLimit;
            if (limitSize > 0) {
                var infoSize = 0;
                var videosInfo = this.context.video._infoList;
                for (var i = 0, len = videosInfo.length; i < len; i++) {
                    infoSize += videosInfo[i].size * 1;
                }
                if ((fileSize + infoSize) > limitSize) {
                    this.closeLoading();
                    var err = '[SUNEDITOR.videoUpload.fail] Size of uploadable total videos: ' + (limitSize / 1000) + 'KB';
                    if (typeof this.functions.onVideoUploadError !== 'function' || this.functions.onVideoUploadError(err, { 'limitSize': limitSize, 'currentSize': infoSize, 'uploadSize': fileSize }, this)) {
                        this.functions.noticeOpen(err);
                    }
                    return;
                }
            }
            var contextVideo = this.context.video;
            contextVideo._uploadFileLength = files.length;
            var info = {
                inputWidth: contextVideo.inputX.value,
                inputHeight: contextVideo.inputY.value,
                align: contextVideo._align,
                isUpdate: this.context.dialog.updateModal,
                element: contextVideo._element
            };
            if (typeof this.functions.onVideoUploadBefore === 'function') {
                var result = this.functions.onVideoUploadBefore(files, info, this, function (data) {
                    if (data && this._w.Array.isArray(data.result)) {
                        this.plugins.video.register.call(this, info, data);
                    }
                    else {
                        this.plugins.video.upload.call(this, info, data);
                    }
                }.bind(this));
                if (typeof result === 'undefined')
                    return;
                if (!result) {
                    this.closeLoading();
                    return;
                }
                if (typeof result === 'object' && result.length > 0)
                    files = result;
            }
            this.plugins.video.upload.call(this, info, files);
        },
        error: function (message, response) {
            this.closeLoading();
            if (typeof this.functions.onVideoUploadError !== 'function' || this.functions.onVideoUploadError(message, response, this)) {
                this.functions.noticeOpen(message);
                throw Error('[SUNEDITOR.plugin.video.error] response: ' + message);
            }
        },
        upload: function (info, files) {
            if (!files) {
                this.closeLoading();
                return;
            }
            if (typeof files === 'string') {
                this.plugins.video.error.call(this, files, null);
                return;
            }
            var videoUploadUrl = this.options.videoUploadUrl;
            var filesLen = this.context.dialog.updateModal ? 1 : files.length;
            // server upload
            if (typeof videoUploadUrl === 'string' && videoUploadUrl.length > 0) {
                var formData = new FormData();
                for (var i = 0; i < filesLen; i++) {
                    formData.append('file-' + i, files[i]);
                }
                this.plugins.fileManager.upload.call(this, videoUploadUrl, this.options.videoUploadHeader, formData, this.plugins.video.callBack_videoUpload.bind(this, info), this.functions.onVideoUploadError);
            }
            else {
                throw Error('[SUNEDITOR.videoUpload.fail] cause : There is no "videoUploadUrl" option.');
            }
        },
        callBack_videoUpload: function (info, xmlHttp) {
            if (typeof this.functions.videoUploadHandler === 'function') {
                this.functions.videoUploadHandler(xmlHttp, info, this);
            }
            else {
                var response = JSON.parse(xmlHttp.responseText);
                if (response.errorMessage) {
                    this.plugins.video.error.call(this, response.errorMessage, response);
                }
                else {
                    this.plugins.video.register.call(this, info, response);
                }
            }
        },
        register: function (info, response) {
            var fileList = response.result;
            var videoTag = this.plugins.video.createVideoTag.call(this);
            for (var i = 0, len = fileList.length, file = void 0; i < len; i++) {
                file = { name: fileList[i].name, size: fileList[i].size };
                this.plugins.video.create_video.call(this, (info.isUpdate ? info.element : videoTag.cloneNode(false)), fileList[i].url, info.inputWidth, info.inputHeight, info.align, file, info.isUpdate);
            }
            this.closeLoading();
        },
        setup_url: function () {
            try {
                var contextVideo = this.context.video;
                var url = contextVideo._linkValue;
                if (url.length === 0)
                    return false;
                /** iframe source */
                if (/^<iframe.*\/iframe>$/.test(url)) {
                    var oIframe = (new this._w.DOMParser()).parseFromString(url, 'text/html').querySelector('iframe');
                    url = oIframe.src;
                    if (url.length === 0)
                        return false;
                }
                /** youtube */
                if (/youtu\.?be/.test(url)) {
                    if (!/^http/.test(url))
                        url = 'https://' + url;
                    url = url.replace('watch?v=', '');
                    if (!/^\/\/.+\/embed\//.test(url)) {
                        url = url.replace(url.match(/\/\/.+\//)[0], '//www.youtube.com/embed/').replace('&', '?&');
                    }
                    if (contextVideo._youtubeQuery.length > 0) {
                        if (/\?/.test(url)) {
                            var splitUrl = url.split('?');
                            url = splitUrl[0] + '?' + contextVideo._youtubeQuery + '&' + splitUrl[1];
                        }
                        else {
                            url += '?' + contextVideo._youtubeQuery;
                        }
                    }
                }
                else if (/vimeo\.com/.test(url)) {
                    if (url.endsWith('/')) {
                        url = url.slice(0, -1);
                    }
                    url = 'https://player.vimeo.com/video/' + url.slice(url.lastIndexOf('/') + 1);
                }
                this.plugins.video.create_video.call(this, this.plugins.video.createIframeTag.call(this), url, contextVideo.inputX.value, contextVideo.inputY.value, contextVideo._align, null, this.context.dialog.updateModal);
            }
            catch (error) {
                throw Error('[SUNEDITOR.video.upload.fail] cause : "' + error.message + '"');
            }
            finally {
                this.closeLoading();
            }
        },
        create_video: function (oFrame, src, width, height, align, file, isUpdate) {
            this.context.resizing._resize_plugin = 'video';
            var contextVideo = this.context.video;
            var cover = null;
            var container = null;
            var init = false;
            /** update */
            if (isUpdate) {
                oFrame = contextVideo._element;
                if (oFrame.src !== src) {
                    init = true;
                    var isYoutube = /youtu\.?be/.test(src);
                    var isVimeo = /vimeo\.com/.test(src);
                    if ((isYoutube || isVimeo) && !/^iframe$/i.test(oFrame.nodeName)) {
                        var newTag = this.plugins.video.createIframeTag.call(this);
                        newTag.src = src;
                        oFrame.parentNode.replaceChild(newTag, oFrame);
                        contextVideo._element = oFrame = newTag;
                    }
                    else if (!isYoutube && !isVimeo && !/^videoo$/i.test(oFrame.nodeName)) {
                        var newTag = this.plugins.video.createVideoTag.call(this);
                        newTag.src = src;
                        oFrame.parentNode.replaceChild(newTag, oFrame);
                        contextVideo._element = oFrame = newTag;
                    }
                    else {
                        oFrame.src = src;
                    }
                }
                container = contextVideo._container;
                cover = this.util.getParentElement(oFrame, 'FIGURE');
            }
            /** create */
            else {
                init = true;
                oFrame.src = src;
                contextVideo._element = oFrame;
                cover = this.plugins.component.set_cover.call(this, oFrame);
                container = this.plugins.component.set_container.call(this, cover, 'se-video-container');
            }
            /** rendering */
            contextVideo._cover = cover;
            contextVideo._container = container;
            var inputUpdate = (this.plugins.resizing._module_getSizeX.call(this, contextVideo) !== (width || contextVideo._defaultSizeX)) || (this.plugins.resizing._module_getSizeY.call(this, contextVideo) !== (height || contextVideo._videoRatio));
            var changeSize = !isUpdate || inputUpdate;
            if (contextVideo._resizing) {
                this.context.video._proportionChecked = contextVideo.proportion.checked;
                oFrame.setAttribute('data-proportion', contextVideo._proportionChecked);
            }
            // size
            var isPercent = false;
            if (changeSize) {
                isPercent = this.plugins.video.applySize.call(this);
            }
            // align
            if (!(isPercent && align === 'center')) {
                this.plugins.video.setAlign.call(this, null, oFrame, cover, container);
            }
            var changed = true;
            if (!isUpdate) {
                changed = this.insertComponent(container, false, true, !this.options.mediaAutoSelect);
                if (!this.options.mediaAutoSelect) {
                    var line = this.appendFormatTag(container, null);
                    if (line)
                        this.setRange(line, 0, line, 0);
                }
            }
            else if (contextVideo._resizing && this.context.resizing._rotateVertical && changeSize) {
                this.plugins.resizing.setTransformSize.call(this, oFrame, null, null);
            }
            if (changed) {
                if (init) {
                    this.plugins.fileManager.setInfo.call(this, 'video', oFrame, this.functions.onVideoUpload, file, true);
                }
                if (isUpdate) {
                    this.selectComponent(oFrame, 'video');
                    // history stack
                    this.history.push(false);
                }
            }
            this.context.resizing._resize_plugin = '';
        },
        _update_videoCover: function (oFrame) {
            if (!oFrame)
                return;
            var contextVideo = this.context.video;
            if (/^video$/i.test(oFrame.nodeName))
                this.plugins.video._setTagAttrs.call(this, oFrame);
            else
                this.plugins.video._setIframeAttrs.call(this, oFrame);
            var existElement = this.util.getParentElement(oFrame, this.util.isMediaComponent) ||
                this.util.getParentElement(oFrame, function (current) {
                    return this.isWysiwygDiv(current.parentNode);
                }.bind(this.util));
            var prevFrame = oFrame;
            contextVideo._element = oFrame = oFrame.cloneNode(true);
            var cover = contextVideo._cover = this.plugins.component.set_cover.call(this, oFrame);
            var container = contextVideo._container = this.plugins.component.set_container.call(this, cover, 'se-video-container');
            try {
                var figcaption = existElement.querySelector('figcaption');
                var caption = null;
                if (!!figcaption) {
                    caption = this.util.createElement('DIV');
                    caption.innerHTML = figcaption.innerHTML;
                    this.util.removeItem(figcaption);
                }
                // size
                var size = (oFrame.getAttribute('data-size') || oFrame.getAttribute('data-origin') || '').split(',');
                this.plugins.video.applySize.call(this, (size[0] || prevFrame.style.width || prevFrame.width || ''), (size[1] || prevFrame.style.height || prevFrame.height || ''));
                // align
                var format = this.util.getFormatElement(prevFrame);
                if (format)
                    contextVideo._align = format.style.textAlign || format.style.float;
                this.plugins.video.setAlign.call(this, null, oFrame, cover, container);
                if (this.util.isFormatElement(existElement) && existElement.childNodes.length > 0) {
                    existElement.parentNode.insertBefore(container, existElement);
                    this.util.removeItem(prevFrame);
                    // clean format tag
                    this.util.removeEmptyNode(existElement, null);
                    if (existElement.children.length === 0)
                        existElement.innerHTML = this.util.htmlRemoveWhiteSpace(existElement.innerHTML);
                }
                else {
                    existElement.parentNode.replaceChild(container, existElement);
                }
                if (!!caption)
                    existElement.parentNode.insertBefore(caption, container.nextElementSibling);
            }
            catch (error) {
                console.warn('[SUNEDITOR.video.error] Maybe the video tag is nested.', error);
            }
            this.plugins.fileManager.setInfo.call(this, 'video', oFrame, this.functions.onVideoUpload, null, true);
        },
        /**
         * @Required @Override fileManager, resizing
         */
        onModifyMode: function (element, size) {
            var contextVideo = this.context.video;
            contextVideo._element = element;
            contextVideo._cover = this.util.getParentElement(element, 'FIGURE');
            contextVideo._container = this.util.getParentElement(element, this.util.isMediaComponent);
            contextVideo._align = element.style.float || element.getAttribute('data-align') || 'none';
            element.style.float = '';
            if (size) {
                contextVideo._element_w = size.w;
                contextVideo._element_h = size.h;
                contextVideo._element_t = size.t;
                contextVideo._element_l = size.l;
            }
            var origin = contextVideo._element.getAttribute('data-size') || contextVideo._element.getAttribute('data-origin');
            var w, h;
            if (origin) {
                origin = origin.split(',');
                w = origin[0];
                h = origin[1];
            }
            else if (size) {
                w = size.w;
                h = size.h;
            }
            contextVideo._origin_w = w || element.style.width || element.width || '';
            contextVideo._origin_h = h || element.style.height || element.height || '';
        },
        /**
         * @Required @Override fileManager, resizing
         */
        openModify: function (notOpen) {
            var contextVideo = this.context.video;
            if (contextVideo.videoUrlFile)
                contextVideo._linkValue = contextVideo.preview.textContent = contextVideo.videoUrlFile.value = (contextVideo._element.src || (contextVideo._element.querySelector('source') || '').src || '');
            contextVideo.modal.querySelector('input[name="suneditor_video_radio"][value="' + contextVideo._align + '"]').checked = true;
            if (contextVideo._resizing) {
                this.plugins.resizing._module_setModifyInputSize.call(this, contextVideo, this.plugins.video);
                var y = contextVideo._videoRatio = this.plugins.resizing._module_getSizeY.call(this, contextVideo);
                var ratioSelected = this.plugins.video.setVideoRatioSelect.call(this, y);
                if (!ratioSelected)
                    contextVideo.inputY.value = contextVideo._onlyPercentage ? this.util.getNumber(y, 2) : y;
            }
            if (!notOpen)
                this.plugins.dialog.open.call(this, 'video', true);
        },
        setVideoRatioSelect: function (value) {
            var ratioSelected = false;
            var contextVideo = this.context.video;
            var ratioOptions = contextVideo.videoRatioOption.options;
            if (/%$/.test(value) || contextVideo._onlyPercentage)
                value = (this.util.getNumber(value, 2) / 100) + '';
            else if (!this.util.isNumber(value) || (value * 1) >= 1)
                value = '';
            contextVideo.inputY.placeholder = '';
            for (var i = 0, len = ratioOptions.length; i < len; i++) {
                if (ratioOptions[i].value === value) {
                    ratioSelected = ratioOptions[i].selected = true;
                    contextVideo.inputY.placeholder = !value ? '' : (value * 100) + '%';
                }
                else
                    ratioOptions[i].selected = false;
            }
            return ratioSelected;
        },
        /**
         * @Override fileManager
         */
        checkFileInfo: function () {
            this.plugins.fileManager.checkInfo.call(this, 'video', ['iframe', 'video'], this.functions.onVideoUpload, this.plugins.video._update_videoCover.bind(this), true);
        },
        /**
         * @Override fileManager
         */
        resetFileInfo: function () {
            this.plugins.fileManager.resetInfo.call(this, 'video', this.functions.onVideoUpload);
        },
        /**
         * @Override fileManager
         */
        applySize: function (w, h) {
            var contextVideo = this.context.video;
            if (!w)
                w = contextVideo.inputX.value || this.options.videoWidth;
            if (!h)
                h = contextVideo.inputY.value || this.options.videoHeight;
            if (contextVideo._onlyPercentage || /%$/.test(w) || !w) {
                this.plugins.video.setPercentSize.call(this, (w || '100%'), (h || (/%$/.test(contextVideo._videoRatio) ? contextVideo._videoRatio : contextVideo._defaultRatio)));
                return true;
            }
            else if ((!w || w === 'auto') && (!h || h === 'auto')) {
                this.plugins.video.setAutoSize.call(this);
            }
            else {
                this.plugins.video.setSize.call(this, w, (h || contextVideo._videoRatio || contextVideo._defaultRatio), false);
            }
            return false;
        },
        /**
         * @Override resizing
         */
        sizeRevert: function () {
            this.plugins.resizing._module_sizeRevert.call(this, this.context.video);
        },
        /**
         * @Override resizing
         */
        setSize: function (w, h, notResetPercentage, direction) {
            var contextVideo = this.context.video;
            var onlyW = /^(rw|lw)$/.test(direction);
            var onlyH = /^(th|bh)$/.test(direction);
            if (!onlyH)
                w = this.util.getNumber(w, 0);
            if (!onlyW)
                h = this.util.isNumber(h) ? h + contextVideo.sizeUnit : !h ? '' : h;
            if (!onlyH)
                contextVideo._element.style.width = w ? w + contextVideo.sizeUnit : '';
            if (!onlyW)
                contextVideo._cover.style.paddingBottom = contextVideo._cover.style.height = h;
            if (!onlyH && !/%$/.test(w)) {
                contextVideo._cover.style.width = '';
                contextVideo._container.style.width = '';
            }
            if (!onlyW && !/%$/.test(h)) {
                contextVideo._element.style.height = h;
            }
            else {
                contextVideo._element.style.height = '';
            }
            if (!notResetPercentage)
                contextVideo._element.removeAttribute('data-percentage');
            // save current size
            this.plugins.resizing._module_saveCurrentSize.call(this, contextVideo);
        },
        /**
         * @Override resizing
         */
        setAutoSize: function () {
            this.plugins.video.setPercentSize.call(this, 100, this.context.video._defaultRatio);
        },
        /**
         * @Override resizing
         */
        setOriginSize: function (dataSize) {
            var contextVideo = this.context.video;
            contextVideo._element.removeAttribute('data-percentage');
            this.plugins.resizing.resetTransform.call(this, contextVideo._element);
            this.plugins.video.cancelPercentAttr.call(this);
            var originSize = ((dataSize ? contextVideo._element.getAttribute('data-size') : '') || contextVideo._element.getAttribute('data-origin') || '').split(',');
            if (originSize) {
                var w = originSize[0];
                var h = originSize[1];
                if (contextVideo._onlyPercentage || (/%$/.test(w) && (/%$/.test(h) || !/\d/.test(h)))) {
                    this.plugins.video.setPercentSize.call(this, w, h);
                }
                else {
                    this.plugins.video.setSize.call(this, w, h);
                }
                // save current size
                this.plugins.resizing._module_saveCurrentSize.call(this, contextVideo);
            }
        },
        /**
         * @Override resizing
         */
        setPercentSize: function (w, h) {
            var contextVideo = this.context.video;
            h = !!h && !/%$/.test(h) && !this.util.getNumber(h, 0) ? this.util.isNumber(h) ? h + '%' : h : this.util.isNumber(h) ? h + contextVideo.sizeUnit : (h || contextVideo._defaultRatio);
            contextVideo._container.style.width = this.util.isNumber(w) ? w + '%' : w;
            contextVideo._container.style.height = '';
            contextVideo._cover.style.width = '100%';
            contextVideo._cover.style.height = h;
            contextVideo._cover.style.paddingBottom = h;
            contextVideo._element.style.width = '100%';
            contextVideo._element.style.height = '100%';
            contextVideo._element.style.maxWidth = '';
            if (contextVideo._align === 'center')
                this.plugins.video.setAlign.call(this, null, null, null, null);
            contextVideo._element.setAttribute('data-percentage', w + ',' + h);
            // save current size
            this.plugins.resizing._module_saveCurrentSize.call(this, contextVideo);
        },
        /**
         * @Override resizing
         */
        cancelPercentAttr: function () {
            var contextVideo = this.context.video;
            contextVideo._cover.style.width = '';
            contextVideo._cover.style.height = '';
            contextVideo._cover.style.paddingBottom = '';
            contextVideo._container.style.width = '';
            contextVideo._container.style.height = '';
            this.util.removeClass(contextVideo._container, this.context.video._floatClassRegExp);
            this.util.addClass(contextVideo._container, '__se__float-' + contextVideo._align);
            if (contextVideo._align === 'center')
                this.plugins.video.setAlign.call(this, null, null, null, null);
        },
        /**
         * @Override resizing
         */
        setAlign: function (align, element, cover, container) {
            var contextVideo = this.context.video;
            if (!align)
                align = contextVideo._align;
            if (!element)
                element = contextVideo._element;
            if (!cover)
                cover = contextVideo._cover;
            if (!container)
                container = contextVideo._container;
            if (align && align !== 'none') {
                cover.style.margin = 'auto';
            }
            else {
                cover.style.margin = '0';
            }
            if (/%$/.test(element.style.width) && align === 'center') {
                container.style.minWidth = '100%';
                cover.style.width = container.style.width;
                cover.style.height = cover.style.height;
                cover.style.paddingBottom = !/%$/.test(cover.style.height) ? cover.style.height : this.util.getNumber((this.util.getNumber(cover.style.height, 2) / 100) * this.util.getNumber(cover.style.width, 2), 2) + '%';
            }
            else {
                container.style.minWidth = '';
                cover.style.width = this.context.resizing._rotateVertical ? (element.style.height || element.offsetHeight) : (element.style.width || '100%');
                cover.style.paddingBottom = cover.style.height;
            }
            if (!this.util.hasClass(container, '__se__float-' + align)) {
                this.util.removeClass(container, contextVideo._floatClassRegExp);
                this.util.addClass(container, '__se__float-' + align);
            }
            element.setAttribute('data-align', align);
        },
        /**
         * @Override dialog
         */
        init: function () {
            var contextVideo = this.context.video;
            if (contextVideo.videoInputFile)
                contextVideo.videoInputFile.value = '';
            if (contextVideo.videoUrlFile)
                contextVideo._linkValue = contextVideo.preview.textContent = contextVideo.videoUrlFile.value = '';
            if (contextVideo.videoInputFile && contextVideo.videoUrlFile) {
                contextVideo.videoUrlFile.removeAttribute('disabled');
                contextVideo.preview.style.textDecoration = '';
            }
            contextVideo._origin_w = this.options.videoWidth;
            contextVideo._origin_h = this.options.videoHeight;
            contextVideo.modal.querySelector('input[name="suneditor_video_radio"][value="none"]').checked = true;
            if (contextVideo._resizing) {
                contextVideo.inputX.value = this.options.videoWidth === contextVideo._defaultSizeX ? '' : this.options.videoWidth;
                contextVideo.inputY.value = this.options.videoHeight === contextVideo._defaultSizeY ? '' : this.options.videoHeight;
                contextVideo.proportion.checked = true;
                contextVideo.proportion.disabled = true;
                this.plugins.video.setVideoRatioSelect.call(this, contextVideo._defaultRatio);
            }
        }
    };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var audio = {
        name: 'audio',
        display: 'dialog',
        add: function (core) {
            core.addModule([dialog, component, fileManager]);
            var context = core.context;
            var contextAudio = context.audio = {
                _infoList: [],
                _infoIndex: 0,
                _uploadFileLength: 0,
                focusElement: null,
                targetSelect: null,
                _origin_w: core.options.audioWidth,
                _origin_h: core.options.audioHeight,
                _linkValue: '',
                // @require @Override component
                _element: null,
                _cover: null,
                _container: null,
            };
            /** dialog */
            var audio_dialog = this.setDialog(core);
            contextAudio.modal = audio_dialog;
            contextAudio.audioInputFile = audio_dialog.querySelector('._se_audio_files');
            contextAudio.audioUrlFile = audio_dialog.querySelector('.se-input-url');
            contextAudio.focusElement = contextAudio.audioInputFile || contextAudio.audioUrlFile;
            contextAudio.preview = audio_dialog.querySelector('.se-link-preview');
            /** controller */
            var audio_controller = this.setController(core);
            contextAudio.controller = audio_controller;
            /** add event listeners */
            audio_dialog.querySelector('form').addEventListener('submit', this.submit.bind(core));
            if (contextAudio.audioInputFile)
                audio_dialog.querySelector('.se-dialog-files-edge-button').addEventListener('click', this._removeSelectedFiles.bind(contextAudio.audioInputFile, contextAudio.audioUrlFile, contextAudio.preview));
            if (contextAudio.audioInputFile && contextAudio.audioUrlFile)
                contextAudio.audioInputFile.addEventListener('change', this._fileInputChange.bind(contextAudio));
            audio_controller.addEventListener('click', this.onClick_controller.bind(core));
            if (contextAudio.audioUrlFile)
                contextAudio.audioUrlFile.addEventListener('input', this._onLinkPreview.bind(contextAudio.preview, contextAudio, core.options.linkProtocol));
            /** append html */
            context.dialog.modal.appendChild(audio_dialog);
            /** append controller */
            context.element.relative.appendChild(audio_controller);
            /** empty memory */
            audio_dialog = null, audio_controller = null;
        },
        /** HTML - dialog */
        setDialog: function (core) {
            var option = core.options;
            var lang = core.lang;
            var dialog = core.util.createElement('DIV');
            dialog.className = 'se-dialog-content';
            dialog.style.display = 'none';
            var html = '' +
                '<form method="post" enctype="multipart/form-data">' +
                '<div class="se-dialog-header">' +
                '<button type="button" data-command="close" class="se-btn se-dialog-close" aria-label="Close" title="' + lang.dialogBox.close + '">' +
                core.icons.cancel +
                '</button>' +
                '<span class="se-modal-title">' + lang.dialogBox.audioBox.title + '</span>' +
                '</div>' +
                '<div class="se-dialog-body">';
            if (option.audioFileInput) {
                html += '' +
                    '<div class="se-dialog-form">' +
                    '<label>' + lang.dialogBox.audioBox.file + '</label>' +
                    '<div class="se-dialog-form-files">' +
                    '<input class="se-input-form _se_audio_files" type="file" accept="' + option.audioAccept + '"' + (option.audioMultipleFile ? ' multiple="multiple"' : '') + '/>' +
                    '<button type="button" data-command="filesRemove" class="se-btn se-dialog-files-edge-button se-file-remove" title="' + lang.controller.remove + '">' + core.icons.cancel + '</button>' +
                    '</div>' +
                    '</div>';
            }
            if (option.audioUrlInput) {
                html += '' +
                    '<div class="se-dialog-form">' +
                    '<label>' + lang.dialogBox.audioBox.url + '</label>' +
                    '<input class="se-input-form se-input-url" type="text" />' +
                    '<pre class="se-link-preview"></pre>' +
                    '</div>';
            }
            html += '' +
                '</div>' +
                '<div class="se-dialog-footer">' +
                '<button type="submit" class="se-btn-primary" title="' + lang.dialogBox.submitButton + '"><span>' + lang.dialogBox.submitButton + '</span></button>' +
                '</div>' +
                '</form>';
            dialog.innerHTML = html;
            return dialog;
        },
        /** HTML - controller */
        setController: function (core) {
            var lang = core.lang;
            var icons = core.icons;
            var link_btn = core.util.createElement('DIV');
            link_btn.className = 'se-controller se-controller-link';
            link_btn.innerHTML = '' +
                '<div class="se-arrow se-arrow-up"></div>' +
                '<div class="link-content">' +
                '<div class="se-btn-group">' +
                '<button type="button" data-command="update" tabindex="-1" class="se-tooltip">' +
                icons.edit +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.edit + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="delete" tabindex="-1" class="se-tooltip">' +
                icons.delete +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.remove + '</span></span>' +
                '</button>' +
                '</div>' +
                '</div>';
            return link_btn;
        },
        // Disable url input when uploading files
        _fileInputChange: function () {
            if (!this.audioInputFile.value) {
                this.audioUrlFile.removeAttribute('disabled');
                this.preview.style.textDecoration = '';
            }
            else {
                this.audioUrlFile.setAttribute('disabled', true);
                this.preview.style.textDecoration = 'line-through';
            }
        },
        // Disable url input when uploading files
        _removeSelectedFiles: function (urlInput, preview) {
            this.value = '';
            if (urlInput) {
                urlInput.removeAttribute('disabled');
                preview.style.textDecoration = '';
            }
        },
        // create new audio tag
        _createAudioTag: function () {
            var oAudio = this.util.createElement('AUDIO');
            this.plugins.audio._setTagAttrs.call(this, oAudio);
            var w = this.context.audio._origin_w;
            var h = this.context.audio._origin_h;
            oAudio.setAttribute('origin-size', w + ',' + h);
            oAudio.style.cssText = (w ? ('width:' + w + '; ') : '') + (h ? ('height:' + h + ';') : '');
            return oAudio;
        },
        _setTagAttrs: function (element) {
            element.setAttribute('controls', true);
            var attrs = this.options.audioTagAttrs;
            if (!attrs)
                return;
            for (var key in attrs) {
                if (!this.util.hasOwn(attrs, key))
                    continue;
                element.setAttribute(key, attrs[key]);
            }
        },
        _onLinkPreview: function (context, protocol, e) {
            var value = e.target.value.trim();
            context._linkValue = this.textContent = !value ? '' : (protocol && value.indexOf('://') === -1 && value.indexOf('#') !== 0) ? protocol + value : value.indexOf('://') === -1 ? '/' + value : value;
        },
        /**
         * @Required @Override fileManager
         */
        fileTags: ['audio'],
        /**
         * @Override core, fileManager, resizing
         * @description It is called from core.selectComponent.
         * @param {Element} element Target element
         */
        select: function (element) {
            this.plugins.audio.onModifyMode.call(this, element);
        },
        /**
         * @Override fileManager, resizing
         */
        destroy: function (element) {
            element = element || this.context.audio._element;
            var container = this.util.getParentElement(element, this.util.isComponent) || element;
            var dataIndex = element.getAttribute('data-index') * 1;
            var focusEl = (container.previousElementSibling || container.nextElementSibling);
            var emptyDiv = container.parentNode;
            this.util.removeItem(container);
            this.plugins.audio.init.call(this);
            this.controllersOff();
            if (emptyDiv !== this.context.element.wysiwyg)
                this.util.removeItemAllParents(emptyDiv, function (current) { return current.childNodes.length === 0; }, null);
            // focus
            this.focusEdge(focusEl);
            // fileManager event
            this.plugins.fileManager.deleteInfo.call(this, 'audio', dataIndex, this.functions.onAudioUpload);
            // history stack
            this.history.push(false);
        },
        /**
         * @Override fileManager
         */
        checkFileInfo: function () {
            this.plugins.fileManager.checkInfo.call(this, 'audio', ['audio'], this.functions.onAudioUpload, this.plugins.audio.updateCover.bind(this), false);
        },
        /**
         * @Override fileManager
         */
        resetFileInfo: function () {
            this.plugins.fileManager.resetInfo.call(this, 'audio', this.functions.onAudioUpload);
        },
        /**
         * @Required @Override dialog
         */
        on: function (update) {
            var contextAudio = this.context.audio;
            if (!update) {
                this.plugins.audio.init.call(this);
                if (contextAudio.audioInputFile && this.options.audioMultipleFile)
                    contextAudio.audioInputFile.setAttribute('multiple', 'multiple');
            }
            else if (contextAudio._element) {
                this.context.dialog.updateModal = true;
                contextAudio._linkValue = contextAudio.preview.textContent = contextAudio.audioUrlFile.value = contextAudio._element.src;
                if (contextAudio.audioInputFile && this.options.audioMultipleFile)
                    contextAudio.audioInputFile.removeAttribute('multiple');
            }
            else {
                if (contextAudio.audioInputFile && this.options.audioMultipleFile)
                    contextAudio.audioInputFile.removeAttribute('multiple');
            }
        },
        /**
         * @Required @Override dialog
         */
        open: function () {
            this.plugins.dialog.open.call(this, 'audio', 'audio' === this.currentControllerName);
        },
        submit: function (e) {
            var contextAudio = this.context.audio;
            e.preventDefault();
            e.stopPropagation();
            try {
                if (contextAudio.audioInputFile && contextAudio.audioInputFile.files.length > 0) {
                    this.showLoading();
                    this.plugins.audio.submitAction.call(this, contextAudio.audioInputFile.files);
                }
                else if (contextAudio.audioUrlFile && contextAudio._linkValue.length > 0) {
                    this.showLoading();
                    this.plugins.audio.setupUrl.call(this, contextAudio._linkValue);
                }
            }
            catch (error) {
                this.closeLoading();
                throw Error('[SUNEDITOR.audio.submit.fail] cause : "' + error.message + '"');
            }
            finally {
                this.plugins.dialog.close.call(this);
            }
            return false;
        },
        submitAction: function (fileList) {
            if (fileList.length === 0)
                return;
            var fileSize = 0;
            var files = [];
            for (var i = 0, len = fileList.length; i < len; i++) {
                if (/audio/i.test(fileList[i].type)) {
                    files.push(fileList[i]);
                    fileSize += fileList[i].size;
                }
            }
            var limitSize = this.options.audioUploadSizeLimit;
            if (limitSize > 0) {
                var infoSize = 0;
                var audiosInfo = this.context.audio._infoList;
                for (var i = 0, len = audiosInfo.length; i < len; i++) {
                    infoSize += audiosInfo[i].size * 1;
                }
                if ((fileSize + infoSize) > limitSize) {
                    this.closeLoading();
                    var err = '[SUNEDITOR.audioUpload.fail] Size of uploadable total audios: ' + (limitSize / 1000) + 'KB';
                    if (typeof this.functions.onAudioUploadError !== 'function' || this.functions.onAudioUploadError(err, { 'limitSize': limitSize, 'currentSize': infoSize, 'uploadSize': fileSize }, this)) {
                        this.functions.noticeOpen(err);
                    }
                    return;
                }
            }
            var contextAudio = this.context.audio;
            contextAudio._uploadFileLength = files.length;
            var info = {
                isUpdate: this.context.dialog.updateModal,
                element: contextAudio._element
            };
            if (typeof this.functions.onAudioUploadBefore === 'function') {
                var result = this.functions.onAudioUploadBefore(files, info, this, function (data) {
                    if (data && this._w.Array.isArray(data.result)) {
                        this.plugins.audio.register.call(this, info, data);
                    }
                    else {
                        this.plugins.audio.upload.call(this, info, data);
                    }
                }.bind(this));
                if (typeof result === 'undefined')
                    return;
                if (!result) {
                    this.closeLoading();
                    return;
                }
                if (typeof result === 'object' && result.length > 0)
                    files = result;
            }
            this.plugins.audio.upload.call(this, info, files);
        },
        error: function (message, response) {
            this.closeLoading();
            if (typeof this.functions.onAudioUploadError !== 'function' || this.functions.onAudioUploadError(message, response, this)) {
                this.functions.noticeOpen(message);
                throw Error('[SUNEDITOR.plugin.audio.exception] response: ' + message);
            }
        },
        upload: function (info, files) {
            if (!files) {
                this.closeLoading();
                return;
            }
            if (typeof files === 'string') {
                this.plugins.audio.error.call(this, files, null);
                return;
            }
            var audioUploadUrl = this.options.audioUploadUrl;
            var filesLen = this.context.dialog.updateModal ? 1 : files.length;
            // create formData
            var formData = new FormData();
            for (var i = 0; i < filesLen; i++) {
                formData.append('file-' + i, files[i]);
            }
            // server upload
            this.plugins.fileManager.upload.call(this, audioUploadUrl, this.options.audioUploadHeader, formData, this.plugins.audio.callBack_upload.bind(this, info), this.functions.onAudioUploadError);
        },
        callBack_upload: function (info, xmlHttp) {
            if (typeof this.functions.audioUploadHandler === 'function') {
                this.functions.audioUploadHandler(xmlHttp, info, this);
            }
            else {
                var response = JSON.parse(xmlHttp.responseText);
                if (response.errorMessage) {
                    this.plugins.audio.error.call(this, response.errorMessage, response);
                }
                else {
                    this.plugins.audio.register.call(this, info, response);
                }
            }
        },
        register: function (info, response) {
            var fileList = response.result;
            for (var i = 0, len = fileList.length, file = void 0, oAudio = void 0; i < len; i++) {
                if (info.isUpdate)
                    oAudio = info.element;
                else
                    oAudio = this.plugins.audio._createAudioTag.call(this);
                file = { name: fileList[i].name, size: fileList[i].size };
                this.plugins.audio.create_audio.call(this, oAudio, fileList[i].url, file, info.isUpdate);
            }
            this.closeLoading();
        },
        setupUrl: function (src) {
            try {
                if (src.length === 0)
                    return false;
                this.plugins.audio.create_audio.call(this, this.plugins.audio._createAudioTag.call(this), src, null, this.context.dialog.updateModal);
            }
            catch (error) {
                throw Error('[SUNEDITOR.audio.audio.fail] cause : "' + error.message + '"');
            }
            finally {
                this.closeLoading();
            }
        },
        create_audio: function (element, src, file, isUpdate) {
            var contextAudio = this.context.audio;
            // create new tag
            if (!isUpdate) {
                element.src = src;
                var cover = this.plugins.component.set_cover.call(this, element);
                var container = this.plugins.component.set_container.call(this, cover, '');
                if (!this.insertComponent(container, false, true, !this.options.mediaAutoSelect)) {
                    this.focus();
                    return;
                }
                if (!this.options.mediaAutoSelect) {
                    var line = this.appendFormatTag(container, null);
                    if (line)
                        this.setRange(line, 0, line, 0);
                }
            } // update
            else {
                if (contextAudio._element)
                    element = contextAudio._element;
                if (element && element.src !== src) {
                    element.src = src;
                    this.selectComponent(element, 'audio');
                }
                else {
                    this.selectComponent(element, 'audio');
                    return;
                }
            }
            this.plugins.fileManager.setInfo.call(this, 'audio', element, this.functions.onAudioUpload, file, false);
            if (isUpdate)
                this.history.push(false);
        },
        updateCover: function (element) {
            var contextAudio = this.context.audio;
            this.plugins.audio._setTagAttrs.call(this, element);
            // find component element
            var existElement = this.util.getParentElement(element, this.util.isMediaComponent) ||
                this.util.getParentElement(element, function (current) {
                    return this.isWysiwygDiv(current.parentNode);
                }.bind(this.util));
            // clone element
            var prevElement = element;
            contextAudio._element = element = element.cloneNode(false);
            var cover = this.plugins.component.set_cover.call(this, element);
            var container = this.plugins.component.set_container.call(this, cover, 'se-audio-container');
            try {
                if (this.util.isFormatElement(existElement) && existElement.childNodes.length > 0) {
                    existElement.parentNode.insertBefore(container, existElement);
                    this.util.removeItem(prevElement);
                    // clean format tag
                    this.util.removeEmptyNode(existElement, null);
                    if (existElement.children.length === 0)
                        existElement.innerHTML = this.util.htmlRemoveWhiteSpace(existElement.innerHTML);
                }
                else {
                    existElement.parentNode.replaceChild(container, existElement);
                }
            }
            catch (error) {
                console.warn('[SUNEDITOR.audio.error] Maybe the audio tag is nested.', error);
            }
            this.plugins.fileManager.setInfo.call(this, 'audio', element, this.functions.onAudioUpload, null, false);
        },
        /**
         * @Required @Override fileManager, resizing
         */
        onModifyMode: function (selectionTag) {
            var contextAudio = this.context.audio;
            this.setControllerPosition(contextAudio.controller, selectionTag, 'bottom', { left: 0, top: 0 });
            this.controllersOn(contextAudio.controller, selectionTag, this.plugins.audio.onControllerOff.bind(this, selectionTag), 'audio');
            this.util.addClass(selectionTag, 'active');
            contextAudio._element = selectionTag;
            contextAudio._cover = this.util.getParentElement(selectionTag, 'FIGURE');
            contextAudio._container = this.util.getParentElement(selectionTag, this.util.isComponent);
        },
        /**
         * @Required @Override fileManager, resizing
         */
        openModify: function (notOpen) {
            if (this.context.audio.audioUrlFile) {
                var contextAudio = this.context.audio;
                contextAudio._linkValue = contextAudio.preview.textContent = contextAudio.audioUrlFile.value = contextAudio._element.src;
            }
            if (!notOpen)
                this.plugins.dialog.open.call(this, 'audio', true);
        },
        onClick_controller: function (e) {
            e.stopPropagation();
            var command = e.target.getAttribute('data-command');
            if (!command)
                return;
            e.preventDefault();
            if (/update/.test(command)) {
                this.plugins.audio.openModify.call(this, false);
            }
            else { /** delete */
                this.plugins.audio.destroy.call(this, this.context.audio._element);
            }
            this.controllersOff();
        },
        onControllerOff: function (selectionTag) {
            this.util.removeClass(selectionTag, 'active');
            this.context.audio.controller.style.display = 'none';
        },
        /**
         * @Required @Override dialog
         */
        init: function () {
            if (this.context.dialog.updateModal)
                return;
            var contextAudio = this.context.audio;
            if (contextAudio.audioInputFile)
                contextAudio.audioInputFile.value = '';
            if (contextAudio.audioUrlFile)
                contextAudio._linkValue = contextAudio.preview.textContent = contextAudio.audioUrlFile.value = '';
            if (contextAudio.audioInputFile && contextAudio.audioUrlFile) {
                contextAudio.audioUrlFile.removeAttribute('disabled');
                contextAudio.preview.style.textDecoration = '';
            }
            contextAudio._element = null;
        }
    };

    'use strict';
    var math = {
        name: 'math',
        display: 'dialog',
        add: function (core) {
            core.addModule([dialog]);
            var context = core.context;
            context.math = {
                focusElement: null,
                previewElement: null,
                fontSizeElement: null,
                defaultFontSize: '',
                _mathExp: null
            };
            /** math dialog */
            var math_dialog = this.setDialog(core);
            context.math.modal = math_dialog;
            context.math.focusElement = math_dialog.querySelector('.se-math-exp');
            context.math.previewElement = math_dialog.querySelector('.se-math-preview');
            context.math.fontSizeElement = math_dialog.querySelector('.se-math-size');
            context.math.focusElement.addEventListener('keyup', this._renderMathExp.bind(core, context.math), false);
            context.math.focusElement.addEventListener('change', this._renderMathExp.bind(core, context.math), false);
            context.math.fontSizeElement.addEventListener('change', function (e) { this.fontSize = e.target.value; }.bind(context.math.previewElement.style), false);
            /** math controller */
            var math_controller = this.setController_MathButton(core);
            context.math.mathController = math_controller;
            context.math._mathExp = null;
            /** add event listeners */
            math_dialog.querySelector('form').addEventListener('submit', this.submit.bind(core), false);
            math_controller.addEventListener('click', this.onClick_mathController.bind(core));
            context.math.previewElement.style.fontSize = context.math.defaultFontSize;
            /** append html */
            context.dialog.modal.appendChild(math_dialog);
            context.element.relative.appendChild(math_controller);
            /** empty memory */
            math_dialog = null, math_controller = null;
        },
        /** dialog */
        setDialog: function (core) {
            var lang = core.lang;
            var dialog = core.util.createElement('DIV');
            var fontSize = core.options.mathFontSize;
            var defaultFontSize = fontSize[0].value;
            dialog.className = 'se-dialog-content';
            dialog.style.display = 'none';
            var html = '' +
                '<form>' +
                '<div class="se-dialog-header">' +
                '<button type="button" data-command="close" class="se-btn se-dialog-close" aria-label="Close" title="' + lang.dialogBox.close + '">' +
                core.icons.cancel +
                '</button>' +
                '<span class="se-modal-title">' + lang.dialogBox.mathBox.title + '</span>' +
                '</div>' +
                '<div class="se-dialog-body">' +
                '<div class="se-dialog-form">' +
                '<label>' + lang.dialogBox.mathBox.inputLabel + ' (<a href="https://katex.org/docs/supported.html" target="_blank">KaTeX</a>)</label>' +
                '<textarea class="se-input-form se-math-exp" type="text"></textarea>' +
                '</div>' +
                '<div class="se-dialog-form">' +
                '<label>' + lang.dialogBox.mathBox.fontSizeLabel + '</label>' +
                '<select class="se-input-select se-math-size">';
            for (var i = 0, len = fontSize.length, f = void 0; i < len; i++) {
                f = fontSize[i];
                if (f.default)
                    defaultFontSize = f.value;
                html += '<option value="' + f.value + '"' + (f.default ? ' selected' : '') + '>' + f.text + '</option>';
            }
            html += '</select>' +
                '</div>' +
                '<div class="se-dialog-form">' +
                '<label>' + lang.dialogBox.mathBox.previewLabel + '</label>' +
                '<p class="se-math-preview"></p>' +
                '</div>' +
                '</div>' +
                '<div class="se-dialog-footer">' +
                '<button type="submit" class="se-btn-primary" title="' + lang.dialogBox.submitButton + '"><span>' + lang.dialogBox.submitButton + '</span></button>' +
                '</div>' +
                '</form>';
            core.context.math.defaultFontSize = defaultFontSize;
            dialog.innerHTML = html;
            return dialog;
        },
        /** modify controller button */
        setController_MathButton: function (core) {
            var lang = core.lang;
            var math_btn = core.util.createElement('DIV');
            math_btn.className = 'se-controller se-controller-link';
            math_btn.innerHTML = '' +
                '<div class="se-arrow se-arrow-up"></div>' +
                '<div class="link-content">' +
                '<div class="se-btn-group">' +
                '<button type="button" data-command="update" tabindex="-1" class="se-btn se-tooltip">' +
                core.icons.edit +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.edit + '</span></span>' +
                '</button>' +
                '<button type="button" data-command="delete" tabindex="-1" class="se-btn se-tooltip">' +
                core.icons.delete +
                '<span class="se-tooltip-inner"><span class="se-tooltip-text">' + lang.controller.remove + '</span></span>' +
                '</button>' +
                '</div>' +
                '</div>' +
                '';
            return math_btn;
        },
        /**
         * @Required @Override dialog
         */
        open: function () {
            this.plugins.dialog.open.call(this, 'math', 'math' === this.currentControllerName);
        },
        /**
         * @Override core - managedTagsInfo
         */
        managedTags: function () {
            return {
                className: 'katex',
                method: function (element) {
                    if (!element.getAttribute('data-exp') || !this.options.katex)
                        return;
                    var dom = this._d.createRange().createContextualFragment(this.plugins.math._renderer.call(this, this.util.HTMLDecoder(element.getAttribute('data-exp'))));
                    element.innerHTML = dom.querySelector('.katex').innerHTML;
                }
            };
        },
        _renderer: function (exp) {
            var katex = this.options.katex;
            return katex.src.renderToString(exp, katex.options);
        },
        _renderMathExp: function (contextMath, e) {
            contextMath.previewElement.innerHTML = this.plugins.math._renderer.call(this, e.target.value);
        },
        submit: function (e) {
            this.showLoading();
            e.preventDefault();
            e.stopPropagation();
            var submitAction = function () {
                if (this.context.math.focusElement.value.trim().length === 0)
                    return false;
                var contextMath = this.context.math;
                var mathExp = contextMath.focusElement.value;
                var katexEl = contextMath.previewElement.querySelector('.katex');
                if (!katexEl)
                    return false;
                katexEl.className = '__se__katex ' + katexEl.className;
                katexEl.setAttribute('contenteditable', false);
                katexEl.setAttribute('data-exp', this.util.HTMLEncoder(mathExp));
                katexEl.setAttribute('data-font-size', contextMath.fontSizeElement.value);
                katexEl.style.fontSize = contextMath.fontSizeElement.value;
                if (!this.context.dialog.updateModal) {
                    var selectedFormats = this.getSelectedElements();
                    if (selectedFormats.length > 1) {
                        var oFormat = this.util.createElement(selectedFormats[0].nodeName);
                        oFormat.appendChild(katexEl);
                        if (!this.insertNode(oFormat, null, true))
                            return false;
                    }
                    else {
                        if (!this.insertNode(katexEl, null, true))
                            return false;
                    }
                    var empty = this.util.createTextNode(this.util.zeroWidthSpace);
                    katexEl.parentNode.insertBefore(empty, katexEl.nextSibling);
                    this.setRange(katexEl, 0, katexEl, 1);
                }
                else {
                    var containerEl = this.util.getParentElement(contextMath._mathExp, '.katex');
                    containerEl.parentNode.replaceChild(katexEl, containerEl);
                    this.setRange(katexEl, 0, katexEl, 1);
                }
                contextMath.focusElement.value = '';
                contextMath.fontSizeElement.value = '1em';
                contextMath.previewElement.style.fontSize = '1em';
                contextMath.previewElement.innerHTML = '';
                return true;
            }.bind(this);
            try {
                if (submitAction()) {
                    this.plugins.dialog.close.call(this);
                    // history stack
                    this.history.push(false);
                }
            }
            catch (e) {
                this.plugins.dialog.close.call(this);
            }
            finally {
                this.closeLoading();
            }
            return false;
        },
        active: function (element) {
            if (!element) {
                if (this.controllerArray.indexOf(this.context.math.mathController) > -1) {
                    this.controllersOff();
                }
            }
            else if (element.getAttribute('data-exp')) {
                if (this.controllerArray.indexOf(this.context.math.mathController) < 0) {
                    this.setRange(element, 0, element, 1);
                    this.plugins.math.call_controller.call(this, element);
                }
                return true;
            }
            return false;
        },
        on: function (update) {
            if (!update) {
                this.plugins.math.init.call(this);
            }
            else {
                var contextMath = this.context.math;
                if (contextMath._mathExp) {
                    var exp = this.util.HTMLDecoder(contextMath._mathExp.getAttribute('data-exp'));
                    var fontSize = contextMath._mathExp.getAttribute('data-font-size') || '1em';
                    this.context.dialog.updateModal = true;
                    contextMath.focusElement.value = exp;
                    contextMath.fontSizeElement.value = fontSize;
                    contextMath.previewElement.innerHTML = this.plugins.math._renderer.call(this, exp);
                    contextMath.previewElement.style.fontSize = fontSize;
                }
            }
        },
        call_controller: function (mathTag) {
            this.context.math._mathExp = mathTag;
            var mathBtn = this.context.math.mathController;
            this.setControllerPosition(mathBtn, mathTag, 'bottom', { left: 0, top: 0 });
            this.controllersOn(mathBtn, mathTag, 'math');
        },
        onClick_mathController: function (e) {
            e.stopPropagation();
            var command = e.target.getAttribute('data-command') || e.target.parentNode.getAttribute('data-command');
            if (!command)
                return;
            e.preventDefault();
            if (/update/.test(command)) {
                this.context.math.focusElement.value = this.util.HTMLDecoder(this.context.math._mathExp.getAttribute('data-exp'));
                this.plugins.dialog.open.call(this, 'math', true);
            }
            else {
                /** delete */
                this.util.removeItem(this.context.math._mathExp);
                this.context.math._mathExp = null;
                this.focus();
                // history stack
                this.history.push(false);
            }
            this.controllersOff();
        },
        init: function () {
            var contextMath = this.context.math;
            contextMath.mathController.style.display = 'none';
            contextMath._mathExp = null;
            contextMath.focusElement.value = '';
            contextMath.previewElement.innerHTML = '';
        }
    };

    var fileBrowser$1 = { exports: {} };

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    (function (module) {
        'use strict';
        (function (global, factory) {
            if ('object' === 'object' && 'object' === 'object') {
                module.exports = global.document ?
                    factory(global, true) :
                    function (w) {
                        if (!w.document) {
                            throw new Error('SUNEDITOR_MODULES a window with a document');
                        }
                        return factory(w);
                    };
            }
            else {
                factory(global);
            }
        }(typeof window !== 'undefined' ? window : commonjsGlobal, function (window, noGlobal) {
            var fileBrowser = {
                name: 'fileBrowser',
                _xmlHttp: null,
                _loading: null,
                /**
                 * @description Constructor
                 * @param {Object} core Core object
                 */
                add: function (core) {
                    var context = core.context;
                    context.fileBrowser = {
                        _closeSignal: false,
                        area: null,
                        header: null,
                        tagArea: null,
                        body: null,
                        list: null,
                        tagElements: null,
                        items: [],
                        selectedTags: [],
                        selectorHandler: null,
                        contextPlugin: '',
                        columnSize: 4
                    };
                    /** fileBrowser */
                    var browser_div = core.util.createElement('DIV');
                    browser_div.className = 'se-file-browser sun-editor-common';
                    var back = core.util.createElement('DIV');
                    back.className = 'se-file-browser-back';
                    var content = core.util.createElement('DIV');
                    content.className = 'se-file-browser-inner';
                    content.innerHTML = this.set_browser(core);
                    browser_div.appendChild(back);
                    browser_div.appendChild(content);
                    this._loading = browser_div.querySelector('.se-loading-box');
                    context.fileBrowser.area = browser_div;
                    context.fileBrowser.header = content.querySelector('.se-file-browser-header');
                    context.fileBrowser.titleArea = content.querySelector('.se-file-browser-title');
                    context.fileBrowser.tagArea = content.querySelector('.se-file-browser-tags');
                    context.fileBrowser.body = content.querySelector('.se-file-browser-body');
                    context.fileBrowser.list = content.querySelector('.se-file-browser-list');
                    /** add event listeners */
                    context.fileBrowser.tagArea.addEventListener('click', this.onClickTag.bind(core));
                    context.fileBrowser.list.addEventListener('click', this.onClickFile.bind(core));
                    content.addEventListener('mousedown', this._onMouseDown_browser.bind(core));
                    content.addEventListener('click', this._onClick_browser.bind(core));
                    /** append html */
                    context.element.relative.appendChild(browser_div);
                    /** empty memory */
                    browser_div = null, back = null, content = null;
                },
                set_browser: function (core) {
                    var lang = core.lang;
                    return '<div class="se-file-browser-content">' +
                        '<div class="se-file-browser-header">' +
                        '<button type="button" data-command="close" class="se-btn se-file-browser-close" class="close" aria-label="Close" title="' + lang.dialogBox.close + '">' +
                        core.icons.cancel +
                        '</button>' +
                        '<span class="se-file-browser-title"></span>' +
                        '<div class="se-file-browser-tags"></div>' +
                        '</div>' +
                        '<div class="se-file-browser-body">' +
                        '<div class="se-loading-box sun-editor-common"><div class="se-loading-effect"></div></div>' +
                        '<div class="se-file-browser-list"></div>' +
                        '</div>' +
                        '</div>';
                },
                /**
                 * @description Event to control the behavior of closing the browser
                 * @param {MouseEvent} e Event object
                 * @private
                 */
                _onMouseDown_browser: function (e) {
                    if (/se-file-browser-inner/.test(e.target.className)) {
                        this.context.fileBrowser._closeSignal = true;
                    }
                    else {
                        this.context.fileBrowser._closeSignal = false;
                    }
                },
                /**
                 * @description Event to close the window when the outside area of the browser or close button is click
                 * @param {MouseEvent} e Event object
                 * @private
                 */
                _onClick_browser: function (e) {
                    e.stopPropagation();
                    if (/close/.test(e.target.getAttribute('data-command')) || this.context.fileBrowser._closeSignal) {
                        this.plugins.fileBrowser.close.call(this);
                    }
                },
                /**
                 * @description Open a file browser plugin
                 * @param {String} pluginName Plugin name using the file browser
                 * @param {Function|null} selectorHandler When the function comes as an argument value, it substitutes "context.selectorHandler".
                 */
                open: function (pluginName, selectorHandler) {
                    if (this.plugins.fileBrowser._bindClose) {
                        this._d.removeEventListener('keydown', this.plugins.fileBrowser._bindClose);
                        this.plugins.fileBrowser._bindClose = null;
                    }
                    this.plugins.fileBrowser._bindClose = function (e) {
                        if (!/27/.test(e.keyCode))
                            return;
                        this.plugins.fileBrowser.close.call(this);
                    }.bind(this);
                    this._d.addEventListener('keydown', this.plugins.fileBrowser._bindClose);
                    var fileBrowserContext = this.context.fileBrowser;
                    fileBrowserContext.contextPlugin = pluginName;
                    fileBrowserContext.selectorHandler = selectorHandler;
                    var pluginContext = this.context[pluginName];
                    var listClassName = pluginContext.listClass;
                    if (!this.util.hasClass(fileBrowserContext.list, listClassName)) {
                        fileBrowserContext.list.className = 'se-file-browser-list ' + listClassName;
                    }
                    if (this.options.popupDisplay === 'full') {
                        fileBrowserContext.area.style.position = 'fixed';
                    }
                    else {
                        fileBrowserContext.area.style.position = 'absolute';
                    }
                    fileBrowserContext.titleArea.textContent = pluginContext.title;
                    fileBrowserContext.area.style.display = 'block';
                    this.plugins.fileBrowser._drawFileList.call(this, this.context[pluginName].url, this.context[pluginName].header);
                },
                _bindClose: null,
                /**
                 * @description Close a fileBrowser plugin
                 * The plugin's "init" method is called.
                 */
                close: function () {
                    var fileBrowserPlugin = this.plugins.fileBrowser;
                    if (fileBrowserPlugin._xmlHttp) {
                        fileBrowserPlugin._xmlHttp.abort();
                    }
                    if (fileBrowserPlugin._bindClose) {
                        this._d.removeEventListener('keydown', fileBrowserPlugin._bindClose);
                        fileBrowserPlugin._bindClose = null;
                    }
                    var fileBrowserContext = this.context.fileBrowser;
                    fileBrowserContext.area.style.display = 'none';
                    fileBrowserContext.selectorHandler = null;
                    fileBrowserContext.selectedTags = [];
                    fileBrowserContext.items = [];
                    fileBrowserContext.list.innerHTML = fileBrowserContext.tagArea.innerHTML = fileBrowserContext.titleArea.textContent = '';
                    if (typeof this.plugins[fileBrowserContext.contextPlugin].init === 'function')
                        this.plugins[fileBrowserContext.contextPlugin].init.call(this);
                    fileBrowserContext.contextPlugin = '';
                },
                /**
                 * @description Show file browser loading box
                 */
                showBrowserLoading: function () {
                    this._loading.style.display = 'block';
                },
                /**
                 * @description Close file browser loading box
                 */
                closeBrowserLoading: function () {
                    this._loading.style.display = 'none';
                },
                _drawFileList: function (url, browserHeader) {
                    var fileBrowserPlugin = this.plugins.fileBrowser;
                    var xmlHttp = fileBrowserPlugin._xmlHttp = this.util.getXMLHttpRequest();
                    xmlHttp.onreadystatechange = fileBrowserPlugin._callBackGet.bind(this, xmlHttp);
                    xmlHttp.open('get', url, true);
                    if (browserHeader !== null && typeof browserHeader === 'object' && this._w.Object.keys(browserHeader).length > 0) {
                        for (var key in browserHeader) {
                            xmlHttp.setRequestHeader(key, browserHeader[key]);
                        }
                    }
                    xmlHttp.send(null);
                    this.plugins.fileBrowser.showBrowserLoading();
                },
                _callBackGet: function (xmlHttp) {
                    if (xmlHttp.readyState === 4) {
                        this.plugins.fileBrowser._xmlHttp = null;
                        if (xmlHttp.status === 200) {
                            try {
                                this.plugins.fileBrowser._drawListItem.call(this, JSON.parse(xmlHttp.responseText).result, true);
                            }
                            catch (e) {
                                throw Error('[SUNEDITOR.fileBrowser.drawList.fail] cause : "' + e.message + '"');
                            }
                            finally {
                                this.plugins.fileBrowser.closeBrowserLoading();
                                this.context.fileBrowser.body.style.maxHeight = (this._w.innerHeight - this.context.fileBrowser.header.offsetHeight - 50) + 'px';
                            }
                        }
                        else { // exception
                            this.plugins.fileBrowser.closeBrowserLoading();
                            if (xmlHttp.status !== 0) {
                                var res = !xmlHttp.responseText ? xmlHttp : JSON.parse(xmlHttp.responseText);
                                var err = '[SUNEDITOR.fileBrowser.get.serverException] status: ' + xmlHttp.status + ', response: ' + (res.errorMessage || xmlHttp.responseText);
                                throw Error(err);
                            }
                        }
                    }
                },
                _drawListItem: function (items, update) {
                    var fileBrowserContext = this.context.fileBrowser;
                    var pluginContext = this.context[fileBrowserContext.contextPlugin];
                    var _tags = [];
                    var len = items.length;
                    var columnSize = pluginContext.columnSize || fileBrowserContext.columnSize;
                    var splitSize = columnSize <= 1 ? 1 : (Math.round(len / columnSize) || 1);
                    var drawItemHandler = pluginContext.itemTemplateHandler;
                    var tagsHTML = '';
                    var listHTML = '<div class="se-file-item-column">';
                    var columns = 1;
                    for (var i = 0, item = void 0, tags = void 0; i < len; i++) {
                        item = items[i];
                        tags = !item.tag ? [] : typeof item.tag === 'string' ? item.tag.split(',') : item.tag;
                        tags = item.tag = tags.map(function (v) { return v.trim(); });
                        listHTML += drawItemHandler(item);
                        if ((i + 1) % splitSize === 0 && columns < columnSize && (i + 1) < len) {
                            columns++;
                            listHTML += '</div><div class="se-file-item-column">';
                        }
                        if (update && tags.length > 0) {
                            for (var t = 0, tLen = tags.length, tag = void 0; t < tLen; t++) {
                                tag = tags[t];
                                if (tag && _tags.indexOf(tag) === -1) {
                                    _tags.push(tag);
                                    tagsHTML += '<a title="' + tag + '">' + tag + '</a>';
                                }
                            }
                        }
                    }
                    listHTML += '</div>';
                    fileBrowserContext.list.innerHTML = listHTML;
                    if (update) {
                        fileBrowserContext.items = items;
                        fileBrowserContext.tagArea.innerHTML = tagsHTML;
                        fileBrowserContext.tagElements = fileBrowserContext.tagArea.querySelectorAll('A');
                    }
                },
                onClickTag: function (e) {
                    var target = e.target;
                    if (!this.util.isAnchor(target))
                        return;
                    var tagName = target.textContent;
                    var fileBrowserPlugin = this.plugins.fileBrowser;
                    var fileBrowserContext = this.context.fileBrowser;
                    var selectTag = fileBrowserContext.tagArea.querySelector('a[title="' + tagName + '"]');
                    var selectedTags = fileBrowserContext.selectedTags;
                    var sTagIndex = selectedTags.indexOf(tagName);
                    if (sTagIndex > -1) {
                        selectedTags.splice(sTagIndex, 1);
                        this.util.removeClass(selectTag, 'on');
                    }
                    else {
                        selectedTags.push(tagName);
                        this.util.addClass(selectTag, 'on');
                    }
                    fileBrowserPlugin._drawListItem.call(this, selectedTags.length === 0 ?
                        fileBrowserContext.items :
                        fileBrowserContext.items.filter(function (item) {
                            return item.tag.some(function (tag) {
                                return selectedTags.indexOf(tag) > -1;
                            });
                        }), false);
                },
                onClickFile: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var fileBrowserContext = this.context.fileBrowser;
                    var listEl = fileBrowserContext.list;
                    var target = e.target;
                    var command = null;
                    if (target === listEl)
                        return;
                    while (listEl !== target.parentNode) {
                        command = target.getAttribute('data-command');
                        if (command)
                            break;
                        target = target.parentNode;
                    }
                    if (!command)
                        return;
                    var handler = (fileBrowserContext.selectorHandler || this.context[fileBrowserContext.contextPlugin].selectorHandler);
                    this.plugins.fileBrowser.close.call(this);
                    handler(target);
                }
            };
            if (typeof noGlobal === typeof undefined) {
                if (!window.SUNEDITOR_MODULES) {
                    Object.defineProperty(window, 'SUNEDITOR_MODULES', {
                        enumerable: true,
                        writable: false,
                        configurable: false,
                        value: {}
                    });
                }
                Object.defineProperty(window.SUNEDITOR_MODULES, 'fileBrowser', {
                    enumerable: true,
                    writable: false,
                    configurable: false,
                    value: fileBrowser
                });
            }
            return fileBrowser;
        }));
    }(fileBrowser$1));
    var fileBrowser = fileBrowser$1.exports;

    /*
     * wysiwyg web editor
     *
     * suneditor.js
     * Copyright 2017 JiHong Lee.
     * MIT license.
     */
    'use strict';
    var imageGallery = {
        name: 'imageGallery',
        /**
         * @description Constructor
         * @param {Object} core Core object
         */
        add: function (core) {
            core.addModule([fileBrowser]);
            var context = core.context;
            context.imageGallery = {
                title: core.lang.toolbar.imageGallery,
                url: core.options.imageGalleryUrl,
                header: core.options.imageGalleryHeader,
                listClass: 'se-image-list',
                itemTemplateHandler: this.drawItems,
                selectorHandler: this.setImage.bind(core),
                columnSize: 4 // @Option @Override fileBrowser - Number of "div.se-file-item-column" to be created (default: 4)
            };
        },
        /**
         * @Required @Override fileBrowser
         * @description Open a file browser.
         * @param {Function|null} selectorHandler When the function comes as an argument value, it substitutes "context.selectorHandler".
         */
        open: function (selectorHandler) {
            this.plugins.fileBrowser.open.call(this, 'imageGallery', selectorHandler);
        },
        /**
         * @Required @Override fileBrowser
         * @description Define the HTML of the item to be put in "div.se-file-item-column".
         * Format: [
         *      { src: "image src", name: "name(@option)", alt: "image alt(@option)", tag: "tag name(@option)" }
         * ]
         * @param {Object} item Item of the response data's array
         */
        drawItems: function (item) {
            var srcName = item.src.split('/').pop();
            return '<div class="se-file-item-img"><img src="' + item.src + '" alt="' + (item.alt || srcName) + '" data-command="pick">' +
                '<div class="se-file-img-name se-file-name-back"></div>' +
                '<div class="se-file-img-name __se__img_name">' + (item.name || srcName) + '</div>' +
                '</div>';
        },
        setImage: function (target) {
            this.callPlugin('image', function () {
                var file = { name: target.parentNode.querySelector('.__se__img_name').textContent, size: 0 };
                this.context.image._altText = target.alt;
                this.plugins.image.create_image.call(this, target.src, null, this.context.image._origin_w, this.context.image._origin_h, 'none', file);
            }.bind(this), null);
        }
    };

    'use strict';
    var index = { blockquote: blockquote, align: align, font: font, fontSize: fontSize, fontColor: fontColor, hiliteColor: hiliteColor, horizontalRule: horizontalRule, list: list, table: table, formatBlock: formatBlock, lineHeight: lineHeight, template: template, paragraphStyle: paragraphStyle, textStyle: textStyle, link: link, image: image, video: video, audio: audio, math: math, imageGallery: imageGallery };

    /**
     * Injection token for options object
     */
    var SUNEDITOR_OPTIONS = new i0.InjectionToken('SUNEDITOR_OPTIONS');
    /**
     * Feature Key used internal for editors injected as singleton
     */
    var ROOT_INJECTOR_KEY = 'root_injector_key';

    var NgxSuneditorComponent = /** @class */ (function () {
        function NgxSuneditorComponent(ngZone, options) {
            this.ngZone = ngZone;
            this.created_event = new i0.EventEmitter();
            this.onload_event = new i0.EventEmitter();
            this.onScroll_event = new i0.EventEmitter();
            this.onMouseDown_event = new i0.EventEmitter();
            this.onClick_event = new i0.EventEmitter();
            this.onInput_event = new i0.EventEmitter();
            this.onKeyDown_event = new i0.EventEmitter();
            this.onKeyUp_event = new i0.EventEmitter();
            this.onChange_event = new i0.EventEmitter();
            this.onFocus_event = new i0.EventEmitter();
            this.onBlur_event = new i0.EventEmitter();
            this.showController_event = new i0.EventEmitter();
            this.toggleFullScreen_event = new i0.EventEmitter();
            this.toggleCodeView_event = new i0.EventEmitter();
            this.showInline_event = new i0.EventEmitter();
            this.audioUploadHandler_event = new i0.EventEmitter();
            this.onAudioUpload_event = new i0.EventEmitter();
            this.videoUploadHandler_event = new i0.EventEmitter();
            this.onVideoUpload_event = new i0.EventEmitter();
            this.imageUploadHandler_event = new i0.EventEmitter();
            this.onImageUpload_event = new i0.EventEmitter();
            this.onCut_event = new i0.EventEmitter();
            this.onCopy_event = new i0.EventEmitter();
            this.editorID = this.generateID();
            if (options && typeof options === 'object') {
                this.options = options;
            }
        }
        NgxSuneditorComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.ngZone.runOutsideAngular(function () {
                _this.options.value = _this.initialContent;
                _this.editor = suneditor__default['default'].create(document.getElementById("ngxsuneditor_" + _this.editorID) ||
                    "ngxsuneditor_" + _this.editorID, _this.options);
            });
            this.defineEvents();
            this.created_event.emit(this);
        };
        NgxSuneditorComponent.prototype.getEditorID_fn = function () {
            return this.editorID;
        };
        NgxSuneditorComponent.prototype.getEditor_fn = function () {
            return this.editor;
        };
        NgxSuneditorComponent.prototype.setToolbarButtons_fn = function (buttonList) {
            this.editor.setToolbarButtons(buttonList);
        };
        NgxSuneditorComponent.prototype.setOptions_fn = function (options) {
            this.editor.setOptions(options);
        };
        NgxSuneditorComponent.prototype.setDefaultStyle_fn = function (style) {
            this.editor.setDefaultStyle(style);
        };
        NgxSuneditorComponent.prototype.noticeOpen_fn = function (message) {
            this.editor.noticeOpen(message);
        };
        NgxSuneditorComponent.prototype.noticeClose_fn = function () {
            this.editor.noticeClose();
        };
        NgxSuneditorComponent.prototype.save_fn = function () {
            this.editor.save();
        };
        NgxSuneditorComponent.prototype.getContext_fn = function () {
            return this.editor.getContext();
        };
        NgxSuneditorComponent.prototype.getContents_fn = function (onlyContents) {
            return this.editor.getContents(onlyContents);
        };
        NgxSuneditorComponent.prototype.getText_fn = function () {
            return this.editor.getText();
        };
        NgxSuneditorComponent.prototype.getCharCount_fn = function () {
            return this.editor.getCharCount();
        };
        NgxSuneditorComponent.prototype.getImagesInfo_fn = function () {
            return this.editor.getImagesInfo();
        };
        NgxSuneditorComponent.prototype.getFilesInfo_fn = function (pluginName) {
            return this.editor.getFilesInfo(pluginName);
        };
        NgxSuneditorComponent.prototype.insertImage_fn = function (files) {
            this.editor.insertImage(files);
        };
        NgxSuneditorComponent.prototype.insertHTML_fn = function (html, notCleaningData, checkCharCount, rangeSelection) {
            this.editor.insertHTML(html, notCleaningData, checkCharCount, rangeSelection);
        };
        NgxSuneditorComponent.prototype.setContents_fn = function (contents) {
            this.editor.setContents(contents);
        };
        NgxSuneditorComponent.prototype.appendContents_fn = function (contents) {
            this.editor.appendContents(contents);
        };
        NgxSuneditorComponent.prototype.readOnly_fn = function (value) {
            this.editor.readOnly(value);
        };
        NgxSuneditorComponent.prototype.disabled_fn = function () {
            this.editor.disabled();
        };
        NgxSuneditorComponent.prototype.enabled_fn = function () {
            this.editor.enabled();
        };
        NgxSuneditorComponent.prototype.show_fn = function () {
            this.editor.show();
        };
        NgxSuneditorComponent.prototype.hide_fn = function () {
            this.editor.hide();
        };
        NgxSuneditorComponent.prototype.destroy_fn = function () {
            this.editor.destroy();
        };
        NgxSuneditorComponent.prototype.toggleDisplayBlocks_fn = function () {
            this.editor.core.toggleDisplayBlocks();
        };
        NgxSuneditorComponent.prototype.toggleCodeView_fn = function () {
            this.editor.core.toggleCodeView();
        };
        NgxSuneditorComponent.prototype.undo_fn = function () {
            this.editor.core.history.undo();
        };
        NgxSuneditorComponent.prototype.redo_fn = function () {
            this.editor.core.history.redo();
        };
        NgxSuneditorComponent.prototype.removeFormat_fn = function () {
            this.editor.core.removeFormat();
        };
        NgxSuneditorComponent.prototype.print_fn = function () {
            this.editor.core.print();
        };
        NgxSuneditorComponent.prototype.preview_fn = function () {
            this.editor.core.preview();
        };
        NgxSuneditorComponent.prototype.getHistory_fn = function () {
            return this.editor.core.history.stack;
        };
        NgxSuneditorComponent.prototype.selectAll_fn = function () {
            this.commandHandler_fn(null, 'selectAll');
        };
        NgxSuneditorComponent.prototype.getSelection_fn = function () {
            return this.editor.core.getSelection();
        };
        NgxSuneditorComponent.prototype.showLoading_fn = function () {
            this.editor.core.showLoading();
        };
        NgxSuneditorComponent.prototype.closeLoading_fn = function () {
            this.editor.core.closeLoading();
        };
        NgxSuneditorComponent.prototype.submenuOn_fn = function (element) {
            this.editor.core.submenuOn(element);
        };
        NgxSuneditorComponent.prototype.submenuOff_fn = function () {
            this.editor.core.submenuOff();
        };
        NgxSuneditorComponent.prototype.containerOn_fn = function (element) {
            this.editor.core.containerOn(element);
        };
        NgxSuneditorComponent.prototype.containerOff_fn = function () {
            this.editor.core.containerOff();
        };
        NgxSuneditorComponent.prototype.addClass_fn = function (element, className) {
            this.editor.util.addClass(element, className);
        };
        NgxSuneditorComponent.prototype.removeStyle_fn = function (element, className) {
            this.editor.util.removeClass(element, className);
        };
        NgxSuneditorComponent.prototype.setStyle_fn = function (element, styleName, value) {
            this.editor.util.setStyle(element, styleName, value);
        };
        NgxSuneditorComponent.prototype.addDocEvent_fn = function (type, listener, useCapture) {
            this.editor.core.addDocEvent(type, listener, useCapture);
        };
        NgxSuneditorComponent.prototype.removeDocEvent_fn = function (type, listener) {
            this.editor.core.removeDocEvent(type, listener);
        };
        NgxSuneditorComponent.prototype.actionCall_fn = function (command, display, target) {
            this.editor.core.actionCall(command, display, target);
        };
        NgxSuneditorComponent.prototype.indent_outdent_fn = function (command) {
            this.commandHandler_fn(null, command);
        };
        NgxSuneditorComponent.prototype.showBlocks_fn = function () {
            var element = document.querySelector('[data-command="showBlocks"]');
            if (element) {
                this.commandHandler_fn(element, 'showBlocks');
            }
        };
        NgxSuneditorComponent.prototype.toggleFullScreen_fn = function () {
            var element = document.querySelector('[data-command="fullScreen"]');
            if (element) {
                this.commandHandler_fn(element, 'fullScreen');
            }
        };
        NgxSuneditorComponent.prototype.commandHandler_fn = function (element, command) {
            this.editor.core.commandHandler(element, command);
        };
        NgxSuneditorComponent.prototype.defineEvents = function () {
            var _this = this;
            this.editor.onload = function (core, reload) {
                _this.onload_event.emit({ core: core, reload: reload });
            };
            this.editor.onScroll = function (e, core) {
                _this.onScroll_event.emit({ e: e, core: core });
            };
            this.editor.onMouseDown = function (e, core) {
                _this.onMouseDown_event.emit({ e: e, core: core });
            };
            this.editor.onClick = function (e, core) {
                _this.onClick_event.emit({ e: e, core: core });
            };
            this.editor.onInput = function (e, core) {
                _this.onInput_event.emit({ e: e, core: core });
            };
            this.editor.onKeyDown = function (e, core) {
                _this.onKeyDown_event.emit({ e: e, core: core });
            };
            this.editor.onKeyUp = function (e, core) {
                _this.onKeyUp_event.emit({ e: e, core: core });
            };
            this.editor.onChange = function (content, core) {
                _this.onChange_event.emit({ content: content, core: core });
            };
            this.editor.onFocus = function (e, core) {
                HTMLImageElement;
                _this.editor.showController = function (name, controllers, core) {
                    _this.showController_event.emit({ name: name, controllers: controllers, core: core });
                };
                _this.editor.toggleFullScreen = function (isFullScreen, core) {
                    _this.toggleFullScreen_event.emit({ isFullScreen: isFullScreen, core: core });
                };
                _this.editor.toggleCodeView = function (isCodeView, core) {
                    _this.toggleCodeView_event.emit({ isCodeView: isCodeView, core: core });
                };
                _this.editor.showInline = function (toolbar, context, core) {
                    _this.showInline_event.emit({ toolbar: toolbar, context: context, core: core });
                };
                _this.editor.audioUploadHandler = function (xmlHttp, info, core) {
                    _this.audioUploadHandler_event.emit({ xmlHttp: xmlHttp, info: info, core: core });
                };
                _this.editor.onAudioUpload = function (targetElement, index, state, info, remainingFilesCount, core) {
                    _this.onAudioUpload_event.emit({
                        targetElement: targetElement,
                        index: index,
                        state: state,
                        info: info,
                        remainingFilesCount: remainingFilesCount,
                        core: core,
                    });
                };
                _this.editor.videoUploadHandler = function (xmlHttp, info, core) {
                    _this.videoUploadHandler_event.emit({ xmlHttp: xmlHttp, info: info, core: core });
                };
                _this.editor.onVideoUpload = function (targetElement, index, state, info, remainingFilesCount, core) {
                    _this.onVideoUpload_event.emit({
                        targetElement: targetElement,
                        index: index,
                        state: state,
                        info: info,
                        remainingFilesCount: remainingFilesCount,
                        core: core,
                    });
                };
                _this.editor.imageUploadHandler = function (xmlHttp, info, core) {
                    _this.imageUploadHandler_event.emit({ xmlHttp: xmlHttp, info: info, core: core });
                };
                _this.editor.onImageUpload = function (targetElement, index, state, info, remainingFilesCount, core) {
                    _this.onImageUpload_event.emit({
                        targetElement: targetElement,
                        index: index,
                        state: state,
                        info: info,
                        remainingFilesCount: remainingFilesCount,
                        core: core,
                    });
                };
                _this.editor.onCut = function (e, clipboardData, core) {
                    _this.onCut_event.emit({ e: e, clipboardData: clipboardData, core: core });
                };
                _this.editor.onCopy = function (e, clipboardData, core) {
                    _this.onCopy_event.emit({ e: e, clipboardData: clipboardData, core: core });
                };
            };
        };
        NgxSuneditorComponent.prototype.generateID = function () {
            var min = Math.ceil(1);
            var max = Math.floor(100000);
            return (Math.floor(Math.random() * (max - min)) + min).toString();
        };
        return NgxSuneditorComponent;
    }());
    NgxSuneditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxSuneditorComponent, deps: [{ token: i0__namespace.NgZone }, { token: SUNEDITOR_OPTIONS, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    NgxSuneditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: NgxSuneditorComponent, selector: "ngx-suneditor", inputs: { options: "options", initialContent: "initialContent" }, outputs: { created_event: "created_event", onload_event: "onload_event", onScroll_event: "onScroll_event", onMouseDown_event: "onMouseDown_event", onClick_event: "onClick_event", onInput_event: "onInput_event", onKeyDown_event: "onKeyDown_event", onKeyUp_event: "onKeyUp_event", onChange_event: "onChange_event", onFocus_event: "onFocus_event", onBlur_event: "onBlur_event", showController_event: "showController_event", toggleFullScreen_event: "toggleFullScreen_event", toggleCodeView_event: "toggleCodeView_event", showInline_event: "showInline_event", audioUploadHandler_event: "audioUploadHandler_event", onAudioUpload_event: "onAudioUpload_event", videoUploadHandler_event: "videoUploadHandler_event", onVideoUpload_event: "onVideoUpload_event", imageUploadHandler_event: "imageUploadHandler_event", onImageUpload_event: "onImageUpload_event", onCut_event: "onCut_event", onCopy_event: "onCopy_event" }, ngImport: i0__namespace, template: " <textarea id=\"{{ 'ngxsuneditor_' + editorID }}\"></textarea> ", isInline: true, styles: [":host ::ng-deep .sun-editor{width:auto;height:auto;box-sizing:border-box;font-family:Helvetica Neue;border:1px solid #dadada;background-color:#fff;color:#000;user-select:none;-o-user-select:none;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-ms-user-select:none}:host ::ng-deep .sun-editor *{box-sizing:border-box;-webkit-user-drag:none;overflow:visible}:host ::ng-deep .sun-editor-common button,:host ::ng-deep .sun-editor-common input,:host ::ng-deep .sun-editor-common select,:host ::ng-deep .sun-editor-common textarea{font-size:14px;line-height:1.5}:host ::ng-deep .sun-editor-common blockquote,:host ::ng-deep .sun-editor-common body,:host ::ng-deep .sun-editor-common button,:host ::ng-deep .sun-editor-common code,:host ::ng-deep .sun-editor-common dd,:host ::ng-deep .sun-editor-common div,:host ::ng-deep .sun-editor-common dl,:host ::ng-deep .sun-editor-common dt,:host ::ng-deep .sun-editor-common fieldset,:host ::ng-deep .sun-editor-common form,:host ::ng-deep .sun-editor-common h1,:host ::ng-deep .sun-editor-common h2,:host ::ng-deep .sun-editor-common h3,:host ::ng-deep .sun-editor-common h4,:host ::ng-deep .sun-editor-common h5,:host ::ng-deep .sun-editor-common h6,:host ::ng-deep .sun-editor-common input,:host ::ng-deep .sun-editor-common legend,:host ::ng-deep .sun-editor-common li,:host ::ng-deep .sun-editor-common ol,:host ::ng-deep .sun-editor-common p,:host ::ng-deep .sun-editor-common pre,:host ::ng-deep .sun-editor-common select,:host ::ng-deep .sun-editor-common td,:host ::ng-deep .sun-editor-common textarea,:host ::ng-deep .sun-editor-common th,:host ::ng-deep .sun-editor-common ul{margin:0;padding:0;border:0}:host ::ng-deep .sun-editor-common dl,:host ::ng-deep .sun-editor-common li,:host ::ng-deep .sun-editor-common menu,:host ::ng-deep .sun-editor-common ol,:host ::ng-deep .sun-editor-common ul{list-style:none!important}:host ::ng-deep .sun-editor-common hr{margin:6px 0!important}:host ::ng-deep .sun-editor textarea{resize:none;border:0;padding:0}:host ::ng-deep .sun-editor button{border:0;background-color:initial;touch-action:manipulation;cursor:pointer;outline:none}:host ::ng-deep .sun-editor button,:host ::ng-deep .sun-editor input,:host ::ng-deep .sun-editor select,:host ::ng-deep .sun-editor textarea{vertical-align:middle}:host ::ng-deep .sun-editor button span{display:block;margin:0;padding:0}:host ::ng-deep .sun-editor button .txt{display:block;margin-top:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host ::ng-deep .sun-editor button *{pointer-events:none;backface-visibility:hidden;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden}:host ::ng-deep .sun-editor .se-svg,:host ::ng-deep .sun-editor button>svg{width:16px;height:16px;margin:auto;fill:currentColor;display:block;text-align:center;float:none}:host ::ng-deep .sun-editor .close>svg,:host ::ng-deep .sun-editor .se-dialog-close>svg{width:10px;height:10px}:host ::ng-deep .sun-editor .se-btn-select>svg{float:right;width:10px;height:10px}:host ::ng-deep .sun-editor .se-btn-list>.se-list-icon{display:inline-block;width:16px;height:16px;margin:-1px 10px 0 0;vertical-align:middle}:host ::ng-deep .sun-editor .se-line-breaker>button>svg{width:24px;height:24px}:host ::ng-deep .sun-editor button>i:before{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-block;font-style:normal;font-feature-settings:normal;font-variant:normal;text-rendering:auto;font-size:15px;line-height:2}:host ::ng-deep .sun-editor button>[class=se-icon-text]{font-size:20px;line-height:1}:host ::ng-deep .sun-editor .se-arrow,:host ::ng-deep .sun-editor .se-arrow:after{position:absolute;display:block;width:0;height:0;border:11px solid #0000}:host ::ng-deep .sun-editor .se-arrow.se-arrow-up{top:-11px;left:20px;margin-left:-11px;border-top-width:0;border-bottom-color:#dadada}:host ::ng-deep .sun-editor .se-arrow.se-arrow-up:after{top:1px;margin-left:-11px;content:\" \";border-top-width:0;border-bottom-color:#fff}:host ::ng-deep .sun-editor .se-toolbar .se-arrow.se-arrow-up:after{border-bottom-color:#fafafa}:host ::ng-deep .sun-editor .se-arrow.se-arrow-down{top:0;left:0;margin-left:-11px;border-bottom-width:0;border-top-color:#dadada}:host ::ng-deep .sun-editor .se-arrow.se-arrow-down:after{top:-12px;margin-left:-11px;content:\" \";border-bottom-width:0;border-top-color:#fff}:host ::ng-deep .sun-editor .se-toolbar .se-arrow.se-arrow-down:after{border-top-color:#fafafa}:host ::ng-deep .sun-editor .se-container{position:relative;width:100%;height:100%}:host ::ng-deep .sun-editor button{color:#000}:host ::ng-deep .sun-editor .se-btn{float:left;width:34px;height:34px;border:0;border-radius:4px;margin:1px!important;padding:0;font-size:12px;line-height:27px}:host ::ng-deep .sun-editor .se-btn:enabled:focus,:host ::ng-deep .sun-editor .se-btn:enabled:hover{background-color:#e1e1e1;border-color:#d1d1d1;outline:0 none}:host ::ng-deep .sun-editor .se-btn:enabled:active{background-color:#d1d1d1;border-color:#c1c1c1;box-shadow:inset 0 3px 5px #c1c1c1}:host ::ng-deep .sun-editor .se-btn-primary{color:#000;background-color:#c7deff;border:1px solid #80bdff;border-radius:4px}:host ::ng-deep .sun-editor .se-btn-primary:focus,:host ::ng-deep .sun-editor .se-btn-primary:hover{color:#000;background-color:#80bdff;border-color:#3f9dff;outline:0 none}:host ::ng-deep .sun-editor .se-btn-primary:active{color:#fff;background-color:#3f9dff;border-color:#4592ff;box-shadow:inset 0 3px 5px #4592ff}:host ::ng-deep .sun-editor input,:host ::ng-deep .sun-editor select,:host ::ng-deep .sun-editor textarea{color:#000;border:1px solid #ccc;border-radius:4px}:host ::ng-deep .sun-editor input:focus,:host ::ng-deep .sun-editor select:focus,:host ::ng-deep .sun-editor textarea:focus{border:1px solid #80bdff;outline:0;box-shadow:0 0 0 .2rem #c7deff;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}:host ::ng-deep .sun-editor .se-btn:enabled.active{color:#4592ff;outline:0 none}:host ::ng-deep .sun-editor .se-btn:enabled.active:focus,:host ::ng-deep .sun-editor .se-btn:enabled.active:hover{background-color:#e1e1e1;border-color:#d1d1d1;outline:0 none}:host ::ng-deep .sun-editor .se-btn:enabled.active:active{background-color:#d1d1d1;border-color:#c1c1c1;box-shadow:inset 0 3px 5px #c1c1c1}:host ::ng-deep .sun-editor .se-btn:enabled.on{background-color:#e1e1e1;border-color:#d1d1d1;outline:0 none}:host ::ng-deep .sun-editor .se-btn:enabled.on:focus,:host ::ng-deep .sun-editor .se-btn:enabled.on:hover{background-color:#d1d1d1;border-color:#c1c1c1;outline:0 none}:host ::ng-deep .sun-editor .se-btn:enabled.on:active{background-color:#c1c1c1;border-color:#b1b1b1;box-shadow:inset 0 3px 5px #b1b1b1}:host ::ng-deep .sun-editor .se-btn-list:disabled,:host ::ng-deep .sun-editor .se-btn:disabled,:host ::ng-deep .sun-editor button:disabled{cursor:not-allowed;background-color:inherit;color:#bdbdbd}:host ::ng-deep .sun-editor .se-loading-box{position:absolute;display:none;width:100%;height:100%;top:0;left:0;background-color:#fff;opacity:.7;filter:alpha(opacity=70);z-index:2147483647}:host ::ng-deep .sun-editor .se-loading-box .se-loading-effect{position:absolute;display:block;top:50%;left:50%;height:25px;width:25px;border-top:2px solid #07d;border-right:2px solid #0000;border-radius:50%;animation:spinner .8s linear infinite;margin:-25px 0 0 -25px}:host ::ng-deep .sun-editor .se-line-breaker{position:absolute;display:none;width:100%;height:1px;cursor:text;border-top:1px solid #3288ff;z-index:7}:host ::ng-deep .sun-editor .se-line-breaker>button.se-btn{position:relative;display:inline-block;width:30px;height:30px;top:-15px;float:none;left:-50%;background-color:#fff;border:1px solid #0c2240;opacity:.6;cursor:pointer}:host ::ng-deep .sun-editor .se-line-breaker>button.se-btn:hover{opacity:.9;background-color:#fff;border-color:#041b39}:host ::ng-deep .sun-editor .se-line-breaker-component{position:absolute;display:none;width:24px;height:24px;background-color:#fff;border:1px solid #0c2240;opacity:.6;border-radius:4px;cursor:pointer;z-index:7}:host ::ng-deep .sun-editor .se-line-breaker-component:hover{opacity:.9}:host ::ng-deep .sun-editor .se-toolbar{display:block;position:relative;height:auto;width:100%;overflow:visible;padding:0;margin:0;background-color:#fafafa;outline:1px solid #dadada;z-index:5}:host ::ng-deep .sun-editor .se-toolbar-cover{position:absolute;display:none;font-size:36px;width:100%;height:100%;top:0;left:0;background-color:#fefefe;opacity:.5;filter:alpha(opacity=50);cursor:not-allowed;z-index:4}:host ::ng-deep .sun-editor .se-toolbar-separator-vertical{display:inline-block;height:0;width:0;margin:1px;vertical-align:top}:host ::ng-deep .sun-editor .se-toolbar.se-toolbar-balloon,:host ::ng-deep .sun-editor .se-toolbar.se-toolbar-inline{display:none;position:absolute;box-shadow:0 3px 9px #00000080;-webkit-box-shadow:0 3px 9px #00000080}:host ::ng-deep .sun-editor .se-toolbar.se-toolbar-balloon{z-index:2147483647;width:auto}:host ::ng-deep .sun-editor .se-toolbar.se-toolbar-sticky{position:fixed;top:0}:host ::ng-deep .sun-editor .se-toolbar-sticky-dummy{display:none;position:static;z-index:-1}:host ::ng-deep .sun-editor .se-btn-module{display:inline-block}:host ::ng-deep .sun-editor .se-btn-module-border{border:1px solid #dadada;border-radius:4px}:host ::ng-deep .sun-editor .se-btn-module-enter{display:block;width:100%;height:1px;margin-bottom:5px;background-color:initial}:host ::ng-deep .sun-editor .se-toolbar-more-layer{margin:0 -3px;background-color:#fafafa}:host ::ng-deep .sun-editor .se-toolbar-more-layer .se-more-layer{display:none;border-top:1px solid #dadada}:host ::ng-deep .sun-editor .se-toolbar-more-layer .se-more-layer .se-more-form{display:inline-block;width:100%;height:auto;padding:4px 3px 0}:host ::ng-deep .sun-editor .se-btn-module .se-btn-more.se-btn-more-text{width:auto;padding:0 4px}:host ::ng-deep .sun-editor .se-btn-module .se-btn-more:focus,:host ::ng-deep .sun-editor .se-btn-module .se-btn-more:hover{color:#000;background-color:#d1d1d1;border-color:#c1c1c1;outline:0 none}:host ::ng-deep .sun-editor .se-btn-module .se-btn-more.on{color:#333;background-color:#d1d1d1;border-color:#c1c1c1;outline:0 none}:host ::ng-deep .sun-editor .se-btn-module .se-btn-more.on:hover{color:#000;background-color:#c1c1c1;border-color:#b1b1b1;outline:0 none}:host ::ng-deep .sun-editor .se-menu-list,:host ::ng-deep .sun-editor .se-menu-list li{float:left;padding:0;margin:0}:host ::ng-deep .sun-editor .se-menu-list li{position:relative}:host ::ng-deep .sun-editor .se-btn-select{width:auto;display:flex;padding:4px 6px}:host ::ng-deep .sun-editor .se-btn-select .txt{flex:auto;text-align:left}:host ::ng-deep .sun-editor.se-rtl .se-btn-select svg{margin:auto 1px}:host ::ng-deep .sun-editor .se-btn-select.se-btn-tool-font{width:100px}:host ::ng-deep .sun-editor .se-btn-select.se-btn-tool-format{width:82px}:host ::ng-deep .sun-editor .se-btn-select.se-btn-tool-size{width:78px}:host ::ng-deep .sun-editor .se-btn-tray{position:relative;width:100%;height:auto;padding:4px 3px 0;margin:0}:host ::ng-deep .sun-editor .se-menu-tray{position:absolute;top:0;left:0;width:100%;height:0}:host ::ng-deep .sun-editor .se-submenu{overflow-x:hidden;overflow-y:auto}:host ::ng-deep .sun-editor .se-menu-container{overflow-x:unset;overflow-y:unset}:host ::ng-deep .sun-editor .se-list-layer{display:none;position:absolute;top:0;left:0;height:auto;z-index:5;border:1px solid #bababa;border-radius:4px;padding:6px 0;background-color:#fff;box-shadow:0 3px 9px #00000080;outline:0 none}:host ::ng-deep .sun-editor .se-list-layer .se-list-inner{padding:0;margin:0;overflow-x:initial;overflow-y:initial;overflow:visible}:host ::ng-deep .sun-editor .se-list-layer button{margin:0;width:100%}:host ::ng-deep .sun-editor .se-list-inner ul{width:100%;padding:0}:host ::ng-deep .sun-editor .se-list-inner li>button{min-width:100%;width:-webkit-max-content;width:max-content}:host ::ng-deep .sun-editor .se-list-inner .se-list-basic li{width:100%}:host ::ng-deep .sun-editor .se-list-inner .se-list-basic li button.active{background-color:#80bdff;border:1px solid #3f9dff;border-left:0;border-right:0}:host ::ng-deep .sun-editor .se-list-inner .se-list-basic li button.active:hover{background-color:#3f9dff;border:1px solid #4592ff;border-left:0;border-right:0}:host ::ng-deep .sun-editor .se-list-inner .se-list-basic li button.active:active{background-color:#4592ff;border:1px solid #407dd1;border-left:0;border-right:0;box-shadow:inset 0 3px 5px #407dd1}:host ::ng-deep .sun-editor .se-list-inner .se-list-checked li button>.se-svg{float:left;padding:6px 6px 0 0}:host ::ng-deep .sun-editor .se-list-inner .se-list-checked li button>.se-svg>svg{display:none}:host ::ng-deep .sun-editor .se-list-inner .se-list-checked li button.se-checked{color:#4592ff}:host ::ng-deep .sun-editor .se-list-inner .se-list-checked li button.se-checked>.se-svg>svg{display:block}:host ::ng-deep .sun-editor .se-btn-list{width:100%;height:auto;min-height:32px;padding:0 14px;cursor:pointer;font-size:12px;line-height:normal;text-indent:0;text-decoration:none;text-align:left}:host ::ng-deep .sun-editor .se-btn-list.default_value{background-color:#f3f3f3;border-top:1px dotted #b1b1b1;border-bottom:1px dotted #b1b1b1}:host ::ng-deep .sun-editor .se-btn-list:focus,:host ::ng-deep .sun-editor .se-btn-list:hover{background-color:#e1e1e1;border-color:#d1d1d1;outline:0 none}:host ::ng-deep .sun-editor .se-btn-list:active{background-color:#d1d1d1;border-color:#c1c1c1;box-shadow:inset 0 3px 5px #c1c1c1}:host ::ng-deep .sun-editor .se-list-layer.se-list-font-size{min-width:140px;max-height:300px}:host ::ng-deep .sun-editor .se-list-layer.se-list-font-family{min-width:156px}:host ::ng-deep .sun-editor .se-list-layer.se-list-font-family .default{border-bottom:1px solid #ccc}:host ::ng-deep .sun-editor .se-list-layer.se-list-line{width:125px}:host ::ng-deep .sun-editor .se-list-layer.se-list-align .se-list-inner{left:9px;width:125px}:host ::ng-deep .sun-editor .se-list-layer.se-list-format{min-width:156px}:host ::ng-deep .sun-editor .se-list-layer.se-list-format li{padding:0;width:100%}:host ::ng-deep .sun-editor .se-list-layer.se-list-format ul .se-btn-list{line-height:100%}:host ::ng-deep .sun-editor .se-list-layer.se-list-format ul .se-btn-list[data-value=h1]{height:40px}:host ::ng-deep .sun-editor .se-list-layer.se-list-format ul .se-btn-list[data-value=h2]{height:34px}:host ::ng-deep .sun-editor .se-list-layer.se-list-format ul p{font-size:13px}:host ::ng-deep .sun-editor .se-list-layer.se-list-format ul div{font-size:13px;padding:4px 2px}:host ::ng-deep .sun-editor .se-list-layer.se-list-format ul h1{font-size:2em;font-weight:700;color:#333}:host ::ng-deep .sun-editor .se-list-layer.se-list-format ul h2{font-size:1.5em;font-weight:700;color:#333}:host ::ng-deep .sun-editor .se-list-layer.se-list-format ul h3{font-size:1.17em;font-weight:700;color:#333}:host ::ng-deep .sun-editor .se-list-layer.se-list-format ul h4{font-size:1em;font-weight:700;color:#333}:host ::ng-deep .sun-editor .se-list-layer.se-list-format ul h5{font-size:.83em;font-weight:700;color:#333}:host ::ng-deep .sun-editor .se-list-layer.se-list-format ul h6{font-size:.67em;font-weight:700;color:#333}:host ::ng-deep .sun-editor .se-list-layer.se-list-format ul blockquote{font-size:13px;color:#999;height:22px;margin:0;background-color:initial;line-height:1.5;border-color:#b1b1b1;padding:0 0 0 7px;border-left:5px #b1b1b1;border-style:solid}:host ::ng-deep .sun-editor .se-list-layer.se-list-format ul pre{font-size:13px;color:#666;padding:4px 11px;margin:0;background-color:#f9f9f9;border:1px solid #e1e1e1;border-radius:4px}:host ::ng-deep .sun-editor .se-selector-table{display:none;position:absolute;top:34px;left:1px;z-index:5;padding:5px 0;float:left;margin:2px 0 0;font-size:14px;text-align:left;list-style:none;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #ccc;border-radius:4px;box-shadow:0 6px 12px rgba(0,0,0,.175)}:host ::ng-deep .sun-editor .se-selector-table .se-table-size{font-size:18px;padding:0 5px}:host ::ng-deep .sun-editor .se-selector-table .se-table-size-picker{position:absolute!important;z-index:3;font-size:18px;width:10em;height:10em;cursor:pointer}:host ::ng-deep .sun-editor .se-selector-table .se-table-size-highlighted{position:absolute!important;z-index:2;font-size:18px;width:1em;height:1em;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADJmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4QTZCNzMzN0I3RUYxMUU4ODcwQ0QwMjM1NTgzRTJDNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4QTZCNzMzNkI3RUYxMUU4ODcwQ0QwMjM1NTgzRTJDNyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MzYyNEUxRUI3RUUxMUU4ODZGQzgwRjNBODgyNTdFOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MzYyNEUxRkI3RUUxMUU4ODZGQzgwRjNBODgyNTdFOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pl0yAuwAAABBSURBVDhPY/wPBAxUAGCDGvdBeWSAeicIDTfIXREiQArYeR9hEBOEohyMGkQYjBpEGAxjg6ib+yFMygCVvMbAAABj0hwMTNeKJwAAAABJRU5ErkJggg==\") repeat}:host ::ng-deep .sun-editor .se-selector-table .se-table-size-unhighlighted{position:relative!important;z-index:1;font-size:18px;width:10em;height:10em;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIj4+Pjp6ekKlAqjAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKhmnaJzPAAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC\") repeat}:host ::ng-deep .sun-editor .se-selector-table .se-table-size-display{padding-left:5px}:host ::ng-deep .sun-editor .se-list-layer.se-table-split{top:36px}:host ::ng-deep .sun-editor .se-list-layer .se-selector-color{display:flex;width:-webkit-max-content;width:max-content;max-width:270px;height:auto;padding:0;margin:auto}:host ::ng-deep .sun-editor .se-list-layer .se-selector-color .se-color-pallet{width:100%;height:100%;padding:0}:host ::ng-deep .sun-editor .se-list-layer .se-selector-color .se-color-pallet li{display:flex;float:left;position:relative;margin:0}:host ::ng-deep .sun-editor .se-list-layer .se-selector-color .se-color-pallet button{display:block;cursor:default;width:30px;height:30px;text-indent:-9999px}:host ::ng-deep .sun-editor .se-list-layer .se-selector-color .se-color-pallet button.active,:host ::ng-deep .sun-editor .se-list-layer .se-selector-color .se-color-pallet button:focus,:host ::ng-deep .sun-editor .se-list-layer .se-selector-color .se-color-pallet button:hover{border:3px solid #fff}:host ::ng-deep .sun-editor .se-form-group{display:flex;width:100%;min-height:40px;height:auto;padding:4px}:host ::ng-deep .sun-editor .se-form-group input{flex:auto;display:inline-block;width:auto;height:33px;font-size:12px;margin:1px 0;padding:0;border-radius:.25rem;border:1px solid #ccc}:host ::ng-deep .sun-editor .se-form-group button,:host ::ng-deep .sun-editor .se-submenu-form-group button{float:right;width:34px;height:34px;margin:0 2px!important}:host ::ng-deep .sun-editor .se-form-group button.se-btn{border:1px solid #ccc}:host ::ng-deep .sun-editor .se-form-group>div{position:relative}:host ::ng-deep .sun-editor .se-form-group label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:700}:host ::ng-deep .sun-editor .se-form-group-label{width:100%;height:auto;padding:0 4px}:host ::ng-deep .sun-editor .se-form-group-label label{font-size:13px;font-weight:700}:host ::ng-deep .sun-editor .se-submenu .se-form-group input{width:auto;height:33px;color:#555}:host ::ng-deep .sun-editor .se-submenu .se-form-group .se-color-input{width:72px;text-transform:uppercase;border:none;border-bottom:2px solid #b1b1b1;outline:none}:host ::ng-deep .sun-editor .se-submenu .se-form-group .se-color-input:focus{border-bottom:3px solid #b1b1b1}:host ::ng-deep .sun-editor .se-wrapper{position:relative!important;width:100%;height:auto;overflow:hidden;z-index:1}:host ::ng-deep .sun-editor .se-wrapper .se-wrapper-inner{width:100%;height:100%;min-height:65px;overflow-y:auto;overflow-x:auto;-webkit-overflow-scrolling:touch;user-select:auto;-o-user-select:auto;-moz-user-select:auto;-khtml-user-select:auto;-webkit-user-select:auto;-ms-user-select:auto}:host ::ng-deep .sun-editor .se-wrapper .se-wrapper-inner:focus{outline:none}:host ::ng-deep .sun-editor .se-wrapper .se-wrapper-code{background-color:#191919;color:#fff;font-size:13px;word-break:break-all;padding:4px;margin:0;resize:none!important}:host ::ng-deep .sun-editor .se-wrapper .se-wrapper-wysiwyg{display:block}:host ::ng-deep .sun-editor .se-wrapper .se-wrapper-code-mirror{font-size:13px}:host ::ng-deep .sun-editor .se-wrapper .se-placeholder{position:absolute;display:none;white-space:nowrap;text-overflow:ellipsis;z-index:1;color:#b1b1b1;font-size:13px;line-height:1.5;top:0;left:0;right:0;overflow:hidden;margin-top:0;padding-top:16px;padding-left:16px;margin-left:0;padding-right:16px;margin-right:0;pointer-events:none;backface-visibility:hidden;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden}:host ::ng-deep .sun-editor .se-resizing-bar{display:flex;width:auto;height:auto;min-height:16px;border-top:1px solid #dadada;padding:0 4px;background-color:#fafafa;cursor:ns-resize}:host ::ng-deep .sun-editor .se-resizing-bar.se-resizing-none{cursor:default}:host ::ng-deep .sun-editor .se-resizing-back{position:absolute;display:none;cursor:default;top:0;left:0;width:100%;height:100%;z-index:2147483647}:host ::ng-deep .sun-editor .se-resizing-bar .se-navigation{flex:auto;position:relative;width:auto;height:auto;color:#666;margin:0;padding:0;font-size:10px;line-height:1.5;background:#0000}:host ::ng-deep .sun-editor .se-resizing-bar .se-char-counter-wrapper{flex:none;position:relative;display:block;width:auto;height:auto;margin:0;padding:0;color:#999;font-size:13px;background:#0000}:host ::ng-deep .sun-editor .se-resizing-bar .se-char-counter-wrapper.se-blink{color:#b94a48;animation:blinker .2s linear infinite}:host ::ng-deep .sun-editor .se-resizing-bar .se-char-counter-wrapper .se-char-label{margin-right:4px}:host ::ng-deep .sun-editor .se-dialog{position:absolute;display:none;top:0;left:0;width:100%;height:100%;z-index:2147483647}:host ::ng-deep .sun-editor .se-dialog button,:host ::ng-deep .sun-editor .se-dialog input,:host ::ng-deep .sun-editor .se-dialog label{font-size:14px;line-height:1.5;color:#111;margin:0}:host ::ng-deep .sun-editor .se-dialog .se-dialog-back{background-color:#222;opacity:.5}:host ::ng-deep .sun-editor .se-dialog .se-dialog-back,:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner{position:absolute;width:100%;height:100%;top:0;left:0}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-content{position:relative;width:auto;max-width:500px;margin:1.75rem auto;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #0003;border-radius:4px;outline:0;box-shadow:0 3px 9px #00000080}@media screen and (max-width:509px){:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-content{width:100%}}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-content label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:700}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-content .se-btn-primary{display:inline-block;padding:6px 12px;margin:0 0 10px!important;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;touch-action:manipulation;border-radius:4px}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-header{height:50px;padding:6px 15px;border-bottom:1px solid #e5e5e5}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-header .se-dialog-close{float:right;font-weight:700;text-shadow:0 1px 0 #fff;-webkit-appearance:none;filter:alpha(opacity=100);opacity:1}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-header .se-modal-title{float:left;font-size:14px;font-weight:700;margin:0;padding:0;line-height:2.5}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-body{position:relative;padding:15px 15px 5px}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form{margin-bottom:10px}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form-footer{margin-top:10px;margin-bottom:0}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner input:disabled{background-color:#f3f3f3}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-size-text{width:100%}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-size-text .size-h,:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-size-text .size-w{width:70px;text-align:center}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-size-x{margin:0 8px;width:25px;text-align:center}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-footer{height:auto;min-height:55px;padding:10px 15px 0;text-align:right;border-top:1px solid #e5e5e5}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-footer>div{float:left}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-footer>div>label{margin:0 5px 0 0}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-btn-radio{margin-left:12px;margin-right:6px}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-btn-check{margin-left:12px;margin-right:4px}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form-footer .se-dialog-btn-check{margin-left:0;margin-right:4px}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form-footer label:first-child{margin-right:16px;margin-left:0}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-dialog-form-files{position:relative;display:flex;align-items:center}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-dialog-form-files>input{flex:auto}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-dialog-form-files .se-dialog-files-edge-button{flex:auto;opacity:.8;border:1px solid #ccc}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-dialog-form-files .se-dialog-files-edge-button.se-file-remove>svg{width:8px;height:8px}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-dialog-form-files .se-dialog-files-edge-button:hover{background-color:#f0f0f0;outline:0 none}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-dialog-form-files .se-dialog-files-edge-button:active{background-color:#e9e9e9;box-shadow:inset 0 3px 5px #d6d6d6}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-input-select{display:inline-block;width:auto;height:34px;font-size:14px;text-align:center;line-height:1.42857143}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-input-control{display:inline-block;width:70px;height:34px;font-size:14px;text-align:center;line-height:1.42857143}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-input-form{display:block;width:100%;height:34px;font-size:14px;line-height:1.42857143;padding:0 4px}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-input-form.se-input-url{direction:ltr}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-input-form.se-input-url:disabled{text-decoration:line-through;color:#999}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-video-ratio{width:70px;margin-left:4px}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form a{color:#004cff}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-btn-revert{border:1px solid #ccc}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-btn-revert:hover{background-color:#e1e1e1;border-color:#d1d1d1;outline:0 none}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-btn-revert:active{background-color:#d1d1d1;border-color:#c1c1c1;box-shadow:inset 0 3px 5px #c1c1c1}:host ::ng-deep .sun-editor .se-dialog-tabs{width:100%;height:25px;border-bottom:1px solid #e5e5e5}:host ::ng-deep .sun-editor .se-dialog-tabs button{background-color:#e5e5e5;border-right:1px solid #e5e5e5;float:left;outline:none;padding:2px 13px;transition:.3s}:host ::ng-deep .sun-editor .se-dialog-tabs button:hover{background-color:#fff}:host ::ng-deep .sun-editor .se-dialog-tabs button.active{background-color:#fff;border-bottom:0}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-input-form.se-math-exp{resize:vertical;height:4rem;border:1px solid #ccc;font-size:13px;padding:4px;direction:ltr}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-input-select.se-math-size{width:6em;height:28px;margin-left:1em}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-math-preview{font-size:13px}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-math-preview>span{display:inline-block;box-shadow:0 0 0 .1rem #c7deff}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-math-preview>span *{direction:ltr}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-link-preview{display:block;height:auto;max-height:18px;font-size:13px;font-weight:400;font-family:inherit;color:#666;background-color:initial;overflow:hidden;text-overflow:ellipsis;word-break:break-all;white-space:pre}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-anchor-preview-form{width:100%;display:flex;margin-top:4px}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-anchor-preview-form .se-svg.se-anchor-preview-icon{flex:unset;display:none;line-height:1.5;color:#4592ff}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-anchor-preview-form .se-link-preview{flex:auto;margin:0}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-anchor-rel{height:34px}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-anchor-rel-btn{width:46px;color:#3f9dff}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-anchor-rel-wrapper{display:flex;line-height:1.5;padding-top:6px}:host ::ng-deep .sun-editor .se-dialog .se-dialog-inner .se-anchor-rel-preview{text-align:left}:host ::ng-deep .sun-editor .se-controller .se-arrow.se-arrow-up{border-bottom-color:#00000040}:host ::ng-deep .sun-editor .se-controller{position:absolute;display:none;overflow:visible;z-index:6;border:1px solid #00000040;border-radius:4px;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;letter-spacing:normal;word-break:normal;word-spacing:normal;word-wrap:normal;white-space:normal;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;box-shadow:0 5px 10px #0003;line-break:auto}:host ::ng-deep .sun-editor .se-controller .se-btn-group{position:relative;display:flex;vertical-align:middle;padding:2px;top:0;left:0}:host ::ng-deep .sun-editor .se-controller .se-btn-group .se-btn-group-sub{left:50%;min-width:auto;width:-webkit-max-content;width:max-content;display:none}:host ::ng-deep .sun-editor .se-controller .se-btn-group .se-btn-group-sub button{margin:0;min-width:72px}:host ::ng-deep .sun-editor .se-controller .se-btn-group button{position:relative;min-height:34px;height:auto;border:none;border-radius:4px;margin:1px;padding:5px 10px;font-size:12px;line-height:1.5;display:inline-block;font-weight:400;text-align:center;white-space:nowrap;vertical-align:middle;touch-action:manipulation}:host ::ng-deep .sun-editor .se-controller .se-btn-group button:focus:enabled,:host ::ng-deep .sun-editor .se-controller .se-btn-group button:hover:enabled{background-color:#e1e1e1;border-color:#d1d1d1;outline:0 none}:host ::ng-deep .sun-editor .se-controller .se-btn-group button:active:enabled{background-color:#d1d1d1;border-color:#c1c1c1;box-shadow:inset 0 3px 5px #c1c1c1}:host ::ng-deep .sun-editor .se-controller .se-btn-group button span{display:block;padding:0;margin:0}:host ::ng-deep .sun-editor .se-controller .se-btn-group button:enabled.active{color:#4592ff;outline:0 none}:host ::ng-deep .sun-editor .se-controller .se-btn-group button:enabled.active:focus,:host ::ng-deep .sun-editor .se-controller .se-btn-group button:enabled.active:hover{background-color:#e1e1e1;border-color:#d1d1d1;outline:0 none}:host ::ng-deep .sun-editor .se-controller .se-btn-group button:enabled.active:active{background-color:#d1d1d1;border-color:#c1c1c1;box-shadow:inset 0 3px 5px #c1c1c1}:host ::ng-deep .sun-editor .se-controller .se-btn-group button:enabled.on{background-color:#e1e1e1;border-color:#d1d1d1;outline:0 none}:host ::ng-deep .sun-editor .se-controller .se-btn-group button:enabled.on:focus,:host ::ng-deep .sun-editor .se-controller .se-btn-group button:enabled.on:hover{background-color:#d1d1d1;border-color:#c1c1c1;outline:0 none}:host ::ng-deep .sun-editor .se-controller .se-btn-group button:enabled.on:active{background-color:#c1c1c1;border-color:#b1b1b1;box-shadow:inset 0 3px 5px #b1b1b1}:host ::ng-deep .sun-editor .se-controller .se-form-group input{min-width:120px}:host ::ng-deep .sun-editor .se-controller-resizing{margin-top:-50px!important;padding:0;font-size:14px;font-style:normal;font-weight:400;line-height:1.42857143}:host ::ng-deep .sun-editor .se-controller-resizing .se-btn-group .se-btn-group-sub.se-resizing-align-list{width:74px}:host ::ng-deep .sun-editor .se-resizing-container{position:absolute;display:none;outline:1px solid #3f9dff;background-color:initial}:host ::ng-deep .sun-editor .se-resizing-container .se-modal-resize{position:absolute;display:inline-block;background-color:#3f9dff;opacity:.3}:host ::ng-deep .sun-editor .se-resizing-container .se-resize-dot{position:absolute;top:0;left:0;width:100%;height:100%}:host ::ng-deep .sun-editor .se-resizing-container .se-resize-dot>span{position:absolute;width:7px;height:7px;background-color:#3f9dff;border:1px solid #4592ff}:host ::ng-deep .sun-editor .se-resizing-container .se-resize-dot>span.tl{top:-5px;left:-5px;cursor:nw-resize}:host ::ng-deep .sun-editor .se-resizing-container .se-resize-dot>span.tr{top:-5px;right:-5px;cursor:ne-resize}:host ::ng-deep .sun-editor .se-resizing-container .se-resize-dot>span.bl{bottom:-5px;left:-5px;cursor:sw-resize}:host ::ng-deep .sun-editor .se-resizing-container .se-resize-dot>span.br{right:-5px;bottom:-5px;cursor:se-resize}:host ::ng-deep .sun-editor .se-resizing-container .se-resize-dot>span.lw{left:-7px;bottom:50%;cursor:w-resize}:host ::ng-deep .sun-editor .se-resizing-container .se-resize-dot>span.th{left:50%;top:-7px;cursor:n-resize}:host ::ng-deep .sun-editor .se-resizing-container .se-resize-dot>span.rw{right:-7px;bottom:50%;cursor:e-resize}:host ::ng-deep .sun-editor .se-resizing-container .se-resize-dot>span.bh{right:50%;bottom:-7px;cursor:s-resize}:host ::ng-deep .sun-editor .se-resizing-container .se-resize-display{position:absolute;right:0;bottom:0;padding:5px;margin:5px;font-size:12px;color:#fff;background-color:#333;border-radius:4px}:host ::ng-deep .sun-editor .se-controller-table,:host ::ng-deep .sun-editor .se-controller-table-cell{width:auto}:host ::ng-deep .sun-editor .se-controller-link,:host ::ng-deep .sun-editor .se-controller-table,:host ::ng-deep .sun-editor .se-controller-table-cell{padding:0;font-size:14px;font-style:normal;font-weight:400;line-height:1.42857143}:host ::ng-deep .sun-editor .se-controller-link:after,:host ::ng-deep .sun-editor .se-controller-link:before{box-sizing:border-box}:host ::ng-deep .sun-editor .se-controller-link .link-content{padding:0;margin:0}:host ::ng-deep .sun-editor .se-controller-link .link-content a{display:inline-block;color:#4592ff;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align:middle;margin-left:5px}:host ::ng-deep .sun-editor .se-select-list{position:absolute;top:0;left:0;display:none;width:auto;max-width:100%;background-color:#fff;padding:0;margin:0;border:1px solid #bababa;box-shadow:0 3px 9px #00000080;outline:0 none}:host ::ng-deep .sun-editor .se-select-list .se-select-item{line-height:28px;min-height:28px;font-size:13px;padding:0 5px;margin:2px 0;cursor:pointer}:host ::ng-deep .sun-editor .se-select-list.__se_select-menu-mouse-move .se-select-item:hover,:host ::ng-deep .sun-editor .se-select-list:not(.__se_select-menu-mouse-move) .se-select-item.active{background-color:#e1e1e1}:host ::ng-deep .sun-editor .se-dialog-form-files .se-select-list{width:100%}:host ::ng-deep .sun-editor .se-file-browser{position:absolute;display:none;top:0;left:0;width:100%;height:100%;z-index:2147483647}:host ::ng-deep .sun-editor .se-file-browser button,:host ::ng-deep .sun-editor .se-file-browser input,:host ::ng-deep .sun-editor .se-file-browser label{font-size:14px;line-height:1.5;color:#111;margin:0}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-back{background-color:#222;opacity:.5}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-back,:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-inner{position:absolute;display:block;width:100%;height:100%;top:0;left:0}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-inner .se-file-browser-content{position:relative;width:960px;max-width:100%;margin:20px auto;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #0003;border-radius:4px;outline:0;box-shadow:0 3px 9px #00000080}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-header{height:auto;min-height:50px;padding:6px 15px;border-bottom:1px solid #e5e5e5}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-header .se-file-browser-close{float:right;font-weight:700;text-shadow:0 1px 0 #fff;-webkit-appearance:none;filter:alpha(opacity=100);opacity:1}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-header .se-file-browser-close>svg{width:12px;height:12px}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-header .se-file-browser-title{font-size:16px;font-weight:700;margin:0;padding:0;line-height:2.2}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-tags{display:block;width:100%;padding:0;text-align:left;margin:0 -15px}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-tags a{display:inline-block;background-color:#f5f5f5;padding:6px 12px;margin:8px 0 8px 8px;color:#333;text-decoration:none;border-radius:32px;-moz-border-radius:32px;-webkit-border-radius:32px;-moz-background-clip:padding;-webkit-background-clip:padding-box;background-clip:padding-box;cursor:pointer}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-tags a:hover{background-color:#e1e1e1}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-tags a:active{background-color:#d1d1d1}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-tags a.on{background-color:#ebf3fe;color:#4592ff}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-tags a.on:hover{background-color:#d8e8fe}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-tags a.on:active{background-color:#c7deff}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-body{position:relative;height:auto;min-height:350px;padding:20px;overflow-y:auto}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-body .se-file-browser-list{position:relative;width:100%}@media screen and (max-width:992px){:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-inner .se-file-browser-content{width:748px}}@media screen and (max-width:768px){:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-inner .se-file-browser-content{width:600px}}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-list .se-file-item-column{position:relative;display:block;height:auto;float:left}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-list.se-image-list .se-file-item-column{width:calc(25% - 20px);margin:0 10px}@media screen and (max-width:992px){:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-list.se-image-list .se-file-item-column{width:calc(33% - 20px)}}@media screen and (max-width:768px){:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-list.se-image-list .se-file-item-column{width:calc(50% - 20px)}}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-list.se-image-list .se-file-item-img{position:relative;display:block;cursor:pointer;width:100%;height:auto;border-radius:4px;outline:0;margin:10px 0}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-list.se-image-list .se-file-item-img:hover{opacity:.8;box-shadow:0 0 0 .2rem #3288ff}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-list.se-image-list .se-file-item-img>img{position:relative;display:block;width:100%;border-radius:4px;outline:0;height:auto}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-list.se-image-list .se-file-item-img>.se-file-img-name{position:absolute;z-index:1;font-size:13px;color:#fff;left:0;bottom:0;padding:5px 10px;background-color:initial;width:100%;height:30px;border-bottom-right-radius:4px;border-bottom-left-radius:4px}:host ::ng-deep .sun-editor .se-file-browser .se-file-browser-list.se-image-list .se-file-item-img>.se-file-img-name.se-file-name-back{background-color:#333;opacity:.6}:host ::ng-deep .sun-editor .se-notice{position:absolute;top:0;display:none;z-index:7;width:100%;height:auto;word-break:break-all;font-size:13px;color:#b94a48;background-color:#f2dede;padding:15px;margin:0;border:1px solid #eed3d7;user-select:auto;-o-user-select:auto;-moz-user-select:auto;-khtml-user-select:auto;-webkit-user-select:auto;-ms-user-select:auto}:host ::ng-deep .sun-editor .se-notice button{float:right;padding:7px}:host ::ng-deep .sun-editor .se-tooltip{position:relative;overflow:visible}:host ::ng-deep .sun-editor .se-tooltip .se-tooltip-inner{visibility:hidden;position:absolute;display:block;width:auto;top:120%;left:50%;background:#0000;opacity:0;z-index:1;line-height:1.5;transition:opacity .5s;margin:0;padding:0;bottom:auto;float:none;pointer-events:none;backface-visibility:hidden;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden}:host ::ng-deep .sun-editor .se-tooltip .se-tooltip-inner .se-tooltip-text{position:relative;display:inline-block;width:auto;left:-50%;font-size:.9em;margin:0;padding:4px 6px;border-radius:2px;background-color:#333;color:#fff;text-align:center;line-height:unset;white-space:nowrap;cursor:auto}:host ::ng-deep .sun-editor .se-tooltip .se-tooltip-inner .se-tooltip-text:after{content:\"\";position:absolute;bottom:100%;left:50%;margin-left:-5px;border:5px solid;border-color:#0000 #0000 #333}:host ::ng-deep .sun-editor .se-tooltip:hover .se-tooltip-inner{visibility:visible;opacity:1}:host ::ng-deep .sun-editor .se-tooltip .se-tooltip-inner .se-tooltip-text .se-shortcut{display:block!important}:host ::ng-deep .sun-editor .se-tooltip .se-tooltip-inner .se-tooltip-text .se-shortcut>.se-shortcut-key{display:inline;font-weight:700}:host ::ng-deep .sun-editor.se-rtl .se-btn-tray{direction:rtl}:host ::ng-deep .sun-editor.se-rtl .se-btn-select .txt{flex:auto;text-align:right;direction:rtl}:host ::ng-deep .sun-editor.se-rtl .se-btn-list{text-align:right}:host ::ng-deep .sun-editor.se-rtl .se-btn-list>.se-list-icon{margin:-1px 0 0 10px}:host ::ng-deep .sun-editor.se-rtl .se-menu-list,:host ::ng-deep .sun-editor.se-rtl .se-menu-list li{float:right}:host ::ng-deep .sun-editor.se-rtl .se-list-layer *{direction:rtl}:host ::ng-deep .sun-editor.se-rtl .se-list-layer.se-list-format ul blockquote{padding:0 7px 0 0;border-right-width:5px;border-left-width:0}:host ::ng-deep .sun-editor.se-rtl .se-list-layer .se-selector-color .se-color-pallet li{float:right}:host ::ng-deep .sun-editor.se-rtl .se-list-inner .se-list-checked li button>.se-svg{float:right;padding:6px 0 0 6px}:host ::ng-deep .sun-editor.se-rtl .se-tooltip .se-tooltip-inner .se-tooltip-text,:host ::ng-deep .sun-editor.se-rtl .se-wrapper .se-placeholder{direction:rtl}:host ::ng-deep .sun-editor.se-rtl .se-tooltip .se-tooltip-inner .se-tooltip-text .se-shortcut{direction:ltr}:host ::ng-deep .sun-editor.se-rtl .se-dialog *{direction:rtl}:host ::ng-deep .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-dialog-header .se-dialog-close{float:left}:host ::ng-deep .sun-editor.se-rtl .se-dialog-tabs button,:host ::ng-deep .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-dialog-header .se-modal-title{float:right}:host ::ng-deep .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-dialog-size-text{padding-right:34px}:host ::ng-deep .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-dialog-footer .se-btn-primary{float:left}:host ::ng-deep .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-dialog-footer>div{float:right}:host ::ng-deep .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-dialog-footer>div>label{margin:0 0 0 5px}:host ::ng-deep .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-dialog-form-footer label:first-child{margin-left:16px;margin-right:0}:host ::ng-deep .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-anchor-rel-preview{margin-left:4px;text-align:right}:host ::ng-deep .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-anchor-rel-btn{float:right}:host ::ng-deep .sun-editor.se-rtl .se-file-browser *{direction:rtl}:host ::ng-deep .sun-editor.se-rtl .se-file-browser .se-file-browser-tags{text-align:right}:host ::ng-deep .sun-editor.se-rtl .se-file-browser .se-file-browser-tags a{margin:8px 8px 0}:host ::ng-deep .sun-editor.se-rtl .se-file-browser .se-file-browser-header .se-file-browser-close{float:left}:host ::ng-deep .sun-editor.se-rtl .se-controller .se-btn-group,:host ::ng-deep .sun-editor.se-rtl .se-resizing-container .se-resize-display{direction:rtl}@keyframes blinker{50%{opacity:0}}@keyframes spinner{to{transform:rotate(361deg)}}:host ::ng-deep .sun-editor-editable{font-family:Helvetica Neue;font-size:13px;color:#333;background-color:#fff;line-height:1.5;word-break:normal;word-wrap:break-word;padding:16px;margin:0}:host ::ng-deep .sun-editor-editable *{box-sizing:border-box;font-family:inherit;font-size:inherit;color:inherit}:host ::ng-deep .sun-editor-editable.se-rtl *{direction:rtl}:host ::ng-deep .sun-editor-editable audio,:host ::ng-deep .sun-editor-editable figcaption,:host ::ng-deep .sun-editor-editable figure,:host ::ng-deep .sun-editor-editable iframe,:host ::ng-deep .sun-editor-editable img,:host ::ng-deep .sun-editor-editable td,:host ::ng-deep .sun-editor-editable th,:host ::ng-deep .sun-editor-editable video{position:relative}:host ::ng-deep .sun-editor-editable .__se__float-left{float:left}:host ::ng-deep .sun-editor-editable .__se__float-right{float:right}:host ::ng-deep .sun-editor-editable .__se__float-center{float:center}:host ::ng-deep .sun-editor-editable .__se__float-none{float:none}:host ::ng-deep .sun-editor-editable span{display:inline;vertical-align:initial;margin:0;padding:0}:host ::ng-deep .sun-editor-editable span.katex{display:inline-block}:host ::ng-deep .sun-editor-editable span.katex *{direction:ltr}:host ::ng-deep .sun-editor-editable a{color:#004cff;text-decoration:none}:host ::ng-deep .sun-editor-editable span[style~=\"color:\"] a{color:inherit}:host ::ng-deep .sun-editor-editable a:focus,:host ::ng-deep .sun-editor-editable a:hover{cursor:pointer;color:#0093ff;text-decoration:underline}:host ::ng-deep .sun-editor-editable a.on{color:#0093ff;background-color:#e8f7ff}:host ::ng-deep .sun-editor-editable pre{display:block;padding:8px;margin:0 0 10px;font-family:monospace;color:#666;line-height:1.45;background-color:#f9f9f9;border:1px solid #e1e1e1;border-radius:2px;white-space:pre-wrap!important;word-wrap:break-word;overflow:visible}:host ::ng-deep .sun-editor-editable ol{list-style-type:decimal}:host ::ng-deep .sun-editor-editable ol,:host ::ng-deep .sun-editor-editable ul{list-style-position:outside;display:block;margin-block-start:1em;margin-block-end:1em;margin-inline-start:0;margin-inline-end:0;padding-inline-start:40px}:host ::ng-deep .sun-editor-editable ul{list-style-type:disc}:host ::ng-deep .sun-editor-editable li{display:list-item;text-align:-webkit-match-parent;margin-bottom:5px}:host ::ng-deep .sun-editor-editable ol ol,:host ::ng-deep .sun-editor-editable ol ul,:host ::ng-deep .sun-editor-editable ul ol,:host ::ng-deep .sun-editor-editable ul ul{margin:0}:host ::ng-deep .sun-editor-editable ol ol,:host ::ng-deep .sun-editor-editable ul ol{list-style-type:lower-alpha}:host ::ng-deep .sun-editor-editable ol ol ol,:host ::ng-deep .sun-editor-editable ul ol ol,:host ::ng-deep .sun-editor-editable ul ul ol{list-style-type:upper-roman}:host ::ng-deep .sun-editor-editable ol ul,:host ::ng-deep .sun-editor-editable ul ul{list-style-type:circle}:host ::ng-deep .sun-editor-editable ol ol ul,:host ::ng-deep .sun-editor-editable ol ul ul,:host ::ng-deep .sun-editor-editable ul ul ul{list-style-type:square}:host ::ng-deep .sun-editor-editable sub,:host ::ng-deep .sun-editor-editable sup{font-size:75%;line-height:0}:host ::ng-deep .sun-editor-editable sub{vertical-align:sub}:host ::ng-deep .sun-editor-editable sup{vertical-align:super}:host ::ng-deep .sun-editor-editable p{display:block;margin:0 0 10px}:host ::ng-deep .sun-editor-editable div{display:block;margin:0;padding:0}:host ::ng-deep .sun-editor-editable blockquote{display:block;font-family:inherit;font-size:inherit;color:#999;margin-block-start:1em;margin-block-end:1em;margin-inline-start:0;margin-inline-end:0;padding:0 5px 0 20px;border:solid #b1b1b1;border-width:0 0 0 5px}:host ::ng-deep .sun-editor-editable blockquote blockquote{border-color:#c1c1c1}:host ::ng-deep .sun-editor-editable blockquote blockquote blockquote{border-color:#d1d1d1}:host ::ng-deep .sun-editor-editable blockquote blockquote blockquote blockquote{border-color:#e1e1e1}:host ::ng-deep .sun-editor-editable.se-rtl blockquote{padding-left:5px;padding-right:20px;border-left-width:0;border-right-width:5px}:host ::ng-deep .sun-editor-editable h1{font-size:2em;margin-block-start:.67em;margin-block-end:.67em}:host ::ng-deep .sun-editor-editable h1,:host ::ng-deep .sun-editor-editable h2{display:block;margin-inline-start:0;margin-inline-end:0;font-weight:700}:host ::ng-deep .sun-editor-editable h2{font-size:1.5em;margin-block-start:.83em;margin-block-end:.83em}:host ::ng-deep .sun-editor-editable h3{font-size:1.17em;margin-block-start:1em;margin-block-end:1em}:host ::ng-deep .sun-editor-editable h3,:host ::ng-deep .sun-editor-editable h4{display:block;margin-inline-start:0;margin-inline-end:0;font-weight:700}:host ::ng-deep .sun-editor-editable h4{font-size:1em;margin-block-start:1.33em;margin-block-end:1.33em}:host ::ng-deep .sun-editor-editable h5{font-size:.83em;margin-block-start:1.67em;margin-block-end:1.67em}:host ::ng-deep .sun-editor-editable h5,:host ::ng-deep .sun-editor-editable h6{display:block;margin-inline-start:0;margin-inline-end:0;font-weight:700}:host ::ng-deep .sun-editor-editable h6{font-size:.67em;margin-block-start:2.33em;margin-block-end:2.33em}:host ::ng-deep .sun-editor-editable hr{display:flex;border-width:1px 0 0;border-color:#000;border-image:initial;height:1px}:host ::ng-deep .sun-editor-editable hr.__se__solid{border-style:solid none none}:host ::ng-deep .sun-editor-editable hr.__se__dotted{border-style:dotted none none}:host ::ng-deep .sun-editor-editable hr.__se__dashed{border-style:dashed none none}:host ::ng-deep .sun-editor-editable hr.on{border-color:#4592ff;box-shadow:0 0 0 .1rem #c7deff}:host ::ng-deep .sun-editor-editable table{display:table;table-layout:auto!important;border:1px solid #ccc;width:100%;max-width:100%;margin:0 0 10px;background-color:initial;border-spacing:0;border-collapse:collapse}:host ::ng-deep .sun-editor-editable.se-rtl table{margin:0 0 10px auto}:host ::ng-deep .sun-editor-editable table thead{border-bottom:2px solid #333}:host ::ng-deep .sun-editor-editable table tr{border:1px solid #efefef}:host ::ng-deep .sun-editor-editable table th{background-color:#f3f3f3}:host ::ng-deep .sun-editor-editable table td,:host ::ng-deep .sun-editor-editable table th{border:1px solid #e1e1e1;padding:.4em;background-clip:padding-box}:host ::ng-deep .sun-editor-editable table.se-table-size-auto{width:auto!important}:host ::ng-deep .sun-editor-editable table.se-table-size-100{width:100%!important}:host ::ng-deep .sun-editor-editable table.se-table-layout-auto{table-layout:auto!important}:host ::ng-deep .sun-editor-editable table.se-table-layout-fixed{table-layout:fixed!important}:host ::ng-deep .sun-editor-editable table td.se-table-selected-cell,:host ::ng-deep .sun-editor-editable table th.se-table-selected-cell{outline:1px double #4592ff}:host ::ng-deep .sun-editor-editable.se-disabled *{user-select:none;-o-user-select:none;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-ms-user-select:none}:host ::ng-deep .sun-editor-editable .se-component{display:flex;padding:1px;margin:0 0 10px}:host ::ng-deep .sun-editor-editable[contenteditable=true] .se-component{outline:1px dashed #e1e1e1}:host ::ng-deep .sun-editor-editable[contenteditable=true] .se-component.se-component-copy{box-shadow:0 0 0 .2rem #3f9dff;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}:host ::ng-deep .sun-editor-editable audio,:host ::ng-deep .sun-editor-editable iframe,:host ::ng-deep .sun-editor-editable img,:host ::ng-deep .sun-editor-editable video{display:block;margin:0;padding:0;width:auto;height:auto;max-width:100%}:host ::ng-deep .sun-editor-editable[contenteditable=true] figure:after{position:absolute;content:\"\";z-index:1;top:0;left:0;right:0;bottom:0;cursor:default;display:block;background:#0000}:host ::ng-deep .sun-editor-editable[contenteditable=true] figure a,:host ::ng-deep .sun-editor-editable[contenteditable=true] figure iframe,:host ::ng-deep .sun-editor-editable[contenteditable=true] figure img,:host ::ng-deep .sun-editor-editable[contenteditable=true] figure video{z-index:0}:host ::ng-deep .sun-editor-editable[contenteditable=true] figure figcaption{display:block;z-index:2}:host ::ng-deep .sun-editor-editable[contenteditable=true] figure figcaption:focus{border-color:#80bdff;outline:0;box-shadow:0 0 0 .2rem #c7deff}:host ::ng-deep .sun-editor-editable .se-image-container,:host ::ng-deep .sun-editor-editable .se-video-container{width:auto;height:auto;max-width:100%}:host ::ng-deep .sun-editor-editable figure{display:block;outline:none;margin:0;padding:0}:host ::ng-deep .sun-editor-editable figure figcaption{padding:1em .5em;margin:0;background-color:#f9f9f9;outline:none}:host ::ng-deep .sun-editor-editable figure figcaption p{line-height:2;margin:0}:host ::ng-deep .sun-editor-editable .se-image-container a img{padding:1px;margin:1px;outline:1px solid #4592ff}:host ::ng-deep .sun-editor-editable .se-video-container iframe,:host ::ng-deep .sun-editor-editable .se-video-container video{outline:1px solid #9e9e9e;position:absolute;top:0;left:0;border:0;width:100%;height:100%}:host ::ng-deep .sun-editor-editable .se-video-container figure{left:0;width:100%;max-width:100%}:host ::ng-deep .sun-editor-editable audio{width:300px;height:54px}:host ::ng-deep .sun-editor-editable audio.active{outline:2px solid #80bdff}:host ::ng-deep .sun-editor-editable.se-show-block div,:host ::ng-deep .sun-editor-editable.se-show-block h1,:host ::ng-deep .sun-editor-editable.se-show-block h2,:host ::ng-deep .sun-editor-editable.se-show-block h3,:host ::ng-deep .sun-editor-editable.se-show-block h4,:host ::ng-deep .sun-editor-editable.se-show-block h5,:host ::ng-deep .sun-editor-editable.se-show-block h6,:host ::ng-deep .sun-editor-editable.se-show-block li,:host ::ng-deep .sun-editor-editable.se-show-block ol,:host ::ng-deep .sun-editor-editable.se-show-block p,:host ::ng-deep .sun-editor-editable.se-show-block pre,:host ::ng-deep .sun-editor-editable.se-show-block ul{border:1px dashed #3f9dff!important;padding:14px 8px 8px!important}:host ::ng-deep .sun-editor-editable.se-show-block ol,:host ::ng-deep .sun-editor-editable.se-show-block ul{border:1px dashed #d539ff!important}:host ::ng-deep .sun-editor-editable.se-show-block pre{border:1px dashed #27c022!important}:host ::ng-deep .se-show-block p{background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAPAQMAAAAF7dc0AAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAaSURBVAjXY/j/gwGCPvxg+F4BQiAGDP1HQQByxxw0gqOzIwAAAABJRU5ErkJggg==\") no-repeat}:host ::ng-deep .se-show-block div{background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAPAQMAAAAxlBYoAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAmSURBVAjXY/j//wcDDH+8XsHwDYi/hwNx1A8w/nYLKH4XoQYJAwCXnSgcl2MOPgAAAABJRU5ErkJggg==\") no-repeat}:host ::ng-deep .se-show-block h1{background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPAQMAAAA4f7ZSAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAfSURBVAjXY/j/v4EBhr+9B+LzEPrDeygfhI8j1CBhAEhmJGY4Rf6uAAAAAElFTkSuQmCC\") no-repeat}:host ::ng-deep .se-show-block h2{background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPAQMAAAA4f7ZSAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAmSURBVAjXY/j/v4EBhr+dB+LtQPy9geEDEH97D8T3gbgdoQYJAwA51iPuD2haEAAAAABJRU5ErkJggg==\") no-repeat}:host ::ng-deep .se-show-block h3{background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPAQMAAAA4f7ZSAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAiSURBVAjXY/j/v4EBhr+dB+LtQPy9geHDeQgN5p9HqEHCADeWI+69VG2MAAAAAElFTkSuQmCC\") no-repeat}:host ::ng-deep .se-show-block h4{background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAPAQMAAADTSA1RAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAiSURBVAjXY/j//wADDH97DsTXIfjDdiDdDMTfIRhZHRQDAKJOJ6L+K3y7AAAAAElFTkSuQmCC\") no-repeat}:host ::ng-deep .se-show-block h5{background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPAQMAAAA4f7ZSAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAlSURBVAjXY/j/v4EBhr+1A/F+IO5vYPiwHUh/B2IQfR6hBgkDABlWIy5uM+9GAAAAAElFTkSuQmCC\") no-repeat}:host ::ng-deep .se-show-block h6{background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPAQMAAAA4f7ZSAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAiSURBVAjXY/j/v4EBhr+dB+LtQLy/geFDP5S9HSKOrA6KAR9GIza1ptJnAAAAAElFTkSuQmCC\") no-repeat}:host ::ng-deep .se-show-block li{background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA7SURBVDhPYxgFcNDQ0PAfykQBIHEYhgoRB/BpwCfHBKWpBkaggYxQGgOgBzyQD1aLLA4TGwWDGjAwAACR3RcEU9Ui+wAAAABJRU5ErkJggg==\") no-repeat}:host ::ng-deep .se-show-block ol{background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABHSURBVDhPYxgFcNDQ0PAfhKFcFIBLHCdA1oBNM0kGEmMAPgOZoDTVANUNxAqQvURMECADRiiNAWCagDSGGhyW4DRrMAEGBgAu0SX6WpGgjAAAAABJRU5ErkJggg==\") no-repeat}:host ::ng-deep .se-show-block ul{background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA1SURBVDhPYxgFDA0NDf+hTBSALI5LDQgwQWmqgVEDKQcsUBoF4ItFGEBXA+QzQpmDGjAwAAA8DQ4Lni6gdAAAAABJRU5ErkJggg==\") no-repeat}:host ::ng-deep .sun-editor-editable .__se__p-bordered,:host ::ng-deep .sun-editor .__se__p-bordered{border-top:1px solid #b1b1b1;border-bottom:1px solid #b1b1b1;padding:4px 0}:host ::ng-deep .sun-editor-editable .__se__p-spaced,:host ::ng-deep .sun-editor .__se__p-spaced{letter-spacing:1px}:host ::ng-deep .sun-editor-editable .__se__p-neon,:host ::ng-deep .sun-editor .__se__p-neon{font-weight:200;font-style:italic;background:#000;color:#fff;padding:6px 4px;border:2px solid #fff;border-radius:6px;text-transform:uppercase;animation:neonFlicker 1.5s infinite alternate}@keyframes neonFlicker{0%,19%,21%,23%,25%,54%,56%,to{text-shadow:-.2rem -.2rem 1rem #fff,.2rem .2rem 1rem #fff,0 0 2px #f40,0 0 4px #f40,0 0 6px #f40,0 0 8px #f40,0 0 10px #f40;box-shadow:0 0 .5px #fff,inset 0 0 .5px #fff,0 0 2px #08f,inset 0 0 2px #08f,0 0 4px #08f,inset 0 0 4px #08f}20%,24%,55%{text-shadow:none;box-shadow:none}}:host ::ng-deep .sun-editor-editable .__se__t-shadow,:host ::ng-deep .sun-editor .__se__t-shadow{text-shadow:-.2rem -.2rem 1rem #fff,.2rem .2rem 1rem #fff,0 0 .2rem #999,0 0 .4rem #888,0 0 .6rem #777,0 0 .8rem #666,0 0 1rem #555}:host ::ng-deep .sun-editor-editable .__se__t-code,:host ::ng-deep .sun-editor .__se__t-code{font-family:monospace;color:#666;background-color:#1b1f230d;border-radius:6px;padding:.2em .4em}"] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxSuneditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-suneditor',
                        template: " <textarea id=\"{{ 'ngxsuneditor_' + editorID }}\"></textarea> ",
                        styleUrls: ['./ngx-suneditor.component.scss'],
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.NgZone }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [SUNEDITOR_OPTIONS]
                        }] }];
        }, propDecorators: { options: [{
                    type: i0.Input
                }], initialContent: [{
                    type: i0.Input
                }], created_event: [{
                    type: i0.Output
                }], onload_event: [{
                    type: i0.Output
                }], onScroll_event: [{
                    type: i0.Output
                }], onMouseDown_event: [{
                    type: i0.Output
                }], onClick_event: [{
                    type: i0.Output
                }], onInput_event: [{
                    type: i0.Output
                }], onKeyDown_event: [{
                    type: i0.Output
                }], onKeyUp_event: [{
                    type: i0.Output
                }], onChange_event: [{
                    type: i0.Output
                }], onFocus_event: [{
                    type: i0.Output
                }], onBlur_event: [{
                    type: i0.Output
                }], showController_event: [{
                    type: i0.Output
                }], toggleFullScreen_event: [{
                    type: i0.Output
                }], toggleCodeView_event: [{
                    type: i0.Output
                }], showInline_event: [{
                    type: i0.Output
                }], audioUploadHandler_event: [{
                    type: i0.Output
                }], onAudioUpload_event: [{
                    type: i0.Output
                }], videoUploadHandler_event: [{
                    type: i0.Output
                }], onVideoUpload_event: [{
                    type: i0.Output
                }], imageUploadHandler_event: [{
                    type: i0.Output
                }], onImageUpload_event: [{
                    type: i0.Output
                }], onCut_event: [{
                    type: i0.Output
                }], onCopy_event: [{
                    type: i0.Output
                }] } });

    /**
     * Bypass the angular DomSantiziser and trust the given value to be safe HTML.
     * The reason this pipe is needed is because there is no ability to trust a custom whitelist of HTML tags,
     * attributes, and values with a DOM sanitizer, without bypassing the whole sanitizer.
     * https://github.com/angular/angular/issues/19645
     * https://github.com/angular/angular/issues/36650
     */
    var SafeHtmlPipe = /** @class */ (function () {
        function SafeHtmlPipe(sanitized) {
            this.sanitized = sanitized;
        }
        SafeHtmlPipe.prototype.transform = function (value) {
            return this.sanitized.bypassSecurityTrustHtml(value);
        };
        return SafeHtmlPipe;
    }());
    SafeHtmlPipe.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SafeHtmlPipe, deps: [{ token: i1__namespace.DomSanitizer }], target: i0__namespace.ɵɵFactoryTarget.Pipe });
    SafeHtmlPipe.ɵpipe = i0__namespace.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SafeHtmlPipe, name: "safeHtml" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SafeHtmlPipe, decorators: [{
                type: i0.Pipe,
                args: [{ name: 'safeHtml' }]
            }], ctorParameters: function () { return [{ type: i1__namespace.DomSanitizer }]; } });

    var NgxSunViewComponent = /** @class */ (function () {
        function NgxSunViewComponent() {
            this.bypassSantiziser = false;
        }
        return NgxSunViewComponent;
    }());
    NgxSunViewComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxSunViewComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    NgxSunViewComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: NgxSunViewComponent, selector: "ngx-sunview", inputs: { content: "content", bypassSantiziser: "bypassSantiziser" }, ngImport: i0__namespace, template: "\n    <div\n      class=\"sun-editor-editable\"\n      *ngIf=\"bypassSantiziser\"\n      [innerHTML]=\"content | safeHtml\"\n    ></div>\n    <div\n      class=\"sun-editor-editable\"\n      *ngIf=\"!bypassSantiziser\"\n      [innerHTML]=\"content\"\n    ></div>\n  ", isInline: true, styles: ["@import \"../../../../node_modules/suneditor/src/assets/css/suneditor-contents.css\";"], directives: [{ type: i1__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "safeHtml": SafeHtmlPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxSunViewComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-sunview',
                        styleUrls: ['./ngx-sunview.component.scss'],
                        template: "\n    <div\n      class=\"sun-editor-editable\"\n      *ngIf=\"bypassSantiziser\"\n      [innerHTML]=\"content | safeHtml\"\n    ></div>\n    <div\n      class=\"sun-editor-editable\"\n      *ngIf=\"!bypassSantiziser\"\n      [innerHTML]=\"content\"\n    ></div>\n  ",
                    }]
            }], propDecorators: { content: [{
                    type: i0.Input
                }], bypassSantiziser: [{
                    type: i0.Input
                }] } });

    var NgxSuneditorModule = /** @class */ (function () {
        function NgxSuneditorModule() {
        }
        /**
         * Call this method once for editor configuration that should be used for every instance
         * without the need to provide the options object again
         *
         * You can pass options to the options input property of the component directly to override
         * a configuration for a single instance
         *
         * @example
         * export class appModule {
         * ...
         *  imports: [NgxSuneditorModule.forRoot(options)]
         * }
         *
         * export class featureModule {
         * ...
         *  imports: [NgxSuneditorModule]
         * }
         *
         * // HTML in appModule
         * // uses the 'default' options provided by froRoot(...)
         * <ngx-suneditor></ngx-suneditor>
         *
         * // uses the options provided via input
         * <ngx-suneditor [options]="opts"></ngx-suneditor>
         *
         * // uses the 'default' options provided by froRoot(...)
         * <app-feature-comp-editor></app-feature-comp-editor>>
         *
         * // HTML in feature module
         * // uses the 'default' options provided by froRoot(...)
         * <ngx-suneditor></ngx-suneditor>
         *
         *
         *
         * @param sunEditorOptions editor options
         */
        NgxSuneditorModule.forRoot = function (sunEditorOptions) {
            return {
                ngModule: NgxSuneditorModule,
                providers: [
                    {
                        provide: SUNEDITOR_OPTIONS,
                        useValue: sunEditorOptions,
                    },
                ],
            };
        };
        return NgxSuneditorModule;
    }());
    NgxSuneditorModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxSuneditorModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    NgxSuneditorModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxSuneditorModule, declarations: [NgxSuneditorComponent, NgxSunViewComponent, SafeHtmlPipe], imports: [i1$1.CommonModule], exports: [NgxSuneditorComponent, NgxSunViewComponent] });
    NgxSuneditorModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxSuneditorModule, imports: [[i1$1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: NgxSuneditorModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [NgxSuneditorComponent, NgxSunViewComponent, SafeHtmlPipe],
                        imports: [i1$1.CommonModule],
                        exports: [NgxSuneditorComponent, NgxSunViewComponent],
                    }]
            }] });

    /*
     * Public API Surface of ngx-suneditor
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NgxSunViewComponent = NgxSunViewComponent;
    exports.NgxSuneditorComponent = NgxSuneditorComponent;
    exports.NgxSuneditorModule = NgxSuneditorModule;
    exports.ROOT_INJECTOR_KEY = ROOT_INJECTOR_KEY;
    exports.SUNEDITOR_OPTIONS = SUNEDITOR_OPTIONS;
    exports.SafeHtmlPipe = SafeHtmlPipe;
    exports.align = align;
    exports.audio = audio;
    exports.blockquote = blockquote;
    exports.font = font;
    exports.fontColor = fontColor;
    exports.fontSize = fontSize;
    exports.formatBlock = formatBlock;
    exports.hiliteColor = hiliteColor;
    exports.horizontalRule = horizontalRule;
    exports.image = image;
    exports.imageGallery = imageGallery;
    exports.lineHeight = lineHeight;
    exports.link = link;
    exports.list = list;
    exports.math = math;
    exports.paragraphStyle = paragraphStyle;
    exports.table = table;
    exports.template = template;
    exports.textStyle = textStyle;
    exports.video = video;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-suneditor.umd.js.map
