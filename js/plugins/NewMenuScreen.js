//=============================================================================
// NewMenuScreen.js
//=============================================================================

/*:
 * @plugindesc Alternative menu screen layout.
 * @author Florian Strasser
 * www.florian-strasser.de
 *
 * @help This plugin does not provide plugin commands.
 */

(function() {

    var _Scene_Menu_new = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _Scene_Menu_new.call(this);
        this._statusWindow.x = this._commandWindow.width+30;
        this._statusWindow.y = 15;
		this._commandWindow.x = 15;
		this._commandWindow.y = 15;
		this._commandWindow.height = Graphics.boxHeight - (this._goldWindow.height*2) - (15*4);
		this.createLocationWindow();
        this._goldWindow.x = 15;
		this._goldWindow.width = this._commandWindow.width;
		this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height - 15;
    };
	
    Window_MenuCommand.prototype.windowWidth = function() {
        return 260;
    };

    Window_MenuCommand.prototype.maxCols = function() {
        return 1;
    };

    Window_MenuCommand.prototype.numVisibleRows = function() {
        return 10;
    };

    Window_MenuStatus.prototype.windowWidth = function() {
        return Graphics.boxWidth-305;
    };

    Window_MenuStatus.prototype.windowHeight = function() {
        var h1 = this.fittingHeight(1);
        var h2 = this.fittingHeight(2);
        return Graphics.boxHeight - 30;
    };

    Window_MenuStatus.prototype.maxCols = function() {
        return 1;
    };

    Window_MenuStatus.prototype.numVisibleRows = function() {
        return 3;
    };

    Window_MenuStatus.prototype.drawItemImage = function(index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        var w = Math.min(rect.width, 144);
        var h = Math.min(rect.height, 144);
        var lineHeight = this.lineHeight();
        this.changePaintOpacity(actor.isBattleMember());
        this.drawActorFace(actor, rect.x, rect.y +lineHeight * 0, w, h);
        this.changePaintOpacity(true);
    };

    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        var x = rect.x;
        var y = rect.y;
        var width = rect.width - 160;
        var bottom = y + rect.height;
        var lineHeight = this.lineHeight();
        this.drawActorName(actor, x + 160, y + 15 + lineHeight * 0, width);
        this.drawActorLevel(actor, x + 345, y + 15 + lineHeight * 0, width-285);
        this.drawActorHp(actor, x + 160, y -15 + lineHeight * 2, width);
        this.drawActorMp(actor, x + 160, y -15 + lineHeight * 3, width);
        this.drawActorIcons(actor, x + 160, bottom - lineHeight * 1, width);
    };

    var _Window_MenuActor_initialize = Window_MenuActor.prototype.initialize;
    Window_MenuActor.prototype.initialize = function() {
        _Window_MenuActor_initialize.call(this);
        this.y = this.fittingHeight(2);
    };
	// Here begins the location window
	//-----------------------------------------------------------------------------
	// Window_Locations
	//
	// The window for displaying the players current location.
	
	Scene_Menu.prototype.createLocationWindow = function() {
    this._locationWindow = new Window_Location(0, 0);
	this._locationWindow.width = this._commandWindow.width;
    this._locationWindow.x = 15;
	this._locationWindow.y = Graphics.boxHeight - (this._locationWindow.height*2) - 30;
    this.addWindow(this._locationWindow);
	};
	
	function Window_Location() {
		this.initialize.apply(this, arguments);
	}
	
	Window_Location.prototype = Object.create(Window_Base.prototype);
	Window_Location.prototype.constructor = Window_Location;
	
	Window_Location.prototype.initialize = function(x, y) {
		var width = this.windowWidth();
		var height = this.windowHeight();
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this.refresh();
	};
	
	Window_Location.prototype.windowWidth = function() {
		return 240;
	};
	
	Window_Location.prototype.windowHeight = function() {
		return this.fittingHeight(1);
	};
	
	Window_Location.prototype.refresh = function() {
		var x = this.textPadding();
		var width = this.contents.width - this.textPadding() * 2;
		this.contents.clear();
		this.drawText(this.value(), x, 0, width);
	};
	
	Window_Location.prototype.value = function() {
		if ($gameMap.displayName())
			return $gameMap.displayName();
		else
			return 'Unknown location';
	};
	
	
	Window_Location.prototype.open = function() {
		this.refresh();
		Window_Base.prototype.open.call(this);
	};

})();
