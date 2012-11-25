/**
 * Creates a new font entity. A font entity will use a font sheet
 * (IgeFontSheet) and render text based on that font sheet's glyphs.
 */
var IgeFontEntity = IgeUiEntity.extend({
	classId: 'IgeFontEntity',

	init: function () {
		this._super();

		this._text = undefined;
		this._textAlignX = 1;
		this._textAlignY = 1;
		this._textLineSpacing = 0;
	},

	text: function (text) {
		if (text !== undefined) {
			this._text = text;
			return this;
		}

		return this._text;
	},

	autoData: function (obj, propName, preText, postText) {
		if (obj !== undefined && propName !== undefined) {
			this._autoDataObject = obj;
			this._autoDataProperty = propName;
			this._autoDataPreText = preText || '';
			this._autoDataPostText = postText || '';
		}

		return this;
	},

	textAlignX: function (val) {
		if (val !== undefined) {
			this._textAlignX = val;
			this.clearCache();
			return this;
		}
		return this._textAlignX;
	},

	textAlignY: function (val) {
		if (val !== undefined) {
			this._textAlignY = val;
			this.clearCache();
			return this;
		}
		return this._textAlignY;
	},

	textLineSpacing: function (val) {
		if (val !== undefined) {
			this._textLineSpacing = val;
			this.clearCache();
			return this;
		}
		return this._textLineSpacing;
	},

	/**
	 * Gets / sets the string hex or rgba value of the colour
	 * to use as an overlay when rending this entity's texture.
	 * @param {String=} val The colour value as hex e.g. '#ff0000'
	 * or as rgba e.g. 'rbga(255, 0, 0, 0.5)'. To remove an overlay
	 * colour simply passed an empty string.
	 * @return {*} "this" when arguments are passed to allow method
	 * chaining or the current value if no arguments are specified.
	 */
	colorOverlay: function (val) {
		if (val !== undefined) {
			this._colorOverlay = val;

			// Kill the cache for this text
			this.clearCache();
			return this;
		}

		return this._colorOverlay;
	},

	/**
	 * Clears the texture cache for this entity's text string.
	 */
	clearCache: function () {
		if (this._texture && this._texture._caching && this._texture._cacheText[this._text]) {
			delete this._texture._cacheText[this._text];
		}
	},

	/**
	 * When using native font rendering (canvasContext.fillText())
	 * this sets the font and size as per the canvasContext.font
	 * string specification.
	 * @param {String=} val The font style string.
	 * @return {*} "this" when arguments are passed to allow method
	 * chaining or the current value if no arguments are specified.
	 */
	nativeFont: function (val) {
		if (val !== undefined) {
			this._nativeFont = val;

			// Assign the native font smart texture
			var tex = new IgeTexture(IgeFontSmartTexture);
			this.texture(tex);

			return this;
		}

		return this._nativeFont;
	},

	/**
	 * Gets / sets the text stroke size that applies when using
	 * a native font for text rendering.
	 * @param {Number=} val The size of the text stroke.
	 * @return {*}
	 */
	nativeStroke: function (val) {
		if (val !== undefined) {
			this._nativeStroke = val;
			return this;
		}

		return this._nativeStroke;
	},

	/**
	 * Gets / sets the text stroke color that applies when using
	 * a native font for text rendering.
	 * @param {Number=} val The color of the text stroke.
	 * @return {*}
	 */
	nativeStrokeColor: function (val) {
		if (val !== undefined) {
			this._nativeStrokeColor = val;
			return this;
		}

		return this._nativeStrokeColor;
	},

	tick: function (ctx) {
		// Check for an auto-progress update
		if (this._autoDataObject && this._autoDataProperty) {
			this._text = this._autoDataPreText + this._autoDataObject[this._autoDataProperty] + this._autoDataPostText;
		}

		this._super(ctx);
	},

	/**
	 * Returns a string containing a code fragment that when
	 * evaluated will reproduce this object's properties via
	 * chained commands. This method will only check for
	 * properties that are directly related to this class.
	 * Other properties are handled by their own class method.
	 * @return {String}
	 */
	_stringify: function () {
		// Get the properties for all the super-classes
		var str = this._super(), i;

		// Loop properties and add property assignment code to string
		for (i in this) {
			if (this.hasOwnProperty(i) && this[i] !== undefined) {
				switch (i) {
					case '_text':
						str += ".text(" + this.text() + ")";
						break;
					case '_textAlignX':
						str += ".textAlignX(" + this.textAlignX() + ")";
						break;
					case '_textAlignY':
						str += ".textAlignY(" + this.textAlignY() + ")";
						break;
					case '_textLineSpacing':
						str += ".textLineSpacing(" + this.textLineSpacing() + ")";
						break;
				}
			}
		}

		return str;
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = IgeFontEntity; }