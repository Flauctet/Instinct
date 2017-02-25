//=============================================================================
// AppointedPie - Window Padding
// APP_WindowPadding.js
//============================================================================= 
var Imported = Imported || {};
Imported.APP_WindowPadding = true; var AppointedPie = AppointedPie || {};
AppointedPie.WindowPadding = AppointedPie.WindowPadding || {}; 
//=============================================================================
/*:
 * @plugindesc v1.0 Additional parameter changes to the core systems of RPG Maker MV
 * @author AppointedPie
 *
 * @param ----Window----
 * @default
 *
 * @param Line Height
 * @desc Adjusts the Line Height system default.
 * Default: 36
 * @default 30
 *
 * @param Window Padding
 * @desc Adjusts the window padding system default.
 * Default: 18
 * @default 10
 *
 * @param Text Padding
 * @desc Adjusts the text padding system default.
 * Default: 6
 * @default 2
 *
 */
//=============================================================================
// Parameter Variables
//============================================================================= 
AppointedPie.Parameters = PluginManager.parameters('APP_WindowPadding');
AppointedPie.Param = AppointedPie.Param || {}; 
AppointedPie.Param.LineHeight = Number(AppointedPie.Parameters['Line Height']);
AppointedPie.Param.WinPad = Number(AppointedPie.Parameters['Window Padding']);
AppointedPie.Param.TextPad = Number(AppointedPie.Parameters['Text Padding']); 
//-----------------------------------------------------------------------------
Window_Base.prototype.lineHeight = function() {
    return AppointedPie.Param.LineHeight;
}; Window_Base.prototype.standardPadding = function() {
    return AppointedPie.Param.WinPad
}; Window_Base.prototype.textPadding = function() {
    return AppointedPie.Param.TextPad
}; Window_Base.prototype.updatePadding = function() {
    this.padding = this.standardPadding();
};
//=============================================================================
// End of File
//=============================================================================