//=============================================================================
// Balloon Popup SE
// Jtanooki_PopupSE.js
// Version: 1.00
// No credit required, can be used commercially or non commercially.
//=============================================================================
/*:
 * @plugindesc Plays a Sound Effect when you use the Show Balloon Icon command in an event.
 * @author Jtanooki
 * @version 1.0
 * 
 * @param Name
 * @desc Filname of the SE for the balloon popup.
 * Default: Jump1
 * @default Jump1

 * @param Volume
 * @desc Volume of SE for the balloon popup.
 * Default: 75
 * @default 75

 * @param Pitch
 * @desc Pitch of SE for the balloon popup.
 * Default: 100
 * @default 100
 *
 *@help This script has a couple of Plugin Commands that allow you to change the 
 *settings of the script Mid-game.
 *======================================================================================
 *                                   Plugin Commands
 *======================================================================================
 *      BalpopSE Jump1                 This command changes the default popup 
 *                                     SE sound to "Jump 1"
 *
 *      BalpopVol 80                   This command changes the default 
 *                                     SE Volume to 80
 *
 *      BalopopPitch 120               This command changes the default 
 *                                     SE Pitch to 120
 *      
 *      BalpopDefault                  Resets all of the parameters back to their
 *                                     default values
 */

(function() {

//Initializing variables to parameter values
var parameters = PluginManager.parameters('Jtanooki_PopupSE');
var name = String(parameters['Name']);
var volume = Number(parameters['Volume'] || 75);
var pitch = Number(parameters['Pitch'] || 100);

//Plugin Commands//
var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
         if (command === 'BalpopSe') name = args;
         if (command === 'BalpopVol') volume = args;
         if (command === 'BalpopPitch') pitch = args;
         if (command === 'BalpopDefault')
         {
            name = String(parameters['Name']);
            volume = Number(parameters['Volume'] || 75);
            pitch = Number(parameters['Pitch'] || 100);
         }
    };
//Override Start Balloon Function
var _Sprite_Character_start_Balloon = Sprite_Character.prototype.startBalloon;

Sprite_Character.prototype.startBalloon = function() {
        _Sprite_Character_start_Balloon.call(this);
        var audio = {};
        audio.name = name;
        audio.pitch = pitch;
        audio.volume = volume;
        audio.pan = 0;
        AudioManager.playSe(audio);
};

})();
