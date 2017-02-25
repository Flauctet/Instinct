//=============================================================================
// Ark_SaveEngine_Confirmation.js // version 1.3
//=============================================================================
/*:
 * @plugindesc Add a confirmation window after the action window. Requires the Ark_SaveScreen.js plugin and must be plugged below it.
 * @author ArkDG // Version 1.3
 *
 * 1.3 - Corrected a problem where the confirmation window is hidden, but do not deactivates;
 * 1.2 - Changed some important lines to mantian compatibilitty with the version 2.0 of the "Ark_SaveScreen.js" plugin.
 * 1.0.1 - Now you can define the positions for the confimartion window (through the "Ark_SaveScreen.js" plugin) and the confirmation
 * help window.
 * 1.0.1 - Updated the commands to fit the new version of the "Ark_SaveScreen.js" plugin.
 *
 * @help 
//============================================================================
// ** Terms of Use
// This plugin is free to use for both free and commercial games as long as
// I'm credited in your game as this plugin writer. ;)
// My name full name is Leonardo Misseno Justino.
//============================================================================
 
 Plug it in your game, configure the parameters properly and be happy.
 This addon just adds a new confirmation window after the command action one.
 
 Credits to: Me, ArkDG (Leonardo...).
 Thanks to: Roguedeus, that asked me to do this, and Rito that teached me what
 is and how to do the "imported" thing.
  
 Enjoy game developping! I wish you good lucky and success. ^^
*
* 
*
*@param Confirmation_Text_1
*@desc Are you sure you wanna do what you wanna do? Really sure? First part.
*@default Are you sure that you wanna
*
*@param Confirmation_Text_2
*@desc Are you sure you wanna do what you wanna do? Really sure? Last part.
*@default this file?
*
*@param Alert_Win_Size
*@desc You will have to change this if you plan to change the confirmation text.
*@default 666
*
*@param Yes_Language
*@desc How do I say "Yes" in your language?
*@default Confirm
*
*@param No_Language
*@desc How do I say "No" in your language?
*@default Cancel
*
*@param Alert_Window_X
*@desc Horizontal position of the Confirmation Help window. Leave 0 or less for screen center. Default is 0.
*@default 0
*
*@param Alert_Window_Y
*@desc Vertical position of the Confirmation Help window. Leave 0 or less for screen center. Default is 0.
*@default 0
*
*@param Confirmation_Width
*@desc Size of the confirmation command window. Default is 150.
*@default 150
*
*
*/

/////////////////////////////////////////////////////////////////////////
var params = PluginManager.parameters('Ark_SaveEngine_Confirmation');
/////////////////////////////////////////////////////////////////////////

var ark_confirmation_text1 =  String(params['Confirmation_Text_1'] || 'Are you sure that you wanna' );
var ark_confirmation_text2 =  String(params['Confirmation_Text_2'] || 'this file?' );
var ark_confirm = String(params['Yes_Language'] || 'Confirm');
var ark_unconfirm = String(params['No_Language'] || 'Cancel');
var ark_confirmation_size = Number(params['Alert_Win_Size'] || 666);
var ark_helpC_pos_x = Number(params['Alert_Window_X'] || 0);
var ark_helpC_pos_y = Number(params['Alert_Window_Y'] || 0);
var ark_confirmation_win_w = Number(params['Confirmation_Width'] || 150);


var ark_confirmation = 1;
var ark_confirm_mode = undefined;

//Start//
var Imported = Imported || {};
Imported.ArkDG_Confirmation = true;

if (Imported.ArkDG_SaveScreen){
	var _alias_SceneFile_create = Scene_File.prototype.create;
	Scene_File.prototype.create = function() {
		_alias_SceneFile_create.call(this);        
		this.createConfirmationWindows();
		
	};
}


//=======================
//CONFIRMATION WINDOWS
//=======================

function Window_ConfText() {
    this.initialize.apply(this, arguments);
}

Window_ConfText.prototype = Object.create(Window_Base.prototype);
Window_ConfText.prototype.constructor = Window_ConfText;

Window_ConfText.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};



Window_ConfText.prototype.windowWidth = function() {
    return ark_confirmation_size;
};

Window_ConfText.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_ConfText.prototype.refresh = function() {    
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;    
    if (ark_helpC_pos_x <= 0 || ark_helpC_pos_y <= 0) {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2 + 35;
    } else {
        this.x = ark_helpC_pos_x;
        this.y = ark_helpC_pos_y; 
    }    
    this.contents.clear();
    this.drawText(ark_confirmation_text1 + ' ' + ark_confirm_mode + ' ' + ark_confirmation_text2, -20, 0, this.windowWidth(), 'center')
};



Window_ConfText.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

////////////////////


function Window_ActionConfirm() {
    this.initialize.apply(this, arguments);
}
    
Window_ActionConfirm.prototype = Object.create(Window_Command.prototype);
Window_ActionConfirm.prototype.constructor = Window_ActionConfirm;

Window_ActionConfirm.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();    
    this.openness = 0;
    this.open();
};

    
Window_ActionConfirm.prototype.windowWidth = function() {
    return ark_confirmation_win_w;
};
   
    
Window_ActionConfirm.prototype.updatePlacement = function() {
    if (ark_action_pos_x <= 0 || ark_action_pos_y <= 0) {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2 + this.height + 20;
    } else {
        this.x = ark_action_pos_x;
        this.y = ark_action_pos_y + 20;
    }
    
};

Window_ActionConfirm.prototype.makeCommandList = function() {
        this.addCommand(ark_confirm, 'confirm');  //Confirm VERB        
        this.addCommand(ark_unconfirm,  'cancel'); //Cancel VERB 
};


/////////////////


//=========================
//COMMANDS 
//=========================

Scene_File.prototype.createConfirmationWindows = function() {    
        this._confirmationHelpWindow = new Window_ConfText();        
        this.addChild(this._confirmationHelpWindow);        
        this._confirmationHelpWindow.hide();        
        this._confirmationWindow = new Window_ActionConfirm();
        this._confirmationWindow.setHandler('confirm',  this.commandConfirmation.bind(this));         
        this._confirmationWindow.setHandler('cancel', this.commandCancelConf.bind(this));
        this.addChild(this._confirmationWindow);   
        this._confirmationWindow.hide();
    };


Scene_File.prototype.commandConfirmation = function() {
    if (ark_confirm_mode == ark_save){        
              
        $gameSystem.onBeforeSave();        
        if (DataManager.saveGame(this.savefileId())) {        
        this.onSaveSuccess();
          } else {
        this.onSaveFailure(); } 
        
    } else if (ark_confirm_mode == ark_load){
        if (DataManager.loadGame(this.savefileId())) {
        this.onLoadSuccess();
        $gameSystem.onAfterLoad();
          } else {
        this.onLoadFailure(); }        
    } else if (ark_confirm_mode == ark_erase){
        StorageManager.remove(this.savefileId())
        DataManager.eraseSaveData();
        AudioManager.playSe('Fire3', 90, 0, 0);          
    }
    this.commandAfterConf();
};

Scene_File.prototype.commandAfterConf = function() {
    this._listWindow.refresh();
    this._confirmationHelpWindow.hide(); 
    this._confirmationWindow.hide();
    this._confirmationWindow.deactivate();
    this.activateListWindow();
};

Scene_File.prototype.commandCancelConf = function() {    
    this._confirmationHelpWindow.hide(); 
    this._confirmationWindow.hide();
    this._confirmationWindow.deactivate();
    this.activateListWindow();
};

  

///////////////////////////////////////////////////////////////////////////


Scene_File.prototype.commandSave = function() {
    if (ark_confirmation == 1){        
        ark_confirm_mode = ark_save;        
        this._confirmationHelpWindow.refresh();
        this._actionWindow.hide();
        this._actionWindow.deactivate()
        this._confirmationHelpWindow.show();
        this._confirmationWindow.show();
        this._confirmationWindow.activate();        
    } else {
        
    $gameSystem.onBeforeSave();        
    if (DataManager.saveGame(this.savefileId())) {        
        this.onSaveSuccess();
        $gameSystem.onAfterLoad();
    } else {
        this.onSaveFailure();
    }
     }
};
    
Scene_File.prototype.commandLoad = function() {   
    if (ark_confirmation == 1){        
        ark_confirm_mode = ark_load;
        this._confirmationHelpWindow.refresh();
        this._actionWindow.hide();
        this._actionWindow.deactivate()
        this._confirmationHelpWindow.show();
        this._confirmationWindow.show();
        this._confirmationWindow.activate();        
    } else {
    if (DataManager.loadGame(this.savefileId())) {
        this.onLoadSuccess();
    } else {
        this.onLoadFailure();
    }
    }
};
    
    
Scene_File.prototype.commandErase = function() {    
    if (ark_confirmation == 1){
        ark_confirm_mode = ark_erase;
        this._confirmationHelpWindow.refresh();
        this._actionWindow.hide();
        this._actionWindow.deactivate()
        this._confirmationHelpWindow.show();
        this._confirmationWindow.show();
        this._confirmationWindow.activate();        
    } else {
    StorageManager.remove(this.savefileId())
    DataManager.eraseSaveData();
    AudioManager.playSe('Fire3', 90, 0, 0);    
    this.afterCommand();    }
};